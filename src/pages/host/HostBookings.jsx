import React from "react";

const AV = {
  a1: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1cNG8OyR42VNfS-IjwbJyIPKzzI1Mf6O--qtyLzTB9TCnXNcXLOHDa99mEiMCl_uSvIUgWAGfgmQpLZlaWA7Tk_mm-GDsh85j5_VJvHEcMBDNNCCCMipJksZgkRq36BFzRENsfXaj5FmKrdFdOOlmjkjnFQmCteHariqNyBTzTTJYuRkwFtutxS8McH7B48nz3dRIdCIcsjleXM4Pjy7ba4_iaWi6GOWZxF3NDkC-kbr0Vowa8MN_VlgEv2xbpB5EbDEymjIQ5Q1I",
  a2: "https://lh3.googleusercontent.com/aida-public/AB6AXuDp9drcSFRPEN-UDaWTbJ4TLpwTnrQ1xGkBkkvyd3qMX9UP8It9GBx2RQ8fltxGpEbVDDHvTuzeTnYKOSNaz7ha-8xnTk0Yce8rOUIZoOxs_WUhj1PVDQArP5mlHsrqK1zf9mv35dKA6GCFXQf6P7IoEHAtp6kvFu0tq3HaAVdxQkfMkwktELqmg0MJxsaPr4IX80qz_2TmopYsf6dGNzVBcdvz2DapT5GEosFWQNoO0iG_AVXqkV9r62luOvg4Z-XpTMna3Gh4uCpQ",
  a3: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDFSHPIt3jl3YmErldsMLGsD7E9BeZqObg4k7IG3X3i15ElERRH2dYPxJm9aSGw3pQMLlho0daOjpgJ5ZUnSfa6Es6mvLfkbdz2Bi5b1iiTI_3-UqBG6ZABw1gfi-WXmO24XPjVBA1I_WKk-5NKg5Lz85ydp0p5FXIvx2BryCo8V3HXhqRihoFoSCwXCBvXp2akXcEUlOCwwmrMIn28lUpTVqdphXjLJ3wktrGfP2Jz0xyMni_jzzc9Q3BG9Mj4JBVvUq3gtGlv24c",
  a4: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQfCS-sfL-Gq0EEN6DNiTcY4a6fu2wLcHiLkgDnvRPV4mC-UBJAstVHxsT3N3N3oq18aYbJ9pToMBwWxXcwkhWaJ1OEzgU1jIzxzfPSFDf4FTPygGiVO_G1BcOuVGeTfy4Ryuf3iUjYWi4Zbj9Tr8mYBbEDgcbgc03am0LTdy0a7qTmwZArKSldasfgwe1RepDH1NoOvFZG4eJykGrqS1xQMMqDhSlu_bELGItcGzCknYR7SA0W6ZXI-svuxWc70-l4dTbgK3GKrnD",
};

const mgr =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA-EkFRTbKyjgL8p5bljbAnx2QyuTITDTDgJqJyqvx4JbDY8cF5XuUL-pLuH9EgnVItadOTSUZCq5hit-zxMDv7gbgqZqWPHSELyt53pUSb5cFG8qaWK5vo0yZeDJ_MZZ5-pI8xE6b9_Te3hJhLBXBNWyAUn2Q771yIkOEPmrX7XS6n6BPaEYFLS21CA6LiFWetgMl9lAtClHYB6GFk_-tdJJIp1_D4mGflAOBCbe1afasA5EPZ3_wcwgQNNLYC16Q3nF1nLN4hQzbr";

