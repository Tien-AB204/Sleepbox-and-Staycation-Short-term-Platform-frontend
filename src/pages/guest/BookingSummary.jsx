import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

// --- MOCK DATA CÁC DỊCH VỤ TÍNH PHÍ ---
const EXTRA_SERVICES = [
  {
    id: "early_checkin",
    title: "Nhận phòng sớm",
    desc: "Nhận box trước 2 tiếng (Tùy thuộc vào tình trạng trống)",
    price: 50000,
    icon: "schedule",
  },
  {
    id: "extra_pillow",
    title: "Thêm bộ chăn gối",
    desc: "Bao gồm 1 chăn mền lớn và 1 gối lông vũ cao cấp",
    price: 30000,
    icon: "bed",
  },
  {
    id: "laundry",
    title: "Giặt sấy hỏa tốc",
    desc: "Dịch vụ giặt sấy lấy liền trong 4 tiếng (Tối đa 3kg)",
    price: 60000,
    icon: "local_laundry_service",
  },
];

const BookingSummary = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  // State phương thức thanh toán
  const [paymentMethod, setPaymentMethod] = useState("vnpay");
  
  // State quản lý các dịch vụ đã chọn (lưu mảng các ID)
  const [selectedExtras, setSelectedExtras] = useState([]);

  // Hàm toggle chọn/bỏ chọn dịch vụ
  const handleToggleExtra = (id) => {
    setSelectedExtras((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // --- TÍNH TOÁN GIÁ TIỀN ĐỘNG ---
  const BASE_PRICE = 450000;
  const SERVICE_FEE = 25000;
  const MEMBER_DISCOUNT = -15000;
  
  // Tổng tiền các dịch vụ thêm
  const extrasTotal = useMemo(() => {
    return selectedExtras.reduce((sum, extraId) => {
      const service = EXTRA_SERVICES.find((s) => s.id === extraId);
      return sum + (service ? service.price : 0);
    }, 0);
  }, [selectedExtras]);

  // Tổng thanh toán
  const grandTotal = BASE_PRICE + SERVICE_FEE + MEMBER_DISCOUNT + extrasTotal;

  return (
    <div className="w-full flex-col font-sans pb-16"> 
      
      <main className="max-w-[1100px] mx-auto w-full px-4 sm:px-6 lg:px-0 py-8 lg:py-12">

        {/* ==================== PROGRESS BAR ==================== */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-10 sm:mb-12 scale-90 sm:scale-100">
          {/* Bước 1: Đã qua */}
          <div className="flex items-center gap-2 text-green-600 font-bold text-xs sm:text-sm">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[16px] sm:text-lg">check</span>
            </div>
            Chọn Box
          </div>
          <div className="w-8 sm:w-16 h-[2px] bg-green-500 rounded-full"></div>
          
          {/* Bước 2: Hiện tại */}
          <div className="flex items-center gap-2 text-green-600 font-bold text-xs sm:text-sm">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[16px] sm:text-lg">check</span>
            </div>
            Thanh toán
          </div>
          <div className="w-8 sm:w-16 h-[2px] bg-green-500 rounded-full"></div>
          
          {/* Bước 3: Chưa tới */}
          <div className="flex items-center gap-2 text-[#4059AD] font-bold text-xs sm:text-sm">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#4059AD] text-white flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[16px] sm:text-lg">done_all</span>
            </div>
            Hoàn tất
          </div>
        </div>
        
        {/* Navigation / Header Màn Hình Xác Nhận */}
        <div className="mb-10 flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors shadow-sm shrink-0"
          >
            <span className="material-symbols-outlined text-slate-700">arrow_back</span>
          </button>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">
            Xác nhận và thanh toán
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          
          {/* --------- CỘT TRÁI: FORMS --------- */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* 1. Trip Info */}
            <section className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold mb-6 text-slate-900">Đơn hàng của bạn</h2>
              
              <div className="flex justify-between items-start pb-6 border-b border-slate-100">
                <div className="flex w-full max-w-md relative">
                  <div className="absolute left-1/2 top-1 bottom-1 w-px bg-slate-200"></div>
                  
                  <div className="flex-1 pr-4">
                    <h3 className="text-sm font-bold text-slate-800 mb-1">Nhận box</h3>
                    <p className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
                      T6, 20 tháng 10 <br /> 2023
                    </p>
                    <p className="text-sm text-slate-500 mt-1">14:00 – 22:00</p>
                  </div>
                  
                  <div className="flex-1 pl-6">
                    <h3 className="text-sm font-bold text-slate-800 mb-1">Trả box</h3>
                    <p className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
                      T7, 21 tháng 10 <br /> 2023
                    </p>
                    <p className="text-sm text-slate-500 mt-1">Cho đến 12:00</p>
                  </div>
                </div>

                <button onClick={() => navigate(-1)} className="text-sm font-bold text-[#4059AD] hover:underline underline-offset-4 shrink-0 mt-1">
                  Chỉnh sửa
                </button>
              </div>
              
              <div className="flex justify-between items-center pt-5">
                <div>
                  <h3 className="font-bold text-slate-800">Box đã chọn</h3>
                  <p className="text-slate-500 mt-1">1 Box đôi</p>
                </div>
                <button onClick={() => navigate(-1)} className="text-base font-bold text-[#4059AD] hover:underline underline-offset-4">
                  Chỉnh sửa
                </button>
              </div>
            </section>

            {/* 2. Guest Info */}
            <section className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold mb-2 text-slate-900">Chi tiết khách hàng</h2>
              <p className="text-slate-500 mb-6 text-sm">Vui lòng điền thông tin chính xác để nhận xác nhận đặt phòng.</p>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold mb-2 text-slate-700">Họ và tên</label>
                  <input
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-[#4059AD]/20 focus:border-[#4059AD] focus:bg-white outline-none transition-all placeholder:text-slate-400 font-medium"
                    placeholder="Ví dụ: Nguyễn Văn A"
                    type="text"
                    defaultValue={user?.fullName || ""}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold mb-2 text-slate-700">Email</label>
                    <input
                      className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-[#4059AD]/20 focus:border-[#4059AD] focus:bg-white outline-none transition-all placeholder:text-slate-400 font-medium"
                      placeholder="example@email.com"
                      type="email"
                      defaultValue={user?.email || ""}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2 text-slate-700">Số điện thoại</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-4 py-3.5 bg-slate-100 border border-r-0 border-slate-200 rounded-l-xl text-slate-500 font-bold text-sm shrink-0">
                        +84
                      </span>
                      <input
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-r-xl px-4 py-3.5 focus:ring-2 focus:ring-[#4059AD]/20 focus:border-[#4059AD] focus:bg-white outline-none transition-all placeholder:text-slate-400 font-medium"
                        placeholder="90 123 4567"
                        type="tel"
                        defaultValue={user?.phone || ""}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. Yêu cầu đặc biệt (Dịch vụ tính phí - Bản nâng cấp) */}
            <section className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#4059AD]">add_circle</span>
                  <h2 className="text-xl font-bold text-slate-900">Dịch vụ bổ sung</h2>
                </div>
                <span className="text-xs font-bold bg-[#4059AD]/10 text-[#4059AD] px-3 py-1 rounded-full">
                  Không bắt buộc
                </span>
              </div>
              <p className="text-slate-500 mb-6 text-sm">
                Nâng tầm trải nghiệm lưu trú của bạn với các tiện ích thêm. Tùy chọn sẽ được cộng trực tiếp vào giá phòng.
              </p>
              
              <div className="space-y-4">
                {EXTRA_SERVICES.map((extra) => {
                  const isSelected = selectedExtras.includes(extra.id);
                  return (
                    <div 
                      key={extra.id}
                      onClick={() => handleToggleExtra(extra.id)}
                      className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                        isSelected ? "border-[#4059AD] bg-[#4059AD]/5" : "border-slate-100 bg-white hover:border-slate-200"
                      }`}
                    >
                      {/* Icon */}
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isSelected ? "bg-[#4059AD] text-white shadow-md" : "bg-slate-50 text-slate-500"
                      }`}>
                        <span className="material-symbols-outlined text-2xl">{extra.icon}</span>
                      </div>
                      
                      {/* Text */}
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-slate-900">{extra.title}</h4>
                        <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{extra.desc}</p>
                        <p className="text-sm font-black text-[#4059AD] mt-1.5">
                          +{extra.price.toLocaleString("vi-VN")}đ <span className="text-[10px] font-medium text-slate-400 font-normal uppercase">/lượt</span>
                        </p>
                      </div>

                      {/* Select Indicator */}
                      <div className="shrink-0 pl-2">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          isSelected ? "border-[#4059AD] bg-[#4059AD]" : "border-slate-300"
                        }`}>
                          {isSelected && <span className="material-symbols-outlined text-white text-[14px] font-bold">check</span>}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* 4. Payment Methods */}
            <section className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold mb-6 text-slate-900">Phương thức thanh toán</h2>
              
              <div className="space-y-4">
                {/* VNPAY CARD */}
                <label 
                  onClick={() => setPaymentMethod("vnpay")}
                  className={`flex items-center p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                    paymentMethod === "vnpay" ? "border-[#4059AD] bg-[#4059AD]/5 shadow-sm" : "border-slate-200 bg-white hover:border-[#4059AD]/40"
                  }`}
                >
                  <div className="flex h-6 items-center shrink-0">
                    <input 
                      type="radio" 
                      className="w-5 h-5 text-[#4059AD] focus:ring-[#4059AD] cursor-pointer" 
                      checked={paymentMethod === "vnpay"} 
                      readOnly 
                    />
                  </div>
                  <div className="ml-4 flex-1 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-800 text-base">Thanh toán qua VNPAY</p>
                      <p className="text-sm text-slate-500 mt-0.5">Quét mã QR qua ứng dụng ngân hàng</p>
                    </div>
                    <img 
                      src="https://vnpay.vn/s1/statics.vnpay.vn/2023/9/06ncktiwd6dc1694418196384.png" 
                      alt="VNPAY" 
                      className="h-8 md:h-10 object-contain shrink-0" 
                    />
                  </div>
                </label>

                {/* MOMO CARD */}
                <label 
                  onClick={() => setPaymentMethod("momo")}
                  className={`flex items-center p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                    paymentMethod === "momo" ? "border-[#4059AD] bg-[#4059AD]/5 shadow-sm" : "border-slate-200 bg-white hover:border-[#4059AD]/40"
                  }`}
                >
                  <div className="flex h-6 items-center shrink-0">
                    <input 
                      type="radio" 
                      className="w-5 h-5 text-[#4059AD] focus:ring-[#4059AD] cursor-pointer" 
                      checked={paymentMethod === "momo"} 
                      readOnly 
                    />
                  </div>
                  <div className="ml-4 flex-1 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-800 text-base">Thanh toán qua MoMo</p>
                      <p className="text-sm text-slate-500 mt-0.5">Sử dụng ví điện tử MoMo</p>
                    </div>
                    <img 
                      src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-MoMo-Square.png" 
                      alt="MoMo" 
                      className="h-8 md:h-10 w-8 md:w-10 object-cover shrink-0 rounded-xl" 
                    />
                  </div>
                </label>
              </div>
            </section>

            {/* 5. Chính sách chỗ ở */}
            <section className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#4059AD]">receipt_long</span>
                  <h2 className="text-xl font-bold text-slate-900">Chính sách Chỗ ở</h2>
                </div>
                <button className="text-[#4059AD] text-sm font-bold hover:underline underline-offset-4">
                  Đọc tất cả
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#4059AD]"></div>
                    <h4 className="text-sm font-bold text-[#4059AD]">Lưu ý quan trọng</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 pl-3.5 border-l-2 border-slate-100 ml-0.5">
                    Quý khách vui lòng giữ yên lặng trong khu vực khoang ngủ sau 22:00. Không mang đồ ăn có mùi nặng vào trong Box.
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="material-symbols-outlined text-[16px] text-slate-400">badge</span>
                    <h4 className="text-sm font-bold text-slate-800">Giấy Tờ Bắt Buộc</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 pl-6">
                    Khi nhận phòng, bạn cần cung cấp CMND/CCCD hoặc Hộ chiếu (Passport) bản gốc để đối chiếu.
                  </p>
                </div>
              </div>
            </section>

          </div>

          {/* --------- CỘT PHẢI: STICKY SUMMARY --------- */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-28 space-y-6">
              
              {/* URGENCY ALERT */}
              <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex items-start gap-3 shadow-sm">
                <span className="material-symbols-outlined text-red-500 mt-0.5 animate-pulse">schedule</span>
                <div>
                  <h4 className="text-red-700 font-bold text-sm">Giữ giá tốt này trong 09:59</h4>
                  <p className="text-red-600 text-xs mt-1">Hãy hoàn tất đặt phòng trước khi phòng bị lấy mất!</p>
                </div>
              </div>

              {/* MAIN SUMMARY CARD */}
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
                
                {/* Property Snippet */}
                <div className="p-6 border-b border-slate-100 flex gap-4 items-start">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                    <img 
                      src="https://images.unsplash.com/photo-1596120236172-231999844ade?w=400" 
                      alt="Room" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className="text-[10px] sm:text-xs font-bold text-[#4059AD] uppercase tracking-wider mb-1">BoxHub Official</span>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug line-clamp-2">Zen Capsule - Sân Bay Tân Sơn Nhất</h3>
                    <div className="flex items-center gap-1 mt-auto pt-2 text-sm font-bold text-slate-700">
                      <span className="material-symbols-outlined text-amber-400 fill-1 text-base">star</span>
                      <span>4.8</span>
                      <span className="text-slate-400 font-medium font-normal ml-1">(120)</span>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="p-6 bg-slate-50/50 border-b border-slate-100">
                  <h4 className="text-base font-bold text-slate-900 mb-5">Chi tiết giá</h4>
                  
                  <div className="space-y-3.5">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-600">Giá phòng (1 đêm)</span>
                      <span className="font-semibold text-slate-800">{BASE_PRICE.toLocaleString('vi-VN')}đ</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="underline decoration-slate-300 underline-offset-4 cursor-pointer hover:text-slate-800 text-slate-600">Phí dịch vụ</span>
                      <span className="font-semibold text-slate-800">{SERVICE_FEE.toLocaleString('vi-VN')}đ</span>
                    </div>
                    
                    {/* Render các dịch vụ đã chọn */}
                    {selectedExtras.map(id => {
                      const service = EXTRA_SERVICES.find(s => s.id === id);
                      return service ? (
                        <div key={id} className="flex justify-between items-center text-sm animate-fade-in-down">
                          <span className="text-slate-600">{service.title}</span>
                          <span className="font-semibold text-slate-800">+{service.price.toLocaleString('vi-VN')}đ</span>
                        </div>
                      ) : null;
                    })}

                    <div className="flex justify-between items-center text-sm text-green-600 pt-3 border-t border-slate-200/60 mt-2">
                      <span className="font-medium">Ưu đãi thành viên</span>
                      <span className="font-bold">{MEMBER_DISCOUNT.toLocaleString('vi-VN')}đ</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-5 border-t-2 border-dashed border-slate-200">
                    <div className="flex justify-between items-end mb-1">
                      <p className="text-base font-bold text-slate-900">Tổng cộng (VND)</p>
                      <p className="text-3xl font-black text-[#4059AD] transition-all">{grandTotal.toLocaleString('vi-VN')}đ</p>
                    </div>
                    <p className="text-right text-xs text-slate-500 font-medium">Đã bao gồm thuế và phí</p>
                  </div>
                </div>

                {/* Policies & Action */}
                <div className="p-6 bg-white">
                  <div className="mb-6 space-y-3">
                    <div className="flex gap-3 text-sm text-slate-700">
                      <span className="material-symbols-outlined text-green-600 shrink-0">check_circle</span>
                      <div>
                        <span className="font-bold text-slate-900">Hủy miễn phí</span> trước 14:00 ngày 19/10.
                      </div>
                    </div>
                    <div className="flex gap-3 text-sm text-slate-700">
                      <span className="material-symbols-outlined text-green-600 shrink-0">check_circle</span>
                      <div>
                        <span className="font-bold text-slate-900">Xác nhận tức thời.</span> Bạn sẽ nhận được mã phòng ngay lập tức.
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => navigate("/booking-detail")}
                    className="w-full bg-[#4059AD] hover:bg-[#32488f] text-white font-bold py-4 rounded-2xl shadow-[0_8px_20px_rgba(64,89,173,0.25)] transition-all flex items-center justify-center gap-2 group text-lg"
                  >
                    <span>Thanh toán {paymentMethod === 'vnpay' ? 'VNPAY' : 'MoMo'}</span>
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                      lock
                    </span>
                  </button>
                  <p className="text-center text-xs text-slate-500 mt-4 leading-relaxed px-2">
                    Bằng cách nhấn chọn thanh toán, bạn đồng ý với <a className="text-[#4059AD] font-bold underline" href="#">Điều khoản</a> và <a className="text-[#4059AD] font-bold underline" href="#">Chính sách</a> của BoxHub.
                  </p>
                </div>

              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default BookingSummary;