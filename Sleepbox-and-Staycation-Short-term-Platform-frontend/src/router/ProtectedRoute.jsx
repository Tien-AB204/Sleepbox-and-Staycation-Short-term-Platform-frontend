import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { ROLES } from "../config/constants";

const ProtectedRoute = ({ roles = [], children }) => {
  const { user, loading } = useAuthContext();
  const location = useLocation();

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/forbidden" replace />;
  }

  // Nếu có children (bọc layout), render children, nếu không thì render <Outlet />
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
