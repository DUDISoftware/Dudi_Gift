// src/services/userService.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const userService = {
  getUserProfile: async (name) => {
    try {
      const res = await axios.get(`${API_URL}/user/profile/${encodeURIComponent(name)}`);
      return res.data.user;
    } catch (err) {
      console.error('Lỗi lấy profile người dùng:', err);
      return null;
    }
  },

  getCurrentUser: async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_URL}/user/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.data.user;
    } catch (err) {
      console.error('Lỗi lấy thông tin người dùng hiện tại:', err);
      return null;
    }
  }
};
