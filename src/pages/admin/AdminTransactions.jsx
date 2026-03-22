import React from "react";

const TX_HEADER =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBvUG3hQqxjt92HiJZenClL3GC_jh8_wTWTnb8yKfSv6ZL2_TiChD6Uzdxrlpndh9UIRnwNxEMJSXIfmUa3IWub9BB39zasCfDcnC0PORGRB4Rfg2N5d1LiECIqx3XjYH01gsPQgKpp4j3CCe3aWIuQ4zHDkvvZMeCRvLzOH2VcOWAjeogwSkguLZfExTrpILAgwprOwYHKRSKmsBcTrmiKVEWO944kcuLL-is41BfA_c_F3GCsb9BcovCckgOt1-BOupfsAtkcA5A0";
const G1 =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAxrjcyqKmO2cMx6GyV99ugwsQpvPJuwHAkMR58t4lxmwFi0vAl6NVsacoKRcCWwgUBhl3ZprCiGLvPHFL2Pgna8ju3eFPWDuw_Q1qqdY5CjrhseJHBehM9L9JfglsU97xQ750tssptaE_bSWZ38ibaAPIEP40CgCmfnppZKcF_9eppGnCSg5zsebYBnIpR7ib1miYMsu40DHpU9mSUEjZmQPf_ZkYUl4oYMZzgh68ehK6XSsC72h6AiKF25AAY4SOO0aC5BPkZVd0I";
const G2 =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBAmAYSMz5SnMhVIeb6RTI4o7eGGGPS5omGv0KZo1dpN3q9J9BPWsIT0q9hcONW-WMiq9XDkkJL_3UI92raAoyS2KuteKBqlSVvG64RsY20y0PdMQDgYyJAeWThmfU3kOUiADiEAPDg7nOozd8INyUtqIG77DVKbwO8PVTShPBfvs8nsnCltVGCTjKTzvJnXIIF9SDi62vM4V9xjlHTwAJZ-NV-Ss-7VFSjyIXrDb-x62zobRbEnwoHQzAV9cicSKnTtIQD-Va0WWmQ";
const G3 =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCzIpExBz8ZG9iS2TPmfx-iKqMY3e0jdfLuLSr-kos-g_nS87ch9N0PKSSJAPdD_1pphpoYk8S8q5tyuascspQ-Y6-A58i-z-gQNxxFblRFQPQ7A-hKKNnyzVPOD_NumNdpGS4cUmhHVpwuddCjr5Mc2Q3kk_25ys1pla-f8OJb5f_6_UsTCQh4FRRhHhCFc_275YyDtfXYzXYqSERGKy7J0xieuKqKo-2W3GbG19fEjAvAO9kHRoImE2OphPe4hIjZAmeM68M6kPBa";
const G4 =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAV8aVnzqrtzvseoBiax1vnUh3smweXQS1TOv77BeSfhNisLGCQj1Dx1zFA5ZnL8uWj7Jsut15EibXwjes8ouio8sLYL1s9SUc2jalXX9q_icbSKNRdQ-D1uhYpK6fdltzwXPgBN09qN7-0nAqBPo5I8rtS-Xi3XAh8T6yPFV0ZxyVS4Ov4NKx0WW-7bc4fJRSHVlho6SJ1DyhZLM_sal7fCVdZGwMBIMhHhQ-ralGo0etnvDZHpTpceXe874OOQ_HwAKwi1aN25SeH";

const TX_ROWS = [
  {
    id: "#TX948201",
    guestAvatar: G1,
    time: "20/10/2023 14:30",
    guest: "Nguyễn Văn A",
    receiver: "BoxHub Platform",
    amount: "1,250,000đ",
    method: "Thẻ Visa (****42)",
    status: "Thành công",
    statusClass: "bg-emerald-100 text-emerald-700",
  },
  {
    id: "#TX948202",
    guestAvatar: G2,
    time: "20/10/2023 15:15",
    guest: "Lê Thị B",
    receiver: "Host: KingBox",
    amount: "450,000đ",
    method: "Ví MoMo",
    status: "Đang chờ",
    statusClass: "bg-amber-100 text-amber-700",
  },
  {
    id: "#TX948203",
    guestAvatar: G3,
    time: "20/10/2023 16:00",
    guest: "Trần Hoàng C",
    receiver: "BoxHub Platform",
    amount: "8,000,000đ",
    method: "Chuyển khoản",
    status: "Thất bại",
    statusClass: "bg-rose-100 text-rose-700",
  },
  {
    id: "#TX948204",
    guestAvatar: G4,
    time: "20/10/2023 17:45",
    guest: "Phạm Minh D",
    receiver: "Host: S-Storage",
    amount: "2,100,000đ",
    method: "ZaloPay",
    status: "Hoàn tiền",
    statusClass: "bg-blue-100 text-blue-700",
  },
];

