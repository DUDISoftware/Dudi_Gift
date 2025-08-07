import React, {useState } from 'react';
import UploadSimple from '../../../src/assets/img/UploadSimple.png';
import axios from 'axios';
const AvatarUpload = ({ user, onAvatarUpdated }) => {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 1024 * 1024) {
      alert('Hình ảnh vượt quá 1MB');
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append('avatar', file);
      formData.append('name', user.name);
      formData.append('phone', user.phone || '');
      formData.append('address', user.address || '');
      formData.append('location', JSON.stringify(user.location || {}));
      formData.append('gender', user.gender || 'Khác');
      formData.append('dob', user.dob || '');

      const token = localStorage.getItem('token');
      await axios.put(`${import.meta.env.VITE_API_URL}/user/profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('Cập nhật ảnh đại diện thành công!');
      onAvatarUpdated?.(); // gọi lại để load user mới
    } catch (error) {
      console.error(error);
      alert('Lỗi khi tải ảnh đại diện lên');
    } finally {
      setUploading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="flex flex-col items-center gap-2 bg-[#F5F7FA] p-6">
      <div className="relative w-32 h-32 rounded-full overflow-hidden group">
        <img
          src={user.avatar?.url}
          alt="avatar"
          className="w-full h-full object-cover"
        />
        <label
          htmlFor="upload-avatar"
          className="absolute bottom-0 left-0 right-0 text-white text-xs flex items-center justify-center py-1 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
        >
          <img src={UploadSimple} alt="upload" className="w-4 h-4 mr-1" />
          {uploading ? 'Đang tải...' : 'Tải ảnh lên'}
        </label>
        <input
          id="upload-avatar"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      <span className="text-xs text-gray-500 text-center">
        Hình ảnh có kích thước tối đa 1MB
      </span>
    </div>
  );
};

export default AvatarUpload;
