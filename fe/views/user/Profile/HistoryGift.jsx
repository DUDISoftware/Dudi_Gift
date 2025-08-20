import React, { useState, useEffect } from 'react';
import { requestService } from '../../../src/services/requestService';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import DefaultAvatar from '../../../src/assets/img/avatar_1.png';
import DefaultProduct from '../../../src/assets/img/1.png';
import { formatDate } from '../../../utils/dateUtils';

const HistoryGift = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [receivedGifts, setReceivedGifts] = useState([]);
  const [givenGifts, setGivenGifts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [received, given] = await Promise.all([
          requestService.getReceivedGifts(),
          requestService.getGivenGifts()
        ]);

        setReceivedGifts(received || []);
        setGivenGifts(given || []);
      } catch (error) {
        console.error('Error fetching gift history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="p-4 text-center">Đang tải lịch sử...</div>;
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Lịch sử quà tặng</h1>

      <Tabs selectedIndex={activeTab} onSelect={index => setActiveTab(index)}>
        <TabList className="flex border-b border-gray-200">
          <Tab
            className="px-4 py-2 cursor-pointer focus:outline-none"
            selectedClassName="border-b-2 border-green-500 font-semibold"
          >
            Quà đã nhận
          </Tab>
          <Tab
            className="px-4 py-2 cursor-pointer focus:outline-none"
            selectedClassName="border-b-2 border-green-500 font-semibold"
          >
            Quà đã tặng
          </Tab>
        </TabList>

        {/* Quà đã nhận */}
        <TabPanel>
          <div className="mt-4">
            {receivedGifts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {receivedGifts.map(gift => (
                  <GiftCard key={gift._id} gift={gift} type="received" />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                Bạn chưa nhận được món quà nào
              </p>
            )}
          </div>
        </TabPanel>

        {/* Quà đã tặng */}
        <TabPanel>
          <div className="mt-4">
            {givenGifts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {givenGifts.map(gift => (
                  <GiftCard key={gift._id} gift={gift} type="given" />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                Bạn chưa tặng món quà nào
              </p>
            )}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

const GiftCard = ({ gift, type }) => {
  let user;
  if (type === 'received') {
    user = gift?.product?.user || gift?.user_id; // người tặng
  } else {
    user = gift?.receiver || gift?.given_to || gift?.user_id; // người nhận
  }

  const actionText = type === 'received' ? 'Nhận từ' : 'Tặng cho';

  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow bg-white">
      <div className="flex items-center gap-3 mb-3">
        <img 
          src={user?.avatar?.url || user?.avatar || DefaultAvatar} 
          alt={user?.name || 'Ẩn danh'} 
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="font-medium">{actionText} {user?.name || 'Ẩn danh'}</p>
          <p className="text-sm text-gray-500">{formatDate(gift.updatedAt)}</p>
        </div>
      </div>

      <div className="flex gap-3">
        <img 
          src={gift?.product?.images?.[0]?.url || gift?.image_url?.url || DefaultProduct} 
          alt={gift?.product?.title || gift?.title} 
          className="w-16 h-16 object-cover rounded"
        />
        <div>
          <h3 className="font-semibold line-clamp-1">{gift?.product?.title || gift?.title}</h3>
          <p className="text-sm text-gray-500 line-clamp-2">{gift?.product?.description || gift?.description}</p>
        </div>
      </div>

      {gift?.review && (
        <div className="mt-3 p-2 bg-gray-50 rounded">
          <p className="text-sm italic">"{gift.review}"</p>
        </div>
      )}
    </div>
  );
};


export default HistoryGift;
