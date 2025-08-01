import React, { useState } from 'react';
import { X } from 'lucide-react';
import FAQList from './FAQList';
import AskBox from './AskBox';

const FAQPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ email: '', question: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Gửi câu hỏi:', form);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-[#E8F5E9]">
      <div className="text-center py-8">
        <h2 className="text-[#047857] text-3xl font-bold mb-1">

          FAQ - GIẢI ĐÁP THẮC MẮC VỀ
          <br/> MÓN QUÀ NHỎ
        </h2>
        <p className="text-sm text-gray-600">Nếu bạn có thắc mắc hãy đặt câu hỏi nhé!</p>
      </div>

      <div className="bg-white px-4 py-10">
        <FAQList />
     

      <AskBox onClick={() => setShowForm(true)} />

      {showForm && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#F6FBF9] rounded-4xl p-6 w-[90%] max-w-sm relative shadow-xl ">
            <button
                onClick={() => setShowForm(false)}
                className="absolute top-3 right-3 bg-[#047857] text-white w-6 h-6 flex items-center justify-center rounded-full shadow"
              >
                <X size={16} />
            </button>
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-1">ĐẶT CÂU HỎI</h3>
            <p className="text-center text-sm text-gray-600 mb-4">
              Bạn có những thắc mắc hãy đặt câu hỏi thật chi tiết nhé!!!
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                placeholder="Địa chỉ Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-gray-300 px-4 py-2 text-sm"
                required
              />
              <textarea
                placeholder="Nhập câu hỏi..."
                value={form.question}
                onChange={(e) => setForm({ ...form, question: e.target.value })}
                className="w-full border border-gray-300 px-4 py-2 text-sm"
                rows={3}
                required
              />
              <div className="flex justify-center">
                <button className="w-30 bg-[#047857] text-white py-2 rounded-full text-sm flex justify-center items-center">
                  Gửi câu hỏi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  </div>
  );
};

export default FAQPage;
