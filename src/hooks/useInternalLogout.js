import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useAuthContext } from "../contexts/AuthContext";

/** Đăng nhập nội bộ — staff / moderator / admin */
export const INTERNAL_LOGIN_PATH = "/internal/login";

/**
 * Đăng xuất và chuyển về trang đăng nhập nội bộ (relative path, mọi host/port dev/prod).
 *
 * Phải `navigate` trước rồi mới `logout` (setTimeout 0). Nếu logout trước, ProtectedRoute
 * thấy !user trên route được bảo vệ và có thể đẩy sang trang khác trước khi navigate chạy xong.
 */
export function useInternalLogout() {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  return useCallback(() => {
    navigate(INTERNAL_LOGIN_PATH, { replace: true });
    setTimeout(() => {
      logout();
    }, 0);
  }, [logout, navigate]);
}
