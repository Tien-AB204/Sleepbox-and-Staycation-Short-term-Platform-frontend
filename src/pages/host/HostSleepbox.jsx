import React from "react";

const HostSleepbox = () => {
  return (
    <div className="p-8">
      <header className="bg-white border-b border-[#351a5b]/10 px-8 py-4 -mx-8 -mt-8 mb-8 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button type="button" className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#351a5b]/5 text-slate-500 transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">ZenPod - Terminal 3</h2>
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <span className="material-symbols-outlined text-xs">location_on</span>
              San Francisco Intl Airport (SFO)
            </div>
          </div>
        </div>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n} className="bg-white rounded-2xl border border-[#351a5b]/10 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900">Pod #{n}</h3>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700">Available</span>
            </div>
            <p className="text-sm text-slate-500 mb-4">Standard single pod • LED lighting, USB ports</p>
            <div className="flex gap-2">
              <button type="button" className="flex-1 bg-[#351a5b]/10 text-[#351a5b] py-2 rounded-lg font-bold text-sm hover:bg-[#351a5b]/20 transition-colors">
                Edit
              </button>
              <button type="button" className="flex-1 border border-slate-200 text-slate-700 py-2 rounded-lg font-bold text-sm hover:bg-slate-50 transition-colors">
                Block
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HostSleepbox;
