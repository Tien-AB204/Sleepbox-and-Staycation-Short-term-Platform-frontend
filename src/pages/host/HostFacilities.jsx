import React from "react";

const F = {
  f1: "https://lh3.googleusercontent.com/aida-public/AB6AXuDCSdwrbTmcc84oQzRoKEvHKaxmmr9WDa2qDQY0AzSJiq5hPQ1sW7sX7M_gkktCRBr7gXAxMY6GHMckddBmfB8FOZ8cHO6wJMkWmS_omKTHYzwO5VQy1J66FlRUvhLz1L9FE5v3OVfwTbvceIOSv47rFKpBbiyLJo939K7buvYww3HkvsgzAEr27Q38e5tYJcVsmwBOCXfOq9UsG-PEsGxdqzW2dPxovEGBBUszaRJmLhz8zZiVF4AfW5ScaBhuIZwjG-MD48v5KIsE",
  f2: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZSsOOBTID--thi2z2K0BDWiLNrj245lfWTP4eqzyBb0A3NN0e5io7pX8BXtVCJW95VXZ9LLUy-Q_X2IjvBalGdH8hx1LErdKK5nedJrKR9WII2uoo0pIQOJSaja5vf7mOzwZu0UteywrqoMr8o2khB15pM2uXOHj_7TzDc7SO_Ee19qF001xkUpf7NmmQMLEnCWhoDmliJq7Onp8my-cNfW4JqXpdjF1GNmIEyDVya8-_wJ_YuxzJ3z51DkhbkbdbyUe0hc-RKbE4",
  f3: "https://lh3.googleusercontent.com/aida-public/AB6AXuCcOBhItxKSk4jbANtVThiZlvyZWBFews7qlC4NNCs11Ex6XrCmNx-eM78gyoqBUsvF1DAxRzJNZU5sXXkloxXeix16w-2F5A_XL07wiPSNPcs9_qgA3k0bpnRAhlyzRxG9z6NXekJxLmiBJyD_jcuZDrrRGMcGCE9nVm4hKOTW14wN539rzirC7O10MD2IYDdOcj8RMAKQ6i39Jm63FzxjBI8rNwqQHaQVoqi5vYPHhv4BekjAa6DproE9kPcXIlWFMJJk-0FTIt_g",
};

export default function HostFacilities() {
  return (
    <main className="min-h-screen flex-1 overflow-y-auto">
      <header className="sticky top-0 z-10 bg-background-light/80 px-6 py-8 backdrop-blur-md">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Quản lý cơ sở</h2>
            <p className="mt-1 text-slate-500">Quản lý các điểm lưu trữ và không gian của bạn</p>
          </div>
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90"
          >
            <span className="material-symbols-outlined">add_circle</span>
            Thêm cơ sở mới
          </button>
        </div>
        <div className="mt-8 flex gap-8 border-b border-primary/10">
          <button type="button" className="border-b-2 border-primary pb-4 text-sm font-bold text-primary">
            Tất cả (12)
          </button>
          <button
            type="button"
            className="pb-4 text-sm font-medium text-slate-500 transition-colors hover:text-primary"
          >
            Đang hoạt động (10)
          </button>
          <button
            type="button"
            className="pb-4 text-sm font-medium text-slate-500 transition-colors hover:text-primary"
          >
            Bảo trì (2)
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 p-6 xl:grid-cols-2">
        {[
          {
            title: "ZenPod - Terminal 3",
            loc: "Sân bay Tân Sơn Nhất, TP.HCM",
            img: F.f1,
            badge: "Đang hoạt động",
            badgeCls: "bg-green-500",
            rooms: "10 Phòng",
            price: "250.000đ/giờ",
            on: true,
          },
          {
            title: "WorkBox - Bitexco",
            loc: "Quận 1, TP. Hồ Chí Minh",
            img: F.f2,
            badge: "Bảo trì",
            badgeCls: "bg-orange-500",
            rooms: "5 Phòng",
            price: "180.000đ/giờ",
            on: false,
          },
          {
            title: "SleepStation Đà Nẵng",
            loc: "Hải Châu, Đà Nẵng",
            img: F.f3,
            badge: "Đang hoạt động",
            badgeCls: "bg-green-500",
            rooms: "12 Phòng",
            price: "200.000đ/giờ",
            on: true,
          },
        ].map((f) => (
          <div
            key={f.title}
            className="overflow-hidden rounded-2xl border border-primary/5 bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex flex-col md:flex-row">
              <div className="relative h-48 md:h-auto md:w-52">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${f.img}')` }} />
                <div className={`absolute left-3 top-3 rounded-full px-2 py-1 text-[10px] font-bold uppercase text-white ${f.badgeCls}`}>
                  {f.badge}
                </div>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-2 flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold leading-tight text-slate-900">{f.title}</h3>
                    <div className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                      <span className="material-symbols-outlined text-sm">location_on</span>
                      {f.loc}
                    </div>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input defaultChecked={f.on} className="peer sr-only" type="checkbox" />
                    <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-0" />
                  </label>
                </div>
                <div className="my-4 grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-primary/5 p-2">
                    <p className="text-[10px] font-bold uppercase tracking-tighter text-slate-500">Số phòng</p>
                    <p className="font-bold text-primary">{f.rooms}</p>
                  </div>
                  <div className="rounded-lg bg-primary/5 p-2">
                    <p className="text-[10px] font-bold uppercase tracking-tighter text-slate-500">Giá thuê</p>
                    <p className="font-bold text-primary">{f.price}</p>
                  </div>
                </div>
                <div className="mt-auto flex gap-2">
                  <button
                    type="button"
                    className="flex-1 rounded-lg bg-primary/10 py-2 text-sm font-bold text-primary transition-colors hover:bg-primary/20"
                  >
                    Chi tiết
                  </button>
                  <button
                    type="button"
                    className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-slate-200 py-2 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50"
                  >
                    <span className="material-symbols-outlined text-sm">edit</span>
                    Chỉnh sửa
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-primary/20 bg-primary/5 p-8 text-center transition-colors hover:bg-primary/10">
          <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-primary/20 transition-transform group-hover:scale-110">
            <span className="material-symbols-outlined text-3xl text-primary">add</span>
          </div>
          <h3 className="font-bold text-primary">Thêm cơ sở mới</h3>
          <p className="mt-1 max-w-[200px] text-xs text-slate-500">Mở rộng mạng lưới kinh doanh của bạn tại BoxHub</p>
        </div>
      </div>

      <div className="p-6">
        <div className="rounded-2xl border border-primary/5 bg-white p-6">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500">Tổng quan hoạt động</h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: "hotel", c: "bg-blue-100 text-blue-600", v: "27", l: "Tổng số đơn vị" },
              { icon: "trending_up", c: "bg-green-100 text-green-600", v: "84%", l: "Tỷ lệ lấp đầy" },
              { icon: "payments", c: "bg-primary/10 text-primary", v: "42.5M", l: "Doanh thu tháng (VND)" },
              { icon: "star", c: "bg-yellow-100 text-yellow-600", v: "4.8", l: "Đánh giá trung bình" },
            ].map((s) => (
              <div key={s.l} className="flex items-center gap-4">
                <div className={`rounded-xl p-3 ${s.c}`}>
                  <span className="material-symbols-outlined">{s.icon}</span>
                </div>
                <div>
                  <p className="text-2xl font-black">{s.v}</p>
                  <p className="text-xs font-medium text-slate-500">{s.l}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
