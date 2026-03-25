import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { isHostOnboardingComplete } from "../utils/hostOnboarding";

/**
 * Chỉ cho vào khu Host (dashboard…) khi:
 * - role là host, hoặc
 * - guest đã hoàn tất đăng ký host (localStorage).
 */
export default function HostRouteGuard({ children }) {
  const { user } = useAuthContext();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/internal/login" state={{ from: location }} replace />;
  }

  if (user.role === "host") {
    return children;
  }

  if (user.role === "guest" && isHostOnboardingComplete()) {
    return children;
  }

  return <Navigate to="/host/register/1" replace />;
}
