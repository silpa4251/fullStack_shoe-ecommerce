import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByCategory } from '../features/productSlice'; 
import ProductList from '../components/Layout/ProductList';
import ImageSlider from '../components/Products/ImageSlider';

const Kids = () => {
  const dispatch = useDispatch();
  const { productsByCategory, status, error } = useSelector((state) => state.products);

  // Dispatch fetch request to get Kids shoes
  useEffect(() => {
    dispatch(fetchProductsByCategory("Kids"));
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading kid&apos;s shoes...</div>;
  }

  if (status === 'failed') {
    return <div>Error loading kid&apos;s shoes: {error}</div>;
  }

  return (
    <div>
      <ImageSlider />
      <h1 className="text-2xl text-center font-semibold m-6 text-pink">Kid&apos;s Shoes</h1>
      <ProductList products={productsByCategory} />
    </div>
  );
};

export default Kids;
