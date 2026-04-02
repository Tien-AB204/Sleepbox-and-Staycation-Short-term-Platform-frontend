import React from "react";
import { Link } from "react-router-dom";

const links = [
  { to: "/admin/pricing/platform-fee", label: "Phí nền tảng", desc: "GET/POST platform-fee-config, timeline, deactivate" },
  { to: "/admin/pricing/system-rules", label: "Quy tắc giá hệ thống", desc: "system-price-rules" },
  { to: "/admin/pricing/box-limits", label: "Giới hạn giá loại box", desc: "box-type-price-limits" },
  { to: "/admin/pricing/addons", label: "Dịch vụ add-on", desc: "addon-services" },
  { to: "/admin/admins/new", label: "Tạo tài khoản Admin", desc: "POST /Admin/Register" },
  { to: "/admin/users", label: "Người dùng", desc: "Danh sách & tạm khóa" },
  { to: "/admin/moderators", label: "Moderator", desc: "Danh sách & chỉnh sửa" },
];

export default function AdminSettings() {
  return (
    <main className="mx-auto max-w-3xl flex-1 p-8">
      <header className="mb-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Cài đặt & cấu hình</h2>
        <p className="mt-1 text-slate-500">
          Các thao tác cấu hình thực tế nằm ở từng trang API bên dưới. Form “Lưu thay đổi” cũ đã thay bằng liên kết trực tiếp tới backend.
        </p>
      </header>

      <ul className="space-y-3">
        {links.map(({ to, label, desc }) => (
          <li key={to}>
            <Link
              to={to}
              className="flex flex-col rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition-colors hover:border-primary/30 hover:bg-primary/5"
            >
              <span className="font-bold text-primary">{label}</span>
              <span className="mt-1 text-sm text-slate-500">{desc}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
