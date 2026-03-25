import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import heroBg from "../../assets/images/hero-bg.jpg";
import { DESTINATIONS } from "../../utils/mockData";

const Home = () => {
  const navigate = useNavigate();
  const [showLocation, setShowLocation] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showTime, setShowTime] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [fromTime, setFromTime] = useState("10:00");
  const [toTime, setToTime] = useState("11:30");
  const [showBoxType, setShowBoxType] = useState(false);
  const [boxType, setBoxType] = useState(null);

  return (
    // Bọc toàn bộ nội dung trong 1 thẻ div để kiểm soát màu nền chung
    <div className="w-full bg-white">
      {/* Hero Section */}
      <section className="w-full flex justify-center py-6">
        {" "}
        {/* Giảm py từ 8 xuống 6 */}
        <div className="relative w-full max-w-[1200px] px-4 lg:px-0">
          {/* Giảm chiều cao: Mobile 350px, Desktop 450px */}
          <div className="relative h-[350px] md:h-[450px] w-full overflow-hidden rounded-[32px] bg-slate-100">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.4)), url(${heroBg})`,
              }}
            ></div>
            <div className="relative h-full flex flex-col items-center justify-center text-center px-6 pb-12">
              {/* Giảm nhẹ size chữ để cân đối với chiều cao mới */}
              <h1 className="text-white text-3xl md:text-5xl font-extrabold leading-tight tracking-tight max-w-3xl mb-3">
                Tìm chỗ nghỉ ngơi lý tưởng tại TP.HCM
              </h1>
              <p className="text-white/90 text-base md:text-lg font-medium max-w-xl">
                Khám phá không gian riêng tư, tiện nghi và giá cả hợp lý ngay
                trung tâm thành phố.
              </p>
            </div>
          </div>

          {/* Floating Search Bar - Đạt độ bo tròn tối đa (rounded-full) */}
          <div className="relative -mt-14 mx-auto max-w-5xl px-4 lg:px-0 z-30">
            {/* Thay đổi rounded-[32px] thành rounded-full và tăng padding lên p-3 để cân đối */}
            <div className="bg-white p-3 rounded-full shadow-[0_25px_70px_rgba(0,0,0,0.15)] border border-slate-100 flex flex-col md:flex-row items-center gap-1 overflow-hidden">
              {/* 1. ĐỊA ĐIỂM - Bo góc trái tuyệt đối (l-full) */}
              <div className="group relative flex-1 w-full md:rounded-l-full overflow-hidden border-r border-slate-50 last:border-0">
                <button
                  onClick={() => setShowLocation(!showLocation)}
                  // Tăng px để nội dung không bị dính vào viền bo tròn tuyệt đối
                  className="w-full flex flex-col px-10 py-5 text-left hover:bg-slate-50 transition-all"
                >
                  <span className="text-[10px] font-bold uppercase tracking-[1px] text-[#4059AD] mb-1">
                    Địa điểm
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-slate-400 text-xl">
                      location_on
                    </span>
                    <span
                      className={`text-sm font-extrabold truncate ${selectedLocation ? "text-slate-900" : "text-slate-400"}`}
                    >
                      {selectedLocation || "Bạn muốn đi đâu?"}
                    </span>
                  </div>
                </button>
                {/* ... Dropdown giữ nguyên ... */}
              </div>

              {/* 2. THỜI GIAN */}
              <div className="group relative flex-[1.4] w-full border-r border-slate-50 last:border-0">
                <button
                  onClick={() => setShowTime(!showTime)}
                  className="w-full flex flex-col px-10 py-5 text-left hover:bg-slate-50 transition-all"
                >
                  <span className="text-[10px] font-bold uppercase tracking-[1px] text-[#4059AD] mb-1">
                    Thời gian
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-slate-400 text-xl">
                      calendar_today
                    </span>
                    <span className="text-sm font-extrabold text-slate-900 whitespace-nowrap italic">
                      {date} | {fromTime} - {toTime}
                    </span>
                  </div>
                </button>
                {/* ... Dropdown giữ nguyên ... */}
              </div>

              {/* 3. LOẠI PHÒNG */}
              <div className="group relative flex-1 w-full">
                <button
                  onClick={() => setShowBoxType(!showBoxType)}
                  className="w-full flex flex-col px-10 py-5 text-left hover:bg-slate-50 transition-all"
                >
                  <span className="text-[10px] font-bold uppercase tracking-[1px] text-[#4059AD] mb-1">
                    Loại phòng
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-slate-400 text-xl">
                      bed
                    </span>
                    <span
                      className={`text-sm font-extrabold truncate ${boxType ? "text-slate-900" : "text-slate-400"}`}
                    >
                      {boxType || "Chọn loại phòng"}
                    </span>
                  </div>
                </button>
                {/* ... Dropdown giữ nguyên ... */}
              </div>

              {/* NÚT TÌM KIẾM - Bo tròn hoàn toàn (Full) */}
              <div className="px-3 w-full md:w-auto">
                <button
                  className="bg-[#4059AD] text-white h-16 w-full md:w-16 rounded-full flex items-center justify-center hover:bg-[#32488f] transition-all shadow-lg shadow-blue-200"
                  onClick={() => navigate("/search")}
                >
                  <span className="material-symbols-outlined text-3xl font-bold">
                    search
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="w-full flex justify-center py-12">
        <div className="w-full max-w-[1200px] px-4 lg:px-0">
          <h2 className="text-2xl font-extrabold mb-8 text-slate-800">
            Điểm đến phổ biến
          </h2>

          {/* Grid Layout giống ảnh mẫu (Bento Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[500px]">
            {DESTINATIONS.map((dest, index) => (
              <div
                key={dest.id}
                onClick={() => handleDestinationClick(dest.name)}
                className={`relative overflow-hidden rounded-[24px] cursor-pointer group shadow-sm hover:shadow-xl transition-all duration-500
            ${index === 0 ? "md:col-span-1 md:row-span-2" : ""} 
            ${index === 1 ? "md:col-span-1 md:row-span-1" : ""}
            ${index === 2 ? "md:col-span-1 md:row-span-2" : ""}
          `}
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-white font-bold text-xl">{dest.name}</h3>
                  <p className="text-white/80 text-xs font-medium uppercase tracking-wider">
                    {dest.count} chỗ nghỉ
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Promotion */}
      <section className="w-full flex justify-center py-12 mb-20">
        <div className="w-full max-w-[1200px] px-4 lg:px-0">
          <div className="bg-[#351a5b]/5 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-4">
                Tìm chỗ nghỉ trên bản đồ
              </h2>
              <p className="text-slate-600 mb-6 text-lg">
                Dễ dàng tìm thấy các sleepbox gần nhất với vị trí của bạn hoặc
                gần các địa điểm du lịch nổi tiếng tại TP.HCM.
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
