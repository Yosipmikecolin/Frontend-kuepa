import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
