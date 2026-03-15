import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const RoomDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="bg-[#f7f6f8] text-slate-900 font-sans antialiased">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-[#351a5b]/10 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-8">
            <div className="flex items-center gap-2 shrink-0 cursor-pointer" onClick={() => navigate('/')}>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#351a5b] text-white">
                <span className="material-symbols-outlined">grid_view</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-[#351a5b]">
                BoxHub
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a
                className="text-sm font-semibold hover:text-[#351a5b] transition-colors"
                href="#"
              >
                Khám phá
              </a>
              <a
                className="text-sm font-semibold hover:text-[#351a5b] transition-colors"
                href="#"
              >
                Đặt chỗ
              </a>
              <a
                className="text-sm font-semibold hover:text-[#351a5b] transition-colors"
                href="#"
              >
                Hỗ trợ
              </a>
            </nav>
            <div className="flex flex-1 items-center justify-end gap-4">
              <div className="relative hidden sm:block max-w-xs w-full">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                  search
                </span>
                <input
                  className="w-full rounded-full border-none bg-[#351a5b]/5 py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#351a5b]/20 transition-all"
                  placeholder="Tìm kiếm vị trí..."
                  type="text"
                />
              </div>
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#351a5b]/10 text-[#351a5b]">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <div
                className="h-10 w-10 rounded-full bg-slate-200 border-2 border-[#351a5b]/20 overflow-hidden"
                data-alt="Ảnh đại diện người dùng"
              >
                <img
                  alt="User"
                  className="h-full w-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCL53rVfAnkLJX0md8iU-Ym7fyhZI3hg0rsa7_km-u7-4WGGbIEvZKPGrUx1Y__zKZO_MQelThuaR7wUBAffVIwGSDMNJm1EQGJEuhXrwhK14L92Pr6WmDcBTLoE-rgDKVgffZEnmYvdvmqJO0bszbpuw1mEkeKxhQgIH0_M4_Ry5aowUJQqywnxendy9ee2_5iS02zZ3RABZ1oll5WP6kz-YSFJP1UrwKnnEoysXk9jckm9MlMTmfmkZSztmigR7Bl_CCUb-MD_RX"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Info & Actions */}
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold tracking-tight">
            CyberBox District 1
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-4 text-sm font-medium">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-yellow-500 fill-current text-lg">
                star
              </span>
              <span>4.8</span>
              <span className="text-slate-500 underline decoration-dotted underline-offset-4">
                (120 đánh giá)
              </span>
            </div>
            <div className="flex items-center gap-1 text-slate-500">
              <span className="material-symbols-outlined text-lg text-[#351a5b]">
                location_on
              </span>
              <span>123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh</span>
            </div>
            <div className="flex flex-1 justify-end gap-2">
              <button className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-semibold hover:bg-[#351a5b]/5 transition-colors border border-slate-200">
                <span className="material-symbols-outlined text-lg">share</span>{" "}
                Chia sẻ
              </button>
              <button className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-semibold hover:bg-[#351a5b]/5 transition-colors border border-slate-200">
                <span className="material-symbols-outlined text-lg">
                  favorite
                </span>{" "}
                Lưu
              </button>
            </div>
          </div>
        </div>
        {/* Image Gallery Grid */}
        <div className="grid grid-cols-4 grid-rows-2 gap-3 h-[450px] overflow-hidden rounded-xl mb-10">
          <div className="col-span-2 row-span-2 relative group overflow-hidden">
            <img
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              data-alt="Không gian phòng ngủ sleepbox hiện đại màu tím neon"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjJdtRlktdDVNCD0yenUIIIbtPqX_hsND2-d_nbeCzEt4NfzMasPK0OfMig55J9Luy5HVvvslsEH4d_69Jl1f4Ed3_yYdYZZEl2eJgExrTPF5nfT-evxI2yUw-zgfqccTc5Rg-u9jjfMVFnDcCBHU8jXjEG0L5j4KXKlFGs_gF2l2kf14N6uUsRbM9isq6_9Vml49DOvLhuHaNl1TqRpsLWspBtIu61SokqzUW1axwbdXIlTsfYOYPGNs9uLS1Eb6R8zSIdxqWhrDH"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/5"></div>
          </div>
          <div className="relative group overflow-hidden">
            <img
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              data-alt="Khu vực chung yên tĩnh để làm việc"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFN-_5pqMeoW6teOOPTx-ieA3B2VrDShAQvltbopUDGgHsNrTWlMBZmo1gkeexXaAuTpYA7VlCnIySKyTEOST5sIqxC2MLK-gsnSYh4OZmOK47BJHhVnu0JD3LNdNAUm_UhLEOMpmtZaUBDmrTLkAoiL_BavFUlopr2XSnG9blWga52E3mXv5H7IKXziyJYbEJ32_caIk4WH4oU-37Fe-ziARZJhWHqBTDtdh7YDd8Y1CnMLHDk4ttUJnUfXynGoF5LrixnYPX3mdS"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="relative group overflow-hidden rounded-tr-xl">
            <img
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              data-alt="Phòng tắm chung sạch sẽ và tiện nghi"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB__OOBaJ04dRhaxPMwQlCTo5W3t7MZ_BSZZM2702i3T36MPR-rdwmg4hf8aRJQMRnnVxvXUmBRqQyFYgq0vS3uL1kzjE7Q9tJtPOGvCbj68aXAy26eQtJx1uM_Jex5yQ4ftwV4jITDpew__E0oIAMY-xpmm2sPDHgfkJznhgPHtREa4oBx1w1vlBKUW_-lgd_PwtxCic0qdyik7bVgxjgfWQzYPpcv1VhJ1MeCD5yaPDvaoIicGKfoDQy1sNbrz3S32KFlL9V0babZ"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="relative group overflow-hidden">
            <img
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              data-alt="Dãy các kén ngủ thiết kế tối giản"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuArxlIdXg4p50I7RnUWtudGcUE8jL9i7Of3SdYrrB021pu8rHk4LDxZvhGwKWlbSAlBZnjcS3WDHuhbG2IL4i0zbfFGZIAPul4qLPMgfosu9fBlXbijZnit1w81JYKqWc6d5OD3BpiMFWhjQRYVGudt5_M8rAT6yLjifPXrM1aPWyn6i8lr0WwtMnUHA8URY-ZXcMzAxkyrVGHJ6AI6k0ALDn2RG31txt8Q2x5GNCCAFFPAvj5FDYchEMIYYKG7xUEzfY0M13MtlH-K"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="relative group overflow-hidden rounded-br-xl">
            <img
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              data-alt="Tủ đồ cá nhân an toàn có khóa điện tử"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgaFRcTCGoN5T2ZEqGcDvKj1ShIKaqiWk9eCUdYbtJx0W9tIzix_YhQdZJDiBnxnl3APgY9ooIhUXvOulq3xEMVUEbt0gC9HCyWPDlXSNlgNeRw32KRxBrV5LAelaJzSzC2DDQfxusnBq-b2elCsyvyyyNsuSFSe-jCTzehtfJcy8sQT2om_awy9Fg3nRjF-AAfkUAStCVCaLB8STdbx5KkuX1nqUNOqmAGR_ssR1CfXo1Of5l7kyjqEy1jQ8f72TLrVj1WrTzgoWv"
              referrerPolicy="no-referrer"
            />
            <button className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg flex items-center gap-2 text-slate-900 border border-slate-200">
              <span className="material-symbols-outlined text-sm">
                grid_view
              </span>{" "}
              Hiển thị tất cả ảnh
            </button>
          </div>
        </div>
        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column: Details & Rooms */}
          <div className="flex-1 space-y-10">
            {/* Description */}
            <section>
              <div className="flex items-center justify-between border-b border-[#351a5b]/10 pb-6 mb-6">
                <div>
                  <h2 className="text-2xl font-bold">
                    Toàn bộ không gian được quản lý bởi BoxHost
                  </h2>
                  <p className="text-slate-500 mt-1">
                    Sức chứa tối đa 24 khách · 24 pods · 4 phòng tắm · Wi-Fi tốc
                    độ cao
                  </p>
                </div>
                <div
                  className="h-14 w-14 rounded-full overflow-hidden border-2 border-[#351a5b]/20"
                  data-alt="Ảnh đại diện người quản lý cơ sở"
                >
                  <img
                    alt="Host"
                    className="h-full w-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3vHmMGT6e7hPq39XInZ2GdW2gBCtzaFa9wBREU4SX1Gf25O6l7EFcUcVVy9JUaH2dmOeb2lGqJ8mUQU8ihQo66jDK6ap4aHhpEqxrFqVNUxOMRH3gyglyY3suLrdWlFeWT5aqddI6x8m13pctG7ZtyLVt_G01WJpwWKR-rrRUglBQs8fPEoRlnfeiiqZOMnzIT2D1XQDQDV0Lrf-3UA6JGxSpFRr3Y4fyrc1T-qlZUFfnSbuhgBaJOs4xCFFZ2NWNze5KAmfGJ3TP"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <p className="leading-relaxed text-slate-600">
                CyberBox District 1 mang đến trải nghiệm lưu trú hiện đại ngay
                tại trái tim của thành phố. Với thiết kế lấy cảm hứng từ phong
                cách Cyberpunk, mỗi sleepbox đều được trang bị đầy đủ tiện nghi,
                hệ thống lọc khí riêng biệt và ánh sáng tùy chỉnh giúp bạn có
                giấc ngủ sâu nhất. Vị trí đắc địa, chỉ 5 phút đi bộ đến Chợ Bến
                Thành và Phố đi bộ Nguyễn Huệ.
              </p>
            </section>
            {/* Amenities */}
            <section>
              <h2 className="text-xl font-bold mb-6">Tiện nghi có sẵn</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-4 text-slate-700">
                  <span className="material-symbols-outlined text-2xl text-[#351a5b]/80">
                    wifi
                  </span>
                  <span className="font-medium">Wi-Fi 6 tốc độ 500Mbps</span>
                </div>
                <div className="flex items-center gap-4 text-slate-700">
                  <span className="material-symbols-outlined text-2xl text-[#351a5b]/80">
                    ac_unit
                  </span>
                  <span className="font-medium">Điều hòa trung tâm &amp; lọc khí</span>
                </div>
                <div className="flex items-center gap-4 text-slate-700">
                  <span className="material-symbols-outlined text-2xl text-[#351a5b]/80">
                    restaurant
                  </span>
                  <span className="font-medium">Bếp chung &amp; lò vi sóng</span>
                </div>
                <div className="flex items-center gap-4 text-slate-700">
                  <span className="material-symbols-outlined text-2xl text-[#351a5b]/80">
                    shield
                  </span>
                  <span className="font-medium">An ninh 24/7 &amp; Camera AI</span>
                </div>
                <div className="flex items-center gap-4 text-slate-700">
                  <span className="material-symbols-outlined text-2xl text-[#351a5b]/80">
                    coffee
                  </span>
                  <span className="font-medium">Cà phê &amp; Trà miễn phí</span>
                </div>
                <div className="flex items-center gap-4 text-slate-700">
                  <span className="material-symbols-outlined text-2xl text-[#351a5b]/80">
                    iron
                  </span>
                  <span className="font-medium">Máy giặt &amp; Bàn ủi</span>
                </div>
              </div>
              <button className="mt-8 rounded-xl border border-[#351a5b] px-6 py-3 font-bold text-[#351a5b] hover:bg-[#351a5b]/5 transition-colors">
                Hiển thị tất cả 25 tiện nghi
              </button>
            </section>
            {/* Room Types Selection */}
            <section>
              <h2 className="text-xl font-bold mb-6">Lựa chọn phòng nghỉ</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Card 1 */}
                <div className="group relative rounded-xl border border-[#351a5b]/10 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div
                    className="aspect-video w-full overflow-hidden rounded-lg mb-4"
                    data-alt="Hình ảnh kén ngủ đơn tiêu chuẩn"
                  >
                    <img
                      className="h-full w-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYS0ZwH7Jn5zg83gnBnHBC2ne4b4-7JHSiUozoVQ4oE7PN_Sq5TuJsWxM4Rv3JPRPFIHr4tUwVkaVOpVMPQxkQ6ZC9QzqabrL812Y3wHaqDfHbMWNzkindydslYFVm2DdRsvuVVfmT3-y5WgJwuvCuaeBkKMIELGGg6UB1fIBVGOt9eIOZKi-w6-_cjjSGtTDKXBuJH54A16YWi31HPSoGdaV6vb1-pvUv18LszkjnjyvWV7Zg5F91t6gR5hSVsd_gETFaU269a-6C"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h3 className="font-bold text-lg">Neon Solo Pod</h3>
                  <p className="text-sm text-slate-500 mb-4">
                    1 giường đơn · Đèn LED RGB · Cổng sạc USB-C
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#351a5b]">
                      80.000đ{" "}
                      <span className="text-sm font-normal text-slate-500">
                        /giờ
                      </span>
                    </span>
                    <button className="rounded-lg bg-[#351a5b]/10 px-4 py-2 text-sm font-bold text-[#351a5b]">
                      Chọn
                    </button>
                  </div>
                </div>
                {/* Card 2 */}
                <div className="group relative rounded-xl border border-[#351a5b]/10 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div
                    className="aspect-video w-full overflow-hidden rounded-lg mb-4"
                    data-alt="Hình ảnh kén ngủ đôi cao cấp"
                  >
                    <img
                      className="h-full w-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBstNBUKyRYNOg74VJLJe8MTd6Cluf7XunmTxwUNW4heSHXBuPzoBs_lDRYyKp-SqTxKBFvF-rs6UMJwvq9Y-1br_yIoSzp6_WBHfXvHRKQbYdhmRIac76T16bdpYMEi-pNcT4WV8E_sih-0tXwbKUEmY36DusDY2Kpd6ehaV0W-UE7WecKknTIk9r2uk1JpR5ZFo9ktcOWOqu35lsTHd0wOSMtHt4iTniniVIWuFqxZZba8jJ6wflutdd2SNz_By_LaiyDTGJng627"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h3 className="font-bold text-lg">Superior Double Box</h3>
                  <p className="text-sm text-slate-500 mb-4">
                    1 giường đôi · Tivi riêng · Nệm cao su non
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#351a5b]">
                      150.000đ{" "}
                      <span className="text-sm font-normal text-slate-500">
                        /giờ
                      </span>
                    </span>
                    <button className="rounded-lg bg-[#351a5b]/10 px-4 py-2 text-sm font-bold text-[#351a5b]">
                      Chọn
                    </button>
                  </div>
                </div>
              </div>
            </section>
            <hr className="border-[#351a5b]/5" />
            {/* Reviews Section */}
            <section>
              <div className="flex items-center gap-6 mb-8">
                <div className="flex flex-col items-center">
                  <span className="text-5xl font-black text-[#351a5b]">4.8</span>
                  <div className="flex gap-0.5 mt-2">
                    <span className="material-symbols-outlined text-[#351a5b] fill-current text-sm">
                      star
                    </span>
                    <span className="material-symbols-outlined text-[#351a5b] fill-current text-sm">
                      star
                    </span>
                    <span className="material-symbols-outlined text-[#351a5b] fill-current text-sm">
                      star
                    </span>
                    <span className="material-symbols-outlined text-[#351a5b] fill-current text-sm">
                      star
                    </span>
                    <span className="material-symbols-outlined text-[#351a5b] fill-current text-sm">
                      star_half
                    </span>
                  </div>
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium w-16 text-right">
                      Sạch sẽ
                    </span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#351a5b]/10">
                      <div
                        className="h-full bg-[#351a5b]"
                        style={{ width: "95%" }}
                      ></div>
                    </div>
                    <span className="text-xs font-bold w-8 text-right">
                      4.9
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium w-16 text-right">
                      Vị trí
                    </span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#351a5b]/10">
                      <div
                        className="h-full bg-[#351a5b]"
                        style={{ width: "100%" }}
                      ></div>
                    </div>
                    <span className="text-xs font-bold w-8 text-right">
                      5.0
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium w-16 text-right">
                      Giá trị
                    </span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#351a5b]/10">
                      <div
                        className="h-full bg-[#351a5b]"
                        style={{ width: "85%" }}
                      ></div>
                    </div>
                    <span className="text-xs font-bold w-8 text-right">
                      4.5
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="h-10 w-10 rounded-full bg-slate-200 overflow-hidden"
                      data-alt="Người dùng Nguyễn An"
                    >
                      <img
                        className="h-full w-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVRHvgY2mXKqlkso_cwW54yXvpWfpgmxHObvPThEdmZ3Yh967cXZ4KecsNNVpiXuHXj5qgNYJDKg6q3zjvYBs0Xm-94IfbRxjygu8WlIh_6B1zZjAjPXwVttQD04sCel5V1lNFsP7mZDOc9ui7ynEZjUMrma6lgNffzFrKKO8QJI8jP_HqtJfNVCw8gzzzr3H8kgQs1Wp2epLYBNXBb94CX3PN5-W0WEUJRlP74PbYkUuXGpdF5PWKyeGqOAodRT-qAk2G6UbIl1ZZ"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <p className="font-bold leading-none">Nguyễn An</p>
                      <p className="text-xs text-slate-500">Tháng 10, 2023</p>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm">
                    Không gian cực kỳ yên tĩnh và sạch sẽ. Hệ thống thông gió
                    rất tốt, không bị bí bách như các chỗ khác. Rất đáng trải
                    nghiệm!
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="h-10 w-10 rounded-full bg-slate-200 overflow-hidden"
                      data-alt="Người dùng Minh Tuấn"
                    >
                      <img
                        className="h-full w-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuKQLA3WPywB3TJBQiq0cpBrx2Lum7qXiMPu7L21i6waiI1sVITcbrV0pwnzV5fWCXEfLoUq0znz0WhxX_jiveTdXPVyvgfpUIXLu02154rkoYYtiuWy-zzkMSJoBgiVgbvgA4gKaMQJ_h1TPJzme-vHgwQa6zf0ixURmpwJNW4ZSCFkXLnIY9ZBI1GfWf20CuP6FsRGZcfDkK-s0um3WnujIkwBewhNylsinpW-zNqb8s4bb9DrqEH9hhAx3zQO2SntlgP7f44TL7"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <p className="font-bold leading-none">Minh Tuấn</p>
                      <p className="text-xs text-slate-500">Tháng 9, 2023</p>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm">
                    Vị trí ngay trung tâm, đi đâu cũng tiện. Pod hiện đại, đèn
                    đổi màu cực chill. Nhân viên hỗ trợ nhiệt tình.
                  </p>
                </div>
              </div>
              <button className="mt-8 rounded-xl border border-slate-300 px-6 py-3 font-bold hover:bg-slate-50 transition-colors">
                Hiển thị tất cả đánh giá
              </button>
            </section>
          </div>
          {/* Right Column: Booking Widget */}
          <div className="w-full lg:w-[400px]">
            <div className="sticky top-24 rounded-2xl border border-[#351a5b]/10 bg-white p-6 shadow-xl shadow-[#351a5b]/5">
              <div className="flex items-end justify-between mb-6">
                <div>
                  <span className="text-2xl font-black text-[#351a5b]">
                    250.000đ
                  </span>
                  <span className="text-slate-500 font-medium">/đêm</span>
                </div>
                <div className="text-sm font-semibold">
                  <span className="material-symbols-outlined text-xs align-middle">
                    star
                  </span>{" "}
                  4.8
                </div>
              </div>
              <div className="rounded-xl border border-slate-300 overflow-hidden mb-6">
                <div className="grid grid-cols-2 border-b border-slate-300">
                  <div className="p-3 border-r border-slate-300">
                    <label className="block text-[10px] font-bold uppercase text-slate-500">
                      Ngày nhận
                    </label>
                    <input
                      className="w-full border-none p-0 text-sm focus:ring-0 bg-transparent font-medium"
                      type="text"
                      defaultValue="12/10/2023"
                    />
                  </div>
                  <div className="p-3">
                    <label className="block text-[10px] font-bold uppercase text-slate-500">
                      Ngày trả
                    </label>
                    <input
                      className="w-full border-none p-0 text-sm focus:ring-0 bg-transparent font-medium"
                      type="text"
                      defaultValue="13/10/2023"
                    />
                  </div>
                </div>
                <div className="p-3 border-b border-slate-300">
                  <label className="block text-[10px] font-bold uppercase text-slate-500">
                    Loại hình đặt
                  </label>
                  <select className="w-full border-none p-0 text-sm focus:ring-0 bg-transparent font-medium cursor-pointer">
                    <option>Qua đêm (Overnight)</option>
                    <option>Theo giờ (Hourly)</option>
                  </select>
                </div>
                <div className="p-3">
                  <label className="block text-[10px] font-bold uppercase text-slate-500">
                    Số lượng khách
                  </label>
                  <select className="w-full border-none p-0 text-sm focus:ring-0 bg-transparent font-medium cursor-pointer">
                    <option>1 người lớn</option>
                    <option>2 người lớn</option>
                  </select>
                </div>
              </div>
              <button onClick={() => navigate('/booking-summary')} className="w-full rounded-xl bg-[#351a5b] py-4 text-center font-bold text-white shadow-lg shadow-[#351a5b]/20 hover:brightness-110 active:scale-[0.98] transition-all">
                Đặt ngay
              </button>
              <p className="mt-4 text-center text-xs text-slate-500">
                Bạn vẫn chưa bị trừ tiền
              </p>
              <div className="mt-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="underline text-slate-600">
                    250.000đ x 1 đêm
                  </span>
                  <span className="font-medium">250.000đ</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="underline text-slate-600">Phí dịch vụ</span>
                  <span className="font-medium">25.000đ</span>
                </div>
                <hr className="border-[#351a5b]/5" />
                <div className="flex justify-between text-base font-bold">
                  <span>Tổng cộng</span>
                  <span>275.000đ</span>
                </div>
              </div>
              {/* Host Shortcut */}
              <div className="mt-8 pt-6 border-t border-[#351a5b]/5 flex items-center gap-3">
                <div
                  className="h-10 w-10 rounded-full overflow-hidden"
                  data-alt="Host"
                >
                  <img
                    className="h-full w-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_knlqmnoxjTmxOMgSnGnHruAL9_tWzeZ42XyKEXYYzsZNwTsINQpmdEDCOn21t7K-x2kq2misF1GMATzU2V1PSmuaA4gQAUCtGGSoyeSgy6u4G-dMQIFztHocG2d2YuCoR1TpY80D0gw4l9uEkd8UgDedpex4qU1LMxGgy0dMgXDwYFyKQDOACqsGabIHrhhxGXiHVKnb5LGtRHYEnDN9haaIPxfRcgJe5Kom02WGwOO7JyI7j7SRYqfuZwMN2f-AGC5CLqF7kMKU"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-slate-900">
                    Liên hệ Host
                  </p>
                  <p className="text-[10px] text-slate-500">
                    Phản hồi trong 10 phút
                  </p>
                </div>
                <button className="rounded-full h-10 w-10 flex items-center justify-center border border-[#351a5b]/20 text-[#351a5b]">
                  <span className="material-symbols-outlined text-lg">
                    chat
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Location Map Placeholder */}
        <section className="mt-16 border-t border-[#351a5b]/5 pt-16">
          <h2 className="text-xl font-bold mb-6">Khu vực xung quanh</h2>
          <div
            className="relative h-[400px] w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200"
            data-location="Ho Chi Minh City, Vietnam"
          >
            <img
              alt="Map"
              className="h-full w-full object-cover opacity-80"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJrgt6u9Ay2gaumjtYSOQ79LBqbn1-BDE05Sg9eRG2A2fGuqUBTigugLqEDRxi6WfkjbJaVEZ62sZbjFICKgas2Ptdjjpo8M-dzDG9LdF1CgAr5PgJBDAlj-jU41w690loXqUmYygWn7NmQmHLIA5fghUBF0hIQ5wzagz7GyohjX70MP07r_H9KIV5qgiDqPdG_J7NdvNTolxMaNfEk3nC8p33btaiCEoHqj6g0_r2R8A1mgFRxg00s4AZiR4ngbsqSsFOFDOggx4n"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-[#351a5b] text-white p-3 rounded-full shadow-2xl flex items-center gap-2">
                <span className="material-symbols-outlined fill-current">
                  location_on
                </span>
                <span className="text-xs font-bold pr-2">CyberBox Quận 1</span>
              </div>
            </div>
            <div className="absolute top-4 left-4 bg-white p-4 rounded-xl shadow-lg max-w-[200px]">
              <p className="text-xs font-bold text-[#351a5b] mb-1">Gần đó:</p>
              <ul className="text-[10px] space-y-1 text-slate-600 font-medium">
                <li>• Chợ Bến Thành (400m)</li>
                <li>• Phố đi bộ (600m)</li>
                <li>• Highlands Coffee (100m)</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <footer className="mt-20 border-t border-[#351a5b]/10 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#351a5b] text-white">
              <span className="material-symbols-outlined text-base">
                grid_view
              </span>
            </div>
            <span className="text-lg font-bold text-[#351a5b]">BoxHub</span>
          </div>
          <p className="text-sm text-slate-500">
            © 2023 BoxHub Vietnam. Nền tảng đặt kén ngủ thông minh hàng đầu.
          </p>
          <div className="mt-6 flex justify-center gap-6 text-slate-400">
            <a
              className="hover:text-[#351a5b] transition-colors"
              href="#"
            >
              Điều khoản
            </a>
            <a
              className="hover:text-[#351a5b] transition-colors"
              href="#"
            >
              Bảo mật
            </a>
            <a
              className="hover:text-[#351a5b] transition-colors"
              href="#"
            >
              Sơ đồ trang
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RoomDetail;
