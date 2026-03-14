import React, { useState } from "react";

const HOST_BOOKING_TABS = ["All", "Upcoming", "Currently In", "Completed", "Cancelled"];

const HostBookings = () => {
  const [tab, setTab] = useState("All");

  return (
    <div className="p-8 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-[#351a5b]/5 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-[#351a5b]/10 rounded-lg">
              <span className="material-symbols-outlined text-[#351a5b]">analytics</span>
            </div>
            <span className="text-emerald-500 text-xs font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">trending_up</span> +12%
            </span>
          </div>
          <p className="text-slate-500 text-sm font-medium">Total Bookings Today</p>
          <h3 className="text-3xl font-bold mt-1">24</h3>
        </div>
        <div className="bg-white p-6 rounded-xl border border-[#351a5b]/5 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-orange-100 rounded-lg">
              <span className="material-symbols-outlined text-orange-600">door_front</span>
            </div>
            <span className="text-slate-400 text-xs font-medium italic">Active queue</span>
          </div>
          <p className="text-slate-500 text-sm font-medium">Check-ins Pending</p>
          <h3 className="text-3xl font-bold mt-1">8</h3>
        </div>
        <div className="bg-white p-6 rounded-xl border border-[#351a5b]/5 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <span className="material-symbols-outlined text-emerald-600">account_balance_wallet</span>
            </div>
            <span className="text-emerald-500 text-xs font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">trending_up</span> +18%
            </span>
          </div>
          <p className="text-slate-500 text-sm font-medium">Expected Revenue (Week)</p>
          <h3 className="text-3xl font-bold mt-1">$12,450</h3>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-[#351a5b]/5 shadow-sm">
        <div className="p-6 border-b border-[#351a5b]/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex gap-1 bg-[#f7f6f8] p-1 rounded-lg w-fit">
            {HOST_BOOKING_TABS.map((t) => (
              <button key={t} type="button" onClick={() => setTab(t)} className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-colors ${tab === t ? "bg-white shadow-sm text-[#351a5b]" : "text-slate-500 hover:text-[#351a5b]"}`}>
                {t}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button type="button" className="flex items-center gap-2 px-4 py-2 border border-[#351a5b]/20 rounded-lg text-sm font-bold text-[#351a5b] hover:bg-[#351a5b]/5 transition-colors">
              <span className="material-symbols-outlined text-lg">filter_list</span> Filters
            </button>
            <button type="button" className="flex items-center gap-2 px-4 py-2 bg-[#351a5b] text-white rounded-lg text-sm font-bold hover:opacity-90 transition-opacity">
              <span className="material-symbols-outlined text-lg">add</span> New Booking
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f7f6f8]/50">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Guest</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Property & Unit</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Check-in / Out</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Payment</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#351a5b]/5">
              <tr className="hover:bg-[#351a5b]/5 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-200 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC1cNG8OyR42VNfS-IjwbJyIPKzzI1Mf6O--qtyLzTB9TCnXNcXLOHDa99mEiMCl_uSvIUgWAGfgmQpLZlaWA7Tk_mm-GDsh85j5_VJvHEcMBDNNCCCMipJksZgkRq36BFzRENsfXaj5FmKrdFdOOlmjkjnFQmCteHariqNyBTzTTJYuRkwFtutxS8McH7B48nz3dRIdCIcsjleXM4Pjy7ba4_iaWi6GOWZxF3NDkC-kbr0Vowa8MN_VlgEv2xbpB5EbDEymjIQ5Q1I')" }} />
                    <div>
                      <p className="text-sm font-bold">Alex Johnson</p>
                      <p className="text-xs text-slate-500">+1 (555) 123-4567</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-semibold">ZenPod - T3</p>
                  <p className="text-xs text-slate-500">Box A-01</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-medium">Oct 12, 10:00</p>
                  <p className="text-xs text-slate-400">Oct 12, 14:00</p>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-bold uppercase">Hourly</span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-bold">$45.00</p>
                  <p className="text-[10px] font-bold text-emerald-600 uppercase">Paid</p>
                </td>
                <td className="px-6 py-4">
                  <span className="flex items-center gap-1.5 text-[#351a5b] text-sm font-bold">
                    <span className="w-2 h-2 rounded-full bg-[#351a5b]" /> Confirmed
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button type="button" className="p-2 text-slate-400 hover:text-[#351a5b] transition-colors">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HostBookings;
