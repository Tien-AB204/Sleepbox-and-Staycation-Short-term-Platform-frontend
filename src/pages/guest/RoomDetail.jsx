import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const RoomDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="bg-[#f7f6f8] text-slate-900 font-sans antialiased">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Info & Actions */}
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            CyberBox District 1
          </h1>
          {/* Brand Mock */}
          <div className="flex items-center gap-2 mt-1">
            <span className="px-2 py-0.5 bg-slate-100 border border-slate-200 text-[#4059AD] font-black text-[10px] uppercase tracking-widest rounded-md">
              BoxHub Official
            </span>
            <span className="text-xs text-slate-500 font-medium">Cơ sở được chứng nhận</span>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm font-medium">
            <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-1 rounded-lg">
              <span className="material-symbols-outlined text-amber-500 fill-1 text-lg">star_rate</span>
              <span className="font-bold">4.8</span>
            </div>
            <span className="text-slate-500 underline decoration-dotted underline-offset-4 cursor-pointer hover:text-slate-800">
              (120 đánh giá)
            </span>
            <span className="text-slate-300">|</span>
            <div className="flex items-center gap-1 text-slate-600">
              <span className="material-symbols-outlined text-lg text-[#4059AD]">location_on</span>
              <span>123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh</span>
            </div>
            <div className="flex flex-1 justify-end gap-2">
              <button className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-semibold hover:bg-[#4059AD]/5 transition-colors border border-slate-200">
                <span className="material-symbols-outlined text-lg">share</span> Chia sẻ
              </button>
              <button className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-semibold hover:bg-[#4059AD]/5 transition-colors border border-slate-200">
                <span className="material-symbols-outlined text-lg text-red-500">favorite</span> Lưu
              </button>
            </div>
          </div>
        </div>

        {/* 2. GALLERY & BRAND & MAP SECTION */}
        <div className="flex flex-col lg:flex-row gap-3 mb-10 h-[450px]">
          {/* Cột 1: Ảnh to (Chiếm 45%) */}
          <div className="lg:w-[45%] h-full relative group overflow-hidden rounded-xl shadow-sm">
            <img
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              src="https://images.unsplash.com/photo-1596120236172-231999844ade?w=800"
              alt="Main"
            />
            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
          </div>

          {/* Cột 2: Grid 4 ảnh nhỏ (Chiếm 30%) */}
          <div className="lg:w-[30%] h-full grid grid-cols-2 grid-rows-2 gap-3">
             <div className="relative group overflow-hidden rounded-xl shadow-sm">
               <img className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFN-_5pqMeoW6teOOPTx-ieA3B2VrDShAQvltbopUDGgHsNrTWlMBZmo1gkeexXaAuTpYA7VlCnIySKyTEOST5sIqxC2MLK-gsnSYh4OZmOK47BJHhVnu0JD3LNdNAUm_UhLEOMpmtZaUBDmrTLkAoiL_BavFUlopr2XSnG9blWga52E3mXv5H7IKXziyJYbEJ32_caIk4WH4oU-37Fe-ziARZJhWHqBTDtdh7YDd8Y1CnMLHDk4ttUJnUfXynGoF5LrixnYPX3mdS" alt="Room 1" />
             </div>
             <div className="relative group overflow-hidden rounded-xl shadow-sm">
               <img className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB__OOBaJ04dRhaxPMwQlCTo5W3t7MZ_BSZZM2702i3T36MPR-rdwmg4hf8aRJQMRnnVxvXUmBRqQyFYgq0vS3uL1kzjE7Q9tJtPOGvCbj68aXAy26eQtJx1uM_Jex5yQ4ftwV4jITDpew__E0oIAMY-xpmm2sPDHgfkJznhgPHtREa4oBx1w1vlBKUW_-lgd_PwtxCic0qdyik7bVgxjgfWQzYPpcv1VhJ1MeCD5yaPDvaoIicGKfoDQy1sNbrz3S32KFlL9V0babZ" alt="Room 2" />
             </div>
             <div className="relative group overflow-hidden rounded-xl shadow-sm">
               <img className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuArxlIdXg4p50I7RnUWtudGcUE8jL9i7Of3SdYrrB021pu8rHk4LDxZvhGwKWlbSAlBZnjcS3WDHuhbG2IL4i0zbfFGZIAPul4qLPMgfosu9fBlXbijZnit1w81JYKqWc6d5OD3BpiMFWhjQRYVGudt5_M8rAT6yLjifPXrM1aPWyn6i8lr0WwtMnUHA8URY-ZXcMzAxkyrVGHJ6AI6k0ALDn2RG31txt8Q2x5GNCCAFFPAvj5FDYchEMIYYKG7xUEzfY0M13MtlH-K" alt="Room 3" />
             </div>
             <div className="relative group overflow-hidden rounded-xl shadow-sm cursor-pointer">
               <img className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgaFRcTCGoN5T2ZEqGcDvKj1ShIKaqiWk9eCUdYbtJx0W9tIzix_YhQdZJDiBnxnl3APgY9ooIhUXvOulq3xEMVUEbt0gC9HCyWPDlXSNlgNeRw32KRxBrV5LAelaJzSzC2DDQfxusnBq-b2elCsyvyyyNsuSFSe-jCTzehtfJcy8sQT2om_awy9Fg3nRjF-AAfkUAStCVCaLB8STdbx5KkuX1nqUNOqmAGR_ssR1CfXo1Of5l7kyjqEy1jQ8f72TLrVj1WrTzgoWv" alt="Room 4" />
               <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="text-white font-bold text-lg underline underline-offset-4">+195 ảnh</span>
               </div>
             </div>
          </div>

          {/* Cột 3: Thương hiệu & Bản đồ (Chiếm 25%) */}
          <div className="hidden lg:flex flex-col gap-3 lg:w-[25%] h-full">
             {/* Brand Box thay cho Nhận xét */}
             <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex items-center justify-between gap-3 shrink-0">
                <div className="flex flex-col justify-center flex-1 pr-3 border-r border-slate-100">
                    <p className="text-xs text-slate-500 font-medium mb-1">Thương hiệu/chuỗi</p>
                    <h3 className="text-base font-black text-slate-800 leading-tight">BoxHub Official</h3>
                </div>
                <div className="w-14 h-14 shrink-0 flex items-center justify-center bg-slate-50 rounded-lg border border-slate-100">
                    {/* Dùng icon tòa nhà làm Logo placeholder */}
                    <span className="material-symbols-outlined text-3xl text-[#4059AD]">domain</span>
                </div>
             </div>
             
             {/* Mini Map - Được hưởng lợi chiều cao flex-1 */}
             <div className="flex-1 rounded-xl overflow-hidden border border-slate-200 relative group cursor-pointer shadow-sm shrink-0">
               <img src="https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s-l+4059AD(106.701,10.776)/106.701,10.776,15,0/320x450?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTAwYjYycXB2bm93OTdwazgifQ==" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Map" />
               <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
               <div className="absolute inset-0 flex items-center justify-center">
                  <button className="bg-[#4059AD] text-white px-4 py-2 rounded-lg shadow-xl font-bold text-[11px] uppercase tracking-wider flex items-center gap-1 hover:bg-[#32488f]">
                    <span className="material-symbols-outlined text-sm">location_on</span>
                    Hiển thị bản đồ
                  </button>
               </div>
             </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column: Details & Rooms */}
          <div className="flex-1 space-y-10">
            {/* Description */}
            <section>
              <div className="flex items-center justify-between border-b border-slate-200 pb-6 mb-6">
                <div>
                  <h2 className="text-2xl font-bold">
                    Toàn bộ không gian được quản lý bởi BoxHost
                  </h2>
                  <p className="text-slate-500 mt-1">
                    Sức chứa tối đa 24 khách · 24 pods · 4 phòng tắm · Wi-Fi tốc
                    độ cao
                  </p>
                </div>
                <div className="h-14 w-14 rounded-full overflow-hidden border border-slate-200 shadow-sm">
                  <img
                    alt="Host"
                    className="h-full w-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3vHmMGT6e7hPq39XInZ2GdW2gBCtzaFa9wBREU4SX1Gf25O6l7EFcUcVVy9JUaH2dmOeb2lGqJ8mUQU8ihQo66jDK6ap4aHhpEqxrFqVNUxOMRH3gyglyY3suLrdWlFeWT5aqddI6x8m13pctG7ZtyLVt_G01WJpwWKR-rrRUglBQs8fPEoRlnfeiiqZOMnzIT2D1XQDQDV0Lrf-3UA6JGxSpFRr3Y4fyrc1T-qlZUFfnSbuhgBaJOs4xCFFZ2NWNze5KAmfGJ3TP"
                  />
                </div>
              </div>
              <p className="leading-relaxed text-slate-600">
                CyberBox District 1 mang đến trải nghiệm lưu trú hiện đại ngay
                tại trái tim của thành phố. Với thiết kế lấy cảm hứng từ phong
                cách Cyberpunk...
              </p>
            </section>

            {/* Amenities */}
            <section>
              <h2 className="text-xl font-bold mb-6">Tiện nghi có sẵn</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: "wifi", text: "Wi-Fi 6 tốc độ 500Mbps" },
                  { icon: "ac_unit", text: "Điều hòa trung tâm & lọc khí" },
                  { icon: "restaurant", text: "Bếp chung & lò vi sóng" },
                  { icon: "shield", text: "An ninh 24/7 & Camera AI" },
                  { icon: "coffee", text: "Cà phê & Trà miễn phí" },
                  { icon: "iron", text: "Máy giặt & Bàn ủi" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4 text-slate-700">
                    <span className="material-symbols-outlined text-2xl text-[#4059AD]">
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
              <button className="mt-8 rounded-xl border border-slate-300 px-6 py-3 font-bold text-slate-700 hover:bg-slate-50 hover:border-[#4059AD] hover:text-[#4059AD] transition-colors">
                Hiển thị tất cả 25 tiện nghi
              </button>
            </section>

            {/* Room Types Selection */}
            <section>
              <h2 className="text-xl font-bold mb-6">Lựa chọn phòng nghỉ</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="group relative rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="aspect-video w-full overflow-hidden rounded-lg mb-4">
                    <img className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYS0ZwH7Jn5zg83gnBnHBC2ne4b4-7JHSiUozoVQ4oE7PN_Sq5TuJsWxM4Rv3JPRPFIHr4tUwVkaVOpVMPQxkQ6ZC9QzqabrL812Y3wHaqDfHbMWNzkindydslYFVm2DdRsvuVVfmT3-y5WgJwuvCuaeBkKMIELGGg6UB1fIBVGOt9eIOZKi-w6-_cjjSGtTDKXBuJH54A16YWi31HPSoGdaV6vb1-pvUv18LszkjnjyvWV7Zg5F91t6gR5hSVsd_gETFaU269a-6C" alt="Room" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-800">Neon Solo Pod</h3>
                  <p className="text-sm text-slate-500 mb-4 font-medium italic">1 giường đơn · Đèn LED RGB · Cổng sạc USB-C</p>
                  <div className="flex items-center justify-between">
                    <span className="font-black text-[#4059AD] text-lg">80.000đ <span className="text-xs font-bold text-slate-400 uppercase">/giờ</span></span>
                    <button className="rounded-lg bg-[#4059AD] px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-[#32488f]">Chọn</button>
                  </div>
                </div>
                {/* Card 2 */}
                <div className="group relative rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="aspect-video w-full overflow-hidden rounded-lg mb-4">
                    <img className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBstNBUKyRYNOg74VJLJe8MTd6Cluf7XunmTxwUNW4heSHXBuPzoBs_lDRYyKp-SqTxKBFvF-rs6UMJwvq9Y-1br_yIoSzp6_WBHfXvHRKQbYdhmRIac76T16bdpYMEi-pNcT4WV8E_sih-0tXwbKUEmY36DusDY2Kpd6ehaV0W-UE7WecKknTIk9r2uk1JpR5ZFo9ktcOWOqu35lsTHd0wOSMtHt4iTniniVIWuFqxZZba8jJ6wflutdd2SNz_By_LaiyDTGJng627" alt="Room" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-800">Superior Double Box</h3>
                  <p className="text-sm text-slate-500 mb-4 font-medium italic">1 giường đôi · Tivi riêng · Nệm cao su non</p>
                  <div className="flex items-center justify-between">
                    <span className="font-black text-[#4059AD] text-lg">150.000đ <span className="text-xs font-bold text-slate-400 uppercase">/giờ</span></span>
                    <button className="rounded-lg bg-[#4059AD] px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-[#32488f]">Chọn</button>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Booking Widget */}
          <div className="w-full lg:w-[400px]">
            <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl shadow-[#4059AD]/5">
              <div className="flex items-end justify-between mb-6">
                <div>
                  <span className="text-2xl font-black text-[#4059AD]">250.000đ</span>
                  <span className="text-xs font-bold text-slate-400 uppercase ml-1">/đêm</span>
                </div>
                <div className="text-sm font-bold flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg text-amber-700">
                  <span className="material-symbols-outlined text-amber-500 text-sm fill-1">star_rate</span> 4.8
                </div>
              </div>
              
              {/* Form đặt phòng... (Giữ nguyên của Tiến) */}
              
              <button onClick={() => navigate('/booking-summary')} className="mt-6 w-full rounded-xl bg-[#4059AD] py-4 text-center font-bold text-white shadow-lg shadow-[#4059AD]/20 hover:brightness-110 active:scale-[0.98] transition-all">
                Đặt ngay
              </button>
              
              <p className="mt-4 text-center text-xs font-medium text-slate-400">Bạn vẫn chưa bị trừ tiền</p>
              
              <div className="mt-6 space-y-4">
                <div className="flex justify-between text-sm font-medium text-slate-600">
                  <span className="underline decoration-slate-300">250.000đ x 1 đêm</span>
                  <span>250.000đ</span>
                </div>
                <div className="flex justify-between text-sm font-medium text-slate-600">
                  <span className="underline decoration-slate-300">Phí dịch vụ</span>
                  <span>25.000đ</span>
                </div>
                <hr className="border-slate-100" />
                <div className="flex justify-between text-base font-black text-slate-800">
                  <span>Tổng cộng</span>
                  <span>275.000đ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RoomDetail;