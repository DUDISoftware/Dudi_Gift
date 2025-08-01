import React, { useState } from 'react';
import Icon from "../../../src/assets/img/Icon2.png"; 
import Img from '../../../src/assets/img/img.png'; 
import File from '../../../src/assets/img/file.png'; 
import Gif from '../../../src/assets/img/gif.png';  
import Gif_1 from '../../../src/assets/img/gif_1.png';  
import Like from '../../../src/assets/img/like.png'; 

const ChatInput = ({ onSend }) => {
  const [input, setInput] = useState('');
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false); 

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  const handleEmojiClick = (emoji) => {
    setInput(input + emoji);
    setEmojiPickerVisible(false);
  };

  const quickReplies = [
    'Sản phẩm này còn không?',
    'Cách nhận sản phẩm?',
    'Sản phẩm bao nhiêu %?',
  ];

  return (
    <div className="p-2 sm:p-4 border-t bg-white">
      <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 mb-3">
        <div className="flex gap-2">
          <button><img src={File} alt="file" className="w-6 h-6" /></button>
          <button><img src={Img} alt="img" className="w-6 h-6" /></button>
          <button><img src={Gif_1} alt="gif_1" className="w-6 h-6" /></button>
          <button><img src={Gif} alt="gif" className="w-6 h-6" /></button>
        </div>
        <input
          type="text"
          value={input}
          placeholder="Aa"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 min-w-[150px] border rounded-full px-4 py-2 focus:outline-none"
        />

        <div className="flex gap-2">
          <button onClick={() => setEmojiPickerVisible(!emojiPickerVisible)}>
            <img src={Icon} alt="emoji" className="w-6 h-6" />
          </button>
          <button>
            <img src={Like} alt="like" className="w-5 h-6" />
          </button>
        </div>
      </div>

      {emojiPickerVisible && (
        <div className="flex gap-2 mb-3">
          {['😊', '😂', '😍', '😎', '❤️'].map((emo) => (
            <button key={emo} onClick={() => handleEmojiClick(emo)} className="text-xl">
              {emo}
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {quickReplies.map((q, i) => (
          <button
            key={i}
            onClick={() => onSend(q)}
            className="bg-gray-100 hover:bg-gray-200 text-sm px-3 py-1 rounded-full whitespace-nowrap"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatInput;
