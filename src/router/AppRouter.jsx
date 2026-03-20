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

// Host pages (nhúng UI từ stitch)
import HostDashboard from "../pages/host/Dashboard";
import HostFacilities from "../pages/host/Facilities";
import HostCalendar from "../pages/host/Calendar";
import HostPricing from "../pages/host/Pricing";
import HostStaffManagement from "../pages/host/StaffManagement";
import HostSleepboxes from "../pages/host/Sleepboxes";
import HostBookingManagement from "../pages/host/BookingManagement";
import HostStatistics from "../pages/host/Statistics";
import HostDisputes from "../pages/host/Disputes";
import HostRegister from "../pages/host/HostRegister";
import HostReviews from "../pages/host/Reviews";
import HostSettings from "../pages/host/Settings";
import HostMessages from "../pages/host/Messages";

// Các trang placeholder khác
const ForgotPassword = () => <div>Forgot Password</div>;
const EmailVerifyPage = () => <div>Email Verify</div>;
const NotFound = () => <div>404 Not Found</div>;
const Forbidden = () => <div>403 Forbidden</div>;

// Host/Staff/Moderator/Admin placeholder
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

      {/* Public Guest Routes (Gom tất cả trang của Guest vào chung Layout để có Header) */}
      <Route element={<GuestLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/room/:id" element={<RoomDetail />} />
        <Route path="/profile" element={<Profile />} />
        
        {/* CÁC ROUTE MỚI THÊM */}
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/history" element={<History />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/favorites" element={<Favorites />} />
      </Route>

      {/* Search Route (Standalone Layout - Đã có sẵn Header riêng) */}
      <Route path="/search" element={<Search />} />
      
      {/* Booking Summary Route (Standalone Layout - Đã có sẵn Header riêng) */}
      <Route path="/booking-summary" element={<BookingSummary />} />

      {/* Protected Guest Routes (Cần đăng nhập) */}
      <Route
        element={
          <ProtectedRoute roles={["guest"]}>
            <GuestLayout />
          </ProtectedRoute>
        }
      >
        {/* XÓA QUYỀN TRUY CẬP TRONG NÀY TẠM THỜI */}
        {/* <Route path="/profile" element={<Profile />} /> */}
      </Route>

      {/* Host Routes */}
      <Route
        element={
          <ProtectedRoute roles={["host"]}>
            <HostLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/host/dashboard" element={<HostDashboard />} />
        <Route path="/host/facilities" element={<HostFacilities />} />
        <Route path="/host/calendar" element={<HostCalendar />} />
        <Route path="/host/pricing" element={<HostPricing />} />
        <Route path="/host/staff-management" element={<HostStaffManagement />} />
        <Route path="/host/sleepboxes" element={<HostSleepboxes />} />
        <Route path="/host/booking-management" element={<HostBookingManagement />} />
        <Route path="/host/statistics" element={<HostStatistics />} />
        <Route path="/host/disputes" element={<HostDisputes />} />
        <Route path="/host/register" element={<HostRegister />} />
        <Route path="/host/reviews" element={<HostReviews />} />
        <Route path="/host/settings" element={<HostSettings />} />
        <Route path="/host/messages" element={<HostMessages />} />
      </Route>

      {/* Staff Routes */}
      <Route
        element={
          <ProtectedRoute roles={["staff"]}>
            <StaffLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/staff/check-in-out" element={<StaffCheckInOut />} />
      </Route>

      {/* Moderator Routes */}
      <Route
        element={
          <ProtectedRoute roles={["moderator"]}>
            <ModeratorLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/moderator/user-management" element={<ModeratorUserManagement />} />
      </Route>

      {/* Admin Routes */}
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