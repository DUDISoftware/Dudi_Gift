const express = require('express');
const router = express.Router();
const { updateProfile, getCurrentUser, changePassword,getUserByUsername  } = require('../controllers/user.controller');
const verifyToken = require('../middleware/verifyToken');
const upload = require('../middleware/cloudinary.middleware');

router.get('/me', verifyToken, getCurrentUser);
router.get('/profile/:name', getUserByUsername); // 👈 thêm dòng này
router.put('/profile', verifyToken, upload.single('avatar'), updateProfile);
router.put('/change-password', verifyToken, changePassword);

module.exports = router;
