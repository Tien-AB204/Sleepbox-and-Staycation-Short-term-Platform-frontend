import React, { useState, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import AuthModal from "../auth/AuthModal";

const RoomDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const locationState = useLocation(); // Thêm hook này để bắt dữ liệu

  // State quản lý việc đóng/mở Modal
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [showAmenitiesText, setShowAmenitiesText] = useState(false);

  // ==================== LOGIC CHỌN PHÒNG VÀ TÌM KIẾM ====================
  const [selectedFloor, setSelectedFloor] = useState(1);
  const [selectedRooms, setSelectedRooms] = useState([]); 

  // Lấy ngày từ trang trước truyền sang (nếu có), không có thì lấy ngày hôm nay
  const [date, setDate] = useState(locationState.state?.date || new Date().toISOString().split("T")[0]);
  
  // Cố định lại tối đa 5 phòng như cũ
  const MAX_ROOMS = 5;

  const handleFloorChange = (floor) => {
    setSelectedFloor(floor);
    setSelectedRooms([]); // Reset khi đổi tầng
  };

  const handleRoomClick = (roomId, isBooked) => {
    if (isBooked) return;

    if (selectedRooms.includes(roomId)) {
      setSelectedRooms((prev) => prev.filter((id) => id !== roomId));
    } else {
      if (selectedRooms.length < MAX_ROOMS) {
        setSelectedRooms((prev) => [...prev, roomId]);
      }
    }
  };

  // ==================== MOCK DATA ĐỘNG THEO TẦNG ====================
  const mapConfigs = useMemo(() => {
    const cols = 4;
    const rows = 5;
    let grid = [];

    for (let c = 0; c < cols; c++) {
      let colData = [];
      for (let r = 0; r < rows; r++) {
        const roomNum = selectedFloor * 100 + (c * rows + r + 1);
        const isBooked = (roomNum % 7 === 0) || (roomNum % 4 === 1 && selectedFloor % 2 === 0);
        const isPremium = (roomNum % 5 === 0) && !isBooked;

        // Giả lập số người chứa trong phòng (1, 2, hoặc 3+ cho gia đình)
        let capacity = 1;
        if (roomNum % 3 === 0) capacity = 2;
        if (roomNum % 8 === 0) capacity = 3; 

        // Gán Icon tương ứng (Bỏ icon VIP, dùng chung icon số người cho cả phòng thường & cao cấp)
        let iconName = "person"; // Mặc định 1 người
        if (isBooked) {
          iconName = "lock";
        } else if (capacity === 2) {
          iconName = "group"; // 2 người
        } else if (capacity >= 3) {
          iconName = "diversity_3"; // Gia đình (3 người)
        }

        colData.push({
          isBooked,
          isPremium,
          icon: iconName,
          label: isBooked ? "Đã đặt" : null,
          capacity: capacity
        });
      }
      grid.push(colData);
    }
    return grid;
  }, [selectedFloor]);

  return (
    <div className="bg-[#f7f6f8] text-slate-900 font-sans antialiased relative">
      {/* ==================== TRANG DETAIL CHÍNH ==================== */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ==================== 1. HEADER INFO ==================== */}
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            CyberBox District 1
          </h1>
          <div className="flex items-center gap-2 mt-1">
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm font-medium">
            <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-1 rounded-lg">
              <span className="material-symbols-outlined text-amber-500 fill-1 text-lg">
                star_rate
              </span>
              <span className="font-bold">4.8</span>
            </div>
            <span className="text-slate-500 underline decoration-dotted underline-offset-4 cursor-pointer hover:text-slate-800">
              (120 đánh giá)
            </span>
            <span className="text-slate-300">|</span>
            <div className="flex items-center gap-1 text-slate-600">
              <span className="material-symbols-outlined text-lg text-[#4059AD]">
                location_on
              </span>
              <span>123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh</span>
            </div>
          </div>
        </div>

        {/* ==================== 2. GALLERY 7 ẢNH ==================== */}
        <div className="flex flex-col lg:flex-row gap-2 mb-10">
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex gap-2 h-[350px]">
              <div className="flex-[2] relative group overflow-hidden rounded-sm border border-slate-200 shadow-sm">
                <img
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src="https://images.unsplash.com/photo-1596120236172-231999844ade?w=800"
                  alt="Main"
                />
              </div>
              <div className="flex-1 grid grid-rows-2 gap-2">
                <div className="relative group overflow-hidden rounded-sm border border-slate-200 shadow-sm">
                  <img
                    className="h-full w-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFN-_5pqMeoW6teOOPTx-ieA3B2VrDShAQvltbopUDGgHsNrTWlMBZmo1gkeexXaAuTpYA7VlCnIySKyTEOST5sIqxC2MLK-gsnSYh4OZmOK47BJHhVnu0JD3LNdNAUm_UhLEOMpmtZaUBDmrTLkAoiL_BavFUlopr2XSnG9blWga52E3mXv5H7IKXziyJYbEJ32_caIk4WH4oU-37Fe-ziARZJhWHqBTDtdh7YDd8Y1CnMLHDk4ttUJnUfXynGoF5LrixnYPX3mdS"
                    alt="Img 2"
                  />
                </div>
                <div className="relative group overflow-hidden rounded-sm border border-slate-200 shadow-sm">
                  <img
                    className="h-full w-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB__OOBaJ04dRhaxPMwQlCTo5W3t7MZ_BSZZM2702i3T36MPR-rdwmg4hf8aRJQMRnnVxvXUmBRqQyFYgq0vS3uL1kzjE7Q9tJtPOGvCbj68aXAy26eQtJx1uM_Jex5yQ4ftwV4jITDpew__E0oIAMY-xpmm2sPDHgfkJznhgPHtREa4oBx1w1vlBKUW_-lgd_PwtxCic0qdyik7bVgxjgfWQzYPpcv1VhJ1MeCD5yaPDvaoIicGKfoDQy1sNbrz3S32KFlL9V0babZ"
                    alt="Img 3"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2 h-[120px]">
              <div className="relative group overflow-hidden rounded-sm border border-slate-200 shadow-sm">
                <img
                  className="h-full w-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuArxlIdXg4p50I7RnUWtudGcUE8jL9i7Of3SdYrrB021pu8rHk4LDxZvhGwKWlbSAlBZnjcS3WDHuhbG2IL4i0zbfFGZIAPul4qLPMgfosu9fBlXbijZnit1w81JYKqWc6d5OD3BpiMFWhjQRYVGudt5_M8rAT6yLjifPXrM1aPWyn6i8lr0WwtMnUHA8URY-ZXcMzAxkyrVGHJ6AI6k0ALDn2RG31txt8Q2x5GNCCAFFPAvj5FDYchEMIYYKG7xUEzfY0M13MtlH-K"
                  alt="Img 4"
                />
              </div>
              <div className="relative group overflow-hidden rounded-sm border border-slate-200 shadow-sm">
                <img
                  className="h-full w-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgaFRcTCGoN5T2ZEqGcDvKj1ShIKaqiWk9eCUdYbtJx0W9tIzix_YhQdZJDiBnxnl3APgY9ooIhUXvOulq3xEMVUEbt0gC9HCyWPDlXSNlgNeRw32KRxBrV5LAelaJzSzC2DDQfxusnBq-b2elCsyvyyyNsuSFSe-jCTzehtfJcy8sQT2om_awy9Fg3nRjF-AAfkUAStCVCaLB8STdbx5KkuX1nqUNOqmAGR_ssR1CfXo1Of5l7kyjqEy1jQ8f72TLrVj1WrTzgoWv"
                  alt="Img 5"
                />
              </div>
              <div className="relative group overflow-hidden rounded-sm border border-slate-200 shadow-sm">
                <img
                  className="h-full w-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3vHmMGT6e7hPq39XInZ2GdW2gBCtzaFa9wBREU4SX1Gf25O6l7EFcUcVVy9JUaH2dmOeb2lGqJ8mUQU8ihQo66jDK6ap4aHhpEqxrFqVNUxOMRH3gyglyY3suLrdWlFeWT5aqddI6x8m13pctG7ZtyLVt_G01WJpwWKR-rrRUglBQs8fPEoRlnfeiiqZOMnzIT2D1XQDQDV0Lrf-3UA6JGxSpFRr3Y4fyrc1T-qlZUFfnSbuhgBaJOs4xCFFZ2NWNze5KAmfGJ3TP"
                  alt="Img 6"
                />
              </div>
              <div className="relative group overflow-hidden rounded-sm cursor-pointer shadow-inner border border-slate-200">
                <img
                  className="h-full w-full object-cover blur-[0.5px]"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYS0ZwH7Jn5zg83gnBnHBC2ne4b4-7JHSiUozoVQ4oE7PN_Sq5TuJsWxM4Rv3JPRPFIHr4tUwVkaVOpVMPQxkQ6ZC9QzqabrL812Y3wHaqDfHbMWNzkindydslYFVm2DdRsvuVVfmT3-y5WgJwuvCuaeBkKMIELGGg6UB1fIBVGOt9eIOZKi-w6-_cjjSGtTDKXBuJH54A16YWi31HPSoGdaV6vb1-pvUv18LszkjnjyvWV7Zg5F91t6gR5hSVsd_gETFaU269a-6C"
                  alt="Img 7"
                />
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-1 group-hover:bg-black/60 transition-colors">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 transition-transform duration-300 group-hover:scale-105">
                    <span className="material-symbols-outlined text-white text-base">
                      photo_library
                    </span>
                    <span className="text-white font-bold text-[11px] uppercase tracking-widest underline underline-offset-4 decoration-white/60">
                      Xem tất cả ảnh
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* CỘT PHẢI: MAP VÀ THÔNG TIN BỔ SUNG */}
          <div className="hidden lg:flex flex-col gap-3 lg:w-[320px] shrink-0 h-[478px]">
            
            {/* 1. Brand & Host Info - Khung riêng */}
            <div className="bg-white rounded-md border border-slate-200 overflow-hidden shadow-sm flex flex-col shrink-0">
              <div className="p-4 flex items-center justify-between border-b border-slate-100">
                <div className="flex flex-col flex-1">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">
                    Thương hiệu/chuỗi
                  </p>
                  <h3 className="text-sm font-black text-[#4059AD]">
                    BoxHub Official
                  </h3>
                </div>
              </div>

              <div className="p-4 flex items-center gap-3 bg-slate-50/50">
                <div className="relative shrink-0">
                  <img
                    className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_knlqmnoxjTmxOMgSnGnHruAL9_tWzeZ42XyKEXYYzsZNwTsINQpmdEDCOn21t7K-x2kq2misF1GMATzU2V1PSmuaA4gQAUCtGGSoyeSgy6u4G-dMQIFztHocG2d2YuCoR1TpY80D0gw4l9uEkd8UgDedpex4qU1LMxGgy0dMgXDwYFyKQDOACqsGabIHrhhxGXiHVKnb5LGtRHYEnDN9haaIPxfRcgJe5Kom02WGwOO7JyI7j7SRYqfuZwMN2f-AGC5CLqF7kMKU"
                    alt="Host"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-[#E61E4D] text-white rounded-full p-0.5 border border-white flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-[10px] fill-1">
                      workspace_premium
                    </span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <h3 className="text-sm font-bold text-slate-800">
                    Host: Kai Trần
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Superhost · 1 năm kinh nghiệm
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Rating & Review - Khung riêng */}
            <div className="bg-white rounded-md border border-slate-200 p-4 shadow-sm flex items-center justify-between shrink-0">
              <div className="flex flex-col">
                <span className="text-sm font-black text-[#4059AD]">Tuyệt vời</span>
                <span className="text-xs text-slate-500 font-medium">120 đánh giá</span>
              </div>
              <div className="bg-[#4059AD] text-white text-lg font-black px-4 py-2 rounded-lg shadow-sm flex items-center justify-center">
                4.8
              </div>
            </div>

            {/* 3. Bản đồ - Khung riêng */}
            <div className="flex-1 w-full rounded-md overflow-hidden border border-slate-200 relative group cursor-pointer shadow-sm">
              <img
                src="https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s-l+4059AD(106.701,10.776)/106.701,10.776,15,0/400x300?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTAwYjYycXB2bm93OTdwazgifQ=="
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt="Map"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/5 group-hover:bg-black/15 transition-all">
                <button className="bg-white/90 backdrop-blur-sm border border-slate-200 text-[#4059AD] px-5 py-2.5 rounded-lg shadow-lg font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-white hover:shadow-xl transition-all">
                  <span className="material-symbols-outlined text-[18px]">
                    location_on
                  </span>{" "}
                  Xem bản đồ
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ==================== 3. MAIN CONTENT LAYOUT (FULL WIDTH) ==================== */}
        
        {/* --------- PHẦN MÔ TẢ VÀ TIỆN NGHI (CHIA 2 CỘT) --------- */}
        <section className="mb-12 pb-12 border-b border-slate-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            
            {/* Cột trái: Description (Chiếm 7 phần) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center justify-between pb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Giới thiệu
                  </h2>
                </div>
              </div>
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                <p>
                  CyberBox District 1 mang đến trải nghiệm lưu trú hiện đại ngay
                  tại trái tim của thành phố. Khách sạn con nhộng của chúng tôi
                  được thiết kế tối ưu hóa không gian, đảm bảo sự riêng tư và
                  thoải mái tuyệt đối cho từng du khách.
                </p>
                <p>
                  Với hệ thống thông gió thông minh và đệm cao cấp, bạn sẽ có
                  những giấc ngủ sâu sau một ngày dài khám phá. Khu vực sinh hoạt
                  chung rộng rãi là nơi lý tưởng để làm việc, thư giãn hoặc giao
                  lưu với những người bạn mới.
                </p>
              </div>
              <button className="text-[#4059AD] font-bold underline underline-offset-4 hover:text-[#2a3c75] transition-colors">
                Hiển thị thêm
              </button>
            </div>

            {/* Cột phải: Amenities (Chiếm 5 phần) */}
            <div className="lg:col-span-5">
              <h2 className="text-xl font-bold mb-6 text-slate-900">Tiện nghi có sẵn</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-4">
                {[
                  { icon: "wifi", text: "Wi-Fi 6 tốc độ 500Mbps" },
                  { icon: "ac_unit", text: "Điều hòa trung tâm & lọc khí" },
                  { icon: "restaurant", text: "Bếp chung & lò vi sóng" },
                  { icon: "shield", text: "An ninh 24/7 & Camera AI" },
                  { icon: "coffee", text: "Cà phê & Trà miễn phí" },
                  { icon: "iron", text: "Máy giặt & Bàn ủi" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 text-slate-700"
                  >
                    <span className="material-symbols-outlined text-[28px] text-[#4059AD]/80">
                      {item.icon}
                    </span>
                    <span className="font-medium text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
              <button className="mt-8 w-full sm:w-auto rounded-xl border border-slate-300 px-6 py-3.5 font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all shadow-sm">
                Hiển thị tất cả 25 tiện nghi
              </button>
            </div>
            
          </div>
        </section>

        {/* --------- LỰA CHỌN PHÒNG NGHỈ (FULL WIDTH) --------- */}
        <section className="mt-8">
          <h2 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">
            Chọn box
          </h2>

          {/* THANH TÌM KIẾM (Chỉ còn Ngày) */}
          <div className="flex flex-col md:flex-row items-center bg-white border-2 border-amber-400 rounded-xl mb-8 p-1 shadow-sm">
            
            {/* Khối chọn ngày */}
            <div className="flex-1 flex items-center gap-3 px-4 py-2.5 w-full border-b md:border-b-0 md:border-r border-slate-200">
              <span className="material-symbols-outlined text-slate-400">calendar_today</span>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full outline-none text-sm font-bold text-slate-700 bg-transparent cursor-pointer"
              />
            </div>

            {/* Nút thay đổi */}
            <button className="bg-[#2063D1] text-white px-8 py-3 rounded-lg font-bold text-sm hover:bg-[#1a51a8] transition-colors w-full md:w-auto shrink-0 h-full">
              Thay đổi tìm kiếm
            </button>
          </div>
          <div className="border border-slate-200 rounded-xl bg-white flex flex-col md:flex-row overflow-hidden shadow-sm">
            
            {/* Cột Thông tin phòng */}
            <div className="w-full md:w-[35%] flex flex-col border-b md:border-b-0 md:border-r border-slate-200">
              <div className="relative h-[240px] w-full">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYS0ZwH7Jn5zg83gnBnHBC2ne4b4-7JHSiUozoVQ4oE7PN_Sq5TuJsWxM4Rv3JPRPFIHr4tUwVkaVOpVMPQxkQ6ZC9QzqabrL812Y3wHaqDfHbMWNzkindydslYFVm2DdRsvuVVfmT3-y5WgJwuvCuaeBkKMIELGGg6UB1fIBVGOt9eIOZKi-w6-_cjjSGtTDKXBuJH54A16YWi31HPSoGdaV6vb1-pvUv18LszkjnjyvWV7Zg5F91t6gR5hSVsd_gETFaU269a-6C"
                  className="w-full h-full object-cover"
                  alt="Room"
                />
              </div>

              <div className="p-6 flex flex-col h-full bg-slate-50/30">
                <h3 className="text-xl font-black text-slate-900 leading-tight mb-4">
                  Tầng 1 - Box 101 (Pod 1-4)
                </h3>

                {/* KHU VỰC TIỆN NGHI */}
                <div className="flex flex-col flex-1">
                  {showAmenitiesText ? (
                    <ul className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs text-slate-600 font-medium flex-1 mb-4">
                      <li className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-slate-400">bathtub</span> phòng tắm riêng
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-slate-400">shower</span> Vòi sen
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-slate-400">checkroom</span> Áo choàng tắm
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-slate-400">check</span> Máy sấy tóc
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-slate-400">soap</span> Vật dụng
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-slate-400">wifi</span> Wi-Fi [miễn phí]
                      </li>
                    </ul>
                  ) : (
                    <div className="flex flex-wrap gap-4 mb-4">
                      <span className="material-symbols-outlined text-[22px] text-slate-500" title="Phòng tắm riêng">bathtub</span>
                      <span className="material-symbols-outlined text-[22px] text-slate-500" title="Vòi sen">shower</span>
                      <span className="material-symbols-outlined text-[22px] text-slate-500" title="Áo choàng tắm">checkroom</span>
                      <span className="material-symbols-outlined text-[22px] text-slate-500" title="Máy sấy tóc">check</span>
                      <span className="material-symbols-outlined text-[22px] text-slate-500" title="Vật dụng tắm rửa">soap</span>
                      <span className="material-symbols-outlined text-[22px] text-slate-500" title="Wi-Fi [miễn phí]">wifi</span>
                    </div>
                  )}

                  {/* NÚT XEM CHI TIẾT */}
                  <button 
                    onClick={() => setShowAmenitiesText(!showAmenitiesText)}
                    className="text-[#4059AD] text-sm font-bold text-left hover:underline underline-offset-4 mt-auto w-fit transition-colors"
                  >
                    {showAmenitiesText ? "Ẩn chi tiết phòng" : "Xem chi tiết phòng"}
                  </button>
                </div>
              </div>
            </div>

            {/* Cột Các Deals */}
            <div className="w-full md:w-[65%] p-4 lg:p-6 bg-slate-50">
              <div className="border border-slate-200 rounded-2xl bg-white overflow-hidden flex flex-col shadow-sm">
                
                {/* Deal phòng đơn */}
                <div className="flex flex-col hover:bg-slate-50 transition-colors">
                  <div className="p-5 lg:p-6 flex flex-col lg:flex-row gap-5 lg:gap-8 items-center justify-between">
                    <div className="flex-1 space-y-2 w-full">
                      <p className="font-bold flex items-center gap-2 text-slate-900">
                        <span className="material-symbols-outlined text-lg text-[#4059AD]">
                          person
                        </span>{" "}
                        Phòng đơn
                      </p>
                      <div className="flex items-center gap-3 text-xs font-bold text-slate-600 divide-x divide-slate-300">
                        <span>24 m²</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-8 w-full lg:w-auto justify-between lg:justify-end">
                      <div className="flex flex-col items-end text-right">
                        <div className="flex items-baseline gap-1 text-[#C13515]">
                          <span className="text-3xl font-black leading-none tracking-tight">
                            18.364
                          </span>
                          <span className="text-sm font-bold underline underline-offset-2">
                            đ/giờ
                          </span>
                        </div>
                      </div>
                      
                      <div className="w-[140px] shrink-0">
                        <button
                          onClick={() => setIsMapModalOpen(true)}
                          className="w-full bg-[#4059AD] text-white rounded-xl py-3 font-bold text-sm hover:bg-[#32488f] shadow-md transition-colors"
                        >
                          Chọn box
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Deal phòng đôi */}
                <div className="flex flex-col border-b border-slate-200 hover:bg-slate-50 transition-colors">
                  <div className="p-5 lg:p-6 flex flex-col lg:flex-row gap-5 lg:gap-8 items-center justify-between">
                    <div className="flex-1 space-y-2 w-full">
                      <p className="font-bold flex items-center gap-2 text-slate-900">
                        <span className="material-symbols-outlined text-lg text-[#4059AD]">
                          group
                        </span>{" "}
                        Phòng đôi
                      </p>
                      <div className="flex items-center gap-3 text-xs font-bold text-slate-600 divide-x divide-slate-300">
                        <span>24 m²</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-8 w-full lg:w-auto justify-between lg:justify-end">
                      <div className="flex flex-col items-end text-right">
                        <div className="flex items-baseline gap-1 text-[#C13515]">
                          <span className="text-3xl font-black leading-none tracking-tight">
                            20.293
                          </span>
                          <span className="text-sm font-bold underline underline-offset-2">
                            đ/giờ
                          </span>
                        </div>
                      </div>
                      
                      <div className="w-[140px] shrink-0">
                        <button
                          onClick={() => setIsMapModalOpen(true)}
                          className="w-full bg-[#4059AD] text-white rounded-xl py-3 font-bold text-sm hover:bg-[#32488f] shadow-md transition-colors"
                        >
                          Chọn box
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                

              </div>
            </div>

          </div>
        </section>

      </main>

      {/* ==================== MỚI: FULL-SCREEN MODAL CHUẨN BOOKING.COM ==================== */}
      {isMapModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 lg:p-10 transition-opacity animate-fade-in-up">
          
          {/* KHUNG MODAL KHỔNG LỒ */}
          <div className="bg-[#f0f2f5] w-full h-full max-w-[1400px] rounded-2xl flex flex-col overflow-hidden shadow-2xl relative">
            
            {/* 1. THANH HEADER TRẮNG Ở TRÊN */}
            <div className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shrink-0 z-20 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#4059AD] text-2xl hidden sm:block">meeting_room</span>
                <div>
                  <h2 className="text-lg font-black text-slate-900 leading-tight">
                    Chọn Box - CyberBox District 1
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">Vui lòng chọn tối đa {MAX_ROOMS} box</p>
                </div>
              </div>
              <button 
                onClick={() => setIsMapModalOpen(false)}
                className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-bold text-sm transition-colors"
              >
                Đóng <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            {/* 2. KHU VỰC NỘI DUNG CHÍNH (Chia 2 cột) */}
            <div className="flex-1 overflow-hidden flex flex-col lg:flex-row p-4 sm:p-6 gap-6">
              
              {/* CỘT TRÁI (SIDEBAR THỜI GIAN/LƯU Ý) */}
              <div className="w-full lg:w-[320px] flex flex-col gap-6 shrink-0 overflow-y-auto custom-scrollbar pb-6">
                
                {/* Hộp đếm ngược */}
                <div className="bg-white rounded-3xl p-8 flex flex-col items-center justify-center shadow-sm border border-slate-100">
                  <div className="relative w-40 h-40 flex items-center justify-center rounded-full border-[8px] border-red-50 mb-3">
                    <div className="absolute inset-0 rounded-full border-[8px] border-[#e65c55] border-r-transparent border-b-transparent transform rotate-45"></div>
                    <div className="flex flex-col items-center">
                      <span className="text-4xl font-black text-slate-800">4:59</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Hết hạn sau</span>
                    </div>
                  </div>
                  <p className="text-center text-xs text-slate-500 font-medium mt-2">
                    Phòng của bạn đang được giữ tạm thời.
                  </p>
                </div>

                {/* Thông tin chọn */}
                <div className="bg-white rounded-3xl p-7 shadow-sm border border-slate-100">
                  <h4 className="font-black text-slate-800 mb-5 flex items-center justify-between">
                    <span className="flex items-center gap-2 text-base">
                      Đã chọn
                      <span className="material-symbols-outlined text-sm text-slate-400 bg-slate-50 rounded-full p-1">info</span>
                    </span>
                    <span className="text-sm text-slate-500 font-medium bg-slate-50 px-3 py-1 rounded-lg">
                      <span className="text-[#e65c55] font-black">{selectedRooms.length}</span> / {MAX_ROOMS}
                    </span>
                  </h4>
                  
                  {/* THANH INDICATOR MÀU */}
                  <div className="flex gap-2 mb-6">
                    {Array.from({ length: MAX_ROOMS }).map((_, index) => (
                      <div 
                        key={index} 
                        className={`h-2.5 flex-1 rounded-full transition-colors duration-300 ${
                          index < selectedRooms.length ? "bg-[#e65c55] shadow-sm" : "bg-slate-100"
                        }`}
                      ></div>
                    ))}
                  </div>

                  <ul className="text-xs sm:text-sm font-bold text-slate-600 space-y-4 border-t border-slate-100 pt-5">
                    <li className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#e65c55] text-xl">event_busy</span> Hủy miễn phí 24h trước
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#e65c55] text-xl">money_off</span> Không hoàn tiền sau hạn
                    </li>
                  </ul>
                </div>
              </div>

              {/* CỘT PHẢI (MAP KHÔNG GIAN RỘNG & TẦNG) */}
              <div className="flex-1 bg-white rounded-3xl shadow-sm border border-slate-200 flex flex-col md:flex-row overflow-hidden relative">
                
                {/* Sidebar Chọn tầng (Bên trong map) */}
                <div className="w-full md:w-[110px] bg-slate-50 border-b md:border-b-0 md:border-r border-slate-100 flex flex-row md:flex-col gap-2 p-3 overflow-x-auto md:overflow-y-auto shrink-0 custom-scrollbar z-10">
                  {[1, 2, 3, 4, 5].map((floor) => (
                    <button
                      key={floor}
                      onClick={() => handleFloorChange(floor)}
                      className={`flex flex-col items-center justify-center w-[75px] md:w-full py-4 rounded-xl transition-all relative shrink-0 ${
                        selectedFloor === floor
                          ? "bg-white border border-slate-200 shadow-sm"
                          : "text-slate-400 hover:bg-slate-100/50"
                      }`}
                    >
                      {selectedFloor === floor && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#e65c55] rounded-r-full hidden md:block"></div>
                      )}
                      {selectedFloor === floor && (
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-8 bg-[#e65c55] rounded-t-full block md:hidden"></div>
                      )}
                      <span
                        className={`material-symbols-outlined mb-1 text-2xl ${
                          selectedFloor === floor ? "text-[#e65c55]" : ""
                        }`}
                      >
                        domain
                      </span>
                      <span
                        className={`text-[11px] font-black uppercase tracking-wider ${
                          selectedFloor === floor ? "text-slate-800" : ""
                        }`}
                      >
                        Tầng {floor}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Khu vực Sơ đồ chính */}
                <div className="flex-1 bg-white flex flex-col relative overflow-hidden">
                  
                  {/* Tiêu đề sơ đồ & Legend */}
                  <div className="px-8 pt-8 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-50">
                    <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
                      Sơ đồ Box - Tầng {selectedFloor}
                    </h2>
                    {/* Chú thích màu sắc & Icon */}
                    <div className="flex flex-wrap gap-4 text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest bg-slate-50 px-4 py-2.5 rounded-xl">
                      <div className="flex items-center gap-1.5">
                        <span className="w-3.5 h-3.5 rounded bg-[#e65c55] shadow-sm"></span> Đã chọn
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-3.5 h-3.5 rounded bg-slate-100 border border-slate-200"></span> Đã đặt
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-3.5 h-3.5 rounded bg-white border border-slate-200 shadow-sm"></span> Thường
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-3.5 h-3.5 rounded bg-[#fef0b3] shadow-sm"></span> Cao cấp
                      </div>
                    </div>
                  </div>

                  {/* Lưới phòng động (Có thanh cuộn riêng) */}
                  <div className="flex-1 overflow-y-auto custom-scrollbar p-6 sm:p-10 relative">
                    <div className="flex justify-center mb-10">
                      <div className="bg-[#a394e1] text-white text-xs font-black px-16 py-2.5 rounded-full uppercase tracking-widest shadow-sm">
                        Khu A
                      </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6 sm:gap-12 pb-[100px]">
                      {mapConfigs.map((colConfig, colIndex) => (
                        <React.Fragment key={colIndex}>
                          <div className="space-y-4">
                            {colConfig.map((config, rowIdx) => {
                              const roomNum = selectedFloor * 100 + (colIndex * 5 + rowIdx + 1);
                              const roomId = roomNum.toString().padStart(3, "0");
                              const isSelected = selectedRooms.includes(roomId);
                              const isBooked = config.isBooked;

                              let bgClass = "bg-white border border-slate-200 text-slate-700 hover:border-slate-400 hover:shadow-md";
                              if (isSelected) {
                                bgClass = "bg-[#e65c55] text-white border-[#e65c55] shadow-md ring-2 ring-[#e65c55]/30";
                              } else if (isBooked) {
                                bgClass = "bg-slate-50 text-slate-400 border-transparent opacity-70";
                              } else if (config.isPremium) {
                                bgClass = "bg-[#fef0b3] text-slate-800 border-transparent hover:border-[#d9c05e] shadow-sm";
                              }

                              let text = `${roomId} |`;
                              if (config.label) text = config.label;

                              return (
                                <div
                                  key={roomId}
                                  onClick={() => handleRoomClick(roomId, isBooked)}
                                  className={`${bgClass} w-32 sm:w-36 py-4 rounded-xl flex items-center justify-center gap-3 font-bold transition-all ${
                                    !isBooked ? "cursor-pointer active:scale-95" : "cursor-not-allowed"
                                  }`}
                                >
                                  <span className="text-sm sm:text-base">{text}</span>
                                  {config.icon && (
                                    <span
                                      className={`material-symbols-outlined text-base sm:text-lg ${
                                        !isBooked && !isSelected ? "fill-1" : ""
                                      }`}
                                    >
                                      {config.icon}
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                          {/* Vách ngăn giữa 2 cụm */}
                          {colIndex === 1 && (
                            <div className="hidden lg:block w-[2px] bg-slate-100 h-[auto] mx-2 rounded-full"></div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  {/* THANH CONTROL CỐ ĐỊNH Ở ĐÁY KHUNG MÀN HÌNH BÊN PHẢI */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 bg-white border-t border-slate-100 flex justify-end items-center z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.03)]">
                    <button
                      onClick={() => {
                        if (!user) {
                          setIsAuthModalOpen(true);
                        } else {
                          navigate("/booking-summary");
                        }
                      }}
                      disabled={selectedRooms.length === 0}
                      className={`${
                        selectedRooms.length > 0 
                        ? "bg-[#2063D1] text-white hover:bg-blue-700 shadow-xl shadow-[#2063D1]/20" 
                        : "bg-slate-100 text-slate-400 cursor-not-allowed"
                      } w-full sm:w-auto px-10 py-3.5 rounded-xl font-black text-base transition-all flex justify-center items-center gap-3`}
                    >
                      Xác nhận & Tiếp tục
                      {selectedRooms.length > 0 && (
                        <span className="bg-white/20 text-white rounded-full px-3 py-0.5 text-xs">
                          {selectedRooms.length}/{MAX_ROOMS}
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== MODAL ĐĂNG NHẬP ==================== */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode="login"
      />
    </div>
  );
};

export default RoomDetail;