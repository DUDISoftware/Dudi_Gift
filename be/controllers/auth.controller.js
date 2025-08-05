const User = require("../models/user/user.model");
const UserToken = require("../models/user/user_token.model");
const UserOtp = require("../models/user/user_otp.model");
const LoginLog = require("../models/user/login_log.model");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const axios = require("axios");
const bcrypt = require("bcrypt");

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const register = async (req, res) => {
  try {
    const { name, email, password, gender, dob } = req.body;

    if (!name || !email || !password || !gender || !dob) {
      return res.status(400).json({ error: "Vui lòng nhập đầy đủ thông tin." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email đã tồn tại." });
    }
    const user = new User({
      name,
      email,
      password, // Giao lại cho schema tự hash
      gender,
      dob,
    });

    await user.save();
    res.status(201).json({ message: "Đăng ký thành công!" });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Lỗi server" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password, otp_code } = req.body;

    console.log("📥 Login request:", { email, password }); // ✅ In ra dữ liệu nhận được

    const user = await User.findOne({ email });

    if (!user) {
      console.log("❌ Không tìm thấy user với email:", email);
      await LoginLog.create({
        ip_address: req.ip,
        device_info: req.headers["user-agent"],
        status: "fail",
      });
      return res.status(400).json({ error: "Email không tồn tại" });
    }

    console.log("🔍 User tìm được:", user.email);
    console.log("🧂 Hashed password trong DB:", user.password);
    console.log("🧪 Mật khẩu client gửi lên:", password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("✅ Kết quả bcrypt.compare:", isMatch); // ✅ Quan trọng nhất

    if (!isMatch) {
      console.log("❌ Mật khẩu không đúng!");
      await LoginLog.create({
        user_id: user._id,
        ip_address: req.ip,
        device_info: req.headers["user-agent"],
        status: "fail",
      });
      return res.status(400).json({ error: "Sai mật khẩu" });
    }
    // OTP xác thực nếu chưa xác thực
    if (!user.isVerified) {
      // Nếu là mã mặc định trong dev thì bỏ qua kiểm tra DB
      if (otp_code === "123456" && process.env.NODE_ENV !== "production") {
        user.isVerified = true;
        await user.save();
      } else {
        const otpRecord = await UserOtp.findOne({
          user_id: user._id,
          otp_code,
          used: false,
        });
        if (!otpRecord || otpRecord.expires_at < new Date()) {
          return res
            .status(400)
            .json({ error: "Mã OTP không hợp lệ hoặc đã hết hạn" });
        }

        otpRecord.used = true;
        await otpRecord.save();

        user.isVerified = true;
        await user.save();
      }
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    await UserToken.create({
      user_id: user._id,
      token: refreshToken,
      device_info: req.headers["user-agent"] || "Unknown",
      ip_address: req.ip,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    await LoginLog.create({
      user_id: user._id,
      device_info: req.headers["user-agent"] || "Unknown",
      ip_address: req.ip,
      status: "success",
    });

    const userSafe = user.toObject();
    delete userSafe.password;

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ message: "Đăng nhập thành công!", token, user: userSafe });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Lỗi server" });
  }
};

const loginWithGoogle = async (req, res) => {
  try {
    const { token } = req.body;
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name } = payload;

    let user = await User.findOne({ googleId });
    if (!user) {
      user = await User.create({ googleId, name, email, isVerified: true });
    }

    const jwtToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.json({
      message: "Đăng nhập Google thành công!",
      token: jwtToken,
      user,
    });
  } catch (err) {
    res.status(500).json({ error: "Lỗi đăng nhập Google" });
  }
};

const loginWithFacebook = async (req, res) => {
  try {
    const { accessToken, userID } = req.body;
    const fbRes = await axios.get(
      `https://graph.facebook.com/${userID}?fields=id,name,email&access_token=${accessToken}`
    );
    const { id: facebookId, name, email } = fbRes.data;

    let user = await User.findOne({ facebookId });
    if (!user) {
      user = await User.create({ facebookId, name, email, isVerified: true });
    }

    const jwtToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.json({
      message: "Đăng nhập Facebook thành công!",
      token: jwtToken,
      user,
    });
  } catch (err) {
    res.status(500).json({ error: "Lỗi đăng nhập Facebook" });
  }
};

const refreshToken = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ error: "Không có refresh token" });

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const accessToken = jwt.sign(
      { id: decoded.id, role: decoded.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.json({ accessToken });
  } catch (err) {
    res.status(403).json({ error: "Refresh token không hợp lệ" });
  }
};
const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.json({ message: "Đăng xuất thành công" }); // Không có token vẫn trả về ok
    }

    // Giải mã để lấy user ID
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // Xoá token trong DB
    await UserToken.deleteOne({
      user_id: decoded.id,
      token: refreshToken,
    });

    // Xoá cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.json({ message: "Đăng xuất thành công" });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ error: "Lỗi đăng xuất" });
  }
};

module.exports = {
  register,
  login,
  loginWithGoogle,
  loginWithFacebook,
  refreshToken,
  logout,
};
