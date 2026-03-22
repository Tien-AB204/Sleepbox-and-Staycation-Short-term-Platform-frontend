import React from "react";

const MAP_HCMC =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuChvR65dhyI6MU3oOTLmmIsD_uv2a-gexLz90kfov_a4H0yxcZJ_AvIdApg3gftJqJllgZJaOhYMXqBzLk9FkUG9STq5CERcWyN0u_bGv2WguODk1cHG0NwnPN8D4SjRy9R0UYO-nLsDT8S6_EgNc8VRrD39pXKM40Srjw9NciUADklLjPANc6aLFLQLv6Vv0GRiImHU9YcyaCVIwqnNBUpi7t8BiJ28JQ_pMJZRWtg4AXa5Nwf0cDVs9PFPXvCppzH-W-ukSr8a6FV";
const IMG_APPROVAL_SLEEPBOX =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDlZTHPb_WvCoLe7AOdbzXsTVru87PGSWp3jv_zXaT1s8c8B-awhDwiPUa90YYvGZZyN6lyQRRj5flcHPjx7gY-OTWD4tXqYSSaz0g8H9DwKIRhPtjLVKOnBaW6m2C6Hu5hBq5zVoZ2aahxtUT9FYQ-6uhsKPq559prizbxhau2PJspYAYZ_ZIe7_l5zNcf6rZY8HXgQpPt8ARW8Un6B7NfGbkcr-RF7LV2Vgy09w-dEU1z8mTnYWuKzolnWrdqjGftGYjB4MU4i1QQ";
const IMG_DISPUTE_GUEST =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBAXSMZtJz-mohheMsti0rKcrwaWmuRERcImchOaZqUWZyVNjzP8yPCMNT9e4qFM78N81ioVYX6WmDP2TMFeF9sF4rWkGTEMpvMjW0LktABb4VM34KJ48Vwgme7xN8Ysc4kkjhCyEDaGrb-aQ2iVmMIgUbRYMgX4ac-UxvCxLzE0sqvDwPlaY8NR18bmxuHqillmnf9j2GFG9dj03yYmc3k_7IBb2DQ6r-wUyPm0JBZO3nSsPMDU2xrz4t45Z1bYQnkk3H4aD9L5i31";

