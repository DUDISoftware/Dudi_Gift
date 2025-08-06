import React, { useEffect, useState } from 'react';
import { productService } from '../../../src/services/productService';
import ProductCard from '../../../src/components/Product/ProductCard';
import HorizontalSlider from '../../../src/components/Common/HorizontalSlider';

const GiftsByUser = ({ user, currentProductId }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const userId = typeof user === 'object' ? user._id : user;
        if (!userId) return;

        const data = await productService.getProductsByUser(userId);
        const filtered = data.filter((p) => p._id !== currentProductId);
        setProducts(filtered);
      } catch (err) {
        console.error('Lỗi khi lấy sản phẩm của user:', err);
      }
    };

    fetch();
  }, [user, currentProductId]);

  const userDisplayName =
    typeof user === 'object' ? user.name || user.username || 'người dùng' : 'người dùng';

  if (!products.length) return null;

  return (
    <HorizontalSlider
      title={`Đồ tặng khác của ${userDisplayName}`}
      items={products}
      renderItem={(item) => <ProductCard product={item} />}
    />
  );
};

export default GiftsByUser;
