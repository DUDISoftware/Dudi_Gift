import React from 'react';
import { CheckCircle } from 'lucide-react';
import DefaultAvatar from '../../../src/assets/img/avatar_1.png';

const SuccessPopup = ({
  onClose,
  message = "Bạn đã đăng ký yêu cầu nhận sản phẩm thành công!",
  showHomeButton = true,
  receiver = null // 👈 thêm prop mới
}) => {
  const handleOverlayClick = (e) => {
    if (e.target.id === 'overlay') {
      onClose();
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div
      id="overlay"
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="absolute w-full h-full bg-black opacity-50"></div>

      <div className="relative z-10 bg-[#ECFDF3] rounded-xl shadow-lg px-6 pt-20 w-full max-w-sm text-center">
        {/* Icon success */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130px] h-[130px] bg-[#ECFDF3] rounded-full flex items-center justify-center">
          <div className="w-[110px] h-[110px] bg-[#D1FADF] rounded-full flex items-center justify-center">
            <CheckCircle size={60} className="text-[#039855]" />
          </div>
        </div>

        {/* Nội dung */}
        <div className="flex flex-col items-center justify-center mt-4">
          <h2 className="text-3xl font-bold font-[Inter] text-[#039855] mt-2">Thành công</h2>
          <p className="text-sm text-gray-600 mt-2 mb-4 px-4">{message}</p>

          {/* 👇 Hiển thị thông tin người nhận nếu có */}
          {receiver && (
            <div className="flex flex-col items-center gap-2 mt-3">
              <img
                src={receiver.avatar || DefaultAvatar}
                alt={receiver.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-green-400"
              />

              <p className="text-base font-medium text-gray-800">{receiver.name}</p>
              <p className="text-base font-medium text-gray-800">{receiver.phone}</p>
              <p className="text-base font-medium text-gray-800">{receiver.address}</p>
              <p className="text-base font-medium text-gray-800">{receiver.email}</p>

              {receiver.message && (
                <p className="text-sm text-gray-500 italic">"{receiver.message}"</p>
              )}
            </div>
          )}
        </div>

        {/* Footer với nút bấm */}
        <div className="bg-[#F1F5F8] w-[calc(100%+3rem)] -mx-6 px-6 py-6 rounded-b-xl">
          <div className="flex justify-between gap-3">
            <button
              onClick={handleClose}
              className="flex-1 px-4 py-2 rounded-md bg-[#D0DEEB] text-[#475467] text-sm font-[Inter] whitespace-nowrap hover:bg-[#C4D4E3] transition-colors"
            >
              Đóng
            </button>

            {showHomeButton && (
              <button
                onClick={() => (window.location.href = '/')}
                className="flex-1 px-4 py-2 rounded-md bg-[#027A48] text-white text-sm font-[Inter] whitespace-nowrap hover:bg-[#02603F] transition-colors"
              >
                Quay về trang chủ
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPopup;
