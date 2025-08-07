import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PostTitle from './PostTitle';
import PostBasicInfo from './PostBasicInfo';
import PostCategoryStatus from './PostCategoryStatus';
import PostAddress from './PostAddress';
import PostImageUpload from './PostImageUpload';
import PostActions from './PostActions';
import { productService } from '../../../src/services/productService';
import { productCategoryService } from '../../../src/services/productCategoryService';

const PostPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await productCategoryService.getAllCategories();
        setCategories(data);
      } catch (err) {
        console.error("Lỗi khi lấy danh mục:", err);
      }
    };
    fetchCategories();
  }, []);

  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    condition: '',
    province: '',
    ward: '',
    addressDetail: '',
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5);
    setForm((prev) => ({ ...prev, images: files }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const qualityMap = {
      "Mới": "new",
      "Đã sử dụng": "used",
      "Như mới 90%": "like_new_90",
      "Như mới 70%": "like_new_70",
    };

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("quality", qualityMap[form.condition] || "new");
    formData.append("location", `${form.addressDetail}, ${form.ward}, ${form.province}`);
    formData.append("label", "Mới");
    formData.append("is_heavy", false);
    formData.append("contact_phone", "0123456789");
    formData.append("contact_zalo", "0123456789");
    formData.append("delivery_method", "giao_tan_tay");

    if (form.images[0]) {
      formData.append("image_url", form.images[0]); // ảnh chính
    }

    form.images.slice(1).forEach((file) => {
      formData.append("sub_images_urls", file); // ảnh phụ
    });

    try {
      await productService.createProduct(formData);
      alert("Đăng sản phẩm thành công!");
      navigate("/");
    } catch (err) {
      console.error("Lỗi khi tạo sản phẩm:", err);
      alert("Đăng sản phẩm thất bại!");
    }
  };

  return (
    <div className="min-h-screen bg-[#ECFDF5] py-6 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="w-full max-w-3xl sm:max-w-4xl bg-white p-4 sm:p-6 md:p-8 rounded-2xl border border-gray-200 space-y-8">
        <div className="text-center">
          <PostTitle />
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="p-4 sm:p-5 md:p-6 rounded-lg border border-gray-200 space-y-6">
            <PostBasicInfo form={form} handleChange={handleChange} />
            <PostCategoryStatus form={form} handleChange={handleChange} categories={categories} />
            <PostAddress form={form} handleChange={handleChange} />
          </div>

          <div className="p-4 sm:p-5 md:p-6 rounded-lg border border-gray-200 space-y-6">
            <PostImageUpload handleFileChange={handleFileChange} images={form.images} />
            <PostActions />
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostPage;
