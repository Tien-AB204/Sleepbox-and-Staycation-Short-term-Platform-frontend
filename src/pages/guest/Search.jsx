import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import boxHubLogo from "../../assets/images/logo.png";
import { useAuthContext } from "../../contexts/AuthContext";
import AuthModal from "../auth/AuthModal";

// 1. DỮ LIỆU MẪU (DATA)
const FILTER_DATA = {
  popular: [
    "Có bữa sáng",
    "4-5 sao giá tốt",
    "Vị trí thuận tiện",
    "Được yêu thích nhất",
    "5 sao",
    "4 sao",
    "Thanh toán tại chỗ",
  ],
  areas: [
    "Thành phố Thủ Đức",
    "Quận 1",
    "Quận 3",
    "Quận 4",
    "Quận 5",
    "Quận 6",
    "Quận 7",
    "Quận 8",
    "Quận 10",
    "Quận 11",
    "Quận 12",
    "Quận Phú Nhuận",
    "Quận Bình Thạnh",
    "Quận Gò Vấp",
    "Quận Tân Bình",
    "Quận Bình Tân",
    "Quận Tân Phú",
  ],
  amenities: [
    "Khu vực ăn uống",
    "Quầy lễ tân",
    "Bãi gửi xe",
    "Dịch vụ giặt ủi",
    "Khu vực hút thuốc",
    "Dịch vụ lưu trữ",
    "Thang máy",
    "Dịch vụ dọn phòng",
    "Đội ngũ nhân viên đa ngôn ngữ",
    "Cho phép vật nuôi",
    "Tiện nghi cho trẻ",
    "Không khói thuốc",
    "Tủ khoá",
    "Dịch vụ trả phòng muộn",
  ],
  unique: [
    "Khu vực cafe/ đọc sách/ thư viện",
    "Quầy tự phục vụ nước uống",
    "Trải nghiệm ẩm thực",
    "Gần Công viên chủ đề",
  ],
  roomAmenities: [
    "Máy lạnh",
    "Dụng cụ vệ sinh cá nhân",
    "Phòng hút thuốc",
    "Tủ lạnh chung",
    "Khu vực vệ sinh chung",
  ],
};

const ROOM_DATA = [
  {
    id: 1,
    title: "CyberBox Quận 1 - Premium Pod",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAirbnfp84pQx1xOoRJhvc9bIqT4iUg0WkxuSbYLPRGCPSzWqNuYqYMc2dnj6ZVZ7faEtsswkHWwOHgIOiSZw-Bkw_FyM4XfyYbUmznWcAXGIGFGb67meUawvtVky86UALMgHjvsoxrti3zfL3AM7pyOCjf55zd3ciCdyyNZw5BH-q-rhlmNbBvGEbryHOQR8oLoEzlB_BZoHO8SrP-NIEQeHLw2N9ducex6Xz4VIvF4QlyTdHL-LpnJ24DRwKBsbR7q5E3RR2wGYli",
    badge: "MỚI",
    rating: 4.92,
    reviews: 128,
    location: "Phường Bến Thành, Quận 1",
    amenities: ["Wifi miễn phí", "Điều hòa"],
    freeCancel: true,
    price: "85.000",
    isOutlineBtn: false,
  },
  {
    id: 2,
    title: "EcoBox Bình Thạnh - Cozy Corner",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCBPUwPSUHADAP35qoDdnBJOcgtByvHrJ0u5x-TkSPFH7oZLEl_UBdLHe8dqm3CmR1o7MFPGgnmdVfP9l36gEMaF0gmjUAMKPh6lqoAzmrESMafEhE66SQnqB2wghSHuMmW_7nIVkBCHjAxpZvGUEWQ1byq8QLF5m-bpFdXeqtqP8KnPjyzEGIVPrTC_dsEMbWRsTObI4HsLaAEk4XBjDuPwU0hdjTg-ehxIxvmLTW3_QmeRJxD7GDdpRVRomCATImZNgqsALlkV7Lh",
    rating: 4.85,
    reviews: 85,
    location: "Phường 22, Bình Thạnh",
    amenities: ["Gần Landmark 81", "Cửa sổ trời"],
    price: "70.000",
    isOutlineBtn: false,
  },
  {
    id: 3,
    title: "ZenBox Quận 3 - Quiet Zone",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJQ2rhbXESc6EotFx6P3O33HBKLCn06t9So5wO2Ym-pT35wOiHRtII-aEHPuly4Ks6EViRrVscEiHg7mpwop0KkjiqYu-X5BXqp4gKGCeKc3ouR23ajIXEt1qLstv3iGaB1kVxSBpHpBQy5tvmDyAC3VmZc8dc2t0U5hAHm0F5oDKKXUfYw8mK9TnKtTUpGucmECxSZm1Vuhk2JiDrrTOIHyL7-185iL-1_adFsERaNuhZc6A2PhxQSJKlIrrZ1vQdI9ryPt5eo1Kj",
    rating: 4.78,
    reviews: 42,
    location: "Lê Văn Sỹ, Quận 3",
    amenities: ["Cách âm cực tốt", "Yên tĩnh"],
    price: "65.000",
    isOutlineBtn: true,
  }
];

