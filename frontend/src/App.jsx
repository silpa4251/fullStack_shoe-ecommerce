// import { lazy, Suspense } from 'react';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import PageNotFound from './components/NotPage/PageNotFound';
import Home from './pages/home';
import Register from './pages/register';
import Login from './components/Auth/login';
import Men from './pages/Men';
import Women from './pages/Women';
import Kids from './pages/Kids';
import SingleProduct from './components/Layout/SingleProduct';
import Cart from './pages/cart';
import CartProduct from './components/Cart/CartProduct';
import CheckoutPage from './pages/checkoutPage';
import WishList from './components/Wishlist/wishlist';
import Profile from './components/Profile/profile';
import AllProducts from './components/Admin/AllProducts';
import AllUsers from './components/Admin/AllUsers';
import AddProduct from './components/Admin/AddProduct';
import EditProduct from './components/Admin/EditProduct';
import ProtectedRoute from './routes/protectedRoutes';
import AdminRoutes from './routes/adminRoutes';
import UserDetails from './components/Admin/UserDetails';
import Orders from './components/Admin/Orders';
import OrderDetails from './components/Admin/OrderDetails';
import Dashboard from './components/Admin/Dashboard';
import Admin from './components/Admin/Admin';
import { useSelector } from "react-redux";
import SearchPage from "./components/Search/SearchPage";


function App() {
  

  return (
    <>
    <NavbarConditional />
      {/* <Suspense fallback={<div>Loading...</div>}> */}
        <Routes>
        <Route path='/' element = {<Home />} />
          <Route path='/register' element={<Register /> } />
          <Route path='/login' element={<Login /> } />

          
          <Route path='/men' element={<Men />} />
          <Route path='/women' element={<Women /> }/>
          <Route path='/kids' element={<Kids /> }/>
          <Route path='/products' element={<Home/>}/>
          <Route path='/products/:id' element={<SingleProduct/>} />
          <Route path='/search' element={<SearchPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path='/cart' element={<Cart />} />
            <Route path='/cartProducts' element={<CartProduct />} />
            <Route path='/checkout' element={<CheckoutPage />} /> 
            <Route path='/wishlist' element={<WishList />} /> 
            <Route path='/profile' element={<Profile />} />
          </Route>

          <Route element={<AdminRoutes />}>
            <Route path = '/admin' element={<Admin />} >
            <Route index element={<Dashboard />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='users' element={<AllUsers />} />
            <Route path='users/:id' element={<UserDetails />} />
            <Route path='productlist' element={<AllProducts />} />
            <Route path='productlist/:id' element={<EditProduct />} />
            <Route path='add-product' element={<AddProduct />} />
            <Route path='orders' element={<Orders />} />
            <Route path='orders/:orderId' element={<OrderDetails />} />
            </Route>
          </Route>

          <Route path='*' element={<PageNotFound />} />

        </Routes>
      {/* </Suspense> */}
      <FooterConditional />
    </>
  )
}

const NavbarConditional = () => {
  const { admin } = useSelector((state) => state.user);
  return !admin && <Navbar />;

}

const FooterConditional = () => {
  const { admin } = useSelector((state) => state.user);
  const location = useLocation();
  const noFooter = ["/login","/register"];
  return (!admin && !noFooter.includes(location.pathname)) && <Footer />;

}

export default App
