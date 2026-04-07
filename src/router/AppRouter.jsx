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
import HostSetPasswordPage from "../pages/host/onboarding/HostSetPasswordPage";

// Guest Pages
import Home from "../pages/guest/Homepage";
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
import HostArea from "../pages/host/HostArea";
import HostBoxManagement from "../pages/host/HostBoxManagement";
import HostPricing from "../pages/host/HostPricing";
import HostStaff from "../pages/host/HostStaff";
import HostStatistics from "../pages/host/HostStatistics";
import HostMessages from "../pages/host/HostMessages";
import HostDisputes from "../pages/host/HostDisputes";
import HostAmenities from "../pages/host/HostAmenities";

// Staff pages
import StaffDashboard from "../pages/staff/StaffDashboard";
import StaffCheckInOut from "../pages/staff/StaffCheckInOut";
import StaffBoxes from "../pages/staff/StaffBoxes";
import StaffNotifications from "../pages/staff/StaffNotifications";
import StaffIssues from "../pages/staff/StaffIssues";
import StaffVerification from "../pages/staff/StaffVerification";
import StaffProfile from "../pages/staff/StaffProfile";

// Moderator pages
import HostApproval from "../pages/moderator/HostApproval";
import FacilityApproval from "../pages/moderator/FacilityApproval";
import DisputeManagement from "../pages/moderator/DisputeManagement";
import UserManagement from "../pages/moderator/UserManagement";

// Admin pages
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminUsers from "../pages/admin/AdminUsers";
import AdminModerators from "../pages/admin/AdminModerators";
import AdminModeratorCreate from "../pages/admin/AdminModeratorCreate";
import AdminModeratorEdit from "../pages/admin/AdminModeratorEdit";
import AdminAdminCreate from "../pages/admin/AdminAdminCreate";
import AdminAddonServices from "../pages/admin/AdminAddonServices";
import AdminBoxTypePriceLimits from "../pages/admin/AdminBoxTypePriceLimits";
import AdminPlatformFee from "../pages/admin/AdminPlatformFee";
import AdminSystemPriceRules from "../pages/admin/AdminSystemPriceRules";
import AdminTransactions from "../pages/admin/AdminTransactions";
import AdminSettings from "../pages/admin/AdminSettings";
import BookingDetail from "../pages/guest/BookingDetail";

// Các trang placeholder khác
const ForgotPassword = () => <div>Forgot Password</div>;
const EmailVerifyPage = () => <div>Email Verify</div>;
const NotFound = () => <div>404 Not Found</div>;
const Forbidden = () => <div>403 Forbidden</div>;

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
        <Route path="/search" element={<Search />} />
        <Route path="/room/:id" element={<RoomDetail />} />
        
      </Route>

      {/* Các trang Profile, Lịch sử... bọc trong GuestLayout và chỉ yêu cầu Đã Đăng Nhập */}
      <Route element={<ProtectedRoute><GuestLayout /></ProtectedRoute>}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/history" element={<History />} />
        <Route path="/message" element={<Message />} /> 
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/booking-summary" element={<BookingSummary />} />
        <Route path="/booking-detail" element={<BookingDetail />} />
      </Route>

      {/* Đăng ký Host — 7 bước (Stitch), không cần đăng nhập để bắt đầu */}
      <Route path="/host/register" element={<HostOnboardingLayout />}>
        <Route index element={<Navigate to="/host/register/1" replace />} />
        <Route path=":step" element={<HostOnboardingPage />} />
      </Route>

      {/* Trang hứng link đổi mật khẩu từ Email trả về */}
      <Route path="/host/set-password" element={<HostSetPasswordPage />} />

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
        <Route path="/host/area" element={<HostArea />} />
        <Route path="/host/sleepbox/:areaId" element={<HostBoxManagement />} />
        <Route path="/host/pricing" element={<HostPricing />} />
        <Route path="/host/staff" element={<HostStaff />} />
        <Route path="/host/statistics" element={<HostStatistics />} />
        <Route path="/host/messages" element={<HostMessages />} />
        <Route path="/host/disputes" element={<HostDisputes />} />
        <Route path="/host/amenities" element={<HostAmenities />} />
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
        <Route path="/moderator" element={<Navigate to="/moderator/approvals" replace />} />
        <Route path="/moderator/host-approvals" element={<HostApproval />} />
        <Route path="/moderator/approvals" element={<FacilityApproval />} />
        <Route path="/moderator/disputes" element={<DisputeManagement />} />
        <Route path="/moderator/users" element={<UserManagement />} />
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
        <Route path="/admin/moderators/:id" element={<AdminModeratorEdit />} />
        <Route path="/admin/admins/new" element={<AdminAdminCreate />} />
        <Route path="/admin/pricing/addons" element={<AdminAddonServices />} />
        <Route path="/admin/pricing/box-limits" element={<AdminBoxTypePriceLimits />} />
        <Route path="/admin/pricing/platform-fee" element={<AdminPlatformFee />} />
        <Route path="/admin/pricing/system-rules" element={<AdminSystemPriceRules />} />
        <Route path="/admin/transactions" element={<AdminTransactions />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
      </Route>

      <Route path="/forbidden" element={<Forbidden />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default AppRouter;
