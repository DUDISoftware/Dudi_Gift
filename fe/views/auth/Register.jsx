import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../src/services/authService';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    day: '',
    month: '',
    year: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const { name, email, password, confirmPassword, gender, day, month, year } = formData;
  if (password !== confirmPassword) {
    setError('Mật khẩu xác nhận không khớp');
    return;
  }

  if (!day || !month || !year) {
    setError('Vui lòng chọn đầy đủ ngày sinh');
    return;
  }

  const dob = `${year}-${month}-${day}`;
  const data = { name, email, password, gender, dob };

  const result = await authService.register(data);
  if (result.success) {
    navigate('/login');
  } else {
    setError(result.message);
  }
};

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">
      <h1 className="text-green-600 text-2xl font-bold text-center mb-1">Món Quà Nhỏ</h1>
      <p className="text-center mb-6 font-medium">Đăng Ký</p>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input name="name" type="text" placeholder="Nhập tên đăng ký" className="w-full border rounded px-4 py-2 text-sm" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Nhập Email" className="w-full border rounded px-4 py-2 text-sm" onChange={handleChange} required />

        <select name="gender" className="w-full border rounded px-4 py-2 text-sm" onChange={handleChange} required>
          <option value="">Chọn giới tính</option>
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
          <option value="Khác">Khác</option>
        </select>

        <div className="flex gap-2">
          <select name="day" className="w-1/3 border rounded px-2 py-2 text-sm" onChange={handleChange} required>
            <option value="">Ngày</option>
            {days.map((d) => <option key={d} value={String(d).padStart(2, '0')}>{d}</option>)}
          </select>
          <select name="month" className="w-1/3 border rounded px-2 py-2 text-sm" onChange={handleChange} required>
            <option value="">Tháng</option>
            {months.map((m) => <option key={m} value={String(m).padStart(2, '0')}>{m}</option>)}
          </select>
          <select name="year" className="w-1/3 border rounded px-2 py-2 text-sm" onChange={handleChange} required>
            <option value="">Năm</option>
            {years.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>

        <input name="password" type="password" placeholder="Nhập mật khẩu" className="w-full border rounded px-4 py-2 text-sm" onChange={handleChange} required />
        <input name="confirmPassword" type="password" placeholder="Nhập lại mật khẩu" className="w-full border rounded px-4 py-2 text-sm" onChange={handleChange} required />

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

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
