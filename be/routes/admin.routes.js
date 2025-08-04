const express = require('express');
const router = express.Router();
const { getAllUsers, toggleUserStatus, updateUserRole } = require('../controllers/admin.controller');
const verifyToken = require('../middleware/verifyToken');
const checkRole = require('../middleware/checkRole');

router.get('/users', verifyToken, checkRole(['admin']), getAllUsers);
router.put('/user/:userId/status', verifyToken, checkRole(['admin']), toggleUserStatus);
router.put('/user/:userId/role', verifyToken, checkRole(['admin']), updateUserRole);

module.exports = router;
