import React, { useState, useEffect } from 'react';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import ChatInfoSidebar from './ChatInfoSidebar';

const ChatPage = ({ user, product, onBack }) => {
  const [messages, setMessages] = useState([{ text: 'Hi hi', isMe: true }]);
  const [isInfoVisible, setInfoVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSendMessage = (text) => {
    setMessages([...messages, { text, isMe: true }]);
  };

  const toggleInfo = () => setInfoVisible(!isInfoVisible);

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex-1 flex flex-col bg-[#F5F5F5] relative">
        <ChatHeader toggleInfo={toggleInfo} user={user} />

        {isMobile && (
          <button
            onClick={onBack}
            className="absolute top-2 left-2 z-50 bg-white rounded-full p-2 shadow"
          >
            ←
          </button>
        )}

        <div
          className={`transition-transform duration-300 fixed top-0 right-0 h-full bg-white z-50 shadow-lg overflow-y-auto w-full max-w-full sm:w-[300px] ${
            isInfoVisible ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="relative h-full">
            <ChatInfoSidebar />
            <button
              className="absolute top-4 right-4 text-sm text-green-600 z-50"
              onClick={toggleInfo}
            >
              Đóng
            </button>
          </div>
        </div>

        {product && (
         <div className="w-full flex justify-center p-4">
            <div className="bg-white px-4 py-3 flex gap-4 rounded-2xl items-center shadow-md w-full max-w-xl">
              <img
                src={product.images?.[0] || product.img?.[0]}
                alt="product"
                className="w-24 h-auto rounded-md"
              />
              <div className="text-sm">
                <p className="font-bold">Bạn đang trao đổi về sản phẩm:</p>
                <ul className="list-disc list-inside">
                  <li>{product.name}</li>
                  <li>{product.details?.[1]}</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-4">
          <ChatMessages messages={messages} />
        </div>

        <ChatInput onSend={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatPage;
