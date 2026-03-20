import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import boxHubLogo from "../assets/images/logo.png"; // Hình logo trong suốt
import Sidebar from "../components/common/Sidebar"; // Import Sidebar mới (sẽ tạo ở bước 2)

// IMPORT COMPONENT POPUP
import AuthModal from "../pages/auth/AuthModal";

const GuestLayout = () => {
  // STATE Quản lý Modal & Chế độ Login/Register (Giữ nguyên cho Sidebar dùng chung)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  // Hàm mở modal dùng chung
  const openLogin = () => {
    setAuthMode("login");
    setIsAuthModalOpen(true);
  };

  const openRegister = () => {
    setAuthMode("register");
    setIsAuthModalOpen(true);
  };

  return (
    // Bọc toàn bộ trong 1 div flex để quản lý khoảng cách với Sidebar dọc
    <div className="relative flex min-h-screen w-full bg-[#f7f6f8] font-sans text-slate-900 transition-colors duration-300">
      
      {/* 1. THANH ĐIỀU HƯỚNG DỌC (SIDEBAR) */}
      <Sidebar openLogin={openLogin} openRegister={openRegister} />

      {/* 2. CỘT PHẢI: CHỨA HEADER NGANG TỐI GIẢN + NỘI DUNG CHÍNH */}
      {/* ml-20 là khoảng cách cứng bằng độ rộng khi thu vào của Sidebar để content không bị che */}
      <div className="flex-1 flex flex-col ml-20">
        
        {/* HEADER NGANG TỐI GIẢN */}
        <header className="sticky top-0 z-40 w-full border-b border-slate-100 bg-white/95 backdrop-blur-md flex justify-center">
          <div className="w-full max-w-[1200px] px-4 lg:px-0 py-3 flex items-center justify-between">
            
            {/* Logo bên trái (chọn dùng logo trong suốt trên nền trắng hoặc có thể dùng hình có nền tùy ý, ở đây tôi dùng trong suốt cho đồng bộ) */}
            <Link to="/" className="flex items-center gap-2 text-[#351a5b]">
              <img src={boxHubLogo} alt="BoxHub Logo" className="h-9 w-auto object-contain" />
            </Link>

            {/* NÚT TRỞ THÀNH HOST ĐƯỢC CHUYỂN QUA ĐÂY */}
            <div className="flex items-center gap-4">
              <Link 
                to="/host/dashboard" 
                className="text-sm font-bold text-[#1e1b4b] hover:bg-slate-100 px-5 py-2.5 rounded-full transition-colors"
              >
                Trở thành host
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content Area (Outlet) */}
        <main className="flex-1 w-full bg-white">
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
          </div>
        </footer>
      </div>

      {/* MODAL ĐĂNG NHẬP / ĐĂNG KÝ (Giữ nguyên) */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        initialMode={authMode} 
      />

    </div>
  );
};

export default GuestLayout;