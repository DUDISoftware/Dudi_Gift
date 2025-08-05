const express = require("express");
const router = express.Router();
const { updateProfile, getCurrentUser, changePassword, getUserByUsername } = require("../controllers/user.controller");
const verifyToken = require("../middleware/verifyToken");
const uploadAvatar = require("../middleware/uploadAvatar"); // 👈

router.get('/me', verifyToken, getCurrentUser);
router.get('/profile/:name', getUserByUsername);
router.put('/profile', verifyToken, uploadAvatar, updateProfile); // 👈
router.put('/change-password', verifyToken, changePassword);

module.exports = router;
