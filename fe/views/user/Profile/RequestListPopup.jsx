import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { requestService } from '../../../src/services/requestService';
import Check from '../../../src/assets/img/check.png';
import SuccessPopup from './SuccessPopup';
import DefaultAvatar from '../../../src/assets/img/avatar_1.png';

const RequestListPopup = ({ productId, onClose }) => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productStatus, setProductStatus] = useState(null);
  const [approvedRequest, setApprovedRequest] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const data = await requestService.getRequestsByProductId(productId);
        setRequests(data);

        // Tìm request đã được approved (nếu có)
        const approved = data.find(req => req.status === 'approved');
        if (approved) {
          setApprovedRequest(approved);
          setSelectedRequest(approved);
        }

        // Lấy trạng thái sản phẩm (từ request hoặc API khác nếu cần)
        if (data.length > 0) {
          setProductStatus(data[0].product?.status || null);
        }
      } catch (err) {
        setError('Không thể tải danh sách yêu cầu');
        console.error('Error fetching requests:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [productId]);

  const handleApproveRequest = async () => {
    if (!selectedRequest) {
      setError('Vui lòng chọn người nhận');
      return;
    }

    try {
      await requestService.approveRequest(selectedRequest._id);
      setApprovedRequest(selectedRequest);
      setShowSuccess(true);

      // Cập nhật trạng thái các request khác
      setRequests(prev => prev.map(req => ({
        ...req,
        status: req._id === selectedRequest._id ? 'approved' : 'rejected'
      })));
    } catch (err) {
      setError('Có lỗi khi duyệt yêu cầu');
      console.error('Error approving request:', err);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] z-50 flex items-center justify-center">
        <div className="bg-white rounded-xl px-6 py-6 w-[400px] text-center">
          <p>Đang tải danh sách yêu cầu...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] z-50 flex items-center justify-center">
        <div className="bg-white rounded-xl px-6 py-6 w-[400px] text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-lg"
          >
            Đóng
          </button>
        </div>
      </div>
    );
  }

  // Kiểm tra nếu sản phẩm đã được tặng
  const isProductGiven = productStatus === 'given' || approvedRequest;

  return (
    <>
      {!showSuccess && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl px-6 py-6 w-[400px] max-h-[90vh] overflow-auto relative shadow-lg">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              <X size={20} />
            </button>

            <div className="text-center mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-1">
                DANH SÁCH YÊU CẦU NHẬN QUÀ
              </h3>
              {isProductGiven && (
                <div className="bg-green-100 text-green-800 text-sm p-2 rounded mb-2">
                  Sản phẩm đã được tặng cho {approvedRequest?.requester?.name}
                </div>
              )}
              <p className="text-sm text-gray-600">
                {isProductGiven ? 'Thông tin người nhận' : 'Chọn người bạn muốn tặng quà'}
              </p>
            </div>

            {requests.length === 0 ? (
              <p className="text-center text-gray-500 py-4">
                Chưa có yêu cầu nhận quà nào
              </p>
            ) : (
              <ul className="space-y-3 max-h-[300px] overflow-y-auto mb-6">
                {requests.map((request) => (
                  <li
                    key={request._id}
                    className={`p-3 rounded-lg border ${request.status === 'approved'
                      ? 'border-green-500 bg-green-50'
                      : request.status === 'rejected'
                        ? 'border-gray-200 bg-gray-50 opacity-70'
                        : 'border-gray-200 hover:bg-gray-50'
                      } ${!isProductGiven && request.status !== 'approved'
                        ? 'cursor-pointer'
                        : 'cursor-default'
                      }`}
                    onClick={() => {
                      if (!isProductGiven && request.status !== 'approved') {
                        setSelectedRequest(request);
                      }
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={request.requester?.avatar?.url || DefaultAvatar}
                        alt={request.requester?.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium text-gray-800">
                            {request.requester?.name || 'Không rõ tên'}
                          </h4>
                          {request.status === 'approved' && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                              Đã duyệt
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">
                          {request.message || 'Không có lời nhắn'}
                        </p>
                      </div>
                      {selectedRequest?._id === request._id && !isProductGiven && (
                        <img src={Check} alt="Đã chọn" className="w-5 h-5" />
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={onClose}
                className="flex-1 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100"
              >
                Đóng
              </button>
              {!isProductGiven && (
                <button
                  onClick={handleApproveRequest}
                  disabled={!selectedRequest || isProductGiven}
                  className={`flex-1 py-2 rounded-lg font-medium ${selectedRequest && !isProductGiven
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                >
                  Duyệt yêu cầu
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {showSuccess && (
        <SuccessPopup
          onClose={onClose}
          message={`Đã duyệt ${selectedRequest?.requester?.name} nhận quà thành công`}
          receiver={{
            name: selectedRequest?.requester?.name,
            avatar: selectedRequest?.requester?.avatar?.url,
            message: selectedRequest?.message,
            phone: selectedRequest?.requester?.phone,
            email: selectedRequest?.requester?.email,
            address: selectedRequest?.requester?.address
          }}

        />
      )}

    </>
  );
};

export default RequestListPopup;