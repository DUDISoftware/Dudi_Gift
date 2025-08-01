import React, { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const HorizontalSlider = ({ title, items, renderItem }) => {
  const scrollRef = useRef();

  const scroll = (direction) => {
    const amount = 300;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative mb-10">
      <h3 className="text-2xl font-bold text-[#047857] mb-4">{title}</h3>


      <div className="relative">
        <button
          onClick={() => scroll("left")}
          className="z-10 bg-white border shadow rounded-full p-2 text-green-700 hover:bg-gray-100 absolute left-2 top-1/2 -translate-y-1/2"
        >
          <FaChevronLeft />
        </button>
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scroll-smooth space-x-4 px-6 py-2"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {items.map((item, i) => (
            <div key={i} className="w-[300px] shrink-0">
              {renderItem(item)}
            </div>
          ))}
        </div>
        <button
          onClick={() => scroll("right")}
          className="z-10 bg-white border shadow rounded-full p-2 text-green-700 hover:bg-gray-100 absolute -right-2 top-1/2 -translate-y-1/2"
        >
          <FaChevronRight />
        </button>
      </div>
        </div>
  );
};

export default HorizontalSlider;
