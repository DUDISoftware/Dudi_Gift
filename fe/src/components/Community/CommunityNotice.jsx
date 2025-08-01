import React from 'react';
import Vector from '../../assets/img/Vector_3.png';

const CommunityNotice = () => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-md text-sm max-w-md mx-auto text-center">
      <div className="inline-block bg-[#ECFDF5] border border-[#3B66DE4D] px-4 py-1 rounded-lg mb-4">
        <h3 className="text-[#1A1A1A] font-semibold text-sm">Thông báo cộng đồng</h3>
      </div>
      <div className="flex justify-center items-start text-[#1A1A1A] text-sm">
        <img src={Vector} alt="icon" className="w-4 h-4 mt-0.5 mr-2" />
        <p className="text-left font-[Inter] text-xs">
          Đợt vinh danh Tặng Gửi sẽ diễn ra vào ngày 24/04/2025
        </p>
      </div>
    </div>
  );
};

export default CommunityNotice;
