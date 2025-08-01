import React from 'react';
import { FaArrowUp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#4AB262] text-black w-full px-4 sm:px-6 py-10 relative font-inter">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
        <div>
          <h3 className="mb-2 font-inter text-black">Liên Kết Nhanh</h3>
          <ul className="space-y-1 text-black">
            <li><a href="#">Giới Thiệu</a></li>
            <li><a href="#">Liên Hệ</a></li>
          </ul>
        </div>

        <div className="text-left">
          <h3 className="mb-2 font-inter text-black">Mạng Xã Hội</h3>
          <p className="text-black">Facebook | Zalo</p>
        </div>

        <div className="text-left">
          <h3 className="mb-2 font-inter text-black">Nhập Bảng Tin</h3>
          <form className="flex flex-col sm:flex-row items-center sm:space-x-2 gap-2 sm:gap-0">
            <input
              type="email"
              placeholder="Email của bạn"
              className="px-3 py-2 rounded-full bg-[#FFFFFFB2] text-black focus:outline-none w-full sm:w-auto"
            />
            <button className="bg-[#FDFDFD] text-black px-4 py-2 rounded-full text-sm">
              Đăng Ký
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-black mt-6 pt-4 text-center text-xs text-black">
        © 2025 Món Quà Cũ. All rights reserved.
      </div>

      <button
        className="absolute right-4 bottom-4 bg-white text-green-600 rounded-full p-3 shadow-lg hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-300 transition-all"
        title="Lên đầu trang"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <FaArrowUp className="w-4 h-4" />
      </button>
    </footer>
  );
};

export default Footer;
