import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
axios.defaults.withCredentials = true;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const productService = {
  // 🔹 Lấy tất cả sản phẩm
  getAllProducts: async () => {
    try {
      const res = await axios.get(`${API_URL}/products`);
      return res.data.products;
    } catch (err) {
      console.error("Lỗi khi lấy tất cả sản phẩm:", err);
      return [];
    }
  },

  // 🔹 Lấy sản phẩm còn khả dụng (chưa tặng)
  getAvailableProducts: async () => {
    try {
      const res = await axios.get(`${API_URL}/products/available`);
      return res.data.products;
    } catch (err) {
      console.error("Lỗi khi lấy sản phẩm còn khả dụng:", err);
      return [];
    }
  },

  // 🔹 Lấy sản phẩm đã cho (đã tặng)
  getGivenProducts: async () => {
    try {
      const res = await axios.get(`${API_URL}/products/given`);
      return res.data.products;
    } catch (err) {
      console.error("Lỗi khi lấy sản phẩm đã cho:", err);
      return [];
    }
  },

  // 🔹 Lấy sản phẩm phổ biến
  getPopularProducts: async () => {
    try {
      const res = await axios.get(`${API_URL}/products/popular`);
      return res.data.products;
    } catch (err) {
      console.error("Lỗi khi lấy sản phẩm phổ biến:", err);
      return [];
    }
  },

  // 🔹 Lấy sản phẩm theo ID
  getProductById: async (id) => {
    try {
      const res = await axios.get(`${API_URL}/products/${id}`);
      return res.data.product;
    } catch (err) {
      console.error("Lỗi khi lấy sản phẩm theo ID:", err);
      return null;
    }
  },

  // 🔹 Lấy sản phẩm mới nhất
  getNewProducts: async () => {
    try {
      const res = await axios.get(`${API_URL}/products/new`);
      return res.data.products;
    } catch (err) {
      console.error("Lỗi khi lấy sản phẩm mới nhất:", err);
      return [];
    }
  },

  // 🔹 Lấy sản phẩm theo category
  getProductsByCategory: async (categoryId) => {
    try {
      const res = await axios.get(`${API_URL}/products/category/${categoryId}`);
      return res.data.products;
    } catch (err) {
      console.error("Lỗi khi lấy sản phẩm theo category:", err);
      return [];
    }
  },

  // 🔹 Lấy sản phẩm của tôi
  getMyProducts: async () => {
    try {
      const res = await axios.get(`${API_URL}/products/my`, {
        headers: getAuthHeaders(),
      });
      return res.data.products;
    } catch (err) {
      console.error("Lỗi khi lấy sản phẩm của tôi:", err);
      return [];
    }
  },

  // 🔹 Lấy sản phẩm của user khác
  getProductsByUser: async (userId) => {
    try {
      const res = await axios.get(`${API_URL}/products/user/${userId}`);
      return res.data.products;
    } catch (err) {
      console.error("Lỗi khi lấy sản phẩm của user:", err);
      return [];
    }
  },

  // 🔹 Tạo sản phẩm mới
  createProduct: async (formData) => {
    try {
      const res = await axios.post(`${API_URL}/products`, formData, {
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data.product;
    } catch (err) {
      console.error("Lỗi khi tạo sản phẩm:", err.response?.data || err.message);
      throw err;
    }
  },

  // 🔹 Cập nhật sản phẩm
  updateProduct: async (id, formData) => {
    try {
      const res = await axios.put(`${API_URL}/products/${id}`, formData, {
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data.product;
    } catch (err) {
      console.error(
        "Lỗi khi cập nhật sản phẩm:",
        err.response?.data || err.message
      );
      throw err;
    }
  },

  // 🔹 Xóa sản phẩm
  deleteProduct: async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/products/${id}`, {
        headers: getAuthHeaders(),
      });
      return res.data.message;
    } catch (err) {
      console.error("Lỗi khi xóa sản phẩm:", err.response?.data || err.message);
      throw err;
    }
  },
};
