import React from 'react';
import successIcon from '../../../src/assets/img/success.png';
import { useNavigate } from 'react-router-dom';

const SuccessPopup = ({ recipientName = 'Người nhận', onClose }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
      <div className="relative bg-[#ECFDF3] border border-[#D1FADF] rounded-xl shadow-lg px-6 pt-20 w-full max-w-sm text-center">
        
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130px] h-[130px] bg-[#ECFDF3] rounded-full flex items-center justify-center">
          <div className="w-[110px] h-[110px] bg-[#D1FADF] rounded-full flex items-center justify-center">
            <img src={successIcon} alt="Thành công" className="w-[60px] h-[60px]" />
          </div>
        </div>

        <h2 className="text-3xl font-bold font-[Inter] text-[#7C8691] mt-2">Thành công</h2>
        <p className="text-sm text-[#2C3E50] mt-2 mb-4">
          Sản phẩm của bạn đã được chấp thuận gửi cho<br />
          <span className="font-semibold">{recipientName}</span>
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
              onClick={() => navigate('/')}
              className="flex-1 px-4 py-2 rounded-md bg-[#027A48] text-white text-sm font-[Inter] whitespace-nowrap"
            >
              Quay về trang chủ
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SuccessPopup;
