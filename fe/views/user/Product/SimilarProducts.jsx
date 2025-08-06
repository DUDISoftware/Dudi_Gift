import React, { useEffect, useState } from 'react';
import { productService } from '../../../src/services/productService';
import ProductCard from '../../../src/components/Product/ProductCard';
import HorizontalSlider from "../../../src/components/Common/HorizontalSlider";

const SimilarProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await productService.getPopularProducts();
        setProducts(data);
      } catch (err) {
        console.error('Lỗi khi lấy sản phẩm phổ biến:', err);
      }
    };

    fetch();
  }, []);

  return (
    <HorizontalSlider
      title="Tin đăng tương tự"
      items={products}
      renderItem={(item) => <ProductCard product={item} />}
    />
  );
};

export default SimilarProducts;
