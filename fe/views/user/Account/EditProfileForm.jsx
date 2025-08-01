import React from 'react';
import AvatarUpload from './AvatarUpload';

const EditProfileForm = ({ user }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
      <h2 className="text-xl font-semibold text-green-700 mb-4">Chỉnh sửa trang cá nhân</h2>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className="input" placeholder="Họ và tên đệm" />
            <input className="input" placeholder="Tên" />
            <input className="input col-span-2" placeholder="Tên tài khoản" />
            <select className="input">
              <option>Nam</option>
              <option>Nữ</option>
              <option>Khác</option>
            </select>
            <input className="input" placeholder="Nhập địa chỉ Email" defaultValue={user.email} />
            <input className="input" placeholder="Số điện thoại" defaultValue={user.phone} />
            <input className="input" placeholder="dd/mm/yyyy" />
            <input className="input col-span-2" placeholder="Địa chỉ" defaultValue={user.location} />
          </div>
        </div>

        <div className="w-full md:w-1/4 flex justify-center">
          <AvatarUpload avatar={user.avatar} />
        </div>
      </div>

      <button className="px-5 py-2 rounded-full bg-[#047857] text-white hover:bg-[#03654d] mt-4">
        Lưu Thay Đổi
      </button>
    </div>
  );
};

export default EditProfileForm;
