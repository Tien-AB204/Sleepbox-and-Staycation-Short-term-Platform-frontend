import React, { useEffect, useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import boxHubLogo from "../assets/images/logo.png";

// IMPORT COMPONENT POPUP
import AuthModal from "../pages/auth/AuthModal";

const GuestLayout = () => {
  const { user, logout, switchRole } = useAuthContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    // Khi chuyển route (ví dụ redirect sang /forbidden),
    // đóng dropdown để không “dính UI” giữa các trang.
    setIsMenuOpen(false);
  }, [location.pathname]);
  
  // STATE MỚI: Quản lý Modal & Chế độ Login/Register
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  // Hàm mở nhanh Đăng nhập
  const openLogin = () => {
    setAuthMode("login");
    setIsAuthModalOpen(true);
  };

  // Hàm mở nhanh Đăng ký
  const openRegister = () => {
    setAuthMode("register");
    setIsAuthModalOpen(true);
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#f7f6f8] font-sans text-slate-900 transition-colors duration-300">
      
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-[#351a5b]/10 bg-[#f7f6f8]/80 backdrop-blur-md flex justify-center">
        <div className="w-full max-w-[1200px] px-4 lg:px-0 py-4 flex items-center justify-between">
          
          <Link to="/" className="flex items-center gap-2 text-[#351a5b]">
            <img src={boxHubLogo} alt="BoxHub Logo" className="h-10 w-auto object-contain" />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <a className="text-sm font-semibold hover:text-[#351a5b] transition-colors" href="#">Find a box</a>
            <a className="text-sm font-semibold hover:text-[#351a5b] transition-colors" href="#">List your space</a>
            <a className="text-sm font-semibold hover:text-[#351a5b] transition-colors" href="#">Help</a>
          </nav>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-[#351a5b]/10 rounded-full transition-colors hidden sm:block">
              <span className="material-symbols-outlined text-2xl">language</span>
            </button>
            
            {user ? (
              <div className="relative flex items-center gap-2 border border-slate-300 rounded-full p-2 pl-3 shadow-sm hover:shadow-md transition-all bg-white cursor-pointer ml-2">
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center justify-center hover:bg-slate-100 rounded-full p-1 transition-colors outline-none"
                >
                  <span className="material-symbols-outlined text-[20px] text-slate-700">menu</span>
                </button>
                
                <Link to="/profile" className="flex items-center justify-center rounded-full shrink-0">
                  <span className="material-symbols-outlined text-[32px] text-slate-400 hover:text-[#351a5b] transition-colors">
                    account_circle
                  </span>
                </Link>

                {/* DROPDOWN MENU */}
                {isMenuOpen && (
                  <div className="absolute top-[calc(100%+12px)] right-0 w-[320px] bg-white rounded-2xl shadow-[0_8px_28px_rgba(0,0,0,0.15)] border border-slate-200 py-2 z-50 flex flex-col text-sm text-slate-700 font-medium overflow-hidden">
                    
                    <Link to="/my-bookings" className="px-5 py-3 hover:bg-slate-50 transition-colors flex items-center gap-3 font-medium text-slate-700">
                      <span className="material-symbols-outlined text-[20px] text-slate-400">luggage</span>
                      Đặt phòng của tôi
                    </Link>
                    <Link to="/chat" className="px-5 py-3 hover:bg-slate-50 transition-colors flex items-center gap-3 font-medium text-slate-700">
                      <span className="material-symbols-outlined text-[20px] text-slate-400">chat</span>
                      Tin nhắn
                    </Link>
                    <Link to="/notifications" className="px-5 py-3 hover:bg-slate-50 transition-colors flex items-center gap-3 font-medium text-slate-700">
                      <span className="material-symbols-outlined text-[20px] text-slate-400">notifications</span>
                      Thông báo
                    </Link>
                    <Link to="/favorites" className="px-5 py-3 hover:bg-slate-50 transition-colors flex items-center gap-3 font-medium text-slate-700">
                      <span className="material-symbols-outlined text-[20px] text-slate-400">favorite</span>
                      Yêu thích
                    </Link>
                    
                    <hr className="my-1 border-slate-200" />
                    
                    {/* KHỐI TRỞ THÀNH HOST ĐƯỢC THÊM VÀO */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsMenuOpen(false);
                        // Chuyển role sang host (mock) để được vào trang host ngay
                        switchRole("host");
                        navigate("/host/dashboard");
                      }}
                      className="w-full text-left px-5 py-4 hover:bg-slate-50 transition-colors flex items-center justify-between group"
                    >
                      <div className="flex flex-col pr-4">
                        <span className="font-bold text-slate-900 text-base mb-1">Trở thành host</span>
                        <span className="text-xs text-slate-500 font-normal leading-relaxed">
                          Bắt đầu đón tiếp khách và kiếm thêm thu nhập thật dễ dàng.
                        </span>
                      </div>
                      <img 
                        src="https://cdn-icons-png.flaticon.com/512/3048/3048122.png" 
                        alt="Host" 
                        className="w-12 h-12 object-contain group-hover:scale-110 transition-transform shrink-0 drop-shadow-sm"
                      />
                    </button>

                    <hr className="my-1 border-slate-200" />

                    {/* Nút Đăng xuất */}
                    <button 
                      onClick={() => { logout(); setIsMenuOpen(false); }} 
                      className="px-5 py-3 text-left hover:bg-slate-50 transition-colors text-red-600 font-bold flex items-center gap-3"
                    >
                      Đăng xuất
                    </button>

                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3 ml-2">
                <button 
                  onClick={openLogin}
                  className="bg-white text-[#351a5b] border border-[#351a5b] px-5 py-2 rounded-full font-bold text-sm hover:bg-[#351a5b]/5 transition-colors"
                >
                  Đăng nhập
                </button>
                <button 
                  onClick={openRegister}
                  className="bg-[#351a5b] text-white px-5 py-2 rounded-full font-bold text-sm hover:bg-[#2a1447] transition-colors shadow-md"
                >
                  Đăng ký
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>

      {/* Footer (Giữ nguyên không đổi) */}
      <footer className="bg-slate-100 border-t border-slate-200 flex justify-center py-16">
        <div className="w-full max-w-[1200px] px-4 lg:px-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="font-bold mb-4">Hỗ trợ</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a className="hover:underline" href="#">Trung tâm trợ giúp</a></li>
                <li><a className="hover:underline" href="#">AirCover</a></li>
                <li><a className="hover:underline" href="#">Chống phân biệt đối xử</a></li>
                <li><a className="hover:underline" href="#">Hỗ trợ người khuyết tật</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Đón tiếp khách</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a className="hover:underline" href="#">Cho thuê BoxHub</a></li>
                <li><a className="hover:underline" href="#">AirCover cho Chủ nhà</a></li>
                <li><a className="hover:underline" href="#">Tài nguyên về đón tiếp khách</a></li>
                <li><a className="hover:underline" href="#">Diễn đàn cộng đồng</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">BoxHub</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a className="hover:underline" href="#">Trang tin tức</a></li>
                <li><a className="hover:underline" href="#">Tìm hiểu các tính năng mới</a></li>
                <li><a className="hover:underline" href="#">Cơ hội nghề nghiệp</a></li>
                <li><a className="hover:underline" href="#">Nhà đầu tư</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Theo dõi chúng tôi</h4>
              <div className="flex gap-4">
                <span className="material-symbols-outlined cursor-pointer hover:text-[#351a5b]">social_leaderboard</span>
                <span className="material-symbols-outlined cursor-pointer hover:text-[#351a5b]">share</span>
                <span className="material-symbols-outlined cursor-pointer hover:text-[#351a5b]">alternate_email</span>
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

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        initialMode={authMode} 
      />

    </div>
  );
};

export default GuestLayout;