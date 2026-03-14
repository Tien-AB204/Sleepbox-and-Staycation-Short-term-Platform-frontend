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
import Home from "../pages/guest/Home";
import Search from "../pages/guest/Search";
import RoomDetail from "../pages/guest/RoomDetail";
import BookingPage from "../pages/guest/BookingPage";

// Các trang placeholder khác (có thể import thật khi bạn làm tiếp)
const ForgotPassword = () => <div>Forgot Password</div>;
const EmailVerifyPage = () => <div>Email Verify</div>;
const NotFound = () => <div>404 Not Found</div>;
const Forbidden = () => <div>403 Forbidden</div>;

// Host Pages
import HostLoginPage from "../pages/host/HostLoginPage";
import HostRegisterPage from "../pages/host/HostRegisterPage";
import HostDashboardOverview from "../pages/host/HostDashboardOverview";
import HostFacilities from "../pages/host/HostFacilities";
import HostBookings from "../pages/host/HostBookings";
import HostCalendar from "../pages/host/HostCalendar";
import HostPricing from "../pages/host/HostPricing";
import HostStaff from "../pages/host/HostStaff";
import HostStatistics from "../pages/host/HostStatistics";
import HostDisputes from "../pages/host/HostDisputes";
import HostSleepbox from "../pages/host/HostSleepbox";
import HostSettings from "../pages/host/HostSettings";

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

      {/* Public Guest Routes (Không cần đăng nhập) */}
      <Route element={<GuestLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/room/:id" element={<RoomDetail />} />
      </Route>

      {/* Search Route (Standalone Layout) */}
      <Route path="/search" element={<Search />} />

      {/* Booking Route (Standalone Layout) */}
      <Route path="/booking" element={<BookingPage />} />

      {/* Host Auth (Standalone - không cần đăng nhập) */}
      <Route path="/host/login" element={<HostLoginPage />} />
      <Route path="/host/register" element={<HostRegisterPage />} />

      {/* Protected Guest Routes (Cần đăng nhập - ví dụ: trang cá nhân, lịch sử đặt phòng) */}
      <Route
        element={
          <ProtectedRoute roles={["guest"]}>
            <GuestLayout />
          </ProtectedRoute>
        }
      >
        {/* Thêm các route cần bảo vệ của guest ở đây sau này */}
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
        <Route path="/host/dashboard" element={<HostDashboardOverview />} />
        <Route path="/host/facilities" element={<HostFacilities />} />
        <Route path="/host/bookings" element={<HostBookings />} />
        <Route path="/host/calendar" element={<HostCalendar />} />
        <Route path="/host/pricing" element={<HostPricing />} />
        <Route path="/host/staff" element={<HostStaff />} />
        <Route path="/host/statistics" element={<HostStatistics />} />
        <Route path="/host/disputes" element={<HostDisputes />} />
        <Route path="/host/sleepboxes" element={<HostSleepbox />} />
        <Route path="/host/settings" element={<HostSettings />} />
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
        {/* ...other staff routes... */}
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
        {/* ...other moderator routes... */}
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
        {/* ...other admin routes... */}
      </Route>
      {/* Common */}
      <Route path="/forbidden" element={<Forbidden />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default AppRouter;
