import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import AuthModal from "../auth/AuthModal";

// 1. DỮ LIỆU MẪU (Giữ nguyên)
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

// Bổ sung Brand và Reviews mock cho ROOM_DATA
const ROOM_DATA = [
  {
    id: 1,
    title: "CyberBox Quận 1 - Premium Pod",
    brand: "CyberBox Global",
    image: "https://images.unsplash.com/photo-1596120236172-231999844ade?w=500",
    rating: 4.92,
    reviews: 812,
    location: "Phường Bến Thành, Quận 1",
    amenities: ["Wifi miễn phí", "Điều hòa"],
    price: "85.000",
  },
  {
    id: 2,
    title: "EcoBox Bình Thạnh - Cozy Corner",
    brand: "EcoStay Group",
    image: "https://images.unsplash.com/photo-1555854817-5b2260d538bb?w=500",
    rating: 4.85,
    reviews: 456,
    location: "Phường 22, Bình Thạnh",
    amenities: ["Gần Landmark 81", "Cửa sổ trời"],
    price: "70.000",
  },
  {
    id: 3,
    title: "ZenBox Quận 3 - Quiet Zone",
    brand: "Zen Luxury",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=500",
    rating: 4.78,
    reviews: 234,
    location: "Lê Văn Sỹ, Quận 3",
    amenities: ["Cách âm cực tốt", "Yên tĩnh"],
    price: "65.000",
  },
];

const FilterBlock = ({ title, items }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayedItems = isExpanded ? items : items.slice(0, 5);
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm mb-4">
      <h3 className="font-bold text-slate-900 mb-4">{title}</h3>
      <div className="space-y-3">
        {displayedItems.map((item, index) => (
          <label
            key={index}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-slate-300 text-[#4059AD] focus:ring-[#4059AD] cursor-pointer"
            />
            <span className="text-sm text-slate-700 group-hover:text-slate-900">
              {item}
            </span>
          </label>
        ))}
      </div>
      {items.length > 5 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 text-xs font-bold text-[#4059AD] flex items-center gap-1 hover:underline"
        >
          {isExpanded ? "Ẩn bớt" : "Xem tất cả"}
          <span className="material-symbols-outlined text-sm">
            {isExpanded ? "expand_less" : "expand_more"}
          </span>
        </button>
      )}
    </div>
  );
};

