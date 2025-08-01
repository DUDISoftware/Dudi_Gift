import React from 'react';
import { Trash2 } from 'lucide-react';

const FailurePopup = ({ onClose, requestTime }) => {
  const handleOverlayClick = (e) => {
    if (e.target.id === 'overlay') {
      onClose();
    }
  };

  return (

    <div
      id="overlay"
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="absolute w-full h-full bg-black opacity-50"></div>

      <div className="relative z-10 bg-[#FEF3F2] rounded-xl shadow-lg px-6 pt-20 w-full max-w-sm text-center">
        
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130px] h-[130px] bg-[#FEF3F2] rounded-full flex items-center justify-center">
          <div className="w-[110px] h-[110px] bg-[#FEE4E2] rounded-full flex items-center justify-center">
            <Trash2 size={48} className="text-[#D92D20]" />
          </div>
        </div>

        <h2 className="text-3xl font-bold font-[Inter] text-[#7C8691] mt-2">Thất bại</h2>
        <p className="text-sm text-gray-600 mt-2 mb-4">
          Bạn đã gửi yêu cầu nhận sản phẩm này<br />
          lúc {requestTime}
        </p>

        <div className="bg-[#F1F5F8] w-[calc(100%+3rem)] -mx-6 px-6 py-4 rounded-b-xl">
          <div className="flex justify-between gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded-md bg-[#D0DEEB] text-[#9BA9B9] text-sm font-[Inter] whitespace-nowrap"
            >
              Đóng
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="flex-1 px-4 py-2 rounded-md bg-[#FB4B4B] text-white text-sm font-[Inter] whitespace-nowrap"
            >
              Quay về trang chủ
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FailurePopup;