// ==========================================
// 2. SUB-COMPONENTS
// ==========================================
const FilterBlock = ({ title, items }) => (
  <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
    <h3 className="font-bold text-slate-900 mb-4">{title}</h3>
    <div className="space-y-3 max-h-[160px] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
      {items.map((item, index) => (
        <label key={index} className="flex items-center gap-3 cursor-pointer group">
          <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-[#351a5b] focus:ring-[#351a5b] cursor-pointer" />
          <span className="text-sm text-slate-700 group-hover:text-slate-900">{item}</span>
        </label>
      ))}
    </div>
  </div>
);

const RoomCard = ({ room, viewMode, navigate }) => {
  const isList = viewMode === "list";

  return (
    <div className={`bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 ${isList ? "flex flex-col sm:flex-row" : "flex flex-col h-full"}`}>
      <div 
        className={`relative cursor-pointer shrink-0 ${isList ? "w-full sm:w-[260px] h-[200px] sm:h-auto" : "w-full aspect-[4/3]"}`} 
        onClick={() => navigate(`/room/${room.id}`)}
      >
        <img src={room.image} alt="Room" className="w-full h-full object-cover" />
        {room.badge && (
          <div className="absolute top-2 left-2 bg-[#351a5b] text-white text-[10px] font-bold px-2 py-1 rounded">{room.badge}</div>
        )}
      </div>

      <div className={`flex-1 flex flex-col justify-between cursor-pointer ${isList ? "p-5" : "p-4"}`} onClick={() => navigate(`/room/${room.id}`)}>
        <div>
          <div className="flex justify-between items-start">
            <h2 className="text-lg font-bold text-slate-900 line-clamp-2 pr-2">{room.title}</h2>
            <div className="flex flex-col items-end shrink-0">
              <div className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded font-bold text-sm">
                <span className="material-symbols-outlined text-sm">star</span> {room.rating}
              </div>
              <span className="text-[10px] text-slate-500 mt-1">({room.reviews} đánh giá)</span>
            </div>
          </div>
          <p className="text-sm text-slate-500 mt-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">location_on</span> {room.location}
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {room.amenities.map((am, i) => (
              <span key={i} className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded">{am}</span>
            ))}
            {room.freeCancel && (
              <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px]">check</span> Hủy miễn phí
              </span>
            )}
          </div>
        </div>
      </div>

      <div className={`bg-slate-50 border-slate-200 flex flex-col justify-end items-end text-right ${isList ? "w-full sm:w-[220px] shrink-0 border-t sm:border-t-0 sm:border-l p-5" : "w-full border-t p-4 mt-auto"}`}>
        <p className="text-xl font-extrabold text-[#351a5b]">{room.price} VND</p>
        <p className="text-xs text-slate-500 mb-4">/ mỗi giờ</p>
        <button 
          className={`w-full font-bold py-2 rounded-lg transition-colors shadow-sm ${room.isOutlineBtn ? "border-2 border-[#351a5b] text-[#351a5b] hover:bg-[#351a5b] hover:text-white" : "bg-[#351a5b] text-white hover:bg-[#2a1447]"}`}
          onClick={() => navigate(`/room/${room.id}`)}
        >
          Chọn phòng
        </button>
      </div>
    </div>
  );
};

