import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full px-4 md:px-20 py-8">
        <div className="relative h-[500px] w-full overflow-hidden rounded-xl bg-[#351a5b]/10">
          <div
            className="absolute inset-0 bg-cover bg-center"
            data-alt="Modern high-tech sleepbox interior in Ho Chi Minh City"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.5)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuCkWMXevoCEHvZ-6QapflDGbL5i4rA6otVdE0_dvpsQw48OAfaoLPtqkMp5ooIDy5NXwlataGOIlYQ18vwjrjLUNYcgny8bcgEZdNqDHZKSt6pHuk4cLysR7IsFmzWtQy_90wPZkfa2BOljaUDbJVdJ7z9YbhdY1vUxsCcTcjhg14xdOpu2Ui1BWHE7YZqlgG4RYeUhsKRI8T9P3e9-fsrPMctnqPZQryNlApGxAKkZaOOXnWgOCCLPa9n2HJ2dCiG9Qep-HX_M55fq')",
            }}
          ></div>
          <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-white text-4xl md:text-6xl font-extrabold leading-tight tracking-tight max-w-3xl mb-4">
              Tìm chỗ nghỉ ngơi lý tưởng tại TP.HCM
            </h1>
            <p className="text-white/90 text-lg md:text-xl font-medium max-w-xl mb-8">
              Khám phá không gian riêng tư, tiện nghi và giá cả hợp lý ngay trung
              tâm thành phố.
            </p>
            <button 
              className="bg-[#351a5b] text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-xl"
              onClick={() => navigate('/search')}
            >
              Khám phá ngay
            </button>
          </div>
        </div>
        {/* Floating Search Bar */}
        <div className="relative -mt-12 mx-auto max-w-5xl px-4">
          <div className="bg-white p-4 rounded-2xl shadow-2xl border border-[#351a5b]/10 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div className="flex flex-col px-4 border-r border-slate-200">
              <span className="text-xs font-bold uppercase tracking-wider text-[#351a5b]">
                Địa điểm
              </span>
              <input
                className="bg-transparent border-none focus:ring-0 p-0 text-slate-900 placeholder:text-slate-400 font-medium"
                placeholder="Quận tại TP.HCM"
                type="text"
              />
            </div>
            <div className="flex flex-col px-4 border-r border-slate-200">
              <span className="text-xs font-bold uppercase tracking-wider text-[#351a5b]">
                Ngày nhận
              </span>
              <input
                className="bg-transparent border-none focus:ring-0 p-0 text-slate-900 font-medium"
                type="date"
              />
            </div>
            <div className="flex flex-col px-4 border-r border-slate-200">
              <span className="text-xs font-bold uppercase tracking-wider text-[#351a5b]">
                Thời lượng
              </span>
              <select className="bg-transparent border-none focus:ring-0 p-0 text-slate-900 font-medium cursor-pointer">
                <option>Theo giờ</option>
                <option>Qua đêm</option>
                <option>Dài hạn</option>
              </select>
            </div>
            <div className="flex items-center justify-between pl-4">
              <div className="flex flex-col">
                <span className="text-xs font-bold uppercase tracking-wider text-[#351a5b]">
                  Khách
                </span>
                <input
                  className="bg-transparent border-none focus:ring-0 p-0 text-slate-900 font-medium w-full"
                  min="1"
                  type="number"
                  defaultValue="1"
                />
              </div>
              <button 
                className="bg-[#351a5b] text-white p-4 rounded-xl flex items-center justify-center hover:opacity-90 transition-opacity"
                onClick={() => navigate('/search')}
              >
                <span className="material-symbols-outlined">search</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-6 md:px-20 py-12">
        <div className="flex items-center gap-10 overflow-x-auto pb-4 scrollbar-hide no-scrollbar">
          <div className="flex flex-col items-center gap-2 group cursor-pointer border-b-2 border-[#351a5b] pb-2 min-w-max">
            <span className="material-symbols-outlined text-2xl text-[#351a5b]">
              bed
            </span>
            <span className="text-sm font-bold text-slate-900">
              Sleepbox
            </span>
          </div>
          <div className="flex flex-col items-center gap-2 group cursor-pointer border-b-2 border-transparent hover:border-slate-300 pb-2 min-w-max opacity-60 hover:opacity-100 transition-all">
            <span className="material-symbols-outlined text-2xl">
              meeting_room
            </span>
            <span className="text-sm font-medium">Capsule Hotel</span>
          </div>
          <div className="flex flex-col items-center gap-2 group cursor-pointer border-b-2 border-transparent hover:border-slate-300 pb-2 min-w-max opacity-60 hover:opacity-100 transition-all">
            <span className="material-symbols-outlined text-2xl">
              hotel_class
            </span>
            <span className="text-sm font-medium">Small Room</span>
          </div>
          <div className="flex flex-col items-center gap-2 group cursor-pointer border-b-2 border-transparent hover:border-slate-300 pb-2 min-w-max opacity-60 hover:opacity-100 transition-all">
            <span className="material-symbols-outlined text-2xl">
              apartment
            </span>
            <span className="text-sm font-medium">Studio</span>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="px-6 md:px-20 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-extrabold">Chỗ nghỉ nổi bật tại TP.HCM</h2>
          <a
            className="text-[#351a5b] font-bold hover:underline flex items-center gap-1"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate('/search');
            }}
          >
            Xem tất cả{" "}
            <span className="material-symbols-outlined text-sm">
              chevron_right
            </span>
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="group cursor-pointer">
            <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-200 mb-3">
              <img
                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                data-alt="Cyberpunk style neon sleepbox room"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNZwdRYxvbSvmTZWKiFCL4NFJV0PJ8eG2Z-BYv-VFzFVIllkfMZ1T7Xb7Z2sLFaHOvGmRlWUzyHYXQ7js1e9hBX3PdtpB03d4fRvDrQfRdMiy60TrYNmbK1ubtXIXv-ST8Z5pA65OGmS5bzO_BlnSxR47eqN5n3Y1jENTVRYkmu30m5HA7ThSE95ZzYsWGHhVwXgjJmxFeCq9kzzsKe41c1tg6rcPth1F6mGPLcetzxPbRGCqtYfDBpZvUzwpOqDEcSrFrnuIRPRb-"
                alt="CyberBox District 1"
                referrerPolicy="no-referrer"
              />
              <button className="absolute top-3 right-3 text-white drop-shadow-md hover:scale-110 transition-transform">
                <span className="material-symbols-outlined fill-0 hover:fill-1">
                  favorite
                </span>
              </button>
            </div>
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-slate-900">
                CyberBox District 1
              </h3>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm fill-1 text-yellow-500">
                  star
                </span>
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
                data-alt="Minimalist wooden sleepbox design"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAV4Xua8D_a7kmH0FjyqU7Bu9mbm4xUJpuEewLhQFJc5ly65qp9dRlRucJ8CkQRGeghbfeql0YKQxNgWAu0yNi4Xylh_KGzdOxypnLY2XBU5pzI1wMRftodtaEgZPuhB5FhbL3U_2QL41yTaZsTUzH08YHPWQ7Y9ksCFgUioQlZaAZUuFiGrLRiblqe3PtyxJfxG_TztnBrF2K1eGBpFM-68lDd96nqcV5ds22RJp1KGlAokxlHiQ7LH9HXkBFc4OfLV6vK65Ufn-vB"
                alt="Zen Box Studio"
                referrerPolicy="no-referrer"
              />
              <button className="absolute top-3 right-3 text-white drop-shadow-md hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">favorite</span>
              </button>
            </div>
            <div className="flex justify-between items-start">
              <h3 className="font-bold">Zen Box Studio</h3>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm fill-1 text-yellow-500">
                  star
                </span>
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
                data-alt="Modern capsule hotel with clean white pods"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRJHJ9j3EBLXOu-H5uW5mINVa5krtnDn4H51LgrcckkGWSlt7SxAE3T0tDLZPtSwK0eIOX_-X1nGu-81aZLDuUhZOAr_lU2Z94MfpOTXtWD0tu7jrg4RDWBPN-6ZDfuUSdq5N2qiU2wuAw6v5BZYREltiYvPCsWKa6VgCk0JKf1UfCTViGm6F3_N8o7tA4Cyj2KLIegkjWTW0BPe1wFeD-y1hCD0swgn1qS9qTNTK9tO8Kj40feFqtOBT3XQE5it9NxTrfzX49vJOn"
                alt="Sky Capsule Premium"
                referrerPolicy="no-referrer"
              />
              <button className="absolute top-3 right-3 text-white drop-shadow-md hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">favorite</span>
              </button>
            </div>
            <div className="flex justify-between items-start">
              <h3 className="font-bold">Sky Capsule Premium</h3>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm fill-1 text-yellow-500">
                  star
                </span>
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
                data-alt="Cozy small room with desk and single bed"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBleAoZwgsQxm3xZ7oT346bbkjLqTDvBp4Qc9jrplxK4h9_ilbhZN-Q_sHRVDuvq95Mi_8QZPnDiNPtJycPqTwyuzZ7TfWMfOudmWSiaGTjHXu68vubHxfnEpWDPYYdYWysbvX4E3wXb33xwAvj2-QY__BHhXWZsLbXK2fN8iCgLl5-t7dxs84PQ31tRRkV_8T4dRL7s0cLaNAwyMPjGgty-QIrIZs_CkLau_8Ho_51sN0FK-T8dwzh34VE8-lIihe8fLTA7FprTFFR"
                alt="Quiet Corner Small Room"
                referrerPolicy="no-referrer"
              />
              <button className="absolute top-3 right-3 text-white drop-shadow-md hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">favorite</span>
              </button>
            </div>
            <div className="flex justify-between items-start">
              <h3 className="font-bold">Quiet Corner Small Room</h3>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm fill-1 text-yellow-500">
                  star
                </span>
                <span className="text-sm font-medium">4.76</span>
              </div>
            </div>
            <p className="text-slate-500 text-sm">Quận 10, TP.HCM</p>
            <p className="mt-1 font-medium">
              <span className="font-bold">45.000đ</span> / giờ
            </p>
          </div>
        </div>
      </section>

      {/* Map Promotion */}
      <section className="px-6 md:px-20 py-12 mb-20">
        <div className="bg-[#351a5b]/5 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4">Tìm chỗ nghỉ trên bản đồ</h2>
            <p className="text-slate-600 mb-6 text-lg">
              Dễ dàng tìm thấy các sleepbox gần nhất với vị trí của bạn hoặc gần
              các địa điểm du lịch nổi tiếng tại TP.HCM.
            </p>
            <button 
              className="bg-slate-900 text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg transition-all"
              onClick={() => navigate('/search')}
            >
              Xem bản đồ ngay
            </button>
          </div>
          <div className="w-full md:w-1/2 h-64 bg-slate-300 rounded-xl overflow-hidden border-4 border-white shadow-xl">
            <img
              className="w-full h-full object-cover"
              data-alt="Map view of Ho Chi Minh City streets"
              data-location="Ho Chi Minh City"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDteMqZ-14_AlFTGqFE6uUsHAVp5ODRzNwIxAVVUuQUoQON5u-1OmMJNpK14xQKlgRbKFYR7iz0z_hqVKBwXeMGOvGxmZsRFwtOdMKNAPdxcVnbIsBR3KXk1Zslri4ncuOtanBxjNyLGTH0-5FPFsWCVLypI7B1KY7l8VqKFQlGruJpnL5TG7IVJO7Eg3-pkuKHfbQR_cpn2Awcq-Q_VUnfRzNvbHnOK8JahgZxHEiTOIoo3EhEqzEdz2EwTMNXZLmrk5TzGvA8kmNm"
              alt="Map view"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
