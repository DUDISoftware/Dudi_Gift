import React from 'react';

const CommentList = ({ comments }) => {
  return (
    <div className="space-y-3">
      {comments.map((c) => (
        <div key={c.id} className="flex items-start gap-2">
          <img src={c.user.avatar} alt="avatar" className="w-6 h-6 rounded-full mt-1" />
          <div className="flex flex-col w-full">
            <div className="bg-white p-2 rounded-xl text-xs shadow-md">
              <p className="font-medium text-[11px] mb-1">{c.user.name}</p>
              <p>{c.content}</p>
            </div>
            <div className="flex items-center gap-2 text-[8px] text-[#4CAF50] mt-1 ml-2">
              <span>Like</span>
              <span>Reply</span>
              <span>{c.time}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;