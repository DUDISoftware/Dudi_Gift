// services/notificationService.js
import api from "./api";

export const notificationService = {
  getMyNotifications: async () => {
    try {
      const res = await api.get("/notifications"); // Changed from "/notifications/my"
      console.log("🔍 API /notifications response:", res.data);
      return res.data; // Your backend returns the array directly, not in a notifications property
    } catch (err) {
      console.error(
        "Lỗi khi lấy thông báo:",
        err.response?.data || err.message
      );
      return [];
    }
  },
  
  markAsRead: async (id) => {
    try {
      const res = await api.patch(`/notifications/${id}/read`);
      return res.data.notification;
    } catch (err) {
      console.error(
        "Lỗi khi đánh dấu read:",
        err.response?.data || err.message
      );
      throw err;
    }
  },
  
  // Add these new methods
  markAllAsRead: async () => {
    try {
      const res = await api.patch("/notifications/read-all");
      return res.data;
    } catch (err) {
      console.error(
        "Lỗi khi đánh dấu tất cả đã đọc:",
        err.response?.data || err.message
      );
      throw err;
    }
  },
  
  getUnreadCount: async () => {
    try {
      const res = await api.get("/notifications/unread-count");
      return res.data.count;
    } catch (err) {
      console.error(
        "Lỗi khi lấy số thông báo chưa đọc:",
        err.response?.data || err.message
      );
      return 0;
    }
  }
};