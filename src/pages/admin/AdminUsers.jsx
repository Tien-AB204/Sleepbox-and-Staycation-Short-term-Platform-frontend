import React, { useState } from "react";

const TABS = [
  { id: "all", label: "Tất cả" },
  { id: "guest", label: "Khách hàng" },
  { id: "host", label: "Chủ kho" },
  { id: "staff", label: "Nhân viên" },
];

const U1 =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCc9H8x2322DwmB-Dw-8JRZ2jPNP5SlYsu5jKcG0KFnAbRLesltwgtCjc0l0fZXXaJL4BCU602GXBU-k2pYVKkRKGkPouN-J9EFZhAluMrkwU8uC8wygcWQQrkntMPjNYvNZ39PRHfHxtmzMbkMHCzJ08V_ODFq9q0hPQwT_IGqQuHBW6ACoelk2RjtqqnNfHa1o1BL3IutiYBwKJuTUhRd7oErboD0sM2Kpt95FTz2b7wp1p3183JFqjwfzcS_wnsOKoIwq4egOfCr";
const U2 =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDBUZ_Si0V3nB6ATn4QLt7RuoZNVloDmUjAHIk4bTBpQt3lrrEWZ4zDERZIsFD2xvyaRBW4WORXIiqQp9jb8wos2YLbqTOf-XaVaeOe5OoLiYnzApkNutVsO2OTkKudJXzE2PiZYNxq_GMGYNcR3EttCHeCSVjLPmXu-HBvn4lm33EJTJTDY3byYnC-Tch9RfQYPvYMytlHBHCWynSv5R-E-xKjMVuT3O8kfNr4k39MT23GM3vTzTwEw_baDwAn3DAoqF626XOYQMBQ";
const U3 =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC7QG8_BdqkK33hVZkCdo4nFvkJv50yfNQGVe_Z2BR3R0CSQxio-CMGR_icWO4fveZyf_Q4Bu4gQSgJIdLtr-vVTnvIEl3EtNDKIpuX4KawnFJzDWr4KfZ8muRqLEa4ZpeiRyawNuHsZa1kscvkNwo88Wvqv1bvHNeIgB1vLS9p87xRkfvRSXhw0Z_3JHtSXp6Iuzbr9NvOUTo_RuOf9CIBdgxTLztTRTfkjmIx1plGFwk587iw4oWCN_HJ-EijKPU6RllWHG0scYcR";

const ROWS = [
  {
    name: "Nguyễn Văn A",
    email: "vana@example.com",
    avatarUrl: U1,
    role: "Chủ kho",
    roleClass: "bg-blue-100 text-blue-700",
    status: "Hoạt động",
    statusDot: "bg-emerald-500",
    date: "12/03/2024",
  },
  {
    name: "Trần Thị B",
    email: "thib@example.com",
    avatarUrl: U2,
    role: "Khách hàng",
    roleClass: "bg-purple-100 text-purple-700",
    status: "Chờ xác minh",
    statusDot: "bg-amber-500",
    date: "10/03/2024",
  },
  {
    name: "Lê Văn C",
    email: "vanc@example.com",
    avatarUrl: U3,
    role: "Nhân viên",
    roleClass: "bg-slate-100 text-slate-700",
    status: "Đã khóa",
    statusDot: "bg-red-500",
    date: "05/03/2024",
    locked: true,
  },
];

