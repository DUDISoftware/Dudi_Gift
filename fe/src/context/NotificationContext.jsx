// context/NotificationContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { notificationService } from "../services/notificationService";
import { useSocket } from "../hook/useSocket";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Get current user safely
  const getCurrentUser = () => {
    try {
      const userStr = localStorage.getItem("user");
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      return null;
    }
  };
  
  const currentUser = getCurrentUser();
  const userId = currentUser?._id || currentUser?.id;

  // Load notifications on mount
  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const loadNotifications = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await notificationService.getMyNotifications();
        setNotifications(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load notifications:", err);
        setError("Không thể tải thông báo");
      } finally {
        setLoading(false);
      }
    };

    loadNotifications();
  }, [userId]);

  // Socket realtime updates
  const handleNewNotification = (notification) => {
    setNotifications(prev => {
      // Check if notification already exists to avoid duplicates
      const exists = prev.some(n => n._id === notification._id);
      if (exists) return prev;
      
      return [notification, ...prev];
    });
  };

  useSocket(userId, handleNewNotification);

  const markAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    } catch (err) {
      console.error("Failed to mark all as read:", err);
      throw err;
    }
  };

  const markAsRead = async (id) => {
    try {
      await notificationService.markAsRead(id);
      setNotifications(prev =>
        prev.map(n => (n._id === id ? { ...n, isRead: true } : n))
      );
    } catch (err) {
      console.error("Failed to mark as read:", err);
      throw err;
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const value = {
    notifications,
    unreadCount,
    loading,
    error,
    markAsRead,
    markAllAsRead,
    refresh: () => {
      if (userId) {
        notificationService.getMyNotifications()
          .then(data => setNotifications(Array.isArray(data) ? data : []))
          .catch(err => console.error("Failed to refresh:", err));
      }
    }
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
};