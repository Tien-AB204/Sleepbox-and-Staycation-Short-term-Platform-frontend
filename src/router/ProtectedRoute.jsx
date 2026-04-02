import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

const ProtectedRoute = ({ roles = [], children }) => {
  const { user, loading } = useAuthContext();
  const location = useLocation();

  if (loading) return <div>Đang tải phiên đăng nhập...</div>;

  if (!user) {
    return <Navigate to="/internal/login" state={{ from: location }} replace />;
  }

  // Đảm bảo so sánh không phân biệt hoa thường (toLowerCase)
  if (roles.length > 0) {
    const userRole = user.role ? user.role.toLowerCase() : "";
    const allowedRoles = roles.map(r => r.toLowerCase());
    
    if (!allowedRoles.includes(userRole)) {
      return <Navigate to="/forbidden" replace />;
    }
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;