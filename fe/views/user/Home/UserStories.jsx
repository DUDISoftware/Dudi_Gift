import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa';
import Picture from '../../../src/assets/img/image_1.png';
import Image2 from '../../../src/assets/img/image_2.png';

const testimonials = [
  {
    id: 1,
    name: 'Anh Hùng, Q.1',
    image: Picture,
    quote: 'Mình tặng một chiếc áo khoác cũ, không ngờ lại giúp được một bạn nhỏ.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Chị Lan, Q.3',
    image: Image2,
    quote: 'Thật tuyệt khi có thể chia sẻ đồ dùng còn mới cho người cần nó hơn.',
    rating: 4,
  },
  {
    id: 3,
    name: 'Chị An, Thủ Đức',
    image: Image2,
    quote: 'Nhờ mọi người tặng sách mà mình có thêm tài liệu học tốt hơn.',
    rating: 5,
  },
];

const TestimonialCard = ({ data, isMain }) => (
  <div
    className={`bg-white rounded-lg shadow-md px-6 py-6 transition-all duration-300 text-center
      ${isMain ? 'scale-105 z-10 w-[320px] sm:w-[400px]' : 'scale-95 w-[260px] opacity-50'}
    `}
  >
    <img
      src={data.image}
      alt={data.name}
      className={`mx-auto mb-4 rounded-full ${isMain ? 'w-24 h-24' : 'w-20 h-20'}`}
    />
    <p className={`italic text-gray-700 ${isMain ? 'text-base' : 'text-sm'}`}>
      “{data.quote}”
    </p>
    {isMain && (
      <div className="flex justify-center text-orange-400 mt-2 mb-1">
        {Array.from({ length: data.rating }).map((_, i) => (
          <FaStar key={i} className="mx-0.5" />
        ))}
      </div>
    )}
    <p className="text-sm font-medium text-green-700 mt-2">– {data.name}</p>
  </div>
);

const UserStories = () => {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  const next = () => setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  const getIndex = (offset) => (current + offset + testimonials.length) % testimonials.length;

  return (
   <section className="bg-[#E8F5E9] w-full py-10 text-center">
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <h2 className="text-3xl font-bold text-[#2E5E31] mb-1">CÂU CHUYỆN CỦA NGƯỜI DÙNG</h2>
      <p className="font-[Inter] text-[#3E3C63] mb-8 text-m ">Những chia sẻ của các cá nhân đã đồng hành cùng chúng tôi</p>

      <div className="relative flex items-center justify-center">
        <div className="w-full flex justify-center items-center relative" style={{ height: '300px' }}>
          <div className="absolute left-1/2 transform -translate-x-[160%] z-0">
            <TestimonialCard data={testimonials[getIndex(-1)]} />
          </div>

          <div className="relative z-10">
            <TestimonialCard data={testimonials[getIndex(0)]} isMain />
          </div>

          <div className="absolute left-1/2 transform translate-x-[60%] z-0">
            <TestimonialCard data={testimonials[getIndex(1)]} />
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8 gap-4">
        <button
          onClick={prev}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow text-green-700 hover:bg-green-100 transition"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={next}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow text-green-700 hover:bg-green-100 transition"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  </section>

  );
};

export default UserStories;
