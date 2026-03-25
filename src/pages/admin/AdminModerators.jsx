import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const M1 =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDwTm2NkuIQdMRWIGQxhAMjPHtZb7Ix1jBSYH2dmfSF__19BAc23KqGWF5IZMAfKcctqJtEmokq8sNQ8bv8QnLzAMr117xApB9zsfpRyammrpF2uMHmtME5UBzg6gizlH1aBMNwKpScCJzHQSq41F5Qb8_2F2AMtPmdfsns6BL1J-I82EjZnILl6z_GELIgzY84eYzfXZ1FJTRBiMIFD-Znc5vE5M0q83y4g5PayxZTB8Vtn9ZJJo4Tu2H8Ac95Zz2oYMjHPx8NL_Iz";
const M2 =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDuF72q1NrtNGaCQcd85afy3ZlAQPs4OjzzXRmAx5VnC-F9hLcx5uO7ghyyumPpqaMN7BHcx2LVIQbBbUXybdiM5nYrr-AlWCmsGhBJ8c6c4rsfnLV-Y35mJBNIVjZOSVJHhrXkhE7gmPupp_bO0Um6ax17JHN4yGGAb91_P9nsyCnqgGMLcTLy0RYPeSPOFkAcv3pWYzQvFKWUceQDS32MD5QQQDjH8n-aqAELEbKL7Zje6BlzU-QyBxQC0SMPR4J6TKOmmf0GxVSP";
const M3 =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDySfDaReRoFgHNgQgvz-FKKMNM7874SAZX6HcIbNNz3-jCul8PORqqiENVLu7qYZMmWZy0YbmmxVtBOjlFYM_ffKd68qqia2HXHRT5xaT6Gcjn4gRRZt0Dwq6RVOJjlf6DKAnGT18ZSHThin6bcetWLfaqnAXm3KsNQmXokZtVRKyTR0lgFx9JeZJ9hrI1clsOLw2uyNHe2TPyIsCVH42T2Cq4k8OXYG85eLPMChPRDVEAQkW39FmipNPg6hIwbHuXKS6AVh_kMo5m";

const MODERATORS = [
  {
    name: "Julian Vance",
    email: "vance.j@boxhub.com",
    avatarUrl: M1,
    assignment: "Content",
    assignmentClass: "bg-primary/10 text-primary",
    status: "Online",
    statusDot: "bg-emerald-500",
    load: 75,
    tasks: 12,
    rating: "4.9",
  },
  {
    name: "Elena Rossi",
    email: "rossi.e@boxhub.com",
    avatarUrl: M2,
    assignment: "Disputes",
    assignmentClass: "bg-sky-100 text-sky-700",
    status: "Online",
    statusDot: "bg-emerald-500",
    load: 30,
    tasks: 4,
    rating: "5.0",
  },
  {
    name: "Marcus Chen",
    email: "chen.m@boxhub.com",
    avatarUrl: M3,
    assignment: "Support",
    assignmentClass: "bg-slate-100 text-slate-700",
    status: "Offline",
    statusDot: "bg-slate-300",
    load: 0,
    tasks: 0,
    rating: "4.7",
  },
];

