import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import { default as GuestLayout } from "../layouts/GuestLayout";
import { default as HostLayout } from "../layouts/HostLayout";
import { default as StaffLayout } from "../layouts/StaffLayout";
import { default as ModeratorLayout } from "../layouts/ModeratorLayout";
import { default as AdminLayout } from "../layouts/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";

// Guest Pages
import Home from "../pages/guest/HomePage";
import Search from "../pages/guest/Search";
import RoomDetail from "../pages/guest/RoomDetail";
import BookingSummary from "../pages/guest/BookingSummary";
import Profile from "../pages/guest/Profile";
import MyBookings from "../pages/guest/MyBookings";
import History from "../pages/guest/History";
import ChatPage from "../pages/guest/ChatPage";
import Notifications from "../pages/guest/Notifications";
import Favorites from "../pages/guest/Favorites";

// Các trang placeholder khác
const ForgotPassword = () => <div>Forgot Password</div>;
const EmailVerifyPage = () => <div>Email Verify</div>;
const NotFound = () => <div>404 Not Found</div>;
const Forbidden = () => <div>403 Forbidden</div>;

// Host/Staff/Moderator/Admin placeholder
const HostDashboard = () => <div>Host Dashboard</div>;
const StaffCheckInOut = () => <div>Staff CheckInOut</div>;
const ModeratorUserManagement = () => <div>Moderator User Management</div>;
const AdminDashboard = () => <div>Admin Dashboard</div>;

const AppRouter = () => (
  <Router>
    <Routes>
      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/email-verify" element={<EmailVerifyPage />} />
      </Route>

      {/* ==================================================== */}
      {/* 1. PUBLIC GUEST ROUTES (Ai cũng xem được)            */}
      {/* ==================================================== */}
      <Route element={<GuestLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/room/:id" element={<RoomDetail />} />
      </Route>

      <Route path="/search" element={<Search />} />

      {/* ==================================================== */}
      {/* 2. PROTECTED GUEST ROUTES (Chỉ Guest mới được vào)   */}
      {/* ==================================================== */}
      {/* Booking Summary cần đăng nhập để thanh toán */}
      <Route
        element={
          <ProtectedRoute roles={["guest"]}>
            <Outlet /> {/* Dùng Outlet trần vì file này tự có Layout riêng */}
          </ProtectedRoute>
        }
      >
        <Route path="/booking-summary" element={<BookingSummary />} />
      </Route>

      {/* Các trang Profile, Lịch sử... bọc trong GuestLayout */}
      <Route
        element={
          <ProtectedRoute roles={["guest"]}>
            <GuestLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/history" element={<History />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/favorites" element={<Favorites />} />
      </Route>

      {/* ==================================================== */}
      {/* 3. HOST ROUTES                                       */}
      {/* ==================================================== */}
      <Route
        element={
          <ProtectedRoute roles={["host"]}>
            <HostLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/host/dashboard" element={<HostDashboard />} />
      </Route>

      {/* ==================================================== */}
      {/* 4. STAFF ROUTES                                      */}
      {/* ==================================================== */}
      <Route
        element={
          <ProtectedRoute roles={["staff"]}>
            <StaffLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/staff/check-in-out" element={<StaffCheckInOut />} />
      </Route>

      {/* ==================================================== */}
      {/* 5. MODERATOR ROUTES                                  */}
      {/* ==================================================== */}
      <Route
        element={
          <ProtectedRoute roles={["moderator"]}>
            <ModeratorLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/moderator/user-management" element={<ModeratorUserManagement />} />
      </Route>

      {/* ==================================================== */}
      {/* 6. ADMIN ROUTES                                      */}
      {/* ==================================================== */}
      <Route
        element={
          <ProtectedRoute roles={["admin"]}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Route>

      {/* Common */}
      <Route path="/forbidden" element={<Forbidden />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default AppRouter;