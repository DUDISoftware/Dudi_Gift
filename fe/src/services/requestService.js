// services/requestService.js
import api from "./api";

export const requestService = {
  getRequestsByProductId: async (productId) => {
    try {
      const res = await api.get(`/requests/product/${productId}`);
      return res.data.requests || [];
    } catch (err) {
      console.error("Error getting requests:", err.response?.data || err.message);
      throw err;
    }
  },
  
  createRequest: async ({ productId, message = "" }) => {
    try {
      const res = await api.post("/requests", { productId, message });
      return res.data;
    } catch (err) {
      console.error("Error creating request:", err.response?.data || err.message);
      throw err;
    }
  },
  
  approveRequest: async (requestId) => {
    try {
      const res = await api.post(`/requests/${requestId}/approve`);
      return res.data;
    } catch (err) {
      console.error("Error approving request:", err.response?.data || err.message);
      throw err;
    }
  },
  
  // Add reject and cancel methods
  rejectRequest: async (requestId) => {
    try {
      const res = await api.post(`/requests/${requestId}/reject`);
      return res.data;
    } catch (err) {
      console.error("Error rejecting request:", err.response?.data || err.message);
      throw err;
    }
  },
  
  cancelRequest: async (requestId) => {
    try {
      const res = await api.post(`/requests/${requestId}/cancel`);
      return res.data;
    } catch (err) {
      console.error("Error canceling request:", err.response?.data || err.message);
      throw err;
    }
  },
  
  checkRequestStatus: async (productId) => {
    try {
      const res = await api.get(`/requests/status/${productId}`);
      return res.data;
    } catch (err) {
      console.error("Error checking request status:", err.response?.data || err.message);
      throw err;
    }
  },
  
  getReceivedGifts: async () => {
    try {
      const res = await api.get("/requests/received");
      return res.data || [];
    } catch (err) {
      console.error("Error getting received gifts:", err.response?.data || err.message);
      throw err;
    }
  },
  
  getGivenGifts: async () => {
    try {
      const res = await api.get("/requests/given");
      return res.data || [];
    } catch (err) {
      console.error("Error getting given gifts:", err.response?.data || err.message);
      throw err;
    }
  }
};