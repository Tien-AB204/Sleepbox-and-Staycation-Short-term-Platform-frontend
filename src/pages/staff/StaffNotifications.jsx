import React, { useState } from "react";

/** stitch: boxhub_th_ng_b_o_staff/code.html */
export default function StaffNotifications() {
  const [cat, setCat] = useState("all");

  return (
    <main className="flex min-w-0 flex-1 flex-col bg-background-light">
      <div className="mx-auto w-full max-w-5xl flex-1 p-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-slate-900">Notifications</h2>
            <p className="mt-1 text-slate-500">Stay updated with the latest activity and alerts.</p>
          </div>
          <button
            type="button"
            className="flex items-center gap-2 rounded-xl bg-primary/10 px-5 py-2.5 text-sm font-bold text-primary transition-all hover:bg-primary/20"
          >
            <span className="material-symbols-outlined text-xl">done_all</span>
            Mark all as read
          </button>
        </div>

        <div className="no-scrollbar mb-6 flex overflow-x-auto border-b border-primary/10">
          {[
            { id: "all", label: "All" },
            { id: "bookings", label: "Bookings" },
            { id: "ops", label: "Operational" },
            { id: "sys", label: "System" },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setCat(t.id)}
              className={`whitespace-nowrap px-6 py-4 text-sm font-bold transition-colors ${
                cat === t.id
                  ? "border-b-2 border-primary text-primary"
                  : "border-b-2 border-transparent text-slate-500 hover:text-primary"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          <div className="group flex items-start gap-4 rounded-xl border-l-4 border-primary bg-white p-5 shadow-sm transition-all hover:shadow-md">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <span className="material-symbols-outlined">calendar_today</span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-base font-bold text-slate-900">New Booking: Box A-04</h3>
                <span className="shrink-0 rounded-full bg-primary/10 px-2 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                  Unread
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-600">
                A new booking has been confirmed for 3 hours starting from 14:00 PM today.
              </p>
              <p className="mt-2 flex items-center gap-1 text-xs text-slate-400">
                <span className="material-symbols-outlined text-sm">schedule</span> 2 mins ago
              </p>
            </div>
            <div className="hidden gap-2 opacity-0 transition-opacity group-hover:opacity-100 sm:flex">
              <button type="button" className="rounded-lg p-2 text-slate-400 hover:bg-primary/5 hover:text-primary" title="View">
                <span className="material-symbols-outlined">visibility</span>
              </button>
              <button type="button" className="rounded-lg p-2 text-slate-400 hover:bg-primary/5 hover:text-primary" title="Read">
                <span className="material-symbols-outlined">check_circle</span>
              </button>
              <button type="button" className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-500" title="Delete">
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
          </div>

          <div className="group flex items-start gap-4 rounded-xl border-l-4 border-primary bg-white p-5 shadow-sm transition-all hover:shadow-md">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
              <span className="material-symbols-outlined">build</span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-base font-bold text-slate-900">Maintenance Required: Box B-12</h3>
                <span className="shrink-0 rounded-full bg-primary/10 px-2 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                  Unread
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-600">
                Cleaning staff reported a broken charging port and door handle issue in Box B-12.
              </p>
              <p className="mt-2 flex items-center gap-1 text-xs text-slate-400">
                <span className="material-symbols-outlined text-sm">schedule</span> 1 hour ago
              </p>
            </div>
          </div>

          <div className="group flex items-start gap-4 rounded-xl border-l-4 border-transparent bg-slate-50 p-5 opacity-75 shadow-sm grayscale-[0.5] transition-all hover:opacity-100 hover:grayscale-0 hover:shadow-md">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-slate-200 text-slate-600">
              <span className="material-symbols-outlined">settings_suggest</span>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-base font-medium text-slate-700">System Update: Version 2.4.0</h3>
              <p className="mt-1 text-sm text-slate-500">
                Platform-wide update complete. New features added for booking conflict resolution.
              </p>
              <p className="mt-2 flex items-center gap-1 text-xs text-slate-400">
                <span className="material-symbols-outlined text-sm">schedule</span> 4 hours ago
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
