import React from 'react';
import { Outlet } from 'react-router-dom';
import Logo from '../../src/assets/img/logo_1.png';

const AuthLayout = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="w-full md:w-2/3 flex items-center justify-center bg-[#FFFFFF] px-4 py-6">
        <Outlet />
      </div>

      <div className="hidden md:flex md:w-1/3 flex-col items-center justify-center bg-[#E8F5E9] p-6 text-center">
        <img src={Logo} alt="Logo" className="w-90 mb-4" />
      </div>
    </div>
  );
};

export default AuthLayout;
