import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { useInternalLogout } from "../hooks/useInternalLogout";

const ADMIN_AVATAR_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCiPE7Vtr_12Smk8-Nlm-iDZwWzQNM27s_-yjnKM9n7SVFVpq-Fsswg9hKw-4yvmEn8MVjC4j1E_oX0Cy2n_2eN13RNBLoY86E7ubEszBf0Govmuef-lCv8q8uWWRnRRuqUA8kINQxzlsItP_TCyGh5_fw2FnLC_D7jfS64B0Y1OD_udQDbVFB0FoIySLKKyasgC9FNMc9s1n7fZzNifhmg2WJiDr8TjsMGszEybExYOo85_MrWdTpQ7fZPFXJfjinuj7J2h3B8LQYD";

const navItems = [
  { to: "/admin/dashboard", label: "Bảng điều khiển", icon: "dashboard" },
  { to: "/admin/users", label: "Người dùng", icon: "group" },
  { to: "/admin/moderators", label: "Moderators", icon: "gavel" },
  { to: "/admin/transactions", label: "Giao dịch", icon: "receipt_long" },
  { to: "/admin/settings", label: "Cài đặt hệ thống", icon: "settings" },
];

export default function AdminLayout() {
  const { user } = useAuthContext();
  const handleLogout = useInternalLogout();
  const email = user?.email ?? "admin@boxhub.vn";

  return (
    <div className="flex min-h-screen bg-background-light font-display text-slate-900">
      <aside className="fixed inset-y-0 left-0 z-20 flex w-64 flex-col border-r border-primary/10 bg-white">
        <div className="flex items-center gap-3 p-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-white">
            <span className="material-symbols-outlined text-2xl">inventory_2</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-base font-bold leading-tight text-primary">BoxHub Admin</h1>
            <p className="text-xs text-slate-500">Quản trị hệ thống</p>
          </div>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 pt-2 host-custom-scrollbar">
          {navItems.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                [
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                  isActive
                    ? "bg-primary/10 font-semibold text-primary"
                    : "font-medium text-slate-600 hover:bg-primary/5 hover:text-primary",
                ].join(" ")
              }
            >
              <span className="material-symbols-outlined text-[22px]">{icon}</span>
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-primary/10 p-4">
          <div className="mb-3 flex items-center gap-3 rounded-xl bg-slate-50 p-2">
            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-primary/20">
              <img src={ADMIN_AVATAR_URL} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">Quản trị viên</p>
              <p className="truncate text-xs text-slate-500">{email}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
            Đăng xuất
          </button>
        </div>
      </aside>

      <div className="ml-64 flex min-h-screen min-w-0 flex-1 flex-col">
        <Outlet />
      </div>
    </div>
  );
}
