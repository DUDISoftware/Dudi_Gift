import React from 'react';
import { productService } from '../../../src/services/productService';
import ProductCard from '../../../src/components/Product/ProductCard';
import HorizontalSlider from "../../../src/components/Common/HorizontalSlider";

const SimilarProducts = () => {
  const products = productService.getPopularProducts();

  return (
    <HorizontalSlider
      title="Tin đăng tương tự"
      items={products}
      renderItem={(item) => <ProductCard product={item} />}
    />
  );
};

export default SimilarProducts;