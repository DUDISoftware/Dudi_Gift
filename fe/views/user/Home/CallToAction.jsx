import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const CallToAction = () => {
  return (
    <section className="bg-white px-4 py-10 rounded-lg text-center">
      <h2 className="text-2xl font-bold text-[#2E5E31]">
        Trao đi món đồ cũ, nhận lại niềm vui mới!
      </h2>
      <p className="text-gray-800 leading-relaxed">
        Mỗi món đồ, dù nhỏ, đều có thể mang lại niềm vui nếu đến đúng người. <br />
        Mỗi hành động tử tế, dù giản dị, cũng có thể góp phần làm cho thế giới này tốt đẹp hơn.
      </p>

      <div className="flex justify-center gap-4 mt-6">
        <button className="bg-[#18A661] text-white font-medium px-5 py-2 rounded-full flex items-center gap-2 transition">
          Tham gia cộng đồng <FaArrowRight />
        </button>
        <button className="border border-green-600 text-green-600 hover:bg-green-50 font-medium px-5 py-2 rounded-full transition">
          Tìm hiểu thêm
        </button>
      </div>
    </section>
  );
};

export default CallToAction;
