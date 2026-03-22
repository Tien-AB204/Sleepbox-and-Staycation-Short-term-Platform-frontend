import React from "react";

export default function HostDisputes() {
  return (
    <main className="flex min-h-screen min-w-0 flex-1 flex-col overflow-hidden">
      <header className="z-10 flex h-16 shrink-0 items-center justify-between border-b border-primary/10 bg-white px-8">
        <h2 className="text-xl font-bold text-slate-900">Quản lý tranh chấp</h2>
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-xl text-slate-400">
              search
            </span>
            <input
              className="w-64 rounded-xl border-none bg-background-light py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20"
              placeholder="Tìm tranh chấp..."
              type="search"
            />
          </div>
          <button
            type="button"
            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90"
          >
            <span className="material-symbols-outlined text-lg">add_circle</span>
            Báo cáo sự cố
          </button>
          <button type="button" className="relative rounded-full p-2 text-slate-500 hover:bg-primary/5">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute right-2 top-2 size-2 rounded-full border-2 border-white bg-red-500" />
          </button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 overflow-hidden">
        <div className="host-custom-scrollbar flex-1 overflow-y-auto p-8">
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { l: "Đang xử lý", v: "12", b: "+2 today", bc: "text-red-500 bg-red-50" },
              { l: "Đã xử lý (tháng)", v: "48", b: "↑ 12%", bc: "text-green-500 bg-green-50" },
              { l: "Thời gian xử lý TB", v: "2.4 Days", b: "-0.5d", bc: "text-slate-400 bg-slate-50" },
              { l: "Hoàn tiền chờ", v: "$1,240", b: "3 awaiting", bc: "text-amber-500 bg-amber-50" },
            ].map((s) => (
              <div key={s.l} className="rounded-xl border border-primary/5 bg-white p-6 shadow-sm">
                <p className="mb-1 text-sm font-medium text-slate-500">{s.l}</p>
                <div className="flex items-end justify-between">
                  <h3 className="text-3xl font-bold text-primary">{s.v}</h3>
                  <span className={`rounded-full px-2 py-1 text-xs font-bold ${s.bc}`}>{s.b}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="overflow-hidden rounded-xl border border-primary/5 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-primary/5 p-6">
              <h4 className="text-lg font-bold">Danh sách sự cố</h4>
              <div className="flex gap-2">
                <button type="button" className="rounded-lg border border-primary/10 p-2 hover:bg-primary/5">
                  <span className="material-symbols-outlined text-xl">filter_list</span>
                </button>
                <button type="button" className="rounded-lg border border-primary/10 p-2 hover:bg-primary/5">
                  <span className="material-symbols-outlined text-xl">download</span>
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">ID</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Khách</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Cơ sở</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Loại</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Mức độ</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Trạng thái</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Ngày</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/5">
                  {[
                    {
                      id: "#DIS-8921",
                      g: "Alex Johnson",
                      p: "Unit 4B - Downtown",
                      cat: "Cleanliness",
                      pr: "High",
                      prc: "text-red-600",
                      dot: "bg-red-600",
                      st: "Open",
                      stc: "bg-blue-50 text-blue-600 border-blue-100",
                      d: "Oct 24, 2023",
                    },
                    {
                      id: "#DIS-8918",
                      g: "Maria Garcia",
                      p: "Suite 12 - Seaside",
                      cat: "Payment",
                      pr: "Medium",
                      prc: "text-amber-600",
                      dot: "bg-amber-600",
                      st: "In Progress",
                      stc: "bg-amber-50 text-amber-600 border-amber-100",
                      d: "Oct 22, 2023",
                    },
                    {
                      id: "#DIS-8915",
                      g: "James Smith",
                      p: "Unit 2A - Uptown",
                      cat: "Noise",
                      pr: "Low",
                      prc: "text-slate-500",
                      dot: "bg-slate-500",
                      st: "Resolved",
                      stc: "bg-green-50 text-green-600 border-green-100",
                      d: "Oct 20, 2023",
                    },
                    {
                      id: "#DIS-8910",
                      g: "Linda Chen",
                      p: "Unit 9 - Metro",
                      cat: "Maintenance",
                      pr: "High",
                      prc: "text-red-600",
                      dot: "bg-red-600",
                      st: "Escalated",
                      stc: "bg-red-50 text-red-600 border-red-100",
                      d: "Oct 19, 2023",
                    },
                  ].map((r) => (
                    <tr key={r.id} className="group transition-colors hover:bg-primary/[0.02]">
                      <td className="px-6 py-4 font-medium text-primary">{r.id}</td>
                      <td className="px-6 py-4 font-semibold">{r.g}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{r.p}</td>
                      <td className="px-6 py-4">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{r.cat}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`flex items-center gap-1.5 text-xs font-bold ${r.prc}`}>
                          <span className={`size-2 rounded-full ${r.dot}`} /> {r.pr}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`rounded-full border px-3 py-1 text-xs font-bold ${r.stc}`}>{r.st}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">{r.d}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-3 text-primary">
                          <button type="button" className="hover:text-primary/70" title="View">
                            <span className="material-symbols-outlined text-xl">visibility</span>
                          </button>
                          <button type="button" className="hover:text-primary/70" title="Chat">
                            <span className="material-symbols-outlined text-xl">chat</span>
                          </button>
                          <button type="button" className="hover:text-primary/70" title="Assign">
                            <span className="material-symbols-outlined text-xl">person_add</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <aside className="host-custom-scrollbar flex w-80 shrink-0 flex-col gap-6 overflow-y-auto border-l border-primary/10 bg-white p-6">
          <div>
            <h4 className="mb-4 font-bold text-slate-900">Tiến độ xử lý</h4>
            <div className="space-y-4">
              <div className="relative pt-1">
                <div className="mb-2 flex items-center justify-between">
                  <span className="inline-block text-xs font-semibold text-primary">Weekly Target</span>
                  <span className="inline-block text-right text-xs font-semibold text-primary">85%</span>
                </div>
                <div className="mb-4 flex h-2 overflow-hidden rounded bg-primary/10 text-xs">
                  <div className="flex flex-col justify-center bg-primary text-center text-white" style={{ width: "85%" }} />
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="mb-4 font-bold text-slate-900">Hoạt động gần đây</h4>
            <div className="space-y-6">
              <div className="relative flex gap-4 before:absolute before:bottom-[-24px] before:left-[18px] before:top-10 before:w-px before:bg-primary/10 last:before:hidden">
                <div className="z-10 flex size-9 shrink-0 items-center justify-center rounded-full bg-green-100">
                  <span className="material-symbols-outlined text-lg text-green-600">check_circle</span>
                </div>
                <div>
                  <p className="text-sm font-bold">Issue #DIS-8915 Resolved</p>
                  <p className="mt-0.5 text-xs text-slate-500">James Smith&apos;s noise complaint has been closed by Staff Mark.</p>
                  <p className="mt-1 text-[10px] font-bold uppercase text-slate-400">2 hours ago</p>
                </div>
              </div>
              <div className="relative flex gap-4 before:absolute before:bottom-[-24px] before:left-[18px] before:top-10 before:w-px before:bg-primary/10 last:before:hidden">
                <div className="z-10 flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <span className="material-symbols-outlined text-lg text-primary">mail</span>
                </div>
                <div>
                  <p className="text-sm font-bold">New Message</p>
                  <p className="mt-0.5 text-xs text-slate-500">Alex Johnson sent a message regarding #DIS-8921.</p>
                  <p className="mt-1 text-[10px] font-bold uppercase text-slate-400">5 hours ago</p>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="mt-6 w-full rounded-xl border border-primary/20 py-2 text-sm font-bold text-primary transition-colors hover:bg-primary/5"
            >
              View All History
            </button>
          </div>
          <div className="mt-auto rounded-2xl bg-primary/5 p-4">
            <div className="mb-2 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">lightbulb</span>
              <h5 className="text-sm font-bold">Host Tip</h5>
            </div>
            <p className="text-xs leading-relaxed text-slate-600">
              Resolving cleanliness disputes within 4 hours increases guest satisfaction by 40%.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}
