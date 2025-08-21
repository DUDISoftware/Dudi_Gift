// src/views/user/ProductDetail/MessagePopup.jsx
import React, { useState } from "react";

const MessagePopup = ({ onClose, onSend }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!message.trim()) return;
    onSend(message);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Nhập tin nhắn của bạn</h2>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border rounded-lg p-2 mb-4"
          rows={4}
          placeholder="Ví dụ: Mình rất cần món này, mong bạn duyệt giúp ❤️"
        />
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
          >
            Gửi
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessagePopup;
