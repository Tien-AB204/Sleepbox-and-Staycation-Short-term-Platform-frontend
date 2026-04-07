import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

// Đảm bảo đường dẫn này đúng với cấu trúc thư mục của bạn
import boxHubLogo from "../../assets/images/logo.png";
import AuthModal from "../auth/AuthModal";

const BookingSummary = () => {
  const navigate = useNavigate();

  // TÍCH HỢP STATE VÀ CONTEXT TỪ GUESTLAYOUT
  const { user, logout } = useAuthContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  const openLogin = () => {
    setAuthMode("login");
    setIsAuthModalOpen(true);
  };

  const openRegister = () => {
    setAuthMode("register");
    setIsAuthModalOpen(true);
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-[#f7f6f8] text-slate-900 font-sans">
      
      {/* HEADER CHUẨN ĐỒNG BỘ TỪ GUESTLAYOUT */}
      <header className="sticky top-0 z-50 w-full border-b border-[#351a5b]/10 bg-white/95 backdrop-blur-md flex justify-center">
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
                    
                    <Link to="/host/register/1" className="px-5 py-4 hover:bg-slate-50 transition-colors flex items-center justify-between group">
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
                    </Link>

                    <hr className="my-1 border-slate-200" />

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

      {/* MAIN CONTENT (Giữ nguyên giao diện của bạn) */}
      <main className="max-w-7xl mx-auto w-full px-4 md:px-10 py-8 lg:py-12 flex-1">
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-4">
            <a className="hover:text-[#351a5b] transition-colors" href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
              Trang chủ
            </a>
            <span className="material-symbols-outlined text-xs">
              chevron_right
            </span>
            <a className="hover:text-[#351a5b] transition-colors" href="#" onClick={(e) => { e.preventDefault(); navigate(-1); }}>
              Chi tiết Box
            </a>
            <span className="material-symbols-outlined text-xs">
              chevron_right
            </span>
            <span className="text-[#351a5b] font-semibold">Thanh toán</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">
            Xác nhận đặt phòng
          </h1>
          <p className="text-slate-600 mt-2">
            Vui lòng kiểm tra lại thông tin và thanh toán để hoàn tất đặt chỗ.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Side: Forms */}
          <div className="lg:col-span-7 space-y-10">
            {/* Section: Booking Details */}
            <section>
              <div className="flex items-center gap-3 mb-6 border-l-4 border-[#351a5b] pl-4">
                <h2 className="text-xl font-bold">1. Thông tin đặt phòng</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-xl border border-[#351a5b]/10 shadow-sm">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Nhận phòng
                  </p>
                  <p className="text-base font-bold">14:00, 20/10/2023</p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-[#351a5b]/10 shadow-sm">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Trả phòng
                  </p>
                  <p className="text-base font-bold">12:00, 21/10/2023</p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-[#351a5b]/10 shadow-sm">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Thời gian lưu trú
                  </p>
                  <p className="text-base font-bold">1 đêm</p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-[#351a5b]/10 shadow-sm">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Khách
                  </p>
                  <p className="text-base font-bold">2 người lớn</p>
                </div>
              </div>
            </section>
            {/* Section: Guest Info */}
            <section>
              <div className="flex items-center gap-3 mb-6 border-l-4 border-[#351a5b] pl-4">
                <h2 className="text-xl font-bold">2. Thông tin khách hàng</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-slate-700">
                    Họ và tên
                  </label>
                  <input
                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#351a5b]/20 focus:border-[#351a5b] outline-none transition-all"
                    placeholder="Nguyễn Văn A"
                    type="text"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-slate-700">
                      Email
                    </label>
                    <input
                      className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#351a5b]/20 focus:border-[#351a5b] outline-none transition-all"
                      placeholder="example@email.com"
                      type="email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-slate-700">
                      Số điện thoại
                    </label>
                    <input
                      className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#351a5b]/20 focus:border-[#351a5b] outline-none transition-all"
                      placeholder="090 123 4567"
                      type="tel"
                    />
                  </div>
                </div>
              </div>
            </section>
            {/* Section: Payment Method */}
            <section>
              <div className="flex items-center gap-3 mb-6 border-l-4 border-[#351a5b] pl-4">
                <h2 className="text-xl font-bold">3. Phương thức thanh toán</h2>
              </div>
              <div className="grid grid-cols-1 gap-3">
                <label className="flex items-center p-4 border-2 border-[#351a5b] bg-[#351a5b]/5 rounded-xl cursor-pointer transition-all">
                  <input
                    defaultChecked
                    className="w-4 h-4 text-[#351a5b] focus:ring-[#351a5b]"
                    name="payment"
                    type="radio"
                  />
                  <div className="ml-4 flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#351a5b]">
                      credit_card
                    </span>
                    <div>
                      <p className="font-bold">Thẻ tín dụng / Ghi nợ</p>
                      <p className="text-xs text-slate-500">
                        Visa, Mastercard, JCB
                      </p>
                    </div>
                  </div>
                </label>
                <label className="flex items-center p-4 border border-slate-200 bg-white rounded-xl cursor-pointer hover:border-[#351a5b]/50 transition-all">
                  <input
                    className="w-4 h-4 text-[#351a5b] focus:ring-[#351a5b]"
                    name="payment"
                    type="radio"
                  />
                  <div className="ml-4 flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#351a5b]">
                      account_balance_wallet
                    </span>
                    <div>
                      <p className="font-bold">Ví điện tử</p>
                      <p className="text-xs text-slate-500">
                        MoMo, ZaloPay, ShopeePay
                      </p>
                    </div>
                  </div>
                </label>
                <label className="flex items-center p-4 border border-slate-200 bg-white rounded-xl cursor-pointer hover:border-[#351a5b]/50 transition-all">
                  <input
                    className="w-4 h-4 text-[#351a5b] focus:ring-[#351a5b]"
                    name="payment"
                    type="radio"
                  />
                  <div className="ml-4 flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#351a5b]">
                      account_balance
                    </span>
                    <div>
                      <p className="font-bold">Chuyển khoản ngân hàng</p>
                      <p className="text-xs text-slate-500">
                        QR Code hoặc Số tài khoản
                      </p>
                    </div>
                  </div>
                </label>
              </div>
            </section>
          </div>
          {/* Right Side: Sticky Summary Card */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
                {/* Box Image & Info */}
                <div className="relative h-48 w-full bg-[#351a5b]/10">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    data-alt="Ảnh không gian Sleepbox hiện đại"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDcOjCc0-YOm3VVqyuI1kYhG3zAKsahmvVU6dipObqUXLTj78YX39toE6Oh3lQPJ8hwrLELKLhpYG4HGk9AoB2cscsV7hTVobUBCq99i0fB6ePZHk8Y3UFHpwR2v6QRIuQ3U8Ldx6UJjJAMm90IYmapZZZjqfBIAxJ0OSl8p7bpAUVwtgSMt1_AJ-1-CBpJcb8H7F3mCfSIBfqhSIXnB84K3SPAWdzATkEhIvzIlXAKGCEmcVncqzmyqUOH71flXMXMDt_vKE_Lje6Y')",
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="bg-[#351a5b] px-2 py-0.5 rounded text-[10px] font-bold uppercase mb-2 inline-block">
                      Premium Box
                    </span>
                    <h3 className="text-xl font-bold">
                      Zen Capsule - Sân Bay Tân Sơn Nhất
                    </h3>
                    <div className="flex items-center gap-1 text-sm opacity-90">
                      <span className="material-symbols-outlined text-sm">
                        location_on
                      </span>
                      <span data-location="Ho Chi Minh City">
                        Tân Bình, TP. Hồ Chí Minh
                      </span>
                    </div>
                  </div>
                </div>
                {/* Price Breakdown */}
                <div className="p-6">
                  <h4 className="text-sm font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 uppercase tracking-tight">
                    Chi tiết thanh toán
                  </h4>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">
                        Giá phòng (1 đêm)
                      </span>
                      <span className="font-semibold">450.000đ</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Phí dịch vụ</span>
                      <span className="font-semibold">25.000đ</span>
                    </div>
                    <div className="flex justify-between items-center text-green-600 font-medium">
                      <span>Ưu đãi thành viên</span>
                      <span>-15.000đ</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t-2 border-dashed border-slate-200 flex justify-between items-end mb-8">
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase">
                        Tổng cộng
                      </p>
                      <p className="text-2xl font-black text-[#351a5b]">
                        460.000đ
                      </p>
                    </div>
                    <div className="text-right text-xs text-slate-500">
                      Đã bao gồm thuế VAT
                    </div>
                  </div>
                  <button className="w-full bg-[#351a5b] hover:bg-[#351a5b]/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-[#351a5b]/20 transition-all flex items-center justify-center gap-2 group">
                    <span>Xác nhận và Thanh toán</span>
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </button>
                  <p className="text-center text-[11px] text-slate-400 mt-4 px-4 leading-relaxed">
                    Bằng cách nhấn nút này, bạn đồng ý với{" "}
                    <a className="underline" href="#">
                      Điều khoản dịch vụ
                    </a>{" "}
                    và{" "}
                    <a className="underline" href="#">
                      Chính sách bảo mật
                    </a>{" "}
                    của BoxHub.
                  </p>
                </div>
              </div>
              {/* Trust Badge */}
              <div className="flex items-center justify-center gap-6 p-4 bg-[#351a5b]/5 rounded-xl border border-[#351a5b]/10">
                <div className="flex flex-col items-center gap-1">
                  <span className="material-symbols-outlined text-[#351a5b] text-xl">
                    verified_user
                  </span>
                  <span className="text-[10px] font-bold text-slate-500">
                    BẢO MẬT
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="material-symbols-outlined text-[#351a5b] text-xl">
                    bolt
                  </span>
                  <span className="text-[10px] font-bold text-slate-500">
                    XÁC NHẬN NHANH
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="material-symbols-outlined text-[#351a5b] text-xl">
                    support_agent
                  </span>
                  <span className="text-[10px] font-bold text-slate-500">
                    HỖ TRỢ 24/7
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER ĐƠN GIẢN CỦA BOOKING SUMMARY */}
      <footer className="mt-auto py-8 border-t border-[#351a5b]/10 px-6 text-center text-sm text-slate-500">
        <p>
          © 2026 BoxHub - Hệ thống đặt phòng Sleepbox thông minh hàng đầu Việt
          Nam.
        </p>
      </footer>

      {/* MODAL ĐĂNG NHẬP / ĐĂNG KÝ */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        initialMode={authMode} 
      />

    </div>
  );
};

export default BookingSummary;