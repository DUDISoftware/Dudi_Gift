import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaChevronDown, FaBars, FaTimes } from 'react-icons/fa';

import AvatarIcon from '../../src/assets/img/Avatar_2.png';
import AccountIcon from '../../src/assets/img/account.png';
import SettingIcon from '../../src/assets/img/settings.png';
import NewsIcon from '../../src/assets/img/new.png';
import LogoutIcon from '../../src/assets/img/logout.png';
import Bell from '../../src/assets/img/bell.png';
import Message from '../../src/assets/img/message_1.png';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [avatar, setAvatar] = useState(AvatarIcon);
  const [username, setUsername] = useState('');
  const [activeMenu, setActiveMenu] = useState('Trang chủ');
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    setIsLoggedIn(!!token);
    if (user?.avatar?.url) setAvatar(user.avatar.url);
    if (user?.name) setUsername(user.name);
  }, []);

  useEffect(() => {
    const pathMap = {
      '/': 'Trang chủ',
      '/explore': 'Khám phá',
      '/program': 'Chương trình',
      '/community': 'Cộng đồng',
      '/faq': 'FAQ',
    };
    setActiveMenu(pathMap[location.pathname] || '');
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setDropdownOpen(false);
    navigate('/');
  };

  const menus = [
    { label: 'Trang chủ', path: '/' },
    { label: 'Khám phá', path: '/explore' },
    { label: 'Chương trình', path: '/program' },
    { label: 'Cộng đồng', path: '/community' },
    { label: 'FAQ', path: '/faq' },
  ];

  return (
    <header className="relative h-22 bg-[#E8F5E9] border-b border-[#000000B2] p-3 px-4 sm:px-6 flex items-center justify-between z-50">
      <Link to="/">
        <div className="text-2xl font-bold text-[#4CAF50] flex-shrink-0 cursor-pointer">
          Món Quà Nhỏ
        </div>
      </Link>

      {/* Mobile menu toggle */}
      <div className="lg:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-green-600 text-xl">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile menu content */}
      {menuOpen && (
        <div className="absolute top-full right-0 w-[90%] max-w-sm bg-white shadow-md z-50 lg:hidden rounded-lg">
          <nav className="flex flex-col items-start space-y-2 px-6 py-4 font-[Inter]">
            {menus.map((item, idx) => (
              <Link
                key={idx}
                to={item.path}
                onClick={() => {
                  setActiveMenu(item.label);
                  setMenuOpen(false);
                }}
                className="text-gray-700 hover:text-green-600 text-base"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/post"
              onClick={() => setMenuOpen(false)}
              className="bg-[#18A661] text-white px-4 py-2 rounded-lg hover:bg-green-700 font-[Inter]"
            >
              + Đăng tin
            </Link>
            <hr className="my-3 w-full border-gray-200" />

            {isLoggedIn ? (
              <div className="flex flex-col gap-3 w-full">
                <div
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  <img src={avatar} className="w-10 h-10 rounded-full object-cover" alt="avatar" />
                  <span className="font-[Inter] text-gray-800">Xin chào</span>
                  <FaChevronDown className="text-green-600" />
                </div>

                {userMenuOpen && (
                  <div className="flex flex-col gap-2 w-full pl-6 mt-2">
                    <Link
                      to={`/profile/${encodeURIComponent(username)}`}
                      onClick={() => setMenuOpen(false)}
                      className="text-gray-700 hover:text-green-600"
                    >
                      Hồ sơ cá nhân
                    </Link>
                    <Link to="/notifications" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-green-600">Thông báo</Link>
                    <Link to="/messages" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-green-600">Tin nhắn</Link>
                    <Link to="/community" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-green-600">Lịch sử cho nhận </Link>
                    <Link to="/account-settings" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-green-600">Cài đặt tài khoản</Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMenuOpen(false);
                      }}
                      className="text-left text-red-500 hover:text-red-600"
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-3 w-full">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    navigate('/login');
                  }}
                  className="text-gray-700 hover:text-green-600 text-center"
                >
                  Đăng nhập / Đăng ký
                </button>
              </div>
            )}
          </nav>
        </div>
      )}

      {/* Desktop menu */}
      <nav className="hidden lg:flex flex-grow justify-center items-center space-x-6 font-[Inter]">
        {menus.map((item, idx) => (
          <Link
            key={idx}
            to={item.path}
            onClick={() => setActiveMenu(item.label)}
            className={`relative font-poppins px-2 py-1 transition ${
              activeMenu === item.label
                ? 'text-green-600'
                : 'text-gray-600 hover:text-green-600'
            }`}
          >
            {item.label}
            {activeMenu === item.label && (
              <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-green-600"></span>
            )}
          </Link>
        ))}
        <Link
          to="/post"
          onClick={() => setMenuOpen(false)}
          className="bg-[#18A661] text-white px-4 py-2 rounded-lg hover:bg-green-700 font-[Inter]"
        >
          + Đăng tin
        </Link>
      </nav>

      {/* User menu */}
      <div className="hidden lg:flex items-center space-x-3">
        <span className="bg-white text-green-600 rounded-full w-10 h-10 flex items-center justify-center text-base font-bold">VN</span>
        {isLoggedIn ? (
          <>
            <Link to="/notifications"><img src={Bell} alt="bell" className="w-9 h-9 rounded-full object-cover" /></Link>
            <Link to="/messages"><img src={Message} alt="message" className="w-9 h-9 rounded-full object-cover" /></Link>

            <div className="relative">
              <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center bg-white rounded-full px-2 py-1 shadow gap-2">
                <img src={avatar} alt="avatar" className="w-8 h-8 rounded-full object-cover" />
                <span className="text-gray-800 font-[Inter]">{username}</span>
                <FaChevronDown className="text-green-600" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg z-50 text-sm">
                  <ul className="py-2">
                    <li
                      onClick={() => {
                        navigate(`/profile/${encodeURIComponent(username)}`);
                        setDropdownOpen(false);
                      }}
                      className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <img src={AccountIcon} className="w-5 h-5" /> Hồ sơ cá nhân
                    </li>
                    <li
                      onClick={() => {
                        navigate('/history-gift');
                        setDropdownOpen(false);
                      }}
                      className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <img src={NewsIcon} className="w-5 h-5" /> Lịch sử cho nhận
                    </li>
                    <li
                      onClick={() => {
                        navigate('/account-settings');
                        setDropdownOpen(false);
                      }}
                      className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <img src={SettingIcon} className="w-5 h-5" /> Cài đặt
                    </li>
                    <li
                      onClick={handleLogout}
                      className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <img src={LogoutIcon} className="w-5 h-5" /> Đăng xuất
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="bg-green-600 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-green-700"
            >
              <img src={AvatarIcon} alt="avatar" className="w-6 h-6" />
              <span>Tài khoản</span>
              <FaChevronDown />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-60 bg-white rounded-xl shadow-lg z-50 text-sm">
                <ul className="py-2">
                  <li
                    className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate('/login');
                    }}
                  >
                    <img src={AccountIcon} alt="" className="w-5 h-5" />
                    Đăng ký / Đăng nhập
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
