import React from "react";

const PostAddress = ({ form, handleChange }) => (
  <div className="flex flex-col sm:flex-row items-start gap-2 mb-4">
    <label className="text-sm font-semibold mt-1 sm:mt-2 w-full sm:w-28 whitespace-nowrap">
      5. ĐỊA CHỈ
    </label>

    <div className="flex flex-1 flex-wrap sm:flex-nowrap gap-2 w-full">
      <select
        name="province"
        value={form.province}
        onChange={handleChange}
        className="w-full sm:w-[150px] flex-shrink-0 h-[40px] border border-[#CDF8E4] bg-[#ECFDF5] text-sm text-[#0A806B] rounded-lg px-4 py-2 focus:outline-none"
      >
        <option value="">Chọn tỉnh</option>
        <option value="Hồ Chí Minh">Hồ Chí Minh</option>
      </select>

      <select
        name="ward"
        value={form.ward}
        onChange={handleChange}
        className="w-full sm:w-[150px] flex-shrink-0 h-[40px] border border-[#CDF8E4] bg-[#ECFDF5] text-sm text-[#0A806B] rounded-lg px-4 py-2 focus:outline-none"
      >
        <option value="">Chọn xã</option>
        <option value="Thủ Đức">Thủ Đức</option>
      </select>

      <input
        type="text"
        name="addressDetail"
        placeholder="Nhập địa chỉ chi tiết"
        value={form.addressDetail}
        onChange={handleChange}
        className="flex-1 min-w-[120px] max-w-full h-[44px] border border-[#CDF8E4] px-4 py-1 text-sm leading-[normal] rounded-lg focus:outline-none overflow-hidden text-ellipsis whitespace-nowrap"
      />
    </div>
  </div>

);

export default PostAddress;
