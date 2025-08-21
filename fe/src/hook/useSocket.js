// hook/useSocket.js
import { useEffect, useRef } from "react";
import socket, { updateSocketAuth } from "../services/socket";

export const useSocket = (userId, onNotification) => {
  const onNotificationRef = useRef(onNotification);
  
  // Keep the callback current
  useEffect(() => {
    onNotificationRef.current = onNotification;
  }, [onNotification]);

  useEffect(() => {
    if (!userId) {
      socket.disconnect();
      return;
    }

    // Update socket authentication with current token
    const token = localStorage.getItem("token");
    updateSocketAuth(token);

    // Connect socket if not connected
    if (!socket.connected) {
      socket.connect();
    }

    // Listen for notifications
    const handleNotification = (notification) => {
      if (onNotificationRef.current) {
        onNotificationRef.current(notification);
      }
    };

    socket.on("notification", handleNotification);

    // Cleanup on unmount
    return () => {
      socket.off("notification", handleNotification);
      // Don't disconnect completely as other components might be using it
    };
  }, [userId]);
};