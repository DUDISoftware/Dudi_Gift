import React from 'react';

const tags = ['Quần áo', 'Áo ấm', 'Trẻ em', 'Người lớn', 'Đồ dùng', 'Khẩn cấp'];

const TagFilter = () => {
  return (
    <section className="bg-white rounded-lg shadow p-4 mb-6">
      <h3 className="text-lg font-bold text-green-800 mb-4">Tags</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, idx) => (
          <button
            key={idx}
            className="px-3 py-1 text-sm bg-green-50 text-green-700 border border-green-200 rounded-full hover:bg-green-100 transition"
          >
            {tag}
          </button>
        ))}
      </div>
    </section>
  );
};

export default TagFilter;
