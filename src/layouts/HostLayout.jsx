import React from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

const navItems = [
  { to: "/host/dashboard", label: "Bảng điều khiển", icon: "dashboard" },
  { to: "/host/bookings", label: "Đặt chỗ", icon: "book_online" },
  { to: "/host/calendar", label: "Lịch", icon: "calendar_today" },
  { to: "/host/facilities", label: "Cơ sở", icon: "apartment" },
  { to: "/host/sleepboxes", label: "Sleepbox", icon: "inventory_2" },
  { to: "/host/pricing", label: "Giá", icon: "sell" },
  { to: "/host/staff", label: "Nhân viên", icon: "group" },
  { to: "/host/statistics", label: "Thống kê", icon: "monitoring" },
  { to: "/host/messages", label: "Tin nhắn", icon: "chat_bubble" },
  { to: "/host/disputes", label: "Tranh chấp", icon: "gavel" },
];

const HostLayout = () => {
  const { user } = useAuthContext();
  const displayName = user?.email
    ? user.email.split("@")[0].replace(/\./g, " ")
    : "Host";
  const roleLabel = user?.role === "host" ? "Host" : "Khách (xem trước)";

  return (
    <div className="flex min-h-screen bg-background-light font-display text-slate-900">
      <aside className="fixed inset-y-0 left-0 z-20 flex w-64 flex-col border-r border-primary/10 bg-white">
        <div className="flex items-center gap-3 p-6">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-white">
            <span className="material-symbols-outlined">grid_view</span>
          </div>
          <div>
            <h1 className="text-lg font-bold leading-tight text-primary">BoxHub</h1>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
              Host Center
            </p>
          </div>
        </div>

        <nav className="host-custom-scrollbar flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-2">
          {navItems.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                [
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors",
                  isActive
                    ? "bg-primary text-white"
                    : "text-slate-600 hover:bg-primary/10 hover:text-primary",
                ].join(" ")
              }
            >
              <span className="material-symbols-outlined">{icon}</span>
              <span className="font-medium">{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-primary/5 p-4">
          <Link
            to="/"
            className="mb-3 flex w-full items-center justify-center gap-2 rounded-xl border border-primary/20 bg-primary/5 py-2.5 text-sm font-bold text-primary transition-colors hover:bg-primary/10"
          >
            <span className="material-symbols-outlined text-lg">switch_account</span>
            Về chế độ khách
          </Link>
          <div className="flex items-center gap-3 rounded-xl bg-primary/5 p-2">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary">
              {displayName.slice(0, 1).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold capitalize">{displayName}</p>
              <p className="truncate text-xs text-slate-500">{roleLabel}</p>
            </div>
            <span className="material-symbols-outlined text-sm text-slate-400">unfold_more</span>
          </div>
        </div>
      </aside>

      <div className="ml-64 flex min-h-screen min-w-0 flex-1 flex-col">
        <Outlet />
      </div>
    </div>
  );
};

export default HostLayout;
