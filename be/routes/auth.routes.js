const express = require('express');
const router = express.Router();
const {
  register,
  login,
  loginWithGoogle,
  loginWithFacebook,
  refreshToken
} = require('../controllers/auth.controller');

router.post('/register', register);
router.post('/login', login);
router.post('/login-google', loginWithGoogle);
router.post('/login-facebook', loginWithFacebook);
// routes/auth.routes.js
router.post('/refresh-token', refreshToken);
// routes/auth.routes.js
router.post('/logout', (req, res) => {
  res.clearCookie('refreshToken');
  res.json({ message: 'Đăng xuất thành công' });
});

module.exports = router;
