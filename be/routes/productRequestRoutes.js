const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const checkRole = require('../middleware/checkRole');
const controller = require('../controllers/productRequestController');

// Gửi yêu cầu xin sản phẩm
router.post('/', verifyToken, checkRole(['user']), controller.createRequest);

// Chủ sản phẩm duyệt người nhận
router.put('/approve/:requestId', verifyToken, checkRole(['user', 'admin']), controller.approveRequest);

// Hủy yêu cầu xin
// router.put('/cancel/:requestId', verifyToken, checkRole(['user']), controller.cancelRequest);

// Kiểm tra trạng thái yêu cầu của người dùng hiện tại
router.get('/status/:productId', verifyToken, checkRole(['user']), controller.checkRequestStatus);

// Lấy danh sách người xin sản phẩm
router.get('/product/:productId', verifyToken, checkRole(['user', 'admin']), controller.getRequestsByProduct);

module.exports = router;
