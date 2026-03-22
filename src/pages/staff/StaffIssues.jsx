import React, { useState } from "react";

/** stitch: b_o_c_o_s_c_staff/code.html */
export default function StaffIssues() {
  const [priority, setPriority] = useState("low");

  return (
    <main className="flex min-w-0 flex-1 flex-col overflow-y-auto bg-background-light p-8">
      <header className="mb-10">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Report an Issue</h2>
        <p className="mt-1 text-slate-500">
          Document facility maintenance, cleaning requirements, or guest disputes.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-xl border border-primary/10 bg-white p-8 shadow-sm">
            <h3 className="mb-6 flex items-center gap-2 text-xl font-bold">
              <span className="material-symbols-outlined text-primary">edit_note</span>
              Issue Details
            </h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700">Select Box or Area</label>
                  <select className="h-12 w-full rounded-lg border border-primary/20 bg-background-light px-4 focus:border-transparent focus:ring-2 focus:ring-primary">
                    <option>Box A-01</option>
                    <option>Box B-12</option>
                    <option>Main Lobby</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700">Category</label>
                  <select className="h-12 w-full rounded-lg border border-primary/20 bg-background-light px-4 focus:border-transparent focus:ring-2 focus:ring-primary">
                    <option>Maintenance</option>
                    <option>Cleaning</option>
                    <option>Guest Dispute</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-sm font-bold text-slate-700">Priority Level</label>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  {[
                    { id: "low", label: "Low", active: "bg-emerald-500 text-white", dot: "bg-emerald-500" },
                    { id: "medium", label: "Medium", active: "bg-blue-500 text-white", dot: "bg-blue-500" },
                    { id: "high", label: "High", active: "bg-amber-500 text-white", dot: "bg-amber-500" },
                    { id: "urgent", label: "Urgent", active: "bg-rose-600 text-white", dot: "bg-rose-600" },
                  ].map((p) => {
                    const on = priority === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPriority(p.id)}
                        className={`flex items-center justify-center gap-2 rounded-lg border border-primary/10 p-3 transition-all ${
                          on ? p.active : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        <span className={`size-2 rounded-full ${on ? "bg-white" : p.dot}`} />
                        <span className="text-xs font-bold uppercase">{p.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700">Description</label>
                <textarea
                  className="min-h-[100px] w-full resize-none rounded-lg border border-primary/20 bg-background-light px-4 py-3 focus:ring-2 focus:ring-primary"
                  placeholder="Provide as much detail as possible about the issue..."
                  rows={4}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700">Photo Attachment</label>
                <div className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-primary/20 bg-primary/5 p-8 transition-colors hover:bg-primary/10">
                  <span className="material-symbols-outlined mb-2 text-4xl text-primary/40">add_a_photo</span>
                  <p className="text-sm font-medium text-slate-600">Click or drag photo to upload</p>
                  <p className="mt-1 text-xs text-slate-400">PNG, JPG up to 10MB</p>
                </div>
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90"
              >
                <span className="material-symbols-outlined">send</span>
                Submit Issue Report
              </button>
            </form>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-lg font-bold">
                <span className="material-symbols-outlined text-primary">history</span>
                Recent Issues
              </h3>
              <button type="button" className="text-xs font-bold text-primary hover:underline">
                View All
              </button>
            </div>
            <div className="space-y-4">
              <div className="rounded-lg border border-primary/5 bg-background-light p-4 transition-all hover:border-primary/20">
                <div className="mb-2 flex items-start justify-between">
                  <span className="text-xs font-bold text-primary/60">#ISS-9821</span>
                  <span className="rounded bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase text-amber-800">
                    High
                  </span>
                </div>
                <p className="font-bold text-slate-900">Door sensor intermittent — Box D-04</p>
                <p className="mt-1 text-xs text-slate-500">Logged 2h ago · Maintenance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
