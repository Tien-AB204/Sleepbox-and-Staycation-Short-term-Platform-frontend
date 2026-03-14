import React, { useState } from "react";

const HostStaff = () => {
  const [staffTab, setStaffTab] = useState("All Staff");

  const staff = [
    { name: "Sarah Chen", facility: "ZenPod - T3", role: "Receptionist", status: "Active", statusColor: "emerald" },
    { name: "Marcus Thorne", facility: "CyberBox - D1", role: "Maintenance", status: "On Break", statusColor: "amber" },
    { name: "Elena Rodriguez", facility: "CyberBox - D1", role: "Facility Manager", status: "Off-duty", statusColor: "slate" },
  ];

  const metrics = [
    { label: "Total Staff", value: "42", badge: "+2%", badgeClass: "bg-emerald-50 text-emerald-600" },
    { label: "Currently on Shift", value: "18", badge: "0%", badgeClass: "bg-slate-100 text-slate-400" },
    { label: "Pending Invitations", value: "5", badge: "-12%", badgeClass: "bg-rose-50 text-rose-600" },
    { label: "Performance Rating", value: "4.8/5", badge: "+0.3%", badgeClass: "bg-emerald-50 text-emerald-600" },
  ];

  return (
    <div className="p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900">Staff Directory</h2>
          <p className="text-slate-500">Manage your team across all BoxHub facilities and monitor performance.</p>
        </div>
        <button type="button" className="flex items-center gap-2 bg-[#351a5b] text-white px-6 py-3 rounded-xl font-bold text-sm">
          <span className="material-symbols-outlined">person_add</span>
          Add New Staff
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <div key={m.label} className="bg-white p-6 rounded-2xl border border-slate-200">
            <p className="text-sm font-medium text-slate-500">{m.label}</p>
            <div className="flex items-end justify-between mt-2">
              <h3 className="text-2xl font-bold text-slate-900">{m.value}</h3>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${m.badgeClass}`}>{m.badge}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex gap-4">
                {["All Staff", "Managers", "Maintenance"].map((t) => (
                  <button key={t} type="button" onClick={() => setStaffTab(t)} className={`text-sm pb-2 px-1 ${staffTab === t ? "font-bold text-[#351a5b] border-b-2 border-[#351a5b]" : "font-medium text-slate-400 hover:text-slate-600"}`}>
                    {t}
                  </button>
                ))}
              </div>
              <button type="button" className="text-slate-400 hover:text-slate-600">
                <span className="material-symbols-outlined">filter_list</span>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Employee</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Role</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {staff.map((s) => (
                    <tr key={s.name} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-200" />
                          <div>
                            <p className="text-sm font-bold text-slate-900">{s.name}</p>
                            <p className="text-xs text-slate-500">{s.facility}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-700">{s.role}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${s.statusColor === "emerald" ? "text-emerald-600 bg-emerald-50" : s.statusColor === "amber" ? "text-amber-600 bg-amber-50" : "text-slate-400 bg-slate-100"}`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current" />
                          {s.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button type="button" className="text-slate-400 hover:text-[#351a5b]">
                          <span className="material-symbols-outlined text-xl">chat</span>
                        </button>
                        <button type="button" className="text-slate-400 hover:text-[#351a5b]">
                          <span className="material-symbols-outlined text-xl">edit</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg text-slate-900">Role Permissions</h3>
            <button type="button" className="text-[#351a5b] text-sm font-bold">Manage Roles</button>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#351a5b]/10 text-[#351a5b] flex items-center justify-center">
                <span className="material-symbols-outlined">security</span>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">Full Access</p>
                <p className="text-xs text-slate-500 mt-1">Can edit facilities, manage billing and staff.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostStaff;
