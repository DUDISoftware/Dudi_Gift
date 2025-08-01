import React from 'react';
import IconMail from "../../../src/assets/img/icon-mail.png";
import IconCard from "../../../src/assets/img/icon-card.png";
import IconDelivery from "../../../src/assets/img/icon-delivery.png";
import IconPricing from "../../../src/assets/img/icon-pricing.png";
import IconTag from "../../../src/assets/img/icon-tag.png";

const faqData = [
  {
    icon: IconMail,
    title: 'Làm sao để mình có thể quyên góp vào các hoạt động',
    desc: 'Tìm món đồ mà bạn muốn, sau đó hãy ấn nhận món đồ và trao đổi thông tin với người cho đồ bạn nhé!',
  },
  {
    icon: IconCard,
    title: 'Cách để tham gia nhận món đồ mà mình yêu thích',
    desc: 'Tìm món đồ mà bạn muốn, sau đó hãy ấn nhận món đồ và trao đổi thông tin với người cho đồ bạn nhé!',
  },
  {
    icon: IconDelivery,
    title: 'Cách để liên lạc với những chủ nhân của các món đồ mà mình yêu thích',
    desc: 'Tìm món đồ mà bạn muốn, sau đó hãy ấn nhận món đồ và trao đổi thông tin với người cho đồ bạn nhé!',
  },
  {
    icon: IconPricing,
    title: 'Làm thế nào để tham gia vào cộng đồng?',
    desc: 'Vui lòng vào mục "Đơn hàng của tôi" để theo dõi trạng thái đơn.',
  },
  {
    icon: IconTag,
    title: 'Các nguyên tắc khi tham gia cộng đồng?',
    desc: 'Sau khi xác nhận thành công món đồ, bạn sẽ nhận thông tin liên lạc với người chia sẻ. Vui lòng không spam hay xin thêm quá mức.',
  },
  {
    icon: IconCard,
    title: 'Hình thức nhận, trả hàng như thế nào?',
    desc: 'Bạn có thể thoả thuận qua trang chat trước khi nhận đồ. Hệ thống không hỗ trợ trả hàng.',
  },
];

const FAQList = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {faqData.map((item, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-md shadow flex flex-col gap-3"
        >
          <img src={item.icon} alt="icon" className="w-10 h-10 mt-1" />
          <div>
            <h4 className="font-semibold text-base">{item.title}</h4>
            <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQList;
