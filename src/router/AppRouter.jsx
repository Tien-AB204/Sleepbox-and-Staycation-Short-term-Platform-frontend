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

// Các trang placeholder khác (có thể import thật khi bạn làm tiếp)
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
      {/* Guest Routes */}
      <Route
        element={
          <ProtectedRoute roles={["guest"]}>
            <GuestLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/room/:id" element={<RoomDetail />} />
        {/* ...other guest routes... */}
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
        {/* ...other host routes... */}
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