// ✅ controllers/auth.controller.js
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const axios = require('axios');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const register = async (req, res) => {
  try {
    const { name, email, password, gender, dob } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ error: 'Vui lòng nhập đầy đủ thông tin.' });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: 'Email đã tồn tại.' });

   const user = new User({ name, email, password, gender, dob });
    await user.save();

    res.status(201).json({ message: 'Đăng ký thành công!' });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi server' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) return res.status(400).json({ error: 'Email không tồn tại' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ error: 'Sai mật khẩu' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    const userSafe = await User.findById(user._id).select('-password');

    res.json({ message: 'Đăng nhập thành công!', token, user: userSafe });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi server' });
  }
};

const loginWithGoogle = async (req, res) => {
  try {
    const { token } = req.body;
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name } = payload;

    let user = await User.findOne({ googleId });
    if (!user) {
      user = await User.create({ googleId, name, email });
    }

    const jwtToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ message: 'Đăng nhập Google thành công!', token: jwtToken, user });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi đăng nhập Google' });
  }
};

const loginWithFacebook = async (req, res) => {
  try {
    const { accessToken, userID } = req.body;
    const fbRes = await axios.get(`https://graph.facebook.com/${userID}?fields=id,name,email&access_token=${accessToken}`);
    const { id: facebookId, name, email } = fbRes.data;

    let user = await User.findOne({ facebookId });
    if (!user) {
      user = await User.create({ facebookId, name, email });
    }

    const jwtToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ message: 'Đăng nhập Facebook thành công!', token: jwtToken, user });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi đăng nhập Facebook' });
  }
};

const refreshToken = (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ error: 'Không có refresh token' });

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const accessToken = jwt.sign(
      { id: decoded.id, role: decoded.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    res.json({ accessToken });
  } catch (err) {
    res.status(403).json({ error: 'Refresh token không hợp lệ' });
  }
};

module.exports = {
  register,
  login,
  loginWithGoogle,
  loginWithFacebook,
  refreshToken
};
