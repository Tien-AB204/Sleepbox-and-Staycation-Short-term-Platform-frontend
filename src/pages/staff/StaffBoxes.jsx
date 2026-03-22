import React, { useState } from "react";

/**
 * Port từ stitch: boxhub_qu_n_l_box_staff/code.html
 * — màu & class Tailwind giữ đúng file (emerald / blue / amber / rose).
 */
const TABS = [
  { id: "all", label: "All Boxes" },
  { id: "cleaning", label: "Needs Cleaning" },
  { id: "occupied", label: "Occupied" },
  { id: "available", label: "Available" },
  { id: "maintenance", label: "Maintenance" },
];

export default function StaffBoxes() {
  const [tab, setTab] = useState("all");
  const [showFloat, setShowFloat] = useState(true);

  return (
    <main className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-white">
      <header className="shrink-0 border-b border-primary/10 bg-white p-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                <span className="material-symbols-outlined text-sm">location_on</span>
                San Francisco, CA
              </div>
              <h2 className="text-3xl font-black tracking-tight text-slate-900">Downtown Hub</h2>
              <p className="text-sm text-slate-500">
                Monitor and manage 24 sleepbox units across 2 floors.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold transition-colors hover:bg-slate-50"
              >
                <span className="material-symbols-outlined text-sm">tune</span>
                Advanced Filters
              </button>
              <button
                type="button"
                className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                <span className="material-symbols-outlined text-sm">add</span>
                New Unit
              </button>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-5">
            <div className="rounded-xl border border-primary/10 bg-white p-4 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Units</p>
              <p className="mt-1 text-2xl font-black text-slate-900">24</p>
            </div>
            <div className="rounded-xl border border-emerald-100 bg-emerald-50/30 p-4 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Available</p>
              <p className="mt-1 text-2xl font-black text-emerald-700">10</p>
            </div>
            <div className="rounded-xl border border-blue-100 bg-blue-50/30 p-4 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-wider text-blue-600">Occupied</p>
              <p className="mt-1 text-2xl font-black text-blue-700">08</p>
            </div>
            <div className="rounded-xl border border-amber-100 bg-amber-50/30 p-4 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-wider text-amber-600">Cleaning</p>
              <p className="mt-1 text-2xl font-black text-amber-700">04</p>
            </div>
            <div className="rounded-xl border border-rose-100 bg-rose-50/30 p-4 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-wider text-rose-600">Out of Order</p>
              <p className="mt-1 text-2xl font-black text-rose-700">02</p>
            </div>
          </div>
        </div>
      </header>

      <div className="relative min-h-0 flex-1 overflow-y-auto bg-background-light p-6">
        <div className="mx-auto max-w-7xl pb-28">
          <div className="mb-6 flex items-center gap-1 overflow-x-auto border-b border-slate-200">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`shrink-0 px-4 py-3 text-sm font-bold transition-colors ${
                  tab === t.id
                    ? "border-b-2 border-primary text-primary"
                    : "border-b-2 border-transparent font-medium text-slate-500 hover:text-slate-700"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {/* Occupied A-01 */}
            <div className="relative overflow-hidden rounded-xl border border-blue-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
              <div className="absolute right-0 top-0 p-2 opacity-10">
                <span className="material-symbols-outlined text-4xl text-blue-500">person</span>
              </div>
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="font-black text-lg text-slate-900">A-01</h3>
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold uppercase text-blue-700">
                    Occupied
                  </span>
                </div>
                <span className="material-symbols-outlined text-slate-300">more_vert</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Checkout</span>
                  <span className="font-bold">Today, 11:30 AM</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Guest</span>
                  <span className="font-bold">Sarah Jenkins</span>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 border-t border-slate-100 pt-4">
                <button type="button" className="rounded-lg bg-slate-50 py-2 text-[11px] font-bold hover:bg-slate-100">
                  VIEW GUEST
                </button>
                <button type="button" className="rounded-lg bg-slate-50 py-2 text-[11px] font-bold hover:bg-slate-100">
                  EXTEND
                </button>
              </div>
            </div>

            {/* Cleaning A-02 */}
            <div className="relative overflow-hidden rounded-xl border border-amber-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
              <div className="absolute right-0 top-0 p-2 opacity-10">
                <span className="material-symbols-outlined text-4xl text-amber-500">mop</span>
              </div>
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="font-black text-lg text-slate-900">A-02</h3>
                  <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase text-amber-700">
                    Cleaning
                  </span>
                </div>
                <span className="material-symbols-outlined text-slate-300">more_vert</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Started</span>
                  <span className="font-bold">12 mins ago</span>
                </div>
                <div className="mt-2 h-1.5 w-full rounded-full bg-slate-100">
                  <div className="h-1.5 w-[65%] rounded-full bg-amber-500" />
                </div>
              </div>
              <div className="mt-4 border-t border-slate-100 pt-4">
                <button type="button" className="w-full rounded-lg bg-emerald-600 py-2 text-[11px] font-bold text-white hover:bg-emerald-700">
                  MARK AS READY
                </button>
              </div>
            </div>

            {/* Available A-03 */}
            <div className="relative overflow-hidden rounded-xl border border-emerald-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
              <div className="absolute right-0 top-0 p-2 opacity-10">
                <span className="material-symbols-outlined text-4xl text-emerald-500">check_circle</span>
              </div>
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="font-black text-lg text-slate-900">A-03</h3>
                  <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">
                    Available
                  </span>
                </div>
                <span className="material-symbols-outlined text-slate-300">more_vert</span>
              </div>
              <p className="text-xs text-slate-500">Ready for next guest since 8:15 AM</p>
              <div className="mt-4 grid grid-cols-2 gap-2 border-t border-slate-100 pt-4">
                <button type="button" className="rounded-lg bg-primary py-2 text-[11px] font-bold text-white hover:opacity-90">
                  CHECK-IN
                </button>
                <button type="button" className="rounded-lg bg-slate-50 py-2 text-[11px] font-bold hover:bg-slate-100">
                  BLOCK
                </button>
              </div>
            </div>

            {/* Maintenance B-05 */}
            <div className="relative overflow-hidden rounded-xl border border-rose-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
              <div className="absolute right-0 top-0 p-2 opacity-10">
                <span className="material-symbols-outlined text-4xl text-rose-500">build</span>
              </div>
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="font-black text-lg text-slate-900">B-05</h3>
                  <span className="inline-flex items-center rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-bold uppercase text-rose-700">
                    Maintenance
                  </span>
                </div>
                <span className="material-symbols-outlined text-slate-300">more_vert</span>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-rose-600">AC Unit Failure</p>
                <p className="text-xs text-slate-500">Technician scheduled for 2:00 PM</p>
              </div>
              <div className="mt-4 border-t border-slate-100 pt-4">
                <button type="button" className="w-full rounded-lg bg-slate-50 py-2 text-[11px] font-bold hover:bg-slate-100">
                  UPDATE STATUS
                </button>
              </div>
            </div>

            {/* Needs cleaning C-12 */}
            <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
              <div className="absolute right-0 top-0 p-2 opacity-10">
                <span className="material-symbols-outlined text-4xl text-slate-500">notification_important</span>
              </div>
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="font-black text-lg text-slate-900">C-12</h3>
                  <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase text-slate-600">
                    Needs Cleaning
                  </span>
                </div>
                <span className="material-symbols-outlined text-slate-300">more_vert</span>
              </div>
              <p className="text-xs text-slate-500">Checked out 5 mins ago</p>
              <div className="mt-4 grid grid-cols-2 gap-2 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  className="flex items-center justify-center gap-1 rounded-lg bg-primary py-2 text-[11px] font-bold text-white hover:opacity-90"
                >
                  <span className="material-symbols-outlined text-[14px]">play_arrow</span> START
                </button>
                <button type="button" className="rounded-lg bg-slate-50 py-2 text-[11px] font-bold hover:bg-slate-100">
                  REPORT ISSUE
                </button>
              </div>
            </div>

            {/* Occupied Late A-08 */}
            <div className="relative overflow-hidden rounded-xl border border-blue-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
              <div className="absolute -right-2 -top-2 flex h-16 w-16 items-end justify-center bg-rose-500 pb-1 [transform:rotate(45deg)]">
                <span className="text-[8px] font-black uppercase text-white [-webkit-transform:rotate(-45deg)] [transform:rotate(-45deg)]">
                  LATE
                </span>
              </div>
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="font-black text-lg text-slate-900">A-08</h3>
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold uppercase text-blue-700">
                    Occupied
                  </span>
                </div>
                <span className="material-symbols-outlined text-slate-300">more_vert</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-rose-600">
                  <span>Late Checkout</span>
                  <span>+15 mins</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Guest</span>
                  <span className="font-bold">Marcus Thorne</span>
                </div>
              </div>
              <div className="mt-4 border-t border-slate-100 pt-4">
                <button type="button" className="w-full rounded-lg bg-rose-600 py-2 text-[11px] font-bold text-white hover:bg-rose-700">
                  NOTIFY GUEST
                </button>
              </div>
            </div>

            {/* Placeholder B-01 B-02 */}
            {["B-01", "B-02"].map((id) => (
              <div
                key={id}
                className="rounded-xl border border-emerald-100 bg-white p-4 opacity-60 shadow-sm"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h3 className="font-black text-lg text-slate-900">{id}</h3>
                    <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">
                      Available
                    </span>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2 border-t border-slate-100 pt-4">
                  <div className="h-8 rounded bg-slate-100" />
                  <div className="h-8 rounded bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {showFloat && (
          <div className="pointer-events-none fixed bottom-6 left-1/2 z-20 flex w-full max-w-2xl -translate-x-1/2 justify-center px-4">
            <div className="pointer-events-auto flex w-full items-center gap-4 rounded-2xl border border-primary/20 border-b-4 border-b-primary bg-white p-4 shadow-2xl">
              <div className="flex items-center gap-3 border-r border-slate-100 pr-6">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 font-black text-primary">
                  A-01
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-slate-400">Selected</p>
                  <p className="text-sm font-bold text-slate-900">Occupied - Sarah J.</p>
                </div>
              </div>
              <div className="flex flex-1 flex-wrap gap-2">
                <button
                  type="button"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-xs font-bold text-white hover:bg-primary/90"
                >
                  <span className="material-symbols-outlined text-sm">visibility</span>
                  View Details
                </button>
                <button
                  type="button"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-xs font-bold hover:bg-slate-50"
                >
                  <span className="material-symbols-outlined text-sm">mail</span>
                  Message Guest
                </button>
                <button
                  type="button"
                  className="rounded-xl bg-rose-50 px-3 py-2.5 text-rose-600 transition-colors hover:bg-rose-100"
                  aria-label="Warning"
                >
                  <span className="material-symbols-outlined text-sm">warning</span>
                </button>
              </div>
              <button
                type="button"
                onClick={() => setShowFloat(false)}
                className="text-slate-400 hover:text-slate-600"
                aria-label="Close"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
