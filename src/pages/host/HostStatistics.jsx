import React from "react";

const T1 =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDKGUMmxS5BHpikBWzaD1Ejk-4tkvmBLoFZeUWmx6pbi8aDkiUaN8zykc35ClqqCauzj9Be580vi3AL3K2axJ5UDGVW1ZYCiixmOrIn9mJ621_qsOTFhRcrOTiODtYDawFbSXaiEbn8i-GRgMjc0SACGrRe6s3IQt_9e43nYtyqg0AsOuQ2yTZkoLrmYUREXBU968m81g9nKJcWykLd_k1Ft5fLnEUPNf503Xdpmbn88A31IDqOeXMzrHAmxIMWvDFSzkxQuihkRA2k";
const T2 =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCQGZjR_k5wk-FutJPa6cfSz0Wftju0AqlKSHHlwANVD3G-flqGpIqI6s1Au39C4jzUHbhbdA50eJNvqba7bmb-4xHaEbhwd_9PhzLpJhRxq2t0KGZ6z3tTqY1kJpBlim5D-Piu92qsWrKjG4gxLi57JEeN10p0Zt7oXUVprUkvTiBhukk-LgsBpJcM1ZIDlEOw3MgSRJeCFTfxON4_S9qSNg343xDVfJGFfs3xQf9rtK72-r-pxc-VMeU-Uaq-j59A2tLTOG5knH3K";
const T3 =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAuEYlfeb9KeEr5o8iepr3R0GZtqB-qvbja6GHso1LWcRXEKaOBImg7P1kA5rMEYecglq5JNGSiFCqci2Bx6B1T62mHSMoYHiGsuDJnY3W0u-eHSa6Ax6KFSBG9y4w3zJN-7LS1Ls9gmm24qntdyFeF6ANHaxNE1oZOplfoWFm8pPfmeIvKInfgMCJu13-IDhR5hv__c5J0If0E4Kwf1dZ8KNPFJqm5bKZwFFVKwKAf_4EpZYzQ6QN7ObEqLFVChmJmZUAKsXa1wR6";

function HeatCell({ cls }) {
  return <div className={`aspect-square rounded-sm ${cls}`} />;
}

