import React from "react";

const HostSettings = () => {
  return (
    <div className="p-8 max-w-3xl">
      <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Settings</h2>
      <p className="text-slate-500 mb-8">Manage your host account and preferences.</p>
      <div className="bg-white rounded-2xl border border-[#351a5b]/10 p-6 shadow-sm space-y-6">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Business name</label>
          <input className="w-full rounded-lg border border-slate-200 px-4 py-2.5 focus:ring-2 focus:ring-[#351a5b]/20 focus:border-[#351a5b]" type="text" placeholder="Your facility name" />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Notification email</label>
          <input className="w-full rounded-lg border border-slate-200 px-4 py-2.5 focus:ring-2 focus:ring-[#351a5b]/20 focus:border-[#351a5b]" type="email" placeholder="admin@boxhub.com" />
        </div>
        <button type="button" className="bg-[#351a5b] text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-[#351a5b]/90 transition-colors">
          Save changes
        </button>
      </div>
    </div>
  );
};

export default HostSettings;
