import React from "react";

const HostPricing = () => {
  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Pricing Management</h2>
          <p className="text-slate-500 mt-1">Configure your pod rates and automate pricing adjustments based on demand.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white rounded-xl p-6 shadow-sm border border-[#351a5b]/5">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#351a5b]">account_balance_wallet</span>
                  Base Rates
                </h3>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#351a5b]/10 text-[#351a5b] uppercase">Standard Rates</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 rounded-lg border border-[#351a5b]/10 bg-[#351a5b]/5">
                  <label className="block text-xs font-bold text-[#351a5b] uppercase tracking-wider mb-2">Hourly Rate</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#351a5b]/60 font-bold">$</span>
                    <input className="w-full bg-white border-none rounded-md py-2 pl-8 pr-4 font-bold focus:ring-2 focus:ring-[#351a5b]" type="text" defaultValue="15.00" />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#351a5b]/40 text-xs">/ hour</span>
                  </div>
                </div>
                <div className="p-4 rounded-lg border border-[#351a5b]/10 bg-[#351a5b]/5">
                  <label className="block text-xs font-bold text-[#351a5b] uppercase tracking-wider mb-2">Overnight Rate (8h+)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#351a5b]/60 font-bold">$</span>
                    <input className="w-full bg-white border-none rounded-md py-2 pl-8 pr-4 font-bold focus:ring-2 focus:ring-[#351a5b]" type="text" defaultValue="85.00" />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#351a5b]/40 text-xs">/ stay</span>
                  </div>
                </div>
              </div>
            </section>
            <section className="bg-white rounded-xl p-6 shadow-sm border border-[#351a5b]/5">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#351a5b]">trending_up</span>
                  Seasonal &amp; Dynamic Adjustments
                </h3>
                <button type="button" className="text-[#351a5b] text-sm font-bold flex items-center gap-1 hover:underline">
                  <span className="material-symbols-outlined text-sm">add</span> Add Rule
                </button>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-lg border border-slate-100 hover:border-[#351a5b]/20 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                      <span className="material-symbols-outlined">event_repeat</span>
                    </div>
                    <div>
                      <p className="font-bold text-sm">Weekend Markup</p>
                      <p className="text-xs text-slate-400">Applies Fri - Sun (All day)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-sm font-bold text-orange-600">+15%</span>
                    <div className="flex items-center gap-2">
                      <button type="button" className="text-slate-400 hover:text-[#351a5b] transition-colors">
                        <span className="material-symbols-outlined text-xl">edit</span>
                      </button>
                      <button type="button" className="text-slate-400 hover:text-red-500 transition-colors">
                        <span className="material-symbols-outlined text-xl">delete</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border border-slate-100 hover:border-[#351a5b]/20 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <span className="material-symbols-outlined">celebration</span>
                    </div>
                    <div>
                      <p className="font-bold text-sm">Holiday Peak</p>
                      <p className="text-xs text-slate-400">Dec 20 - Jan 5</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-sm font-bold text-blue-600">+25%</span>
                    <div className="flex items-center gap-2">
                      <button type="button" className="text-slate-400 hover:text-[#351a5b] transition-colors">
                        <span className="material-symbols-outlined text-xl">edit</span>
                      </button>
                      <button type="button" className="text-slate-400 hover:text-red-500 transition-colors">
                        <span className="material-symbols-outlined text-xl">delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="bg-white rounded-xl p-6 shadow-sm border border-[#351a5b]/5">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#351a5b]">auto_fix_high</span>
                  Promotions &amp; Discounts
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border-2 border-dashed border-[#351a5b]/20 bg-[#351a5b]/5 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#351a5b]/10 transition-colors py-8">
                  <span className="material-symbols-outlined text-[#351a5b] text-3xl mb-2">add_circle</span>
                  <p className="font-bold text-[#351a5b]">New Campaign</p>
                  <p className="text-xs text-[#351a5b]/60">Create a special deal</p>
                </div>
                <div className="p-4 rounded-xl border border-[#351a5b]/10 bg-white shadow-sm relative overflow-hidden group">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 text-green-600 p-2 rounded-lg">
                      <span className="material-symbols-outlined">local_offer</span>
                    </div>
                    <div>
                      <p className="font-bold text-sm uppercase text-slate-400">DISCOUNT</p>
                      <h4 className="font-bold text-base">First-time Guest</h4>
                      <p className="text-xs text-slate-500 mt-1 mb-4">Auto-applied to new accounts</p>
                      <span className="px-3 py-1 bg-green-500 text-white font-bold text-xs rounded-full">-10% OFF</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="space-y-8">
            <section className="bg-white rounded-xl p-6 shadow-sm border border-[#351a5b]/5">
              <h3 className="text-lg font-bold flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-[#351a5b]">visibility</span>
                Price Preview
              </h3>
              <div className="space-y-4">
                <div className="flex items-end justify-between gap-1 h-32 px-2">
                  {["50%", "55%", "50%", "60%", "80%", "100%", "85%"].map((h, i) => (
                    <div key={i} className="flex-1 bg-[#351a5b]/20 rounded-t-sm relative group" style={{ height: h }} />
                  ))}
                </div>
                <div className="flex justify-between px-2 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                  <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
                </div>
                <p className="text-xs text-center text-slate-400 italic mt-4">Estimated hourly rate variance over the next 7 days</p>
              </div>
            </section>
            <section className="bg-white rounded-xl p-6 shadow-sm border border-[#351a5b]/5">
              <h3 className="text-sm font-bold flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-[#351a5b] text-lg">calendar_today</span>
                October 2023
              </h3>
              <div className="grid grid-cols-7 gap-1 text-center">
                {["M", "T", "W", "T", "F", "S", "S"].map((d) => (
                  <div key={d} className="text-[10px] text-slate-400 font-bold mb-1">{d}</div>
                ))}
                {[25, 26, 27, 28, 29, 30, 1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <div key={n} className={`text-xs p-1 ${n <= 30 ? "text-slate-300" : "font-bold"} ${n === 4 ? "bg-[#351a5b]/10 text-[#351a5b] rounded" : n >= 6 && n <= 8 ? "bg-orange-100 text-orange-600 rounded" : ""}`}>
                    {n}
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[10px] font-bold">
                  <span className="w-2 h-2 rounded-full bg-orange-400" />
                  <span className="text-slate-600">Weekend Markup Active</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  <span className="text-slate-600">Peak Holiday (Upcoming)</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostPricing;
