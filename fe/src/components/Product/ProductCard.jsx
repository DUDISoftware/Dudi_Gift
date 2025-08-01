import React, { useState } from 'react';
import { Truck, Box, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Heart from '../../assets/img/heart_2.png';
import HeartFilled from '../../assets/img/heart_red.png';
import ProductDetailPopup from '../../../views/user/Profile/ProductDetailPopup';

const ProductCard = ({ product, isOwner, className = '' }) => {
  const navigate = useNavigate();
  const [showDetailPopup, setShowDetailPopup] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleDetailClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleViewRequestClick = () => {
    setShowDetailPopup(true);
  };

  return (
    <>
      <div
        className={`bg-white rounded-2xl shadow p-4 flex flex-col justify-between relative h-full min-h-[460px] w-full ${className || ''}`}
      >
        <div className="absolute top-3 left-3">
          <span className="text-xs font-bold bg-blue-500 text-white px-2 py-1 rounded-full">
            {product.category || 'Danh mục'}
          </span>
        </div>

        {product.isNew && (
          <div className="absolute top-3 right-3">
            <span className="text-xs font-bold bg-yellow-400 text-white px-2 py-1 rounded-full">
              Mới
            </span>
          </div>
        )}

        <div className="flex-1 flex flex-col justify-between mt-6 mb-4">
          <img
            src={product.img}
            alt={product.name}
            className="w-full h-40 object-contain mb-4"
          />
          <div>
            <h3 className="text-base font-semibold mb-1 line-clamp-1">
              {product.name}
            </h3>
            <ul className="text-sm text-gray-700 list-disc pl-5 mb-3">
              {product.details?.slice(0, 2).map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t pt-3 text-gray-500 text-sm mt-auto">
          {product.freeShip && (
            <div className="flex items-center gap-1 min-w-0">
              <Truck size={14} className="shrink-0" />
              <span className="whitespace-normal break-words">
                Miễn phí giao hàng
              </span>
            </div>
          )}
          {product.hasBox && (
            <div className="flex items-center gap-1 min-w-0">
              <Box size={14} className="shrink-0" />
              <span className="whitespace-normal break-words">Còn box</span>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between mt-4 gap-2">
          <button
            onClick={isOwner ? handleViewRequestClick : handleDetailClick}
            className="flex-1 flex items-center justify-center gap-2 bg-[#18A661] hover:bg-[#149456] text-white text-sm font-semibold px-3 py-2 rounded-full transition whitespace-nowrap min-w-0"
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

      {isOwner && showDetailPopup && (
        <ProductDetailPopup
          product={product}
          onClose={() => setShowDetailPopup(false)}
        />
      )}
    </>
  );
};

export default ProductCard;
