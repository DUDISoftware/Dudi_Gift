import React from 'react';
import { productService } from '../../../src/services/productService';
import ProductCard from '../../../src/components/Product/ProductCard';
import HorizontalSlider from "../../../src/components/Common/HorizontalSlider";

const GiftsByUser = ({ user, currentProductId }) => {
  const products = productService
    .getProductsByUser(user)
    .filter((p) => p.id !== currentProductId);

  return (
    <HorizontalSlider
      title={`Đồ tặng khác của ${user}`}
      items={products}
      renderItem={(item) => <ProductCard product={item} />}
    />
  );
};

export default GiftsByUser;