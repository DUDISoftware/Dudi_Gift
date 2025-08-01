import React from 'react';
import Avatar from '../../../src/assets/img/avatar.png';
import Information from '../../../src/assets/img/information.png';
import Call from '../../../src/assets/img/call.png';
import Active from '../../../src/assets/img/active.png';

const ChatHeader = ({ user, toggleInfo }) => {
  return (
    <div className="flex items-center justify-between p-4 shadow bg-white">
      <div className="flex items-center gap-3 relative">
        <div className="relative w-10 h-10">
            <img src={Avatar} alt="avatar" className="w-10 h-10 rounded-full" />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          </div>
        <div>
          <p className="font-semibold">{user?.name}</p>
          <p className="text-xs text-gray-500">Active</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <img
          src={Call}
          alt="Gọi"
          className="w-5 h-5 cursor-pointer"
          onClick={toggleInfo}
        />
        <img
          src={Information}
          alt="Thông tin"
          className="w-13 h-13 cursor-pointer"
          onClick={toggleInfo}
        />
      </div>
    </div>
  );
};

export default ChatHeader;
