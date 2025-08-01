import React from 'react';
import ChatMessageBubble from './ChatMessageBubble';

const ChatMessages = ({ messages }) => {
  return (
    <div className="flex-1 p-4 overflow-y-auto">
      {messages.map((msg, i) => (
        <ChatMessageBubble key={i} message={msg.text} isMe={msg.isMe} />
      ))}
    </div>
  );
};

export default ChatMessages;
