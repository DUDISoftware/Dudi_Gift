import React from 'react';

const mockPrograms = [
  { id: 1, day: '03', month: 'Tháng 10', title: 'Sách cho em', author: 'Anh Nhân' },
  { id: 2, day: '06', month: 'Tháng 10', title: 'Sách cho em', author: 'Anh Nhân' },
  { id: 3, day: '06', month: 'Tháng 10', title: 'Sách cho em', author: 'Anh Nhân' },
];

const UpcomingPrograms = () => {
  return (
    <div className="bg-white p-4 rounded-xl w-full max-w-[600px] mx-auto text-sm">
      <h3 className="text-[#1A1A1A] font-semibold text-base mb-2 text-center">
        Các chương trình sắp diễn ra
      </h3>
      <div className="w-full h-[1px] bg-[#047857] mb-4" />

      <div className="space-y-4">
        {mockPrograms.map((item, index) => (
          <div key={item.id}>
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <span className="text-[#047857] font-semibold text-lg leading-tight mb-2">
                  {item.day}
                </span>
                <span className="bg-[#4CAF50] text-white text-[10px] px-2 py-[2px] rounded font-medium">
                  {item.month}

                </span>
              </div>

              <div className="text-left flex-1">
                <p className="font-semibold text-sm text-[#1A1A1A]">{item.title}</p>
                <p className="text-gray-500 text-sm">Thành lập bởi: {item.author}</p>
                <a href="#" className="text-black text-sm font-medium underline hover:underline">
                  Chi tiết
                </a>
              </div>
            </div>
            {index !== mockPrograms.length - 1 && (
              <div className="w-full h-[1px] bg-[#047857] my-3" />
            )}
          </div>
        ))}
      </div>

      <div className="mt-4">
        <div className="w-full h-[1px] bg-[#047857] mb-3" />
        <div className="text-center">
          <button className="text-[#1A1A1A] text-sm font-medium flex items-center justify-center gap-1 mx-auto">
            Xem thêm <span className="text-lg">›</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpcomingPrograms;
