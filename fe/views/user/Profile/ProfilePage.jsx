import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { userService } from '../../../src/services/userService';
import MyProfileCard from './MyProfileCard';
import OtherProfileCard from './OtherProfileCard';
import AdCard from './AdCard';
import ProductSection from './ProductSection';
import ProductDetailPopup from './ProductDetailPopup';

const ProfilePage = () => {
  const { name } = useParams();
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [selectedTab, setSelectedTab] = useState('displaying');
  // const [selectedProduct, setSelectedProduct] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    const profile = await userService.getUserProfile(name);
    const me = await userService.getCurrentUser();
    setUser(profile);
    setCurrentUser(me);
    setLoading(false);
  };
  fetchData();
}, [name]);


  if (loading || !user) return <div className="p-4 text-center">Đang tải...</div>;

  // const productsToShow =
  // selectedTab === 'displaying'
  //   ? user?.products || []
  //   : user?.productsGiven || [];


  const isOwner = currentUser?.name === user.name;

  return (
    <> 
      <div className="flex flex-col lg:flex-row bg-white min-h-screen w-full px-6 py-6 gap-8">
        <div className="w-full lg:w-[21%] flex flex-col items-center lg:items-start gap-6 max-w-7xl mx-auto">
          {isOwner ? (
            <MyProfileCard user={user} />
          ) : (
            <OtherProfileCard user={user} />
          )}
          <AdCard />
        </div>

        {/* <div className="w-full md:w-[70%]">
          <ProductSection
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            products={productsToShow}
            isOwner={isOwner}
            onProductClick={setSelectedProduct}
          />
        </div> */}
      </div>

      {/* {selectedProduct && (
        <ProductDetailPopup
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )} */}
    </>
  );
};

export default ProfilePage;
