import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Eye from '../../src/assets/img/Eye.png';
import Eye1 from '../../src/assets/img/eye1.png';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!password || !confirmPassword) {
      alert('Vui lòng nhập đầy đủ mật khẩu.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Mật khẩu xác nhận không khớp.');
      return;
    }

    alert('Mật khẩu đã được cập nhật!');
    navigate('/login');
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 w-full max-w-sm text-center">
        <h2 className="text-3xl font-bold text-[#4CAF50] leading-tight mb-2">Món Quà Nhỏ</h2>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#326E51] mb-6">Cập nhật mật khẩu</h1>

        <div className="space-y-4 text-left">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Nhập mật khẩu mới"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <img
              src={showPassword ? Eye : Eye1}
              alt="Toggle mật khẩu"
              onClick={() => setShowPassword(!showPassword)}
              className="w-[18px] h-[18px] object-contain absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            />
          </div>

          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Xác thực mật khẩu mới"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <img
              src={showConfirmPassword ? Eye : Eye1}
              alt="Toggle xác nhận"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="w-[18px] h-[18px] object-contain absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="mt-6 w-full bg-green-600 text-white font-semibold py-2 rounded-md transition duration-300 hover:bg-green-700"
        >
          Xác nhận
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