const MapViewPlaceholder = ({ onClose }) => (
  <div className="w-full relative h-[calc(100vh-140px)] bg-slate-200 overflow-hidden">
    <button 
      onClick={onClose}
      className="absolute top-4 left-4 z-20 bg-white px-4 py-2 rounded-lg shadow-md font-bold text-sm flex items-center gap-2 hover:bg-slate-50 transition text-slate-700"
    >
      <span className="material-symbols-outlined text-lg">arrow_back</span>
      Quay lại danh sách
    </button>
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAz25RI7mYhyjyoKyUIzusxonlPhTp7q0lg5JTAvJrm5Vhn0qOQ5SStFxfFmREjqkjw61cP-drWGQY-T8niksZyVJberihONFmyzugHmEj8kDvH-XfoAGioNWGpM48nHdE9rD02OksC6aObfUsIMwRk9bgG8a1pYM4L8Ot2Tj6_RhU_2H-uYwvzJO8m_Q7yuGrwxjInHrzjOKLVcny-cy3gQWROUS7PReMlsy4DmC-rhFyXl5pKHaflhYU6sg_GFV-a7ro4u10oigib')" }}
    >
      <div className="absolute top-[30%] left-[40%] bg-[#351a5b] text-white px-3 py-1.5 rounded-full shadow-lg border border-white cursor-pointer hover:scale-110 transition-transform flex items-center gap-1">
        <span className="text-sm font-bold">85.000 VND</span>
      </div>
      <div className="absolute top-[45%] left-[55%] bg-white text-[#351a5b] px-3 py-1.5 rounded-full shadow-lg border border-[#351a5b] cursor-pointer hover:scale-110 transition-transform flex items-center gap-1">
        <span className="text-sm font-bold">70.000 VND</span>
      </div>
      <div className="absolute top-[25%] left-[65%] bg-white text-[#351a5b] px-3 py-1.5 rounded-full shadow-lg border border-[#351a5b] cursor-pointer hover:scale-110 transition-transform flex items-center gap-1">
        <span className="text-sm font-bold">65.000 VND</span>
      </div>
    </div>
  </div>
);

