import React from 'react';
import bannerImage from '../../../src/assets/img/banner.png';

const ExploreBanner = () => {
  return (
    <div className="bg-[#F4FCEF] px-4 sm:px-6 py-6">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="flex-1 font-[Montserrat] text-center md:text-left">
          <h2 className="text-[24px] sm:text-[28px] md:text-[30px] leading-[120%] font-[Montserrat] text-[#047857] break-words font-bold">
            Khám phá đồ tặng miễn phí
          </h2>
          <p className="text-[16px] sm:text-[17px] md:text-[18px] leading-[140%] mt-2 text-[#1A1A1A] font-[Montserrat] ">
            Tìm kiếm, lọc và chọn món đồ bạn cần từ cộng đồng. Tất cả đều miễn phí, thân thiện và dễ sử dụng!
          </p>
          <button className="mt-4 bg-[#059669] hover:bg-[#007E2F] text-white text-sm font-[Montserrat] px-5 py-2 rounded-full w-fit mx-auto md:mx-0">
            Bắt đầu khám phá
          </button>
        </div>
        <div className="flex-1 flex justify-center md:justify-end">
          <img
            src={bannerImage}
            alt="Món quà cũ"
            className="w-full max-w-[450px] h-[180px] sm:h-[200px] object-cover rounded-[20px]"
          />
        </div>
      </div>
    </div>
  );
};

export default ExploreBanner;
