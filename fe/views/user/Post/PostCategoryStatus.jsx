import React from "react";

const qualityOptions = [
  { value: "new", label: "Mới 100%" },
  { value: "like_new_90", label: "Như mới 90%" },
  { value: "like_new_70", label: "Như mới 70%" },
  { value: "used", label: "Đã sử dụng" },
];

const PostCategoryStatus = ({ form, handleChange, categories }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
      <label htmlFor="category" className="text-sm font-semibold whitespace-nowrap w-full sm:w-24">
        3. DANH MỤC
      </label>
      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="w-full sm:w-[160px] h-[40px] border border-[#CDF8E4] bg-[#ECFDF5] text-sm text-[#0A806B] rounded-lg px-4 py-2 focus:outline-none"
      >
        <option value="">Chọn Danh Mục</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>{cat.category_name}</option>
        ))}
      </select>
    </div>

    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
      <label htmlFor="condition" className="text-sm font-semibold whitespace-nowrap w-full sm:w-28">
        4. TÌNH TRẠNG
      </label>
      <select
        name="condition"
        value={form.condition}
        onChange={handleChange}
        className="w-full sm:w-[160px] h-[40px] border border-[#CDF8E4] bg-[#ECFDF5] text-sm text-[#0A806B] rounded-lg px-4 py-2 focus:outline-none"
      >
        <option value="">Chọn tình trạng</option>
        {qualityOptions.map((q) => (
          <option key={q.value} value={q.value}>{q.label}</option>
        ))}
      </select>
    </div>
  </div>
);

export default PostCategoryStatus;
