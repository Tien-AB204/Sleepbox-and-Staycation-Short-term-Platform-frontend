import React from "react";

const IMG = {
  alex:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAB83HEndWCjibLmk5_-p0vo38xCMjU7OGTeyvJhhzAZnHtmK5VUfWExJryj4Cz0eUjEBEN6QoyyNRfWk_2iAkfTLkRdfeGjS-6Xgqocv_jThDoxPWdMZLcUdMWMSC3enj0hr9MBvWGspseb0KpRjz5G2yEgbGkpWdGv_zWKjRoV1EiVvaAjnrhTWP1MvA_HRbg0uHn0SQrjP0Nsk80JfaHyVPT9cZijLCkQJ2t_rnXaUlffjO5BczvODiAwpkycPp8dfYfbgxV9peV",
  s1: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKIv4sqnRIrZ9xjmVh9xK7aX2MPJpdeAIdgpI3FS1usgdFaIvOlqCXWGv_UQZcVP3cMxSprF7yDBDJMVS92XK9joROAHGg5BaAWsijftqLcd3plI4bkYIlD2U7sFBMNMpK-8Dz19mQnqwNkxX9qV007Cz5j2pzqQ6eje7wWVZZegCAxF5v2LBN9-LBT8IlCjW-OUlqLXGWmbBydcjx-4XiPt9hjczOubdZnCmIePiX-CmMFTFqlpkjRVasXcBApNOTCYvEDn9IN2cp",
  m1: "https://lh3.googleusercontent.com/aida-public/AB6AXuDYpt2JPFZoUivYMgeqlK4QxVu3sMOg4W9b4s-MIiC-sKklneJZ2un7lXdpkhFJUvQNJZe8O0xgW18K6gzjkTKvu79Rni-Rs8RVBZ1AChap7L80iodEbFeRF45s9u-FZb07RxeAAf_PsO8gzNZ4L4Gv8WcT1SwPY6KzZTffj4RR_UHWNYekKuyI0ols_szHsD_K5YDbvJTNqi-ZePI0zjFlAc8AbJ9DHL3vNQleAzpe2AMaX-dpy1ULB_WNcB38kx3j_kjhqS4CDBAw",
  e1: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkUR_0UyE7JA4Mw9eCiuVpTyB_I4LYocmQjuDgzfiiBKFaXBx7pbtvyqyk0OfsElI1Jc1qdEshs0StBgvufaKuZeDY8R4XQGC5kLezGcGCZ4w4CECzYR0zHsJ3457xXemzjWleMLhYFCv0geDtZyjppKr9L12lRUSNeGjc-ywPU31ifLtYNJkKiNKfIgMLb09GC78FPNU6q4eI-ORKGaq1M7JrS7d7V-kWVPBM_VAMQu7spAFFAHDQ7X0dhGG7mGY2JYLBQ_Ru7-W7",
  perf:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuADPt6l5C2uWal3lDIVJ7RwbrzbPkLNQkIWfEDoYmKuef5FlEyIRMejlZZTyZWyE07yVIavc__30rKCQ1CbLrl70V-POvjU_WvHc--E_avW8u0j3wxqNJPRxvzKP0kCMd36Y6hDfxdwXIT_KZ9XQXE1Q-XTDRMt43OSCkS6e0_XlAI-5L8_jm3lSQqRYLNbubTCom7IRo3pEQtp2U3d9Yxz8hBlbFLAxA1N6TAMGyidyYV8jxLlWE8ihyDossdi84vnRUKOusykTsqd",
  sh1: "https://lh3.googleusercontent.com/aida-public/AB6AXuDOvKzyZzCFUVh7Tjt5ZI8B9JW2M1xQExgtorq8YbZe-v73uCi5tU5zXCCJAA_sQaM31DgBsF1Kqj0iOGSq0wCHJP0btlGNNjWXqeXhePyiJ3SVCsTNPnLa5UERAA_btBfupyCkUO21I4mIkJ2xPFqxE_AuQ6aqEL4-soSg8ok6mxNZmippE6KzE5yf8CMZbEsrLm-e7UpORQJu8DvuCOB7uqNtpDOrbZkAIe2Tbh2LkX0-JnRSeUNwc6GHyc6sAoqLQ_vL_hamZINJ",
};

