import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productService } from '../../../src/services/productService';
import { userService } from '../../../src/services/userService';
import GiftsByUser from './GiftsByUser';
import SimilarProducts from './SimilarProducts';
import Avatar from '../../../src/assets/img/avatar_1.png';
import Chat from '../../../src/assets/img/chat2.png';
import Shop from '../../../src/assets/img/shop.png';
import Star from '../../../src/assets/img/star.png';
import Eye from '../../../src/assets/img/eye_2.png';
import Search from '../../../src/assets/img/iconsearch.png';
import Heart from '../../../src/assets/img/heart.png';
import SuccessPopup from './SuccessPopup';
import FailurePopup from './FailurePopup';

const ProductDetail = () => {
  const { id } = useParams();
  const product = productService.getProductById(id);

  const imageList = product?.images || [product?.img];
  const [selectedImage, setSelectedImage] = useState(imageList[0]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);

  const [requestTime] = useState(() => {
    const now = new Date();
    return now.toLocaleTimeString('vi-VN') + ' ngày ' + now.toLocaleDateString('vi-VN');
  });

  if (!product) return <div className="p-6">Sản phẩm không tồn tại</div>;

  const matchedUser = userService.getAllUsers().find(u => u.name === product.user);
  const username = matchedUser?.username || '';
  const profileLink = username ? `/profile/${username}` : '#';

  const handleReceive = () => {
    if (product.given) {
      setShowFailure(true);
    } else {
      setShowSuccess(true);
      product.given = true;
    }
  };

  return (
    <div className="bg-[#E8F5E9] min-h-screen py-6 px-2 sm:px-6">
      <div className="max-w-7xl mx-auto">

        <div className="bg-[#F4FCEF] p-6 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600 mb-2 italic">
            Món quà nhỏ &gt;&gt; {product.category} &gt;&gt; {product.name}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="flex gap-4">
              <div className="flex flex-col gap-2 w-20">
                {imageList.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`thumb-${i}`}
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-20 object-cover border rounded cursor-pointer ${
                      selectedImage === img ? 'ring-2 ring-green-500' : ''
                    }`}
                  />
                ))}
              </div>
              <img
                src={selectedImage}
                alt={product.name}
                className="flex-1 h-[420px] object-contain rounded shadow"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center gap-2 text-sm text-gray-700 mb-3">
                <img src={Heart} alt="Yêu thích" className="w-4 h-4" />
                <span>Thêm vào yêu thích</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-xs font-medium bg-[#D1FAE5] text-[#047857] px-2 py-1 rounded-full">
                  {product.category}
                </span>
                <span className="inline-flex items-center text-xs font-medium bg-[#F2F2F2] text-[#047857] px-2 py-1 rounded-full">
                  <img
                    src={Search}
                    alt="Tìm kiếm"
                    className="w-4 h-4 mr-1"
                  />
                  Q.1, TPHCM
                </span>
                {product.isNew && (
                  <span className="text-xs font-medium bg-[#FEF08A] text-[#047857] px-2 py-1 rounded-full">
                    Mới
                  </span>
                )}
              </div>

              <div className="mb-2 border-b border-gray-200 pb-1">
                <p className="text-sm text-[#868686]">
                  Màu sắc: <strong className="text-black">Đen</strong>
                </p>
              </div>

             <div className="border-b border-gray-200 pb-1 mb-4 text-sm flex justify-between items-center">
                <p className="text-sm text-[#868686]">
                  Size: <strong className="text-black">6</strong>
                </p>
                <span className="flex items-center">
                  <img
                    src={Eye}
                    alt="eye"
                    className="w-5 h-5 mr-1"
                  />
                  <a href="#" className="text-black underline text-sm">Xem cách chọn size</a>
                </span>
              </div>
              <div className="flex gap-3 mb-4">
                <Link
                  to={`/messages?user=${encodeURIComponent(username)}&product=${product.id}`}
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-full border border-green-500 text-green-700 hover:bg-green-50 transition"
                >
                  <img src={Chat} alt="Chat" className="w-5 h-5" />
                  Chat ngay
                </Link>

                <button
                  onClick={handleReceive}
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition"
                >
                  <img src={Shop} alt="Đặt hàng" className="w-5 h-5" />
                  Nhận ngay
                </button>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <img src={Avatar} alt="Người đăng" className="w-10 h-10 rounded-full" />
                <div>
                  <Link to={profileLink} className="font-medium text-blue-600 hover:underline">
                    {product.user}
                  </Link>
                  <p className="text-xs text-gray-500">Dudi Software <br /> Hoạt động 5 phút trước</p>
                </div>
                <div className="ml-auto text-sm flex flex-col items-end leading-tight">
                  <div className="flex items-center gap-1">
                    <span>4.6</span>
                    <img src={Star} alt="star" className="w-5 h-5" />
                  </div>
                  <span>16 đánh giá</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  'Làm sao để tôi nhận được sản phẩm?',
                  'Sản phẩm này còn không?',
                  'Sản phẩm này có không?'
                ].map((text, i) => (
                  <button
                    key={i}
                    className="px-4 py-2 bg-[#E4E6EB] hover:bg-[#E4E6EB] rounded-full text-sm text-gray-700"
                  >
                    {text}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-[#F4FCEF] p-4 mb-4">
            <div className="relative mb-4">
              <h3 className="text-lg font-bold inline-block relative z-10 after:content-[''] after:block after:h-[2px] after:bg-black after:w-[120px] after:mt-1">
                Mô tả sản phẩm
              </h3>
              <div className="absolute bottom-0 left-0 w-full border-b border-[#4CAF50]"></div>
            </div>
            <div className="text-sm text-gray-700 space-y-2">
              {product.description?.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>

          <div className="bg-[#F4FCEF] p-4">
            <h3 className="text-lg font-bold mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {(product.tags || []).map((tag, i) => (
                <span
                  key={i}
                  className="text-sm bg-[#919EAB29] hover:bg-[#919EAB29] px-3 py-1 rounded-full cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8">
          <div className="max-w-7xl mx-auto">
            <GiftsByUser user={product.user} currentProductId={product.id} />
          </div>
        </div>
        <div className="mt-8">
          <div className="max-w-7xl mx-auto">
            <SimilarProducts />
          </div>
        </div>
        {showSuccess && <SuccessPopup onClose={() => setShowSuccess(false)} />}
        {showFailure && <FailurePopup onClose={() => setShowFailure(false)} requestTime={requestTime} />}
      </div>
    </div>
  );
};

export default ProductDetail;
