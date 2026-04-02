import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { adminApiError, adminGetUserList } from "../../services/adminService";

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
    representativeName: pick(raw, "representativeName", "RepresentativeName") ?? "",
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

const STATUS_VI = {
  Active: "Hoạt động",
  Suspended: "Đã tạm khóa",
  Inactive: "Không hoạt động",
};

const PAGE_SIZE = 12;

export default function AdminModerators() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const token = user?.token;

  const [searchDraft, setSearchDraft] = useState("");
  const [searchApplied, setSearchApplied] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [paged, setPaged] = useState({ items: [], totalCount: 0, totalPages: 1 });

  const load = useCallback(async () => {
    if (!token) {
      setError("Chưa đăng nhập.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError("");
    try {
      const params = { Role: "Moderator", PageNumber: pageNumber, PageSize: PAGE_SIZE };
      const q = searchApplied.trim();
      if (q) params.SearchTerm = q;
      const { data } = await adminGetUserList(token, params);
      setPaged(normalizeUserListResponse(data));
    } catch (e) {
      setError(adminApiError(e, "Không tải được danh sách moderator."));
      setPaged({ items: [], totalCount: 0, totalPages: 0 });
    } finally {
      setLoading(false);
    }
  }, [token, pageNumber, searchApplied]);

  useEffect(() => {
    load();
  }, [load]);

  const onSearch = (e) => {
    e.preventDefault();
    setSearchApplied(searchDraft.trim());
    setPageNumber(1);
  };

  return (
    <main className="flex-1 overflow-y-auto p-8">
      <header className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <h2 className="text-[30px] font-extrabold tracking-tight text-primary">Moderator</h2>
          <p className="mt-2 text-slate-500">Danh sách tài khoản vai trò Moderator từ API.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => navigate("/admin/admins/new")}
            className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50"
          >
            Tạo Admin
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/moderators/new")}
            className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-opacity hover:opacity-90"
          >
            <span className="material-symbols-outlined text-[18px]">person_add</span>
            Thêm Moderator
          </button>
        </div>
      </header>

      {error ? (
        <div className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">{error}</div>
      ) : null}

      <div className="mb-6 rounded-xl border border-primary/10 bg-white p-4 shadow-sm">
        <form onSubmit={onSearch} className="flex flex-wrap items-end gap-3">
          <label className="min-w-[220px] flex-1">
            <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">Tìm kiếm</span>
            <input
              value={searchDraft}
              onChange={(e) => setSearchDraft(e.target.value)}
              placeholder="Email, username…"
              className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
            />
          </label>
          <button
            type="submit"
            className="h-10 rounded-lg bg-primary px-4 text-sm font-bold text-white shadow-sm hover:opacity-90"
          >
            Tìm
          </button>
          <button
            type="button"
            onClick={() => load()}
            className="flex h-10 items-center gap-1 rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            <span className="material-symbols-outlined text-[18px]">refresh</span>
            Làm mới
          </button>
        </form>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Tổng moderator</p>
          <h3 className="mt-1 text-3xl font-extrabold text-slate-900">{paged.totalCount}</h3>
        </div>
      </div>

      <section className="overflow-hidden rounded-xl border border-primary/10 bg-white shadow-sm">
        <div className="border-b border-primary/10 px-6 py-4">
          <h4 className="text-lg font-bold text-slate-900">Danh sách</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-slate-100 bg-slate-50 text-xs font-bold uppercase text-slate-500">
              <tr>
                <th className="px-6 py-3">Tài khoản</th>
                <th className="px-6 py-3">Điện thoại</th>
                <th className="px-6 py-3">Trạng thái</th>
                <th className="px-6 py-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                    Đang tải…
                  </td>
                </tr>
              ) : paged.items.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                    Chưa có moderator.
                  </td>
                </tr>
              ) : (
                paged.items.map((row) => {
                  const label = row.representativeName?.trim() || row.username || row.email;
                  return (
                    <tr key={row.userId} className="border-b border-slate-50 hover:bg-slate-50/80">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-900">{label}</div>
                        <div className="text-xs text-slate-500">{row.email}</div>
                        <div className="text-xs text-slate-400">{row.username}</div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{row.phone || "—"}</td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-semibold text-slate-700">{STATUS_VI[row.status] ?? row.status}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => navigate(`/admin/moderators/${row.userId}`, { state: { row } })}
                          className="rounded-lg border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-bold text-primary hover:bg-primary/10"
                        >
                          Sửa
                        </button>
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
            Trang {paged.pageNumber} / {Math.max(1, paged.totalPages)}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={pageNumber <= 1 || loading}
              onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm disabled:opacity-40"
            >
              Trước
            </button>
            <button
              type="button"
              disabled={pageNumber >= paged.totalPages || loading}
              onClick={() => setPageNumber((p) => p + 1)}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm disabled:opacity-40"
            >
              Sau
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
