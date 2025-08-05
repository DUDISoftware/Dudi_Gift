const express = require('express');
const router = express.Router();
const {
  register,
  login,
  loginWithGoogle,
  loginWithFacebook,
  refreshToken,
  logout
} = require('../controllers/auth.controller');

router.post('/register', register);
router.post('/login', login);
router.post('/login-google', loginWithGoogle);
router.post('/login-facebook', loginWithFacebook);
router.post('/refresh-token', refreshToken);
router.post('/logout', logout); // ✅ Gọi controller mới

module.exports = router;
