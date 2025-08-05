// src/services/productCategoryService.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
axios.defaults.withCredentials = true;

export const productCategoryService = {
  // 🔹 Lấy tất cả category
  getAllCategories: async () => {
    try {
      const res = await axios.get(`${API_URL}/categories`);
      return res.data.categories;
    } catch (err) {
      console.error('Lỗi khi lấy tất cả category:', err);
      return [];
    }
  },

  // 🔹 Lấy category theo ID
  getCategoryById: async (id) => {
    try {
      const res = await axios.get(`${API_URL}/categories/${id}`);
      return res.data.category;
    } catch (err) {
      console.error('Lỗi khi lấy category theo ID:', err);
      return null;
    }
  },

  // 🔹 Tạo category mới
  createCategory: async (data) => {
    try {
      const res = await axios.post(`${API_URL}/categories`, data);
      return res.data.category;
    } catch (err) {
      console.error('Lỗi khi tạo category:', err.response?.data || err.message);
      throw err;
    }
  },

  // 🔹 Cập nhật category
  updateCategory: async (id, data) => {
    try {
      const res = await axios.put(`${API_URL}/categories/${id}`, data);
      return res.data.category;
    } catch (err) {
      console.error('Lỗi khi cập nhật category:', err.response?.data || err.message);
      throw err;
    }
  },

  // 🔹 Xóa category
  deleteCategory: async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/categories/${id}`);
      return res.data.message;
    } catch (err) {
      console.error('Lỗi khi xóa category:', err.response?.data || err.message);
      throw err;
    }
  },
};
