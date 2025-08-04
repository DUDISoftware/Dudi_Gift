import React, { useState } from 'react';
import IconBack from '../../../src/assets/img/IconBack.png';
import ImageView from './ImageView';
import CommentSection from './CommentSection';

const PostDetailModal = ({ post, imageIndex = 0, onClose, onToggleLike }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(imageIndex);

  if (!post) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white/50 overflow-y-auto flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-[100vw] lg:max-w-[1300px] bg-[#E8F5E9] rounded-xl shadow-xl overflow-hidden mb-4">
        <div className="sticky top-0 z-20 bg-[#E8F5E9] px-4 py-2 flex items-center gap-2 pt-4">
          <button onClick={onClose}>
            <img src={IconBack} alt="back" className="w-6 h-6" />
          </button>
          <span className="text-[#4CAF50] font-semibold text-lg">Bài viết của {post.user.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-0.5 h-full max-h-[75vh] overflow-y-auto px-4 py-8">
          <ImageView
            images={post.images}
            selectedIndex={selectedImageIndex}
            setSelectedIndex={setSelectedImageIndex}
          />

          <CommentSection post={post} onToggleLike={onToggleLike} />
        </div>
      </div>
    </div>
  );
};

export default PostDetailModal;
