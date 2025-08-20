import React, { useEffect, useState } from 'react';
import ProductCard from '../../../src/components/Product/ProductCard';
import { productService } from '../../../src/services/productService';
import { productCategoryService } from '../../../src/services/productCategoryService';
import ReceiverStories from '../../../src/components/Story/ReceiverStories';
import RecentPosts from '../../../src/components/Card/RecentPosts';
import TagFilters from '../../../src/components/Card/TagFilter';
import { useLocation, useNavigate } from 'react-router-dom';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Lấy categoryId từ URL
  const params = new URLSearchParams(location.search);
  const selectedCategoryId = params.get('category');

  // ✅ Load danh mục
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await productCategoryService.getAllCategories();
      setCategories(res);
    };
    fetchCategories();
  }, []);

  // ✅ Load sản phẩm theo query `category`
  useEffect(() => {
    const fetchProducts = async () => {
      let res;
      if (selectedCategoryId) {
        res = await productService.getProductsByCategory(selectedCategoryId);
      } else {
        res = await productService.getAvailableProducts();
      }
      setProducts(res);
    };
    fetchProducts();
  }, [selectedCategoryId]);

  // ✅ Khi click chọn danh mục
  const handleCategoryClick = (catId) => {
    if (catId === null) {
      navigate('/explore');
    } else {
      navigate(`/explore?category=${catId}`);
    }
  };

  return (
    <div className="bg-[#E8F5E9] p-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-10"> 
        <h2 className="text-2xl font-bold text-green-700 mb-6">TẤT CẢ SẢN PHẨM</h2>

        {/* Bộ lọc danh mục */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() => handleCategoryClick(null)}
            className={`px-4 py-2 rounded-full text-sm font-semibold border ${
              !selectedCategoryId ? 'bg-green-600 text-white' : 'bg-white text-gray-800'
            }`}
          >
            Tất cả
          </button>
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => handleCategoryClick(cat._id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border ${
                selectedCategoryId === cat._id ? 'bg-green-600 text-white' : 'bg-white text-gray-800'
              }`}
            >
              {cat.category_name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
              {products.length > 0 ? (
                products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))
              ) : (
                <p className="text-center col-span-full text-gray-600">Không có sản phẩm nào.</p>
              )}
            </div>
            <div className="flex justify-center">
              <button className="bg-[#18A661] text-white px-6 py-2 rounded-full text-sm font-semibold">
                XEM THÊM
              </button>
            </div>
          </div>

          {/* Sidebar */}
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
