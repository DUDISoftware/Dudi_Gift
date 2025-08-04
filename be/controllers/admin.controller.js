const User = require('../models/user.model');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({ users });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi lấy danh sách người dùng' });
  }
};

const toggleUserStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status } = req.body;

    const user = await User.findByIdAndUpdate(userId, { status }, { new: true }).select('-password');
    res.json({ message: 'Cập nhật trạng thái thành công', user });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi cập nhật trạng thái' });
  }
};

const updateUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    const user = await User.findByIdAndUpdate(userId, { role }, { new: true }).select('-password');
    res.json({ message: 'Cập nhật vai trò thành công', user });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi cập nhật vai trò' });
  }
};

module.exports = {
  getAllUsers,
  toggleUserStatus,
  updateUserRole
};