// ==========================================
// 3. MAIN COMPONENT (SEARCH PAGE)
// ==========================================
const Search = () => {
  const navigate = useNavigate();
  
  // Các state của trang Search
  const [viewMode, setViewMode] = useState("list");
  const [showMap, setShowMap] = useState(false);
  
  // TÍCH HỢP CONTEXT VÀ STATE TỪ GUESTLAYOUT SANG
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
    <div className="relative flex min-h-screen flex-col bg-[#f7f6f8] text-slate-900 font-sans">
      
      {/* HEADER ĐƯỢC ĐỒNG BỘ 100% TỪ GUESTLAYOUT */}
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
          
          <div className="flex items-center gap-1 sm:gap-2">

            <button className="p-2 hover:bg-slate-100 rounded-full transition-colors hidden sm:block text-slate-700">
              <span className="material-symbols-outlined text-[20px]">language</span>
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

                {isMenuOpen && (
                  <div className="absolute top-[calc(100%+12px)] right-0 w-[320px] bg-white rounded-2xl shadow-[0_8px_28px_rgba(0,0,0,0.15)] border border-slate-200 py-2 z-50 flex flex-col text-sm text-slate-700 font-medium overflow-hidden">
                    <Link to="/history" className="px-5 py-3 hover:bg-slate-50 transition-colors flex items-center gap-3 font-medium text-slate-700">
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
                    
                    <Link to="/host/dashboard" className="px-5 py-4 hover:bg-slate-50 transition-colors flex items-center justify-between group">
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

      {/* SUB-HEADER */}
      <div className="bg-[#351a5b] w-full flex justify-center py-4 shadow-md">
        <div className="w-full max-w-[1200px] px-4 lg:px-0 flex flex-col md:flex-row gap-4">
          <div className="flex-1 bg-white rounded-lg p-3 flex items-center gap-3">
            <span className="material-symbols-outlined text-slate-400">location_on</span>
            <div className="flex flex-col">
              <span className="text-xs text-slate-500">Thành phố, địa điểm</span>
              <span className="text-sm font-bold">Hồ Chí Minh City</span>
            </div>
          </div>
          <div className="flex-1 bg-white rounded-lg p-3 flex items-center gap-3">
            <span className="material-symbols-outlined text-slate-400">calendar_month</span>
            <div className="flex flex-col">
              <span className="text-xs text-slate-500">Ngày nhận phòng</span>
              <span className="text-sm font-bold">20 Thg 3 - 21 Thg 3</span>
            </div>
          </div>
          <div className="flex-1 bg-white rounded-lg p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-slate-400">person</span>
              <div className="flex flex-col">
                <span className="text-xs text-slate-500">Khách</span>
                <span className="text-sm font-bold">1 Người lớn, 1 Phòng</span>
              </div>
            </div>
            <button className="bg-slate-900 text-white p-2 rounded-lg hover:bg-slate-800">
              <span className="material-symbols-outlined">search</span>
            </button>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT HOẶC MAP VIEW */}
      {showMap ? (
        <MapViewPlaceholder onClose={() => setShowMap(false)} />
      ) : (
        <main className="w-full flex justify-center py-8">
          <div className="w-full max-w-[1200px] px-4 lg:px-0 flex flex-col md:flex-row gap-8">
            
            <aside className="w-full md:w-[280px] shrink-0 space-y-6">
              <div className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm relative h-32 flex items-center justify-center cursor-pointer group" onClick={() => setShowMap(true)}>
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAz25RI7mYhyjyoKyUIzusxonlPhTp7q0lg5JTAvJrm5Vhn0qOQ5SStFxfFmREjqkjw61cP-drWGQY-T8niksZyVJberihONFmyzugHmEj8kDvH-XfoAGioNWGpM48nHdE9rD02OksC6aObfUsIMwRk9bgG8a1pYM4L8Ot2Tj6_RhU_2H-uYwvzJO8m_Q7yuGrwxjInHrzjOKLVcny-cy3gQWROUS7PReMlsy4DmC-rhFyXl5pKHaflhYU6sg_GFV-a7ro4u10oigib" alt="Map" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform" />
                <button className="pointer-events-none relative z-10 bg-slate-900 text-white px-4 py-2 rounded-full font-bold text-sm shadow-md flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">map</span> Xem trên bản đồ
                </button>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-slate-900">Khoảng giá</h3>
                  <span className="text-[#351a5b] text-sm cursor-pointer hover:underline">Đặt lại</span>
                </div>
                <p className="text-xs text-slate-500 mb-4">Mỗi giờ</p>
                <input type="range" min="0" max="100" className="w-full accent-[#351a5b]" />
                <div className="flex justify-between items-center mt-4 text-sm font-medium">
                  <div className="border border-slate-300 rounded px-2 py-1">0đ</div>
                  <span>-</span>
                  <div className="border border-slate-300 rounded px-2 py-1">500.000đ+</div>
                </div>
              </div>

              <FilterBlock title="Lọc phổ biến" items={FILTER_DATA.popular} />
              <FilterBlock title="Khu vực" items={FILTER_DATA.areas} />
              <FilterBlock title="Tiện nghi chỗ nghỉ" items={FILTER_DATA.amenities} />
              <FilterBlock title="Trải nghiệm độc đáo" items={FILTER_DATA.unique} />
              <FilterBlock title="Tiện nghi phòng" items={FILTER_DATA.roomAmenities} />
            </aside>

            <section className="flex-1 space-y-4 overflow-hidden">
              <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end mb-6 gap-4">
                <div>
                  <h1 className="text-xl font-bold text-slate-900">Sleepbox tại Hồ Chí Minh</h1>
                  <p className="text-sm text-slate-500">Hơn 300 chỗ nghỉ được tìm thấy</p>
                </div>
                <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#351a5b]">Xem:</span>
                    <div className="flex items-center bg-white rounded-full p-1 border border-slate-200 shadow-sm">
                      <button 
                        onClick={() => setViewMode("grid")}
                        className={`rounded-full p-1.5 flex items-center justify-center transition-colors ${viewMode === "grid" ? "bg-[#f0f5ff] text-blue-600" : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"}`}
                      >
                        <span className="material-symbols-outlined text-[18px]">grid_view</span>
                      </button>
                      <button 
                        onClick={() => setViewMode("list")}
                        className={`rounded-full p-1.5 flex items-center justify-center transition-colors ${viewMode === "list" ? "bg-[#f0f5ff] text-blue-600" : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"}`}
                      >
                        <span className="material-symbols-outlined text-[18px]">format_list_bulleted</span>
                      </button>
                    </div>
                  </div>
                  <div className="hidden sm:block w-[1px] h-6 bg-slate-300"></div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-600">Sắp xếp:</span>
                    <select className="border border-slate-300 rounded-lg text-sm px-3 py-2 outline-none focus:border-[#351a5b] bg-white">
                      <option>Độ phổ biến</option>
                      <option>Giá: Thấp đến cao</option>
                      <option>Giá: Cao đến thấp</option>
                      <option>Đánh giá cao nhất</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className={viewMode === "list" ? "flex flex-col space-y-4" : "grid grid-cols-1 lg:grid-cols-2 gap-6"}>
                {ROOM_DATA.map((room) => (
                  <RoomCard key={room.id} room={room} viewMode={viewMode} navigate={navigate} />
                ))}
              </div>

            </section>
          </div>
        </main>
      )}
      
      {/* TÍCH HỢP AUTH MODAL VÀO CUỐI TRANG */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        initialMode={authMode} 
      />
    </div>
  );
};

export default Search;