import React, { useState } from 'react';
import { Truck, Box, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Heart from '../../assets/img/heart_2.png';
import HeartFilled from '../../assets/img/heart_red.png';

const ProductCard = ({ product, isOwner, className = '', onClick }) => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);

  const handleClick = () => {
    if (isOwner) {
      onClick(product);
    } else {
      navigate(`/product/${product._id || product.id}`);
    }
  };

  return (
    <div
      className={`bg-white rounded-2xl shadow p-4 flex flex-col justify-between relative w-full min-h-[460px] ${className}`}
    >
      <div className="absolute top-3 left-3 z-10">
        <span className="text-xs font-bold bg-blue-500 text-white px-2 py-1 rounded-full">
          {product.category?.category_name || 'Danh mục'}
        </span>
      </div>
      {product.isNew && (
        <div className="absolute top-3 right-3 z-10">
          <span className="text-xs font-bold bg-yellow-400 text-white px-2 py-1 rounded-full">
            Mới
          </span>
        </div>
      )}

      <div className="w-full h-40 flex justify-center items-center mb-4">
        <img
          src={product.image_url?.url || product.img || '/default-product.png'}
          alt={product.title || product.name}
          className="h-full object-contain rounded"
        />
      </div>

      <h3 className="text-base font-semibold mb-1 line-clamp-1 text-center">
        {product.title || product.name}
      </h3>

      {product.details && product.details.length > 0 && (
        <ul className="text-sm text-gray-700 list-disc pl-5 mb-3 line-clamp-2">
          {product.details.slice(0, 2).map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>
      )}

      <div className="flex flex-col gap-2 border-t pt-3 text-gray-500 text-sm mt-auto">
        {product.freeShip && (
          <div className="flex items-center gap-1">
            <Truck size={14} />
            <span>Miễn phí giao hàng</span>
          </div>
        )}
        {product.hasBox && (
          <div className="flex items-center gap-1">
            <Box size={14} />
            <span>Còn hộp</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-4 gap-2">
        <button
          onClick={handleClick}
          className="flex-1 flex items-center justify-center gap-2 bg-[#18A661] hover:bg-[#149456] text-white text-sm font-semibold px-3 py-2 rounded-full transition"
        >
          {isOwner ? 'Xem Yêu Cầu Nhận Quà' : 'Xem Chi Tiết'}
          <ArrowUpRight size={16} />
        </button>

        <button
          onClick={() => setLiked(!liked)}
          className="w-9 h-9 shrink-0"
          aria-label="Yêu thích"
        >
          <img
            src={liked ? HeartFilled : Heart}
            alt="heart"
            className="w-full h-full object-contain"
          />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
