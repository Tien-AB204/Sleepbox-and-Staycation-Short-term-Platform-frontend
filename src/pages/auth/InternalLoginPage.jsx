import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { login as loginService } from "../../services/authService";
import { useAuthContext } from "../../contexts/AuthContext";
import boxhubLogo from "../../assets/images/logo.png";

/** Sau đăng nhập — mọi role (guest / host / nội bộ) */
const ROLE_HOME = {
  guest: "/",
  host: "/host/dashboard",
  staff: "/staff/dashboard",
  moderator: "/moderator/user-management",
  admin: "/admin/dashboard",
};

/** Chỉ cho phép redirect nội bộ (tránh open redirect). */
function safeRedirectPath(pathname) {
  if (typeof pathname !== "string" || !pathname.startsWith("/") || pathname.startsWith("//")) {
    return null;
  }
  return pathname;
}

export default function InternalLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuthContext();

  /** Trang user muốn vào trước khi bị đẩy sang đăng nhập (vd: /host/dashboard) */
  const intendedPath = safeRedirectPath(location.state?.from?.pathname);

  useEffect(() => {
    const saved = localStorage.getItem("internalLoginRemember");
    if (saved) {
      setEmail(saved);
      setRemember(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await loginService(email, password);
      const userRole = (data.role || "guest").toLowerCase();

      const loggedInUser = {
        userId: data.userId,
        email: data.email || email,
        role: userRole,
      };

      login(loggedInUser, data.accessToken);

      if (remember) {
        try {
          localStorage.setItem("internalLoginRemember", email);
        } catch {
          /* ignore */
        }
      } else {
        localStorage.removeItem("internalLoginRemember");
      }

      const defaultHome = ROLE_HOME[userRole] ?? "/";
      const target = intendedPath ?? defaultHome;
      navigate(target, { replace: true });
    } catch (err) {
      setError(typeof err === "string" ? err : err?.toString?.() || "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-white font-sans text-slate-900">
      {/* Left / Info Panel (Hidden on very small screens, visible on md+) */}
      <div className="relative hidden w-[45%] flex-col justify-between bg-[#F4F7F9] p-10 md:flex lg:p-16">
        {/* Abstract background graphics to mimic the clean desk/monitor vibe */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-[20%] left-[50%] h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-white/60 blur-[60px]" />
          <div className="absolute top-[45%] left-[50%] h-[150px] w-[400px] -translate-x-1/2 rounded-t-3xl bg-slate-200/50" />
          <div className="absolute top-[60%] left-[30%] h-[10px] w-[80%] rounded-full bg-white" />
        </div>

        {/* Top Logo */}
        <div className="relative z-10">
          <Link to="/">
            <img src={boxhubLogo} alt="BoxHub" className="h-8 object-contain" />
          </Link>
        </div>

        {/* Middle Content */}
        <div className="relative z-10 max-w-md">
          <div className="mb-6 h-1 w-8 bg-[#352166]" />
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-[#1A1130] lg:text-4xl lg:leading-[1.15]">
            Nền tảng quản trị hậu cần thông minh thế hệ mới
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
            Tối ưu hóa quy trình vận hành với hệ thống phân tích dữ liệu thời gian thực và quản lý tập trung.
          </p>
        </div>

        {/* Bottom Stats */}
        <div className="relative z-10 flex gap-12">
          <div>
            <div className="text-xl font-bold text-[#1A1130]">99.9%</div>
            <div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">Uptime Reliable</div>
          </div>
          <div>
            <div className="text-xl font-bold text-[#1A1130]">AES-256</div>
            <div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">Data Encryption</div>
          </div>
        </div>
      </div>

      {/* Right / Form Area */}
      <div className="relative flex w-full flex-col p-6 md:w-[55%] lg:p-12 xl:px-24 xl:py-12">
        {/* Top Right Help Link */}
        <div className="absolute right-6 top-6 lg:right-12 lg:top-8">
          <a href="#" className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition-colors hover:text-[#352166]">
            <span className="material-symbols-outlined text-[16px]">help</span>
            Trung tâm hỗ trợ
          </a>
        </div>

        {/* Mobile Logo (only shows when left panel is hidden) */}
        <div className="mb-12 mt-4 md:hidden">
          <Link to="/">
            <img src={boxhubLogo} alt="BoxHub" className="h-8 object-contain" />
          </Link>
        </div>

        <div className="flex flex-1 flex-col justify-center">
          <div className="mx-auto w-full max-w-[400px]">
            {/* Header */}
            <div className="mb-10 text-center sm:text-left">
              <h2 className="text-3xl font-extrabold tracking-tight text-[#1A1130]">Hệ thống Quản trị</h2>
              <p className="mt-3 text-[14px] leading-relaxed text-slate-500">
                Chào mừng quay trở lại. Vui lòng đăng nhập để tiếp tục quản lý vận hành.
              </p>
            </div>

            {/* Form */}
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-800">
                  {error}
                </div>
              )}

              <div className="flex flex-col gap-2">
                <label htmlFor="internal-email" className="text-[11px] font-bold uppercase tracking-wider text-[#4A3B69]">
                  Địa chỉ Email
                </label>
                <input
                  id="internal-email"
                  className="h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-[#352166] focus:ring-1 focus:ring-[#352166]"
                  placeholder="name@boxhub.logistics"
                  type="email"
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="internal-password" className="text-[11px] font-bold uppercase tracking-wider text-[#4A3B69]">
                    Mật khẩu
                  </label>
                  <Link className="text-[11px] font-bold uppercase tracking-wider text-slate-400 transition-colors hover:text-[#352166]" to="/forgot-password">
                    Quên mật khẩu?
                  </Link>
                </div>
                <div className="relative flex items-center">
                  <input
                    id="internal-password"
                    className="h-12 w-full rounded-lg border border-slate-200 bg-white py-4 pl-4 pr-12 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-[#352166] focus:ring-1 focus:ring-[#352166]"
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 flex size-8 items-center justify-center rounded text-slate-400 transition-colors hover:bg-slate-50 hover:text-[#352166]"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>

              <div className="mt-1 flex items-center">
                <label className="group flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    className="size-4 cursor-pointer rounded border-slate-300 text-[#352166] transition-colors focus:ring-1 focus:ring-[#352166] focus:ring-offset-0"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  <span className="text-[13px] font-medium text-slate-600 transition-colors group-hover:text-[#1A1130]">
                    Duy trì đăng nhập cho phiên này
                  </span>
                </label>
              </div>

              <button
                className="mt-2 h-12 w-full rounded-lg bg-[#352166] text-[14px] font-bold text-white shadow-md shadow-[#352166]/20 transition-all hover:bg-[#2A1A52] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60"
                type="submit"
                disabled={loading}
              >
                {loading ? "Đang xử lý..." : "Đăng nhập vào hệ thống"}
              </button>

              {/* Security badge under button */}
              <div className="mt-6 flex items-center justify-between rounded-lg border border-emerald-100 bg-emerald-50/50 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-emerald-600">verified_user</span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">Môi trường bảo mật tối cao</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">BoxHub Security</span>
              </div>
            </form>
          </div>
        </div>

        {/* Right Footer */}
        <div className="mt-auto pt-10 text-center sm:text-left">
          <div className="mx-auto max-w-[400px]">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Bảo mật bởi BoxHub Security
            </p>
            <div className="flex flex-wrap justify-center gap-6 sm:justify-start">
              <a href="#" className="text-[11px] font-bold uppercase tracking-wider text-slate-500 transition-colors hover:text-[#352166]">Chính sách</a>
              <a href="#" className="text-[11px] font-bold uppercase tracking-wider text-slate-500 transition-colors hover:text-[#352166]">Hỗ trợ kỹ thuật</a>
              <a href="#" className="text-[11px] font-bold uppercase tracking-wider text-slate-500 transition-colors hover:text-[#352166]">Tiêu chuẩn</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}