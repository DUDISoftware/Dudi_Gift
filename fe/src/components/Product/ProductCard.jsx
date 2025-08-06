import React, { useState } from 'react';
import { Truck, ArrowUpRight, User } from 'lucide-react';
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
  const getQualityLabel = (quality) => {
    switch (quality) {
      case "new":
        return "Mới";
      case "used":
        return "Đã sử dụng";
      case "like_new_90":
        return "Như mới 90%";
      case "like_new_70":
        return "Như mới 70%";
      default:
        return "Không rõ";
    }
  };
  const getDelivery = (delivery_method) => {
    switch (delivery_method) {
      case "giao_tan_tay":
        return "Giao tận tay";
      case "nguoi_nhan_den_lay":
        return "Người nhận đến lấy";
      case "gap_tai_tay":
        return "Gặp tại tay";
      default:
        return "Không rõ";
    }
  };
  return (
    <div className={`bg-white rounded-2xl shadow p-4 flex flex-col justify-between relative w-full min-h-[460px] ${className}`}>
      <div className="absolute top-3 left-3 z-10">
        <span className="text-xs font-bold bg-blue-500 text-white px-2 py-1 rounded-full">
          {product.category?.category_name || 'Danh mục'}
        </span>
      </div>

      {product.label && (
        <div className="absolute top-3 right-3 z-10">
          <span className="text-xs font-bold bg-yellow-400 text-white px-2 py-1 rounded-full">
            {product.label}
          </span>
        </div>
      )}

      <div className="w-full h-[200px] flex justify-center items-center mb-4 overflow-hidden bg-gray-50 rounded-lg">
        <img
          src={product.image_url?.url || product.img || '/default-product.png'}
          alt={product.title || product.name}
          className="w-full h-full object-cover"
        />
      </div>



      <h3 className="text-base font-semibold mb-1 line-clamp-1 text-center">
        {product.title || product.name}
      </h3>

      {product.description && (
        <p className="text-sm text-gray-700 mb-3 line-clamp-2 text-center">
          {product.description}
        </p>

      )}
      {product.quality && (
        <div className="text-center mb-3">
          <span className="inline-block text-xs font-medium bg-green-100 text-green-700 px-3 py-1 rounded-full">
            {getQualityLabel(product.quality)}
          </span>
        </div>
      )}

      {product.location && (
        <p className="text-sm text-gray-700 mb-3 line-clamp-2 text-center">
          {product.location}
        </p>

      )}

      <div className="flex flex-col gap-2 border-t pt-3 text-gray-500 text-sm mt-auto">
        {product.delivery_method && (
          <div className="flex items-center gap-1">
            <Truck size={14} />
            {getDelivery(product.delivery_method)}
          </div>
        )}
        {product.user_id && (
          <div className="flex items-center gap-1">
            <User size={14} />
            <span>{product.user_id.name}</span>
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
