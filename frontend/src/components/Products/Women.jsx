import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByCategory } from '../features/productSlice'; 
import ProductList from '../components/Layout/ProductList';
import ImageSlider from '../components/Products/ImageSlider';

const Women = () => {
  const dispatch = useDispatch();
  const { productsByCategory, status, error } = useSelector((state) => state.products);

  // Dispatch fetch request to get Women's shoes
  useEffect(() => {
    dispatch(fetchProductsByCategory("Women"));
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading women&apos;s shoes...</div>;
  }

  if (status === 'failed') {
    return <div>Error loading women&apos;s shoes: {error}</div>;
  }

  return (
    <div>
      <ImageSlider />
      <h1 className="text-2xl text-center font-semibold m-6 text-pink">Women&apos;s Shoes</h1>
      <ProductList products={productsByCategory} />
    </div>
  );
};

export default Women;
