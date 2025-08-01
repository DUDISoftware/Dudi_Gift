import React from 'react';
import { useNavigate } from 'react-router-dom';
import Success from '../../src/assets/img/success.png';

const ResetSuccess = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/login');
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center">
         <img
        src={Success}
        alt="Success"
        className="w-16 h-16 mx-auto mb-4"
        />
        <h2 className="text-2xl font-semibold text-blue-900">Cập nhật mật khẩu thành công</h2>
        <p className="text-[#828282] text-xs mt-2 mb-6">Mật khẩu của bạn đã được cập nhật</p>

        <button
          onClick={handleContinue}
          className="w-full bg-[#326E51] text-white font-semibold py-2 "
        >
          TIẾP TỤC
        </button>
      </div>
    </div>
  );
};

export default ResetSuccess;
