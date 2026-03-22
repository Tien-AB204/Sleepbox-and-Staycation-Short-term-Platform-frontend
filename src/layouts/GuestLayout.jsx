import React, { useState, useRef, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

// IMPORT HÌNH ẢNH
import boxHubLogo from "../assets/images/logo.png";
import boxHubText from "../assets/images/BOXHUB.png";
import flagVN from "../assets/images/vietnamFlag.png";
import flagEN from "../assets/images/englishFlag.png";

import AuthModal from "../pages/auth/AuthModal";

const GuestLayout = () => {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [lang, setLang] = useState("vi");
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Xử lý click ra ngoài để đóng dropdown
  const langRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langRef.current && !langRef.current.contains(event.target))
        setIsLangOpen(false);
      if (profileRef.current && !profileRef.current.contains(event.target))
        setIsProfileOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col bg-white text-slate-900 font-sans">
      {/* HEADER CAO CẤP */}
      <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 shadow-sm flex justify-center">
        <div className="w-full max-w-[1200px] px-4 lg:px-0 h-16 flex items-center justify-between">
          
          <Link to="/" className="flex items-center hover:opacity-90 transition-opacity">
            <img
              src={boxHubLogo}
              alt="Logo"
              className="h-10 w-auto object-contain relative z-10 shrink-0"
            />
            <img
              src={boxHubText}
              alt="BOXHUB"
              className="h-10 w-auto object-contain scale-[2.5] origin-left -ml-5"
            />
          </Link>
          {/* ========================================================== */}

          {/* CỤM PHẢI: ICONS VÀ CHỨC NĂNG */}
          <div className="flex items-center gap-1 md:gap-3">
            {/* App (Smartphone) */}
            <button className="w-10 h-10 hover:bg-slate-100 rounded-full transition text-[#4059AD] flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px] leading-none">
                smartphone
              </span>
            </button>

            {/* Ngôn ngữ (Cờ hình tròn) */}
            <div
              className="relative flex items-center justify-center"
              ref={langRef}
            >
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="w-10 h-10 hover:bg-slate-100 rounded-full transition flex items-center justify-center outline-none"
              >
                <img
                  src={lang === "vi" ? flagVN : flagEN}
                  alt="lang"
                  className="w-6 h-6 rounded-full object-cover border border-slate-200 shadow-sm"
                />
              </button>
              {isLangOpen && (
                <div className="absolute top-full right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden z-50 py-2">
                  <button
                    onClick={() => {
                      setLang("vi");
                      setIsLangOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-50 transition"
                  >
                    <img
                      src={flagVN}
                      className="w-5 h-5 rounded-full object-cover"
                      alt="VN"
                    />{" "}
                    <span className="text-sm font-medium text-slate-700">
                      Tiếng Việt
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      setLang("en");
                      setIsLangOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-50 transition"
                  >
                    <img
                      src={flagEN}
                      className="w-5 h-5 rounded-full object-cover"
                      alt="EN"
                    />{" "}
                    <span className="text-sm font-medium text-slate-700">
                      English
                    </span>
                  </button>
                </div>
              )}
            </div>

            {/* Trợ giúp */}
            <button className="w-10 h-10 hover:bg-slate-100 rounded-full transition text-[#4059AD] flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px] leading-none">
                help
              </span>
            </button>

            {/* Thông báo */}
            {user && (
              <Link to="/notifications" className="w-10 h-10 hover:bg-slate-100 rounded-full transition text-[#4059AD] relative flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px] leading-none">
                  notifications
                </span>
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#FA744D] rounded-full border-2 border-white"></span>
              </Link>
            )}

            {/* Trở thành Host (Nút text) */}
            <Link
              to="/host/dashboard"
              className="hidden md:flex font-bold text-sm text-[#4059AD] hover:bg-slate-50 px-4 py-2 rounded-full transition ml-1"
            >
              Trở thành host
            </Link>

            {/* Tài khoản / Đăng nhập */}
            {user ? (
              <div className="relative ml-1 flex items-center" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="w-10 h-10 hover:bg-slate-100 rounded-full transition flex items-center justify-center outline-none border border-transparent hover:border-slate-200"
                >
                  <span className="material-symbols-outlined text-[28px] leading-none text-[#4059AD]">
                    account_circle
                  </span>
                </button>

                {/* Dropdown User */}
                {isProfileOpen && (
                  <div className="absolute top-full right-0 mt-2 w-60 bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-slate-100 overflow-hidden z-50 py-2">
                    <div className="px-4 py-3 border-b border-slate-100 mb-1">
                      <p className="text-sm font-bold text-slate-800 line-clamp-1">
                        {user.fullName || "Người dùng"}
                      </p>
                      <p className="text-xs text-slate-500 line-clamp-1">
                        {user.email}
                      </p>
                    </div>
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition text-slate-700 text-sm font-medium"
                    >
                      <span className="material-symbols-outlined text-[20px] text-slate-400">
                        person
                      </span>{" "}
                      Hồ sơ
                    </Link>
                    <Link
                      to="/my-bookings"
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition text-slate-700 text-sm font-medium"
                    >
                      <span className="material-symbols-outlined text-[20px] text-slate-400">
                        luggage
                      </span>{" "}
                      Đặt chỗ của tôi
                    </Link>
                    <Link
                      to="/history"
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition text-slate-700 text-sm font-medium"
                    >
                      <span className="material-symbols-outlined text-[20px] text-slate-400">
                        history
                      </span>{" "}
                      Lịch sử
                    </Link>
                    <Link
                      to="/favorites"
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition text-slate-700 text-sm font-medium"
                    >
                      <span className="material-symbols-outlined text-[20px] text-slate-400">
                        favorite
                      </span>{" "}
                      Yêu thích
                    </Link>
                    <Link
                      to="/message"
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition text-slate-700 text-sm font-medium"
                    >
                      <span className="material-symbols-outlined text-[20px] text-slate-400">
                        chat
                      </span>{" "}
                      Tin nhắn
                    </Link>
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition text-slate-700 text-sm font-medium"
                    >
                      <span className="material-symbols-outlined text-[20px] text-slate-400">
                        settings
                      </span>{" "}
                      Cài đặt
                    </Link>
                    <div className="border-t border-slate-100 mt-1 pt-1">
                      <button 
                        onClick={() => { 
                          setIsProfileOpen(false); // Đóng menu
                          navigate("/"); // 1. Chạy về Home trước
                          setTimeout(() => {
                            logout(); // 2. Đợi về Home xong mới xóa thẻ căn cước
                          }, 100);
                        }} 
                        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 transition text-red-600 text-sm font-bold"
                      >
                        <span className="material-symbols-outlined text-[20px] leading-none">logout</span> Đăng xuất
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 ml-2">
                <button
                  onClick={() => {
                    setAuthMode("login");
                    setIsAuthModalOpen(true);
                  }}
                  className="text-sm font-bold text-[#4059AD] hover:bg-slate-50 px-4 py-2 rounded-full transition"
                >
                  Đăng nhập
                </button>
                <button
                  onClick={() => {
                    setAuthMode("register");
                    setIsAuthModalOpen(true);
                  }}
                  className="text-sm font-bold bg-[#4059AD] text-white px-5 py-2 rounded-full hover:bg-[#32488f] transition shadow-sm"
                >
                  Đăng ký
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* NỘI DUNG CHÍNH */}
      <main className="flex-1 w-full bg-slate-50/50">
        <Outlet />
      </main>

      {/* FOOTER ĐÃ ĐƯỢC PHỤC HỒI */}
      <footer className="bg-white border-t border-slate-200 flex justify-center py-16">
        <div className="w-full max-w-[1200px] px-4 lg:px-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="font-bold mb-4 text-slate-800">Hỗ trợ</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <a className="hover:underline hover:text-[#4059AD] transition-colors" href="#">Trung tâm trợ giúp</a>
                </li>
                <li>
                  <a className="hover:underline hover:text-[#4059AD] transition-colors" href="#">AirCover</a>
                </li>
                <li>
                  <a className="hover:underline hover:text-[#4059AD] transition-colors" href="#">Chống phân biệt đối xử</a>
                </li>
                <li>
                  <a className="hover:underline hover:text-[#4059AD] transition-colors" href="#">Hỗ trợ người khuyết tật</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-slate-800">Đón tiếp khách</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <a className="hover:underline hover:text-[#4059AD] transition-colors" href="#">Cho thuê BoxHub</a>
                </li>
                <li>
                  <a className="hover:underline hover:text-[#4059AD] transition-colors" href="#">AirCover cho Chủ nhà</a>
                </li>
                <li>
                  <a className="hover:underline hover:text-[#4059AD] transition-colors" href="#">Tài nguyên về đón tiếp khách</a>
                </li>
                <li>
                  <a className="hover:underline hover:text-[#4059AD] transition-colors" href="#">Diễn đàn cộng đồng</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-slate-800">BoxHub</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <a className="hover:underline hover:text-[#4059AD] transition-colors" href="#">Trang tin tức</a>
                </li>
                <li>
                  <a className="hover:underline hover:text-[#4059AD] transition-colors" href="#">Tìm hiểu các tính năng mới</a>
                </li>
                <li>
                  <a className="hover:underline hover:text-[#4059AD] transition-colors" href="#">Cơ hội nghề nghiệp</a>
                </li>
                <li>
                  <a className="hover:underline hover:text-[#4059AD] transition-colors" href="#">Nhà đầu tư</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-slate-800">Theo dõi chúng tôi</h4>
              <div className="flex gap-4">
                <span className="material-symbols-outlined cursor-pointer text-slate-500 hover:text-[#4059AD] transition-colors">social_leaderboard</span>
                <span className="material-symbols-outlined cursor-pointer text-slate-500 hover:text-[#4059AD] transition-colors">share</span>
                <span className="material-symbols-outlined cursor-pointer text-slate-500 hover:text-[#4059AD] transition-colors">alternate_email</span>
              </div>
              <div className="mt-6">
                <button className="flex items-center gap-2 text-sm font-bold border border-slate-300 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50 hover:border-[#4059AD] hover:text-[#4059AD] transition-colors">
                  <span className="material-symbols-outlined text-sm leading-none">language</span> Tiếng Việt (VN)
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>© 2026 BoxHub, Inc. · Quyền riêng tư · Điều khoản · Sơ đồ trang web</p>
            <div className="flex gap-4 font-bold">
              <a className="hover:underline hover:text-[#4059AD] transition-colors" href="#">Hồ Chí Minh</a>
            </div>
          </div>
        </div>
      </footer>

      {/* MODAL */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />
    </div>
  );
};

export default GuestLayout;