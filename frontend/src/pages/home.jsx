import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/productSlice';
import ImageSlider from '../components/Products/ImageSlider';
import ProductLists from '../components/Layout/ProductList';
import Featured from '../components/Products/Featured';


const Home = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === 'idle') {
        console.log("dispatching fetchproducts.....");
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  let content;
  if (status === 'loading') {
    content = <div className="text-center">Loading...</div>;
  } else if (status === 'succeeded') {
    content = <ProductLists products={products || []} />;
  } else if (status === 'failed') {
    content = <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <>
      <ImageSlider />
      <Featured />
      <h1 className="text-2xl text-center font-semibold mb-8 head-product" id="products">
        Our products
      </h1>
      {content}
    </>
  );
};

export default Home;
