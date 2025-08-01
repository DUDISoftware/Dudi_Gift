import React from 'react';
import FacebookIcon from '../../../src/assets/img/FacebookIcon.png';
import InstagramIcon from '../../../src/assets/img/Instagram.png';
import TwitterIcon from '../../../src/assets/img/Twitter.png';
import WhatsappIcon from '../../../src/assets/img/Whatsapp.png';
import YoutubeIcon from '../../../src/assets/img/youtube.png';
import LinkedinIcon from '../../../src/assets/img/Linkedin.png';

const icons = [
  { icon: FacebookIcon, placeholder: 'Facebook' },
  { icon: InstagramIcon, placeholder: 'Instagram' },
  { icon: LinkedinIcon, placeholder: 'Linkedin' },
  { icon: TwitterIcon, placeholder: 'Twitter' },
  { icon: WhatsappIcon, placeholder: 'Whatsapp' },
  { icon: YoutubeIcon, placeholder: 'Youtube' },
];

const SocialProfileForm = () => (
  <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
    <h2 className="text-xl font-semibold text-green-700">Hồ sơ mạng xã hội</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {icons.map((item, idx) => (
        <div className="relative" key={idx}>
          <img src={item.icon} alt="icon" className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 opacity-70" />
          <input className="input pl-10" placeholder={item.placeholder} />
        </div>
      ))}
    </div>
    <button className="px-5 py-2 rounded-full bg-[#047857] text-white hover:bg-[#03654d] mt-2">
      Lưu Thay Đổi
    </button>
  </div>
);

export default SocialProfileForm;