export default function AdminModerators() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [onlineOnly, setOnlineOnly] = useState(false);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MODERATORS.filter((m) => {
      const passSearch =
        !q || m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q) || m.assignment.toLowerCase().includes(q);
      const passOnline = !onlineOnly || m.status === "Online";
      return passSearch && passOnline;
    });
  }, [query, onlineOnly]);

  return (
    <main className="flex-1 overflow-y-auto p-8">
      <header className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <h2 className="text-[30px] font-extrabold tracking-tight text-primary">Moderator Fleet</h2>
          <p className="mt-2 text-slate-500">Manage and monitor your executive curation team.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="rounded-xl border border-primary/20 bg-white px-5 py-2.5 text-sm font-bold text-primary transition-colors hover:bg-primary/5"
          >
            View Detailed Logs
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/moderators/new")}
            className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-opacity hover:opacity-90"
          >
            <span className="material-symbols-outlined text-[18px]">person_add</span>
            Add Moderator
          </button>
        </div>
      </header>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[
          { icon: "groups", label: "Total Moderators", value: "42", chip: "+4 this week", iconClass: "bg-primary/10 text-primary" },
          { icon: "warning", label: "Active Cases", value: "158", chip: "Real-time", iconClass: "bg-amber-500/10 text-amber-600" },
          { icon: "speed", label: "Avg. Resolution", value: "14m", chip: "-12% vs avg", iconClass: "bg-sky-100 text-sky-700" },
          { icon: "flag", label: "Flags Handled", value: "1,204", chip: "Today", iconClass: "bg-rose-100 text-rose-600" },
        ].map((m) => (
          <div key={m.label} className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${m.iconClass}`}>
                <span className="material-symbols-outlined">{m.icon}</span>
              </div>
              <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-black uppercase tracking-wide text-slate-500">
                {m.chip}
              </span>
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">{m.label}</p>
            <h3 className="mt-1 text-3xl font-extrabold text-slate-900">{m.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
        <section className="overflow-hidden rounded-xl border border-primary/10 bg-white shadow-sm xl:col-span-2">
          <div className="flex flex-col gap-4 border-b border-primary/10 p-6 sm:flex-row sm:items-center sm:justify-between">
            <h4 className="text-lg font-bold text-slate-900">Active Staff Registry</h4>
            <div className="flex flex-wrap gap-2">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search moderators..."
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/20"
              />
              <button
                type="button"
                onClick={() => setOnlineOnly((v) => !v)}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold ${
                  onlineOnly ? "bg-primary text-white" : "bg-primary/10 text-primary"
                }`}
              >
                {onlineOnly ? "Online Only" : "All Role"}
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left">
              <thead className="bg-slate-50">
                <tr>
                  {["Moderator", "Assignment", "Status", "Load", "Rating", ""].map((h) => (
                    <th key={h} className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/5">
                {rows.map((m) => (
                  <tr key={m.email} className="group transition-colors hover:bg-primary/5">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={m.avatarUrl} alt="" className="h-9 w-9 rounded-lg object-cover" />
                        <div>
                          <p className="text-sm font-bold text-slate-900">{m.name}</p>
                          <p className="text-[11px] text-slate-500">{m.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`rounded-lg px-2.5 py-1 text-xs font-bold ${m.assignmentClass}`}>{m.assignment}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full ${m.statusDot}`} />
                        <span className="text-xs font-medium text-slate-600">{m.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-20">
                        <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                          <div className="h-full bg-primary" style={{ width: `${m.load}%` }} />
                        </div>
                        <p className="mt-1 text-[10px] font-bold text-slate-500">{m.tasks} Tasks</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-amber-500">
                        <span className="material-symbols-outlined text-sm [font-variation-settings:'FILL'_1]">star</span>
                        <span className="ml-1 text-xs font-bold text-slate-900">{m.rating}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button type="button" className="p-1.5 text-slate-400 opacity-0 transition-colors hover:text-primary group-hover:opacity-100">
                        <span className="material-symbols-outlined">more_vert</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t border-primary/10 bg-slate-50 p-4 text-center">
            <button type="button" className="text-xs font-bold text-primary hover:underline">
              View all 42 staff members
            </button>
          </div>
        </section>

        <section className="space-y-8">
          <div className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm">
            <h4 className="mb-6 flex items-center justify-between text-lg font-bold text-slate-900">
              Live Stream
              <span className="h-2 w-2 animate-pulse rounded-full bg-rose-500" />
            </h4>
            <div className="space-y-6">
              {[
                ["check_circle", "bg-emerald-100 text-emerald-600", "Julian Vance", "resolved Dispute #8291", "2 minutes ago"],
                ["gavel", "bg-amber-100 text-amber-600", "Elena Rossi", "banned User ID: X2910", "14 minutes ago"],
                ["info", "bg-primary/10 text-primary", "System", "escalated Content Flag #0122", "28 minutes ago"],
              ].map(([icon, cls, actor, action, time], idx) => (
                <div key={time} className="relative flex gap-4">
                  {idx < 2 ? <div className="absolute bottom-[-24px] left-[11px] top-6 w-px bg-primary/10" /> : null}
                  <div className={`z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${cls}`}>
                    <span className="material-symbols-outlined text-xs">{icon}</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      {actor} <span className="font-normal text-slate-500">{action}</span>
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-400">{time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl bg-primary p-6 text-white shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-30" />
            <h4 className="relative z-10 text-lg font-bold">Role Alignment</h4>
            <p className="relative z-10 mt-1 text-xs text-white/70">Adjust permissions and level distributions.</p>
            <div className="relative z-10 mt-6 space-y-4">
              {[
                ["security", "Content Security", "18 Staff"],
                ["balance", "Legal & Disputes", "12 Staff"],
              ].map(([icon, role, count]) => (
                <div key={role} className="flex items-center justify-between rounded-lg bg-white/10 p-3">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-sm">{icon}</span>
                    <span className="text-xs font-bold">{role}</span>
                  </div>
                  <span className="rounded bg-white/20 px-2 py-0.5 text-xs font-bold">{count}</span>
                </div>
              ))}
            </div>
            <button type="button" className="relative z-10 mt-6 w-full rounded-xl bg-white py-2.5 text-sm font-bold text-primary transition-colors hover:bg-slate-50">
              Adjust Permissions
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
