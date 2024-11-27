import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, selectProducts } from '../features/productSlice';
import ImageSlider from '../components/Products/ImageSlider';
import ProductLists from '../components/Layout/ProductList';
import Featured from '../components/Products/Featured';


const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  console.log("products from redux ", products);
  const productStatus = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    if (productStatus === 'idle') {
        console.log("dispatching fetchproducts.....");
      dispatch(fetchProducts());
    }
  }, [productStatus, dispatch]);

  let content;
  if (productStatus === 'loading') {
    content = <div className="text-center">Loading...</div>;
  } else if (productStatus === 'succeeded') {
    content = <ProductLists products={products || []} />;
  } else if (productStatus === 'failed') {
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
