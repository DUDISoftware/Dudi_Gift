// routes/notification.routes.js
// ❌ WRONG: const router = require('router')();
// ✅ CORRECT: Use Express Router
const express = require('express');
const router = express.Router();

const { 
  getMyNotifications, 
  markAsRead, 
  getUnreadCount,
  markAllAsRead 
} = require('../controllers/notification.controller');
const verifyToken = require('../middleware/verifyToken');

router.get('/', verifyToken, getMyNotifications);
router.get('/unread-count', verifyToken, getUnreadCount);
router.patch('/:id/read', verifyToken, markAsRead);
router.patch('/read-all', verifyToken, markAllAsRead);

module.exports = router;