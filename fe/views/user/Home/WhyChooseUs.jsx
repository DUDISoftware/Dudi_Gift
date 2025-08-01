import React from 'react';
import { FaRecycle, FaHeart, FaLightbulb, FaRocket } from 'react-icons/fa';

const WhyChooseUs = () => {
  return (
    <section className="bg-gray-50 px-6 py-10 rounded-lg mb-6 text-center">
       <div className="container mx-auto px-2">
      <h2 className="text-3xl font-bold text-[#2E5E31] mb-2">

        VÌ SAO NÊN CHỌN CHÚNG TÔI
      </h2>
      <p className="font-[Inter] text-[#3E3C63] text-base mb-8">
        Chúng tôi hướng đến một cộng đồng chia sẻ tích cực và bền vững
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {[
          {
            icon: <FaRecycle className="text-green-700 text-4xl" />,
            title: 'Bảo vệ môi trường',
            desc: 'Giảm rác thải bằng cách tái sử dụng đồ cũ, góp phần bảo vệ hành tinh xanh.',
          },
          {
            icon: <FaHeart className="text-green-700 text-4xl" />,
            title: 'Lan tỏa yêu thương',
            desc: 'Chia sẻ đồ dùng với những người cần, mang lại niềm vui và sự hỗ trợ.',
          },
          {
            icon: <FaLightbulb className="text-green-700 text-4xl" />,
            title: 'Văn minh & tiết kiệm',
            desc: 'Thói quen tái sử dụng giúp tiết kiệm chi phí và xây dựng lối sống bền vững.',
          },
          {
            icon: <FaRocket className="text-green-700 text-4xl" />,
            title: 'Dễ dàng sử dụng',
            desc: 'Giao diện thân thiện, thao tác đơn giản, ai cũng có thể tham gia.',
          },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white min-h-[300px] px-6 py-8 rounded-lg shadow flex flex-col items-center justify-center text-center"
          >
            <div className="h-16 w-16 flex items-center justify-center mb-4">
              {item.icon}
            </div>
            <h3 className="text-lg font-bold text-green-800 mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
