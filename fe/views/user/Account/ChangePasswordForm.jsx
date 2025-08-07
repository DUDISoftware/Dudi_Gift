import React, { useState } from 'react';
import axios from 'axios';
import Eye from '../../../src/assets/img/Eye.png';
import Eye1 from '../../../src/assets/img/eye1.png';

const ChangePasswordForm = () => {
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState([false, false, false]);

  const togglePassword = (index) => {
    const updated = [...showPasswords];
    updated[index] = !updated[index];
    setShowPasswords(updated);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (form.newPassword !== form.confirmPassword) {
      return alert('Mật khẩu mới không khớp');
    }

    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${import.meta.env.VITE_API_URL}/user/change-password`,
        {
          currentPassword: form.currentPassword,
          newPassword: form.newPassword
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      alert('Đổi mật khẩu thành công!');
      setForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || 'Lỗi đổi mật khẩu');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
      <h2 className="text-xl font-semibold text-green-700">Đổi mật khẩu</h2>
      <div className="space-y-3">
        {[
          { name: 'currentPassword', label: 'Mật khẩu hiện tại' },
          { name: 'newPassword', label: 'Mật khẩu mới' },
          { name: 'confirmPassword', label: 'Nhập lại mật khẩu mới' }
        ].map((item, idx) => (
          <div key={idx} className="relative">
            <input
              className="input pr-10 w-full border rounded px-4 py-2 text-sm"
              placeholder={item.label}
              type={showPasswords[idx] ? 'text' : 'password'}
              name={item.name}
              value={form[item.name]}
              onChange={handleChange}
            />
            <img
              src={showPasswords[idx] ? Eye : Eye1}
              alt="toggle"
              onClick={() => togglePassword(idx)}
              className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer opacity-70"
            />
          </div>
        ))}
      </div>
      <button
        onClick={handleSave}
        className="px-5 py-2 rounded-full bg-[#047857] text-white hover:bg-[#03654d] mt-2"
      >
        Lưu Thay Đổi
      </button>
    </div>
  );
};

export default ChangePasswordForm;
