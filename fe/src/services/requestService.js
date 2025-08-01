import { userService } from './userService';

const mockRequests = [
  {
    id: 1,
    productId: 1,
    userId: 2, 
    time: '18h00 ngày 20/5/2025',
  },
  {
    id: 2,
    productId: 1,
    userId: 1,
    time: '18h15 ngày 20/5/2025',
  },
  {
    id: 3,
    productId: 2,
    userId: 2,
    time: '10h00 ngày 21/5/2025',
  }
];

export const requestService = {
  getRequestsByProductId: async (productId) => {
    const requests = mockRequests.filter((r) => r.productId === productId);
    return requests.map((req) => {
      const user = userService.getUserById(req.userId);
      return {
        ...req,
        name: user?.name || 'Người dùng ẩn danh',
        avatar: user?.avatar || '/default-avatar.png',
      };
    });
  },
};
