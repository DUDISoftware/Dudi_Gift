import React from "react";

const PostBasicInfo = ({ form, handleChange }) => (
  <>
    <div>
      <label className="block text-sm font-medium mb-1">1. TÊN MÓN ĐỒ</label>
      <input
        type="text"
        name="title"
        placeholder="VD: Quần áo, đồ chơi…."
        value={form.title}
        onChange={handleChange}
        className="w-full border-[1px] border-[#A7F3D0] rounded px-4 py-2 text-sm focus:outline-none focus:ring-0 focus:border-[#A7F3D0]"
      />
    </div>
    <div>
      <label className="block text-sm font-medium mb-1">2. MÔ TẢ CHI TIẾT</label>
        <textarea
          name="description"
          placeholder="Nhập mô tả chi tiết món đồ…."
          value={form.description}
          onChange={handleChange}
          rows={3}
          className="w-full border-[1px] border-[#A7F3D0] rounded px-4 py-2 text-sm focus:outline-none focus:ring-0 focus:border-[#A7F3D0]"
        />
    </div>
  </>
);

export default PostBasicInfo;
