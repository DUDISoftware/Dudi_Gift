const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const ctrl = require('../controllers/productRequestController');

router.post('/', verifyToken, ctrl.createRequest);
router.get('/product/:productId', verifyToken, ctrl.getRequestsByProduct);
router.post('/:requestId/approve', verifyToken, ctrl.approveRequest);
router.post('/:requestId/reject', verifyToken, ctrl.rejectRequest);
router.post('/:requestId/cancel', verifyToken, ctrl.cancelRequest);
router.get('/status/:productId', verifyToken, ctrl.checkRequestStatus);
router.get('/received', verifyToken, ctrl.getReceivedGifts);
router.get('/given', verifyToken, ctrl.getGivenGifts);

module.exports = router;