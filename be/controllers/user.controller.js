const User = require("../models/user/user.model");
const cloudinary = require("cloudinary").v2;
const Product = require("../models/product/product.model");

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const file = req.file;
    const { name, phone, address, location, gender, dob } = req.body;

    const user = await User.findById(userId);
    const updatedData = { name, phone, address, location, gender, dob };

    if (file) {
      const isDefaultAvatar = user.avatar?.url?.includes("default-avatar");
      if (user.avatar?.public_id && !isDefaultAvatar) {
        await cloudinary.uploader.destroy(user.avatar.public_id);
      }
      updatedData.avatar = {
        url: file.path,
        public_id: file.filename,
      };
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    }).select("-password");
    res.json({ message: "Cập nhật thông tin thành công!", user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Lỗi cập nhật thông tin" });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user)
      return res.status(404).json({ error: "Người dùng không tồn tại" });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: "Lỗi server" });
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch)
      return res.status(400).json({ error: "Mật khẩu hiện tại không đúng" });

    user.password = newPassword;
    await user.save();

    res.json({ message: "Đổi mật khẩu thành công" });
  } catch (err) {
    res.status(500).json({ error: "Lỗi đổi mật khẩu" });
  }
};

const getUserByUsername = async (req, res) => {
  try {
    const { name } = req.params;
    const decodedName = decodeURIComponent(name);

    const user = await User.findOne({ name: decodedName }).select("-password");
    if (!user) return res.status(404).json({ error: "Không tìm thấy người dùng" });

    // 🔥 Lấy sản phẩm của user này
    const products = await Product.find({ user_id: user._id }).sort({ createdAt: -1 });

    const plainUser = user.toObject();
    plainUser.products = products.filter(p => p.status === "active");
    plainUser.productsGiven = products.filter(p => p.status === "given");

    res.json({ user: plainUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Lỗi server" });
  }
};


module.exports = {
  updateProfile,
  getCurrentUser,
  changePassword,
  getUserByUsername,
};
