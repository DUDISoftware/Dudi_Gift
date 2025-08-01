import React from 'react';
import ProductCard from '../../../src/components/Product/ProductCard';
import { productService } from '../../../src/services/productService';
import ReceiverStories from '../../../src/components/Story/ReceiverStories';
import RecentPosts from '../../../src/components/Card/RecentPosts';
import TagFilters from '../../../src/components/Card/TagFilter';

const AllProducts = () => {
  const products = productService.getAllProducts();

  return (
    <div className="bg-[#E8F5E9] p-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-10"> 
      <h2 className="text-2xl font-bold text-green-700 mb-6">TẤT CẢ SẢN PHẨM</h2>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="flex justify-center">
            <button className="bg-[#18A661] text-white px-6 py-2 rounded-full text-sm font-semibold">
              XEM THÊM
            </button>
          </div>
        </div>
        <div className="lg:col-span-1 space-y-6">
          <ReceiverStories />
          <RecentPosts />
          <TagFilters />
        </div>
      </div>
    </div>
  </div>
  );
};

export default AllProducts;
