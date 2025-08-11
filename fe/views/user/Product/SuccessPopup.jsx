import React from 'react';
import Success from '../../../src/assets/img/success.png';
import { CheckCircle } from 'lucide-react'; // Thêm icon từ lucide-react

const SuccessPopup = ({ onClose, message = "Bạn đã đăng ký yêu cầu nhận sản phẩm thành công!", showHomeButton = true }) => {
  const handleOverlayClick = (e) => {
    if (e.target.id === 'overlay') {
      onClose();
    }
  };

  const handleClose = () => {
    onClose();
    // Có thể thêm các xử lý khác sau khi đóng popup
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
            {/* Có thể dùng icon hoặc hình ảnh */}
            <CheckCircle size={60} className="text-[#039855]" />
            {/* Hoặc dùng hình ảnh như cũ */}
            {/* <img src={Success} alt="Thành công" className="w-[60px] h-[60px]" /> */}
          </div>
        </div>

        {/* Nội dung */}
        <div className="flex flex-col items-center justify-center mt-4">
          <h2 className="text-3xl font-bold font-[Inter] text-[#039855] mt-2">Thành công</h2>
          <p className="text-sm text-gray-600 mt-2 mb-4 px-4">
            {message}
          </p>
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
                onClick={() => window.location.href = '/'}
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