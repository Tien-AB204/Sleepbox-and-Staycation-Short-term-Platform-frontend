import React from "react";

export default function HostSleepboxes() {
  return (
    <main className="flex min-h-screen min-w-0 flex-1 flex-col">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-primary/10 bg-white px-8 py-4">
        <div className="flex items-center gap-4">
          <button type="button" className="flex size-10 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-primary/5">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div>
            <h2 className="text-xl font-extrabold tracking-tight text-slate-900">ZenPod - Terminal 3</h2>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span className="material-symbols-outlined text-xs">location_on</span>
              San Francisco Intl Airport (SFO)
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="group relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-lg text-slate-400">
              search
            </span>
            <input
              className="w-64 rounded-xl border-none bg-slate-100 py-2 pl-10 pr-4 text-sm transition-all focus:ring-2 focus:ring-primary"
              placeholder="Search boxes..."
              type="search"
            />
          </div>
          <button
            type="button"
            className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-200"
          >
            <span className="material-symbols-outlined text-sm">file_download</span>
            Export Data
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-opacity hover:opacity-90"
          >
            <span className="material-symbols-outlined text-sm">add_circle</span>
            Add New Box
          </button>
        </div>
      </header>

      <div className="space-y-8 p-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total Boxes", v: "45", sub: "Capacity", subCls: "bg-slate-100 text-slate-600" },
            { label: "Occupied", v: "28", sub: "62%", subCls: "text-blue-600", icon: "trending_up" },
            { label: "Available", v: "12", sub: "Ready", subCls: "text-emerald-600" },
            { label: "Maintenance", v: "5", sub: "Attention", subCls: "text-amber-600" },
          ].map((x) => (
            <div key={x.label} className="rounded-2xl border border-primary/5 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-500">{x.label}</p>
              <div className="mt-2 flex items-end justify-between">
                <span className="text-3xl font-black text-slate-900">{x.v}</span>
                {x.icon ? (
                  <span className={`flex items-center gap-1 text-xs font-bold ${x.subCls}`}>
                    <span className="material-symbols-outlined text-xs">{x.icon}</span> {x.sub}
                  </span>
                ) : (
                  <span className={`rounded px-2 py-1 text-xs font-bold ${x.subCls}`}>{x.sub}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-b border-primary/10">
          <div className="flex gap-8">
            <button type="button" className="relative border-b-2 border-primary pb-4 text-sm font-bold text-primary">
              All Boxes
            </button>
            <button type="button" className="pb-4 text-sm font-bold text-slate-500 transition-colors hover:text-primary">
              Available (12)
            </button>
            <button type="button" className="pb-4 text-sm font-bold text-slate-500 transition-colors hover:text-primary">
              Occupied (28)
            </button>
            <button type="button" className="pb-4 text-sm font-bold text-slate-500 transition-colors hover:text-primary">
              Maintenance (5)
            </button>
          </div>
          <div className="flex items-center gap-4 pb-4">
            <button type="button" className="flex items-center gap-2 text-sm font-medium text-slate-600">
              <span className="material-symbols-outlined text-sm">filter_list</span>
              Filter
            </button>
            <div className="h-4 w-px bg-slate-300" />
            <div className="flex rounded-lg bg-slate-100 p-1">
              <button type="button" className="rounded-md bg-white p-1.5 shadow-sm">
                <span className="material-symbols-outlined text-sm">grid_view</span>
              </button>
              <button type="button" className="p-1.5 text-slate-500">
                <span className="material-symbols-outlined text-sm">view_list</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {/* Box A-01 Occupied */}
          <div className="group rounded-2xl border border-primary/5 bg-white shadow-sm transition-shadow hover:shadow-md">
            <div className="border-b border-primary/5 p-5">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Box A-01</h3>
                  <p className="mt-1 text-xs font-bold uppercase tracking-widest text-slate-400">Single Deluxe</p>
                </div>
                <div className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">
                  Occupied
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                    <span className="material-symbols-outlined text-sm">person</span>
                  </div>
                  <span className="text-sm font-medium text-slate-600">J. Smith</span>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold uppercase text-slate-400">Ends at</p>
                  <p className="text-xs font-bold text-slate-700">2:45 PM Today</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 bg-slate-50/50 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">Visibility</span>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input defaultChecked className="peer sr-only" type="checkbox" />
                  <div className="peer h-5 w-9 rounded-full bg-slate-300 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white" />
                  <span className="ml-2 text-xs font-bold uppercase text-slate-700">Online</span>
                </label>
              </div>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {["edit", "event_busy", "visibility"].map((ic) => (
                  <button
                    key={ic}
                    type="button"
                    className="flex flex-col items-center justify-center gap-1 rounded-xl border border-transparent p-2 text-slate-500 transition-all hover:border-primary/20 hover:bg-white hover:text-primary"
                  >
                    <span className="material-symbols-outlined text-lg">{ic}</span>
                    <span className="text-[10px] font-bold">
                      {ic === "edit" ? "Edit" : ic === "event_busy" ? "Block" : "View"}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Box A-02 Available */}
          <div className="rounded-2xl border border-primary/5 bg-white shadow-sm transition-shadow hover:shadow-md">
            <div className="border-b border-primary/5 p-5">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Box A-02</h3>
                  <p className="mt-1 text-xs font-bold uppercase tracking-widest text-slate-400">Double Premium</p>
                </div>
                <div className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
                  Available
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
                    <span className="material-symbols-outlined text-sm">cleaning_services</span>
                  </div>
                  <span className="text-sm font-medium text-slate-600">Clean &amp; Ready</span>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold uppercase text-slate-400">Rate</p>
                  <p className="text-xs font-bold text-slate-700">$25/hr</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 bg-slate-50/50 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">Visibility</span>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input defaultChecked className="peer sr-only" type="checkbox" />
                  <div className="peer h-5 w-9 rounded-full bg-slate-300 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white" />
                  <span className="ml-2 text-xs font-bold uppercase text-slate-700">Online</span>
                </label>
              </div>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {["edit", "event_busy", "visibility"].map((ic) => (
                  <button
                    key={ic}
                    type="button"
                    className="flex flex-col items-center justify-center gap-1 rounded-xl border border-transparent p-2 text-slate-500 transition-all hover:border-primary/20 hover:bg-white hover:text-primary"
                  >
                    <span className="material-symbols-outlined text-lg">{ic}</span>
                    <span className="text-[10px] font-bold">
                      {ic === "edit" ? "Edit" : ic === "event_busy" ? "Block" : "View"}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Box B-04 Cleaning */}
          <div className="rounded-2xl border border-primary/5 bg-white shadow-sm transition-shadow hover:shadow-md">
            <div className="border-b border-primary/5 p-5">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Box B-04</h3>
                  <p className="mt-1 text-xs font-bold uppercase tracking-widest text-slate-400">Single Deluxe</p>
                </div>
                <div className="rounded-full border border-amber-100 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-600">
                  Cleaning
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-full bg-amber-50 text-amber-500">
                    <span className="material-symbols-outlined text-sm">schedule</span>
                  </div>
                  <span className="text-sm font-medium text-slate-600">15 mins left</span>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold uppercase text-slate-400">Staff</p>
                  <p className="text-xs font-bold text-slate-700">Elena M.</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 bg-slate-50/50 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">Visibility</span>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input className="peer sr-only" type="checkbox" />
                  <div className="peer h-5 w-9 rounded-full bg-slate-300 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white" />
                  <span className="ml-2 text-xs font-bold uppercase text-slate-500">Offline</span>
                </label>
              </div>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {["edit", "event_busy", "visibility"].map((ic) => (
                  <button
                    key={ic}
                    type="button"
                    className="flex flex-col items-center justify-center gap-1 rounded-xl border border-transparent p-2 text-slate-500 transition-all hover:border-primary/20 hover:bg-white hover:text-primary"
                  >
                    <span className="material-symbols-outlined text-lg">{ic}</span>
                    <span className="text-[10px] font-bold">
                      {ic === "edit" ? "Edit" : ic === "event_busy" ? "Block" : "View"}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Box C-12 Maintenance */}
          <div className="rounded-2xl border border-primary/5 bg-white shadow-sm transition-shadow hover:shadow-md">
            <div className="border-b border-primary/5 p-5">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Box C-12</h3>
                  <p className="mt-1 text-xs font-bold uppercase tracking-widest text-slate-400">Single Deluxe</p>
                </div>
                <div className="rounded-full border border-red-100 bg-red-50 px-3 py-1 text-xs font-bold text-red-600">
                  Maintenance
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-full bg-red-50 text-red-500">
                    <span className="material-symbols-outlined text-sm">build</span>
                  </div>
                  <span className="text-sm font-medium text-slate-600">Lock Issue</span>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold uppercase text-slate-400">Reported</p>
                  <p className="text-xs font-bold text-slate-700">2h ago</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 bg-slate-50/50 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">Visibility</span>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input disabled className="peer sr-only" type="checkbox" />
                  <div className="h-5 w-9 cursor-not-allowed rounded-full bg-slate-200 opacity-50" />
                  <span className="ml-2 text-xs font-bold uppercase text-slate-400">Blocked</span>
                </label>
              </div>
              <div className="mt-2 grid grid-cols-3 gap-2">
                <button
                  type="button"
                  className="flex flex-col items-center justify-center gap-1 rounded-xl border border-transparent p-2 text-slate-500 transition-all hover:border-primary/20 hover:bg-white hover:text-primary"
                >
                  <span className="material-symbols-outlined text-lg">edit</span>
                  <span className="text-[10px] font-bold">Edit</span>
                </button>
                <button
                  type="button"
                  className="flex flex-col items-center justify-center gap-1 rounded-xl border border-transparent p-2 text-slate-500 transition-all hover:border-primary/20 hover:bg-white hover:text-primary"
                >
                  <span className="material-symbols-outlined text-lg">history</span>
                  <span className="text-[10px] font-bold">Logs</span>
                </button>
                <button
                  type="button"
                  className="flex flex-col items-center justify-center gap-1 rounded-xl border border-primary/10 bg-primary/5 p-2 font-bold text-primary"
                >
                  <span className="material-symbols-outlined text-lg">task_alt</span>
                  <span className="text-[10px] font-bold">Resolve</span>
                </button>
              </div>
            </div>
          </div>

          <div className="group flex cursor-pointer items-center justify-center rounded-2xl border border-dashed border-primary/20 bg-white/40 p-12 transition-all hover:bg-white">
            <div className="flex flex-col items-center gap-2">
              <div className="flex size-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                <span className="material-symbols-outlined text-3xl">add</span>
              </div>
              <p className="text-sm font-bold text-slate-400 transition-colors group-hover:text-primary">Quick Add Box</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
