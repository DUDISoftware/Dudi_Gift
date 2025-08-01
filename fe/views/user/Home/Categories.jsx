import React, { useState } from 'react';

import Vector from '../../../src/assets/img/Vector.png';
import Book from '../../../src/assets/img/book.png';
import Game from '../../../src/assets/img/game.png';
import Blender from '../../../src/assets/img/blender.png';
import Laptop from '../../../src/assets/img/laptop.png';

const categories = [
  {
    label: 'Quần áo',
    icon: Vector,
    borderColor: 'border-[#F5F1E9]',
    textClass: 'text-[#30A46C]',
    circleBg: 'bg-[#F5F1E9]',
  },
  {
    label: 'Sách vở',
    icon: Book,
    borderColor: 'border-[#F5E9ED]',
    textClass: 'text-[#30A46C]',
    circleBg: 'bg-[#F5E9ED]',
  },
  {
    label: 'Đồ chơi',
    icon: Game,
    borderColor: 'border-[#E9F5EA]',
    textClass: 'text-black font-bold',
    circleBg: 'bg-[#E9F5EA]',
  },
  {
    label: 'Đồ da dụng',
    icon: Blender,
    borderColor: 'border-[#E9ECF5]',
    textClass: 'text-black font-inter',
    circleBg: 'bg-[#E9ECF5]',
  },
  {
    label: 'Đồ điện tử',
    icon: Laptop,
    borderColor: 'border-[#53A059]',
    textClass: 'text-black font-inter',
    circleBg: 'bg-[#53A05917]',
  },
];

const Categories = () => {
  const [ setSelectedCategory] = useState(null); 

  return (
   <section className="bg-[#E8F5E9] py-8 rounded-lg mb-6">
  <div className="w-full flex flex-col items-center text-center px-2">
    <h2 className="text-3xl font-bold text-[#2E5E31] text-center mb-2">
      DANH MỤC PHỔ BIẾN
    </h2>
     <p className="font-[Inter] text-gray-600 text-center mb-6" >
      Khám phá các danh mục món đồ được chia sẻ nhiều nhất trong cộng đồng
    </p>

    <div className="flex flex-wrap justify-center gap-x-10 gap-y-10">
      {categories.map((item) => (
        <div
          key={item.label}
          onClick={() => setSelectedCategory(item.label)}
          className={`w-[150px] h-[150px] bg-white rounded-xl border-[2.5px] ${item.borderColor} shadow-sm flex flex-col items-center justify-center cursor-pointer transition hover:scale-105`}
        >
          <div
            className={`w-[50px] h-[50px] rounded-full ${item.circleBg} flex items-center justify-center mb-2`}
          >
            <img
              src={item.icon}
              alt={item.label}
              className="w-[35px] h-[35px] object-contain"
            />
          </div>
          <p className={`text-[18px] ${item.textClass}`}>{item.label}</p>
        </div>
      ))}
    </div>
  </div>
</section>

  );
};

export default Categories;
