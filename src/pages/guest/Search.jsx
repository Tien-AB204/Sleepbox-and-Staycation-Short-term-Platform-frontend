import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  console.log("Search component rendering...");
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#f7f6f8] text-slate-900 font-sans">
      {/* Header / Navigation Bar */}
      <header className="sticky top-0 z-50 bg-white border-b border-[#351a5b]/10 px-4 md:px-10 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-8 shrink-0">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-[#351a5b] cursor-pointer">
            <div className="w-8 h-8 bg-[#351a5b] rounded-lg flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-2xl">door_front</span>
            </div>
            <h2 className="text-xl font-bold leading-tight tracking-tight hidden sm:block">
              BoxHub
            </h2>
          </Link>
        </div>
        {/* Search Bar */}
        <div className="flex-1 max-w-2xl hidden md:flex items-center border border-[#351a5b]/10 rounded-full shadow-sm hover:shadow-md transition bg-white h-12 px-2">
          <button className="flex-1 px-4 text-left border-r border-[#351a5b]/10">
            <p className="text-[10px] font-bold uppercase text-[#351a5b]">
              Địa điểm
            </p>
            <p className="text-sm text-slate-500 truncate">Hồ Chí Minh</p>
          </button>
          <button className="flex-1 px-4 text-left border-r border-[#351a5b]/10">
            <p className="text-[10px] font-bold uppercase text-[#351a5b]">
              Thời gian
            </p>
            <p className="text-sm text-slate-500 truncate">Thêm ngày/giờ</p>
          </button>
          <button className="flex-1 px-4 text-left">
            <p className="text-[10px] font-bold uppercase text-[#351a5b]">
              Khách
            </p>
            <p className="text-sm text-slate-500 truncate">Thêm khách</p>
          </button>
          <button className="bg-[#351a5b] text-white p-2 rounded-full flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-xl">search</span>
          </button>
        </div>
        {/* User Menu */}
        <div className="flex items-center gap-4 shrink-0">
          <button className="hidden lg:block text-sm font-semibold hover:bg-[#351a5b]/5 px-4 py-2 rounded-full">
            Đăng ký chủ nhà
          </button>
          <div className="flex items-center gap-2 border border-[#351a5b]/10 rounded-full p-1 pl-3 hover:shadow-md transition cursor-pointer bg-white">
            <span className="material-symbols-outlined text-slate-600">
              menu
            </span>
            <div className="w-8 h-8 rounded-full bg-[#351a5b]/20 flex items-center justify-center overflow-hidden">
              <img
                alt="User"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhDVYjECXaCN5xvH3pseq8ZRDXRkcgtK0sYgqAv3F5CmrRapN0H93YoZkLSMYNZJhj6daVXmKhXMM9fEP8-DRsALV6YBoCkmKLWCJafCgA2xFIGp_41wpkhjTW6kKenyAjW5xCAu3fZcF8RSaPtS5OuRtjVSp2FIa6_hxdRLoZArSLX54l5yFKe9-0Zer1BRDklmG54sPiafr38Jn_v_zb2ONzhIz0jm2ovxRpcaEdPtjTn4-SM09_yZTTWjYiDNFNwB1p7k4DlBYZ"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </header>
      {/* Filter Bar */}
      <div className="sticky top-[73px] z-40 bg-white border-b border-[#351a5b]/10 px-4 md:px-10 py-3 flex items-center gap-3 overflow-x-auto hide-scrollbar">
        <button className="flex items-center gap-2 px-4 py-2 border border-[#351a5b]/20 rounded-xl bg-white text-sm font-medium whitespace-nowrap">
          <span>Khoảng giá</span>
          <span className="material-symbols-outlined text-lg">expand_more</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 border border-[#351a5b]/20 rounded-xl bg-white text-sm font-medium whitespace-nowrap">
          <span>Loại Box</span>
          <span className="material-symbols-outlined text-lg">expand_more</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 border border-[#351a5b]/20 rounded-xl bg-white text-sm font-medium whitespace-nowrap">
          <span>Tiện nghi</span>
          <span className="material-symbols-outlined text-lg">expand_more</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 border border-[#351a5b]/20 rounded-xl bg-white text-sm font-medium whitespace-nowrap">
          <span>Đặt ngay</span>
          <span className="material-symbols-outlined text-lg">bolt</span>
        </button>
        <div className="h-6 w-[1px] bg-[#351a5b]/10 mx-2"></div>
        <button className="flex items-center gap-2 px-4 py-2 border border-[#351a5b]/20 rounded-xl bg-white text-sm font-medium whitespace-nowrap">
          <span className="material-symbols-outlined text-lg">tune</span>
          <span>Bộ lọc khác</span>
        </button>
      </div>
      {/* Main Content (Split Screen) */}
      <main className="flex flex-1 overflow-hidden">
        {/* Left Side: List of Results */}
        <section className="w-full lg:w-[60%] xl:w-[55%] h-[calc(100vh-140px)] overflow-y-auto px-4 md:px-10 py-6 hide-scrollbar">
          <div className="mb-6">
            <p className="text-sm text-slate-500 mb-1">
              Hơn 300 chỗ nghỉ tại TP. Hồ Chí Minh
            </p>
            <h1 className="text-2xl font-bold">
              Sleepboxes tại Quận 1 và lân cận
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Listing Card 1 */}
            <div 
              className="group cursor-pointer"
              onClick={() => navigate('/room/1')}
            >
              <div className="relative aspect-square overflow-hidden rounded-xl mb-3">
                <img
                  alt="CyberBox"
                  className="object-cover w-full h-full group-hover:scale-105 transition duration-300"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAirbnfp84pQx1xOoRJhvc9bIqT4iUg0WkxuSbYLPRGCPSzWqNuYqYMc2dnj6ZVZ7faEtsswkHWwOHgIOiSZw-Bkw_FyM4XfyYbUmznWcAXGIGFGb67meUawvtVky86UALMgHjvsoxrti3zfL3AM7pyOCjf55zd3ciCdyyNZw5BH-q-rhlmNbBvGEbryHOQR8oLoEzlB_BZoHO8SrP-NIEQeHLw2N9ducex6Xz4VIvF4QlyTdHL-LpnJ24DRwKBsbR7q5E3RR2wGYli"
                  referrerPolicy="no-referrer"
                />
                <button className="absolute top-3 right-3 text-white drop-shadow-md hover:scale-110 transition">
                  <span className="material-symbols-outlined">
                    favorite
                  </span>
                </button>
                <div className="absolute bottom-3 left-3 bg-white/90 px-2 py-1 rounded text-[10px] font-bold text-[#351a5b] uppercase">
                  Chủ nhà siêu cấp
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-bold text-base truncate">
                    CyberBox Quận 1 - Premium Pod
                  </h3>
                  <p className="text-slate-500 text-sm">
                    Cách chợ Bến Thành 500m
                  </p>
                  <p className="text-slate-500 text-sm mt-1">
                    Sẵn sàng lúc 14:00
                  </p>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="font-bold text-[#351a5b]">85.000đ</span>
                    <span className="text-slate-500 text-xs">/ giờ</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <span className="material-symbols-outlined text-sm text-yellow-500">
                    star
                  </span>
                  <span className="text-sm font-medium">4.92</span>
                </div>
              </div>
            </div>
            {/* Listing Card 2 */}
            <div 
              className="group cursor-pointer"
              onClick={() => navigate('/room/2')}
            >
              <div className="relative aspect-square overflow-hidden rounded-xl mb-3">
                <img
                  alt="EcoBox"
                  className="object-cover w-full h-full group-hover:scale-105 transition duration-300"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBPUwPSUHADAP35qoDdnBJOcgtByvHrJ0u5x-TkSPFH7oZLEl_UBdLHe8dqm3CmR1o7MFPGgnmdVfP9l36gEMaF0gmjUAMKPh6lqoAzmrESMafEhE66SQnqB2wghSHuMmW_7nIVkBCHjAxpZvGUEWQ1byq8QLF5m-bpFdXeqtqP8KnPjyzEGIVPrTC_dsEMbWRsTObI4HsLaAEk4XBjDuPwU0hdjTg-ehxIxvmLTW3_QmeRJxD7GDdpRVRomCATImZNgqsALlkV7Lh"
                  referrerPolicy="no-referrer"
                />
                <button className="absolute top-3 right-3 text-white drop-shadow-md hover:scale-110 transition">
                  <span className="material-symbols-outlined">
                    favorite
                  </span>
                </button>
              </div>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-bold text-base truncate">
                    EcoBox Bình Thạnh - Cozy Corner
                  </h3>
                  <p className="text-slate-500 text-sm">Gần Landmark 81</p>
                  <p className="text-slate-500 text-sm mt-1">Có cửa sổ trời</p>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="font-bold text-[#351a5b]">70.000đ</span>
                    <span className="text-slate-500 text-xs">/ giờ</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <span className="material-symbols-outlined text-sm text-yellow-500">
                    star
                  </span>
                  <span className="text-sm font-medium">4.85</span>
                </div>
              </div>
            </div>
            {/* Listing Card 3 */}
            <div 
              className="group cursor-pointer"
              onClick={() => navigate('/room/3')}
            >
              <div className="relative aspect-square overflow-hidden rounded-xl mb-3">
                <img
                  alt="ZenBox"
                  className="object-cover w-full h-full group-hover:scale-105 transition duration-300"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJQ2rhbXESc6EotFx6P3O33HBKLCn06t9So5wO2Ym-pT35wOiHRtII-aEHPuly4Ks6EViRrVscEiHg7mpwop0KkjiqYu-X5BXqp4gKGCeKc3ouR23ajIXEt1qLstv3iGaB1kVxSBpHpBQy5tvmDyAC3VmZc8dc2t0U5hAHm0F5oDKKXUfYw8mK9TnKtTUpGucmECxSZm1Vuhk2JiDrrTOIHyL7-185iL-1_adFsERaNuhZc6A2PhxQSJKlIrrZ1vQdI9ryPt5eo1Kj"
                  referrerPolicy="no-referrer"
                />
                <button className="absolute top-3 right-3 text-white drop-shadow-md hover:scale-110 transition">
                  <span className="material-symbols-outlined">
                    favorite
                  </span>
                </button>
              </div>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-bold text-base truncate">
                    ZenBox Quận 3 - Quiet Zone
                  </h3>
                  <p className="text-slate-500 text-sm">
                    Hẻm yên tĩnh Lê Văn Sỹ
                  </p>
                  <p className="text-slate-500 text-sm mt-1">Cách âm cực tốt</p>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="font-bold text-[#351a5b]">65.000đ</span>
                    <span className="text-slate-500 text-xs">/ giờ</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <span className="material-symbols-outlined text-sm text-yellow-500">
                    star
                  </span>
                  <span className="text-sm font-medium">4.78</span>
                </div>
              </div>
            </div>
            {/* Listing Card 4 */}
            <div 
              className="group cursor-pointer"
              onClick={() => navigate('/room/4')}
            >
              <div className="relative aspect-square overflow-hidden rounded-xl mb-3">
                <img
                  alt="SkyBox"
                  className="object-cover w-full h-full group-hover:scale-105 transition duration-300"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLKJCUcJj4M1zC9t83Qtna_sb0-9iNgsSnzBSNFgX78YEbGl5RCcWvvK3itlYhA8P6d84eFxTtjzKJrSsKvF23YGNyaS14CmuNqR-UfPOyieswtMX-gTUMf1QPfaKxv13U76u6QbQxxZVfSfIo-uHZ2pR6iyicANDFPTk3NlqPk1qBLFvIeyerwawyYC3dyXqUgUa2ttj5M8WOxz3l6QWWQDk8l-0kpYl-RSvxjyJoiuZoyGgVuh1FKFvI0kYXuq5K_v9G-pY37Tgc"
                  referrerPolicy="no-referrer"
                />
                <button className="absolute top-3 right-3 text-white drop-shadow-md hover:scale-110 transition">
                  <span className="material-symbols-outlined">
                    favorite
                  </span>
                </button>
                <div className="absolute top-3 left-3 bg-[#351a5b] text-white px-2 py-1 rounded text-[10px] font-bold uppercase">
                  Mới
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-bold text-base truncate">
                    SkyBox Quận 4 - River View
                  </h3>
                  <p className="text-slate-500 text-sm">Nhìn ra sông Sài Gòn</p>
                  <p className="text-slate-500 text-sm mt-1">Full tiện ích</p>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="font-bold text-[#351a5b]">95.000đ</span>
                    <span className="text-slate-500 text-xs">/ giờ</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <span className="material-symbols-outlined text-sm text-yellow-500">
                    star
                  </span>
                  <span className="text-sm font-medium">5.0</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Right Side: Interactive Map */}
        <section className="hidden lg:block flex-1 relative bg-slate-200">
          {/* Map Background */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            data-alt="Stylized city map of Ho Chi Minh City with pin markers"
            data-location="Ho Chi Minh City"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAz25RI7mYhyjyoKyUIzusxonlPhTp7q0lg5JTAvJrm5Vhn0qOQ5SStFxfFmREjqkjw61cP-drWGQY-T8niksZyVJberihONFmyzugHmEj8kDvH-XfoAGioNWGpM48nHdE9rD02OksC6aObfUsIMwRk9bgG8a1pYM4L8Ot2Tj6_RhU_2H-uYwvzJO8m_Q7yuGrwxjInHrzjOKLVcny-cy3gQWROUS7PReMlsy4DmC-rhFyXl5pKHaflhYU6sg_GFV-a7ro4u10oigib')",
            }}
          >
            {/* Price Pins (Simulated) */}
            <div className="absolute top-[30%] left-[40%] bg-white px-3 py-1.5 rounded-full shadow-lg border border-[#351a5b]/20 cursor-pointer hover:scale-110 transition-transform flex items-center gap-1 group">
              <span className="text-sm font-bold group-hover:text-[#351a5b]">
                85k
              </span>
            </div>
            <div className="absolute top-[45%] left-[55%] bg-[#351a5b] text-white px-3 py-1.5 rounded-full shadow-lg border border-[#351a5b]/20 cursor-pointer hover:scale-110 transition-transform flex items-center gap-1">
              <span className="text-sm font-bold">70k</span>
            </div>
            <div className="absolute top-[25%] left-[65%] bg-white px-3 py-1.5 rounded-full shadow-lg border border-[#351a5b]/20 cursor-pointer hover:scale-110 transition-transform flex items-center gap-1">
              <span className="text-sm font-bold">65k</span>
            </div>
            <div className="absolute top-[60%] left-[35%] bg-white px-3 py-1.5 rounded-full shadow-lg border border-[#351a5b]/20 cursor-pointer hover:scale-110 transition-transform flex items-center gap-1">
              <span className="text-sm font-bold">95k</span>
            </div>
            <div className="absolute top-[15%] left-[25%] bg-white px-3 py-1.5 rounded-full shadow-lg border border-[#351a5b]/20 cursor-pointer hover:scale-110 transition-transform flex items-center gap-1">
              <span className="text-sm font-bold">120k</span>
            </div>
          </div>
          {/* Map Controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <button className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-slate-50 transition">
              <span className="material-symbols-outlined text-slate-700">
                add
              </span>
            </button>
            <button className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-slate-50 transition">
              <span className="material-symbols-outlined text-slate-700">
                remove
              </span>
            </button>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <button className="bg-[#351a5b] text-white px-6 py-2.5 rounded-full shadow-2xl flex items-center gap-2 hover:bg-[#351a5b]/90 transition text-sm font-bold">
              <span className="material-symbols-outlined text-lg">layers</span>
              <span>Dạng danh sách</span>
            </button>
          </div>
        </section>
      </main>
      {/* Mobile Bottom Nav */}
      <footer className="md:hidden fixed bottom-0 w-full bg-white border-t border-[#351a5b]/10 px-6 py-2 flex justify-between items-center z-50">
        <div className="flex flex-col items-center text-[#351a5b]">
          <span className="material-symbols-outlined">search</span>
          <span className="text-[10px] font-medium">Khám phá</span>
        </div>
        <div className="flex flex-col items-center text-slate-400">
          <span className="material-symbols-outlined">favorite</span>
          <span className="text-[10px] font-medium">Yêu thích</span>
        </div>
        <div className="flex flex-col items-center text-slate-400">
          <span className="material-symbols-outlined">travel</span>
          <span className="text-[10px] font-medium">Chỗ nghỉ</span>
        </div>
        <div className="flex flex-col items-center text-slate-400">
          <span className="material-symbols-outlined">account_circle</span>
          <span className="text-[10px] font-medium">Hồ sơ</span>
        </div>
      </footer>
    </div>
  );
};

export default Search;
