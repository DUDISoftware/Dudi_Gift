import React, { useState } from 'react';
import MoreIcon from '../../../src/assets/img/more.png';
import ShareIcon from '../../../src/assets/img/share1.png';
import ChatIcon from '../../../src/assets/img/chat1.png';
import ReportIcon from '../../../src/assets/img/report.png';
import Plus from '../../../src/assets/img/plus.png';
import Followers from '../../../src/assets/img/Followers.png';
import Projects from '../../../src/assets/img/Projects.png';
import MsgIcon from '../../../src/assets/img/mess.png';
import CalendarIcon from '../../../src/assets/img/calendar.png';
import ParticipateIcon from '../../../src/assets/img/participate.png';
import MapIcon from '../../../src/assets/img/map2.png';
import FB from '../../../src/assets/img/facebook.png';
import Zalo from '../../../src/assets/img/zalo.png';
import Gmail from '../../../src/assets/img/mail.png';
import { Link } from 'react-router-dom';
import Border from '../../../src/assets/img/border.png';  
import Report from './Report';

const OtherProfileCard = ({ user }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [showReport, setShowReport] = useState(false);

  return (
    <div className="relative w-full sm:max-w-[420px] lg:max-w-[380px] bg-white rounded-3xl shadow-xl overflow-hidden pb-6 text-center mx-auto">
      {showReport && <Report onClose={() => setShowReport(false)} />}
      
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={() => setDropdownVisible(!dropdownVisible)}
        >
          <img src={MoreIcon} alt="More" className="w-7 h-7" />
        </button>
        {dropdownVisible && (
          <div className="absolute top-full right-0 mt-2 w-52 bg-white rounded-xl shadow-lg text-sm z-50">
            <ul className="py-2">
              <li className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer">
                <img src={ShareIcon} className="w-4 h-4" />
                <span>Chia sẻ trang cá nhân</span>
              </li>

              <Link to="/messages" className="block w-full">
              <li className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer">
                <img src={ChatIcon} className="w-4 h-4" />
                <span>Chat</span>
              </li>
              </Link>
              <li
                className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setDropdownVisible(false);
                  setShowReport(true);
                }}
              >
                <img src={ReportIcon} className="w-4 h-4" />
                <span>Báo cáo người dùng</span>
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className="relative w-full max-w-full bg-white rounded-3xl overflow-hidden pb-6 text-center mx-auto">
        <div className="w-full h-28 bg-[#D9D9D9] rounded-t-3xl relative">
          <div className="absolute -bottom-12 left-[20px] w-32 h-32 z-20">
            <div className="w-full h-full rounded-full relative">
              <div className="absolute top-0 left-0 w-full h-full border-2 border-green-600 rounded-full z-10"></div>
              <img
                src={user.avatar}
                alt="Avatar"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
        </div>

        <div className="pt-16 px-6 w-full">
          <h2 className="text-xl font-bold text-green-700 text-left">{user.name}</h2>
          <div className="flex items-center gap-6 mt-1 mb-4 text-green-600 font-medium text-sm text-left">
            <span className="flex items-center gap-1">
              <img src={Followers} alt="Followers" className="w-4 h-4" />
              {user.followers}
            </span>
            <span className="flex items-center gap-1">
              <img src={Projects} alt="Projects" className="w-4 h-4" />
              {user.productsSold}
            </span>
            <button className="px-5 py-2 bg-[#18A661] text-white rounded-full flex items-center gap-2 justify-center text-sm hover:bg-green-700 transition">
              Theo dõi
              <img src={Plus} className="w-4 h-4" alt="Follow" />
            </button>
          </div>

          <div className="text-left text-sm text-black space-y-2">
            <p className="flex items-center gap-2">
              <img src={MsgIcon} className="w-4 h-4" />
              Phản hồi chat: 95% (Trong 18 phút)
            </p>
            <p className="flex items-center gap-2">
              <img src={CalendarIcon} className="w-4 h-4" />
              Đã tham gia: 1 ngày
            </p>
            <p className="flex items-center gap-2">
              <img src={ParticipateIcon} className="w-4 h-4" />
              Đã tham gia: 1 ngày
            </p>
            <p className="flex items-center gap-2">
              <img src={MapIcon} className="w-4 h-4" />
              Địa chỉ: {user.location}
            </p>
          </div>

          <div className="flex justify-center items-center gap-6 mt-6">
            <img src={FB} alt="Facebook" className="w-6 h-6" />
            <img src={Zalo} alt="Zalo" className="w-9 h-6 object-contain" />
            <img src={Gmail} alt="Gmail" className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full">
        <img
          src={Border}
          alt="Bottom Border"
          className="w-full h-auto z-10 pointer-events-none"
        />
      </div>
    </div>
  );
};

export default OtherProfileCard;
