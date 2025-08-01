import React from 'react';
import Register from '../../../src/assets/img/register_1.png';
import Icon3 from '../../../src/assets/img/icon3.png';
import Chat from '../../../src/assets/img/chat.png';
import Post from '../../../src/assets/img/post_1.png';

import Number1 from '../../../src/assets/img/1.png';
import Number2 from '../../../src/assets/img/2.png';
import Number3 from '../../../src/assets/img/3.png';
import Number4 from '../../../src/assets/img/4.png';

const DonationSteps = () => {
  const steps = [
    {
      icon: Register,
      number: Number1,
      title: 'Đăng ký tài khoản',
      desc: 'Tạo tài khoản để bắt đầu hành trình lan tỏa yêu thương.',
    },
    {
      icon: Icon3,
      number: Number2,
      title: 'Chọn chương trình phù hợp',
      desc: 'Khám phá chương trình để chia sẻ món quà đúng nơi cần.',
    },
    {
      icon: Chat,
      number: Number3,
      title: 'Liên hệ và gửi vật phẩm',
      desc: 'Gửi món quà đến địa chỉ bạn chọn thông qua tin nhắn.',
    },
    {
      icon: Post,
      number: Number4,
      title: 'Lan tỏa thông điệp',
      desc: 'Chia sẻ câu chuyện và khuyến khích cộng đồng cùng hành động.',
    },
  ];

  return (
    <div className="bg-[#E8F5E9] py-12 px-4 sm:px-8 rounded-lg font-[Inter]">

      <h2 className="text-3xl font-bold text-center text-[#2E5E31]">
        CÁCH THỨC QUYÊN GÓP
      </h2>
      <p className="font-[Inter] text-center text-gray-600 mb-6">
        Khám phá các danh mục món đồ được chia sẻ nhiều nhất trong cộng đồng
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-1 text-center text-gray-700">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="relative w-28 h-28 mb-3">
              <img
                src={step.icon}
                alt={step.title}
                className="w-full h-full object-contain"
              />
              <img
                src={step.number}
                alt={`step ${index + 1}`}
                className="absolute top-0 right-0 w-6 h-6 object-contain"
              />
            </div>
            <p className="font-semibold text-base">{step.title}</p>
            <p className="text-sm mt-3 max-w-[200px]">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonationSteps;
