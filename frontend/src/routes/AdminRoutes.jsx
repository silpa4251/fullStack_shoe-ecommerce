import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoutes = () => {
  console.log("AdminRoutes component rendered");
  const token = localStorage.getItem("token");
  const role = JSON.parse(localStorage.getItem("role"));
  const { isAuthenticated } = useSelector((state) => state.user);

  const isAdmin = token && role === "admin";


  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default AdminRoutes;
