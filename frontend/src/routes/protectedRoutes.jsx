import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";


const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  const { isAuthenticated } = useSelector((state) => state.user);

  if (!isAuthenticated && !token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;



// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import PrivateRoute from './PrivateRoute'; // Import your PrivateRoute component

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route element={<PrivateRoute />}>
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/cart" element={<Cart />} />
//         </Route>
//         <Route path="/" element={<Home />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