export default function HostBookings() {
  return (
    <main className="flex min-h-screen min-w-0 flex-1 flex-col overflow-hidden">
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-primary/10 bg-white px-8">
        <div className="relative max-w-xl flex-1">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-xl text-slate-400">
            search
          </span>
          <input
            className="w-full rounded-lg border-none bg-background-light py-2 pl-11 pr-4 text-sm focus:ring-2 focus:ring-primary/50"
            placeholder="Tìm mã đặt chỗ, tên khách hoặc phòng..."
            type="search"
          />
        </div>
        <div className="flex items-center gap-4">
          <button type="button" className="relative rounded-full p-2 text-slate-500 transition-colors hover:bg-background-light">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute right-2 top-2 size-2 rounded-full border-2 border-white bg-red-500" />
          </button>
          <div className="mx-2 h-8 w-px bg-primary/10" />
          <div className="group flex cursor-pointer items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-bold leading-none">Terminal 3 Hub</p>
              <p className="text-xs font-medium text-slate-500">Quản lý</p>
            </div>
            <div
              className="size-10 rounded-full border-2 border-primary/20 bg-cover bg-center"
              style={{ backgroundImage: `url('${mgr}')` }}
            />
          </div>
        </div>
      </header>

      <div className="flex-1 space-y-8 overflow-y-auto p-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-primary/5 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-start justify-between">
              <div className="rounded-lg bg-primary/10 p-2">
                <span className="material-symbols-outlined text-primary">analytics</span>
              </div>
              <span className="flex items-center gap-1 text-xs font-bold text-emerald-500">
                <span className="material-symbols-outlined text-sm">trending_up</span> +12%
              </span>
            </div>
            <p className="text-sm font-medium text-slate-500">Tổng đặt chỗ hôm nay</p>
            <h3 className="mt-1 text-3xl font-bold">24</h3>
          </div>
          <div className="rounded-xl border border-primary/5 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-start justify-between">
              <div className="rounded-lg bg-orange-100 p-2">
                <span className="material-symbols-outlined text-orange-600">door_front</span>
              </div>
              <span className="text-xs font-medium italic text-slate-400">Hàng chờ</span>
            </div>
            <p className="text-sm font-medium text-slate-500">Check-in chờ</p>
            <h3 className="mt-1 text-3xl font-bold">8</h3>
          </div>
          <div className="rounded-xl border border-primary/5 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-start justify-between">
              <div className="rounded-lg bg-emerald-100 p-2">
                <span className="material-symbols-outlined text-emerald-600">account_balance_wallet</span>
              </div>
              <span className="flex items-center gap-1 text-xs font-bold text-emerald-500">
                <span className="material-symbols-outlined text-sm">trending_up</span> +18%
              </span>
            </div>
            <p className="text-sm font-medium text-slate-500">Doanh thu dự kiến (tuần)</p>
            <h3 className="mt-1 text-3xl font-bold">$12,450</h3>
          </div>
        </div>

        <div className="flex flex-col rounded-xl border border-primary/5 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-4 border-b border-primary/5 p-6 md:flex-row md:items-center">
            <div className="flex w-fit gap-1 rounded-lg bg-background-light p-1">
              <button type="button" className="rounded-md bg-white px-4 py-1.5 text-sm font-bold text-primary shadow-sm">
                Tất cả
              </button>
              <button type="button" className="rounded-md px-4 py-1.5 text-sm font-semibold text-slate-500 transition-colors hover:text-primary">
                Sắp tới
              </button>
              <button type="button" className="rounded-md px-4 py-1.5 text-sm font-semibold text-slate-500 transition-colors hover:text-primary">
                Đang ở
              </button>
              <button type="button" className="rounded-md px-4 py-1.5 text-sm font-semibold text-slate-500 transition-colors hover:text-primary">
                Hoàn tất
              </button>
              <button type="button" className="rounded-md px-4 py-1.5 text-sm font-semibold text-slate-500 transition-colors hover:text-primary">
                Đã hủy
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="flex items-center gap-2 rounded-lg border border-primary/20 px-4 py-2 text-sm font-bold text-primary transition-colors hover:bg-primary/5"
              >
                <span className="material-symbols-outlined text-lg">filter_list</span> Lọc
              </button>
              <button
                type="button"
                className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90"
              >
                <span className="material-symbols-outlined text-lg">add</span> Đặt mới
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-background-light/50">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Khách</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Cơ sở & phòng</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Check-in / out</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Loại</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Thanh toán</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Trạng thái</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/5">
                {[
                  {
                    name: "Alex Johnson",
                    phone: "+1 (555) 123-4567",
                    av: AV.a1,
                    unit: "ZenPod - T3",
                    box: "Box A-01",
                    in: "Oct 12, 10:00",
                    out: "Oct 12, 14:00",
                    type: "Hourly",
                    typeCls: "bg-blue-100 text-blue-700",
                    pay: "$45.00",
                    paySt: "Paid",
                    payStCls: "text-emerald-600",
                    st: "Confirmed",
                    stCls: "text-primary",
                    dot: "bg-primary",
                  },
                  {
                    name: "Sarah Williams",
                    phone: "+1 (555) 987-6543",
                    av: AV.a2,
                    unit: "ZenPod - T3",
                    box: "Box B-05",
                    in: "Oct 12, 15:00",
                    out: "Oct 13, 11:00",
                    type: "Overnight",
                    typeCls: "bg-purple-100 text-purple-700",
                    pay: "$120.00",
                    paySt: "Paid",
                    payStCls: "text-emerald-600",
                    st: "Checked-in",
                    stCls: "text-orange-600",
                    dot: "bg-orange-600",
                  },
                  {
                    name: "Michael Chen",
                    phone: "+1 (555) 444-3322",
                    av: AV.a3,
                    unit: "ZenPod - T3",
                    box: "Box A-12",
                    in: "Oct 13, 09:00",
                    out: "Oct 13, 12:00",
                    type: "Hourly",
                    typeCls: "bg-blue-100 text-blue-700",
                    pay: "$35.00",
                    paySt: "Pending",
                    payStCls: "text-orange-500",
                    st: "Confirmed",
                    stCls: "text-primary",
                    dot: "bg-primary",
                  },
                  {
                    name: "Emily Davis",
                    phone: "+1 (555) 777-8899",
                    av: AV.a4,
                    unit: "ZenPod - T3",
                    box: "Box C-02",
                    in: "Oct 11, 14:00",
                    out: "Oct 11, 18:00",
                    type: "Hourly",
                    typeCls: "bg-blue-100 text-blue-700",
                    pay: "$40.00",
                    paySt: "Paid",
                    payStCls: "text-emerald-600",
                    st: "Completed",
                    stCls: "text-slate-400",
                    dot: "bg-slate-400",
                  },
                ].map((r) => (
                  <tr key={r.name} className="group transition-colors hover:bg-primary/5">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="size-10 rounded-full bg-cover bg-center"
                          style={{ backgroundImage: `url('${r.av}')` }}
                        />
                        <div>
                          <p className="text-sm font-bold">{r.name}</p>
                          <p className="text-xs text-slate-500">{r.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold">{r.unit}</p>
                      <p className="text-xs text-slate-500">{r.box}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium">{r.in}</p>
                      <p className="text-xs text-slate-400">{r.out}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${r.typeCls}`}>
                        {r.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-bold">{r.pay}</p>
                        <p className={`text-[10px] font-bold uppercase ${r.payStCls}`}>{r.paySt}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`flex items-center gap-1.5 text-sm font-bold ${r.stCls}`}>
                        <span className={`size-2 rounded-full ${r.dot}`} /> {r.st}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button type="button" className="p-2 text-slate-400 transition-colors hover:text-primary">
                        <span className="material-symbols-outlined">more_vert</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between border-t border-primary/5 p-4">
            <p className="text-xs font-medium tracking-tight text-slate-500">Hiển thị 1–4 trong 24 kết quả</p>
            <div className="flex items-center gap-2">
              <button type="button" className="rounded border border-primary/10 p-1.5 opacity-30" disabled>
                <span className="material-symbols-outlined text-sm">chevron_left</span>
              </button>
              <button type="button" className="size-8 rounded bg-primary text-xs font-bold text-white">
                1
              </button>
              <button type="button" className="size-8 rounded text-xs font-bold hover:bg-background-light">
                2
              </button>
              <button type="button" className="size-8 rounded text-xs font-bold hover:bg-background-light">
                3
              </button>
              <button type="button" className="rounded border border-primary/10 p-1.5 hover:bg-background-light">
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
