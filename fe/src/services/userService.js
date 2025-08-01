import Avatar1 from '../../src/assets/img/postimg.jpg';
import Avatar2 from '../../src/assets/img/avatar_1.png';
import { productService } from './productService';

const fakeUsers = [
  {
    id: 1,
    username: 'HIKO',
    password: '123456',
    name: 'HIKO',
    avatar: Avatar1,
    followers: 312,
    productsSold: 5,
    phone: '123456789',
    location: 'Quận 1, TP HCM',
    token: 'token-hiko',
  },
  {
    id: 2,
    username: 'TRUC',
    password: '123456',
    name: 'Thanh Trúc',
    avatar: Avatar2,
    followers: 120,
    productsSold: 3,
    phone: '987654321',
    location: 'Thủ Đức, TP HCM',
    token: 'token-truc',
  }
];

export const userService = {
  getUserProfile: (username) => {
    const user = fakeUsers.find(
      (u) => u.username.toLowerCase() === decodeURIComponent(username).toLowerCase()
    );
    if (!user) return null;
    return {
      ...user,
      products: productService.getProductsByUser(user.name, false),
      productsGiven: productService.getProductsByUser(user.name, true),
    };
  },
  login: (username, password) => {
    const user = fakeUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      const avatarUrl =
        typeof user.avatar === 'string'
          ? user.avatar
          : user.avatar?.default || '';

      const safeUser = {
        ...user,
        avatar: avatarUrl, 
      };
      localStorage.setItem('token', safeUser.token);
      localStorage.setItem('user', JSON.stringify(safeUser));

      return { success: true, user: safeUser };
    }

    return { success: false, message: 'Tài khoản hoặc mật khẩu sai.' };
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  getAllUsers: () => fakeUsers,

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
  getUserById: (id) => {
  return fakeUsers.find((u) => u.id === id) || null;
},


};
