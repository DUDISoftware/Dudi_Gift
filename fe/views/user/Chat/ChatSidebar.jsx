import React, { useState } from 'react';
import Avatar from '../../../src/assets/img/avatar.png';
import More from '../../../src/assets/img/more_2.png';
import NewMessage from '../../../src/assets/img/NewMessage.png';
import ImageIcon from '../../../src/assets/img/SVG.png';

const ChatSidebar = ({ onSelectUser }) => {
  const [selectedUserId, setSelectedUserId] = useState(null); 

  const users = [
    { id: 1, name: 'Trần Quang X', message: 'Đang nhập....', date: '22/10/25' },
    { id: 2, name: 'Lê Thị Minh Tâm', message: 'Bạn: Hi hi', date: '20/10/25' },
    { id: 3, name: 'Nguyễn Thị Trân', message: 'Cho mình hỏi về những cái...', date: '20/10/25' },
    { id: 4, name: 'Nguyễn Văn Dũng', message: 'Bạn: Hiện tại bên mình vẫn....', date: '15/10/25' },
    { id: 5, name: 'Hoàng Thị Hương', message: 'Gửi ảnh', date: '10/10/25', isImage: true },
    { id: 6, name: 'James', message: '✓ Thanks', date: '09/10/25' },
  ];

  const handleSelect = (user) => {
    setSelectedUserId(user.id);
    onSelectUser(user);
  };

  return (
    <div className="w-full sm:w-[300px] bg-white overflow-y-auto border-r border-gray-200 h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Tin nhắn</h2>
        <div className="flex items-center gap-1"> {/* giảm khoảng cách giữa icon */}
          <button className="w-12 h-12 rounded-full hover:bg-gray-100 flex items-center justify-center">
            <img src={More} alt="More" className="w-8 h-8 object-contain" />
          </button>
          <button className="w-12 h-12 rounded-full hover:bg-gray-100 flex items-center justify-center">
            <img src={NewMessage} alt="New Message" className="w-8 h-8 object-contain" />
          </button>
        </div>
      </div>
      <input
        type="text"
        placeholder="Tìm kiếm tin nhắn ...."
        className="w-full p-2 mb-4 border border-gray-300 rounded-full text-sm"
      />
      <div className="divide-y divide-gray-200">
        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => handleSelect(user)}
            className={`w-full px-3 flex justify-between items-center gap-3 py-3 cursor-pointer transition 
              ${selectedUserId === user.id ? 'bg-[#EDE4E4]' : 'hover:bg-[#F5F5F5]'}`}
          >
            <div className="flex items-center gap-3">
              <img src={Avatar} alt="avatar" className="w-10 h-10 rounded-full ml-2" />
              <div className="text-left">
                <p className="font-semibold leading-5 text-[14px]">{user.name}</p>
                <p className="text-sm text-gray-500 text-[13px] truncate max-w-[180px] flex items-center gap-1 leading-tight">
                  {user.isImage && (
                    <img
                      src={ImageIcon}
                      alt="img"
                      className="w-4 h-4 object-contain"
                    />
                  )}
                  <span className={user.isImage ? 'text-green-600' : ''}>
                    {user.message}
                  </span>
                </p>
              </div>
            </div>
            <div className="text-xs text-gray-500 whitespace-nowrap pl-1">
              {user.date}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;
