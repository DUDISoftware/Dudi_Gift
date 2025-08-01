import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VerifyCode = () => {
  const [code, setCode] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 1);
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 3) {
      const next = document.getElementById(`code-${index + 1}`);
      next && next.focus();
    }
  };

  const handleSubmit = () => {
    if (code.join('').length === 4) {
      navigate('/reset-password'); 
    }
  };

  const handleResend = () => {
    if (timer === 0) {
      setTimer(30);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-[#4CAF50] text-center">Món Quà Nhỏ</h2>
        <h1 className="text-xl sm:text-2xl font-bold text-[#326E51] text-center mt-2">Mã xác thực</h1>

        <div className="flex gap-2 justify-center mt-6 mb-4">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              className="w-14 h-14 border rounded-md text-center text-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              maxLength={1}
            />
          ))}
        </div>

        <p className="text-center text-sm text-red-500 mb-4">
          00:{timer.toString().padStart(2, '0')}
        </p>

        <button
          onClick={handleSubmit}
          className="w-full bg-[#4CAF50] text-white text-xl font-semibold py-2 rounded-md transition duration-300 hover:bg-green-600"
        >
          TIẾP TỤC
        </button>

        <p className="text-[#828282] text-sm text-center mt-4">
          Bạn không nhận được mã?{' '}
          <button
            className="text-red-500 underline"
            onClick={handleResend}
            disabled={timer > 0}
          >
            Gửi lại
          </button>
        </p>
      </div>
    </div>
  );
};

export default VerifyCode;
