

import { lazy, Suspense } from 'react';
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
const Register = lazy(() => import("./pages/register"));
const Login = lazy(() => import("./pages/login"));


function App() {
  

  return (
    <>
    <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/register' element={<Register /> } />
          <Route path='/login' element={<Login /> } />
        </Routes>
      </Suspense>
      <Footer />
    </>
  )
}

export default App
