import React from 'react';
import Avatar1 from '../../assets/img/avatar_1.png';
import Avatar2 from '../../assets/img/ava_1.png';
import Avatar3 from '../../assets/img/ava_2.png';

const mockUsers = [
  { id: 1, name: 'Thành Nhân', job: 'Dudi Software', avatar: Avatar1 },
  { id: 2, name: 'Quỷ Long', job: 'Dudi Software', avatar: Avatar2 },
  { id: 3, name: 'Hưng Quốc', job: 'Dudi Software', avatar: Avatar3 },
];

const PeopleSuggestion = () => {
  return (
    <div className="bg-white p-4 rounded-xl w-full max-w-[360px] mx-auto text-sm">
      <div className="text-center">
        <h3 className="text-[#1A1A1A] font-semibold text-base mb-2">
          Bạn có thể biết
        </h3>
        <div className="h-[1px] w-full bg-[#047857] mb-3" />
      </div>

      <div className="divide-y divide-[#B7E2CD]">
        {mockUsers.map((user) => (
          <div key={user.id} className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="text-left">
                <p className="font-semibold text-[#1A1A1A] text-sm leading-tight">{user.name}</p>
                <p className="text-[#6B7280] text-xs leading-tight">{user.job}</p>
              </div>
            </div>
            <button className="text-[#037F4C] border border-[#037F4C] px-4 py-[2px] text-sm rounded-full hover:bg-[#E6F4EC] transition">
              Kết bạn
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <div className="h-[1px] w-full bg-[#047857] mb-3" />
        <div className="text-center">
          <button className="text-[#1A1A1A] text-sm font-medium flex items-center justify-center gap-1 hover:underline mx-auto">
            Xem tất cả đề xuất <span className="text-lg">›</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PeopleSuggestion;
