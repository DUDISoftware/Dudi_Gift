import axios from 'axios';
import { useState } from 'react';
import AvatarUpload from './AvatarUpload';

const EditProfileForm = ({ user, onProfileUpdated }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    phone: user.phone || '',
    address: user.address || '',
    gender: user.gender || 'Khác',
    dob: user.dob?.slice(0, 10) || '',
    email: user.email
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${import.meta.env.VITE_API_URL}/user/profile`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Cập nhật thông tin thành công!');
      onProfileUpdated?.();
    } catch (err) {
      console.error(err);
      alert('Lỗi khi cập nhật thông tin');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
      <h2 className="text-xl font-semibold text-green-700 mb-4">Chỉnh sửa trang cá nhân</h2>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="input" name="name" value={formData.name} onChange={handleChange} placeholder="Họ tên" />
          <input className="input" name="phone" value={formData.phone} onChange={handleChange} placeholder="Số điện thoại" />
          <input className="input" name="email" value={formData.email} disabled />
          <input className="input" name="address" value={formData.address} onChange={handleChange} placeholder="Địa chỉ" />
          <select className="input" name="gender" value={formData.gender} onChange={handleChange}>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
            <option value="Khác">Khác</option>
          </select>
          <input className="input" name="dob" value={formData.dob} onChange={handleChange} type="date" />
        </div>

        {/* 👇 Avatar Upload bên phải */}
        <div className="w-full md:w-[30%] flex justify-center items-start">
          <AvatarUpload user={user} onAvatarUpdated={onProfileUpdated} />
        </div>
      </div>

      <button
        onClick={handleSave}
        className="px-5 py-2 rounded-full bg-[#047857] text-white hover:bg-[#03654d] mt-4"
      >
        Lưu Thay Đổi
      </button>
    </div>
  );
};

export default EditProfileForm;
