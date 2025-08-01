import React from 'react';

const posts = [
  {
    id: 1,
    title: 'Quần áo ấm cho mùa đông',
    description: '"Sống trong đời sống cần có một tấm lòng" là câu hát của nhạc sĩ Trịnh Công Sơn, tuy đơn giản nhưng mang ý nghĩa sâu sắc.'
  },
  {
    id: 2,
    title: 'Quần áo ấm cho mùa đông',
    description: '"Sống trong đời sống cần có một tấm lòng" là câu hát của nhạc sĩ Trịnh Công Sơn, tuy đơn giản nhưng mang ý nghĩa sâu sắc.'
  },
  {
    id: 3,
    title: 'Quần áo ấm cho mùa đông',
    description: '"Sống trong đời sống cần có một tấm lòng" là câu hát của nhạc sĩ Trịnh Công Sơn, tuy đơn giản nhưng mang ý nghĩa sâu sắc.'
  },
];

const RecentPosts = () => {
  return (
    <section className="bg-white rounded-xl p-4 w-full max-w-[600px] mx-auto text-sm">
      <h3 className="text-[#1A1A1A] font-semibold text-base mb-2">
        Bài viết mới
      </h3>
      <div className="w-full h-[1px] bg-[#047857] mb-3" />

      <div className="space-y-4">
        {posts.map((post, index) => (
          <div key={post.id}>
            <p className="font-semibold text-[#1A1A1A] text-sm">{post.title}</p>
            <p className="text-[#6B7280] text-sm">{post.description}</p>
            <a href="#" className="text-black underline text-sm font-medium">
              Chi tiết
            </a>
            {index !== posts.length - 1 && (
              <div className="w-full h-[1px] bg-[#047857] my-3" />
            )}
          </div>
        ))}
      </div>

      <div className="mt-4">
        <div className="w-full h-[1px] bg-[#047857] mb-3" />
        <div className="text-center">
          <button className="text-[#1A1A1A] text-sm font-medium flex items-center justify-center gap-1 hover:underline mx-auto">
            Xem thêm <span className="text-lg">›</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default RecentPosts;
