import React from 'react';
import IconPrev from '../../../src/assets/img/Prev.png';
import NextArrow from '../../../src/assets/img/Next_2.png';

const ImageView = ({ images, selectedIndex, setSelectedIndex }) => {
  const maxThumbnails = 3;
  const showExtraCount = images.length > maxThumbnails;

  return (
    <div className="relative flex-1 flex flex-col items-center justify-start overflow-visible w-full lg:max-w-[60%] px-2 sm:px-4">
      <div className="relative w-full flex flex-col items-center">
        <div className="absolute top-[-8px] left-0 w-full h-[1px] bg-[#7D91AA] z-10" />
        <img
          src={images[selectedIndex]}
          alt={`post-${selectedIndex}`}
          className="w-full h-auto max-w-full max-h-[65vh] sm:max-h-[75vh] object-contain rounded-xl relative z-0"
        />
      </div>

      {images.length > 1 && (
        <div className="absolute z-10 right-2 sm:right-9 top-1/2 -translate-y-1/2 space-y-1 sm:space-y-2 flex flex-col items-center">
          {images.slice(0, maxThumbnails).map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`thumb-${idx}`}
              className={`w-10 h-10 sm:w-14 sm:h-14 object-cover rounded-md border-2 cursor-pointer ${
                idx === selectedIndex ? 'border-white' : 'border-transparent'
              }`}
              onClick={() => setSelectedIndex(idx)}
            />
          ))}
          {showExtraCount && (
            <div
              className="w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center bg-black/50 text-white text-xs sm:text-sm rounded-md border-2 border-gray-300 cursor-pointer"
              onClick={() => setSelectedIndex(maxThumbnails)}
            >
              +{images.length - maxThumbnails}
            </div>
          )}
        </div>
      )}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-4 px-2 sm:px-4 py-1 sm:py-2">
        <button onClick={() => setSelectedIndex((prev) => (prev - 1 + images.length) % images.length)}>
          <img src={IconPrev} alt="prev" className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>
        <button onClick={() => setSelectedIndex((prev) => (prev + 1) % images.length)}>
          <img src={NextArrow} alt="next" className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>
      </div>
    </div>
  );
};

export default ImageView;
