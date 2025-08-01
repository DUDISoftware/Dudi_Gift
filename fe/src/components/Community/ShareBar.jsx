import React from 'react';
import Avatar from '../../assets/img/avatar_1.png';
import ImageIcon from '../../assets/img/Image_4.png';
import VideoIcon from '../../assets/img/Video.png';
import CalendarIcon from '../../assets/img/Calendar_2.png';
import PencilIcon from '../../assets/img/Pencil.png';

const ShareBar = () => {
  return (
    <div className="bg-white rounded-xl shadow p-4 sm:p-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
        <img
          src={Avatar}
          alt="avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <input
          type="text"
          placeholder="Bạn đang nghĩ gì?"
          className="w-full border border-gray-200 rounded-full px-4 py-2 focus:outline-none bg-gray-100"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-sm font-medium text-green-700">


        <div className="flex items-center gap-1 cursor-pointer group">
          <img
            src={ImageIcon}
            alt="image"
            className="w-5 h-5 group-hover:scale-110 transition-transform duration-150"
          />
          Hình ảnh
        </div>

        <div className="flex items-center gap-1 cursor-pointer group">
          <img
            src={VideoIcon}
            alt="video"
            className="w-6 h-6 group-hover:scale-110 transition-transform duration-150"
          />
          Video
        </div>

        <div className="flex items-center gap-1 cursor-pointer group">
          <img
            src={CalendarIcon}
            alt="calendar"
            className="w-5 h-5 group-hover:scale-110 transition-transform duration-150"
          />
          Sự kiện
        </div>

        <div className="flex items-center gap-1 cursor-pointer group">
          <img
            src={PencilIcon}
            alt="pencil"
            className="w-6 h-6 group-hover:scale-110 transition-transform duration-150"
          />
          Bài viết
        </div>
      </div>

    </div>
  );
};

export default ShareBar;
