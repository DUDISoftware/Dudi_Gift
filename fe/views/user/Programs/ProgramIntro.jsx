import React from 'react';
import MemberIcon from '../../../src/assets/img/member.png';
import VolunteerIcon from '../../../src/assets/img/volunteer.png';
import ProjectIcon from '../../../src/assets/img/project.png';
import CountryIcon from '../../../src/assets/img/country.png';

const ProgramIntro = () => {
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
    <section className="bg-[#E8F5E9] py-12 px-4 sm:px-8 rounded-lg">
      <div className="container mx-auto px-2 grid grid-cols-1 md:grid-cols-2 gap-10 items-center"> 
        <div>
          <h3 className="text-sm text-green-700 uppercase font-[Inter] tracking-widest mb-2">
            Các chương trình
          </h3>
          <h2 className="text-3xl sm:text-4xl font-[Inter] font-bold text-[#2E5E31] leading-snug mb-4">

            Tình Nguyện Vì Một Thế Giới <br /> Tốt Đẹp Hơn
          </h2>
            <p className="text-gray-700 leading-relaxed font-[Inter] text-justify">
              Hỗ trợ lẫn nhau là một trong những cách mạnh mẽ nhất mà chúng ta có thể tạo ra tác động tích cực trên thế giới. Khi chúng ta dang rộng vòng tay giúp đỡ, chúng ta củng cố cộng đồng của mình, nâng đỡ những người đang cần và xây dựng nền tảng lòng tốt có lợi cho tất cả mọi người. Những hành động nhỏ của sự hào phóng và lòng trắc ẩn có thể truyền cảm hứng cho những người khác làm điều tương tự, tạo ra hiệu ứng lan tỏa vượt xa những gì chúng ta có thể thấy. Bằng cách cùng nhau làm việc và quan tâm đến nhau, chúng ta nuôi dưỡng một thế giới nơi sự đồng cảm và hợp tác phát triển mạnh mẽ, biến nó thành một nơi tốt đẹp hơn cho các thế hệ tương lai.
              <br /><br />
            </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {stats.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center">
            <div className="h-16 w-16 rounded-full flex items-center justify-center mb-3">
              <img src={item.icon} alt={item.label} className="h-17 w-26 mb-4" />
              </div>
                <p className="text-2xl font-bold text-[#362465]">{item.number}</p>
                <p className="text-sm text-gray-600">{item.label}</p>
              </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramIntro;
