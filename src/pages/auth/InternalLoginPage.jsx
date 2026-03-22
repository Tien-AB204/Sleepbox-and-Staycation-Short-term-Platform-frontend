import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { login as loginService } from "../../services/authService";
import { useAuthContext } from "../../contexts/AuthContext";

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
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light font-display text-slate-900">
      <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-primary/10 bg-white/50 px-6 py-4 backdrop-blur-md md:px-10">
        <Link to="/" className="flex items-center gap-3">
          <div className="size-8 text-primary">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path
                d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <h2 className="text-xl font-extrabold leading-tight tracking-tight text-slate-900">BoxHub</h2>
        </Link>
        <div className="flex items-center gap-4">
          <span className="hidden text-sm font-semibold text-primary md:block">Hỗ trợ nội bộ</span>
          <button
            type="button"
            className="flex h-10 min-w-[100px] cursor-pointer items-center justify-center rounded-lg bg-primary px-4 text-sm font-bold leading-normal text-white shadow-md shadow-primary/20 transition-transform active:scale-95"
          >
            Help Center
          </button>
        </div>
      </header>

      <main className="relative flex flex-1 items-center justify-center overflow-hidden p-4 md:p-10">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-30">
          <div className="absolute right-[-5%] top-[-10%] h-[40%] w-[40%] rounded-full bg-primary/10 blur-[100px]" />
          <div className="absolute bottom-[-10%] left-[-5%] h-[40%] w-[40%] rounded-full bg-primary/5 blur-[100px]" />
        </div>

        <div className="w-full max-w-[480px] rounded-xl border border-primary/10 bg-white p-8 shadow-2xl shadow-primary/5 backdrop-blur-xl md:p-10">
          <div className="mb-8 flex flex-col gap-2">
            <h1 className="text-3xl font-black leading-tight tracking-tight text-slate-900">Đăng nhập BoxHub</h1>
            <p className="text-base font-medium text-slate-500">
              Khách, Host hoặc tài khoản nội bộ (Admin / Moderator / Staff)
            </p>
          </div>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
            )}

            <div className="flex flex-col gap-2">
              <label htmlFor="internal-email" className="text-sm font-bold leading-normal text-slate-700">
                Email
              </label>
              <input
                id="internal-email"
                className="h-14 w-full rounded-lg border border-primary/10 bg-slate-50 p-4 text-base text-slate-900 transition-all placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="name@company.com"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label htmlFor="internal-password" className="text-sm font-bold leading-normal text-slate-700">
                  Mật khẩu
                </label>
              </div>
              <div className="relative flex items-center">
                <input
                  id="internal-password"
                  className="h-14 w-full rounded-lg border border-primary/10 bg-slate-50 p-4 pr-12 text-base text-slate-900 transition-all placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Nhập mật khẩu"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-4 text-slate-400 transition-colors hover:text-primary"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  <span className="material-symbols-outlined text-[22px]">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between py-1">
              <label className="group flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  className="h-5 w-5 cursor-pointer rounded border-primary/20 text-primary focus:ring-2 focus:ring-primary/20 focus:ring-offset-0"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <span className="text-sm font-semibold text-slate-600 transition-colors group-hover:text-primary">
                  Ghi nhớ đăng nhập
                </span>
              </label>
              <Link className="text-sm font-bold text-primary underline-offset-4 hover:underline" to="/forgot-password">
                Quên mật khẩu?
              </Link>
            </div>

            <button
              className="h-14 w-full rounded-lg bg-primary text-base font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 active:scale-[0.98] disabled:opacity-60"
              type="submit"
              disabled={loading}
            >
              {loading ? "Đang đăng nhập..." : "Đăng nhập vào hệ thống"}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-primary/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 text-xs font-bold tracking-widest text-slate-400">Hoặc tiếp tục với</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className="flex h-12 items-center justify-center gap-3 rounded-lg border border-primary/10 bg-white transition-colors hover:bg-slate-50"
            >
              <img
                alt=""
                className="size-5"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiUM97cucBfaVCqBeZ1EOGibzdz0IHHXmzzc6iqecqctiKq2fRnCMALc0kNAsbPpG8IQG4NPGrn53Q3Y9iSefEK9ViqX4DQhu1E7Tpd8QrHtPZoqZ9p5NUNRcmKRTnIY55mRFQuHJ5QARQ0kGIYxMcScD_r68YFeQy_AzY3g7P6ORI1G78qa-nHKg_HB193UwvCapHgvNt-rEYWoD4SWi2wjuIZWoX7WAmrOxCemLMs1HjKLqllPPqxQCsJAqrdc2esBqH1po8QQsN"
              />
              <span className="text-sm font-bold text-slate-700">Google</span>
            </button>
            <button
              type="button"
              className="flex h-12 items-center justify-center gap-3 rounded-lg border border-primary/10 bg-white transition-colors hover:bg-slate-50"
            >
              <svg className="size-5 fill-[#0077b5]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span className="text-sm font-bold text-slate-700">LinkedIn</span>
            </button>
          </div>

          <div className="mt-8 space-y-2 text-center text-sm">
            <p className="font-medium text-slate-500">
              Chưa có tài khoản?{" "}
              <Link className="font-bold text-primary hover:underline" to="/register">
                Đăng ký
              </Link>
            </p>
            <p>
              <Link className="font-semibold text-slate-500 hover:text-primary hover:underline" to="/">
                Về trang chủ
              </Link>
            </p>
          </div>
        </div>
      </main>

      <footer className="flex flex-col items-center justify-between gap-4 border-t border-primary/5 bg-transparent px-6 py-8 md:flex-row">
        <p className="text-xs font-medium text-slate-400">© 2024 BoxHub Logistics Solutions Inc. All rights reserved.</p>
        <div className="flex gap-6">
          <a className="text-xs font-semibold text-slate-400 transition-colors hover:text-primary" href="#">
            Privacy Policy
          </a>
          <a className="text-xs font-semibold text-slate-400 transition-colors hover:text-primary" href="#">
            Terms of Service
          </a>
          <a className="text-xs font-semibold text-slate-400 transition-colors hover:text-primary" href="#">
            Contact Support
          </a>
        </div>
      </footer>
    </div>
  );
}
