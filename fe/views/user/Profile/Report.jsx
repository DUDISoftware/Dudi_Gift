import React from 'react';
import reportIcon from '../../../src/assets/img/reportIcon.png'; 

const Report = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute w-full h-full bg-black opacity-50"
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-xl p-6 w-[500px] z-50 shadow-lg">
        <img src={reportIcon} alt="Report Icon" className="w-10 h-10" />
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl font-bold text-gray-900">BÁO CÁO VI PHẠM</h2>
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-left text-sm font-semibold text-gray-700">
            TIN NÀY CÓ VẤN ĐỀ GÌ
          </label>
          <select className="w-full border border-gray-300 rounded-md p-2 text-sm">
            <option>CHỌN VẤN ĐỀ</option>
            <option>Thông tin sai sự thật</option>
            <option>Hành vi lừa đảo</option>
            <option>Nội dung không phù hợp</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-left text-sm font-semibold text-gray-700">
            CHI TIẾT
          </label>
          <textarea
            className="w-full border border-gray-300 rounded-md p-2 text-sm"
            rows={4}
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-left text-sm font-semibold text-gray-700 leading-snug">
            Thông tin để “MÓN QUÀ NHỎ” liên hệ với bạn khi cần thiết
          </label>
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-2 border border-gray-300 rounded-md p-2 text-sm"
          />
          <input
            type="text"
            placeholder="Số điện thoại"
            className="w-full border border-gray-300 rounded-md p-2 text-sm"
          />
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={onClose}
            className="w-1/2 py-2 rounded-md border border-gray-300 text-sm"
          >
            Đóng
          </button>
          <button
            type="submit"
            className="w-1/2 py-2 rounded-md text-white text-sm"
            style={{ backgroundColor: '#047857' }}
          >
            Gửi báo cáo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Report;
