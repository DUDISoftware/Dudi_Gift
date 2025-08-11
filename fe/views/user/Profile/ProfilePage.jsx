import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { userService } from '../../../src/services/userService';
import MyProfileCard from './MyProfileCard';
import OtherProfileCard from './OtherProfileCard';
import AdCard from './AdCard';
import ProductSection from './ProductSection';
import ProductDetailPopup from './ProductDetailPopup';
import { productService } from '../../../src/services/productService';

const ProfilePage = () => {
  const { name } = useParams();
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('displaying');
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const profile = await userService.getUserProfile(name);
        const me = await userService.getCurrentUser();

        let products = [];
        if (me?.name === profile?.name) {
          products = await productService.getMyProducts();
        } else {
          products = await productService.getProductsByUser(profile._id);
        }

        profile.products = products.filter(p => p.status === 'active');
        profile.productsGiven = products.filter(p => p.status === 'given');
        profile.productsPending = products.filter(p => p.status === 'pending');

        setUser(profile);
        setCurrentUser(me);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [name]);

  if (loading) {
    return <div className="p-4 text-center">Đang tải...</div>;
  }

  if (!user) {
    return <div className="p-4 text-center">Không tìm thấy người dùng</div>;
  }

  const isOwner = currentUser?.name === user.name;

  const getProductsToShow = () => {
    switch (selectedTab) {
      case 'displaying':
        return user?.products || [];
      case 'given':
        return user?.productsGiven || [];
      case 'pending':
        return user?.productsPending || [];
      default:
        return [];
    }
  };

  const productsToShow = getProductsToShow();

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

        <div className="w-full md:w-[70%]">
          <ProductSection
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            products={productsToShow}
            isOwner={isOwner}
            onProductClick={setSelectedProduct}
            isMe={isOwner}
          />
        </div>
      </div>

      {selectedProduct && (
        <ProductDetailPopup
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          isOwner={isOwner}
        />
      )}
    </>
  );
};

export default ProfilePage;