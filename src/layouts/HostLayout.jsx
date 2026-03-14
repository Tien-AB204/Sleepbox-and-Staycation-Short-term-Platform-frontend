import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

const HOST_MENU = [
  { path: "/host/dashboard", label: "Dashboard", icon: "dashboard" },
  { path: "/host/facilities", label: "Facilities", icon: "apartment" },
  { path: "/host/bookings", label: "Bookings", icon: "book_online" },
  { path: "/host/calendar", label: "Calendar", icon: "event_available" },
  { path: "/host/pricing", label: "Pricing", icon: "sell" },
  { path: "/host/staff", label: "Staff", icon: "group" },
  { path: "/host/statistics", label: "Statistics", icon: "bar_chart" },
  { path: "/host/disputes", label: "Disputes", icon: "gavel" },
  { path: "/host/sleepboxes", label: "Sleepboxes", icon: "bed" },
  { path: "/host/settings", label: "Settings", icon: "settings" },
];

const HostLayout = () => {
  const { user } = useAuthContext();
  const displayName = user?.name || user?.email?.split("@")[0] || "Host";

  return (
    <div className="flex min-h-screen overflow-hidden bg-[#f7f6f8] text-slate-900 font-sans">
      {/* Sidebar - đồng bộ cho mọi trang host */}
      <aside className="w-64 flex-shrink-0 border-r border-[#351a5b]/10 bg-white flex flex-col fixed h-full z-50">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#351a5b] rounded-lg flex items-center justify-center text-white">
            <span className="material-symbols-outlined">inventory_2</span>
          </div>
          <div>
            <h1 className="text-[#351a5b] font-bold text-lg leading-tight">BoxHub</h1>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Host Portal</p>
          </div>
        </div>
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {HOST_MENU.map(({ path, label, icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/host/dashboard"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                  isActive
                    ? "bg-[#351a5b] text-white shadow-md shadow-[#351a5b]/20"
                    : "text-slate-600 hover:bg-[#351a5b]/5"
                }`
              }
            >
              <span className="material-symbols-outlined text-[22px]">{icon}</span>
              <span className="text-sm font-semibold">{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-[#351a5b]/10">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-[#351a5b]/5">
            <div className="w-10 h-10 rounded-full bg-[#351a5b]/20 flex items-center justify-center overflow-hidden border-2 border-[#351a5b]/20">
              <span className="text-[#351a5b] font-bold text-sm">{displayName.slice(0, 2).toUpperCase()}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate">{displayName}</p>
              <p className="text-xs text-slate-500 truncate">Host</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content area */}
      <main className="flex-1 ml-64 flex flex-col min-w-0">
        <header className="h-16 border-b border-[#351a5b]/10 bg-white px-8 flex items-center justify-between sticky top-0 z-40 shrink-0">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
              <input
                className="w-full pl-11 pr-4 py-2 bg-[#351a5b]/5 border-none rounded-lg focus:ring-2 focus:ring-[#351a5b]/20 text-sm"
                placeholder="Search bookings, facilities, or guests..."
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button type="button" className="w-10 h-10 rounded-xl bg-[#351a5b]/5 flex items-center justify-center relative hover:bg-[#351a5b]/10 transition-colors">
              <span className="material-symbols-outlined text-slate-600">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="h-8 w-px bg-[#351a5b]/10 mx-2" />
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold leading-none text-slate-900">{displayName}</p>
                <p className="text-xs text-slate-500">Host Account</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#351a5b]/10 flex items-center justify-center border border-[#351a5b]/20">
                <span className="text-[#351a5b] font-bold text-sm">{displayName.slice(0, 2).toUpperCase()}</span>
              </div>
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default HostLayout;