export default function AdminDashboard() {
  return (
    <main className="flex-1 p-8">
      <header className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold">Tổng quan hệ thống</h2>
          <p className="text-slate-500">Chào mừng trở lại, đây là dữ liệu mới nhất hôm nay tại TP.HCM</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium transition-colors hover:bg-white"
          >
            <span className="material-symbols-outlined text-sm">calendar_today</span>
            Hôm nay, 24 Tháng 5
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white"
          >
            <span className="material-symbols-outlined text-sm">download</span>
            Xuất báo cáo
          </button>
        </div>
      </header>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            icon: "payments",
            iconBg: "bg-emerald-50",
            iconColor: "text-emerald-600",
            badge: "+12.5%",
            badgeClass: "bg-emerald-50 text-emerald-600",
            label: "Tổng doanh thu",
            value: "2.540.000.000đ",
          },
          {
            icon: "person",
            iconBg: "bg-blue-50",
            iconColor: "text-blue-600",
            badge: "+4.2%",
            badgeClass: "bg-blue-50 text-blue-600",
            label: "Người dùng hoạt động",
            value: "12.840",
            sub: "9.2k Khách / 3.6k Chủ nhà",
          },
          {
            icon: "bed",
            iconBg: "bg-orange-50",
            iconColor: "text-orange-600",
            badge: "+8.1%",
            badgeClass: "bg-orange-50 text-orange-600",
            label: "Tỷ lệ lấp đầy",
            value: "84.2%",
          },
          {
            icon: "location_city",
            iconBg: "bg-purple-50",
            iconColor: "text-primary",
            badge: "+15",
            badgeClass: "bg-primary/10 text-primary",
            label: "Tổng số tin đăng",
            value: "1,120",
          },
        ].map((m) => (
          <div
            key={m.label}
            className="rounded-xl border border-slate-200 bg-white p-6"
          >
            <div className="mb-4 flex items-start justify-between">
              <div className={`rounded-lg p-2 ${m.iconBg}`}>
                <span className={`material-symbols-outlined ${m.iconColor}`}>{m.icon}</span>
              </div>
              <span className={`rounded-full px-2 py-1 text-xs font-bold ${m.badgeClass}`}>{m.badge}</span>
            </div>
            <p className="mb-1 text-sm font-medium text-slate-500">{m.label}</p>
            <h3 className="text-2xl font-bold">{m.value}</h3>
            {m.sub ? <p className="mt-1 text-[10px] text-slate-400">{m.sub}</p> : null}
          </div>
        ))}
      </div>

      <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-6 lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <h4 className="text-lg font-bold">Xu hướng đặt phòng</h4>
            <select className="rounded-lg border-none bg-slate-50 text-sm focus:ring-2 focus:ring-primary/30">
              <option>7 ngày qua</option>
              <option>30 ngày qua</option>
            </select>
          </div>
          <div className="relative flex h-64 items-center justify-center overflow-hidden rounded-lg bg-slate-50">
            <div className="absolute inset-0 flex items-end justify-between px-8 pb-4">
              {[40, 55, 45, 75, 60, 85, 50].map((h, i) => (
                <div
                  key={i}
                  className={`w-12 rounded-t-lg ${i === 3 || i === 5 ? "bg-primary" : "bg-primary/20"}`}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <p className="relative z-10 text-xs italic text-slate-400">Dữ liệu đặt phòng theo thời gian thực</p>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h4 className="mb-6 text-lg font-bold">Phân bố cơ sở</h4>
          <div className="relative h-64 overflow-hidden rounded-lg bg-slate-100">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-70"
              style={{ backgroundImage: `url('${MAP_HCMC}')` }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-lg bg-white/90 p-3 text-center shadow-xl">
                <p className="text-xs font-bold text-primary">Tập trung nhất</p>
                <p className="text-sm">Quận 1, Quận 10</p>
              </div>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Quận 1</span>
              <span className="font-bold">342 Sleepbox</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-slate-100">
              <div className="h-1.5 w-[85%] rounded-full bg-primary" />
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Quận 7</span>
              <span className="font-bold">185 Sleepbox</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-slate-100">
              <div className="h-1.5 w-[45%] rounded-full bg-primary" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="mb-6 flex items-center justify-between">
            <h4 className="text-lg font-bold">Phê duyệt đang chờ</h4>
            <button type="button" className="text-sm font-semibold text-primary hover:underline">
              Xem tất cả
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4 rounded-lg border border-transparent p-3 transition-colors hover:border-slate-200 hover:bg-slate-50">
              <div className="flex h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                <img
                  src={IMG_APPROVAL_SLEEPBOX}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h5 className="text-sm font-bold">Luxury SleepBox Quận 1</h5>
                <p className="text-xs text-slate-500">Chủ nhà: Nguyễn Văn A • 2 giờ trước</p>
              </div>
              <div className="flex gap-2">
                <button type="button" className="rounded-lg p-1.5 text-emerald-600 hover:bg-emerald-50">
                  <span className="material-symbols-outlined text-xl">check_circle</span>
                </button>
                <button type="button" className="rounded-lg p-1.5 text-rose-600 hover:bg-rose-50">
                  <span className="material-symbols-outlined text-xl">cancel</span>
                </button>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-lg border border-transparent p-3 transition-colors hover:border-slate-200 hover:bg-slate-50">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <span className="material-symbols-outlined text-primary">person_add</span>
              </div>
              <div className="min-w-0 flex-1">
                <h5 className="text-sm font-bold">Đăng ký Host: Trần Thị B</h5>
                <p className="text-xs text-slate-500">Xác minh CCCD đang chờ • 5 giờ trước</p>
              </div>
              <div className="flex gap-2">
                <button type="button" className="rounded-lg p-1.5 text-emerald-600 hover:bg-emerald-50">
                  <span className="material-symbols-outlined text-xl">check_circle</span>
                </button>
                <button type="button" className="rounded-lg p-1.5 text-rose-600 hover:bg-rose-50">
                  <span className="material-symbols-outlined text-xl">cancel</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="mb-6 flex items-center justify-between">
            <h4 className="text-lg font-bold">Tranh chấp cần xử lý</h4>
            <button type="button" className="text-sm font-semibold text-primary hover:underline">
              Xem tất cả
            </button>
          </div>
          <div className="space-y-4">
            <div className="rounded-xl border border-rose-100 bg-rose-50/30 p-4">
              <div className="mb-2 flex justify-between">
                <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-bold uppercase text-rose-600">
                  Nghiêm trọng
                </span>
                <span className="text-[10px] text-slate-500">ID: #4920</span>
              </div>
              <h5 className="mb-1 text-sm font-bold">Khiếu nại vệ sinh & Tiếng ồn</h5>
              <p className="mb-3 line-clamp-2 text-xs text-slate-600">
                Khách hàng báo cáo cơ sở không đúng như mô tả và có tiếng ồn lớn vào ban đêm tại chi nhánh Bình Thạnh...
              </p>
              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  <img
                    src={IMG_DISPUTE_GUEST}
                    alt=""
                    className="h-6 w-6 rounded-full border-2 border-white object-cover"
                  />
                  <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-primary/20 text-[8px] font-bold">
                    H
                  </div>
                </div>
                <button type="button" className="flex items-center gap-1 text-xs font-bold text-primary">
                  Can thiệp ngay <span className="material-symbols-outlined text-xs">arrow_forward</span>
                </button>
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 p-4">
              <div className="mb-2 flex justify-between">
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase text-amber-600">
                  Trung bình
                </span>
                <span className="text-[10px] text-slate-500">ID: #4918</span>
              </div>
              <h5 className="mb-1 text-sm font-bold">Yêu cầu hoàn tiền</h5>
              <p className="mb-3 text-xs text-slate-600">Lỗi thanh toán trùng lặp khi đặt phòng tại Quận 10.</p>
              <div className="flex justify-end">
                <button type="button" className="flex items-center gap-1 text-xs font-bold text-primary">
                  Xem chi tiết <span className="material-symbols-outlined text-xs">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
