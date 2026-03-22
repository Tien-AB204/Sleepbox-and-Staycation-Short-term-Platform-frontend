import React from "react";

const avatar =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAb42Jpw4OS0IZBnd6yQe6yhQZinRKsSqNYeU7vX2BuS_52gSHTPwgbtBTffNt1TORZ6PXdC2qJwYYlM-spGodg0BAhY2lwcYFt6LRukk-SNc_ZBvAC5CrK-dsCn2CNWeTpTXbBxvpOUc9-xmgLJ-qT4Pc9JzqP5k7DiYmEi9CyjUZq2B_zKb-xbPxhhM4puYpbGscDB93uTmmQ7PNJHCxTkIQZQ3InxbsInB14ELQQaCfCy5eJpFAIhF1033Qf3Atkrt05Tt24OuyV";

export default function HostPricing() {
  return (
    <main className="flex h-full min-h-screen min-w-0 flex-1 flex-col overflow-hidden bg-background-light">
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-primary/10 bg-white px-8">
        <div className="flex cursor-pointer items-center gap-2 rounded-lg border border-primary/10 bg-primary/5 px-4 py-2">
          <span className="material-symbols-outlined text-sm text-primary">location_on</span>
          <span className="text-sm font-bold text-primary">ZenPod - Terminal 3</span>
          <span className="material-symbols-outlined text-sm text-primary/60">expand_more</span>
        </div>
        <div className="flex items-center gap-4">
          <button type="button" className="flex items-center gap-2 rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-100">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button
            type="button"
            className="rounded-lg bg-primary px-6 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90"
          >
            Lưu thay đổi
          </button>
        </div>
      </header>

      <div className="no-scrollbar flex-1 overflow-y-auto p-8">
        <div className="mx-auto max-w-6xl space-y-8">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Quản lý giá</h2>
            <p className="mt-1 text-slate-500">Cấu hình giá phòng và điều chỉnh theo nhu cầu.</p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="space-y-8 lg:col-span-2">
              <section className="rounded-xl border border-primary/5 bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="flex items-center gap-2 text-lg font-bold">
                    <span className="material-symbols-outlined text-primary">account_balance_wallet</span>
                    Giá cơ bản
                  </h3>
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium uppercase text-primary">
                    Standard
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="rounded-lg border border-primary/10 bg-primary/5 p-4">
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-primary">Giá theo giờ</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-primary/60">$</span>
                      <input
                        className="w-full rounded-md border-none bg-white py-2 pl-8 pr-4 font-bold focus:ring-2 focus:ring-primary"
                        defaultValue="15.00"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-primary/40">/ hour</span>
                    </div>
                  </div>
                  <div className="rounded-lg border border-primary/10 bg-primary/5 p-4">
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-primary">Qua đêm (8h+)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-primary/60">$</span>
                      <input
                        className="w-full rounded-md border-none bg-white py-2 pl-8 pr-4 font-bold focus:ring-2 focus:ring-primary"
                        defaultValue="85.00"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-primary/40">/ stay</span>
                    </div>
                  </div>
                </div>
              </section>

              <section className="rounded-xl border border-primary/5 bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="flex items-center gap-2 text-lg font-bold">
                    <span className="material-symbols-outlined text-primary">trending_up</span>
                    Điều chỉnh theo mùa
                  </h3>
                  <button type="button" className="flex items-center gap-1 text-sm font-bold text-primary hover:underline">
                    <span className="material-symbols-outlined text-sm">add</span> Thêm quy tắc
                  </button>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg border border-slate-100 p-4 transition-all hover:border-primary/20">
                    <div className="flex items-center gap-4">
                      <div className="flex size-10 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                        <span className="material-symbols-outlined">event_repeat</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold">Weekend Markup</p>
                        <p className="text-xs text-slate-400">Applies Fri - Sun (All day)</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="text-sm font-bold text-orange-600">+15%</span>
                      <div className="flex items-center gap-2">
                        <button type="button" className="text-slate-400 transition-colors hover:text-primary">
                          <span className="material-symbols-outlined text-xl">edit</span>
                        </button>
                        <button type="button" className="text-slate-400 transition-colors hover:text-red-500">
                          <span className="material-symbols-outlined text-xl">delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-slate-100 p-4 transition-all hover:border-primary/20">
                    <div className="flex items-center gap-4">
                      <div className="flex size-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        <span className="material-symbols-outlined">celebration</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold">Holiday Peak</p>
                        <p className="text-xs text-slate-400">Dec 20 - Jan 5</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="text-sm font-bold text-blue-600">+25%</span>
                      <div className="flex items-center gap-2">
                        <button type="button" className="text-slate-400 transition-colors hover:text-primary">
                          <span className="material-symbols-outlined text-xl">edit</span>
                        </button>
                        <button type="button" className="text-slate-400 transition-colors hover:text-red-500">
                          <span className="material-symbols-outlined text-xl">delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="rounded-xl border border-primary/5 bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="flex items-center gap-2 text-lg font-bold">
                    <span className="material-symbols-outlined text-primary">auto_fix_high</span>
                    Khuyến mãi
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-primary/20 bg-primary/5 py-8 text-center transition-colors hover:bg-primary/10">
                    <span className="material-symbols-outlined mb-2 text-3xl text-primary">add_circle</span>
                    <p className="font-bold text-primary">Chiến dịch mới</p>
                    <p className="text-xs text-primary/60">Tạo ưu đãi đặc biệt</p>
                  </div>
                  <div className="group relative overflow-hidden rounded-xl border border-primary/10 bg-white shadow-sm">
                    <div className="absolute right-0 top-0 p-2 opacity-0 transition-opacity group-hover:opacity-100">
                      <span className="material-symbols-outlined cursor-pointer text-slate-400 hover:text-primary">more_vert</span>
                    </div>
                    <div className="flex items-start gap-4 p-4">
                      <div className="rounded-lg bg-green-100 p-2 text-green-600">
                        <span className="material-symbols-outlined">local_offer</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold uppercase text-slate-400">DISCOUNT</p>
                        <h4 className="text-base font-bold">First-time Guest</h4>
                        <p className="mb-4 mt-1 text-xs text-slate-500">Auto-applied to new accounts</p>
                        <span className="rounded-full bg-green-500 px-3 py-1 text-xs font-bold text-white">-10% OFF</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div className="space-y-8">
              <section className="rounded-xl border border-primary/5 bg-white p-6 shadow-sm">
                <h3 className="mb-6 flex items-center gap-2 text-lg font-bold">
                  <span className="material-symbols-outlined text-primary">visibility</span>
                  Xem trước giá
                </h3>
                <div className="space-y-4">
                  <div className="flex h-32 items-end justify-between gap-1 px-2">
                    {[50, 55, 50, 60, 80, 100, 85].map((h, i) => (
                      <div
                        key={i}
                        className="relative flex flex-1 flex-col items-center"
                        style={{ height: "100%" }}
                      >
                        <div
                          className="w-full max-w-[40px] rounded-t-sm bg-primary/20"
                          style={{ height: `${h}%` }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between px-2 text-[10px] font-bold uppercase tracking-tighter text-slate-400">
                    {["M", "T", "W", "T", "F", "S", "S"].map((d) => (
                      <span key={d}>{d}</span>
                    ))}
                  </div>
                  <p className="mt-4 text-center text-xs italic text-slate-400">Estimated hourly rate variance over the next 7 days</p>
                </div>
              </section>

              <section className="rounded-xl border border-primary/5 bg-white p-6 shadow-sm">
                <h3 className="mb-4 flex items-center gap-2 text-sm font-bold">
                  <span className="material-symbols-outlined text-lg text-primary">calendar_today</span>
                  October 2023
                </h3>
                <div className="grid grid-cols-7 gap-1 text-center">
                  {["M", "T", "W", "T", "F", "S", "S"].map((d) => (
                    <div key={d} className="mb-1 text-[10px] font-bold text-slate-400">
                      {d}
                    </div>
                  ))}
                  {[25, 26, 27, 28, 29, 30, 1, 2, 3, 4, 5, 6, 7, 8].map((n, i) => (
                    <div
                      key={i}
                      className={`p-1 text-xs ${n <= 30 && n >= 25 ? "text-slate-300" : "font-bold"} ${
                        n === 4 ? "rounded bg-primary/10 text-primary" : ""
                      } ${[6, 7, 8].includes(n) ? "rounded bg-orange-100 text-orange-600" : ""}`}
                    >
                      {n}
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-[10px] font-bold">
                    <span className="size-2 rounded-full bg-orange-400" />
                    <span className="text-slate-600">Weekend Markup Active</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold">
                    <span className="size-2 rounded-full bg-blue-400" />
                    <span className="text-slate-600">Peak Holiday (Upcoming)</span>
                  </div>
                </div>
              </section>

              <div className="flex items-center gap-3 rounded-xl border border-primary/10 p-2">
                <div className="size-9 overflow-hidden rounded-full bg-primary/20">
                  <img src={avatar} alt="" className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold">Alex Morgan</p>
                  <p className="truncate text-xs text-primary/60">Facility Manager</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
