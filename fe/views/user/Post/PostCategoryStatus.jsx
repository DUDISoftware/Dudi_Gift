import React from "react";

const PostCategoryStatus = ({ form, handleChange }) => (
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
          <option value="Quần áo">Quần áo</option>
          <option value="Sách">Sách</option>
          <option value="Đồ dùng">Đồ dùng</option>
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
          <option value="Mới">Mới</option>
          <option value="Đã sử dụng">Đã sử dụng</option>
        </select>
      </div>
    </div>
);

export default PostCategoryStatus;
