import React from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { useInternalLogout } from "../../hooks/useInternalLogout";

/** stitch: h_s_c_nh_n_staff_1/code.html — Settings / profile */
export default function StaffProfile() {
  const { user } = useAuthContext();
  const signOutInternal = useInternalLogout();
  const name = user?.email?.split("@")[0] || "Alex Morgan";

  return (
    <main className="flex min-w-0 flex-1 flex-col overflow-y-auto bg-background-light">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-primary/10 bg-white/80 px-8 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">person</span>
          <h2 className="text-lg font-bold tracking-tight text-slate-900">Hồ sơ cá nhân</h2>
        </div>
        <div className="flex items-center gap-4">
          <button type="button" className="relative rounded-full p-2 transition-colors hover:bg-slate-100">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute right-2 top-2 size-2 rounded-full border-2 border-white bg-red-500" />
          </button>
          <div className="flex size-8 items-center justify-center overflow-hidden rounded-full bg-primary/20">
            <span className="text-xs font-bold text-primary">{name[0]?.toUpperCase()}</span>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-6xl space-y-8 p-8">
        <section className="flex flex-col items-center gap-8 rounded-xl border border-primary/5 bg-white p-6 shadow-sm md:flex-row md:items-start">
          <div className="relative">
            <div className="size-32 overflow-hidden rounded-2xl ring-4 ring-primary/10">
              <div className="flex size-full items-center justify-center bg-slate-200 text-4xl font-bold text-slate-400">
                {name[0]?.toUpperCase()}
              </div>
            </div>
            <button
              type="button"
              className="absolute -bottom-2 -right-2 rounded-lg bg-primary p-2 text-white shadow-lg"
              aria-label="Change photo"
            >
              <span className="material-symbols-outlined text-[20px]">photo_camera</span>
            </button>
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h3 className="text-2xl font-bold capitalize text-slate-900">{name}</h3>
                <p className="font-medium text-primary">Shift Supervisor</p>
                <div className="mt-2 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500 md:justify-start">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">badge</span>
                    ID: BH-9542
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">location_on</span>
                    North Wing
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-primary/90"
              >
                <span className="material-symbols-outlined text-[20px]">edit</span>
                Edit Profile
              </button>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-4 border-t border-slate-100 pt-6 sm:grid-cols-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Check-ins Completed</p>
                <p className="text-xl font-bold text-slate-900">1,284</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Issues Resolved</p>
                <p className="text-xl font-bold text-slate-900">92</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Average Rating</p>
                <div className="flex items-center justify-center gap-1 md:justify-start">
                  <p className="text-xl font-bold text-slate-900">4.9</p>
                  <span className="material-symbols-outlined text-[18px] text-yellow-500">star</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <section className="rounded-xl border border-primary/5 bg-white p-6 shadow-sm">
              <h4 className="mb-6 flex items-center gap-2 text-lg font-bold">
                <span className="material-symbols-outlined text-primary">contact_mail</span>
                Personal Information
              </h4>
              <div className="grid grid-cols-1 gap-y-6 gap-x-12 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-bold uppercase text-slate-400">Email Address</label>
                  <p className="text-slate-700">{user?.email || "alex.morgan@boxhub.com"}</p>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold uppercase text-slate-400">Phone Number</label>
                  <p className="text-slate-700">+1 (555) 012-3456</p>
                </div>
                <div className="md:col-span-2">
                  <label className="mb-1 block text-xs font-bold uppercase text-slate-400">Home Address</label>
                  <p className="text-slate-700">123 Storage Lane, Industrial District, TX 75001</p>
                </div>
              </div>
            </section>

            <section className="rounded-xl border border-primary/5 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <h4 className="flex items-center gap-2 text-lg font-bold">
                  <span className="material-symbols-outlined text-primary">calendar_month</span>
                  Shift &amp; Schedule
                </h4>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  Week 42
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { d: "Mon", t1: "08:00", t2: "16:00", hl: true },
                  { d: "Tue", t1: "08:00", t2: "16:00", hl: false },
                  { d: "Wed", off: true, hl: false },
                  { d: "Thu", t1: "14:00", t2: "22:00", hl: false },
                  { d: "Fri", t1: "14:00", t2: "22:00", hl: false },
                  { d: "Sat", t1: "09:00", t2: "17:00", hl: false },
                ].map((day) => (
                  <div
                    key={day.d}
                    className={`min-w-[100px] flex-1 rounded-lg border p-3 text-center ${
                      day.hl ? "border-primary/20 bg-primary/5" : "border-slate-100"
                    }`}
                  >
                    <p className="mb-1 text-[10px] font-bold uppercase text-slate-400">{day.d}</p>
                    {day.off ? (
                      <p className="mt-2 text-xs font-bold italic text-slate-400">OFF</p>
                    ) : (
                      <>
                        <p className="text-sm font-bold">{day.t1}</p>
                        <p className="text-sm font-bold">{day.t2}</p>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <section className="rounded-xl border border-primary/5 bg-white p-6 shadow-sm">
              <h4 className="mb-4 flex items-center gap-2 text-lg font-bold">
                <span className="material-symbols-outlined text-primary">verified</span>
                Certifications
              </h4>
              <ul className="space-y-4">
                {["Emergency Response", "Guest Service Excellence", "Cleaning Standards"].map((c) => (
                  <li key={c} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[20px] text-green-500">check_circle</span>
                    <div>
                      <p className="text-sm font-bold">{c}</p>
                      <p className="text-[11px] text-slate-500">Completed</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-xl border border-primary/5 bg-white p-6 shadow-sm">
              <h4 className="mb-4 flex items-center gap-2 text-lg font-bold">
                <span className="material-symbols-outlined text-primary">shield_lock</span>
                Account Settings
              </h4>
              <div className="space-y-2">
                {[
                  { icon: "key", label: "Change Password" },
                  { icon: "notifications_active", label: "Notification Prefs" },
                  { icon: "devices", label: "Device Management" },
                ].map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    className="group flex w-full items-center justify-between rounded-lg p-3 transition-colors hover:bg-primary/5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-slate-400 transition-colors group-hover:text-primary">
                        {s.icon}
                      </span>
                      <span className="text-sm font-medium">{s.label}</span>
                    </div>
                    <span className="material-symbols-outlined text-[20px] text-slate-300">chevron_right</span>
                  </button>
                ))}
              </div>
              <div className="mt-6 border-t border-slate-100 pt-6">
                <button
                  type="button"
                  onClick={signOutInternal}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 py-2 text-sm font-bold text-red-600 transition-colors hover:bg-red-50"
                >
                  <span className="material-symbols-outlined text-[20px]">logout</span>
                  Log Out
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
