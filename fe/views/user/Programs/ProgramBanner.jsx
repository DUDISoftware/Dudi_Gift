import React, { useState, useEffect } from 'react';
import Banner1 from '../../../src/assets/img/program.jpg';
import Banner2 from '../../../src/assets/img/program.jpg';
import PrevArrow from '../../../src/assets/img/PrevArrow.png';
import NextArrow from '../../../src/assets/img/NextArrow.png';

const ProgramBanner = () => {
  const banners = [Banner1, Banner2];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  return (
    <div className="relative w-full h-[400px] overflow-hidden">
      {banners.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`banner-${index}`}
          className={`absolute top-0 left-0 w-full h-full object-fill transition-opacity duration-700 ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        />
      ))}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30"
      >
        <img src={PrevArrow} alt="Previous" className="w-9 h-9" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30"
      >
        <img src={NextArrow} alt="Next" className="w-9 h-9" />
      </button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
        {banners.map((_, i) => (
          <span
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              i === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ProgramBanner;
