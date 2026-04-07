import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { useInternalLogout } from "../hooks/useInternalLogout";
import boxhubLogo from "../assets/images/logo.png";

const MOD_AVATAR_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD_knlqmnoxjTmxOMgSnGnHruAL9_tWzeZ42XyKEXYYzsZNwTsINQpmdEDCOn21t7K-x2kq2misF1GMATzU2V1PSmuaA4gQAUCtGGSoyeSgy6u4G-dMQIFztHocG2d2YuCoR1TpY80D0gw4l9uEkd8UgDedpex4qU1LMxGgy0dMgXDwYFyKQDOACqsGabIHrhhxGXiHVKnb5LGtRHYEnDN9haaIPxfRcgJe5Kom02WGwOO7JyI7j7SRYqfuZwMN2f-AGC5CLqF7kMKU"; // Thay bằng avatar mock cho Mod

// Danh sách menu chuẩn cho Moderator
const navItems = [
  { to: "/moderator/host-approvals", label: "Duyệt hồ sơ Host", icon: "badge" },
  { to: "/moderator/approvals", label: "Duyệt cơ sở", icon: "domain_verification" },
  { to: "/moderator/disputes", label: "Khiếu nại", icon: "gavel" },
  { to: "/moderator/users", label: "Người dùng", icon: "manage_accounts" },
];

export default function ModeratorLayout() {
  const { user } = useAuthContext();
  const handleLogout = useInternalLogout();
  const email = user?.email ?? "mod@boxhub.vn";
  const name = user?.fullName ?? "Kiểm duyệt viên";

  return (
    <div className="flex min-h-screen bg-background-light font-display text-slate-900">
      {/* SIDEBAR */}
      <aside className="fixed inset-y-0 left-0 z-20 flex w-64 flex-col border-r border-primary/10 bg-white">
        
        {/* LOGO & TITLE */}
        <div className="flex items-center gap-3 p-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-white">
            <span className="material-symbols-outlined text-2xl">admin_panel_settings</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-base font-bold leading-tight text-primary">BoxHub Mod</h1>
            <p className="text-xs text-slate-500">Kiểm duyệt hệ thống</p>
          </div>
        </div>

        {/* NAVIGATION LINKS */}
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

        {/* BOTTOM USER PROFILE & LOGOUT */}
        <div className="border-t border-primary/10 p-4">
          <div className="mb-3 flex items-center gap-3 rounded-xl bg-slate-50 p-2">
            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-primary/20">
              <img src={MOD_AVATAR_URL} alt="Avatar" className="h-full w-full object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{name}</p>
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

      {/* MAIN CONTENT */}
      <div className="ml-64 flex min-h-screen min-w-0 flex-1 flex-col">
        {/* Render các file Page (FacilityApproval, DisputeManagement...) vào đây */}
        <Outlet />
      </div>
    </div>
  );
}