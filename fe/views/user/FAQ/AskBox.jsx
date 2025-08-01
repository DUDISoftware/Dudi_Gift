import React from 'react';

const AskBox = ({ onClick }) => {
  return (
    <div
      className="mt-10 max-w-5xl mx-auto rounded-2xl p-6"
      style={{ backgroundColor: '#4CAF50B0' }}

    >
      <div className="flex flex-col sm:flex-row justify-between items-center text-white gap-4">
        <div className="text-center sm:text-left">
          <p className="font-medium">Bạn vẫn còn những thắc mắc</p>
          <p className="text-sm mt-1">
            Không tìm thấy câu trả lời bạn đang tìm kiếm? Vui lòng trò chuyện với đội ngũ 
            <br />
            thân thiện của chúng tôi.
          </p>
        </div>
        <button
          onClick={onClick}
          className="bg-white text-green-700 px-6 py-2 rounded-lg text-sm font-medium hover:opacity-90"
        >
          Đặt câu hỏi
        </button>
      </div>
    </div>
  );
};

export default AskBox;
