// src/components/NotificationBell/ContactInfoPopup.jsx
import React from "react";
import DefaultAvatar from "../assets/img/avatar_1.png";

const ContactInfoPopup = ({ owner, onClose }) => {
  if (!owner) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Thông tin liên hệ</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>

        <div className="text-center mb-6">
          <img
            src={owner.avatar?.url || DefaultAvatar}
            alt={owner.name}
            className="w-20 h-20 rounded-full mx-auto mb-3"
          />
          <h3 className="text-lg font-semibold">{owner.name}</h3>
          <p className="text-gray-600">{owner.email}</p>
        </div>

        <div className="space-y-3">
          {owner.phone && (
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600 mr-3">📞</span>
              <div>
                <p className="text-sm text-gray-500">Số điện thoại</p>
                <p className="font-medium">{owner.phone}</p>
              </div>
            </div>
          )}

          {owner.address && (
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600 mr-3">🏠</span>
              <div>
                <p className="text-sm text-gray-500">Địa chỉ</p>
                <p className="font-medium">{owner.address}</p>
              </div>
            </div>
          )}

          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-600 mr-3">📧</span>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{owner.email}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Đóng
          </button>
          <div className="space-x-2">
            {owner.phone && (
              <a
                href={`tel:${owner.phone}`}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Gọi điện
              </a>
            )}
            <a
              href={`mailto:${owner.email}`}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Gửi email
            </a>
          </div>
        </div>

        <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
          <p className="text-sm text-yellow-800">
            💡 Bạn đã được chấp nhận nhận sản phẩm. 
            Hãy liên hệ với người tặng để sắp xếp thời gian nhận quà.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactInfoPopup;