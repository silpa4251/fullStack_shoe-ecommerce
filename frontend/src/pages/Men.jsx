import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByCategory } from '../features/productSlice';
import ProductList from '../components/Layout/ProductList';
import ImageSlider from '../components/Products/ImageSlider';

const Men = () => {
  const token = localStorage.getItem("token");
  const userData = JSON.parse(localStorage.getItem("user"));
  const user = Array.isArray(userData) ? userData[0] : userData; // Parse user from localStorage
  const { isAuthenticated } = useSelector((state) => state.user);
  const isAdmin = token && user?.role === "admin";

  console.log("Token:", token);
  console.log("User:", user);
  console.log("Is Admin:", isAdmin);
  console.log("Is Authenticated:", isAuthenticated);


  const dispatch = useDispatch();
  const { productsByCategory, status, error } = useSelector((state) => state.products);

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
      <h1 className="text-2xl text-center font-semibold m-6 text-pink">Men&apos;s Shoes</h1>
      <ProductList products={productsByCategory} />
    </div>
  );
};

export default Men;
