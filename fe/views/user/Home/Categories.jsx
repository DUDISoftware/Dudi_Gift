import React, { useEffect, useState } from 'react';
import { productCategoryService } from '../../../src/services/productCategoryService';

const Categories = ({ onCategoryClick }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await productCategoryService.getAllCategories();
        setCategories(data);
      } catch (err) {
        console.error('Lỗi khi lấy danh mục:', err);
      }
    };
    fetchCategories();
  }, []);

  const handleClick = (catId) => {
    if (onCategoryClick) {
      onCategoryClick(catId); // ✅ Gọi callback truyền vào
    }
  };

  return (
    <section className="bg-[#E8F5E9] py-8 rounded-lg mb-6">
      <div className="w-full flex flex-col items-center text-center px-2">
        <h2 className="text-3xl font-bold text-[#2E5E31] text-center mb-2">
          DANH MỤC PHỔ BIẾN
        </h2>
        <p className="font-[Inter] text-gray-600 text-center mb-6">
          Khám phá các danh mục món đồ được chia sẻ nhiều nhất trong cộng đồng
        </p>

        <div className="flex flex-wrap justify-center gap-x-10 gap-y-10">
          {categories.map((cat) => (
            <div
              key={cat._id}
              onClick={() => handleClick(cat._id)}
              className="w-[150px] h-[150px] bg-white rounded-xl border-[2.5px] border-[#F5F1E9] shadow-sm flex flex-col items-center justify-center cursor-pointer transition hover:scale-105"
            >
              <div className="w-[70px] h-[70px] rounded-full bg-[#F5F1E9] flex items-center justify-center overflow-hidden">
                <img src={cat.icon} alt="Category Icon" className="w-[60%] h-[60%] object-contain" />
              </div>

              <p className="text-[18px] text-[#30A46C] text-center px-1">
                {cat.category_name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
