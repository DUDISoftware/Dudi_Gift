import React, { useState } from 'react';
import ShareBar from '../../../src/components/Community/ShareBar';
import PostCard from '../../../src/components/Community/PostCard';
import CommunitySidebar from '../../../src/components/Community/CommunitySidebar';
import { communityService } from '../../../src/services/CommunityService';
import { userService } from '../../../src/services/userService';
import PostDetailModal from './PostDetailModal';

const CommunityPage = () => {
  const [posts, setPosts] = useState(() =>
    communityService.getPosts().map((post) => ({
      ...post,
      user: userService.getUserById(post.userId),
      liked: false,
      likeCount: post.likes || 0,
    }))
  );
  const [selectedPost, setSelectedPost] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);

  const handleToggleLike = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likeCount: post.liked ? post.likeCount - 1 : post.likeCount + 1,
            }
          : post
      )
    );
  };

  const handlePrev = () => {
    setImageIndex((prev) => (prev - 1 + selectedPost.images.length) % selectedPost.images.length);
  };

  const handleNext = () => {
    setImageIndex((prev) => (prev + 1) % selectedPost.images.length);
  };

  const handleClose = () => {
    setSelectedPost(null);
  };

  return (
    <div className="bg-[#E8F5E9] min-h-screen px-4 sm:px-6 py-6">
      <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
        <div className="w-full lg:flex-1 space-y-6">
          <ShareBar />
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onClick={() => {
                setSelectedPost(post);
                setImageIndex(0);
              }}
              onToggleLike={() => handleToggleLike(post.id)}
            />
          ))}
        </div>

        <div className="hidden lg:block lg:w-[320px] space-y-6">
          <CommunitySidebar />
        </div>
      </div>

      {selectedPost && (
        <PostDetailModal
          post={posts.find((p) => p.id === selectedPost.id)}
          imageIndex={imageIndex}
          onPrev={handlePrev}
          onNext={handleNext}
          onClose={handleClose}
          onToggleLike={() => handleToggleLike(selectedPost.id)}
        />
      )}
    </div>
  );
};

export default CommunityPage;
