import React from "react";
import { useNavigate } from "react-router-dom";

const BookingSummary = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-[#f7f6f8] text-slate-900 font-sans">
      <div className="layout-container flex h-full grow flex-col">
        {/* Navigation */}
        <header className="flex items-center justify-between border-b border-[#351a5b]/10 bg-white px-6 md:px-20 py-4 sticky top-0 z-50">
          <div className="flex items-center gap-4 text-[#351a5b] cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-8 h-8">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_6_319)">
                  <path
                    d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z"
                    fill="currentColor"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_6_319">
                    <rect fill="white" height="48" width="48"></rect>
                  </clipPath>
                </defs>
              </svg>
            </div>
            <h2 className="text-xl font-extrabold tracking-tight">BoxHub</h2>
          </div>
          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-8">
              <a className="text-sm font-medium hover:text-[#351a5b] transition-colors" href="#">
                Tìm kiếm
              </a>
              <a className="text-sm font-medium hover:text-[#351a5b] transition-colors" href="#">
                Ưu đãi
              </a>
              <a className="text-sm font-medium hover:text-[#351a5b] transition-colors" href="#">
                Hỗ trợ
              </a>
            </div>
            <div className="bg-[#351a5b]/10 rounded-full p-1 border border-[#351a5b]/20">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-8 h-8"
                data-alt="Ảnh đại diện người dùng"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBeOPyRpEZOjT2f5cs8gZdYcn-KqukCIMgI7gGfCVvtJm5I1DsITWSUtn1xmssGbw6f7KkD1quKWX5dHe6dHmIA9iINpc-yGRtO3ihEOENfhD1x7W3ae02ST2jzRnpxJsXwrafs-vaw_haQ0UK0cGIH4tvTNVAd3zWHtVQPuxopgOlr_TEIgeESwatPZNIt8ofvvMfJBUxW7S6Qqn02Yu6OuRLOdE2cnuiM6hJgBD8gYD0lDQoiBTIHg7EXlX_-XZ8Wo-LZQs10mxC9")',
                }}
              ></div>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto w-full px-4 md:px-10 py-8 lg:py-12">
          {/* Breadcrumbs & Header */}
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
        {/* Simple Footer */}
        <footer className="mt-auto py-8 border-t border-[#351a5b]/10 px-6 text-center text-sm text-slate-500">
          <p>
            © 2023 BoxHub - Hệ thống đặt phòng Sleepbox thông minh hàng đầu Việt
            Nam.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default BookingSummary;
