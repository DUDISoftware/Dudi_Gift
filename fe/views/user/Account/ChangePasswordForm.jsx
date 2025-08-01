import React, { useState } from 'react';
import Eye from '../../../src/assets/img/Eye.png';
import Eye1 from '../../../src/assets/img/eye1.png';

const ChangePasswordForm = () => {
  const [showPasswords, setShowPasswords] = useState([false, false, false]);

  const togglePassword = (index) => {
    const updated = [...showPasswords];
    updated[index] = !updated[index];
    setShowPasswords(updated);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
      <h2 className="text-xl font-semibold text-green-700">Đổi mật khẩu</h2>
      <div className="space-y-3">
        {['Mật khẩu hiện tại', 'Mật khẩu mới', 'Nhập lại mật khẩu mới'].map((label, idx) => (
          <div key={idx} className="relative">
            <input
              className="input pr-10 w-full border rounded px-4 py-2 text-sm"
              placeholder={label}
              type={showPasswords[idx] ? 'text' : 'password'}
            />
            {showPasswords[idx] ? (
              <img
                src={Eye}
                alt="Hiện mật khẩu"
                onClick={() => togglePassword(idx)}
                className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer opacity-70"
              />
            ) : (
              <img
                src={Eye1}
                alt="Ẩn mật khẩu"
                onClick={() => togglePassword(idx)}
                className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer opacity-70"
              />
            )}
          </div>
        ))}
      </div>
      <button className="px-5 py-2 rounded-full bg-[#047857] text-white hover:bg-[#03654d] mt-2">
        Lưu Thay Đổi
      </button>
    </div>
  );
};

export default ChangePasswordForm;
