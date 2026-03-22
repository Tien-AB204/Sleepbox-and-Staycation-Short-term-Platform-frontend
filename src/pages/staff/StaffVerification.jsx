import React from "react";

/** stitch: boxhub_x_c_minh_t_ch_staff/code.html */
export default function StaffVerification() {
  return (
    <main className="flex min-w-0 flex-1 flex-col overflow-y-auto bg-background-light">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-primary/10 bg-white/80 px-8 py-4 backdrop-blur-md">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-primary">Verify Booking</h2>
          <p className="text-sm text-slate-500">Scan QR or enter details to check-in guest</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors hover:bg-primary/20"
          >
            <span className="material-symbols-outlined">notifications</span>
          </button>
        </div>
      </header>

      <div className="mx-auto w-full max-w-5xl space-y-8 p-8">
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col items-center space-y-4 rounded-xl border border-primary/10 bg-white p-6 text-center shadow-sm">
            <div className="relative flex size-48 flex-col items-center justify-center overflow-hidden rounded-lg bg-slate-100">
              <div className="absolute inset-0 bg-primary/5 transition-colors group-hover:bg-primary/10" />
              <span className="material-symbols-outlined text-6xl text-primary">qr_code_scanner</span>
              <div className="absolute left-0 top-0 size-8 rounded-tl-lg border-l-4 border-t-4 border-primary" />
              <div className="absolute right-0 top-0 size-8 rounded-tr-lg border-r-4 border-t-4 border-primary" />
              <div className="absolute bottom-0 left-0 size-8 rounded-bl-lg border-b-4 border-l-4 border-primary" />
              <div className="absolute bottom-0 right-0 size-8 rounded-br-lg border-b-4 border-r-4 border-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold">Scan QR Code</h3>
              <p className="text-sm text-slate-500">
                Position the guest&apos;s digital or printed QR code within the frame
              </p>
            </div>
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-bold text-white shadow-lg shadow-primary/20 transition-colors hover:bg-primary/90"
            >
              <span className="material-symbols-outlined">videocam</span>
              Open Scanner
            </button>
          </div>

          <div className="flex flex-col justify-between space-y-6 rounded-xl border border-primary/10 bg-white p-6 shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">keyboard</span>
                <h3 className="text-lg font-bold">Manual Lookup</h3>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Booking ID or Phone
                  </label>
                  <input
                    className="w-full rounded-xl border border-primary/10 bg-slate-50 px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:ring-primary"
                    placeholder="e.g. SB-10293 or +1 234..."
                    type="text"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Guest Last Name
                    </label>
                    <input
                      className="w-full rounded-xl border border-primary/10 bg-slate-50 px-4 py-3 focus:ring-2 focus:ring-primary"
                      placeholder="Optional"
                      type="text"
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      type="button"
                      className="flex h-[50px] w-full items-center justify-center gap-2 rounded-xl border-2 border-primary font-bold text-primary transition-all hover:bg-primary hover:text-white"
                    >
                      <span className="material-symbols-outlined">search</span>
                      Find
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-primary/5 p-4">
              <p className="text-xs italic leading-relaxed text-primary/70">
                * Use this method if the QR code scanner is unavailable or if the guest only has a confirmation number.
              </p>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-xl border-2 border-primary/20 bg-white shadow-xl">
          <div className="flex items-center justify-between border-b border-primary/10 bg-primary/5 px-6 py-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined font-bold text-green-600">check_circle</span>
              <span className="font-bold text-primary">Booking Identified</span>
            </div>
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-black uppercase text-green-700">
              Confirmed
            </span>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="size-16 overflow-hidden rounded-full bg-slate-200 ring-4 ring-primary/10">
                    <img
                      alt=""
                      className="h-full w-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWwxoXV2Uw1mpVCE76a8VkKqJo5RpGsGocNJLWALVzmnZHpz5yeE_Xc4AJouX8-AVg3_kc3cbXIhSukDCyyAfF2irRD8IPAFoShX9yB6ZjHA39MWqfmhQgLAJZxPFDI4O2SU1BboG6g7fomDMoZU_fsPirineLV8RCGcK-qB9_2pqg5RnE07QWoOyAkUm5aqnvorHqbdQGN4co2DjGaeJmoo9tBLPQeJh_VRas7FOsPMNu031Z__k8aoHIFb2rYBP5cUbA3oVutnYM"
                    />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold">Elena Vance</h4>
                    <div className="flex items-center gap-1 text-amber-500">
                      <span className="material-symbols-outlined text-sm">star</span>
                      <span className="text-sm font-bold">4.9</span>
                      <span className="ml-1 text-xs font-medium text-slate-400">(24 stays)</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-slate-50 p-3">
                    <p className="text-[10px] font-bold uppercase text-slate-400">SleepBox No.</p>
                    <p className="text-lg font-black text-primary">A-09</p>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-3">
                    <p className="text-[10px] font-bold uppercase text-slate-400">Duration</p>
                    <p className="text-lg font-black text-primary">3 Hours</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-green-100 bg-green-50 p-3">
                  <span className="material-symbols-outlined text-green-600">payments</span>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-green-600">Payment Status</p>
                    <p className="text-sm font-bold text-slate-700">Paid Online ($45.00)</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <h5 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-400">
                    <span className="material-symbols-outlined text-sm">schedule</span>
                    Time Schedule
                  </h5>
                  <div className="relative space-y-4 pl-6 before:absolute before:bottom-2 before:left-0 before:top-2 before:w-0.5 before:bg-slate-200">
                    <div className="relative">
                      <div className="absolute -left-[27px] top-1 size-3 rounded-full border-2 border-white bg-primary" />
                      <p className="text-[10px] font-bold uppercase text-slate-400">Check-in</p>
                      <p className="font-bold">Today, 14:30</p>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-[27px] top-1 size-3 rounded-full border-2 border-white bg-slate-400" />
                      <p className="text-[10px] font-bold uppercase text-slate-400">Check-out</p>
                      <p className="font-bold">Today, 17:30</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h5 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-400">
                    <span className="material-symbols-outlined text-sm">sticky_note_2</span>
                    Special Requests
                  </h5>
                  <div className="rounded-lg border border-amber-100 bg-amber-50 p-3">
                    <p className="text-sm italic text-amber-800">
                      &quot;Late arrival due to flight delay. Would appreciate an extra pillow if possible. Thanks!&quot;
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <h5 className="mb-2 text-sm font-bold uppercase tracking-widest text-slate-400">Actions</h5>
                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-3 rounded-xl bg-primary py-4 font-black text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90"
                >
                  <span className="material-symbols-outlined">login</span>
                  Confirm Check-in
                </button>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 rounded-xl bg-slate-100 py-3 font-bold text-slate-700 transition-colors hover:bg-slate-200"
                  >
                    <span className="material-symbols-outlined text-sm">print</span>
                    Receipt
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 rounded-xl border border-red-100 bg-red-50 py-3 font-bold text-red-600 transition-colors hover:bg-red-100"
                  >
                    <span className="material-symbols-outlined text-sm">flag</span>
                    Issue
                  </button>
                </div>
                <div className="mt-4 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-primary/20 p-4 text-center">
                  <p className="mb-2 text-[10px] font-bold uppercase text-slate-400">Assigned Keycard</p>
                  <div className="flex items-center gap-2 text-primary">
                    <span className="material-symbols-outlined">contactless</span>
                    <span className="text-xl font-black">#KC-882</span>
                  </div>
                  <button type="button" className="mt-2 text-xs font-bold text-primary hover:underline">
                    Reassign Card
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
