import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginService, register as registerService } from "../../services/authService";
import { useAuthContext } from "../../contexts/AuthContext";

const AuthModal = ({ isOpen, onClose, initialMode = "login" }) => {
  const navigate = useNavigate();
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { login } = useAuthContext();

  useEffect(() => {
    setMode(initialMode);
    resetFormStates();
  }, [isOpen, initialMode]);

  const resetFormStates = () => {
    setError("");
    setSuccess("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    resetFormStates();
  };

  if (!isOpen) return null;

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // Gọi API đăng nhập
      const data = await loginService(email, password);
      
      // 1. Lấy đúng cấu trúc từ Swagger API của BE
      const userRole = data.role ? data.role.toLowerCase() : "guest";

      // LỚP BẢO VỆ: CHẶN TÀI KHOẢN NỘI BỘ (STAFF, MODERATOR, ADMIN)
      if (["admin", "moderator", "staff"].includes(userRole)) {
        setError("Tài khoản nội bộ không được đăng nhập tại đây.");
        setLoading(false);
        return; // Dừng chạy hàm ngay lập tức, không cấp thẻ lưu Context
      }
      
      // 2. Gom các thông tin cần thiết để lưu vào Context
      const loggedInUser = { 
        userId: data.userId,
        email: data.email, 
        role: userRole 
      };
      
      // 3. Đưa vào AuthContext (truyền đúng accessToken từ data)
      login(loggedInUser, data.accessToken); 
      onClose(); // Đóng Modal

      if (userRole === "host") {
        navigate("/host/dashboard");
      }
      
    } catch (err) {
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp!");
      setLoading(false);
      return;
    }
    try {
      await registerService({ email, password, confirmPassword });
      setSuccess("Đăng ký thành công! Đang chuyển sang đăng nhập...");
      setTimeout(() => {
        switchMode("login");
      }, 1500);
    } catch (err) {
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess("Liên kết đặt lại mật khẩu đã được gửi đến email của bạn!");
      setTimeout(() => {
        switchMode("login");
      }, 2500);
    } catch (err) {
      setError("Có lỗi xảy ra, vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  const renderGoogleButton = () => (
    <>
      <div className="relative flex items-center justify-center mt-6 mb-4">
        <hr className="w-full border-slate-200" />
        <span className="absolute bg-white px-3 text-xs font-bold text-slate-400 uppercase">
          Hoặc
        </span>
      </div>
      <button 
        type="button"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 border border-slate-300 rounded-full py-3 hover:bg-slate-50 transition cursor-pointer font-bold text-slate-700 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
        Tiếp tục với Google
      </button>
    </>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity px-4">
      <div className="relative w-full max-w-[400px] bg-white rounded-3xl shadow-2xl p-8 animate-fade-in-up">
        
        {/* Khóa luôn nút Tắt khi đang loading */}
        <button
          onClick={onClose}
          disabled={loading}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors outline-none disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <h2 className="text-2xl font-extrabold mb-6 text-center text-[#1e1b4b]">
          {mode === "login" && "Đăng nhập BoxHub"}
          {mode === "register" && "Đăng ký BoxHub"}
          {mode === "forgotPassword" && "Quên Mật Khẩu"}
        </h2>

        {/* ========================================= */}
        {/* FORM ĐĂNG NHẬP */}
        {/* ========================================= */}
        {mode === "login" && (
          <form className="space-y-4" onSubmit={handleLoginSubmit}>
            <div>
              <label className="block mb-2 text-sm font-extrabold text-[#1e1b4b]">Email</label>
              <input
                type="email"
                disabled={loading}
                placeholder="email@example.com"
                className="w-full bg-[#f0f4f8] border border-transparent rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#351a5b]/50 transition text-slate-700 font-medium disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-slate-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-extrabold text-[#1e1b4b]">Mật khẩu</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  disabled={loading}
                  placeholder="••••••••"
                  className="w-full bg-[#f0f4f8] border border-transparent rounded-full px-5 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-[#351a5b]/50 transition text-slate-700 font-medium disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-slate-200"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>

              <div className="flex justify-end mt-2 pr-1">
                <button type="button" disabled={loading} onClick={() => switchMode("forgotPassword")} className="text-xs font-bold text-[#351a5b] hover:underline disabled:opacity-50 disabled:cursor-not-allowed">
                  Quên mật khẩu?
                </button>
              </div>
            </div>
            
            {error && <div className="text-red-500 text-sm font-medium bg-red-50 p-3 rounded-lg text-center">{error}</div>}
            
            <button
              type="submit"
              className="w-full bg-[#2d1b4e] text-white py-3 rounded-full font-bold hover:bg-[#1a0f2e] transition shadow-md mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Đang xử lý..." : "Đăng nhập"}
            </button>

            {renderGoogleButton()}

            <div className="mt-6 text-sm text-center font-medium">
              <span className="text-slate-500">Chưa có tài khoản? </span>
              <button type="button" disabled={loading} onClick={() => switchMode("register")} className="text-[#351a5b] font-extrabold hover:underline disabled:opacity-50 disabled:cursor-not-allowed">
                Đăng ký ngay
              </button>
            </div>
          </form>
        )}

        {/* ========================================= */}
        {/* FORM ĐĂNG KÝ */}
        {/* ========================================= */}
        {mode === "register" && (
          <form className="space-y-4" onSubmit={handleRegisterSubmit}>
            <div>
              <label className="block mb-2 text-sm font-extrabold text-[#1e1b4b]">Email</label>
              <input
                type="email"
                disabled={loading}
                placeholder="email@example.com"
                className="w-full bg-[#f0f4f8] border border-transparent rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#351a5b]/50 transition text-slate-700 font-medium disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-slate-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-extrabold text-[#1e1b4b]">Mật khẩu</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  disabled={loading}
                  placeholder="••••••••"
                  className="w-full bg-[#f0f4f8] border border-transparent rounded-full px-5 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-[#351a5b]/50 transition text-slate-700 font-medium disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-slate-200"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>
            <div>
              <label className="block mb-2 text-sm font-extrabold text-[#1e1b4b]">Xác nhận mật khẩu</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  disabled={loading}
                  placeholder="••••••••"
                  className="w-full bg-[#f0f4f8] border border-transparent rounded-full px-5 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-[#351a5b]/50 transition text-slate-700 font-medium disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-slate-200"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showConfirmPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            {error && <div className="text-red-500 text-sm font-medium bg-red-50 p-3 rounded-lg text-center">{error}</div>}
            {success && <div className="text-green-600 text-sm font-medium bg-green-50 p-3 rounded-lg text-center">{success}</div>}
            
            <button
              type="submit"
              className="w-full bg-[#2d1b4e] text-white py-3 rounded-full font-bold hover:bg-[#1a0f2e] transition shadow-md mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Đang xử lý..." : "Đăng ký"}
            </button>

            {renderGoogleButton()}

            <div className="mt-6 text-sm text-center font-medium">
              <span className="text-slate-500">Đã có tài khoản? </span>
              <button type="button" disabled={loading} onClick={() => switchMode("login")} className="text-[#351a5b] font-extrabold hover:underline disabled:opacity-50 disabled:cursor-not-allowed">
                Đăng nhập
              </button>
            </div>
          </form>
        )}

        {/* ========================================= */}
        {/* FORM QUÊN MẬT KHẨU */}
        {/* ========================================= */}
        {mode === "forgotPassword" && (
          <form className="space-y-4" onSubmit={handleForgotSubmit}>
            <p className="text-sm text-slate-500 text-center mb-6">
              Nhập email của bạn và chúng tôi sẽ gửi cho bạn liên kết để đặt lại mật khẩu.
            </p>
            <div>
              <label className="block mb-2 text-sm font-extrabold text-[#1e1b4b]">Email</label>
              <input
                type="email"
                disabled={loading}
                placeholder="email@example.com"
                className="w-full bg-[#f0f4f8] border border-transparent rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#351a5b]/50 transition text-slate-700 font-medium disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-slate-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            {error && <div className="text-red-500 text-sm font-medium bg-red-50 p-3 rounded-lg text-center">{error}</div>}
            {success && <div className="text-green-600 text-sm font-medium bg-green-50 p-3 rounded-lg text-center">{success}</div>}
            
            <button
              type="submit"
              className="w-full bg-[#2d1b4e] text-white py-3 rounded-full font-bold hover:bg-[#1a0f2e] transition shadow-md mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Đang xử lý..." : "Gửi liên kết xác nhận"}
            </button>

            <div className="mt-6 text-sm text-center font-medium">
              <button type="button" disabled={loading} onClick={() => switchMode("login")} className="text-[#351a5b] font-extrabold flex items-center justify-center gap-1 mx-auto hover:underline disabled:opacity-50 disabled:cursor-not-allowed">
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                Quay lại đăng nhập
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};

export default AuthModal;