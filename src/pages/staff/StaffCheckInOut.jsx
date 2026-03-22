import React, { useState } from "react";

/**
 * Theo stitch: check_in_check_out_management/code.html
 * (sidebar đã có trong StaffLayout — chỉ phần main + summary + list).
 */
export default function StaffCheckInOut() {
  const [mode, setMode] = useState("arrivals");

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 overflow-y-auto bg-background-light p-4 lg:p-8">
      <div className="rounded-xl border border-primary/10 border-dashed bg-primary/5 px-4 py-3 text-sm text-slate-600 lg:hidden">
        <span className="font-bold text-primary">Main Terminal</span> — Terminal 4 · Zone B
      </div>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="flex flex-col gap-1 rounded-xl border border-primary/10 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Expected Today</p>
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold text-primary">142</p>
            <span className="material-symbols-outlined text-4xl text-primary/30">calendar_today</span>
          </div>
        </div>
        <div className="flex flex-col gap-1 rounded-xl border border-primary/10 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Completed</p>
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold text-green-600">89</p>
            <span className="material-symbols-outlined text-4xl text-green-600/30">check_circle</span>
          </div>
        </div>
        <div className="flex flex-col gap-1 rounded-xl border border-primary/10 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Remaining</p>
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold text-amber-600">53</p>
            <span className="material-symbols-outlined text-4xl text-amber-600/30">pending_actions</span>
          </div>
        </div>
      </section>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 border-b border-primary/10 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-8">
            <button
              type="button"
              onClick={() => setMode("arrivals")}
              className={`border-b-2 pb-3 pt-2 text-sm font-bold tracking-wide transition-colors ${
                mode === "arrivals"
                  ? "border-primary text-primary"
                  : "border-transparent text-slate-500 hover:text-primary"
              }`}
            >
              Arrivals (82)
            </button>
            <button
              type="button"
              onClick={() => setMode("departures")}
              className={`border-b-2 pb-3 pt-2 text-sm font-bold tracking-wide transition-colors ${
                mode === "departures"
                  ? "border-primary text-primary"
                  : "border-transparent text-slate-500 hover:text-primary"
              }`}
            >
              Departures (60)
            </button>
          </div>
          <div className="pb-3 md:w-80 md:pb-0">
            <div className="flex h-10 w-full items-stretch rounded-xl border border-primary/10 bg-white">
              <div className="flex items-center justify-center pl-3 text-slate-400">
                <span className="material-symbols-outlined text-xl">search</span>
              </div>
              <input
                className="w-full border-none bg-transparent text-sm placeholder:text-slate-400 focus:ring-0"
                placeholder="Search name or ID..."
              />
            </div>
          </div>
        </div>
      </div>

      {mode === "arrivals" && (
        <div className="flex flex-col gap-3">
          {[
            { name: "Marcus Sterling", id: "#BKH-8829", box: "A-124", time: "14:30 PM", type: "Executive Pod" },
            { name: "Elena Rodriguez", id: "#BKH-9012", box: "C-045", time: "14:45 PM", type: "Sleep Cube" },
          ].map((r) => (
            <div
              key={r.id}
              className="flex flex-col items-center gap-4 rounded-xl border border-primary/5 bg-white p-4 shadow-sm transition-all hover:border-primary/20 md:flex-row"
            >
              <div className="flex w-full flex-1 items-center gap-4 md:w-auto">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <span className="material-symbols-outlined">person</span>
                </div>
                <div className="flex flex-col">
                  <p className="font-bold text-slate-900">{r.name}</p>
                  <p className="text-xs text-slate-500">ID: {r.id}</p>
                </div>
              </div>
              <div className="grid w-full grid-cols-2 gap-8 text-sm md:flex md:flex-1 md:w-auto">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Box</span>
                  <span className="font-semibold text-primary">{r.box}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Arrival</span>
                  <span className="font-semibold">{r.time}</span>
                </div>
                <div className="hidden flex-col lg:flex">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Type</span>
                  <span className="font-semibold">{r.type}</span>
                </div>
              </div>
              <div className="flex w-full items-center gap-3 md:w-auto">
                <button
                  type="button"
                  className="flex h-10 flex-1 items-center justify-center gap-2 rounded-lg border border-primary px-4 text-sm font-bold text-primary transition-colors hover:bg-primary/5 md:flex-none"
                >
                  <span className="material-symbols-outlined text-xl">qr_code_scanner</span>
                  Scan
                </button>
                <button
                  type="button"
                  className="h-10 flex-1 rounded-lg bg-primary px-6 text-sm font-bold text-white transition-opacity hover:opacity-90 md:flex-none"
                >
                  Check-in
                </button>
              </div>
            </div>
          ))}

          <div className="flex flex-col items-center gap-4 rounded-xl border border-primary/20 bg-primary/5 p-4 opacity-90 md:flex-row">
            <div className="flex w-full flex-1 items-center gap-4 md:w-auto">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                <span className="material-symbols-outlined">check</span>
              </div>
              <div className="flex flex-col">
                <p className="font-bold text-slate-900 line-through">Sarah Jenkins</p>
                <p className="text-xs text-slate-500">ID: #BKH-7721</p>
              </div>
            </div>
            <div className="grid w-full grid-cols-2 gap-8 text-sm md:flex md:flex-1">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Box</span>
                <span className="font-semibold text-primary">B-210</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Status</span>
                <span className="font-semibold text-green-600">Checked In</span>
              </div>
            </div>
            <button type="button" disabled className="h-10 w-full cursor-not-allowed rounded-lg bg-slate-200 px-6 text-sm font-bold text-slate-500 md:w-auto">
              Completed
            </button>
          </div>
        </div>
      )}

      {mode === "departures" && (
        <div className="flex flex-col gap-3">
          <h3 className="mt-2 text-sm font-bold uppercase tracking-widest text-slate-500">Next Departures</h3>
          <div className="flex flex-col items-center gap-4 rounded-xl border border-primary/5 bg-white p-4 shadow-sm md:flex-row">
            <div className="flex w-full flex-1 items-center gap-4 md:w-auto">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                <span className="material-symbols-outlined">logout</span>
              </div>
              <div className="flex flex-col">
                <p className="font-bold text-slate-900">James Wilson</p>
                <p className="text-xs text-slate-500">ID: #BKH-4412</p>
              </div>
            </div>
            <div className="grid w-full grid-cols-2 gap-4 text-sm md:flex md:flex-1 md:gap-8">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Box</span>
                <span className="font-semibold text-primary">A-002</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Stay Duration</span>
                <span className="font-semibold">4h 15m / 4h</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Charges</span>
                <span className="font-semibold text-red-500">$15.00 (Late)</span>
              </div>
            </div>
            <button
              type="button"
              className="h-10 w-full rounded-lg bg-slate-900 px-6 text-sm font-bold text-white hover:opacity-90 md:w-auto"
            >
              Check-out
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
