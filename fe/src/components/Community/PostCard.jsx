import React from 'react';
import IconLike from '../../assets/img/icon-like.png';
import IconMessage from '../../assets/img/icon-message.png';
import IconForward from '../../assets/img/icon-forward.png';
import IconBookmark from '../../assets/img/icon-bookmark.png';

const PostCard = ({ post, onClick, onToggleLike }) => {
  const images = post.images || [];

  return (
    <div
      className="bg-white rounded-xl shadow p-4 cursor-pointer hover:shadow-md transition"
      onClick={() => onClick?.(post)}
    >
      <div className="flex items-start gap-3 mb-3">
        <img
          src={post.user.avatar}
          alt={post.user.name}
          className="w-11 h-11 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-gray-800">{post.user.name}</p>
          <p className="text-sm text-gray-500">{post.user.role}</p>
          <p className="text-xs text-gray-400">{post.time}</p>
        </div>
      </div>

      <p className="text-gray-800 mb-4 whitespace-pre-line">{post.content}</p>

      {images.length > 0 && (
        <div
          className={`mb-4 ${
            images.length === 3
              ? 'grid grid-cols-3 grid-rows-2'
              : images.length === 1
              ? 'grid grid-cols-1'
              : 'grid grid-cols-2'
          }`}
        >
          {images.length === 3 ? (
            <>
              <div className="row-span-2 col-span-2">
                <img src={images[0]} alt="img-0" className="w-full h-full object-cover" />
              </div>
              <img src={images[1]} alt="img-1" className="w-full h-full object-cover" />
              <img src={images[2]} alt="img-2" className="w-full h-full object-cover" />
            </>
          ) : (
            images.slice(0, 4).map((img, i) => (
              <div key={i} className="relative">
                <img
                  src={img}
                  alt={`post-image-${i}`}
                  className="w-full h-48 object-cover"
                />
                {i === 3 && images.length > 4 && (
                  <div className="absolute inset-0 bg-white/60 flex items-center justify-center text-white font-bold text-3xl">
                    {images.length - 4}+
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      <div className="flex items-center justify-between text-gray-600 text-sm border-t pt-3">
        <div className="flex items-center gap-4">
          <div
            className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm cursor-pointer transition ${
              post.liked ? 'bg-green-600 text-white' : 'bg-white text-gray-700'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleLike?.();
            }}
          >
            <img src={IconLike} alt="like" className="w-5 h-5" />
            {post.likeCount}
          </div>
          <div className="flex items-center gap-1">
            <img src={IconMessage} alt="comment" className="w-7 h-7" />
            {post.comments}
          </div>
          <div className="flex items-center gap-1">
            <img src={IconForward} alt="share" className="w-7 h-7" />
            {post.shares}
          </div>
        </div>
        <img
          src={IconBookmark}
          alt="bookmark"
          className="w-7 h-7 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default PostCard;
