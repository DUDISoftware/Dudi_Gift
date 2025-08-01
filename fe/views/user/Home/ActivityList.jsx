import React from 'react';
import ActivityImage from '../../../src/assets/img/Activity.png'; 

const ActivityList = () => {
  return (
    <section className="relative bg-gray-50 px-4 py-10 rounded-lg mb-6 overflow-hidden">
      <h2 className="text-2xl sm:text-3xl font-bold text-[#2E5E31] text-center mb-1">
        CÁCH HOẠT ĐỘNG
      </h2>
      <p className="font-[Inter] text-gray-600 text-center mb-10">
        Khám phá các danh mục món đồ được chia sẻ nhiều nhất trong cộng đồng
      </p>
      <div className="flex justify-center">
        <img
          src={ActivityImage}
          alt="Cách hoạt động"
          className="w-full max-w-[1100px] px-4 sm:px-10 h-auto object-contain"
        />
      </div>
    </section>
  );
};

export default ActivityList;