export default function AdminTransactions() {
  return (
    <main className="flex min-h-0 flex-1 flex-col">
      <header className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-4 border-b border-primary/10 bg-white/90 px-6 py-4 backdrop-blur-md">
        <div className="flex flex-wrap items-center gap-4">
          <h2 className="text-xl font-bold">Quản lý giao dịch</h2>
          <div className="flex items-center gap-2 rounded-xl border border-primary/10 bg-primary/5 px-3 py-1.5">
            <span className="material-symbols-outlined text-lg text-primary">search</span>
            <input
              type="search"
              placeholder="Tìm mã giao dịch, khách hàng..."
              className="w-64 min-w-0 border-none bg-transparent text-sm placeholder:text-slate-400 focus:ring-0"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button type="button" className="relative rounded-xl p-2 transition-colors hover:bg-primary/5">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute right-2 top-2 size-2 rounded-full border-2 border-white bg-red-500" />
          </button>
          <div className="flex items-center gap-3 border-l border-primary/10 pl-4">
            <div className="text-right">
              <p className="text-sm font-bold leading-none">Minh Tran</p>
              <p className="mt-1 text-xs text-slate-500">Super Admin</p>
            </div>
            <div className="size-10 shrink-0 overflow-hidden rounded-full bg-primary/20 bg-cover bg-center">
              <img src={TX_HEADER} alt="" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 space-y-8 overflow-y-auto p-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: "payments", label: "Tổng doanh thu", value: "1,248,450,000đ", badge: "+12.5%",
              badgeClass: "text-emerald-500 bg-emerald-50" },
            { icon: "account_balance_wallet", label: "Doanh thu ròng", value: "922,300,000đ", badge: "+8.1%",
              badgeClass: "text-emerald-500 bg-emerald-50" },
            { icon: "check_circle", label: "Giao dịch thành công", value: "1,240", badge: "+5.2%",
              badgeClass: "text-emerald-500 bg-emerald-50" },
            { icon: "assignment_return", label: "Đang hoàn tiền", value: "14,120,000đ", badge: "-2.3%",
              badgeClass: "text-rose-500 bg-rose-50" },
          ].map((m) => (
            <div key={m.label} className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-start justify-between">
                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                  <span className="material-symbols-outlined">{m.icon}</span>
                </div>
                <span className={`rounded-full px-2 py-1 text-xs font-bold ${m.badgeClass}`}>{m.badge}</span>
              </div>
              <p className="text-sm font-medium text-slate-500">{m.label}</p>
              <h3 className="mt-1 text-2xl font-bold">{m.value}</h3>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm lg:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <h4 className="text-lg font-bold">Xu hướng doanh thu (30 ngày)</h4>
              <select className="rounded-lg border-none bg-primary/5 text-xs font-semibold focus:ring-0">
                <option>Tháng này</option>
                <option>Tháng trước</option>
              </select>
            </div>
            <div className="flex h-64 flex-col justify-end">
              <svg className="h-full w-full overflow-visible" viewBox="0 0 800 200">
                <defs>
                  <linearGradient id="adminRevGrad" x1="0%" x2="0%" y1="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: "rgba(53, 26, 91, 0.2)", stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: "rgba(53, 26, 91, 0)", stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
                <line x1="0" x2="800" y1="0" y2="0" stroke="rgba(0,0,0,0.05)" />
                <line x1="0" x2="800" y1="50" y2="50" stroke="rgba(0,0,0,0.05)" />
                <line x1="0" x2="800" y1="100" y2="100" stroke="rgba(0,0,0,0.05)" />
                <line x1="0" x2="800" y1="150" y2="150" stroke="rgba(0,0,0,0.05)" />
                <path
                  d="M0,150 C50,140 100,160 150,120 C200,80 250,90 300,60 C350,30 400,100 450,80 C500,60 550,40 600,30 C650,20 700,50 750,40 L800,20 L800,200 L0,200 Z"
                  fill="url(#adminRevGrad)"
                />
                <path
                  d="M0,150 C50,140 100,160 150,120 C200,80 250,90 300,60 C350,30 400,100 450,80 C500,60 550,40 600,30 C650,20 700,50 750,40 L800,20"
                  fill="none"
                  stroke="#351a5b"
                  strokeLinecap="round"
                  strokeWidth="3"
                />
              </svg>
              <div className="mt-4 flex justify-between px-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                <span>01 Thg 10</span>
                <span>07 Thg 10</span>
                <span>14 Thg 10</span>
                <span>21 Thg 10</span>
                <span>28 Thg 10</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5 rounded-xl border border-primary/10 bg-white p-6 shadow-sm">
            <h4 className="text-lg font-bold">Bộ lọc giao dịch</h4>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-xs font-bold uppercase text-slate-500">Thời gian</label>
                <input type="date" className="w-full rounded-lg border-primary/10 bg-primary/5 text-sm focus:border-primary focus:ring-primary" />
              </div>
              <div>
                <label className="mb-2 block text-xs font-bold uppercase text-slate-500">Trạng thái</label>
                <div className="grid grid-cols-2 gap-2">
                  <button type="button" className="rounded-lg border border-primary/20 bg-primary/10 px-3 py-2 text-xs font-bold text-primary">
                    Tất cả
                  </button>
                  <button type="button" className="rounded-lg border border-slate-100 px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50">
                    Thành công
                  </button>
                  <button type="button" className="rounded-lg border border-slate-100 px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50">
                    Đang chờ
                  </button>
                  <button type="button" className="rounded-lg border border-slate-100 px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50">
                    Hoàn tiền
                  </button>
                </div>
              </div>
              <div>
                <label className="mb-2 block text-xs font-bold uppercase text-slate-500">Phương thức</label>
                <select className="w-full rounded-lg border-primary/10 bg-primary/5 text-sm focus:border-primary focus:ring-primary">
                  <option>Tất cả phương thức</option>
                  <option>Thẻ tín dụng</option>
                  <option>Ví MoMo</option>
                  <option>ZaloPay</option>
                  <option>Chuyển khoản</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-xs font-bold uppercase text-slate-500">Vai trò</label>
                <div className="flex gap-2">
                  <label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-slate-100 px-3 py-2 hover:bg-slate-50">
                    <input type="radio" name="tx-role" className="text-primary focus:ring-primary" />
                    <span className="text-xs font-bold text-slate-600">Guest</span>
                  </label>
                  <label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-slate-100 px-3 py-2 hover:bg-slate-50">
                    <input type="radio" name="tx-role" className="text-primary focus:ring-primary" />
                    <span className="text-xs font-bold text-slate-600">Host</span>
                  </label>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="mt-2 w-full rounded-xl bg-primary py-3 font-bold text-white shadow-lg shadow-primary/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              Áp dụng bộ lọc
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-primary/10 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-primary/10 px-6 py-5">
            <h4 className="text-lg font-bold">Danh sách giao dịch chi tiết</h4>
            <div className="flex gap-3">
              <button
                type="button"
                className="flex items-center gap-2 rounded-lg border border-primary/20 px-4 py-2 text-sm font-bold text-primary hover:bg-primary/5"
              >
                <span className="material-symbols-outlined text-lg">download</span>
                Xuất CSV
              </button>
              <button
                type="button"
                className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary/90"
              >
                <span className="material-symbols-outlined text-lg">picture_as_pdf</span>
                Xuất PDF
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-primary/5 text-xs font-bold uppercase tracking-widest text-slate-500">
                <tr>
                  <th className="px-6 py-4">Mã giao dịch</th>
                  <th className="px-6 py-4">Ngày giờ</th>
                  <th className="px-6 py-4">Người gửi (Guest)</th>
                  <th className="px-6 py-4">Người nhận (Host)</th>
                  <th className="px-6 py-4">Số tiền</th>
                  <th className="px-6 py-4">Phương thức</th>
                  <th className="px-6 py-4">Trạng thái</th>
                  <th className="px-6 py-4 text-center">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/5">
                {TX_ROWS.map((row) => (
                  <tr key={row.id} className="transition-colors hover:bg-primary/5">
                    <td className="px-6 py-4 text-sm font-bold">{row.id}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{row.time}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <img
                          src={row.guestAvatar}
                          alt=""
                          className="size-7 shrink-0 rounded-full object-cover"
                        />
                        <span className="text-sm font-medium">{row.guest}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex size-7 items-center justify-center rounded-full bg-primary/10">
                          <span className="material-symbols-outlined text-xs text-primary">storefront</span>
                        </div>
                        <span className="text-sm font-medium">{row.receiver}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold">{row.amount}</td>
                    <td className="px-6 py-4 text-sm">{row.method}</td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-bold ${row.statusClass}`}>{row.status}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button type="button" className="rounded-lg p-2 text-primary transition-colors hover:bg-primary/10">
                        <span className="material-symbols-outlined text-xl">visibility</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-primary/10 px-6 py-4">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
              Hiển thị 1 - 10 trên 1,240 giao dịch
            </p>
            <div className="flex gap-1">
              <button type="button" className="flex size-8 items-center justify-center rounded-lg text-slate-500 hover:bg-primary/5">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button type="button" className="flex size-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white shadow-md">
                1
              </button>
              <button type="button" className="flex size-8 items-center justify-center rounded-lg text-sm font-bold hover:bg-primary/5">
                2
              </button>
              <button type="button" className="flex size-8 items-center justify-center rounded-lg text-sm font-bold hover:bg-primary/5">
                3
              </button>
              <span className="flex size-8 items-center justify-center text-slate-400">...</span>
              <button type="button" className="flex size-8 items-center justify-center rounded-lg text-sm font-bold hover:bg-primary/5">
                124
              </button>
              <button type="button" className="flex size-8 items-center justify-center rounded-lg text-slate-500 hover:bg-primary/5">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
