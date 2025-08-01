import Post_1 from '../assets/img/post_1.jpg';
import Post_2 from '../assets/img/Post_2.jpg';
import Post_3 from '../assets/img/Post_3.png';
import Post_4 from '../assets/img/program.png';

const posts = [
  {
    id: 1,
    userId: 1, 
    time: '12:24 PM - 14/7/2025',
    content: 'Đến hẹn lại lên! Mình tặng chiếc máy tính đến các bạn nhé!',
    images: [Post_1, Post_1, Post_1,Post_1,Post_1,Post_1,Post_1,Post_1],
    likes: 14,
    comments: 4,
    shares: 10,
  },
  {
    id: 2,
    userId: 2, 
    time: '09:00 AM - 12/7/2025',
    content: 'Mọi người hãy cùng tham gia chương trình Góp Đồ Chia Sẻ hôm nay nha!',
    images: [Post_2, Post_3, Post_4],
    likes: 26,
    comments: 7,
    shares: 4,
  },
];

export const communityService = {
  getPosts: () => posts,

  getPostsByUser: (userId) => posts.filter(p => p.userId === userId),
};
