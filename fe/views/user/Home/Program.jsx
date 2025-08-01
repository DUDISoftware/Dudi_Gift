import React, { useRef } from 'react';
import ProgramImg from '../../../src/assets/img/program.png';
import Icon from '../../../src/assets/img/icon.png';

const programs = [
  {
    id: 1,
    category: 'Trẻ Em',
    title: 'Sách Cho Em',
    description:
      'Quyên Góp Sách Giáo Khoa, Truyện Thiếu Nhi Cho Trẻ Em Hiếu Học Vùng Cao Khó Khăn',
    raised: 600000,
    goal: 100000000,
    image: ProgramImg,
  },
  {
    id: 2,
    category: 'Trẻ Em',
    title: 'Sách Cho Em',
    description:
      'Quyên Góp Sách Giáo Khoa, Truyện Thiếu Nhi Cho Trẻ Em Hiếu Học Vùng Cao Khó Khăn',
    raised: 600000,
    goal: 100000000,
    image: ProgramImg,
  },
  {
    id: 3,
    category: 'Trẻ Em',
    title: 'Sách Cho Em',
    description:
      'Quyên Góp Sách Giáo Khoa, Truyện Thiếu Nhi Cho Trẻ Em Hiếu Học Vùng Cao Khó Khăn',
    raised: 600000,
    goal: 100000000,
    image: ProgramImg,
  },
  {
    id: 4,
    category: 'Trẻ Em',
    title: 'Sách Cho Em',
    description:
      'Quyên Góp Sách Giáo Khoa, Truyện Thiếu Nhi Cho Trẻ Em Hiếu Học Vùng Cao Khó Khăn',
    raised: 600000,
    goal: 100000000,
    image: ProgramImg,
  },
  {
    id: 5,
    category: 'Trẻ Em',
    title: 'Sách Cho Em',
    description:
      'Quyên Góp Sách Giáo Khoa, Truyện Thiếu Nhi Cho Trẻ Em Hiếu Học Vùng Cao Khó Khăn',
    raised: 600000,
    goal: 100000000,
    image: ProgramImg,
  },
    {
    id: 6,
    category: 'Trẻ Em',
    title: 'Sách Cho Em',
    description:
      'Quyên Góp Sách Giáo Khoa, Truyện Thiếu Nhi Cho Trẻ Em Hiếu Học Vùng Cao Khó Khăn',
    raised: 600000,
    goal: 100000000,
    image: ProgramImg,
  },
    {
    id: 7,
    category: 'Trẻ Em',
    title: 'Sách Cho Em',
    description:
      'Quyên Góp Sách Giáo Khoa, Truyện Thiếu Nhi Cho Trẻ Em Hiếu Học Vùng Cao Khó Khăn',
    raised: 600000,
    goal: 100000000,
    image: ProgramImg,
  },
    {
    id: 8,
    category: 'Trẻ Em',
    title: 'Sách Cho Em',
    description:
      'Quyên Góp Sách Giáo Khoa, Truyện Thiếu Nhi Cho Trẻ Em Hiếu Học Vùng Cao Khó Khăn',
    raised: 600000,
    goal: 100000000,
    image: ProgramImg,
  },
];
const Program = () => {
  const scrollRef = useRef();

  const handleNext = () => {
    scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
  };

  const handlePrev = () => {
    scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
  };

  return (
    <section className="bg-[#E8F5E9] p-6 rounded-none mb-6 relative">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold text-[#2E5E31]">CHƯƠNG TRÌNH</h2>
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              aria-label="Trái"
              className="w-8 h-7 bg-no-repeat bg-[length:200%_100%] bg-left"
              style={{ backgroundImage: `url(${Icon})` }}
            ></button>
            <button
              onClick={handleNext}
              aria-label="Phải"
              className="w-8 h-7 bg-no-repeat bg-[length:200%_100%] bg-right"
              style={{ backgroundImage: `url(${Icon})` }}
            ></button>
          </div>
        </div>

        <p className="font-[Inter] text-gray-700 mb-6">
          Tham gia các chương trình ý nghĩa để lan tỏa tinh thần chia sẻ trong cộng đồng
        </p>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-hidden scroll-smooth py-2"
        >
          {programs.map((program) => {
            const progress = (program.raised / program.goal) * 100;

            return (
              <div
                key={program.id}
                className="flex-shrink-0 w-[85%] sm:w-[300px] md:w-[290px] bg-white rounded-none shadow-md flex flex-col overflow-hidden"
              >
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-50 object-cover"
                />
                <div className="p-4 flex flex-col flex-1">
                  <p className="text-green-700 text-sm font-medium mb-1">
                    {program.category}
                  </p>
                  <h3 className="font-bold mb-1">{program.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 break-words">
                    {program.description}
                  </p>
                  <div className="mb-1 text-sm text-gray-600 flex justify-between">
                    <span>Tiến Độ</span>
                    <span>{program.raised.toLocaleString()} VNĐ</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-none">
                    <div
                      className="bg-green-600 h-2"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">
                    Mục Tiêu: {program.goal.toLocaleString()} VNĐ
                  </p>
                  <button className="mt-auto self-center bg-[#18A661] text-white text-sm px-3 py-2 rounded-full hover:bg-green-700 transition w-fit">
                    THAM GIA NGAY
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Program;