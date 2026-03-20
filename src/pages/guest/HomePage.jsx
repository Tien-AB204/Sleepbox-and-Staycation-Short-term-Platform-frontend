import React from "react";
import { useNavigate } from "react-router-dom";
import heroBg from "../../assets/images/hero-bg.jpg";

const Home = () => {
  const navigate = useNavigate();

  return (
    // Bọc toàn bộ nội dung trong 1 thẻ div để kiểm soát màu nền chung
    <div className="w-full bg-white">
      
      {/* Hero Section */}
      {/* LỚP 1: Ép giữa bằng Flex */}
      <section className="w-full flex justify-center py-8">
        {/* LỚP 2: Khung 1200px chuẩn, Margin 0, Padding 0 trên Desktop (Giữ px-4 cho Mobile khỏi chạm viền) */}
        <div className="relative w-full max-w-[1200px] px-4 lg:px-0">
          <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden rounded-2xl bg-[#351a5b]/10">
            <div
              className="absolute inset-0 bg-cover bg-center"
              data-alt="Modern high-tech sleepbox interior in Ho Chi Minh City"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.5)), url(${heroBg})`,
              }}
            ></div>
            <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
              <h1 className="text-white text-4xl md:text-6xl font-extrabold leading-tight tracking-tight max-w-3xl mb-4">
                Tìm chỗ nghỉ ngơi lý tưởng tại TP.HCM
              </h1>
              <p className="text-white/90 text-lg md:text-xl font-medium max-w-xl mb-8">
                Khám phá không gian riêng tư, tiện nghi và giá cả hợp lý ngay trung tâm thành phố.
              </p>
            </div>
          </div>

          {/* Floating Search Bar */}
          <div className="relative -mt-12 mx-auto max-w-5xl px-4 lg:px-0">
            <div className="bg-white p-4 rounded-2xl shadow-2xl border border-[#351a5b]/10 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <div className="flex flex-col px-4 border-r border-slate-200">
                <span className="text-xs font-bold uppercase tracking-wider text-[#351a5b]">Địa điểm</span>
                <input
                  className="bg-transparent border-none focus:ring-0 p-0 text-slate-900 placeholder:text-slate-400 font-medium"
                  placeholder="Quận tại TP.HCM"
                  type="text"
                />
              </div>
              <div className="flex flex-col px-4 border-r border-slate-200">
                <span className="text-xs font-bold uppercase tracking-wider text-[#351a5b]">Ngày nhận</span>
                <input
                  className="bg-transparent border-none focus:ring-0 p-0 text-slate-900 font-medium"
                  type="date"
                />
              </div>
              <div className="flex flex-col px-4 border-r border-slate-200">
                <span className="text-xs font-bold uppercase tracking-wider text-[#351a5b]">Thời lượng</span>
                <select className="bg-transparent border-none focus:ring-0 p-0 text-slate-900 font-medium cursor-pointer">
                  <option>Theo giờ</option>
                  <option>Qua đêm</option>
                  <option>Dài hạn</option>
                </select>
              </div>
              <div className="flex items-center justify-between pl-4">
                <div className="flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#351a5b]">Khách</span>
                  <input
                    className="bg-transparent border-none focus:ring-0 p-0 text-slate-900 font-medium w-full"
                    min="1"
                    type="number"
                    defaultValue="1"
                  />
                </div>
                <button
                  className="bg-[#351a5b] text-white p-4 rounded-xl flex items-center justify-center hover:opacity-90 transition-opacity"
                  onClick={() => navigate("/search")}
                >
                  <span className="material-symbols-outlined">search</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="w-full flex justify-center py-8">
        <div className="w-full max-w-[1200px] px-4 lg:px-0">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-extrabold">Chỗ nghỉ nổi bật tại TP.HCM</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="group cursor-pointer">
              <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-200 mb-3">
                <img
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNZwdRYxvbSvmTZWKiFCL4NFJV0PJ8eG2Z-BYv-VFzFVIllkfMZ1T7Xb7Z2sLFaHOvGmRlWUzyHYXQ7js1e9hBX3PdtpB03d4fRvDrQfRdMiy60TrYNmbK1ubtXIXv-ST8Z5pA65OGmS5bzO_BlnSxR47eqN5n3Y1jENTVRYkmu30m5HA7ThSE95ZzYsWGHhVwXgjJmxFeCq9kzzsKe41c1tg6rcPth1F6mGPLcetzxPbRGCqtYfDBpZvUzwpOqDEcSrFrnuIRPRb-"
                  alt="CyberBox District 1"
                />
                <button className="absolute top-3 right-3 text-white drop-shadow-md hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined fill-0 hover:fill-1">favorite</span>
                </button>
              </div>
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-slate-900">CyberBox District 1</h3>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm fill-1 text-yellow-500">star</span>
                  <span className="text-sm font-medium">4.92</span>
                </div>
              </div>
              <p className="text-slate-500 text-sm">Quận 1, TP.HCM</p>
              <p className="mt-1 font-medium text-slate-900">
                <span className="font-bold">85.000đ</span> / giờ
              </p>
            </div>
            {/* Card 2 */}
            <div className="group cursor-pointer">
              <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-200 mb-3">
                <img
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAV4Xua8D_a7kmH0FjyqU7Bu9mbm4xUJpuEewLhQFJc5ly65qp9dRlRucJ8CkQRGeghbfeql0YKQxNgWAu0yNi4Xylh_KGzdOxypnLY2XBU5pzI1wMRftodtaEgZPuhB5FhbL3U_2QL41yTaZsTUzH08YHPWQ7Y9ksCFgUioQlZaAZUuFiGrLRiblqe3PtyxJfxG_TztnBrF2K1eGBpFM-68lDd96nqcV5ds22RJp1KGlAokxlHiQ7LH9HXkBFc4OfLV6vK65Ufn-vB"
                  alt="Zen Box Studio"
                />
                <button className="absolute top-3 right-3 text-white drop-shadow-md hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">favorite</span>
                </button>
              </div>
              <div className="flex justify-between items-start">
                <h3 className="font-bold">Zen Box Studio</h3>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm fill-1 text-yellow-500">star</span>
                  <span className="text-sm font-medium">4.85</span>
                </div>
              </div>
              <p className="text-slate-500 text-sm">Quận 3, TP.HCM</p>
              <p className="mt-1 font-medium">
                <span className="font-bold">60.000đ</span> / giờ
              </p>
            </div>
            {/* Card 3 */}
            <div className="group cursor-pointer">
              <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-200 mb-3">
                <img
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRJHJ9j3EBLXOu-H5uW5mINVa5krtnDn4H51LgrcckkGWSlt7SxAE3T0tDLZPtSwK0eIOX_-X1nGu-81aZLDuUhZOAr_lU2Z94MfpOTXtWD0tu7jrg4RDWBPN-6ZDfuUSdq5N2qiU2wuAw6v5BZYREltiYvPCsWKa6VgCk0JKf1UfCTViGm6F3_N8o7tA4Cyj2KLIegkjWTW0BPe1wFeD-y1hCD0swgn1qS9qTNTK9tO8Kj40feFqtOBT3XQE5it9NxTrfzX49vJOn"
                  alt="Sky Capsule Premium"
                />
                <button className="absolute top-3 right-3 text-white drop-shadow-md hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">favorite</span>
                </button>
              </div>
              <div className="flex justify-between items-start">
                <h3 className="font-bold">Sky Capsule Premium</h3>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm fill-1 text-yellow-500">star</span>
                  <span className="text-sm font-medium">4.98</span>
                </div>
              </div>
              <p className="text-slate-500 text-sm">Bình Thạnh, TP.HCM</p>
              <p className="mt-1 font-medium">
                <span className="font-bold">120.000đ</span> / giờ
              </p>
            </div>
            {/* Card 4 */}
            <div className="group cursor-pointer">
              <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-200 mb-3">
                <img
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBleAoZwgsQxm3xZ7oT346bbkjLqTDvBp4Qc9jrplxK4h9_ilbhZN-Q_sHRVDuvq95Mi_8QZPnDiNPtJycPqTwyuzZ7TfWMfOudmWSiaGTjHXu68vubHxfnEpWDPYYdYWysbvX4E3wXb33xwAvj2-QY__BHhXWZsLbXK2fN8iCgLl5-t7dxs84PQ31tRRkV_8T4dRL7s0cLaNAwyMPjGgty-QIrIZs_CkLau_8Ho_51sN0FK-T8dwzh34VE8-lIihe8fLTA7FprTFFR"
                  alt="Quiet Corner Small Room"
                />
                <button className="absolute top-3 right-3 text-white drop-shadow-md hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">favorite</span>
                </button>
              </div>
              <div className="flex justify-between items-start">
                <h3 className="font-bold">Quiet Corner Small Room</h3>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm fill-1 text-yellow-500">star</span>
                  <span className="text-sm font-medium">4.76</span>
                </div>
              </div>
              <p className="text-slate-500 text-sm">Quận 10, TP.HCM</p>
              <p className="mt-1 font-medium">
                <span className="font-bold">45.000đ</span> / giờ
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Promotion */}
      <section className="w-full flex justify-center py-12 mb-20">
        <div className="w-full max-w-[1200px] px-4 lg:px-0">
          <div className="bg-[#351a5b]/5 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-4">Tìm chỗ nghỉ trên bản đồ</h2>
              <p className="text-slate-600 mb-6 text-lg">
                Dễ dàng tìm thấy các sleepbox gần nhất với vị trí của bạn hoặc gần các địa điểm du lịch nổi tiếng tại TP.HCM.
              </p>
              <button
                className="bg-slate-900 text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg transition-all"
                onClick={() => navigate("/search")}
              >
                Xem bản đồ ngay
              </button>
            </div>
            <div className="w-full md:w-1/2 h-64 bg-slate-300 rounded-xl overflow-hidden shadow-md">
              <img
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDteMqZ-14_AlFTGqFE6uUsHAVp5ODRzNwIxAVVUuQUoQON5u-1OmMJNpK14xQKlgRbKFYR7iz0z_hqVKBwXeMGOvGxmZsRFwtOdMKNAPdxcVnbIsBR3KXk1Zslri4ncuOtanBxjNyLGTH0-5FPFsWCVLypI7B1KY7l8VqKFQlGruJpnL5TG7IVJO7Eg3-pkuKHfbQR_cpn2Awcq-Q_VUnfRzNvbHnOK8JahgZxHEiTOIoo3EhEqzEdz2EwTMNXZLmrk5TzGvA8kmNm"
                alt="Map view"
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;