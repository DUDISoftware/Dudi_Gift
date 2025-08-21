const ProductRequest = require("../models/notification/productRequest.model");
const Product = require("../models/product/product.model");
const Notification = require("../models/notification/notification.model");
const User = require("../models/user/user.model");
// Add this at the top for error handling
const mongoose = require('mongoose');

exports.createRequest = async (req, res) => {
  try {
    const { productId, message } = req.body;
    const requesterId = req.user.id;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await Product.findById(productId).populate("user_id");
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.user_id._id.toString() === requesterId) {
      return res.status(400).json({ message: "Bạn không thể yêu cầu sản phẩm của mình" });
    }

    // Check if product is already given
    if (product.status === 'given') {
      return res.status(400).json({ message: "Sản phẩm đã được tặng" });
    }

    const existingRequest = await ProductRequest.findOne({
      product: productId,
      requester: requesterId,
      status: { $in: ['pending', 'approved'] }
    });

    if (existingRequest) {
      return res.status(400).json({ message: "Bạn đã gửi yêu cầu cho sản phẩm này rồi" });
    }

    const request = await ProductRequest.create({
      product: productId,
      requester: requesterId,
      message: message || "",
    });

    const requester = await User.findById(requesterId).select("name avatar");
    const requesterName = requester?.name || "Người dùng";

    const notification = await Notification.create({
      user: product.user_id._id,
      type: "request",
      product: product._id,
      request: request._id,
      message: `${requesterName} đã gửi yêu cầu nhận sản phẩm "${product.title}"`,
      relatedUser: requesterId
    });

    const populatedNotification = await Notification.findById(notification._id)
      .populate({
        path: "product",
        select: "title image_url",
        populate: { path: "user_id", select: "name avatar" },
      })
      .populate({
        path: "request",
        populate: { path: "requester", select: "name avatar.url" },
      })
      .populate({
        path: "relatedUser",
        select: "name avatar.url"
      });

    // Emit notification
    const io = req.app.get("io");
    const onlineUsers = req.app.get("onlineUsers");

    if (io && onlineUsers?.has(product.user_id._id.toString())) {
      onlineUsers.get(product.user_id._id.toString()).forEach(socketId => {
        io.to(socketId).emit("notification", populatedNotification);
      });
    }

    res.status(201).json({ success: true, request, notification: populatedNotification });
  } catch (err) {
    console.error("createRequest error:", err);
    res.status(500).json({ message: "Lỗi khi gửi yêu cầu" });
  }
};
// 2) Lấy danh sách request theo sản phẩm
exports.getRequestsByProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.user_id.toString() !== req.user.id) {
      return res.status(403).json({ message: "Bạn không phải chủ sản phẩm" });
    }

    const requests = await ProductRequest.find({ product: productId })
      .populate("requester", "name avatar.url email phone address")
      .populate("product", "status");

    res.json({ requests });
  } catch (err) {
    console.error("getRequestsByProduct error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// 3) Duyệt một request
exports.approveRequest = async (req, res) => {
  try {
    const requestId = req.params.requestId;
    const request = await ProductRequest.findById(requestId);
    if (!request) return res.status(404).json({ message: "Request not found" });

    const product = await Product.findById(request.product).populate("user_id");
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.user_id._id.toString() !== req.user.id) {
      return res.status(403).json({ message: "Bạn không phải chủ sản phẩm" });
    }

    request.status = "approved";
    await request.save();

    // Thông báo cho người được chọn
    const notification = await Notification.create({
      user: request.requester,
      type: "approve",
      product: product._id,
      request: request._id,
      message: `Bạn đã được chọn để nhận sản phẩm "${product.title}"`,
    });

    // Populate trước khi emit
    const populatedNotification = await Notification.findById(notification._id)
      .populate({
        path: "product",
        populate: { path: "user_id", select: "name email avatar" },
      })
      .populate({
        path: "request",
        populate: { path: "requester", select: "name avatar.url email" },
      });

    const io = req.app.get("io");
    const onlineUsers = req.app.get("onlineUsers");
    if (io && onlineUsers?.has(request.requester.toString())) {
      for (const socketId of onlineUsers.get(request.requester.toString())) {
        io.to(socketId).emit("notification", populatedNotification);
      }
    }

    // Reject các request khác
    await ProductRequest.updateMany(
      { product: product._id, _id: { $ne: request._id } },
      { $set: { status: "rejected" } }
    );

    product.status = "given";
    product.given_to = request.requester;
    await product.save();

    res.json({ message: "Đã duyệt người nhận sản phẩm", request });
  } catch (err) {
    console.error("approveRequest error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// 4) Kiểm tra trạng thái request của user hiện tại
exports.checkRequestStatus = async (req, res) => {
  try {
    const productId = req.params.productId;
    const request = await ProductRequest.findOne({
      product: productId,
      requester: req.user.id,
    });

    if (!request) return res.json({ status: "none" });
    res.json({ status: request.status });
  } catch (err) {
    console.error("checkRequestStatus error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// 5) Quà đã nhận
exports.getReceivedGifts = async (req, res) => {
  try {
    const userId = req.user.id;
    const requests = await ProductRequest.find({
      requester: userId,
      status: "approved",
    })
      .populate("product", "title description image_url user_id")
      .populate("product.user_id", "name avatar.url");

    const gifts = requests.map((r) => ({
      _id: r._id,
      title: r.product.title,
      description: r.product.description,
      image_url: r.product.image_url,
      updatedAt: r.updatedAt,
      user_id: r.product.user_id,
    }));

    res.json(gifts);
  } catch (err) {
    console.error("getReceivedGifts error:", err);
    res.status(500).json({ message: "Lỗi khi lấy quà đã nhận" });
  }
};

// 6) Quà đã tặng
exports.getGivenGifts = async (req, res) => {
  try {
    const userId = req.user.id;
    const products = await Product.find({ user_id: userId, status: "given" })
      .populate("given_to", "name avatar.url")
      .select("title description image_url given_to updatedAt");

    const gifts = products.map((p) => ({
      _id: p._id,
      title: p.title,
      description: p.description,
      image_url: p.image_url,
      updatedAt: p.updatedAt,
      given_to: p.given_to,
    }));

    res.json(gifts);
  } catch (err) {
    console.error("getGivenGifts error:", err);
    res.status(500).json({ message: "Lỗi khi lấy quà đã tặng" });
  }
};
// Reject a request
exports.rejectRequest = async (req, res) => {
  try {
    const requestId = req.params.requestId;
    const request = await ProductRequest.findById(requestId).populate('product');
    
    if (!request) return res.status(404).json({ message: "Request not found" });

    if (request.product.user_id.toString() !== req.user.id) {
      return res.status(403).json({ message: "Bạn không phải chủ sản phẩm" });
    }

    request.status = "rejected";
    await request.save();

    // Create rejection notification
    const notification = await Notification.create({
      user: request.requester,
      type: "reject",
      product: request.product._id,
      request: request._id,
      message: `Yêu cầu nhận sản phẩm "${request.product.title}" đã bị từ chối`,
    });

    // Emit notification
    const io = req.app.get("io");
    const onlineUsers = req.app.get("onlineUsers");
    if (io && onlineUsers?.has(request.requester.toString())) {
      onlineUsers.get(request.requester.toString()).forEach(socketId => {
        io.to(socketId).emit("notification", notification);
      });
    }

    res.json({ message: "Đã từ chối yêu cầu", request });
  } catch (err) {
    console.error("rejectRequest error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Cancel a request
exports.cancelRequest = async (req, res) => {
  try {
    const requestId = req.params.requestId;
    const request = await ProductRequest.findById(requestId).populate('product');
    
    if (!request) return res.status(404).json({ message: "Request not found" });

    if (request.requester.toString() !== req.user.id) {
      return res.status(403).json({ message: "Bạn không thể hủy yêu cầu này" });
    }

    request.status = "cancelled";
    await request.save();

    // Create cancellation notification
    const notification = await Notification.create({
      user: request.product.user_id,
      type: "cancel",
      product: request.product._id,
      request: request._id,
      message: `Yêu cầu nhận sản phẩm "${request.product.title}" đã bị hủy`,
      relatedUser: req.user.id
    });

    // Emit notification
    const io = req.app.get("io");
    const onlineUsers = req.app.get("onlineUsers");
    if (io && onlineUsers?.has(request.product.user_id.toString())) {
      onlineUsers.get(request.product.user_id.toString()).forEach(socketId => {
        io.to(socketId).emit("notification", notification);
      });
    }

    res.json({ message: "Đã hủy yêu cầu", request });
  } catch (err) {
    console.error("cancelRequest error:", err);
    res.status(500).json({ message: "Server error" });
  }
};