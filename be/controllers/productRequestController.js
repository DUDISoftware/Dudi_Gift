const ProductRequest = require("../models/notification/productRequest.model");
const Product = require("../models/product/product.model");

// 1. Gửi yêu cầu nhận sản phẩm
exports.createRequest = async (req, res) => {
  try {
    const { productId, message } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.user_id.toString() === req.user.id) {
      return res
        .status(400)
        .json({
          message: "Bạn không thể gửi yêu cầu tới sản phẩm của chính mình",
        });
    }

    // 🔹 Chặn khi sản phẩm đã được duyệt cho ai đó
    if (["approved", "given"].includes(product.status)) {
      return res
        .status(400)
        .json({ message: "Sản phẩm này đã được tặng cho người khác" });
    }

    // 🔹 Chặn khi user này đã được duyệt cho sản phẩm này
    const existingApproved = await ProductRequest.findOne({
      product: productId,
      requester: req.user.id,
      status: "approved",
    });
    if (existingApproved) {
      return res
        .status(400)
        .json({ message: "Bạn đã được duyệt nhận sản phẩm này" });
    }

    // 🔹 Chặn khi user đã gửi request và đang chờ duyệt
    const existingPending = await ProductRequest.findOne({
      product: productId,
      requester: req.user.id,
      status: "pending",
    });
    if (existingPending) {
      return res
        .status(400)
        .json({ message: "Bạn đã gửi request trước đó và đang chờ duyệt." });
    }

    const newRequest = new ProductRequest({
      product: productId,
      requester: req.user.id,
      message,
    });

    await newRequest.save();
    res
      .status(201)
      .json({ message: "Request created successfully", request: newRequest });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// 2. Lấy danh sách yêu cầu theo sản phẩm (chủ sở hữu)
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
    res.status(500).json({ message: "Server error" });
  }
};

// 3. Duyệt một yêu cầu (chủ sở hữu)
exports.approveRequest = async (req, res) => {
  try {
    const requestId = req.params.requestId;

    const request = await ProductRequest.findById(requestId);
    if (!request) return res.status(404).json({ message: "Request not found" });

    const product = await Product.findById(request.product);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.user_id.toString() !== req.user.id) {
      return res.status(403).json({ message: "Bạn không phải chủ sản phẩm" });
    }

    request.status = "approved";
    await request.save();

    // Từ chối các request khác
    await ProductRequest.updateMany(
      { product: product._id, _id: { $ne: request._id } },
      { $set: { status: "rejected" } }
    );

    // Cập nhật sản phẩm đã được tặng
    product.status = "given";
    product.given_to = request.requester; // 🔹 Gán người nhận
    await product.save();

    res.json({ message: "Đã duyệt người nhận sản phẩm", request });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// 4. Kiểm tra trạng thái request của user hiện tại với 1 sản phẩm
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
    res.status(500).json({ message: "Server error" });
  }
};

//  5. Hủy request
// exports.cancelRequest = async (req, res) => {
//   try {
//     const { requestId } = req.params;

//     const request = await ProductRequest.findById(requestId);
//     if (!request) return res.status(404).json({ error: 'Request không tồn tại.' });

//     if (String(request.requester) !== req.user.id) {
//       return res.status(403).json({ error: 'Bạn không thể hủy request của người khác.' });
//     }

//     if (request.status !== 'pending') {
//       return res.status(400).json({ error: 'Chỉ có thể hủy request đang chờ.' });
//     }

//     request.status = 'cancelled';
//     await request.save();

//     res.json({ message: 'Đã hủy request.', request });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
// 6.Quà đã nhận (người khác tặng cho mình)
exports.getReceivedGifts = async (req, res) => {
  try {
    const userId = req.user.id;

    const requests = await ProductRequest.find({ requester: userId, status: 'approved' })
      .populate('product', 'title description image_url')
      .populate('product.user_id', 'name avatar.url');

    const gifts = requests.map(r => ({
      _id: r._id,
      title: r.product.title,
      description: r.product.description,
      image_url: r.product.image_url,
      updatedAt: r.updatedAt,
      user_id: r.product.user_id, // người đã tặng
    }));

    res.json(gifts);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy quà đã nhận' });
  }
};

// 7.Quà đã tặng (mình là chủ sản phẩm đã duyệt cho người khác)
exports.getGivenGifts = async (req, res) => {
  try {
    const userId = req.user.id;

    const products = await Product.find({ user_id: userId, status: 'given' })
      .populate('given_to', 'name avatar.url')
      .select('title description image_url given_to updatedAt');

    const gifts = products.map(p => ({
      _id: p._id,
      title: p.title,
      description: p.description,
      image_url: p.image_url,
      updatedAt: p.updatedAt,
      given_to: p.given_to, // người đã nhận
    }));

    res.json(gifts);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy quà đã tặng' });
  }
};