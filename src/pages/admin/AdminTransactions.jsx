import React from "react";
import { Link } from "react-router-dom";

export default function AdminTransactions() {
  return (
    <main className="flex-1 overflow-y-auto p-8">
      <header className="mb-6">
        <h2 className="text-2xl font-extrabold text-slate-900">Giao dịch</h2>
        <p className="mt-2 text-slate-600">
          OpenAPI hiện không có nhóm endpoint admin riêng cho lịch sử giao dịch / thanh toán. Khi backend bổ sung, có thể gắn trang này vào danh sách đơn hoặc report.
        </p>
      </header>
      <div className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
        Trong lúc chờ API: dùng{" "}
        <Link className="font-bold text-primary underline" to="/admin/users">
          quản lý người dùng
        </Link>{" "}
        và{" "}
        <Link className="font-bold text-primary underline" to="/admin/pricing/platform-fee">
          phí nền tảng
        </Link>{" "}
        cho các thao tác đã có trên BE.
      </div>
    </main>
  );
}
