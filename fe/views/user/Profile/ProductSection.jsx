import React from 'react';
import ProductCard from '../../../src/components/Product/ProductCard';

const ProductSection = ({ selectedTab, setSelectedTab, products, isOwner, onProductClick, isMe }) => {
  const tabs = isMe 
    ? [
        { id: 'displaying', label: 'Sản phẩm đang hiển thị' },
        { id: 'given', label: 'Sản phẩm đã cho' },
        { id: 'pending', label: 'Sản phẩm chờ duyệt' }
      ] 
    : [
        { id: 'displaying', label: 'Sản phẩm đang hiển thị' }
      ];

  return (
    <>
      <div className="flex gap-8 mb-4 border-b border-[#4CAF50] justify-start">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`py-2 font-semibold ${
              selectedTab === tab.id ? 'border-b-2 border-black text-black' : 'text-gray-500'
            }`}
            onClick={() => setSelectedTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="px-4 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center w-full max-w-5xl mx-auto">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard
                key={product._id || product.id}
                product={product}
                isOwner={isOwner}
                onClick={() => onProductClick(product)}
                className="shadow-xl rounded-lg"
                showStatus={selectedTab === 'pending'} // Hiển thị trạng thái cho sản phẩm chờ duyệt
              />
            ))
          ) : (
            <p className="col-span-full text-gray-500">
              {selectedTab === 'pending' 
                ? 'Không có sản phẩm nào đang chờ duyệt' 
                : 'Không có sản phẩm nào.'}
            </p>
          )}
        </div>
      </div>

      {selectedTab !== 'pending' && (
        <div className="flex justify-center mt-6">
          <button className="bg-[#18A661] text-white px-6 py-2 rounded-full hover:bg-green-700 shadow-xl">
            XEM THÊM
          </button>
        </div>
      )}
    </>
  );
};

export default ProductSection;