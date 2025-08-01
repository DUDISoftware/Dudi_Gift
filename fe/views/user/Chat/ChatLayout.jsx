import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import ChatSidebar from './ChatSidebar';
import ChatPage from './ChatPage';

import { productService } from '../../../src/services/productService';
import { userService } from '../../../src/services/userService'; 

const ChatLayout = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const username = searchParams.get('user'); 
    const productId = searchParams.get('product');

    if (username) {
      const allUsers = userService.getAllUsers?.() || [];
      const matchedUser = allUsers.find(u => u.username === username);
      const product = productService.getProductById(productId);

      if (matchedUser) {
        setSelectedUser({ name: matchedUser.name, avatar: matchedUser.avatar });
      }

      if (product) {
        setSelectedProduct(product);
      }
    }
  }, [searchParams]);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {(!isMobile || !selectedUser) && (
        <div className="w-full sm:w-[300px] border-r">
          <ChatSidebar onSelectUser={setSelectedUser} />
        </div>
      )}

      <div className="flex-1">
        {selectedUser ? (
          <ChatPage
            user={selectedUser}
            product={selectedProduct}
            onBack={() => setSelectedUser(null)}
            showSidebar={!isMobile}
          />
        ) : (
          !isMobile && (
            <div className="h-full flex items-center justify-center text-gray-500">
              <p>Chọn một cuộc trò chuyện để bắt đầu</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ChatLayout;
