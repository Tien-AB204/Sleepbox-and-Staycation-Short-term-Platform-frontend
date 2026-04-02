import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { adminApiError, adminGetUserList, adminSuspendUser } from "../../services/adminService";

const TABS = [
  { id: "all", label: "Tất cả", role: null },
  { id: "guest", label: "Khách hàng", role: "Guest" },
  { id: "host", label: "Chủ kho", role: "Host" },
  { id: "staff", label: "Nhân viên", role: "Staff" },
  { id: "moderator", label: "Moderator", role: "Moderator" },
  { id: "admin", label: "Admin", role: "Admin" },
];

function pick(obj, a, b) {
  if (!obj) return undefined;
  return obj[a] ?? obj[b];
}

function normalizeAccountItem(raw) {
  return {
    userId: pick(raw, "userId", "UserId"),
    username: pick(raw, "username", "Username") ?? "",
    email: pick(raw, "email", "Email") ?? "",
    phone: pick(raw, "phone", "Phone") ?? "",
    role: pick(raw, "role", "Role") ?? "",
    status: pick(raw, "status", "Status") ?? "",
    isEmailVerified: pick(raw, "isEmailVerified", "IsEmailVerified"),
    lastLoginAt: pick(raw, "lastLoginAt", "LastLoginAt"),
    createdAt: pick(raw, "createdAt", "CreatedAt"),
    representativeName: pick(raw, "representativeName", "RepresentativeName") ?? "",
    verifiedStatus: pick(raw, "verifiedStatus", "VerifiedStatus") ?? "",
  };
}

function normalizeUserListResponse(data) {
  const d = data ?? {};
  const itemsRaw = d.items ?? d.Items ?? [];
  const items = (Array.isArray(itemsRaw) ? itemsRaw : []).map(normalizeAccountItem);
  return {
    items,
    totalCount: Number(d.totalCount ?? d.TotalCount ?? items.length) || 0,
    pageNumber: Number(d.pageNumber ?? d.PageNumber ?? 1) || 1,
    pageSize: Number(d.pageSize ?? d.PageSize ?? 20) || 20,
    totalPages: Number(d.totalPages ?? d.TotalPages ?? 1) || 1,
  };
}

const ROLE_VI = {
  Guest: "Khách hàng",
  Host: "Chủ kho",
  Staff: "Nhân viên",
  Moderator: "Moderator",
  Admin: "Admin",
};

const STATUS_VI = {
  Active: "Hoạt động",
  Suspended: "Đã tạm khóa",
  Inactive: "Không hoạt động",
};

function formatDt(iso) {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return String(iso);
    return d.toLocaleString("vi-VN");
  } catch {
    return String(iso);
  }
}

const PAGE_SIZE = 10;

