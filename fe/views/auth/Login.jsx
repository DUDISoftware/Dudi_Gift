import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FB from '../../src/assets/img/FB.png';
import GG from '../../src/assets/img/Google.png';
import Eye from '../../src/assets/img/Eye.png';
import Eye1 from '../../src/assets/img/eye1.png';
import { authService } from '../../src/services/authService';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
  e.preventDefault();
  const result = await authService.login(username, password);
  if (result.success) {
    navigate('/');
  } else {
    setError(result.message);
  }
};


  const handleGoogleLogin = () => {
    alert('Google login click');
  };

  const handleFacebookLogin = () => {
    alert('Facebook login click');
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">
      <h1 className="text-[#4CAF50] text-3xl font-bold text-center mb-1">Món Quà Nhỏ</h1>
      <p className="text-center mb-6 font-medium text-[#4CAF50] ">Đăng nhập</p>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tên đăng nhập hoặc Email"
          className="w-full border rounded px-4 py-2 text-sm"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Mật khẩu"
            className="w-full border rounded px-4 py-2 text-sm pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {showPassword && (
            <img
              src={Eye}
              alt="Ẩn mật khẩu"
              onClick={() => setShowPassword(false)}
              className="w-[20px] h-[195px] object-contain absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            />
          )}
          {!showPassword && (
            <img
              src={Eye1}
              alt="Hiện mật khẩu"
              onClick={() => setShowPassword(true)}
              className="w-[17px] h-[17px] object-contain absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            />
          )}
        </div>

        <div className="flex justify-end text-xs">

          <Link to="/forgot-password" className="text-[#047857] hover:underline">
            Quên mật khẩu?
          </Link>
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <div className="flex justify-center">

          <button
            type="submit"
            className="w-40 bg-[#4CAF50] text-white py-2 rounded-full hover:bg-green-700 text-sm"
          >
            Đăng Nhập
          </button>
        </div>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-black"></div>
          <span className="px-4 text-[13px] font-[Inter] text-black">Hoặc</span>
          <div className="flex-grow border-t border-black"></div>
        </div>
        <div className="flex justify-between gap-3">
          <button
            onClick={handleGoogleLogin}
            type="button"
            className="w-1/2 hover:opacity-90"
          >
            <img src={GG} alt="Google Login" className="w-full" />
          </button>

          <button
            onClick={handleFacebookLogin}
            type="button"
            className="w-1/2 hover:opacity-90"
          >
            <img src={FB} alt="Facebook Login" className="w-full" />
          </button>
        </div>

        <p className="text-sm text-center mt-6">
          Chưa có tài khoản?{' '}
          <Link to="/register" className="text-green-600 font-medium">
            Đăng ký ngay
          </Link>
          <br />
          <Link to="/" className="text-green-500 mt-2 inline-block">
            Trở về trang chủ
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
