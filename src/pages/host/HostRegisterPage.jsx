import React from "react";
import { useNavigate } from "react-router-dom";

const HostRegisterPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f7f6f8] font-sans text-slate-900 transition-colors duration-300">
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#351a5b]/10 px-6 md:px-20 py-4 bg-[#f7f6f8] sticky top-0 z-50">
          <div className="flex items-center gap-3 text-[#351a5b]">
            <div className="w-8 h-8">
              <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z" />
              </svg>
            </div>
            <h2 className="text-xl font-extrabold tracking-tight">BoxHub</h2>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <div className="hidden md:flex items-center gap-9">
              <a className="text-sm font-semibold hover:text-[#351a5b] transition-colors" href="#">How it Works</a>
              <a className="text-sm font-semibold hover:text-[#351a5b] transition-colors" href="#">Pricing</a>
              <a className="text-sm font-semibold hover:text-[#351a5b] transition-colors" href="#">Support</a>
            </div>
            <button
              type="button"
              onClick={() => navigate("/host/login")}
              className="flex min-w-[100px] cursor-pointer items-center justify-center rounded-lg h-10 px-5 bg-[#351a5b] text-white text-sm font-bold shadow-md hover:bg-[#351a5b]/90 transition-all"
            >
              Sign In
            </button>
          </div>
        </header>

        <main className="flex-1 flex flex-col items-center">
          <div className="w-full max-w-[1200px] px-6 py-10">
            <div
              className="relative overflow-hidden rounded-xl h-64 md:h-80 bg-cover bg-center flex flex-col justify-end p-8"
              style={{
                backgroundImage: 'linear-gradient(180deg, rgba(53, 26, 91, 0.1) 0%, rgba(53, 26, 91, 0.9) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuA4qWGCwzKPcEZK4_zHVXsddcIXz6V0QLJpvTVeCpuPn1m7D6H8r7aiYE2HchZ-6ZBoLJqB_HBYVohJyrh8zsll6lv0RoeAQGQMzQ7ueMA_GdRqJ79zrSlAKTBPeIKaWmRHmmRwwk6uzc155LVCWqWR9UvEX_YD_sgQPYCCvD4NpK0-y5t4xLffL927RFSpn7i5Vwe4z2YmoSHOPSCfS0JsmLMzJUiSP6WE6VYY_nJMknQ6UpNpTsWQgISiHQfXNsSsYm-w9D3SJ8Fi")',
              }}
            >
              <div className="max-w-2xl">
                <h1 className="text-white text-3xl md:text-4xl font-black leading-tight">Partner with BoxHub</h1>
                <p className="text-white/80 mt-2 text-lg">Monetize your space by hosting premium sleep pods in prime locations.</p>
              </div>
            </div>
          </div>

          <div className="w-full max-w-[1200px] px-6 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7 flex flex-col gap-8">
              <div>
                <p className="text-[#351a5b] font-bold uppercase tracking-widest text-xs mb-2">Registration</p>
                <h2 className="text-3xl font-black text-slate-900 leading-tight">Become a BoxHub Host</h2>
                <p className="text-slate-500 mt-2">Join thousands of property owners earning extra passive income by providing premium rest spaces.</p>
              </div>

              <div className="flex flex-col gap-4 p-6 bg-white rounded-xl border border-[#351a5b]/10 shadow-sm">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-[#351a5b]">Step 1 of 3: Personal Information</span>
                  <span className="text-sm font-bold text-slate-400">33% Complete</span>
                </div>
                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-[#351a5b] h-full w-[33%] rounded-full" />
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  Next: Property Details
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-700">Full Name</label>
                    <input className="rounded-lg border-slate-200 bg-white p-3 focus:ring-2 focus:ring-[#351a5b] focus:border-transparent outline-none transition-all border" placeholder="John Doe" type="text" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-700">Email Address</label>
                    <input className="rounded-lg border-slate-200 bg-white p-3 focus:ring-2 focus:ring-[#351a5b] focus:border-transparent outline-none transition-all border" placeholder="john@example.com" type="email" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700">Phone Number</label>
                  <div className="flex gap-2">
                    <select className="w-24 rounded-lg border-slate-200 bg-white p-3 focus:ring-2 focus:ring-[#351a5b] outline-none border">
                      <option>+1</option>
                      <option>+44</option>
                      <option>+84</option>
                    </select>
                    <input className="flex-1 rounded-lg border-slate-200 bg-white p-3 focus:ring-2 focus:ring-[#351a5b] focus:border-transparent outline-none transition-all border" placeholder="(555) 000-0000" type="tel" />
                  </div>
                </div>
                <div className="flex flex-col gap-6 mt-4 opacity-50 pointer-events-none border-t border-slate-100 pt-8">
                  <h3 className="text-lg font-bold">Step 2: Property Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-bold text-slate-700">Facility Name</label>
                      <input className="rounded-lg border-slate-200 bg-white p-3 border" placeholder="e.g. Skyline Transit Lounge" type="text" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-bold text-slate-700">Facility Type</label>
                      <select className="rounded-lg border-slate-200 bg-white p-3 border">
                        <option>Airport Lounge</option>
                        <option>Shopping Mall</option>
                        <option>Office Building</option>
                        <option>Hotel Lobby</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-4 mt-4 opacity-50 pointer-events-none border-t border-slate-100 pt-8">
                  <h3 className="text-lg font-bold">Step 3: Verification</h3>
                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center gap-3">
                    <span className="material-symbols-outlined text-4xl text-slate-400">cloud_upload</span>
                    <p className="text-sm font-medium">Upload government-issued ID</p>
                    <p className="text-xs text-slate-400">PDF, JPG or PNG (max. 10MB)</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center mt-10">
                <button type="button" onClick={() => navigate(-1)} className="px-6 py-3 font-bold text-slate-500 hover:text-[#351a5b] transition-colors">
                  Cancel
                </button>
                <button
                  type="button"
                  className="bg-[#351a5b] hover:bg-[#351a5b]/90 text-white px-10 py-3 rounded-xl font-bold shadow-lg shadow-[#351a5b]/25 transition-all flex items-center gap-2"
                >
                  Continue to Step 2
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="bg-[#351a5b]/5 rounded-xl p-8 border border-[#351a5b]/10 sticky top-28">
                <h3 className="text-xl font-bold text-[#351a5b] mb-6">Why host with BoxHub?</h3>
                <ul className="flex flex-col gap-6">
                  <li className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#351a5b] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-white text-xl">payments</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Predictable Revenue</h4>
                      <p className="text-sm text-slate-500">Earn monthly fixed rent plus profit-sharing bonuses based on pod utilization.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#351a5b] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-white text-xl">handyman</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Zero Maintenance</h4>
                      <p className="text-sm text-slate-500">Our team handles all technical maintenance, cleaning, and guest support 24/7.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#351a5b] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-white text-xl">verified_user</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Verified Users</h4>
                      <p className="text-sm text-slate-500">Every guest is identity-verified before booking to ensure safety and security.</p>
                    </div>
                  </li>
                </ul>
                <div className="mt-10 pt-10 border-t border-[#351a5b]/10">
                  <div className="bg-white p-4 rounded-lg flex items-center gap-4">
                    <img className="w-12 h-12 rounded-full object-cover" alt="Host" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxlO8cl6Dr7XB5F0X0gjgOQTYAniRf1kFYl9pBUD4S0QoBixAQx_N2BPXH0pyqM6GP32I3Rd1xz5UeGL2FsJL7MW46ifYUnyYgx93NpeCiNpNO6PJXVADoyJ_qPbZp_dX7-Zms-Oc_I09UoRzdcfREj2OgAfA29Cp1Ak132ABGcxtYMTuP2ikE7vD0Ar7cbPhLCTgBk036Fgh1lmSfOolJpu_e15MIB4j4_S-0RqtPRu2LB9lo1bt39L1MX8oJUobYuPn9Yf_UYYRE" referrerPolicy="no-referrer" />
                    <div>
                      <p className="text-xs font-bold text-[#351a5b] uppercase">Top Host Review</p>
                      <p className="text-sm italic text-slate-600">&quot;BoxHub turned my underutilized lounge area into a $5k/mo revenue stream.&quot;</p>
                      <p className="text-xs font-bold mt-1 text-slate-900">- David K., Airport Manager</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="bg-white border-t border-[#351a5b]/10 py-12 px-6 md:px-20 mt-auto">
          <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3 text-slate-400">
              <div className="w-6 h-6 opacity-50">
                <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z" />
                </svg>
              </div>
              <span className="text-sm font-bold">© 2024 BoxHub International. All rights reserved.</span>
            </div>
            <div className="flex gap-8">
              <a className="text-sm text-slate-500 hover:text-[#351a5b] transition-colors" href="#">Privacy Policy</a>
              <a className="text-sm text-slate-500 hover:text-[#351a5b] transition-colors" href="#">Terms of Service</a>
              <a className="text-sm text-slate-500 hover:text-[#351a5b] transition-colors" href="#">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HostRegisterPage;
