import React from "react";

const HostDisputes = () => {
  const stats = [
    { label: "Total Active Disputes", value: "12", badge: "+2 today", badgeColor: "red" },
    { label: "Resolved This Month", value: "48", badge: "↑ 12%", badgeColor: "green" },
    { label: "Avg. Resolution Time", value: "2.4", suffix: "Days", badge: "-0.5d", badgeColor: "slate" },
    { label: "Pending Refunds", value: "$1,240", badge: "3 awaiting", badgeColor: "amber" },
  ];

  return (
    <div className="p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-white p-6 rounded-xl border border-[#351a5b]/5 shadow-sm">
            <p className="text-sm font-medium text-slate-500 mb-1">{s.label}</p>
            <div className="flex items-end justify-between">
              <h3 className="text-3xl font-bold text-slate-900">
                {s.value}
                {s.suffix && <span className="text-sm font-medium text-slate-400 ml-1">{s.suffix}</span>}
              </h3>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${s.badgeColor === "red" ? "text-red-500 bg-red-50" : s.badgeColor === "green" ? "text-green-500 bg-green-50" : s.badgeColor === "amber" ? "text-amber-500 bg-amber-50" : "text-slate-400 bg-slate-50"}`}>
                {s.badge}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-[#351a5b]/5 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[#351a5b]/5 flex items-center justify-between">
          <h4 className="font-bold text-lg text-slate-900">Active Issue Log</h4>
          <div className="flex gap-2">
            <button type="button" className="p-2 border border-[#351a5b]/10 rounded-lg hover:bg-[#351a5b]/5">
              <span className="material-symbols-outlined text-xl">filter_list</span>
            </button>
            <button type="button" className="p-2 border border-[#351a5b]/10 rounded-lg hover:bg-[#351a5b]/5">
              <span className="material-symbols-outlined text-xl">download</span>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Dispute ID</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Guest Name</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Property/Unit</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#351a5b]/5">
              <tr className="hover:bg-[#351a5b]/[0.02] transition-colors">
                <td className="px-6 py-4 font-medium text-[#351a5b]">#DIS-8921</td>
                <td className="px-6 py-4 font-semibold text-slate-900">Alex Johnson</td>
                <td className="px-6 py-4 text-sm text-slate-600">Unit 4B - Downtown</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-semibold">Cleanliness</span>
                </td>
                <td className="px-6 py-4">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-red-600">
                    <span className="w-2 h-2 bg-red-600 rounded-full" /> High
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold border border-blue-100">Open</span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">Oct 24, 2023</td>
                <td className="px-6 py-4">
                  <div className="flex gap-3 text-[#351a5b]">
                    <button type="button" className="hover:opacity-70" title="View Details">
                      <span className="material-symbols-outlined text-xl">visibility</span>
                    </button>
                    <button type="button" className="hover:opacity-70" title="Message Guest">
                      <span className="material-symbols-outlined text-xl">chat</span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HostDisputes;
