import React from "react";
import { Link } from "react-router-dom";

/**
 * Nội dung chính theo stitch: boxhub_staff_dashboard/code.html
 * (bỏ header toàn cục BoxHub + nav ngang — đã có StaffLayout sidebar).
 */
export default function StaffDashboard() {
  return (
    <main className="flex min-w-0 flex-1 flex-col bg-background-light pb-24 lg:pb-8">
      <div className="mx-auto w-full max-w-screen-2xl flex-1 px-6 py-8 lg:px-10">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900">Operational Dashboard</h1>
            <p className="font-medium text-slate-500">
              Facility: <span className="text-primary">Downtown Hub - San Francisco</span> | Today: Oct 24, 2023
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-lg bg-green-100 px-3 py-1.5 text-sm font-bold text-green-700">
              <span className="size-2 animate-pulse rounded-full bg-green-500" />
              System Live
            </div>
            <button
              type="button"
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90"
            >
              <span className="material-symbols-outlined text-sm">refresh</span>
              Sync Data
            </button>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: "login", delta: "+20%", deltaClass: "text-green-600", label: "Total Check-ins", value: "12" },
            { icon: "logout", delta: "Stable", deltaClass: "text-slate-400", label: "Check-outs", value: "08" },
            { icon: "cleaning_services", delta: "-15%", deltaClass: "text-red-500", label: "Cleaning Tasks", value: "05" },
            { icon: "report_problem", delta: "+100%", deltaClass: "text-red-600", label: "Active Issues", value: "02" },
          ].map((c) => (
            <div
              key={c.label}
              className="flex flex-col gap-2 rounded-xl border border-primary/10 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <span className="rounded-lg bg-primary/10 p-2 text-primary">
                  <span className="material-symbols-outlined">{c.icon}</span>
                </span>
                <span className={`text-xs font-bold ${c.deltaClass}`}>{c.delta}</span>
              </div>
              <p className="text-sm font-medium text-slate-500">{c.label}</p>
              <p className="text-3xl font-bold text-slate-900">{c.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <section>
              <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-slate-900">
                <span className="material-symbols-outlined">bolt</span> Quick Actions
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex flex-col justify-between rounded-xl bg-primary p-6 text-white shadow-lg">
                  <div>
                    <h3 className="mb-2 text-lg font-bold">Guest Check-In</h3>
                    <p className="mb-6 text-sm opacity-80">Verify guest ID or scan QR code to activate sleepbox.</p>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      to="/staff/check-in-out"
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-white py-2 text-sm font-bold text-primary"
                    >
                      <span className="material-symbols-outlined text-sm">qr_code_scanner</span>
                      Scan QR
                    </Link>
                    <button
                      type="button"
                      className="flex-1 rounded-lg border border-white/20 py-2 text-sm font-bold text-white"
                    >
                      Enter ID
                    </button>
                  </div>
                </div>
                <div className="flex flex-col justify-between rounded-xl border border-primary/10 bg-white p-6 shadow-sm">
                  <div>
                    <h3 className="mb-2 text-lg font-bold text-slate-900">New Issue Report</h3>
                    <p className="mb-6 text-sm text-slate-500">
                      Found a problem with a box? Report it to maintenance immediately.
                    </p>
                  </div>
                  <Link
                    to="/staff/issues"
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-100 py-2 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-200"
                  >
                    <span className="material-symbols-outlined text-sm">add_circle</span>
                    Log Incident
                  </Link>
                </div>
              </div>
            </section>

            <section>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
                  <span className="material-symbols-outlined">assignment</span> Duty List
                </h2>
                <button type="button" className="text-sm font-bold text-primary">
                  View all tasks
                </button>
              </div>
              <div className="overflow-hidden rounded-xl border border-primary/10 bg-white shadow-sm">
                <div className="flex gap-4 overflow-x-auto whitespace-nowrap border-b border-primary/5 p-4">
                  <button type="button" className="rounded-full bg-primary px-4 py-1.5 text-xs font-bold text-white">
                    Cleaning (3)
                  </button>
                  <button type="button" className="rounded-full bg-slate-100 px-4 py-1.5 text-xs font-bold text-slate-600">
                    Maintenance (1)
                  </button>
                  <button type="button" className="rounded-full bg-slate-100 px-4 py-1.5 text-xs font-bold text-slate-600">
                    Support (1)
                  </button>
                </div>
                <div className="divide-y divide-primary/5">
                  {[
                    { box: "Box A-02", sub: "Premium Pod", desc: "Needs Cleaning • Priority: High", icon: "cleaning_services", iconBg: "bg-orange-100 text-orange-600", action: "Start" },
                    { box: "Box B-05", sub: "Standard Pod", desc: "Needs Cleaning • Priority: Medium", icon: "cleaning_services", iconBg: "bg-orange-100 text-orange-600", action: "Start" },
                    { box: "Box C-01", sub: "Suite", desc: "Door Lock Issue • Assigned to: Tech Support", icon: "build", iconBg: "bg-red-100 text-red-600", action: "progress" },
                  ].map((row) => (
                    <div
                      key={row.box}
                      className="flex items-center justify-between p-4 transition-colors hover:bg-slate-50"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`flex size-10 items-center justify-center rounded-lg ${row.iconBg}`}>
                          <span className="material-symbols-outlined">{row.icon}</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900">
                            {row.box} <span className="font-normal text-slate-400">| {row.sub}</span>
                          </h4>
                          <p className="text-xs text-slate-500">{row.desc}</p>
                        </div>
                      </div>
                      {row.action === "progress" ? (
                        <span className="px-3 text-xs font-bold text-slate-400">In Progress</span>
                      ) : (
                        <button
                          type="button"
                          className="rounded-lg border border-primary/10 bg-primary/5 px-4 py-1.5 text-xs font-bold text-primary"
                        >
                          {row.action}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
                <span className="material-symbols-outlined">history</span> Arrivals Next Hour
              </h2>
              <div className="overflow-hidden rounded-xl border border-primary/10 bg-white shadow-sm">
                <div className="space-y-4 p-4">
                  {[
                    { time: "14:15 PM", name: "Elena Rodriguez", book: "#BH-9923 | Box A-09", badge: "PRE-PAID", dot: "bg-primary" },
                    { time: "14:45 PM", name: "James Chen", book: "#BH-9925 | Box B-12", badge: null, dot: "bg-primary/40" },
                    { time: "15:00 PM", name: "Sarah Miller", book: "#BH-9930 | Box A-04", badge: null, dot: "bg-primary/20" },
                  ].map((a, i, arr) => (
                    <div
                      key={a.name}
                      className={`relative ml-2 flex gap-4 border-l-2 border-primary/10 pl-4 ${i < arr.length - 1 ? "pb-4" : ""}`}
                    >
                      <div className={`absolute -left-[9px] top-0 size-4 rounded-full border-4 border-white ${a.dot}`} />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <p className="text-xs font-bold text-primary">{a.time}</p>
                          {a.badge && (
                            <span className="rounded bg-primary/5 px-2 py-0.5 text-[10px] font-bold text-primary">
                              {a.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-sm font-bold text-slate-900">{a.name}</p>
                        <p className="text-xs text-slate-500">Booking: {a.book}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section>
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
                <span className="material-symbols-outlined">campaign</span> Host Notes
              </h2>
              <div className="rounded-xl border border-primary/10 bg-primary/5 p-4">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex size-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                    H
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Marcus (Host)</p>
                    <p className="text-[10px] text-slate-500">Today, 08:30 AM</p>
                  </div>
                </div>
                <div className="rounded-lg bg-white p-3 shadow-sm">
                  <p className="text-sm italic leading-relaxed text-slate-700">
                    &quot;Airport construction detour starting at 4 PM might cause late arrivals. Please be flexible
                    with check-in windows today. Also, check Box C-01 door lock.&quot;
                  </p>
                </div>
                <button type="button" className="mt-4 w-full text-center text-xs font-bold text-primary hover:underline">
                  Acknowledge Note
                </button>
              </div>
            </section>

            <section>
              <div className="group relative h-40 overflow-hidden rounded-xl">
                <img
                  alt="Local area map"
                  className="h-full w-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFhbG5xaRv5Sz_u8AUS5KEc3uoPISslw8pNMfSmPV7rXIs1V56QG3FdJ8r_fq5gj3cWWrq4EXBXn8vLFctPxYrZCkOfZ_2BLBy_y9OuGBxv8OgjYjODBoNs2LmjkjuRlGEoH52zXBp0hT87YSZPbV1LfwCdYU7Wf8KPUUhX8IH3WGI7_rI923a8IR_PadnCJxyi1gQNDUgdC49EbytvYJdqUeLUokQNZaRFrbA38WCHZDJ38mEGeMtJuVgSAgMZCGIal5xzAMzmKj_"
                />
                <div className="absolute inset-0 bg-primary/20 transition-colors group-hover:bg-primary/10" />
                <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-lg bg-white p-2 shadow-md">
                  <span className="material-symbols-outlined text-sm text-primary">location_on</span>
                  <span className="text-[10px] font-bold">Downtown Hub Layout</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-30 flex justify-between border-t border-primary/10 bg-white px-6 py-3 lg:hidden">
        {[
          { icon: "dashboard", label: "Home", active: true },
          { icon: "assignment", label: "Tasks", active: false },
          { icon: "qr_code_scanner", label: "Check-in", active: false },
          { icon: "cleaning_services", label: "Cleaning", active: false },
          { icon: "report_problem", label: "Issues", active: false },
        ].map((m) => (
          <button key={m.label} type="button" className={`flex flex-col items-center gap-1 ${m.active ? "text-primary" : "text-slate-400"}`}>
            <span className="material-symbols-outlined">{m.icon}</span>
            <span className="text-[10px] font-bold">{m.label}</span>
          </button>
        ))}
      </div>
    </main>
  );
}
