import React from 'react';
import Notfound from '../../src/assets/img/Notfound.png'; // hoặc bạn có thể dùng ảnh mới vừa upload nếu muốn
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#F1FAF2] flex flex-col items-center justify-center text-center px-4">
      <img
        src={Notfound}
        alt="404 robot"
        className="w-52 md:w-64 lg:w-72 xl:w-80 mb-6"
      />
      <p className="text-lg md:text-3xl font-semibold mb-4" style={{ color: '#53A059' }}>
        Không tìm thấy trang!!!
      </p>
      <Link
        to="/"
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full text-sm md:text-base"
      >
        Quay về trang chủ
      </Link>
    </div>
  );
};

export default NotFound;
