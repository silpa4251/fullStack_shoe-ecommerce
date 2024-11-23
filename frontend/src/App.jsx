

import { lazy, Suspense } from 'react';
import './App.css'
import { Route, Routes } from 'react-router-dom';
const Register = lazy(() => import("./pages/register"));
const Login = lazy(() => import("./pages/login"));


function App() {
  

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/register' element={<Register /> } />
          <Route path='/login' element={<Login /> } />
        </Routes>
      </Suspense>
    </>
  )
}

export default App
