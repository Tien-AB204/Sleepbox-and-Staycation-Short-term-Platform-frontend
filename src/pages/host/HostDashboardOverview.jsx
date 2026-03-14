import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

const HostDashboardOverview = () => {
  const { user } = useAuthContext();
  const displayName = user?.name || user?.email?.split("@")[0] || "Host";

  return (
    <div className="p-8 space-y-8 max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Host Dashboard</h2>
              <p className="text-slate-500 mt-1">Good morning, {displayName}. Here is what&apos;s happening with your properties today.</p>
            </div>
            <div className="flex gap-3">
              <Link to="/host/pricing" className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#351a5b]/20 font-semibold text-sm hover:bg-[#351a5b]/5 transition-all">
                <span className="material-symbols-outlined text-lg">edit_calendar</span>
                Manage Pricing
              </Link>
              <Link to="/host/facilities" className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#351a5b] text-white font-semibold text-sm hover:shadow-lg hover:shadow-[#351a5b]/20 transition-all">
                <span className="material-symbols-outlined text-lg">add_business</span>
                Add New Facility
              </Link>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-[#351a5b]/10 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-green-600">account_balance_wallet</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">+12.5% vs LW</span>
              </div>
              <p className="text-slate-500 text-sm font-medium">Total Revenue (Monthly)</p>
              <p className="text-3xl font-extrabold text-slate-900 mt-1">$12,450.00</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-[#351a5b]/10 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-blue-600">bed</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">+4.2% vs LW</span>
              </div>
              <p className="text-slate-500 text-sm font-medium">Occupancy Rate</p>
              <p className="text-3xl font-extrabold text-slate-900 mt-1">88.4%</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-[#351a5b]/10 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-amber-600">star</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold">452 Reviews</span>
              </div>
              <p className="text-slate-500 text-sm font-medium">Average Rating</p>
              <p className="text-3xl font-extrabold text-slate-900 mt-1">4.92</p>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-[#351a5b]/10 shadow-sm flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-900">Revenue Trends</h3>
                <div className="flex items-center gap-2 bg-[#351a5b]/5 p-1 rounded-lg">
                  <button type="button" className="px-3 py-1 text-xs font-bold rounded-md bg-white text-[#351a5b] shadow-sm">Weekly</button>
                  <button type="button" className="px-3 py-1 text-xs font-bold text-slate-500">Monthly</button>
                </div>
              </div>
              <div className="flex-1 min-h-[300px] flex flex-col justify-end">
                <div className="flex items-end justify-between gap-2 h-48 w-full px-2">
                  <div className="w-full bg-[#351a5b]/10 rounded-t-lg h-[40%] hover:bg-[#351a5b]/30 transition-all cursor-pointer relative group">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">$1,2k</div>
                  </div>
                  <div className="w-full bg-[#351a5b]/10 rounded-t-lg h-[60%] hover:bg-[#351a5b]/30 transition-all cursor-pointer relative group">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">$1,8k</div>
                  </div>
                  <div className="w-full bg-[#351a5b]/10 rounded-t-lg h-[55%] hover:bg-[#351a5b]/30 transition-all cursor-pointer relative group" />
                  <div className="w-full bg-[#351a5b]/10 rounded-t-lg h-[80%] hover:bg-[#351a5b]/30 transition-all cursor-pointer relative group" />
                  <div className="w-full bg-[#351a5b]/10 rounded-t-lg h-[75%] hover:bg-[#351a5b]/30 transition-all cursor-pointer relative group" />
                  <div className="w-full bg-[#351a5b] rounded-t-lg h-[95%] hover:bg-[#351a5b]/90 transition-all cursor-pointer relative group">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">$2,4k</div>
                  </div>
                  <div className="w-full bg-[#351a5b]/10 rounded-t-lg h-[65%] hover:bg-[#351a5b]/30 transition-all cursor-pointer relative group" />
                </div>
                <div className="flex justify-between mt-4 px-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#351a5b]/10 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Today&apos;s Schedule</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#351a5b] rounded-full" /> Check-ins (3)
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-[#351a5b]/5 border border-[#351a5b]/5">
                      <img className="w-10 h-10 rounded-full object-cover" alt="Guest" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvIesA5-ZjffcpILzHLX4fb94_Jqr64phlhcAD0bIq1RqftkwQxOdqE6Zl1co2oup3fMm3BkgoLKdn7Rs9EiOGMlGBV8Zu50yTF6M77zTN2eh87CB-YYyiX7nCGVwTU5ZWesGqpcJ8e5vntHPjOuVigv9JmDYybkDMKU456DXrnosoPg0pyyqgzW82wxmokA9noawpGs-5TUTjupNjRqMtdEFR49vO5h45dFyICCAL9CptVO2fBggKps_XK6VnMSKFTonWfkmKvS4s" referrerPolicy="no-referrer" />
                      <div className="flex-1">
                        <p className="text-sm font-bold text-slate-900">James Wilson</p>
                        <p className="text-xs text-slate-500">Loft Suite #402 • 2 PM</p>
                      </div>
                      <span className="material-symbols-outlined text-[#351a5b] text-xl">chat</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-[#351a5b]/5 border border-[#351a5b]/5">
                      <img className="w-10 h-10 rounded-full object-cover" alt="Guest" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZsO2ukLbcDK4U-K_Mo-2Fi8m3aO1F0eQtGBo_Il5oSF1YI1FOPVCR8iQJ68M-YMs23bQ00NIrbfVNLuYKLGDlLbWN12e0Y5tjeD3aDWG5Lc_DBZOU1f7-o-MMjQK5vnD-k_rqMZUCh1b9LPqPxgUl8cYavqPcJguQwvMhcaYGr_bk7bUyJsN2ps3Suqig9SzT6FY0-7KcVOkz6kQEG5HrmYHt_cggD2ewWb8Alur9zBQifuedni82Iuk5aINHgvDkhtysc3eANcW4" referrerPolicy="no-referrer" />
                      <div className="flex-1">
                        <p className="text-sm font-bold text-slate-900">Sarah Chen</p>
                        <p className="text-xs text-slate-500">Garden Villa • 4 PM</p>
                      </div>
                      <span className="material-symbols-outlined text-[#351a5b] text-xl">chat</span>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-[#351a5b]/10">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-slate-400 rounded-full" /> Check-outs (1)
                  </p>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
                    <img className="w-10 h-10 rounded-full object-cover" alt="Guest" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxLcSBJvI-Z2AlZw62aE-ge55hWhLvSnbBNyDfhZHmwOnzV6F4WFjNFJqtf4Z9l0B2GvMQzfwmNUEprOVoV1G96pz-2_NiR6oKe-gzihEKNRQrauKgaDa2xJ8kHtHBMgnFJS96_IFYPL9vTPpQALBI4_YjTIhqIiaJphw8YdKyNAExRREyAhwkHf0LfppNUZCIchEa61nT-ucL2EJyHTOJBbMudjRe9zqNGmANyNT5N2nkLGSEdVKkES4984phIa6q35whwZtz8dtt" referrerPolicy="no-referrer" />
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-900">Michael Ross</p>
                      <p className="text-xs text-slate-500">Urban Studio • 11 AM</p>
                    </div>
                    <span className="px-2 py-1 rounded-md bg-white text-[#351a5b] text-[10px] font-bold shadow-sm">PENDING</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Properties Table */}
          <div className="bg-white rounded-2xl border border-[#351a5b]/10 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-[#351a5b]/10 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900">Top Performing Properties</h3>
              <Link to="/host/facilities" className="text-[#351a5b] text-sm font-bold hover:underline">View All Properties</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#351a5b]/5">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Property</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Occupancy</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Revenue</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#351a5b]/5">
                  <tr>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDsCHCajy20pvipX0g2CNP9l8qLkghiNcwu6xs9yoj6CkixAQJsEqXbxYUErmuh4RmNcq4ztYVVX83auytO20_5tvKdApUA-2QggyxEJ6STgiMQRakxPLoNDEvjTQICCJrmwJ5CjeQhu0jXMZxsjmc74voO-JYtckhAj-j5k5xP5Jp0AfzAWKc3e0r851gbAzny7gcZkA4l0Ma1sVpJr0q5S70S4FXSBpybn3cbVGsbE_kTjSCI_NVHGl8HpCRDf-zMvi3hyf_Oy1fo')" }} />
                        <div>
                          <p className="text-sm font-bold text-slate-900">The Downtown Loft</p>
                          <p className="text-xs text-slate-500">New York, NY</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-600" /> Active
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-24 h-2 bg-[#351a5b]/10 rounded-full overflow-hidden">
                        <div className="bg-[#351a5b] h-full w-[92%]" />
                      </div>
                      <p className="text-[10px] font-bold text-slate-500 mt-1">92%</p>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-900">$4,250</td>
                    <td className="px-6 py-4">
                      <button type="button" className="w-8 h-8 rounded-lg hover:bg-[#351a5b]/10 flex items-center justify-center text-slate-400 hover:text-[#351a5b] transition-colors">
                        <span className="material-symbols-outlined text-lg">more_vert</span>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAxOWf7VVfZclSnI7ZdUXIzHbZKIAXgtUWz1CyZtUtQvAwgvHb6Vhw5I9wkfVAGfQGMg90QDw5TLnGvajhfmhF2RIK5KE4pSDBfJ73h7oO7ogXD-6RSJR4AZewXon_XMXyzo_Ae6jyzp8GTcAXvFjwjRrocVThayeCf3mAV5RT6Xm8w-AwukIy6auwcEnZ6i_soyEFRf4VP5dRUyzmY5xkbYvf8TGF-SQ6lwsYZSYW5qdFJ0Nv_F8hHx7uzczZBZ0OjK3qv1xJk9W60')" }} />
                        <div>
                          <p className="text-sm font-bold text-slate-900">Aspen Hideaway</p>
                          <p className="text-xs text-slate-500">Aspen, CO</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-600" /> Active
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-24 h-2 bg-[#351a5b]/10 rounded-full overflow-hidden">
                        <div className="bg-[#351a5b] h-full w-[78%]" />
                      </div>
                      <p className="text-[10px] font-bold text-slate-500 mt-1">78%</p>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-900">$3,120</td>
                    <td className="px-6 py-4">
                      <button type="button" className="w-8 h-8 rounded-lg hover:bg-[#351a5b]/10 flex items-center justify-center text-slate-400 hover:text-[#351a5b] transition-colors">
                        <span className="material-symbols-outlined text-lg">more_vert</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
    </div>
  );
};

export default HostDashboardOverview;
