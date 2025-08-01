import React from "react";

const PostActions = () => (
  <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 pt-4">
    <button
      type="button"
      className="px-6 py-2 rounded-lg bg-[#F1F2F4] text-sm w-full sm:w-auto"
    >
      Lưu vào nháp
    </button>
    <button
      type="submit"
      className="px-6 py-2 rounded-lg bg-[#047857] text-white text-sm w-full sm:w-auto"
    >
      Đăng tin
    </button>
  </div>
);

export default PostActions;
