import React, { useState } from 'react';
import IconLike from '../../../src/assets/img/icon-like.png';
import IconMessage from '../../../src/assets/img/Comment.png';
import IconForward from '../../../src/assets/img/IconShare.png';
import CommentList from './CommentList';

const CommentSection = ({ post, onToggleLike }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      user: post.user,
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam nisi, cras neque, lorem vel vulputate vitae aliquam. Pretium tristique nisi, ut commodo fames. Porttitor et sagittis egestas vitae metus, odio tristique amet, duis. Nunc tortor elit aliquet quis in mauris.',
      time: '5m',
    },
    {
      id: 2,
      user: post.user,
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam nisi, cras neque, lorem vel vulputate vitae aliquam. Pretium tristique nisi, ut commodo fames. Porttitor et sagittis egestas vitae metus, odio tristique amet, duis. Nunc tortor elit aliquet quis in mauris.',
      time: '2m',
    },
  ]);

  const handleCommentSubmit = () => {
    if (!comment.trim()) return;
    const newComment = {
      id: Date.now(),
      user: post.user,
      content: comment,
      time: 'Vừa xong',
    };
    setComments((prev) => [...prev, newComment]);
    setComment('');
  };

  return (
    <div className="w-full lg:w-[40%] max-h-[80vh] mt-4 lg:mt-0 px-2 sm:px-4 overflow-y-auto">
      <div className="w-full h-full rounded-xl border border-[#29752F] flex items-center justify-center">
        <div className="bg-[#E8F5E9] rounded-xl p-3 flex flex-col justify-between h-full w-full shadow-lg">
          <div className="flex items-center gap-2 mb-1">
            <img src={post.user.avatar} className="w-8 h-8 sm:w-9 sm:h-9 rounded-full" />
            <div>
              <p className="text-xs text-[#1A1313]">{post.user.name}</p>
              <p className="text-xs text-[#1A1313]">{post.user.role}</p>
            </div>
          </div>

          <p className="text-xs text-[#1A1313]">{post.time}</p>
          <p className="text-xs text-[#1A1313] mb-3 leading-snug my-2">{post.content}</p>

          <div className="border-t border-[#4CAF50] my-3" />
          <div className="flex justify-evenly text-sm items-center mb-2 px-1">
            <div
              className={`flex items-center gap-1 text-xs px-4 py-1 rounded-full ${
                post.liked ? 'bg-green-600 text-white' : 'bg-[#E8F5E9] text-gray-800'
              }`}
              onClick={onToggleLike}
            >
              <img src={IconLike} alt="like" className="w-4 h-4" />
              {post.likeCount}
            </div>
            <div className="flex items-center gap-1 text-gray-700 text-xs">
              <img src={IconMessage} alt="comment" className="w-4 h-4" />
              {comments.length}
            </div>
            <div className="flex items-center gap-1 text-gray-700 text-xs">
              <img src={IconForward} alt="share" className="w-4 h-4" />
              25
            </div>
          </div>

          <div className="relative my-3">
            <div className="border-t border-[#4CAF50] w-full"></div>
            <span className="absolute left-1/2 -translate-x-1/2 -top-2 bg-[#E8F5E9] px-3 text-xs font-medium text-[#4CAF50]">
              Comment
            </span>
          </div>

          <div className="space-y-3 pr-1 mb-2 px-1 overflow-y-auto max-h-[300px]">
            <CommentList comments={comments} />
          </div>

          <div className="mt-auto">
          <div className="flex items-start gap-2">
            <img
              src={post.user.avatar}
              alt="avatar"
              className="w-6 h-6 rounded-full mt-1"
            />
            <div className="flex-1 border border-gray-400 bg-[#3A3B3C] rounded-xl px-3 py-1">
              <textarea
                placeholder="Viết bình luận..."
                rows={1}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleCommentSubmit();
                  }
                }}
                className="w-full bg-transparent resize-none text-white text-xs placeholder-gray-400 outline-none border-none"
              />
            </div>
          </div>

            <p className="text-[8px] text-[#4CAF50] ml-2 mt-1">Nhấn Enter để đăng</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