export default function AdminUsers() {
  const [tab, setTab] = useState("all");

  return (
    <main className="flex-1 overflow-y-auto p-8">
      <header className="mb-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Quản lý người dùng</h2>
        <p className="mt-1 text-slate-500">Theo dõi và quản lý tất cả các phân khúc người dùng trên hệ thống.</p>
      </header>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm">
          <p className="mb-1 text-sm font-medium text-slate-500">Tổng người dùng</p>
          <div className="flex items-end gap-3">
            <h3 className="text-3xl font-bold">12,840</h3>
            <span className="mb-1 flex items-center text-sm font-semibold text-emerald-600">
              <span className="material-symbols-outlined text-xs">arrow_upward</span>5.2%
            </span>
          </div>
        </div>
        <div className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm">
          <p className="mb-1 text-sm font-medium text-slate-500">Đăng ký mới tháng này</p>
          <div className="flex items-end gap-3">
            <h3 className="text-3xl font-bold">1,250</h3>
            <span className="mb-1 flex items-center text-sm font-semibold text-emerald-600">
              <span className="material-symbols-outlined text-xs">arrow_upward</span>8.4%
            </span>
          </div>
        </div>
        <div className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm">
          <p className="mb-1 text-sm font-medium text-slate-500">Tỷ lệ tăng trưởng</p>
          <div className="flex items-end gap-3">
            <h3 className="text-3xl font-bold">+12.5%</h3>
            <span className="mb-1 flex items-center text-sm font-semibold text-emerald-600">
              <span className="material-symbols-outlined text-xs">arrow_upward</span>1.2%
            </span>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-primary/10 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-primary/10 px-6 py-4">
          <div className="flex gap-1 rounded-lg bg-slate-100 p-1">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`rounded-md px-4 py-1.5 text-sm font-semibold transition-colors ${
                  tab === t.id
                    ? "bg-white text-primary shadow-sm"
                    : "font-medium text-slate-500 hover:text-primary"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              <span className="material-symbols-outlined text-[20px]">file_download</span>
              Xuất báo cáo
            </button>
            <button
              type="button"
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90"
            >
              <span className="material-symbols-outlined text-[20px]">person_add</span>
              Thêm người dùng
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 border-b border-primary/10 p-6">
          <div className="relative min-w-[300px] flex-1">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              search
            </span>
            <input
              type="search"
              placeholder="Tìm kiếm theo tên, email hoặc ID..."
              className="w-full rounded-lg border-none bg-slate-50 py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <select className="rounded-lg border-none bg-slate-50 pr-10 text-sm focus:ring-2 focus:ring-primary/20">
              <option>Trạng thái: Tất cả</option>
              <option>Đang hoạt động</option>
              <option>Đã khóa</option>
              <option>Đang chờ xác minh</option>
            </select>
            <select className="rounded-lg border-none bg-slate-50 pr-10 text-sm focus:ring-2 focus:ring-primary/20">
              <option>Khu vực: Toàn quốc</option>
              <option>Hồ Chí Minh</option>
              <option>Hà Nội</option>
              <option>Đà Nẵng</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-primary/10 bg-slate-50">
                <th className="px-6 py-4">
                  <input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary" />
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Người dùng</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Vai trò</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Trạng thái</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Ngày tham gia</th>
                <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              {ROWS.map((row) => (
                <tr key={row.email} className="transition-colors hover:bg-slate-50/50">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-slate-200">
                        <img src={row.avatarUrl} alt="" className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <p className="font-semibold leading-none text-slate-900">{row.name}</p>
                        <p className="mt-1 text-xs text-slate-500">{row.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${row.roleClass}`}>
                      {row.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${row.statusDot}`} />
                      <span className="text-sm font-medium text-slate-700">{row.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{row.date}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button type="button" className="p-2 text-slate-400 hover:text-primary" title="Chỉnh sửa">
                        <span className="material-symbols-outlined text-[20px]">edit_square</span>
                      </button>
                      <button type="button" className="p-2 text-slate-400 hover:text-red-500" title="Khóa tài khoản">
                        <span className="material-symbols-outlined text-[20px]">
                          {row.locked ? "lock_open" : "block"}
                        </span>
                      </button>
                      <button type="button" className="p-2 text-slate-400 hover:text-slate-600" title="Xem chi tiết">
                        <span className="material-symbols-outlined text-[20px]">more_vert</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between bg-slate-50/50 px-6 py-4">
          <p className="text-sm text-slate-500">
            Đang hiển thị <span className="font-semibold text-slate-900">1-3</span> trên{" "}
            <span className="font-semibold text-slate-900">12,840</span> người dùng
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              className="rounded-lg border border-slate-200 p-2 opacity-50"
              disabled
              aria-disabled
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary font-semibold text-white"
            >
              1
            </button>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 hover:bg-white"
            >
              2
            </button>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 hover:bg-white"
            >
              3
            </button>
            <span className="flex items-center px-2 text-slate-400">...</span>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 hover:bg-white"
            >
              428
            </button>
            <button type="button" className="rounded-lg border border-slate-200 p-2 hover:bg-white">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4 rounded-xl border border-primary/20 bg-primary/5 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-4">
          <span className="rounded bg-primary px-2 py-1 text-xs font-bold text-white">2 đã chọn</span>
          <p className="text-sm font-medium text-primary">Thao tác hàng loạt cho người dùng đã chọn</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="button" className="text-sm font-semibold text-red-600 hover:text-red-700">
            Khóa đã chọn
          </button>
          <button type="button" className="text-sm font-semibold text-primary hover:opacity-80">
            Xác minh tài khoản
          </button>
          <button type="button" className="text-sm font-semibold text-slate-600 hover:text-slate-800">
            Gán vai trò…
          </button>
        </div>
      </div>
    </main>
  );
}