export default function HostStatistics() {
  return (
    <main className="min-h-screen flex-1 overflow-y-auto">
      <header className="sticky top-0 z-10 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-3xl text-primary">analytics</span>
          <h2 className="text-xl font-bold">Thống kê &amp; báo cáo</h2>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center rounded-lg bg-slate-100 p-1">
            <button type="button" className="rounded-md px-4 py-1.5 text-sm font-medium text-slate-600 hover:bg-white">
              7 ngày
            </button>
            <button type="button" className="rounded-md bg-white px-4 py-1.5 text-sm font-bold text-primary shadow-sm">
              30 ngày
            </button>
            <button type="button" className="rounded-md px-4 py-1.5 text-sm font-medium text-slate-600 hover:bg-white">
              Năm
            </button>
          </div>
          <div className="hidden h-8 w-px bg-slate-200 sm:block" />
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white shadow-md transition-all hover:bg-primary/90"
          >
            <span className="material-symbols-outlined text-sm">download</span>
            Xuất báo cáo
          </button>
        </div>
      </header>

      <div className="space-y-8 p-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-lg bg-emerald-50 p-2">
                <span className="material-symbols-outlined text-emerald-600">monetization_on</span>
              </div>
              <span className="rounded bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-600">+12.5%</span>
            </div>
            <p className="text-sm font-medium text-slate-500">Tổng doanh thu</p>
            <h3 className="mt-1 text-2xl font-bold">$42,850.00</h3>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-lg bg-blue-50 p-2">
                <span className="material-symbols-outlined text-blue-600">bed</span>
              </div>
              <span className="rounded bg-blue-50 px-2 py-1 text-xs font-bold text-blue-600">+3.1%</span>
            </div>
            <p className="text-sm font-medium text-slate-500">Tỷ lệ lấp đầy TB</p>
            <h3 className="mt-1 text-2xl font-bold">84.2%</h3>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-lg bg-purple-50 p-2">
                <span className="material-symbols-outlined text-purple-600">finance</span>
              </div>
              <span className="rounded bg-purple-50 px-2 py-1 text-xs font-bold text-purple-600">+5.2%</span>
            </div>
            <p className="text-sm font-medium text-slate-500">RevPAR</p>
            <h3 className="mt-1 text-2xl font-bold">$112.50</h3>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-lg bg-orange-50 p-2">
                <span className="material-symbols-outlined text-orange-600">account_balance_wallet</span>
              </div>
              <span className="rounded bg-orange-50 px-2 py-1 text-xs font-bold text-orange-600">+8.7%</span>
            </div>
            <p className="text-sm font-medium text-slate-500">Lợi nhuận ròng</p>
            <h3 className="mt-1 text-2xl font-bold">$28,400.00</h3>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h4 className="text-lg font-bold">Doanh thu vs. chi phí</h4>
              <p className="text-sm text-slate-500">30 ngày gần nhất</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="size-3 rounded-full bg-primary" />
                <span className="text-sm font-medium">Doanh thu</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-3 rounded-full bg-slate-300" />
                <span className="text-sm font-medium">Chi phí</span>
              </div>
            </div>
          </div>
          <div className="relative mt-4 flex h-[300px] items-end justify-between gap-4 px-2">
            <div className="pointer-events-none absolute inset-0 flex flex-col justify-between border-b border-slate-100">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="w-full border-t border-slate-100" />
              ))}
            </div>
            {[
              [40, 75],
              [45, 65],
              [35, 85],
              [50, 95],
            ].map((bars, i) => (
              <div key={i} className="flex flex-1 flex-col items-center">
                <div
                  className="relative z-0 mb-[-1px] w-full max-w-[40px] rounded-t bg-slate-300 opacity-50"
                  style={{ height: `${bars[0]}%` }}
                />
                <div
                  className="relative z-10 w-full max-w-[40px] rounded-t bg-primary"
                  style={{ height: `${bars[1]}%` }}
                />
                <span className="mt-2 text-[10px] font-bold text-slate-400">WK {i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h4 className="text-lg font-bold">Occupancy Heatmap</h4>
              <div className="flex gap-2 text-xs font-bold uppercase tracking-wider">
                <span className="flex items-center gap-1 text-primary">
                  <span className="size-2 rounded-full bg-primary" /> Hourly
                </span>
                <span className="flex items-center gap-1 text-slate-400">
                  <span className="size-2 rounded-full bg-slate-300" /> Overnight
                </span>
              </div>
            </div>
            <div className="grid grid-cols-8 gap-1.5">
              <div />
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                <div key={d} className="text-center text-[10px] font-bold text-slate-400">
                  {d}
                </div>
              ))}
              <div className="py-1 text-[10px] font-bold text-slate-400">Morning</div>
              <HeatCell cls="bg-primary/20" />
              <HeatCell cls="bg-primary/10" />
              <HeatCell cls="bg-primary/30" />
              <HeatCell cls="bg-primary/40" />
              <HeatCell cls="bg-primary/60" />
              <HeatCell cls="bg-primary/80" />
              <HeatCell cls="bg-primary/70" />
              <div className="py-1 text-[10px] font-bold text-slate-400">Noon</div>
              <HeatCell cls="bg-primary/60" />
              <HeatCell cls="bg-primary/40" />
              <HeatCell cls="bg-primary/50" />
              <HeatCell cls="bg-primary/70" />
              <HeatCell cls="bg-primary/90" />
              <HeatCell cls="bg-primary" />
              <HeatCell cls="bg-primary/90" />
              <div className="py-1 text-[10px] font-bold text-slate-400">Evening</div>
              <HeatCell cls="bg-primary/40" />
              <HeatCell cls="bg-primary/30" />
              <HeatCell cls="bg-primary/20" />
              <HeatCell cls="bg-primary/40" />
              <HeatCell cls="bg-primary/70" />
              <HeatCell cls="bg-primary/80" />
              <HeatCell cls="bg-primary/90" />
              <div className="py-1 text-[10px] font-bold text-slate-400">Night</div>
              <HeatCell cls="bg-slate-100" />
              <HeatCell cls="bg-slate-100" />
              <HeatCell cls="bg-slate-100" />
              <HeatCell cls="bg-slate-200" />
              <HeatCell cls="bg-primary/20" />
              <HeatCell cls="bg-primary/30" />
              <HeatCell cls="bg-primary/40" />
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h4 className="mb-6 text-lg font-bold">Guest Insights</h4>
            <div className="space-y-6">
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">Traveler Types</p>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm font-medium">
                      <span>Business Travelers</span>
                      <span>48%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full w-[48%] bg-primary" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm font-medium">
                      <span>Solo Travelers</span>
                      <span>32%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full w-[32%] bg-primary/60" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-t border-slate-100 pt-4">
                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">Booking Sources</p>
                <div className="flex items-center gap-4">
                  {[
                    { v: "65%", l: "Direct" },
                    { v: "25%", l: "App" },
                    { v: "10%", l: "Referral" },
                  ].map((s) => (
                    <div key={s.l} className="flex flex-1 flex-col items-center rounded-lg bg-slate-50 p-3">
                      <span className="font-bold text-lg text-primary">{s.v}</span>
                      <span className="text-[10px] font-bold uppercase text-slate-500">{s.l}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-6">
            <h4 className="text-lg font-bold">Top Performing Facilities</h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-6 py-4 text-xs font-bold uppercase text-slate-400">Facility</th>
                  <th className="px-6 py-4 text-center text-xs font-bold uppercase text-slate-400">Rating</th>
                  <th className="px-6 py-4 text-center text-xs font-bold uppercase text-slate-400">Bookings</th>
                  <th className="px-6 py-4 text-right text-xs font-bold uppercase text-slate-400">Revenue</th>
                  <th className="px-6 py-4 text-right text-xs font-bold uppercase text-slate-400">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { n: "Downtown Hub - Suite A", s: "Premium Office", r: "4.9", b: "124", rev: "$12,450.00", img: T1, up: true },
                  { n: "Riverside Pod - 04", s: "Hourly Pod", r: "4.7", b: "312", rev: "$8,920.00", img: T2, up: true },
                  { n: "Tech Park Lounge", s: "Event Space", r: "4.5", b: "18", rev: "$5,600.00", img: T3, up: false },
                ].map((row) => (
                  <tr key={row.n}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-10 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                          <img src={row.img} alt="" className="h-full w-full object-cover" />
                        </div>
                        <div>
                          <p className="text-sm font-bold">{row.n}</p>
                          <p className="text-xs text-slate-500">{row.s}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <span className="material-symbols-outlined text-sm text-orange-400">star</span>
                        <span className="text-sm font-bold">{row.r}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center text-sm font-medium">{row.b}</td>
                    <td className="px-6 py-4 text-right text-sm font-bold text-primary">{row.rev}</td>
                    <td className="px-6 py-4 text-right">
                      <span className={`material-symbols-outlined ${row.up ? "text-emerald-500" : "text-slate-400"}`}>
                        {row.up ? "trending_up" : "trending_flat"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center bg-slate-50 p-4">
            <button type="button" className="text-sm font-bold text-primary hover:underline">
              View All Facilities
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