export default function HostStaff() {
  return (
    <main className="flex min-h-screen min-w-0 flex-1 flex-col overflow-y-auto">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-8 backdrop-blur-md">
        <div className="relative w-64 flex-1">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-xl text-slate-400">
            search
          </span>
          <input
            className="w-full rounded-xl border-none bg-slate-100 py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20"
            placeholder="Tìm nhân viên hoặc vai trò..."
            type="search"
          />
        </div>
        <div className="flex items-center gap-4">
          <button type="button" className="flex size-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button type="button" className="flex size-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
            <span className="material-symbols-outlined">chat_bubble</span>
          </button>
          <div className="mx-2 h-10 w-px bg-slate-200" />
          <div className="hidden items-center gap-3 sm:flex">
            <div className="text-right">
              <p className="text-sm font-bold leading-none">Alex Rivera</p>
              <p className="text-xs text-slate-500">Super Admin</p>
            </div>
            <img src={IMG.alex} alt="" className="size-10 rounded-full object-cover" />
          </div>
        </div>
      </header>

      <div className="space-y-8 p-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="text-3xl font-black tracking-tight">Nhân viên</h2>
            <p className="text-slate-500">Quản lý đội ngũ tại các cơ sở BoxHub.</p>
          </div>
          <button
            type="button"
            className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white"
          >
            <span className="material-symbols-outlined">person_add</span>
            Thêm nhân viên
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { t: "Tổng nhân viên", v: "42", b: "+2%", bc: "text-emerald-600 bg-emerald-50" },
            { t: "Đang ca", v: "18", b: "0%", bc: "text-slate-400 bg-slate-100" },
            { t: "Lời mời chờ", v: "5", b: "-12%", bc: "text-rose-600 bg-rose-50" },
            { t: "Đánh giá hiệu suất", v: "4.8/5", b: "+0.3%", bc: "text-emerald-600 bg-emerald-50" },
          ].map((x) => (
            <div key={x.t} className="rounded-2xl border border-slate-200 bg-white p-6">
              <p className="text-sm font-medium text-slate-500">{x.t}</p>
              <div className="mt-2 flex items-end justify-between">
                <h3 className="text-2xl font-bold">{x.v}</h3>
                <span className={`rounded-full px-2 py-1 text-xs font-bold ${x.bc}`}>{x.b}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div className="flex items-center justify-between border-b border-slate-100 p-4">
                <div className="flex gap-4">
                  <button type="button" className="border-b-2 border-primary px-1 pb-2 text-sm font-bold text-primary">
                    Tất cả
                  </button>
                  <button type="button" className="pb-2 text-sm font-medium text-slate-400 hover:text-slate-600">
                    Quản lý
                  </button>
                  <button type="button" className="pb-2 text-sm font-medium text-slate-400 hover:text-slate-600">
                    Bảo trì
                  </button>
                </div>
                <button type="button" className="text-slate-400 hover:text-slate-600">
                  <span className="material-symbols-outlined">filter_list</span>
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Nhân viên</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Vai trò</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Trạng thái</th>
                      <th className="px-6 py-4 text-right text-xs font-bold uppercase text-slate-500">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { n: "Sarah Chen", loc: "ZenPod - T3", r: "Receptionist", st: "Active", stc: "emerald", img: IMG.s1 },
                      { n: "Marcus Thorne", loc: "CyberBox - D1", r: "Maintenance", st: "On Break", stc: "amber", img: IMG.m1 },
                      { n: "Elena Rodriguez", loc: "CyberBox - D1", r: "Facility Manager", st: "Off-duty", stc: "slate", img: IMG.e1 },
                    ].map((row) => (
                      <tr key={row.n} className="transition-colors hover:bg-slate-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img src={row.img} alt="" className="size-10 rounded-full object-cover" />
                            <div>
                              <p className="text-sm font-bold">{row.n}</p>
                              <p className="text-xs text-slate-500">{row.loc}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium">{row.r}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-bold ${
                              row.stc === "emerald"
                                ? "bg-emerald-50 text-emerald-600"
                                : row.stc === "amber"
                                  ? "bg-amber-50 text-amber-600"
                                  : "bg-slate-100 text-slate-400"
                            }`}
                          >
                            <span
                              className={`size-1.5 rounded-full ${
                                row.stc === "emerald"
                                  ? "bg-emerald-600"
                                  : row.stc === "amber"
                                    ? "bg-amber-600"
                                    : "bg-slate-400"
                              }`}
                            />
                            {row.st}
                          </span>
                        </td>
                        <td className="space-x-2 px-6 py-4 text-right">
                          <button type="button" className="text-slate-400 hover:text-primary">
                            <span className="material-symbols-outlined text-xl">chat</span>
                          </button>
                          <button type="button" className="text-slate-400 hover:text-primary">
                            <span className="material-symbols-outlined text-xl">edit</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-bold">Phân quyền</h3>
                <button type="button" className="text-sm font-bold text-primary">
                  Quản lý vai trò
                </button>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex items-start gap-4 rounded-xl bg-slate-50 p-4">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <span className="material-symbols-outlined">security</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold">Full Access</p>
                    <p className="mt-1 text-xs text-slate-500">Chỉnh sơ sở, thanh toán và nhân sự.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-xl bg-slate-50 p-4">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <span className="material-symbols-outlined">visibility</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold">View Only</p>
                    <p className="mt-1 text-xs text-slate-500">Chỉ xem lịch và check-in.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="font-bold">Ca hôm nay</h3>
                <button type="button" className="text-xs font-bold text-primary">
                  Full Schedule
                </button>
              </div>
              <div className="space-y-6">
                <div className="relative flex gap-4">
                  <div className="absolute bottom-0 left-2.5 top-8 w-px bg-slate-200" />
                  <div className="z-10 flex size-5 items-center justify-center rounded-full bg-primary ring-4 ring-primary/20">
                    <span className="size-2 rounded-full bg-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-slate-400">08:00 AM - 12:00 PM</p>
                    <p className="mt-1 text-sm font-bold">Morning Shift</p>
                    <div className="mt-2 flex items-center gap-2">
                      <img src={IMG.sh1} alt="" className="size-6 rounded-full object-cover" />
                      <span className="text-xs text-slate-600">Sarah Chen</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-primary p-6 text-white">
              <div className="relative z-10">
                <h3 className="text-lg font-bold">Top Performer</h3>
                <div className="mt-6 flex items-center gap-4">
                  <img
                    src={IMG.perf}
                    alt=""
                    className="size-16 rounded-xl border border-white/30 bg-white/20 object-cover p-1"
                  />
                  <div>
                    <p className="text-xl font-black">Sarah Chen</p>
                    <p className="text-sm text-white/70">98% Satisfactory Rate</p>
                  </div>
                </div>
                <div className="mt-6">
                  <div className="mb-2 flex justify-between text-xs font-bold">
                    <span>Goal Completion</span>
                    <span>92%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/20">
                    <div className="h-full bg-white" style={{ width: "92%" }} />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-8 -right-8 size-32 rounded-full bg-white/10 blur-2xl" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
