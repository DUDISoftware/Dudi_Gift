const ProductRequest = require('../models/notification/productRequest.model');
const Product = require('../models/product/product.model');

// 1. Gửi yêu cầu nhận sản phẩm
exports.createRequest = async (req, res) => {
  try {
    const { productId, message } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (product.user_id.toString() === req.user.id) {
      return res.status(400).json({ message: 'Bạn không thể gửi yêu cầu tới sản phẩm của chính mình' });
    }

    // 🔹 Chặn khi sản phẩm đã được duyệt cho ai đó
    if (['approved', 'given'].includes(product.status)) {
      return res.status(400).json({ message: 'Sản phẩm này đã được tặng cho người khác' });
    }

    // 🔹 Chặn khi user này đã được duyệt cho sản phẩm này
    const existingApproved = await ProductRequest.findOne({
      product: productId,
      requester: req.user.id,
      status: 'approved'
    });
    if (existingApproved) {
      return res.status(400).json({ message: 'Bạn đã được duyệt nhận sản phẩm này' });
    }

    // 🔹 Chặn khi user đã gửi request và đang chờ duyệt
    const existingPending = await ProductRequest.findOne({
      product: productId,
      requester: req.user.id,
      status: 'pending'
    });
    if (existingPending) {
      return res.status(400).json({ message: 'Bạn đã gửi request trước đó và đang chờ duyệt.' });
    }

    const newRequest = new ProductRequest({
      product: productId,
      requester: req.user.id,
      message
    });

    await newRequest.save();
    res.status(201).json({ message: 'Request created successfully', request: newRequest });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


// 2. Lấy danh sách yêu cầu theo sản phẩm (chủ sở hữu)
exports.getRequestsByProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);

    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (product.user_id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Bạn không phải chủ sản phẩm' });
    }

    const requests = await ProductRequest.find({ product: productId }).populate('requester', 'name email');
    res.json({ requests });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// 3. Duyệt một yêu cầu (chủ sở hữu)
exports.approveRequest = async (req, res) => {
  try {
    const requestId = req.params.requestId;

    const request = await ProductRequest.findById(requestId);
    if (!request) return res.status(404).json({ message: 'Request not found' });

    const product = await Product.findById(request.product);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (product.user_id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Bạn không phải chủ sản phẩm' });
    }

    request.status = 'approved';
    await request.save();

    // Từ chối các request khác
    await ProductRequest.updateMany(
      { product: product._id, _id: { $ne: request._id } },
      { $set: { status: 'rejected' } }
    );

    // Cập nhật sản phẩm đã được tặng
    product.status = 'given';
    await product.save();

    res.json({ message: 'Đã duyệt người nhận sản phẩm', request });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// 4. Kiểm tra trạng thái request của user hiện tại với 1 sản phẩm
exports.checkRequestStatus = async (req, res) => {
  try {
    const productId = req.params.productId;

    const request = await ProductRequest.findOne({
      product: productId,
      requester: req.user.id
    });

    if (!request) return res.json({ status: 'none' });

    res.json({ status: request.status });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
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
