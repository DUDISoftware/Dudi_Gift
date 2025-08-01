import React, { useState } from 'react';
import PostTitle from './PostTitle';
import PostBasicInfo from './PostBasicInfo';
import PostCategoryStatus from './PostCategoryStatus';
import PostAddress from './PostAddress';
import PostImageUpload from './PostImageUpload';
import PostActions from './PostActions';

const PostPage = () => {
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
  return (
    <div className="min-h-screen bg-[#ECFDF5] py-6 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="w-full max-w-3xl sm:max-w-4xl bg-white p-4 sm:p-6 md:p-8 rounded-2xl border border-gray-200 space-y-8">
        <div className="text-center">
          <PostTitle />
        </div>

        <div className="p-4 sm:p-5 md:p-6 rounded-lg border border-gray-200 space-y-6">
          <form className="space-y-6">
            <PostBasicInfo form={form} handleChange={handleChange} />
            <PostCategoryStatus form={form} handleChange={handleChange} />
            <PostAddress form={form} handleChange={handleChange} />
          </form>
        </div>

        <div className="p-4 sm:p-5 md:p-6 rounded-lg border border-gray-200 space-y-6">
          <PostImageUpload handleFileChange={handleFileChange} />
          <PostActions />
        </div>
      </div>
    </div>

  );
};

export default PostPage;
