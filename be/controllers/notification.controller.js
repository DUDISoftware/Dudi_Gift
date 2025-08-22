// controllers/notification.controller.js
const Notification = require("../models/notification/notification.model");

// Add debug log to check if Notification is a proper model
console.log("Notification model name:", Notification.modelName);
console.log(
  "Notification.find is function:",
  typeof Notification.find === "function"
);

// Lấy danh sách thông báo của user
exports.getMyNotifications = async (req, res) => {
  try {
    console.log("=== NOTIFICATION REQUEST DEBUG ===");
    console.log("Headers:", req.headers);
    console.log("req.user:", req.user);
    console.log("User ID from token:", req.user?._id);

    if (!req.user || !req.user._id) {
      console.log("❌ ERROR: No user ID in request");
      return res.status(401).json({ message: "User not authenticated" });
    }

    console.log("🔍 Querying notifications for user:", req.user._id);

    const notifications = await Notification.find({ user: req.user._id })
      .populate({
        path: "product",
        populate: {
          path: "user_id",
          select: "name email avatar phone address", // Thêm phone và address
        },
      })
      .populate({
        path: "request",
        populate: { path: "requester", select: "name avatar.url email" },
      })
      .sort({ createdAt: -1 });

    console.log(
      `✅ Found ${notifications.length} notifications for user ${req.user._id}`
    );

    // Debug the first notification if exists
    if (notifications.length > 0) {
      console.log("Sample notification:", {
        id: notifications[0]._id,
        type: notifications[0].type,
        message: notifications[0].message,
        isRead: notifications[0].isRead,
      });
    }

    res.json(notifications);
  } catch (err) {
    console.error("❌ getMyNotifications error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Đánh dấu thông báo đã đọc
exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Marking notification ${id} as read for user:`, req.user._id);

    const notification = await Notification.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { $set: { isRead: true } },
      { new: true }
    );

    if (!notification) {
      console.log("❌ Notification not found:", id);
      return res.status(404).json({ message: "Notification not found" });
    }

    console.log("✅ Notification marked as read:", notification._id);
    res.json({ notification });
  } catch (err) {
    console.error("markAsRead error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Đánh dấu tất cả thông báo đã đọc
exports.markAllAsRead = async (req, res) => {
  try {
    console.log("Marking all notifications as read for user:", req.user._id);

    const result = await Notification.updateMany(
      { user: req.user._id, isRead: false },
      { $set: { isRead: true } }
    );

    console.log("✅ Marked all as read. Modified count:", result.modifiedCount);
    res.json({
      message: "All notifications marked as read",
      modifiedCount: result.modifiedCount,
    });
  } catch (err) {
    console.error("markAllAsRead error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Lấy số lượng thông báo chưa đọc
exports.getUnreadCount = async (req, res) => {
  try {
    console.log("Getting unread count for user:", req.user._id);

    const count = await Notification.countDocuments({
      user: req.user._id,
      isRead: false,
    });

    console.log("✅ Unread count:", count);
    res.json({ count });
  } catch (err) {
    console.error("getUnreadCount error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
