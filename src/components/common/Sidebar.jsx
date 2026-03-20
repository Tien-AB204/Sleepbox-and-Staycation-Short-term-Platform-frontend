import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

import boxHubLogo from "../../assets/images/logo.png";
import flagVN from "../../assets/images/vietnamFlag.png";
import flagEN from "../../assets/images/englishFlag.png";

const Sidebar = ({ openLogin, openRegister }) => {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  const [lang, setLang] = useState("vi");
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const menuItems = [
    { id: "bookings", label: "Đặt chỗ", icon: "luggage", to: "/my-bookings" },
    {
      id: "notifications",
      label: "Thông báo",
      icon: "notifications",
      to: "/notifications",
      badge: 3,
    },
    { id: "messages", label: "Tin nhắn", icon: "chat", to: "/chat" },
    { id: "favorites", label: "Yêu thích", icon: "favorite", to: "/favorites" },
  ];

  return (
    <aside
      onMouseLeave={() => setIsLangMenuOpen(false)}
      className="fixed top-0 left-0 z-50 h-screen bg-[#351a5b] text-white flex flex-col 
                 w-20 hover:w-48 transition-all duration-300 ease-in-out shadow-2xl overflow-hidden group border-r border-white/5 px-0"
    >
      {/* 1. PHẦN LOGO */}
      <Link
        to="/"
        className="flex flex-col items-center justify-center h-20 w-full shrink-0 border-b border-white/5 py-4"
      >
        <img
          src={boxHubLogo}
          alt="BoxHub"
          className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-90"
        />
        <span
          className="text-[10px] font-extrabold uppercase tracking-widest text-white/70 
                         h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 group-hover:mt-1 
                         transition-all duration-300 delay-100 whitespace-nowrap"
        >
          boxhub
        </span>
      </Link>

      {/* 2. PHẦN MENU ĐIỀU HƯỚNG */}
      <nav className="flex-1 w-full py-6 space-y-2 px-0 relative">
        {menuItems.map((item) => (
          <Link
            key={item.id}
            to={item.to}
            className="relative flex items-center w-full h-12 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-colors overflow-hidden whitespace-nowrap"
          >
            {/* Icon Center */}
            <div className="absolute left-0 w-20 h-full flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-2xl">
                {item.icon}
              </span>
              {item.badge && (
                <span className="absolute top-2.5 left-8 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center border border-[#351a5b]">
                  {item.badge}
                </span>
              )}
            </div>

            {/* Chữ: Đã đổi ml-20 px-4 thành ml-16 pr-4 để kéo chữ lại gần icon */}
            <div className="ml-16 flex-1 pr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap overflow-hidden">
              <span className="font-semibold text-sm">{item.label}</span>
            </div>
          </Link>
        ))}
      </nav>

      {/* 3. LỚP NGÔN NGỮ */}
      <div className="w-full shrink-0 border-t border-white/5 py-4 px-0 relative">
        <button
          onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
          className="relative flex items-center w-full h-12 text-white/70 hover:bg-white/10 hover:text-white transition-colors overflow-hidden whitespace-nowrap outline-none"
        >
          <div className="absolute left-0 w-20 h-full flex items-center justify-center shrink-0">
            <img
              src={lang === "vi" ? flagVN : flagEN}
              alt={lang}
              className="w-8 h-5 object-cover rounded-sm shadow-sm border border-white/10"
            />
          </div>

          {/* Đã đổi ml-20 px-4 thành ml-16 pr-4 */}
          <div className="ml-16 flex-1 pr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-left font-bold text-base tracking-widest uppercase flex items-center justify-between">
            <span>{lang === "vi" ? "VI" : "EN"}</span>
            <span className="material-symbols-outlined text-sm text-white/40">
              {isLangMenuOpen ? "expand_less" : "expand_more"}
            </span>
          </div>
        </button>

        {/* Popup Menu Chọn Ngôn Ngữ */}
        <div
          className={`absolute bottom-[100%] left-4 right-4 mb-2 bg-[#2a1447] rounded-xl border border-white/10 shadow-[0_-8px_30px_rgba(0,0,0,0.3)] overflow-hidden transition-all duration-200 origin-bottom ${isLangMenuOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}`}
        >
          <button
            onClick={() => {
              setLang("vi");
              setIsLangMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition-colors ${lang === "vi" ? "bg-white/5" : ""}`}
          >
            <img
              src={flagVN}
              className="w-6 h-4 object-cover rounded-sm"
              alt="VN"
            />
            <span
              className={`text-sm ${lang === "vi" ? "font-bold text-white" : "font-medium text-white/70"}`}
            >
              Tiếng Việt
            </span>
          </button>

          <button
            onClick={() => {
              setLang("en");
              setIsLangMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition-colors ${lang === "en" ? "bg-white/5" : ""}`}
          >
            <img
              src={flagEN}
              className="w-6 h-4 object-cover rounded-sm"
              alt="EN"
            />
            <span
              className={`text-sm ${lang === "en" ? "font-bold text-white" : "font-medium text-white/70"}`}
            >
              English
            </span>
          </button>
        </div>
      </div>

      {/* 4. PHẦN PROFILE VÀ LOGIN/LOGOUT */}
      <div className="w-full shrink-0 border-t border-white/5 py-4 px-0 bg-[#1e1034]/30 relative">
        {user ? (
          <div className="space-y-2 relative">
            {/* THÔNG TIN USER */}
            <div
              className="relative flex items-center w-full h-12 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-colors cursor-pointer overflow-hidden whitespace-nowrap"
              onClick={() => navigate("/profile")}
            >
              <div className="absolute left-0 w-20 h-full flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-3xl text-white/40 group-hover:text-white/80">
                  account_circle
                </span>
              </div>

              {/* Đã đổi ml-20 px-4 thành ml-16 pr-4 */}
              <div className="ml-16 flex-1 pr-4 flex flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 whitespace-nowrap overflow-hidden">
                <span className="font-bold text-sm text-white line-clamp-1 truncate">
                  {user.fullName || "Username"}
                </span>
                <span className="text-[11px] text-white/60 line-clamp-1 truncate">
                  {user.email || "email@boxhub.com"}
                </span>
              </div>
            </div>

            {/* NÚT ĐĂNG XUẤT */}
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 delay-150 h-0 group-hover:h-auto overflow-hidden">
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="relative w-full h-10 text-left hover:bg-red-500/10 text-red-400 font-bold flex items-center transition text-sm overflow-hidden whitespace-nowrap"
              >
                <div className="absolute left-0 w-20 h-full flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-xl">
                    logout
                  </span>
                </div>
                {/* Đã đổi ml-20 px-4 thành ml-16 pr-4 */}
                <span className="ml-16 pr-4">Đăng xuất</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            {/* ICON MẶC ĐỊNH */}
            <div className="flex group-hover:hidden items-center justify-center w-20 h-12 relative">
              <span className="material-symbols-outlined text-3xl text-white/40">
                person
              </span>
            </div>

            {/* 2 NÚT BẤM */}
            <div className="hidden group-hover:flex flex-col w-full gap-2 px-4 transition-all opacity-0 group-hover:opacity-100 duration-300 whitespace-nowrap overflow-hidden">
              <button
                onClick={openLogin}
                className="w-full bg-white text-[#351a5b] py-2.5 rounded-full font-bold text-sm hover:opacity-90 transition-all shadow-md"
              >
                Đăng nhập
              </button>
              <button
                onClick={openRegister}
                className="w-full bg-[#1e1034]/50 text-white/80 border border-white/10 py-2.5 rounded-full font-semibold text-sm hover:bg-white/10 transition-all"
              >
                Đăng ký ngay
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
