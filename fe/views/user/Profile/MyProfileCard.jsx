import React from 'react';
import { Link } from 'react-router-dom';

import FB from '../../../src/assets/img/facebook.png';
import Zalo from '../../../src/assets/img/zalo.png';
import Gmail from '../../../src/assets/img/mail.png';
import Share2 from '../../../src/assets/img/share2.png';
import SettingIcon from '../../../src/assets/img/settings.png';
import MsgIcon from '../../../src/assets/img/mess.png';
import CalendarIcon from '../../../src/assets/img/calendar.png';
import ParticipateIcon from '../../../src/assets/img/participate.png';
import Border from '../../../src/assets/img/border.png';
import MapIcon from '../../../src/assets/img/map2.png';
import Followers from '../../../src/assets/img/Followers.png';
import Projects from '../../../src/assets/img/Projects.png';

const MyProfileCard = ({ user }) => {
  return (
    <div className="relative w-full sm:max-w-[420px] lg:max-w-[380px] bg-white rounded-3xl shadow-xl overflow-hidden pb-6 text-center mx-auto">
      <div className="w-full h-28 bg-[#D9D9D9] rounded-t-3xl relative">
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 sm:left-6 sm:translate-x-0 w-24 h-24 sm:w-32 sm:h-32 z-20">
          <div className="relative w-full h-full rounded-full border-2 border-green-600 overflow-hidden">
            <img
             src={user.avatar?.url}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="pt-20 sm:pt-24 px-4 sm:px-6 w-full text-center sm:text-left">
        <h2 className="text-xl font-bold text-green-700 sm:text-left">
          {user.name}
        </h2>

        <div className="flex justify-center sm:justify-start gap-6 mt-1 mb-4 text-green-600 font-medium text-sm">
          <span className="flex items-center gap-1">
            <img src={Followers} alt="Followers" className="w-4 h-4" />
            {user.followers || 0}
          </span>
          <span className="flex items-center gap-1">
            <img src={Projects} alt="Projects" className="w-4 h-4" />
            {user.products?.length || 0}
          </span>
        </div>

        <div className="flex flex-col gap-2 mb-4">
          <button className="w-full py-2 px-4 bg-green-600 text-white rounded-full shadow-md flex items-center justify-center gap-2 text-sm hover:bg-green-700 transition">
            <img src={Share2} className="w-4 h-4" alt="Share" />
            Chia sẻ trang cá nhân
          </button>

          <Link to="/account-settings" className="block w-full">
            <button className="w-full py-2 px-4 bg-white border border-green-600 text-green-600 rounded-full flex items-center justify-center gap-2 text-sm hover:bg-gray-50 transition">
              <img src={SettingIcon} className="w-4 h-4" alt="Edit" />
              Chỉnh sửa trang cá nhân
            </button>
          </Link>
        </div>

        <div className="text-left text-sm text-black space-y-2">
          <p className="flex items-center gap-2">
            <img src={MsgIcon} className="w-4 h-4" alt="Chat" />
            Phản hồi chat: {user.responseRate || '95%'} (Trong {user.responseTime || '18 phút'})
          </p>
          <p className="flex items-center gap-2">
            <img src={CalendarIcon} className="w-4 h-4" alt="Join" />
            Đã tham gia: {user.joinedDays || '1 ngày'}
          </p>
          <p className="flex items-center gap-2">
            <img src={ParticipateIcon} className="w-4 h-4" alt="Activity" />
            Đã tham gia: {user.joinedDays || '1 ngày'}
          </p>
          <p className="flex items-center gap-2">
            <img src={MapIcon} className="w-4 h-4" alt="Location" />
            Địa chỉ: {user.location || 'Chưa cập nhật'}
          </p>
        </div>

        <div className="flex justify-center items-center gap-6 mt-6">
          <img src={FB} alt="Facebook" className="w-6 h-6" />
          <img src={Zalo} alt="Zalo" className="w-9 h-6 object-contain" />
          <img src={Gmail} alt="Gmail" className="w-6 h-6" />
        </div>
      </div>

      <img
        src={Border}
        alt="Bottom Border"
        className="absolute bottom-0 left-0 w-full h-auto z-10 pointer-events-none"
      />
    </div>
  );
};

export default MyProfileCard;
