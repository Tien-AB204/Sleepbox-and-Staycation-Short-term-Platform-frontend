import React from "react";

const HostCalendar = () => {
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const days = [
    ...[27, 28, 29, 30].map((d) => ({ d, type: "prev" })),
    { d: 1, type: "maintenance" },
    { d: 2, type: "blocked" },
    { d: 3, type: null },
    { d: 4, type: null },
    { d: 5, type: "booking", guest: "John Smith", nights: "Oct 5 - Oct 8 (3 Nights)", room: "ZenPod Deluxe" },
    { d: 6, type: "booking-cont" },
    { d: 7, type: "booking-cont" },
    { d: 8, type: "booking-cont" },
    { d: 9, type: null },
    { d: 10, type: null },
    { d: 11, type: null },
    { d: 12, type: "blocked" },
    { d: 13, type: null },
    { d: 14, type: null },
    { d: 15, type: "booking", guest: "Sarah J." },
    { d: 16, type: "booking-cont" },
    { d: 17, type: null },
    { d: 18, type: null },
    { d: 19, type: null },
    { d: 20, type: "booking", guest: "Mark Ruffalo" },
    { d: 21, type: "booking-cont" },
    { d: 22, type: null },
    { d: 23, type: "today" },
  ];

  return (
    <div className="flex flex-col h-full">
      <header className="h-16 border-b border-[#351a5b]/10 bg-white px-8 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <div className="relative">
            <select className="appearance-none bg-[#351a5b]/5 border-none rounded-lg px-4 py-2 pr-10 text-sm font-semibold text-[#351a5b] focus:ring-2 focus:ring-[#351a5b]/20">
              <option>ZenPod - Terminal 3</option>
              <option>ZenPod - Gate A12</option>
              <option>BoxHub Storage - London</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#351a5b] pointer-events-none">expand_more</span>
          </div>
          <div className="h-6 w-px bg-[#351a5b]/10 mx-2" />
          <div className="flex items-center gap-2">
            <button type="button" className="p-1 hover:bg-[#351a5b]/10 rounded">
              <span className="material-symbols-outlined text-xl">chevron_left</span>
            </button>
            <h2 className="text-lg font-bold min-w-[140px] text-center">October 2023</h2>
            <button type="button" className="p-1 hover:bg-[#351a5b]/10 rounded">
              <span className="material-symbols-outlined text-xl">chevron_right</span>
            </button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button type="button" className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-[#351a5b]/5 rounded-lg transition-colors border border-[#351a5b]/10">
            <span className="material-symbols-outlined text-lg">sync</span>
            Sync Calendar
          </button>
          <button type="button" className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-[#351a5b]/5 rounded-lg transition-colors border border-[#351a5b]/10">
            <span className="material-symbols-outlined text-lg">download</span>
            Export
          </button>
          <button type="button" className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-[#351a5b] text-white hover:bg-[#351a5b]/90 rounded-lg transition-all shadow-lg shadow-[#351a5b]/20">
            <span className="material-symbols-outlined text-lg">block</span>
            Block Dates
          </button>
        </div>
      </header>
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-y-auto p-8">
          <div className="bg-white rounded-2xl shadow-sm border border-[#351a5b]/10 overflow-hidden">
            <div className="grid grid-cols-7 border-b border-[#351a5b]/10 bg-[#351a5b]/5">
              {weekDays.map((w) => (
                <div key={w} className="py-3 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {w}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 grid-rows-5">
              {days.map((item) => (
                <div key={item.d} className="h-32 border-b border-r border-[#351a5b]/10 p-2 relative group hover:bg-[#351a5b]/5 transition-colors">
                  <span className={`text-sm font-medium ${item.type === "prev" ? "text-slate-400" : item.type === "today" ? "text-[#351a5b] font-bold" : ""}`}>
                    {item.type === "today" ? "Today" : item.d}
                  </span>
                  {item.type === "today" && <span className="absolute top-1 right-1 w-2 h-2 bg-[#351a5b] rounded-full" />}
                  {item.type === "maintenance" && (
                    <div className="mt-2 p-1.5 bg-slate-100 rounded text-[10px] font-bold text-slate-500 border border-slate-200">Maintenance</div>
                  )}
                  {item.type === "blocked" && (
                    <div className="mt-2 p-1.5 bg-[#351a5b]/10 rounded text-[10px] font-bold text-[#351a5b] border border-[#351a5b]/20">Blocked</div>
                  )}
                  {item.type === "booking" && item.guest && (
                    <div className="mt-2 p-2 bg-[#351a5b] rounded-lg text-white text-[11px] font-medium shadow-md">{item.guest}</div>
                  )}
                  {item.type === "booking-cont" && <div className="absolute inset-x-0 top-10 bg-[#351a5b] h-8 -mx-px z-10 opacity-80" />}
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-center gap-8 p-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-[#351a5b]" />
                <span className="text-xs font-semibold text-slate-500">Confirmed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-slate-100 border border-slate-200" />
                <span className="text-xs font-semibold text-slate-500">Maintenance</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-[#351a5b]/10 border border-[#351a5b]/20" />
                <span className="text-xs font-semibold text-slate-500">Blocked</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-white border border-[#351a5b]/10" />
                <span className="text-xs font-semibold text-slate-500">Available</span>
              </div>
            </div>
          </div>
        </div>
        <aside className="w-80 border-l border-[#351a5b]/10 bg-white p-6 overflow-y-auto shrink-0">
          <h3 className="text-lg font-bold mb-6">October Highlights</h3>
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-[#351a5b]/5 border border-[#351a5b]/10">
              <p className="text-sm font-medium text-slate-500 mb-1">Occupancy Rate</p>
              <div className="flex items-end gap-2">
                <h4 className="text-3xl font-bold text-[#351a5b] leading-none">84%</h4>
                <span className="text-sm font-bold text-emerald-500 pb-0.5 flex items-center">
                  <span className="material-symbols-outlined text-sm">trending_up</span> 5.2%
                </span>
              </div>
              <div className="mt-4 w-full bg-[#351a5b]/10 h-2 rounded-full overflow-hidden">
                <div className="bg-[#351a5b] h-full w-[84%]" />
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-[#351a5b]/5 border border-[#351a5b]/10">
              <p className="text-sm font-medium text-slate-500 mb-1">Total Revenue</p>
              <div className="flex items-end gap-2">
                <h4 className="text-3xl font-bold text-[#351a5b] leading-none">£12,450</h4>
                <span className="text-sm font-bold text-emerald-500 pb-0.5 flex items-center">
                  <span className="material-symbols-outlined text-sm">trending_up</span> 12%
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-3 italic">Compared to Sept 2023</p>
            </div>
            <div className="p-6 rounded-2xl bg-[#351a5b]/5 border border-[#351a5b]/10">
              <p className="text-sm font-medium text-slate-500 mb-1">Most Booked Days</p>
              <h4 className="text-xl font-bold text-[#351a5b]">Fri, Sat, Sun</h4>
              <p className="text-xs text-slate-400 mt-2">Weekends show 98% occupancy</p>
            </div>
            <div className="p-4 border border-dashed border-[#351a5b]/20 rounded-2xl">
              <h5 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Quick Actions</h5>
              <button type="button" className="w-full text-left flex items-center gap-3 p-3 rounded-xl hover:bg-[#351a5b]/5 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-[#351a5b]/10 flex items-center justify-center text-[#351a5b]">
                  <span className="material-symbols-outlined text-lg">edit_calendar</span>
                </div>
                <div>
                  <p className="text-sm font-bold">Edit Base Rates</p>
                  <p className="text-[10px] text-slate-400">Manage seasonal pricing</p>
                </div>
              </button>
              <button type="button" className="w-full text-left flex items-center gap-3 p-3 rounded-xl hover:bg-[#351a5b]/5 transition-colors mt-2">
                <div className="w-8 h-8 rounded-lg bg-[#351a5b]/10 flex items-center justify-center text-[#351a5b]">
                  <span className="material-symbols-outlined text-lg">cleaning_services</span>
                </div>
                <div>
                  <p className="text-sm font-bold">Schedule Clean</p>
                  <p className="text-[10px] text-slate-400">Request facility maintenance</p>
                </div>
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default HostCalendar;
