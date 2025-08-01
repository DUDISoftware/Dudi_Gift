import React from 'react';
import MemberIcon from '../../../src/assets/img/member.png';
import VolunteerIcon from '../../../src/assets/img/volunteer.png';
import ProjectIcon from '../../../src/assets/img/project.png';
import CountryIcon from '../../../src/assets/img/country.png';

const Community = () => {
  const stats = [
    {
      icon: MemberIcon,
      number: '4597+',
      label: 'Thành Viên',
    },
    {
      icon: VolunteerIcon,
      number: '8945+',
      label: 'Tình Nguyện Viên',
    },
    {
      icon: ProjectIcon,
      number: '10M+',
      label: 'Dự Án',
    },
    {
      icon: CountryIcon,
      number: '100+',
      label: 'Quốc Gia',
    },
  ];

  return (
    <section className="bg-A5A5A5 p-6 rounded-lg mb-6">
      <div className="container mx-auto px-2">
      <h2 className="text-3xl font-bold text-[#2E5E31] text-center">CỘNG ĐỒNG</h2>
      <p className="font-[Inter] text-gray-600 text-center mb-6">
        Kết nối với cộng đồng những người yêu thích chia sẻ và lan tỏa yêu thương
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-[#E8F5E9] min-h-[350px] p-6 rounded-lg text-center flex flex-col items-center justify-center"
          >
            <img src={item.icon} alt={item.label} className="h-24 w-24 mb-4" />
            <p className="text-2xl font-bold text-[#362465] mb-1">{item.number}</p>
            <p className="text-gray-600">{item.label}</p>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
};

export default Community;
