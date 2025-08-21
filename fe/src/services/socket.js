// src/services/socket.js
import { io } from "socket.io-client";

// Get token safely
const getToken = () => {
  try {
    return localStorage.getItem("token");
  } catch (error) {
    console.error("Error getting token from localStorage:", error);
    return null;
  }
};

// Create socket instance with better configuration
const createSocket = () => {
  const baseURL = import.meta.env.VITE_API_URL?.replace("/api", "") || "http://localhost:5000";
  const token = getToken();
  
  return io(baseURL, {
    autoConnect: false,
    auth: { token },
    transports: ["websocket", "polling"],
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });
};

const socket = createSocket();

// Handle authentication errors
socket.on("connect_error", (error) => {
  console.error("Socket connection error:", error);
  if (error.message === "Authentication error") {
    // Token is invalid, redirect to login
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  }
});

// Re-authenticate when token changes
export const updateSocketAuth = (token) => {
  if (token) {
    socket.auth = { token };
    if (socket.connected) {
      socket.disconnect().connect();
    }
  } else {
    socket.disconnect();
  }
};

// Add a function to emit request events
export const emitRequest = (requestData) => {
  if (socket.connected) {
    socket.emit("sendRequest", requestData);
  } else {
    console.warn("Socket not connected, cannot send request");
  }
};

export default socket;