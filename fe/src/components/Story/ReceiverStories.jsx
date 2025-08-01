import React from 'react';
import Stories from '../../assets/img/stories.png'; 

const stories = [
  {id: 1,type: 'image',content: Stories, alt: 'Câu chuyện của Minh Anh - Hà Nội',},
  {id: 2,type: 'image',content: Stories, alt: 'Câu chuyện của Minh Anh - Hà Nội',},
  {id: 3,type: 'image',content: Stories, alt: 'Câu chuyện của Minh Anh - Hà Nội',},
  {id: 4,type: 'image',content: Stories, alt: 'Câu chuyện của Minh Anh - Hà Nội',},

];

const ReceiverStories = () => {
  return (
    <section className="bg-white rounded-lg shadow p-4 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Câu chuyện của người nhận</h3>
      <div className="space-y-4">
        {stories.map((story) => (
          <img
            key={story.id}
            src={story.content}
            alt={story.alt}
            className="rounded-md w-full border"
          />
        ))}
      </div>
    </section>
  );
};

export default ReceiverStories;
