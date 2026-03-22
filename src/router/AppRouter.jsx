import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import RegisterPage from "../pages/auth/RegisterPage";
import { default as GuestLayout } from "../layouts/GuestLayout";
import { default as HostLayout } from "../layouts/HostLayout";
import { default as StaffLayout } from "../layouts/StaffLayout";
import { default as ModeratorLayout } from "../layouts/ModeratorLayout";
import { default as AdminLayout } from "../layouts/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";
import InternalLoginPage from "../pages/auth/InternalLoginPage";

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

// Host Pages (UI từ bản Stitch)
import HostDashboard from "../pages/host/HostDashboard";
import HostBookings from "../pages/host/HostBookings";
import HostCalendar from "../pages/host/HostCalendar";
import HostFacilities from "../pages/host/HostFacilities";
import HostSleepboxes from "../pages/host/HostSleepboxes";
import HostPricing from "../pages/host/HostPricing";
import HostStaff from "../pages/host/HostStaff";
import HostStatistics from "../pages/host/HostStatistics";
import HostMessages from "../pages/host/HostMessages";
import HostDisputes from "../pages/host/HostDisputes";

// Staff pages
import StaffDashboard from "../pages/staff/StaffDashboard";
import StaffCheckInOut from "../pages/staff/StaffCheckInOut";
import StaffBoxes from "../pages/staff/StaffBoxes";
import StaffNotifications from "../pages/staff/StaffNotifications";
import StaffIssues from "../pages/staff/StaffIssues";
import StaffVerification from "../pages/staff/StaffVerification";
import StaffProfile from "../pages/staff/StaffProfile";

// Các trang placeholder khác
const ForgotPassword = () => <div>Forgot Password</div>;
const EmailVerifyPage = () => <div>Email Verify</div>;
const NotFound = () => <div>404 Not Found</div>;
const Forbidden = () => <div>403 Forbidden</div>;

const ModeratorUserManagement = () => <div>Moderator User Management</div>;
const AdminDashboard = () => <div>Admin Dashboard</div>;

const AppRouter = () => (
  <Router>
    <Routes>
      {/* Đăng nhập thống nhất (guest / host / nội bộ) */}
      <Route path="/internal/login" element={<InternalLoginPage />} />
      <Route path="/login" element={<Navigate to="/internal/login" replace />} />

      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
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
      <Route
        element={
          <ProtectedRoute roles={["guest"]}>
            <Outlet />
          </ProtectedRoute>
        }
      >
        <Route path="/booking-summary" element={<BookingSummary />} />
      </Route>

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
      {/* 3. HOST ROUTES — guest đã đăng nhập có thể xem UI host */}
      {/* ==================================================== */}
      <Route
        element={
          <ProtectedRoute roles={["host", "guest"]}>
            <HostLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/host" element={<Navigate to="/host/dashboard" replace />} />
        <Route path="/host/dashboard" element={<HostDashboard />} />
        <Route path="/host/bookings" element={<HostBookings />} />
        <Route path="/host/calendar" element={<HostCalendar />} />
        <Route path="/host/facilities" element={<HostFacilities />} />
        <Route path="/host/sleepboxes" element={<HostSleepboxes />} />
        <Route path="/host/pricing" element={<HostPricing />} />
        <Route path="/host/staff" element={<HostStaff />} />
        <Route path="/host/statistics" element={<HostStatistics />} />
        <Route path="/host/messages" element={<HostMessages />} />
        <Route path="/host/disputes" element={<HostDisputes />} />
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
        <Route path="/staff" element={<Navigate to="/staff/dashboard" replace />} />
        <Route path="/staff/dashboard" element={<StaffDashboard />} />
        <Route path="/staff/check-in-out" element={<StaffCheckInOut />} />
        <Route path="/staff/boxes" element={<StaffBoxes />} />
        <Route path="/staff/notifications" element={<StaffNotifications />} />
        <Route path="/staff/issues" element={<StaffIssues />} />
        <Route path="/staff/verification" element={<StaffVerification />} />
        <Route path="/staff/profile" element={<StaffProfile />} />
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
