import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">
      <h1 className="text-green-600 text-2xl font-bold text-center mb-1">Món Quà Nhỏ</h1>
      <p className="text-center mb-6 font-medium">Đăng Ký</p>

      <form className="space-y-4">
        <input type="text" placeholder="Nhập tên đăng ký" className="w-full border rounded px-4 py-2 text-sm" />
        <input type="email" placeholder="Nhập Email" className="w-full border rounded px-4 py-2 text-sm" />

        <select className="w-full border rounded px-4 py-2 text-sm">
          <option>Chọn giới tính</option>
          <option>Nam</option>
          <option>Nữ</option>
        </select>

        <div className="flex gap-2">
          <select className="w-1/3 border rounded px-2 py-2 text-sm"><option>Ngày</option></select>
          <select className="w-1/3 border rounded px-2 py-2 text-sm"><option>Tháng</option></select>
          <select className="w-1/3 border rounded px-2 py-2 text-sm"><option>Năm</option></select>
        </div>

        <input type="password" placeholder="Nhập mật khẩu" className="w-full border rounded px-4 py-2 text-sm" />
        <input type="password" placeholder="Nhập lại mật khẩu" className="w-full border rounded px-4 py-2 text-sm" />

        <div className="flex justify-center">
          <button type="submit" className="w-40 bg-green-600 text-white py-2 rounded-full hover:bg-green-700 text-sm">
            Đăng Ký
          </button>
        </div>

        <p className="text-sm text-center mt-4">
          Đã có tài khoản? <Link to="/login" className="text-green-600 font-medium">Đăng nhập ngay</Link><br />
          <Link to="/" className="text-green-500 mt-2 inline-block">Trở về trang chủ</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
