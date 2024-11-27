import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByCategory } from '../features/productSlice';
import ProductList from '../components/Layout/ProductList';
import ImageSlider from '../components/Products/ImageSlider';

const Men = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);

  // Dispatch fetch request to get Men's shoes
  useEffect(() => {
    dispatch(fetchProductsByCategory("Men"));
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading men&apos;s shoes...</div>;
  }

  if (status === 'failed') {
    return <div>Error loading men&apos;s shoes: {error}</div>;
  }

  return (
    <div>
      <ImageSlider />
      <h1 className="text-2xl text-center font-semibold m-6 head-product">Men&apos;s Shoes</h1>
      <ProductList products={products} />
    </div>
  );
};

export default Men;
