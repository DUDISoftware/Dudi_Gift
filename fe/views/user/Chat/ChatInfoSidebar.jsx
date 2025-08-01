import React, { useState } from 'react';
import {ChevronDown } from 'lucide-react';
import Avatar from '../../../src/assets/img/avatar.png';
import Search from '../../../src/assets/img/Search_2.png';
import User from '../../../src/assets/img/user.png';
import Bell from '../../../src/assets/img/Bell_2.png';

const ChatInfoSidebar = () => {
  const [sections, setSections] = useState({
    chatInfo: false,
    effects: false,
    media: false,
    policy: false,
  });

  const toggleSection = (key) => {
    setSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <aside className="w-full sm:w-[300px] bg-white h-full px-4 pt-4 pb-8 overflow-y-auto relative">
      <div className="text-center">
        <img src={Avatar} alt="avatar" className="w-20 h-20 rounded-full mx-auto mb-2" />
        <h3 className="font-semibold text-lg">Lê Thị Minh Tâm</h3>
        <p className="text-sm text-gray-500 mb-4">Trực tuyến 9 phút trước</p>
        <div className="flex justify-center gap-6 mb-6">
          <div className="flex flex-col items-center text-sm text-gray-700">
             <img src={User} alt="Hồ sơ" className="w-7 h-7" />
            <span>Xem hồ sơ</span>
          </div>
          <div className="flex flex-col items-center text-sm text-gray-700">
            <img src={Bell} alt="Thông báo" className="w-7 h-7" />
            <span>Thông báo</span>
          </div>
          <div className="flex flex-col items-center text-sm text-gray-700">
             <img src={Search} alt="Tìm kiếm" className="w-7 h-7" />
            <span>Tìm kiếm</span>
          </div>
        </div>
      </div>

      <div className="space-y-3 text-sm">
        <SectionItem
          label="Xem thông tin đoạn chat"
          isOpen={sections.chatInfo}
          onToggle={() => toggleSection('chatInfo')}
        />
        <SectionItem
          label="Chỉnh sửa hiệu ứng cuộc trò chuyện"
          isOpen={sections.effects}
          onToggle={() => toggleSection('effects')}
        />
        <SectionItem
          label="Media, files and links"
          isOpen={sections.media}
          onToggle={() => toggleSection('media')}
        />
        <SectionItem
          label="Chính sách và hỗ trợ"
          isOpen={sections.policy}
          onToggle={() => toggleSection('policy')}
        />
      </div>
    </aside>
  );
};

const SectionItem = ({ label, isOpen, onToggle }) => (
  <div className="border-b pb-2">
    <button
      onClick={onToggle}
      className="w-full flex justify-between items-center font-medium hover:text-green-600"
    >
      {label}
      <ChevronDown
        size={18}
        className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
      />
    </button>
    {isOpen && (
      <div className="mt-2 text-gray-600 px-1">
        <p>Thông tin chi tiết...</p>
      </div>
    )}
  </div>
);

export default ChatInfoSidebar;