export default function AdminUsers() {
  const { user } = useAuthContext();
  const token = user?.token;
  const myUserId = user?.userId ?? user?.UserId ?? user?.sub ?? user?.nameid;

  const [tab, setTab] = useState("all");
  const [searchDraft, setSearchDraft] = useState("");
  const [searchApplied, setSearchApplied] = useState("");
  const [userStatus, setUserStatus] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [paged, setPaged] = useState({ items: [], totalCount: 0, pageNumber: 1, pageSize: PAGE_SIZE, totalPages: 1 });

  const [suspendTarget, setSuspendTarget] = useState(null);
  const [suspendReason, setSuspendReason] = useState("");
  const [suspendBusy, setSuspendBusy] = useState(false);

  const roleParam = useMemo(() => TABS.find((t) => t.id === tab)?.role ?? null, [tab]);

  const load = useCallback(async () => {
    if (!token) {
      setError("Chưa đăng nhập.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError("");
    try {
      const params = {
        PageNumber: pageNumber,
        PageSize: PAGE_SIZE,
      };
      if (roleParam) params.Role = roleParam;
      if (userStatus) params.UserStatus = userStatus;
      const q = searchApplied.trim();
      if (q) params.SearchTerm = q;

      const { data } = await adminGetUserList(token, params);
      setPaged(normalizeUserListResponse(data));
    } catch (e) {
      setError(adminApiError(e, "Không tải được danh sách người dùng."));
      setPaged({ items: [], totalCount: 0, pageNumber: 1, pageSize: PAGE_SIZE, totalPages: 0 });
    } finally {
      setLoading(false);
    }
  }, [token, pageNumber, roleParam, userStatus, searchApplied]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    setPageNumber(1);
  }, [tab, userStatus]);

  const onSearchSubmit = (e) => {
    e.preventDefault();
    setSearchApplied(searchDraft.trim());
    setPageNumber(1);
  };

  const closeSuspend = () => {
    setSuspendTarget(null);
    setSuspendReason("");
  };

  const confirmSuspend = async () => {
    if (!suspendTarget || !token) return;
    const reason = suspendReason.trim();
    if (reason.length < 3) {
      setError("Lý do tạm khóa cần ít nhất 3 ký tự.");
      return;
    }
    setSuspendBusy(true);
    setError("");
    try {
      await adminSuspendUser(token, suspendTarget.userId, reason);
      closeSuspend();
      await load();
    } catch (e) {
      setError(adminApiError(e, "Tạm khóa tài khoản thất bại."));
    } finally {
      setSuspendBusy(false);
    }
  };

  return (
    <main className="flex-1 overflow-y-auto p-8">
      <header className="mb-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Quản lý người dùng</h2>
        <p className="mt-1 text-slate-500">Danh sách từ API Admin — lọc, phân trang, tạm khóa tài khoản.</p>
      </header>

      {error ? (
        <div className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">{error}</div>
      ) : null}

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-primary/10 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Tổng (trang hiện tại)</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{paged.totalCount}</p>
        </div>
        <div className="rounded-xl border border-primary/10 bg-white p-5 shadow-sm md:col-span-2">
          <form onSubmit={onSearchSubmit} className="flex flex-wrap items-end gap-3">
            <label className="min-w-[200px] flex-1">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">Tìm kiếm</span>
              <input
                value={searchDraft}
                onChange={(e) => setSearchDraft(e.target.value)}
                placeholder="Email, username..."
                className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
              />
            </label>
            <label className="w-full min-w-[160px] md:w-48">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">Trạng thái</span>
              <select
                value={userStatus}
                onChange={(e) => {
                  setUserStatus(e.target.value);
                  setPageNumber(1);
                }}
                className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-primary/40"
              >
                <option value="">Tất cả</option>
                <option value="Active">Hoạt động</option>
                <option value="Suspended">Đã tạm khóa</option>
                <option value="Inactive">Không hoạt động</option>
              </select>
            </label>
            <button
              type="submit"
              className="h-10 rounded-lg bg-primary px-4 text-sm font-bold text-white shadow-sm hover:opacity-90"
            >
              Áp dụng
            </button>
          </form>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-primary/10 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-primary/10 px-6 py-4">
          <div className="flex flex-wrap gap-1 rounded-lg bg-slate-100 p-1">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`rounded-md px-3 py-1.5 text-sm font-semibold transition-colors ${
                  tab === t.id ? "bg-white text-primary shadow-sm" : "font-medium text-slate-500 hover:text-primary"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => load()}
            className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            <span className="material-symbols-outlined text-[20px]">refresh</span>
            Làm mới
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead className="border-b border-slate-100 bg-slate-50 text-xs font-bold uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-6 py-3">Người dùng</th>
                <th className="px-6 py-3">Vai trò</th>
                <th className="px-6 py-3">Trạng thái</th>
                <th className="px-6 py-3">Đăng nhập gần nhất</th>
                <th className="px-6 py-3">Ngày tạo</th>
                <th className="px-6 py-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    Đang tải…
                  </td>
                </tr>
              ) : paged.items.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    Không có bản ghi.
                  </td>
                </tr>
              ) : (
                paged.items.map((row) => {
                  const name = row.representativeName?.trim() || row.username || row.email || "—";
                  const canSuspend =
                    row.status === "Active" && row.userId && String(row.userId) !== String(myUserId ?? "");
                  return (
                    <tr key={row.userId} className="border-b border-slate-50 hover:bg-slate-50/80">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-900">{name}</div>
                        <div className="text-xs text-slate-500">{row.email || "—"}</div>
                        <div className="text-xs text-slate-400">{row.phone || ""}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                          {ROLE_VI[row.role] ?? row.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                            row.status === "Active"
                              ? "text-emerald-700"
                              : row.status === "Suspended"
                                ? "text-rose-700"
                                : "text-slate-600"
                          }`}
                        >
                          <span
                            className={`inline-block size-2 rounded-full ${
                              row.status === "Active"
                                ? "bg-emerald-500"
                                : row.status === "Suspended"
                                  ? "bg-rose-500"
                                  : "bg-slate-300"
                            }`}
                          />
                          {STATUS_VI[row.status] ?? row.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{formatDt(row.lastLoginAt)}</td>
                      <td className="px-6 py-4 text-slate-600">{formatDt(row.createdAt)}</td>
                      <td className="px-6 py-4 text-right">
                        {canSuspend ? (
                          <button
                            type="button"
                            onClick={() => {
                              setSuspendTarget(row);
                              setSuspendReason("");
                            }}
                            className="rounded-lg border border-rose-200 bg-white px-3 py-1.5 text-xs font-bold text-rose-700 hover:bg-rose-50"
                          >
                            Tạm khóa
                          </button>
                        ) : (
                          <span className="text-xs text-slate-400">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 px-6 py-4">
          <p className="text-sm text-slate-500">
            Trang {paged.pageNumber} / {Math.max(1, paged.totalPages)} — {paged.totalCount} người dùng
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={pageNumber <= 1 || loading}
              onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium disabled:opacity-40"
            >
              Trước
            </button>
            <button
              type="button"
              disabled={pageNumber >= paged.totalPages || loading}
              onClick={() => setPageNumber((p) => p + 1)}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium disabled:opacity-40"
            >
              Sau
            </button>
          </div>
        </div>
      </div>

      {suspendTarget ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-bold text-slate-900">Tạm khóa tài khoản</h3>
            <p className="mt-2 text-sm text-slate-600">
              <span className="font-semibold">{suspendTarget.username || suspendTarget.email}</span>
            </p>
            <label className="mt-4 block">
              <span className="text-sm font-semibold text-slate-700">Lý do (bắt buộc)</span>
              <textarea
                value={suspendReason}
                onChange={(e) => setSuspendReason(e.target.value)}
                rows={4}
                className="mt-1 w-full rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                placeholder="Nhập lý do tối thiểu 3 ký tự…"
              />
            </label>
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={closeSuspend}
                disabled={suspendBusy}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={confirmSuspend}
                disabled={suspendBusy}
                className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-bold text-white hover:opacity-90 disabled:opacity-50"
              >
                {suspendBusy ? "Đang xử lý…" : "Xác nhận tạm khóa"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
