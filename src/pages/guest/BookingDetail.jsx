import React from "react";
import { useNavigate } from "react-router-dom";

// Component con để tái sử dụng cho phần hiển thị thông tin
const InfoItem = ({ label, value, highlight }) => (
  <div>
    <p className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
      {label}
    </p>
    <p
      className={`text-sm sm:text-base ${highlight ? "font-black text-[#4059AD]" : "font-bold text-slate-800"}`}
    >
      {value}
    </p>
  </div>
);

const BookingDetail = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex-col font-sans pb-16">
      <main className="max-w-[1100px] mx-auto w-full px-4 sm:px-6 lg:px-0 py-8 lg:py-12">
        {/* ==================== PROGRESS BAR ==================== */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-10 sm:mb-12 scale-90 sm:scale-100">
          <div className="flex items-center gap-2 text-green-600 font-bold text-xs sm:text-sm">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[16px] sm:text-lg">
                check
              </span>
            </div>
            Chọn Box
          </div>
          <div className="w-8 sm:w-16 h-[2px] bg-green-500 rounded-full"></div>

          <div className="flex items-center gap-2 text-green-600 font-bold text-xs sm:text-sm">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[16px] sm:text-lg">
                check
              </span>
            </div>
            Thanh toán
          </div>
          <div className="w-8 sm:w-16 h-[2px] bg-green-500 rounded-full"></div>

          <div className="flex items-center gap-2 text-[#4059AD] font-bold text-xs sm:text-sm">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#4059AD] text-white flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[16px] sm:text-lg">
                done_all
              </span>
            </div>
            Hoàn tất
          </div>
        </div>

        {/* ==================== NỘI DUNG CHÍNH (CHIA 2 CỘT) ==================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* CỘT TRÁI (Chiếm 8 phần) */}
          <div className="lg:col-span-8 space-y-8">
            {/* THÔNG BÁO THÀNH CÔNG */}
            <div className="bg-green-50/50 border border-green-100 rounded-3xl p-6 sm:p-8 flex items-start sm:items-center gap-4 sm:gap-6 shadow-sm">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-green-500 text-white flex items-center justify-center shrink-0 shadow-md">
                <span className="material-symbols-outlined font-black text-2xl sm:text-3xl">
                  check
                </span>
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-1.5 leading-tight">
                  Đặt phòng thành công!
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Cảm ơn bạn đã tin tưởng BoxHub. Thông tin chi tiết đơn đặt
                  phòng và hóa đơn đã được gửi đến email{" "}
                  <span className="font-bold text-slate-800">
                    nguyenvana@gmail.com
                  </span>
                  .
                </p>
              </div>
            </div>

            {/* BẢNG CHI TIẾT ĐẶT PHÒNG */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 pb-4 border-b border-slate-100 gap-3">
                <h3 className="text-xl font-black text-slate-900">
                  Chi tiết đặt phòng
                </h3>
                {/* MÃ ĐƠN HÀNG DỜI LÊN ĐÂY */}
                <div className="flex items-baseline gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 w-fit">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    Mã đơn hàng:
                  </span>
                  <span className="text-base font-black text-[#4059AD]">
                    #BOX-54237982
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-6">
                <InfoItem label="Khách hàng" value="Nguyễn Văn A" />
                <InfoItem
                  label="Thời gian nhận phòng"
                  value="Thứ Sáu, 20/10/2023 - Từ 14:00"
                />
                <InfoItem label="Box đã chọn" value="1 Box đôi (Pod 1)" />
                <InfoItem
                  label="Thời gian trả phòng"
                  value="Thứ Bảy, 21/10/2023 - Trước 12:00"
                />
                <InfoItem label="Số điện thoại" value="+84 90 123 4567" />
                {/* THÊM EMAIL VÀO VỊ TRÍ CŨ */}
                <InfoItem label="Email" value="nguyenvana@gmail.com" />
              </div>
            </div>

            {/* MÃ QR NHẬN PHÒNG (PARKING TICKET STYLE) */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 shadow-inner">
              <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 shrink-0">
                {/* Ở đây dùng icon để mô phỏng mã QR, thực tế bạn đưa thẻ <img /> chứa QR vào đây */}
                <span className="material-symbols-outlined text-[140px] text-slate-800 leading-none">
                  qr_code_2
                </span>
              </div>
              <div className="flex flex-col flex-1 text-center sm:text-left">
                <h3 className="text-lg font-black text-slate-900 mb-2">
                  Thẻ nhận Box tự động
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Hãy sử dụng mã QR này để quét tại thiết bị Kiosk tự động ở
                  quầy lễ tân hoặc sử dụng để mở cửa Box của bạn.
                </p>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  chỗ này sẽ hiện mã qr sau khi có data thật.
                </p>
                <div className="mt-auto flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <button className="border-2 border-[#4059AD] text-[#4059AD] px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-[#4059AD] hover:text-white transition-all w-full sm:w-auto text-center">
                    Tải mã QR
                  </button>
                  <button className="bg-[#4059AD] text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-[#32488f] transition-all shadow-md w-full sm:w-auto text-center flex justify-center items-center gap-2">
                    Lưu vào{" "}
                    <span className="material-symbols-outlined text-[18px]">
                      wallet
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* CỘT PHẢI (Chiếm 4 phần) - TÓM TẮT */}
          <div className="lg:col-span-4 space-y-6">
            {/* Tóm tắt đặt phòng */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
              {/* Header Box */}
              <div className="p-6 border-b border-slate-100 flex gap-4 items-start">
                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                  <img
                    src="https://images.unsplash.com/photo-1596120236172-231999844ade?w=400"
                    alt="Room"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <span className="text-[10px] font-bold text-[#4059AD] uppercase tracking-wider mb-1">
                    BoxHub Official
                  </span>
                  <h3 className="text-sm font-black text-slate-900 leading-snug line-clamp-2">
                    Zen Capsule - Sân Bay Tân Sơn Nhất
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">
                      location_on
                    </span>{" "}
                    Tân Bình, HCM
                  </p>
                </div>
              </div>

              {/* Thời gian */}
              <div className="p-6 bg-slate-50/50 space-y-4 border-b border-slate-100">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-medium">Ngày nhận</span>
                  <span className="font-bold text-slate-800">20/10/2023</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-medium">Ngày trả</span>
                  <span className="font-bold text-slate-800">21/10/2023</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-medium">Lưu trú</span>
                  <span className="font-bold text-slate-800">1 đêm</span>
                </div>
              </div>

              {/* Chi tiết giá */}
              <div className="p-6 space-y-4">
                <h4 className="text-base font-black text-slate-900 mb-4">
                  Chi tiết thanh toán
                </h4>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600">Giá phòng (1 đêm)</span>
                  <span className="font-bold text-slate-800">450.000đ</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600">Phí dịch vụ</span>
                  <span className="font-bold text-slate-800">25.000đ</span>
                </div>
                <div className="flex justify-between items-center text-sm text-green-600">
                  <span className="font-medium">Ưu đãi thành viên</span>
                  <span className="font-bold">-15.000đ</span>
                </div>

                {/* Total */}
                <div className="pt-4 border-t-2 border-dashed border-slate-200 mt-4 flex justify-between items-end">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-500 text-xs mb-0.5 uppercase tracking-wider">
                      Đã thanh toán
                    </span>
                    <span className="text-2xl font-black text-green-600 leading-none">
                      460.000đ
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-md">
                    VNPAY
                  </span>
                </div>
              </div>
            </div>

            {/* Nút tác vụ phụ: Hủy đơn */}
            <button className="w-full bg-white border-2 border-red-100 text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors font-bold py-3.5 rounded-2xl shadow-sm text-sm flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[18px]">
                event_busy
              </span>{" "}
              Hủy đơn đặt phòng
            </button>

            <div className="text-center">
              <button
                onClick={() => navigate("/")}
                className="text-sm font-bold text-[#4059AD] hover:underline underline-offset-4"
              >
                Quay về trang chủ
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookingDetail;
