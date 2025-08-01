import React from 'react';

const ChatMessageBubble = ({ message, isMe }) => (
  <div className={`mb-2 ${isMe ? 'text-right' : 'text-left'}`}>
    <p
      className={`inline-block px-4 py-2 rounded-full max-w-xs ${
        isMe ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'
      }`}
    >
      {message}
    </p>
  </div>
);

export default ChatMessageBubble;
