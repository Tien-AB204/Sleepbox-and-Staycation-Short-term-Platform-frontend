import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import RegisterPage from "../pages/auth/RegisterPage";
import { default as GuestLayout } from "../layouts/GuestLayout";
import { default as HostLayout } from "../layouts/HostLayout";
import { default as StaffLayout } from "../layouts/StaffLayout";
import { default as ModeratorLayout } from "../layouts/ModeratorLayout";
import { default as AdminLayout } from "../layouts/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";
import HostRouteGuard from "./HostRouteGuard";
import InternalLoginPage from "../pages/auth/InternalLoginPage";
import HostOnboardingLayout from "../layouts/HostOnboardingLayout";
import HostOnboardingPage from "../pages/host/onboarding/HostOnboardingPage";

// Guest Pages
import Home from "../pages/guest/HomePage";
import Search from "../pages/guest/Search";
import RoomDetail from "../pages/guest/RoomDetail";
import BookingSummary from "../pages/guest/BookingSummary";
import Profile from "../pages/guest/Profile";
import MyBookings from "../pages/guest/MyBookings";
import History from "../pages/guest/History";
import Message from "../pages/guest/Message";
import Notifications from "../pages/guest/Notifications";
import Favorites from "../pages/guest/Favorites";

// Host Pages
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

// Admin (Stitch)
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminUsers from "../pages/admin/AdminUsers";
import AdminModerators from "../pages/admin/AdminModerators";
import AdminModeratorCreate from "../pages/admin/AdminModeratorCreate";
import AdminTransactions from "../pages/admin/AdminTransactions";
import AdminSettings from "../pages/admin/AdminSettings";

// Các trang placeholder khác
const ForgotPassword = () => <div>Forgot Password</div>;
const EmailVerifyPage = () => <div>Email Verify</div>;
const NotFound = () => <div>404 Not Found</div>;
const Forbidden = () => <div>403 Forbidden</div>;
const ModeratorUserManagement = () => <div>Moderator User Management</div>;

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

      <Route element={<GuestLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/room/:id" element={<RoomDetail />} />
      </Route>

      <Route path="/search" element={<Search />} />

      {/* Chỉ cần là User đã đăng nhập (không quan tâm role gì) là thanh toán được */}
      <Route element={<ProtectedRoute><Outlet /></ProtectedRoute>}>
        <Route path="/booking-summary" element={<BookingSummary />} />
      </Route>

      {/* Các trang Profile, Lịch sử... bọc trong GuestLayout và chỉ yêu cầu Đã Đăng Nhập */}
      <Route element={<ProtectedRoute><GuestLayout /></ProtectedRoute>}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/history" element={<History />} />
        <Route path="/message" element={<Message />} /> 
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/favorites" element={<Favorites />} />
      </Route>

      {/* Đăng ký Host — 7 bước (Stitch), không cần đăng nhập để bắt đầu */}
      <Route path="/host/register" element={<HostOnboardingLayout />}>
        <Route index element={<Navigate to="/host/register/1" replace />} />
        <Route path=":step" element={<HostOnboardingPage />} />
      </Route>

      {/* ==================================================== */}
      {/* 3. HOST ROUTES — sau khi hoàn tất đăng ký host (hoặc role host) */}
      {/* ==================================================== */}
      <Route
        element={
          <ProtectedRoute roles={["host", "guest"]}>
            <HostRouteGuard>
              <HostLayout />
            </HostRouteGuard>
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
      <Route element={<ProtectedRoute roles={["moderator"]}><ModeratorLayout /></ProtectedRoute>}>
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
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/moderators" element={<AdminModerators />} />
        <Route path="/admin/moderators/new" element={<AdminModeratorCreate />} />
        <Route path="/admin/transactions" element={<AdminTransactions />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
      </Route>

      <Route path="/forbidden" element={<Forbidden />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default AppRouter;
