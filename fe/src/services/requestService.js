import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
axios.defaults.withCredentials = true;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const requestService = {
  // 🔹 Lấy tất cả request theo productId
  getRequestsByProductId: async (productId) => {
    try {
      const res = await axios.get(`${API_URL}/requests/product/${productId}`, {
        headers: getAuthHeaders(),
      });
      return res.data.requests;
    } catch (err) {
      console.error("Lỗi khi lấy requests:", err.response?.data || err.message);
      return [];
    }
  },

  // 🔹 Gửi request nhận sản phẩm
  createRequest: async (productId, message = "") => {
    try {
      const res = await axios.post(
        `${API_URL}/requests`,
        { productId, message },
        { headers: getAuthHeaders() }
      );
      return res.data;
    } catch (err) {
      console.error("Lỗi khi tạo request:", err.response?.data || err.message);
      throw err;
    }
  },

  // 🔹 Chủ sản phẩm duyệt request
  approveRequest: async (requestId) => {
    try {
      const res = await axios.put(
        `${API_URL}/requests/approve/${requestId}`,
        {},
        { headers: getAuthHeaders() }
      );
      return res.data;
    } catch (err) {
      console.error("Lỗi khi duyệt request:", err.response?.data || err.message);
      throw err;
    }
  },

  // 🔹 Kiểm tra trạng thái yêu cầu của user hiện tại
  checkRequestStatus: async (productId) => {
    try {
      const res = await axios.get(`${API_URL}/requests/status/${productId}`, {
        headers: getAuthHeaders(),
      });
      return res.data; // { status: 'none' | 'pending' | 'approved' | ... }
    } catch (err) {
      console.error("Lỗi khi kiểm tra trạng thái:", err.response?.data || err.message);
      return { status: "none" };
    }
  },
    // 🔹 Lấy danh sách quà đã nhận
  getReceivedGifts: async () => {
    try {
      const res = await axios.get(`${API_URL}/requests/received-gifts`, {
        headers: getAuthHeaders(),
      });
      return res.data.gifts;
    } catch (err) {
      console.error("Lỗi khi lấy quà đã nhận:", err.response?.data || err.message);
      return [];
    }
  },

  // 🔹 Lấy danh sách quà đã tặng
  getGivenGifts: async () => {
    try {
      const res = await axios.get(`${API_URL}/requests/given-gifts`, {
        headers: getAuthHeaders(),
      });
      return res.data.gifts;
    } catch (err) {
      console.error("Lỗi khi lấy quà đã tặng:", err.response?.data || err.message);
      return [];
    }
  },
};
