// src/components/NotificationBell/NotificationBell.jsx
import React, { useState, useEffect } from "react";
import { useNotifications } from "../context/NotificationContext";
import ProductDetailPopup from "../../views/user/Profile/ProductDetailPopup";
import ContactInfoPopup from "./ContactInfoPopup"; // Thêm component mới
import Bell from "../assets/img/bell.png";

const NotificationBell = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedOwner, setSelectedOwner] = useState(null); // Thêm state cho chủ sản phẩm

  // ✅ Debug log khi notifications thay đổi
  useEffect(() => {
    console.log("📌 Notifications từ backend:", notifications);
  }, [notifications]);

  const handleToggle = () => {
    setOpen((prev) => {
      const next = !prev;
      if (next && unreadCount > 0) markAllAsRead();
      return next;
    });
  };

  const handleClickNotification = (n) => {
    if (!n.isRead) markAsRead(n._id);
    
    // Nếu là thông báo được duyệt (approve) -> hiển thị thông tin liên hệ chủ sản phẩm
    if (n.type === "approve" && n.product && n.product.user_id) {
      setSelectedOwner(n.product.user_id);
      setOpen(false);
    } 
    // Nếu là các loại thông báo khác -> hiển thị thông tin sản phẩm như bình thường
    else if (n.product) {
      setSelectedProduct(n.product);
      setOpen(false);
    }
  };

  // Format time for display
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return "Vừa xong";
    } else if (diffInHours < 24) {
      return `${diffInHours} giờ trước`;
    } else {
      return `${Math.floor(diffInHours / 24)} ngày trước`;
    }
  };

  return (
    <div className="relative">
      {/* Bell button */}
      <button onClick={handleToggle} className="relative p-2">
        <img src={Bell} alt="bell" className="w-9 h-9" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown notifications */}
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg z-50 max-h-96 overflow-y-auto">
          <div className="p-3 border-b flex justify-between items-center">
            <h3 className="font-semibold">Thông báo</h3>
            {unreadCount > 0 && (
              <button 
                onClick={markAllAsRead}
                className="text-sm text-blue-500 hover:underline"
              >
                Đánh dấu tất cả đã đọc
              </button>
            )}
          </div>
          
          {notifications.length === 0 ? (
            <div className="p-4 text-sm text-gray-500 text-center">
              Không có thông báo
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n._id}
                onClick={() => handleClickNotification(n)}
                className={`p-3 border-b cursor-pointer transition ${
                  !n.isRead ? "bg-blue-50" : "hover:bg-gray-50"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className={`text-sm ${!n.isRead ? "font-semibold" : "text-gray-700"}`}>
                      {n.message}
                    </p>
                    
                    {n.request?.requester && (
                      <p className="text-xs text-gray-500 mt-1">
                        Từ: {n.request.requester.name}
                      </p>
                    )}
                    
                    {n.product?.title && (
                      <p className="text-xs text-gray-500 mt-1">
                        Sản phẩm: {n.product.title}
                      </p>
                    )}

                    {/* Hiển thị loại thông báo */}
                    <p className="text-xs text-gray-400 mt-1">
                      Loại: {n.type === 'approve' ? 'Được duyệt' : 
                            n.type === 'request' ? 'Yêu cầu' : 
                            n.type === 'reject' ? 'Từ chối' : n.type}
                    </p>
                  </div>
                  
                  {!n.isRead && (
                    <span className="w-2 h-2 bg-blue-500 rounded-full ml-2 mt-1"></span>
                  )}
                </div>
                
                <p className="text-xs text-gray-400 mt-2">
                  {formatTime(n.createdAt)}
                </p>
              </div>
            ))
          )}
        </div>
      )}

      {/* Product detail popup */}
      {selectedProduct && (
        <ProductDetailPopup
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* Contact info popup - Hiển thị khi được duyệt */}
      {selectedOwner && (
        <ContactInfoPopup
          owner={selectedOwner}
          onClose={() => setSelectedOwner(null)}
        />
      )}
    </div>
  );
};

export default NotificationBell;