import React, { useState } from 'react';
import { X } from 'lucide-react';
import Eye from '../../../src/assets/img/EyeIcon.png';
import RequestListPopup from './RequestListPopup';

const ProductDetailPopup = ({ product, onClose }) => {
  const [showRequestList, setShowRequestList] = useState(false);

  return (
    <>
      {!showRequestList && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 w-[400px] relative shadow-lg">
            
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={onClose}
            >
              <X size={20} />
            </button>

            <img
              src={product.img}
              alt={product.name}
              className="w-full h-52 object-contain rounded mb-4"
            />

            <div className="flex justify-between items-center mb-1">
              <h2 className="text-lg font-semibold text-[#2C3E50]">
                {product.name || 'ÁO SƠ MI NAM'}
              </h2>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <img src={Eye} alt="Eye" className="w-5 h-3" />
                <span>{product.views || '80k'} lượt xem</span>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-6">
              Chất liệu: Vải Cotton bền, đẹp, dày (35% cotton và 65% polyester).<br />
              Màu: Xanh Trơn Dài Tay (Blue).
            </p>

            <button
              onClick={() => setShowRequestList(true)}
              className="w-full py-2 rounded-xl text-white font-medium"
              style={{
                background: 'linear-gradient(180deg, #53A059 0%, #429057 100%)'
              }}
            >
              Danh sách người yêu cầu nhận quà
            </button>

            <button
              onClick={onClose}
              className="w-full mt-3 bg-gray-200 text-gray-600 font-semibold py-2 rounded-xl hover:bg-gray-300"
            >
              Đóng
            </button>
          </div>
        </div>
      )}

      {showRequestList && (
        <RequestListPopup
          productId={product.id}
          onClose={() => {
            setShowRequestList(false);
            onClose();
          }}
        />
      )}
    </>
  );
};

export default ProductDetailPopup;