const Search = () => {
  const navigate = useNavigate();
  const locationState = useLocation();
  const { user } = useAuthContext();
  const [viewMode, setViewMode] = useState("list");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Favorites State
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("boxhub_favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("boxhub_favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (e, roomId) => {
    e.stopPropagation();
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    setFavorites((prev) =>
      prev.includes(roomId)
        ? prev.filter((id) => id !== roomId)
        : [...prev, roomId],
    );
  };

  // Search States (Vác từ Home qua)
  const [showLocation, setShowLocation] = useState(false);
  const [destination, setDestination] = useState(
    locationState.state?.destination || "",
  );
  const [showTime, setShowTime] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [fromTime, setFromTime] = useState("10:00");
  const [toTime, setToTime] = useState("11:30");
  const [showBoxType, setShowBoxType] = useState(false);
  const [boxType, setBoxType] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000000);

  const handleReset = () => {
    setDestination("");
    setBoxType("");
    setMinPrice(0);
    setMaxPrice(5000000);
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-[#f7f6f8] text-slate-900 font-sans pb-20">
      {/* 1. THANH SEARCH STICKY - Chiếm chỗ header khi scroll (top-0) */}

      <div className="sticky top-0 z-[60] w-full bg-white border-b border-slate-200 py-3 shadow-lg flex justify-center transition-all duration-300">
        <div className="w-full max-w-[1100px] px-4">
          <div className="bg-white p-1.5 rounded-full border border-slate-200 flex flex-row items-center gap-1 shadow-sm">
            {/* Địa điểm */}

            <div className="relative flex-1 px-6 border-r border-slate-100">
              <button
                onClick={() => {
                  setShowLocation(!showLocation);
                  setShowTime(false);
                  setShowBoxType(false);
                }}
                className="text-left flex flex-col w-full"
              >
                <span className="text-[9px] font-black uppercase text-[#4059AD]">
                  Địa điểm
                </span>

                <span
                  className={`text-sm font-bold truncate ${destination ? "text-slate-800" : "text-slate-400"}`}
                >
                  {destination || "Bạn muốn đi đâu?"}
                </span>
              </button>

              {showLocation && (
                <div className="absolute top-[130%] left-0 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50 animate-fade-in-down">
                  {["Quận 1", "Quận 3", "Quận 7", "Bình Thạnh", "Thủ Đức"].map(
                    (loc) => (
                      <button
                        key={loc}
                        onClick={() => {
                          setDestination(loc);
                          setShowLocation(false);
                        }}
                        className="w-full text-left px-5 py-3 hover:bg-slate-50 text-sm font-bold text-slate-700 flex justify-between items-center"
                      >
                        {loc}{" "}
                        {destination === loc && (
                          <span className="material-symbols-outlined text-[#4059AD] text-sm">
                            check_circle
                          </span>
                        )}
                      </button>
                    ),
                  )}
                </div>
              )}
            </div>

            {/* Thời gian */}

            <div className="relative flex-1 px-6 border-r border-slate-100 hidden md:block">
              <button
                onClick={() => {
                  setShowTime(!showTime);
                  setShowLocation(false);
                  setShowBoxType(false);
                }}
                className="text-left flex flex-col w-full"
              >
                <span className="text-[9px] font-black uppercase text-[#4059AD]">
                  Thời gian
                </span>

                <span className="text-sm font-bold text-slate-800 truncate">
                  {date} | {fromTime}-{toTime}
                </span>
              </button>

              {showTime && (
                <div className="absolute top-[130%] left-0 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 p-5 z-50">
                  <div className="space-y-4">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">
                        Chọn ngày
                      </span>

                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full p-2 bg-slate-50 rounded-lg text-sm font-bold outline-none border-none mt-1"
                      />
                    </div>

                    <div className="flex gap-2">
                      <div className="flex-1">
                        <span className="text-[10px] font-bold text-[#4059AD] uppercase">
                          Từ
                        </span>

                        <input
                          type="time"
                          value={fromTime}
                          onChange={(e) => setFromTime(e.target.value)}
                          className="w-full p-2 bg-slate-50 rounded-lg text-sm font-bold outline-none border-none mt-1"
                        />
                      </div>

                      <div className="flex-1">
                        <span className="text-[10px] font-bold text-[#4059AD] uppercase">
                          Đến
                        </span>

                        <input
                          type="time"
                          value={toTime}
                          onChange={(e) => setToTime(e.target.value)}
                          className="w-full p-2 bg-slate-50 rounded-lg text-sm font-bold outline-none border-none mt-1"
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => setShowTime(false)}
                      className="w-full bg-[#4059AD] text-white py-2 rounded-lg text-xs font-black"
                    >
                      XÁC NHẬN
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Loại phòng */}

            <div className="relative flex-1 px-6 border-r border-slate-100 hidden lg:block">
              <button
                onClick={() => {
                  setShowBoxType(!showBoxType);
                  setShowLocation(false);
                  setShowTime(false);
                }}
                className="text-left flex flex-col w-full"
              >
                <span className="text-[9px] font-black uppercase text-[#4059AD]">
                  Loại phòng
                </span>

                <span
                  className={`text-sm font-bold truncate ${boxType ? "text-slate-800" : "text-slate-400"}`}
                >
                  {boxType || "Chọn loại phòng"}
                </span>
              </button>

              {showBoxType && (
                <div className="absolute top-[130%] left-0 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50">
                  {["Single Box", "Double Box", "Family Box"].map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setBoxType(type);
                        setShowBoxType(false);
                      }}
                      className="w-full text-left px-5 py-3 hover:bg-slate-50 text-sm font-bold text-slate-700 flex justify-between items-center"
                    >
                      {type}{" "}
                      {boxType === type && (
                        <span className="material-symbols-outlined text-[#4059AD] text-sm">
                          check_circle
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Nút Tìm kiếm */}

            <button className="bg-[#4059AD] text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-[#32488f] transition-all shadow-md shrink-0 ml-2">
              <span className="material-symbols-outlined font-bold">
                search
              </span>
            </button>
          </div>
        </div>
      </div>

      <main className="w-full flex justify-center py-8">
        <div className="w-full max-w-[1200px] px-4 lg:px-0 flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-[280px] shrink-0 space-y-6">
            {/* Price Slider */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-900 text-sm uppercase">
                  Khoảng giá
                </h3>
                <span
                  onClick={handleReset}
                  className="text-[#4059AD] text-xs font-bold cursor-pointer hover:underline uppercase"
                >
                  Đặt lại
                </span>
              </div>
              <div className="relative h-1.5 bg-slate-100 rounded-full mb-10 mt-6 mx-2">
                <div
                  className="absolute h-full bg-[#4059AD] rounded-full"
                  style={{
                    left: `${(minPrice / 5000000) * 100}%`,
                    right: `${100 - (maxPrice / 5000000) * 100}%`,
                  }}
                ></div>
                <input
                  type="range"
                  min="0"
                  max="5000000"
                  step="50000"
                  value={minPrice}
                  onChange={(e) =>
                    setMinPrice(
                      Math.min(Number(e.target.value), maxPrice - 100000),
                    )
                  }
                  className="absolute w-full h-1.5 bg-transparent appearance-none cursor-pointer z-20 accent-[#4059AD]"
                />
                <input
                  type="range"
                  min="0"
                  max="5000000"
                  step="50000"
                  value={maxPrice}
                  onChange={(e) =>
                    setMaxPrice(
                      Math.max(Number(e.target.value), minPrice + 100000),
                    )
                  }
                  className="absolute w-full h-1.5 bg-transparent appearance-none cursor-pointer z-20 accent-[#4059AD]"
                />
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-slate-50 border border-slate-200 rounded-lg p-2 text-center text-xs font-black text-slate-700">
                  {new Intl.NumberFormat("vi-VN").format(minPrice)} VND
                </div>
                <div className="flex-1 bg-slate-50 border border-slate-200 rounded-lg p-2 text-center text-xs font-black text-slate-700">
                  {new Intl.NumberFormat("vi-VN").format(maxPrice)} VND
                </div>
              </div>
            </div>

            <FilterBlock title="Lọc phổ biến" items={FILTER_DATA.popular} />

            <FilterBlock title="Khu vực" items={FILTER_DATA.areas} />

            <FilterBlock
              title="Tiện nghi chỗ nghỉ"
              items={FILTER_DATA.amenities}
            />

            <FilterBlock
              title="Tiện nghi phòng"
              items={FILTER_DATA.roomAmenities}
            />
          </aside>

          <section className="flex-1 space-y-6">
            {/* TOOLBAR: GRID/LIST & SORT */}
            <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-2xl border border-slate-100 shadow-sm gap-4">
              <div>
                {/* Sửa lại dòng tiêu đề theo yêu cầu của Tiến */}
                <h1 className="text-lg font-bold text-slate-900 lowercase first-letter:uppercase">
                  {ROOM_DATA.length} cơ sở được tìm thấy
                </h1>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex bg-slate-100 p-1 rounded-xl">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 rounded-lg ${viewMode === "grid" ? "bg-white shadow-sm text-[#4059AD]" : "text-slate-400"}`}
                  >
                    <span className="material-symbols-outlined text-sm">
                      grid_view
                    </span>
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 rounded-lg ${viewMode === "list" ? "bg-white shadow-sm text-[#4059AD]" : "text-slate-400"}`}
                  >
                    <span className="material-symbols-outlined text-sm">
                      format_list_bulleted
                    </span>
                  </button>
                </div>
                <select className="text-xs font-bold text-slate-700 bg-slate-50 border-none rounded-xl px-4 py-2 outline-none">
                  <option>Độ phổ biến</option>
                  <option>Giá thấp nhất</option>
                </select>
              </div>
            </div>

            {/* List */}
            <div
              className={
                viewMode === "list"
                  ? "flex flex-col space-y-4"
                  : "grid grid-cols-2 gap-6"
              }
            >
              {ROOM_DATA.map((room) => (
                <div
                  key={room.id}
                  className={`bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer flex ${viewMode === "list" ? "flex-row" : "flex-col"}`}
                >
                  <div
                    className={`${viewMode === "list" ? "w-64 h-52" : "w-full aspect-video"} shrink-0 relative`}
                  >
                    <img
                      src={room.image}
                      className="w-full h-full object-cover"
                      alt={room.title}
                    />
                    {/* Yêu cầu 1: Trái tim xuyên thấu */}
                    <button
                      onClick={(e) => toggleFavorite(e, room.id)}
                      className="absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all bg-black/20 backdrop-blur-sm group/heart"
                    >
                      <span
                        className={`material-symbols-outlined text-2xl transition-colors ${favorites.includes(room.id) ? "text-red-500 fill-1" : "text-white group-hover/heart:text-red-300"}`}
                      >
                        favorite
                      </span>
                    </button>
                    {room.badge && (
                      <span className="absolute top-3 left-3 bg-[#4059AD] text-white text-[10px] font-black px-2 py-1 rounded">
                        {room.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                          <h2 className="text-lg font-bold text-slate-800 line-clamp-1">
                            {room.title}
                          </h2>
                          {/* Yêu cầu 6: Thêm Brand */}
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                            {room.brand}
                          </span>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-1 rounded-lg font-bold text-sm">
                            <span className="material-symbols-outlined text-sm fill-1 text-amber-500">
                              star_rate
                            </span>{" "}
                            {room.rating}
                          </div>
                          {/* Yêu cầu 2: Số lượt đánh giá */}
                          <span className="text-[10px] text-slate-400 font-medium mt-0.5">
                            ({room.reviews} đánh giá)
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-slate-500 mt-1 flex items-center gap-1 truncate">
                        <span className="material-symbols-outlined text-sm">
                          location_on
                        </span>{" "}
                        {room.location}
                      </p>
                      {/* Yêu cầu 3: Amenities không in đậm, chỉ hoa chữ đầu */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {room.amenities.map((am, i) => (
                          <span
                            key={i}
                            className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-md capitalize"
                          >
                            {am}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col items-end mt-4 pt-4 border-t border-slate-50">
                      {/* Yêu cầu 4: Giá nằm trên nút */}
                      <div className="text-right mb-3">
                        <p className="text-xl font-black text-[#4059AD] tracking-tighter">
                          {room.price} VND
                        </p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                          / mỗi giờ
                        </p>
                      </div>
                      {/* Yêu cầu 5: Chữ Chọn phòng viết hoa đầu */}
                      <button
                        onClick={() => navigate(`/room/${room.id}`)}
                        className="bg-[#4059AD] text-white px-8 py-2.5 rounded-xl font-bold text-sm hover:bg-[#32488f] shadow-lg shadow-blue-100 transition-all"
                      >
                        Chọn phòng
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode="login"
      />
    </div>
  );
};

export default Search;
