import React from "react";

const profileImg =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBBkEzxYcTsDjqx8vwewm8PrsVYOp5NX-bCBE4pN83XJxTYVqVhg58HT-SKOSxbXc1_LJfBiuwCff3Lcv5g3T9-62HfF4kKsUKtruAJhSmHClLAtZzbiKkJK4VFYHExLNVM72bLGRdYZKyO_dC6KWJwgyPuCyyLjqD8oXzn3yOghFW-CTI6_MKD2CNWA0_faMllKj93CYSeyGG3NPJRRlr7V9oCR20siyXq_7h_9PTQ1zaUp_4d64wQVto7BnQMnTGX3tyvQE0qTeou";

export default function HostCalendar() {
  return (
    <main className="flex min-h-screen min-w-0 flex-1 flex-col overflow-hidden">
      <header className="z-10 flex h-16 shrink-0 items-center justify-between border-b border-primary/10 bg-white px-8">
        <div className="flex items-center gap-4">
          <div className="relative">
            <select className="appearance-none rounded-lg border-none bg-primary/5 px-4 py-2 pr-10 text-sm font-semibold text-primary focus:ring-2 focus:ring-primary/20">
              <option>ZenPod - Terminal 3</option>
              <option>ZenPod - Gate A12</option>
              <option>BoxHub Storage - London</option>
            </select>
            <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-primary">
              expand_more
            </span>
          </div>
          <div className="mx-2 h-6 w-px bg-primary/10" />
          <div className="flex items-center gap-2">
            <button type="button" className="rounded p-1 hover:bg-primary/10">
              <span className="material-symbols-outlined text-xl">chevron_left</span>
            </button>
            <h2 className="min-w-[140px] text-center text-lg font-bold">October 2023</h2>
            <button type="button" className="rounded p-1 hover:bg-primary/10">
              <span className="material-symbols-outlined text-xl">chevron_right</span>
            </button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg border border-primary/10 px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-primary/5"
          >
            <span className="material-symbols-outlined text-lg">sync</span>
            Đồng bộ
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg border border-primary/10 px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-primary/5"
          >
            <span className="material-symbols-outlined text-lg">download</span>
            Xuất
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90"
          >
            <span className="material-symbols-outlined text-lg">block</span>
            Chặn ngày
          </button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-8">
          <div className="overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-sm">
            <div className="grid grid-cols-7 border-b border-primary/10 bg-primary/5">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <div key={d} className="py-3 text-center text-xs font-bold uppercase tracking-wider text-slate-500">
                  {d}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 grid-rows-5">
              {/* Week 1 */}
              <div className="group relative h-32 border-b border-r border-primary/10 p-2 transition-colors hover:bg-primary/5">
                <span className="text-sm font-medium text-slate-400">27</span>
              </div>
              <div className="group relative h-32 border-b border-r border-primary/10 p-2 transition-colors hover:bg-primary/5">
                <span className="text-sm font-medium text-slate-400">28</span>
              </div>
              <div className="group relative h-32 border-b border-r border-primary/10 p-2 transition-colors hover:bg-primary/5">
                <span className="text-sm font-medium text-slate-400">29</span>
              </div>
              <div className="group relative h-32 border-b border-r border-primary/10 p-2 transition-colors hover:bg-primary/5">
                <span className="text-sm font-medium text-slate-400">30</span>
              </div>
              <div className="group relative h-32 border-b border-r border-primary/10 p-2 transition-colors hover:bg-primary/5">
                <span className="text-sm font-medium">1</span>
                <div className="mt-2 rounded border border-slate-200 bg-slate-100 p-1.5 text-[10px] font-bold text-slate-500">
                  Maintenance
                </div>
              </div>
              <div className="group relative h-32 border-b border-r border-primary/10 p-2 transition-colors hover:bg-primary/5">
                <span className="text-sm font-medium">2</span>
                <div className="mt-2 rounded border border-primary/20 bg-primary/10 p-1.5 text-[10px] font-bold text-primary">
                  Blocked
                </div>
              </div>
              <div className="group relative h-32 border-b border-primary/10 p-2 transition-colors hover:bg-primary/5">
                <span className="text-sm font-medium">3</span>
              </div>
              {/* Week 2 */}
              <div className="group relative h-32 border-b border-r border-primary/10 p-2 transition-colors hover:bg-primary/5">
                <span className="text-sm font-medium">4</span>
              </div>
              <div className="group relative h-32 border-b border-r border-primary/10 p-2 transition-colors hover:bg-primary/5">
                <span className="text-sm font-medium">5</span>
                <div className="absolute inset-x-0 top-10 z-10 mx-2">
                  <div className="group/tooltip relative rounded-lg bg-primary p-2 text-[11px] font-medium text-white shadow-md">
                    John Smith
                    <div className="absolute left-0 top-full z-50 mt-1 hidden w-48 rounded-xl border border-primary/10 bg-white p-3 text-slate-900 shadow-2xl group-hover/tooltip:block">
                      <p className="font-bold">John Smith</p>
                      <p className="text-[10px] opacity-70">Oct 5 - Oct 8 (3 Nights)</p>
                      <p className="mt-2 text-[10px] font-bold text-primary">ZenPod Deluxe</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="group relative h-32 border-b border-r border-primary/10 p-2 transition-colors hover:bg-primary/5">
                <span className="text-sm font-medium">6</span>
                <div className="absolute inset-x-0 top-10 z-10 -mx-px h-8 bg-primary opacity-80" />
              </div>
              <div className="group relative h-32 border-b border-r border-primary/10 p-2 transition-colors hover:bg-primary/5">
                <span className="text-sm font-medium">7</span>
                <div className="absolute inset-x-0 top-10 z-10 -mx-px h-8 bg-primary opacity-80" />
              </div>
              <div className="group relative h-32 border-b border-r border-primary/10 p-2 transition-colors hover:bg-primary/5">
                <span className="text-sm font-medium">8</span>
                <div className="absolute left-0 right-2 top-10 z-10 h-8 rounded-r-lg bg-primary opacity-80" />
              </div>
              <div className="group relative h-32 border-b border-r border-primary/10 p-2 transition-colors hover:bg-primary/5">
                <span className="text-sm font-medium">9</span>
              </div>
              <div className="group relative h-32 border-b border-primary/10 p-2 transition-colors hover:bg-primary/5">
                <span className="text-sm font-medium">10</span>
              </div>
              {/* Week 3 */}
              <div className="group relative h-32 border-b border-r border-primary/10 p-2 transition-colors hover:bg-primary/5">
                <span className="text-sm font-medium">11</span>
              </div>
              <div className="group relative h-32 border-b border-r border-primary/10 p-2 transition-colors hover:bg-primary/5">
                <span className="text-sm font-medium">12</span>
                <div className="mt-2 rounded border border-primary/20 bg-primary/10 p-1.5 text-[10px] font-bold text-primary">
                  Blocked
                </div>
              </div>
              <div className="group relative h-32 border-b border-r border-primary/10 p-2 transition-colors hover:bg-primary/5">
                <span className="text-sm font-medium">13</span>
              </div>
              <div className="group relative h-32 border-b border-r border-primary/10 p-2 transition-colors hover:bg-primary/5">
                <span className="text-sm font-medium">14</span>
              </div>
              <div className="group relative h-32 border-b border-r border-primary/10 p-2 transition-colors hover:bg-primary/5">
                <span className="text-sm font-medium">15</span>
                <div className="absolute inset-x-0 top-10 z-10 mx-2">
                  <div className="rounded-lg bg-primary p-2 text-[11px] font-medium text-white shadow-md">Sarah J.</div>
                </div>
              </div>
              <div className="group relative h-32 border-b border-r border-primary/10 p-2 transition-colors hover:bg-primary/5">
                <span className="text-sm font-medium">16</span>
                <div className="absolute left-0 right-2 top-10 z-10 h-8 rounded-r-lg bg-primary opacity-80" />
              </div>
              <div className="group relative h-32 border-b border-primary/10 p-2 transition-colors hover:bg-primary/5">
                <span className="text-sm font-medium">17</span>
              </div>
              {/* Week 4 */}
              <div className="group relative h-32 border-b border-r border-primary/10 p-2 transition-colors hover:bg-primary/5">
                <span className="text-sm font-medium">18</span>
              </div>
              <div className="group relative h-32 border-b border-r border-primary/10 p-2 transition-colors hover:bg-primary/5">
                <span className="text-sm font-medium">19</span>
              </div>
              <div className="group relative h-32 border-b border-r border-primary/10 p-2 transition-colors hover:bg-primary/5">
                <span className="text-sm font-medium">20</span>
                <div className="absolute inset-x-0 top-10 z-10 mx-2">
                  <div className="rounded-lg bg-primary p-2 text-[11px] font-medium text-white shadow-md">Mark Ruffalo</div>
                </div>
              </div>
              <div className="group relative h-32 border-b border-r border-primary/10 p-2 transition-colors hover:bg-primary/5">
                <span className="text-sm font-medium">21</span>
                <div className="absolute left-0 right-2 top-10 z-10 h-8 rounded-r-lg bg-primary opacity-80" />
              </div>
              <div className="group relative h-32 border-b border-r border-primary/10 p-2 transition-colors hover:bg-primary/5">
                <span className="text-sm font-medium">22</span>
              </div>
              <div className="group relative h-32 border-b border-r border-primary/10 p-2 transition-colors hover:bg-primary/5">
                <span className="text-sm font-medium">23</span>
              </div>
              <div className="group relative h-32 border-b border-primary/10 p-2 transition-colors hover:bg-primary/5">
                <span className="text-sm font-bold text-primary">Today</span>
                <div className="absolute right-1 top-1 size-2 rounded-full bg-primary" />
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-8">
            <div className="flex items-center gap-2">
              <div className="size-4 rounded bg-primary" />
              <span className="text-xs font-semibold text-slate-500">Confirmed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-4 rounded border border-slate-200 bg-slate-100" />
              <span className="text-xs font-semibold text-slate-500">Maintenance</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-4 rounded border border-primary/20 bg-primary/10" />
              <span className="text-xs font-semibold text-slate-500">Blocked / Not Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-4 rounded border border-primary/10 bg-white" />
              <span className="text-xs font-semibold text-slate-500">Available</span>
            </div>
          </div>
        </div>

        <aside className="w-80 shrink-0 overflow-y-auto border-l border-primary/10 bg-white p-6">
          <div className="mb-4 flex items-center gap-3 rounded-xl bg-primary/5 p-2">
            <img src={profileImg} alt="" className="size-10 rounded-full border-2 border-primary/20 object-cover" />
            <div className="min-w-0">
              <p className="truncate text-sm font-bold">Alex Host</p>
              <p className="truncate text-xs text-slate-500">Superhost</p>
            </div>
          </div>
          <h3 className="mb-6 text-lg font-bold">October Highlights</h3>
          <div className="space-y-6">
            <div className="rounded-2xl border border-primary/10 bg-primary/5 p-6">
              <p className="mb-1 text-sm font-medium text-slate-500">Occupancy Rate</p>
              <div className="flex items-end gap-2">
                <h4 className="text-3xl font-bold leading-none text-primary">84%</h4>
                <span className="flex items-center pb-0.5 text-sm font-bold text-emerald-500">
                  <span className="material-symbols-outlined text-sm">trending_up</span> 5.2%
                </span>
              </div>
              <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-primary/10">
                <div className="h-full w-[84%] bg-primary" />
              </div>
            </div>
            <div className="rounded-2xl border border-primary/10 bg-primary/5 p-6">
              <p className="mb-1 text-sm font-medium text-slate-500">Total Revenue</p>
              <div className="flex items-end gap-2">
                <h4 className="text-3xl font-bold leading-none text-primary">£12,450</h4>
                <span className="flex items-center pb-0.5 text-sm font-bold text-emerald-500">
                  <span className="material-symbols-outlined text-sm">trending_up</span> 12%
                </span>
              </div>
              <p className="mt-3 text-xs italic text-slate-400">Compared to Sept 2023</p>
            </div>
            <div className="rounded-2xl border border-primary/10 bg-primary/5 p-6">
              <p className="mb-1 text-sm font-medium text-slate-500">Most Booked Days</p>
              <h4 className="text-xl font-bold text-primary">Fri, Sat, Sun</h4>
              <p className="mt-2 text-xs text-slate-400">Weekends show 98% occupancy</p>
            </div>
            <div className="rounded-2xl border border-dashed border-primary/20 p-4">
              <h5 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-500">Quick Actions</h5>
              <button
                type="button"
                className="group flex w-full items-center gap-3 rounded-xl p-3 text-left transition-colors hover:bg-primary/5"
              >
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <span className="material-symbols-outlined text-lg">edit_calendar</span>
                </div>
                <div>
                  <p className="text-sm font-bold">Edit Base Rates</p>
                  <p className="text-[10px] text-slate-400">Manage seasonal pricing</p>
                </div>
              </button>
              <button
                type="button"
                className="group mt-2 flex w-full items-center gap-3 rounded-xl p-3 text-left transition-colors hover:bg-primary/5"
              >
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
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
    </main>
  );
}
