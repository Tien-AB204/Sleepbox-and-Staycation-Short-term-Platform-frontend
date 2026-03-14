import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { mockHostLogin } from "../../services/mockAuthApi";

const HostLoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { accessToken, user } = await mockHostLogin(email, password);
      login({ ...user, role: "host" }, accessToken);
      navigate("/host/dashboard", { replace: true });
    } catch (err) {
      setError(err?.message || "Đăng nhập thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f7f6f8] text-slate-900 font-sans">
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#351a5b]/10 px-6 md:px-10 py-4 bg-white/50 backdrop-blur-md sticky top-0 z-50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 text-[#351a5b]">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z" fill="currentColor" />
              </svg>
            </div>
            <h2 className="text-slate-900 text-xl font-extrabold leading-tight tracking-tight">BoxHub</h2>
          </div>
          <div className="flex items-center gap-4">
            <a className="hidden md:block text-sm font-semibold text-[#351a5b] hover:text-[#351a5b]/80 transition-colors" href="#">
              Support
            </a>
            <button type="button" className="flex min-w-[100px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-[#351a5b] text-white text-sm font-bold leading-normal transition-transform active:scale-95 shadow-md shadow-[#351a5b]/20">
              Help Center
            </button>
          </div>
        </header>

        <main className="flex flex-1 items-center justify-center p-4 md:p-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-30 pointer-events-none">
            <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-[#351a5b]/10 blur-[100px]" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-[#351a5b]/5 blur-[100px]" />
          </div>
          <div className="w-full max-w-[480px] bg-white backdrop-blur-xl border border-[#351a5b]/10 rounded-xl p-8 md:p-10 shadow-2xl shadow-[#351a5b]/5">
            <div className="flex flex-col gap-2 mb-8">
              <h1 className="text-slate-900 text-3xl font-black leading-tight tracking-tight">Host Login</h1>
              <p className="text-slate-500 text-base font-medium">Access your warehouse management dashboard</p>
            </div>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                <label className="text-slate-700 text-sm font-bold leading-normal">Business Email</label>
                <input
                  className="w-full rounded-lg text-slate-900 border-[#351a5b]/10 bg-slate-50 focus:border-[#351a5b] focus:ring-2 focus:ring-[#351a5b]/20 h-14 placeholder:text-slate-400 p-4 text-base transition-all border"
                  placeholder="name@company.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label className="text-slate-700 text-sm font-bold leading-normal">Password</label>
                </div>
                <div className="relative flex items-center">
                  <input
                    className="w-full rounded-lg text-slate-900 border-[#351a5b]/10 bg-slate-50 focus:border-[#351a5b] focus:ring-2 focus:ring-[#351a5b]/20 h-14 placeholder:text-slate-400 p-4 pr-12 text-base transition-all border"
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-4 text-slate-400 hover:text-[#351a5b] transition-colors"
                    onClick={() => setShowPassword((v) => !v)}
                  >
                    <span className="material-symbols-outlined text-[22px]">visibility</span>
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between py-1">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    className="h-5 w-5 rounded border-[#351a5b]/20 bg-transparent text-[#351a5b] checked:bg-[#351a5b] checked:border-[#351a5b] focus:ring-0 focus:ring-offset-0 transition-all cursor-pointer"
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  <span className="text-slate-600 text-sm font-semibold group-hover:text-[#351a5b] transition-colors">Remember Me</span>
                </label>
                <a className="text-sm font-bold text-[#351a5b] hover:underline underline-offset-4" href="#">
                  Forgot Password?
                </a>
              </div>
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <button
                type="submit"
                className="w-full bg-[#351a5b] text-white rounded-lg h-14 text-base font-bold shadow-lg shadow-[#351a5b]/20 hover:bg-[#351a5b]/90 transition-all active:scale-[0.98] disabled:opacity-70"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In to Dashboard"}
              </button>
            </form>
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#351a5b]/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-4 text-slate-400 font-bold tracking-widest">Or continue with</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button type="button" className="flex items-center justify-center gap-3 h-12 rounded-lg border border-[#351a5b]/10 bg-white hover:bg-slate-50 transition-colors">
                <img alt="" className="w-5 h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiUM97cucBfaVCqBeZ1EOGibzdz0IHHXmzzc6iqecqctiKq2fRnCMALc0kNAsbPpG8IQG4NPGrn53Q3Y9iSefEK9ViqX4DQhu1E7Tpd8QrHtPZoqZ9p5NUNRcmKRTnIY55mRFQuHJ5QARQ0kGIYxMcScD_r68YFeQy_AzY3g7P6ORI1G78qa-nHKg_HB193UwvCapHgvNt-rEYWoD4SWi2wjuIZWoX7WAmrOxCemLMs1HjKLqllPPqxQCsJAqrdc2esBqH1po8QQsN" referrerPolicy="no-referrer" />
                <span className="text-sm font-bold text-slate-700">Google</span>
              </button>
              <button type="button" className="flex items-center justify-center gap-3 h-12 rounded-lg border border-[#351a5b]/10 bg-white hover:bg-slate-50 transition-colors">
                <svg className="w-5 h-5 fill-[#0077b5]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span className="text-sm font-bold text-slate-700">LinkedIn</span>
              </button>
            </div>
            <div className="mt-8 text-center">
              <p className="text-slate-500 text-sm font-medium">
                Don&apos;t have a host account?{" "}
                <Link className="text-[#351a5b] font-bold hover:underline underline-offset-4 ml-1" to="/host/register">
                  Register your space
                </Link>
              </p>
            </div>
          </div>
        </main>

        <footer className="px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4 bg-transparent border-t border-[#351a5b]/5">
          <p className="text-slate-400 text-xs font-medium">© 2024 BoxHub Logistics Solutions Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a className="text-slate-400 hover:text-[#351a5b] text-xs font-semibold transition-colors" href="#">Privacy Policy</a>
            <a className="text-slate-400 hover:text-[#351a5b] text-xs font-semibold transition-colors" href="#">Terms of Service</a>
            <a className="text-slate-400 hover:text-[#351a5b] text-xs font-semibold transition-colors" href="#">Contact Support</a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HostLoginPage;
