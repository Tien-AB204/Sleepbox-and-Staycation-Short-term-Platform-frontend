import React from 'react';
import { useNavigate } from 'react-router-dom';

const History = () => {
  const navigate = useNavigate();

  // Mock data: Danh sách các phòng trong quá khứ (Đã hoàn thành / Đã hủy)
  const pastBookings = [
    {
      id: "BOX-11223B",
      roomName: "EcoBox Bình Thạnh - Cozy Corner",
      location: "Phường 22, Bình Thạnh, TP. Hồ Chí Minh",
      checkIn: "14:00, Thứ 7, 10 Thg 2, 2026",
      checkOut: "12:00, Chủ Nhật, 11 Thg 2, 2026",
      status: "Đã hoàn thành",
      statusCode: "completed", // Dùng để CSS màu sắc
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCBPUwPSUHADAP35qoDdnBJOcgtByvHrJ0u5x-TkSPFH7oZLEl_UBdLHe8dqm3CmR1o7MFPGgnmdVfP9l36gEMaF0gmjUAMKPh6lqoAzmrESMafEhE66SQnqB2wghSHuMmW_7nIVkBCHjAxpZvGUEWQ1byq8QLF5m-bpFdXeqtqP8KnPjyzEGIVPrTC_dsEMbWRsTObI4HsLaAEk4XBjDuPwU0hdjTg-ehxIxvmLTW3_QmeRJxD7GDdpRVRomCATImZNgqsALlkV7Lh",
      totalPrice: "350.000 VND"
    },
    {
      id: "BOX-99887C",
      roomName: "ZenBox Quận 3 - Quiet Zone",
      location: "Lê Văn Sỹ, Quận 3, TP. Hồ Chí Minh",
      checkIn: "14:00, Thứ 4, 05 Thg 1, 2026",
      checkOut: "18:00, Thứ 4, 05 Thg 1, 2026",
      status: "Đã hủy",
      statusCode: "cancelled",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJQ2rhbXESc6EotFx6P3O33HBKLCn06t9So5wO2Ym-pT35wOiHRtII-aEHPuly4Ks6EViRrVscEiHg7mpwop0KkjiqYu-X5BXqp4gKGCeKc3ouR23ajIXEt1qLstv3iGaB1kVxSBpHpBQy5tvmDyAC3VmZc8dc2t0U5hAHm0F5oDKKXUfYw8mK9TnKtTUpGucmECxSZm1Vuhk2JiDrrTOIHyL7-185iL-1_adFsERaNuhZc6A2PhxQSJKlIrrZ1vQdI9ryPt5eo1Kj",
      totalPrice: "120.000 VND"
    }
  ];

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 lg:px-0 py-8 lg:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-[#1e1b4b]">Chuyến đi của bạn</h1>
        <p className="text-slate-500 mt-2">Xem lại những nơi tuyệt vời bạn đã từng ghé thăm trên BoxHub.</p>
      </div>

      {/* Tabs Phân loại */}
      <div className="flex items-center gap-6 border-b border-slate-200 mb-8">
        <button 
          onClick={() => navigate('/my-bookings')}
          className="pb-4 border-b-2 border-transparent font-medium text-slate-500 hover:text-slate-800 transition-colors"
        >
          Sắp tới & Đang ở (1)
        </button>
        {/* Tab Lịch sử đang được Active */}
        <button className="pb-4 border-b-2 border-[#351a5b] font-bold text-[#351a5b]">
          Lịch sử / Đã hoàn thành
        </button>
      </div>

      {pastBookings.length > 0 ? (
        <div className="space-y-6">
          {pastBookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row opacity-90 hover:opacity-100">
              
              {/* Cột ảnh */}
              <div className="w-full md:w-[300px] h-48 md:h-auto relative shrink-0">
                <img src={booking.image} alt={booking.roomName} className="w-full h-full object-cover grayscale-[20%]" />
                
                {/* Badge trạng thái thay đổi màu theo statusCode */}
                <div className={`absolute top-3 left-3 font-bold px-3 py-1 rounded-lg text-xs shadow-sm flex items-center gap-1 ${
                  booking.statusCode === 'completed' 
                    ? 'bg-slate-100 text-slate-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  <span className="material-symbols-outlined text-[14px]">
                    {booking.statusCode === 'completed' ? 'check_circle' : 'cancel'}
                  </span>
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
                    <span className="font-bold text-slate-500">
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
                      <p className="font-bold text-slate-700">{booking.checkIn}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-semibold mb-1">TRẢ PHÒNG</p>
                      <p className="font-bold text-slate-700">{booking.checkOut}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  {/* Nút Đặt lại phòng có màu chủ đạo */}
                  <button 
                    onClick={() => navigate('/room/2')} 
                    className="flex-1 sm:flex-none bg-[#351a5b] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#2a1447] transition shadow-sm flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">replay</span>
                    Đặt lại phòng này
                  </button>
                  
                  {/* Nếu hoàn thành thì có nút Đánh giá */}
                  {booking.statusCode === 'completed' && (
                    <button className="flex-1 sm:flex-none border border-slate-300 text-slate-700 px-6 py-2.5 rounded-xl font-bold hover:bg-slate-50 transition flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">star_rate</span>
                      Viết đánh giá
                    </button>
                  )}
                  
                  <button className="flex-1 sm:flex-none sm:ml-auto text-[#351a5b] font-bold hover:bg-[#351a5b]/5 px-4 py-2.5 rounded-xl transition">
                    Xem chi tiết hóa đơn
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 border-dashed">
          <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">history</span>
          <h3 className="text-xl font-bold text-slate-700 mb-2">Chưa có lịch sử chuyến đi</h3>
          <p className="text-slate-500 mb-6">Các chuyến đi đã hoàn thành hoặc đã hủy sẽ hiển thị ở đây.</p>
        </div>
      )}
    </div>
  );
};

export default History;