import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { requestService } from '../../../src/services/requestService';
import Check from '../../../src/assets/img/check.png';
import SuccessPopup from './SuccessPopup';

const RequestListPopup = ({ productId, onClose }) => {
  const [requests, setRequests] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState(null);

  useEffect(() => {
    requestService.getRequestsByProductId(productId).then(setRequests);
  }, [productId]);

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSendGift = () => {
    const recipient = requests.find((r) => selectedIds.includes(r.id));
    if (!recipient) {
      alert('Vui lòng chọn ít nhất một người nhận!');
      return;
    }
    setSelectedRecipient(recipient.name);
    setShowSuccess(true);
  };

  return (
    <>
      {!showSuccess && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl px-6 py-6 w-[400px] max-h-[90vh] overflow-auto relative shadow-lg">
            <button className="absolute top-2 right-2" onClick={onClose}>
              <X size={20} />
            </button>

            <div className="flex justify-center -space-x-4 mb-4">
              {requests.slice(0, 3).map((req) => (
                <img
                  key={req.id}
                  src={req.avatar}
                  alt=""
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
              ))}
            </div>

            <h3 className="text-center text-base font-bold mb-1">
              DANH SÁCH YÊU CẦU NHẬN QUÀ
            </h3>
            <div className="text-[12px] text-center text-gray-600 mb-4 leading-tight">
              <p>Dưới đây là danh sách các cá nhân yêu cầu nhận quà từ bạn,</p>
              <p>hãy chọn người mà bạn mong muốn gửi món quà nhé!!!!</p>
            </div>

            <ul className="space-y-3 max-h-[240px] overflow-y-auto mb-4">
              {requests.map((req, idx) => (
                <li
                  key={req.id}
                  className="flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-800">{idx + 1}.</span>
                    <img
                      src={req.avatar}
                      alt={req.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-sm font-medium text-gray-800">{req.name}</span>
                  </div>

                  {/* Custom checkbox with check icon */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">{req.time}</span>
                    <label className="relative w-5 h-5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(req.id)}
                        onChange={() => toggleSelect(req.id)}
                        className="peer hidden"
                      />
                      <div className="w-5 h-5 rounded-md border-2 border-[#047857] bg-white peer-checked:bg-[#4CAF5066] peer-checked:border-[#047857] flex items-center justify-center">
                        {selectedIds.includes(req.id) && (
                          <img src={Check} alt="check" className="w-3 h-3" />
                        )}
                      </div>
                    </label>
                  </div>
                </li>
              ))}
            </ul>

            <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={onClose}
                className="w-full py-2 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100"
              >
                Đóng
              </button>
              <button
                onClick={handleSendGift}
                className="w-full py-2 rounded-xl bg-[#047857] text-white font-semibold hover:bg-[#03654F]"
              >
                Gửi Quà
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccess && (
        <SuccessPopup
          recipientName={selectedRecipient}
          onClose={onClose}
        />
      )}
    </>
  );
};

export default RequestListPopup;
