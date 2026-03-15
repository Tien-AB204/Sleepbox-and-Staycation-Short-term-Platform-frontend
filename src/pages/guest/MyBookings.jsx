import React from 'react';
import { useNavigate } from 'react-router-dom';

const MyBookings = () => {
  const navigate = useNavigate();

  // Mock data: Danh sách các phòng sắp tới/đang ở
  const upcomingBookings = [
    {
      id: "BOX-78291A",
      roomName: "CyberBox Quận 1 - Premium Pod",
      location: "Phường Bến Thành, Quận 1, TP. Hồ Chí Minh",
      checkIn: "14:00, Thứ 3, 24 Thg 3, 2026",
      checkOut: "12:00, Thứ 4, 25 Thg 3, 2026",
      status: "Sắp nhận phòng",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAirbnfp84pQx1xOoRJhvc9bIqT4iUg0WkxuSbYLPRGCPSzWqNuYqYMc2dnj6ZVZ7faEtsswkHWwOHgIOiSZw-Bkw_FyM4XfyYbUmznWcAXGIGFGb67meUawvtVky86UALMgHjvsoxrti3zfL3AM7pyOCjf55zd3ciCdyyNZw5BH-q-rhlmNbBvGEbryHOQR8oLoEzlB_BZoHO8SrP-NIEQeHLw2N9ducex6Xz4VIvF4QlyTdHL-LpnJ24DRwKBsbR7q5E3RR2wGYli",
      totalPrice: "460.000 VND"
    }
  ];

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 lg:px-0 py-8 lg:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-[#1e1b4b]">Chuyến đi của bạn</h1>
        <p className="text-slate-500 mt-2">Quản lý các đặt phòng sắp tới và đang diễn ra của bạn.</p>
      </div>

      {/* Tabs Phân loại (UI chuẩn bị sẵn cho tương lai mở rộng) */}
      <div className="flex items-center gap-6 border-b border-slate-200 mb-8">
        <button className="pb-4 border-b-2 border-[#351a5b] font-bold text-[#351a5b]">
          Sắp tới & Đang ở (1)
        </button>
        <button 
          onClick={() => navigate('/history')}
          className="pb-4 border-b-2 border-transparent font-medium text-slate-500 hover:text-slate-800 transition-colors"
        >
          Lịch sử / Đã hoàn thành
        </button>
      </div>

      {upcomingBookings.length > 0 ? (
        <div className="space-y-6">
          {upcomingBookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row">
              
              {/* Cột ảnh */}
              <div className="w-full md:w-[300px] h-48 md:h-auto relative shrink-0">
                <img src={booking.image} alt={booking.roomName} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-lg text-xs shadow-sm flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">schedule</span>
                  {booking.status}
                </div>
              </div>

              {/* Cột Thông tin */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Mã đặt phòng: {booking.id}</p>
                      <h3 className="text-xl font-bold text-slate-900 line-clamp-1">{booking.roomName}</h3>
                    </div>
                    <span className="font-extrabold text-[#351a5b] bg-[#351a5b]/5 px-3 py-1.5 rounded-lg">
                      {booking.totalPrice}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 flex items-center gap-1 mb-4">
                    <span className="material-symbols-outlined text-[16px]">location_on</span>
                    {booking.location}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <div>
                      <p className="text-xs text-slate-500 font-semibold mb-1">NHẬN PHÒNG</p>
                      <p className="font-bold text-slate-800">{booking.checkIn}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-semibold mb-1">TRẢ PHÒNG</p>
                      <p className="font-bold text-slate-800">{booking.checkOut}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button className="flex-1 sm:flex-none bg-[#351a5b] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#2a1447] transition shadow-sm">
                    Xem vé điện tử
                  </button>
                  <button className="flex-1 sm:flex-none border border-slate-300 text-slate-700 px-6 py-2.5 rounded-xl font-bold hover:bg-slate-50 transition">
                    Liên hệ Host
                  </button>
                  <button className="flex-1 sm:flex-none sm:ml-auto text-red-600 font-bold hover:bg-red-50 px-4 py-2.5 rounded-xl transition">
                    Hủy phòng
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 border-dashed">
          <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">luggage</span>
          <h3 className="text-xl font-bold text-slate-700 mb-2">Bạn chưa có chuyến đi nào sắp tới</h3>
          <p className="text-slate-500 mb-6">Hãy bắt đầu tìm kiếm những chỗ nghỉ tuyệt vời trên BoxHub nhé.</p>
          <button 
            onClick={() => navigate('/search')}
            className="bg-[#351a5b] text-white px-8 py-3 rounded-full font-bold shadow-md hover:bg-[#2a1447] transition"
          >
            Bắt đầu khám phá
          </button>
        </div>
      )}
    </div>
  );
};

export default MyBookings;