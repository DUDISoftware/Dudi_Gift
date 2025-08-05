import React, { useEffect, useState, useRef } from 'react';
import ProductCard from '../../../src/components/Product/ProductCard';
import { productService } from '../../../src/services/productService';

const NewlyPosted = () => {
  const [products, setProducts] = useState([]);
  const scrollRef = useRef();

  useEffect(() => {
    const fetchNewProducts = async () => {
      try {
        const newProducts = await productService.getNewProducts();
        setProducts(newProducts);
      } catch (err) {
        console.error("Không thể lấy sản phẩm mới:", err);
      }
    };
    fetchNewProducts();
  }, []);


  const handleNext = () => {
    scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
  };

  const handlePrev = () => {
    scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
  };

  return (
    <section className="w-full bg-gradient-to-b from-[#73C076] to-white/0 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white drop-shadow">MỚI ĐĂNG</h2>
          <div className="flex gap-3">
            <button
              onClick={handlePrev}
              className="w-8 h-7 bg-[url('/src/assets/img/icon_2.png')] bg-no-repeat bg-[length:200%_100%] bg-left"
              aria-label="Trái"
            ></button>
            <button
              onClick={handleNext}
              className="w-8 h-7 bg-[url('/src/assets/img/icon_2.png')] bg-no-repeat bg-[length:200%_100%] bg-right"
              aria-label="Phải"
            ></button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-hidden scroll-smooth py-2"
        >
          {products.map((product) => (
            <div key={product._id} className="flex-shrink-0 w-[85%] sm:w-[300px] md:w-[280px]">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewlyPosted;
