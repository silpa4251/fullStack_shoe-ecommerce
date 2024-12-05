import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeaturedProducts } from '../../features/productSlice'; 
import ProductList from '../Layout/ProductList';

const Featured = () => {
  const dispatch = useDispatch();
  const { featuredProducts, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchFeaturedProducts());
    }
  }, [dispatch, status]);

  if (status === 'loading') {
    return <div>Loading featured products...</div>;
  }

  if (status === 'failed') {
    return <div>Error loading featured products: {error}</div>;
  }

  return (
    <div>
        <h1 className="text-2xl  text-center font-semibold m-6 text-pink">Featured Products</h1>
        <ProductList products={featuredProducts} />
    </div>
  );
};

export default Featured;
