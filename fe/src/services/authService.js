import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
axios.defaults.withCredentials = true;

export const authService = {
  login: async (email, password, otp_code) => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { email, password, otp_code });
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      return { success: true, user };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.error || 'Đăng nhập thất bại'
      };
    }
  },

  register: async (data) => {
    try {
      const res = await axios.post(`${API_URL}/auth/register`, data);
      return { success: true, message: res.data.message };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.error || 'Đăng ký thất bại'
      };
    }
  },

  logout: async () => {
    try {
      await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch (err) {
      console.error('Logout failed', err);
    }
  }
};
