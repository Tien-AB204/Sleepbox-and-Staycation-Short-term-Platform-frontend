import React, { useState } from "react";

const HostStatistics = () => {
  const [range, setRange] = useState("Last 30 Days");

  const kpis = [
    { label: "Total Revenue", value: "$42,850.00", change: "+12.5%", icon: "monetization_on", iconClass: "bg-emerald-50 text-emerald-600", changeClass: "text-emerald-600 bg-emerald-50" },
    { label: "Avg. Occupancy Rate", value: "84.2%", change: "+3.1%", icon: "bed", iconClass: "bg-blue-50 text-blue-600", changeClass: "text-blue-600 bg-blue-50" },
    { label: "RevPAR", value: "$112.50", change: "+5.2%", icon: "finance", iconClass: "bg-purple-50 text-purple-600", changeClass: "text-purple-600 bg-purple-50" },
    { label: "Net Profit", value: "$28,400.00", change: "+8.7%", icon: "account_balance_wallet", iconClass: "bg-orange-50 text-orange-600", changeClass: "text-orange-600 bg-orange-50" },
  ];

  return (
    <div className="p-8 space-y-8">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[#351a5b] text-3xl">analytics</span>
          <h2 className="text-xl font-bold text-slate-900">Statistics &amp; Reports</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-slate-100 rounded-lg p-1">
            {["Last 7 Days", "Last 30 Days", "Year to Date"].map((r) => (
              <button key={r} type="button" onClick={() => setRange(r)} className={`px-4 py-1.5 text-sm rounded-md transition-all ${range === r ? "font-bold text-[#351a5b] bg-white shadow-sm" : "font-medium text-slate-600 hover:bg-white/50"}`}>
                {r}
              </button>
            ))}
            <button type="button" className="px-3 py-1.5 text-slate-500 hover:text-[#351a5b] transition-colors">
              <span className="material-symbols-outlined text-lg">calendar_month</span>
            </button>
          </div>
          <div className="h-8 w-px bg-slate-200" />
          <div className="flex gap-2">
            <button type="button" className="flex items-center gap-2 px-4 py-2 bg-[#351a5b] text-white text-sm font-bold rounded-lg hover:bg-[#351a5b]/90 transition-all shadow-md">
              <span className="material-symbols-outlined text-sm">download</span>
              Export Report
            </button>
            <button type="button" className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </div>
        </div>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((k) => (
          <div key={k.label} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${k.iconClass}`}>
                <span className="material-symbols-outlined">{k.icon}</span>
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded ${k.changeClass}`}>{k.change}</span>
            </div>
            <p className="text-slate-500 text-sm font-medium">{k.label}</p>
            <h3 className="text-2xl font-bold mt-1 text-slate-900">{k.value}</h3>
          </div>
        ))}
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h4 className="text-lg font-bold text-slate-900">Revenue vs. Expenses</h4>
            <p className="text-sm text-slate-500">Comparing total earnings against operational costs over the last 30 days</p>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#351a5b]" />
              <span className="text-sm font-medium">Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-slate-300" />
              <span className="text-sm font-medium">Expenses</span>
            </div>
          </div>
        </div>
        <div className="flex items-end justify-between gap-4 h-[300px] px-2">
          {["75%", "65%", "85%", "95%"].map((h, i) => (
            <div key={i} className="flex flex-col items-center flex-1 group">
              <div className="w-full max-w-[40px] bg-slate-300 rounded-t opacity-50 mb-[-1px] relative z-0" style={{ height: "40%" }} />
              <div className="w-full max-w-[40px] bg-[#351a5b] rounded-t relative z-10" style={{ height: h }} />
              <span className="text-[10px] mt-2 font-bold text-slate-400">WK {i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HostStatistics;
