import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import boxHubLogo from "../assets/images/logo.png";

const GuestLayout = () => {
  const { user, logout } = useAuthContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#f7f6f8] font-sans text-slate-900 transition-colors duration-300">
      
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-[#351a5b]/10 bg-[#f7f6f8]/80 backdrop-blur-md flex justify-center">
        <div className="w-full max-w-[1200px] px-4 lg:px-0 py-4 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-[#351a5b]">
            <img
              src={boxHubLogo}
              alt="BoxHub Logo"
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              className="text-sm font-semibold hover:text-[#351a5b] transition-colors"
              href="#"
            >
              Find a box
            </a>
            <a
              className="text-sm font-semibold hover:text-[#351a5b] transition-colors"
              href="#"
            >
              List your space
            </a>
            <a
              className="text-sm font-semibold hover:text-[#351a5b] transition-colors"
              href="#"
            >
              Help
            </a>
          </nav>

          {/* User Actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-[#351a5b]/10 rounded-full transition-colors hidden sm:block">
              <span className="material-symbols-outlined text-2xl">language</span>
            </button>
            
            {/* NÚT MENU & PROFILE BAO GỒM DROPDOWN */}
            <div className="relative flex items-center gap-2 border border-slate-300 rounded-full p-2 pl-3 shadow-sm hover:shadow-md transition-all bg-white">
              
              {/* Nút Menu - Click để mở Dropdown */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center justify-center hover:bg-slate-100 rounded-full p-1 transition-colors outline-none cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px] text-slate-700">menu</span>
              </button>
              
              {/* Icon mặt người - Vẫn giữ nguyên chức năng dẫn sang Profile */}
              <Link to="/profile" className="flex items-center justify-center rounded-full shrink-0">
                <span className="material-symbols-outlined text-[32px] text-slate-400 hover:text-[#351a5b] transition-colors">
                  account_circle
                </span>
              </Link>

              {/* KHUNG DROPDOWN */}
              {isMenuOpen && (
                <div className="absolute top-[calc(100%+12px)] right-0 w-64 bg-white rounded-2xl shadow-[0_8px_28px_rgba(0,0,0,0.15)] border border-slate-200 py-2 z-50 flex flex-col text-sm text-slate-700 font-medium overflow-hidden">
                  <Link to="#" className="px-4 py-3 hover:bg-slate-50 transition-colors">Yêu thích</Link>
                  <Link to="#" className="px-4 py-3 hover:bg-slate-50 transition-colors">Tin nhắn</Link>
                  <Link to="#" className="px-4 py-3 hover:bg-slate-50 transition-colors">Đặt phòng của tôi</Link>
                  <hr className="my-1 border-slate-200" />
                  <Link to="#" className="px-4 py-3 hover:bg-slate-50 transition-colors">Thông báo</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-100 border-t border-slate-200 flex justify-center py-16">
        <div className="w-full max-w-[1200px] px-4 lg:px-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="font-bold mb-4">Hỗ trợ</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <a className="hover:underline" href="#">Trung tâm trợ giúp</a>
                </li>
                <li>
                  <a className="hover:underline" href="#">AirCover</a>
                </li>
                <li>
                  <a className="hover:underline" href="#">Chống phân biệt đối xử</a>
                </li>
                <li>
                  <a className="hover:underline" href="#">Hỗ trợ người khuyết tật</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Đón tiếp khách</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <a className="hover:underline" href="#">Cho thuê BoxHub</a>
                </li>
                <li>
                  <a className="hover:underline" href="#">AirCover cho Chủ nhà</a>
                </li>
                <li>
                  <a className="hover:underline" href="#">Tài nguyên về đón tiếp khách</a>
                </li>
                <li>
                  <a className="hover:underline" href="#">Diễn đàn cộng đồng</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">BoxHub</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <a className="hover:underline" href="#">Trang tin tức</a>
                </li>
                <li>
                  <a className="hover:underline" href="#">Tìm hiểu các tính năng mới</a>
                </li>
                <li>
                  <a className="hover:underline" href="#">Cơ hội nghề nghiệp</a>
                </li>
                <li>
                  <a className="hover:underline" href="#">Nhà đầu tư</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Theo dõi chúng tôi</h4>
              <div className="flex gap-4">
                <span className="material-symbols-outlined cursor-pointer hover:text-[#351a5b]">
                  social_leaderboard
                </span>
                <span className="material-symbols-outlined cursor-pointer hover:text-[#351a5b]">
                  share
                </span>
                <span className="material-symbols-outlined cursor-pointer hover:text-[#351a5b]">
                  alternate_email
                </span>
              </div>
              <div className="mt-6">
                <button className="flex items-center gap-2 text-sm font-bold border border-slate-300 px-4 py-2 rounded-lg">
                  <span className="material-symbols-outlined text-sm">language</span> Tiếng Việt (VN)
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>© 2026 BoxHub, Inc. · Quyền riêng tư · Điều khoản · Sơ đồ trang web</p>
            <div className="flex gap-4 font-bold">
              <a className="hover:underline" href="#">Hồ Chí Minh</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GuestLayout;