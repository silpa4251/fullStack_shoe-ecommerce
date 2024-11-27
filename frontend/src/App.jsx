import { lazy, Suspense } from 'react';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
const Home = lazy(() => import('./pages/home'));
const Register = lazy(() => import("./pages/register"));
const Login = lazy(() => import("./pages/login"));

const Men = lazy(() => import("./pages/Men"));
const Women = lazy(() => import("./pages/Women"));
const Kids = lazy(() => import("./pages/Kids"));


function App() {
  

  return (
    <>
    <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
        <Route path='/' element = {<Home />} />
          <Route path='/register' element={<Register /> } />
          <Route path='/login' element={<Login /> } />

          
          <Route path='/men' element={<Men />} />
          <Route path='/women' element={<Women /> }/>
          <Route path='/kids' element={<Kids /> }/>
          <Route path='/products' element={<Home/>}/>
        </Routes>
      </Suspense>
      <Footer />
    </>
  )
}

export default App
