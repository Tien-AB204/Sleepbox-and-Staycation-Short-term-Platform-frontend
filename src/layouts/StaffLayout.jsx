import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { useInternalLogout } from "../hooks/useInternalLogout";

/**
 * Sidebar thống nhất theo stitch: boxhub_th_ng_b_o_staff / boxhub_qu_n_l_box_staff
 * — w-72, logo bedroom_child, thứ tự menu như file HTML.
 */
const navItems = [
  { to: "/staff/dashboard", label: "Dashboard", icon: "dashboard" },
  { to: "/staff/verification", label: "Verification", icon: "verified_user" },
  { to: "/staff/boxes", label: "Box Management", icon: "inventory_2" },
  { to: "/staff/check-in-out", label: "Check-in/out", icon: "sensor_door" },
  { to: "/staff/issues", label: "Report Issue", icon: "report_problem" },
  { to: "/staff/notifications", label: "Notifications", icon: "notifications" },
  { to: "/staff/profile", label: "Settings", icon: "settings" },
];

export default function StaffLayout() {
  const { user } = useAuthContext();
  const handleLogout = useInternalLogout();
  const displayName = user?.email
    ? user.email.split("@")[0].replace(/\./g, " ")
    : "Staff";

  return (
    <div className="flex min-h-screen bg-background-light font-display text-slate-900">
      <aside className="fixed inset-y-0 left-0 z-20 flex w-72 flex-col border-r border-primary/10 bg-white transition-colors">
        <div className="flex items-center gap-3 p-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-white">
            <span className="material-symbols-outlined text-2xl">bedroom_child</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold leading-none text-primary">BoxHub</h1>
            <p className="text-xs font-medium text-primary/60">Staff Portal</p>
          </div>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 pt-2 host-custom-scrollbar">
          {navItems.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                [
                  "flex items-center gap-3 rounded-lg px-4 py-3 transition-all",
                  isActive
                    ? "bg-primary text-white"
                    : "text-slate-600 hover:bg-primary/5 hover:text-primary",
                ].join(" ")
              }
            >
              <span className="material-symbols-outlined">{icon}</span>
              <span className="text-sm font-semibold">{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-primary/10 p-6">
          <button
            type="button"
            onClick={handleLogout}
            className="mb-4 flex w-full items-center gap-2 rounded-xl p-2 text-left text-sm font-medium text-slate-600 transition-colors hover:bg-primary/5"
          >
            <span className="material-symbols-outlined text-slate-400">logout</span>
            <span className="font-semibold">Sign out</span>
          </button>
          <div className="flex cursor-pointer items-center gap-3 rounded-xl p-2 hover:bg-primary/5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
              {displayName.slice(0, 1).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1 overflow-hidden">
              <p className="truncate text-sm font-bold capitalize">{displayName}</p>
              <p className="truncate text-xs text-primary/60">Shift Manager</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="ml-72 flex min-h-screen min-w-0 flex-1 flex-col">
        <Outlet />
      </div>
    </div>
  );
}
