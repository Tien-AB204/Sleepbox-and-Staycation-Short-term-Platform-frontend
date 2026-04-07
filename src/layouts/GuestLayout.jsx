import React, { useState, useRef, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

// IMPORT HÌNH ẢNH
import boxHubLogo from "../assets/images/BOXHUB.png";
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
              alt="BoxHub"
              className="h-8 md:h-9 w-auto object-contain"
            />
          </Link>
          {/* ========================================================== */}

          {/* CỤM PHẢI: ICONS VÀ CHỨC NĂNG */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* App (Smartphone) */}
            <button className="flex h-10 w-10 items-center justify-center rounded-full text-[#1A1130] transition hover:bg-slate-100">
              <span className="material-symbols-outlined text-[22px] leading-none">
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
                className="flex h-10 w-10 items-center justify-center rounded-full outline-none transition hover:bg-slate-100"
              >
                <img
                  src={lang === "vi" ? flagVN : flagEN}
                  alt="lang"
                  className="h-[22px] w-[22px] rounded-full object-cover shadow-sm"
                />
              </button>
              {isLangOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-40 overflow-hidden rounded-xl border border-slate-100 bg-white py-2 shadow-lg">
                  <button
                    onClick={() => {
                      setLang("vi");
                      setIsLangOpen(false);
                    }}
                    className="flex w-full items-center gap-3 px-4 py-2 transition hover:bg-slate-50"
                  >
                    <img
                      src={flagVN}
                      className="h-5 w-5 rounded-full object-cover"
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
                    className="flex w-full items-center gap-3 px-4 py-2 transition hover:bg-slate-50"
                  >
                    <img
                      src={flagEN}
                      className="h-5 w-5 rounded-full object-cover"
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
            <button className="flex h-10 w-10 items-center justify-center rounded-full text-[#1A1130] transition hover:bg-slate-100">
              <span className="material-symbols-outlined text-[22px] leading-none">
                help
              </span>
            </button>

            {/* Thông báo */}
            {user && (
              <Link to="/notifications" className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#1A1130] transition hover:bg-slate-100">
                <span className="material-symbols-outlined text-[22px] leading-none">
                  notifications
                </span>
                <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full border-2 border-white bg-[#FA744D]"></span>
              </Link>
            )}

            {/* Trở thành Host (Nút text) */}
            <Link
              to="/host/register/1"
              className="ml-1 hidden rounded-full px-4 py-2 text-[15px] font-bold text-[#352166] transition hover:bg-slate-50 md:flex"
            >
              Trở thành host
            </Link>

            {/* Tài khoản / Đăng nhập */}
            {user ? (
              <div className="relative ml-1 flex items-center" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-transparent outline-none transition hover:border-slate-200 hover:bg-slate-100"
                >
                  <span className="material-symbols-outlined text-[26px] leading-none text-[#1A1130]">
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
              <div className="ml-2 flex items-center gap-2">
                <button
                  onClick={() => {
                    setAuthMode("login");
                    setIsAuthModalOpen(true);
                  }}
                  className="rounded-full px-4 py-2 text-[15px] font-bold text-[#352166] transition hover:bg-slate-50"
                >
                  Đăng nhập
                </button>
                <button
                  onClick={() => {
                    setAuthMode("register");
                    setIsAuthModalOpen(true);
                  }}
                  className="rounded-full bg-[#352166] px-5 py-2.5 text-[15px] font-bold text-white shadow-sm transition hover:bg-[#2A1A52]"
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
                  <a className="hover:underline hover:text-[#352166] transition-colors" href="#">Trung tâm trợ giúp</a>
                </li>
                <li>
                  <a className="hover:underline hover:text-[#352166] transition-colors" href="#">AirCover</a>
                </li>
                <li>
                  <a className="hover:underline hover:text-[#352166] transition-colors" href="#">Chống phân biệt đối xử</a>
                </li>
                <li>
                  <a className="hover:underline hover:text-[#352166] transition-colors" href="#">Hỗ trợ người khuyết tật</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-slate-800">Đón tiếp khách</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <a className="hover:underline hover:text-[#352166] transition-colors" href="#">Cho thuê BoxHub</a>
                </li>
                <li>
                  <a className="hover:underline hover:text-[#352166] transition-colors" href="#">AirCover cho Chủ nhà</a>
                </li>
                <li>
                  <a className="hover:underline hover:text-[#352166] transition-colors" href="#">Tài nguyên về đón tiếp khách</a>
                </li>
                <li>
                  <a className="hover:underline hover:text-[#352166] transition-colors" href="#">Diễn đàn cộng đồng</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-slate-800">BoxHub</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <a className="hover:underline hover:text-[#352166] transition-colors" href="#">Trang tin tức</a>
                </li>
                <li>
                  <a className="hover:underline hover:text-[#352166] transition-colors" href="#">Tìm hiểu các tính năng mới</a>
                </li>
                <li>
                  <a className="hover:underline hover:text-[#352166] transition-colors" href="#">Cơ hội nghề nghiệp</a>
                </li>
                <li>
                  <a className="hover:underline hover:text-[#352166] transition-colors" href="#">Nhà đầu tư</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-slate-800">Theo dõi chúng tôi</h4>
              <div className="flex gap-4">
                <span className="material-symbols-outlined cursor-pointer text-slate-500 hover:text-[#352166] transition-colors">social_leaderboard</span>
                <span className="material-symbols-outlined cursor-pointer text-slate-500 hover:text-[#352166] transition-colors">share</span>
                <span className="material-symbols-outlined cursor-pointer text-slate-500 hover:text-[#352166] transition-colors">alternate_email</span>
              </div>
              <div className="mt-6">
                <button className="flex items-center gap-2 text-sm font-bold border border-slate-300 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50 hover:border-[#352166] hover:text-[#352166] transition-colors">
                  <span className="material-symbols-outlined text-sm leading-none">language</span> Tiếng Việt (VN)
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>© 2026 BoxHub, Inc. · Quyền riêng tư · Điều khoản · Sơ đồ trang web</p>
            <div className="flex gap-4 font-bold">
              <a className="hover:underline hover:text-[#352166] transition-colors" href="#">Hồ Chí Minh</a>
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