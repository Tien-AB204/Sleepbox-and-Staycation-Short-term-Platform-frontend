import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminErrorAlert, AdminPage, AdminPageHeader } from "../../components/admin/AdminPageChrome";
import {
  adminBtnPrimary,
  adminBtnSecondary,
  adminCard,
  adminInput,
  adminLabel,
  adminTableFooter,
  adminTableWrap,
  adminThead,
} from "../../components/admin/adminUi";
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

const STATUS_DISPLAY = {
  Active: "In good standing",
  Suspended: "Access restricted",
  Inactive: "Not in use",
};

function displayAccountStatus(status) {
  if (!status) return "—";
  return STATUS_DISPLAY[status] ?? "—";
}

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
      setError("Not signed in.");
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
      setError(adminApiError(e, "Could not load moderators."));
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
    <AdminPage>
      <AdminPageHeader
        title="Moderators"
        description="People who can review listings and moderate the platform."
        actions={
          <>
            <button type="button" onClick={() => navigate("/admin/admins/new")} className={adminBtnSecondary}>
              Create admin
            </button>
            <button type="button" onClick={() => navigate("/admin/moderators/new")} className={`${adminBtnPrimary} gap-2`}>
              <span className="material-symbols-outlined text-[18px]">person_add</span>
              Add moderator
            </button>
          </>
        }
      />

      <AdminErrorAlert>{error}</AdminErrorAlert>

      <div className={`${adminCard} mb-6 p-5 sm:p-6`}>
        <form onSubmit={onSearch} className="flex flex-wrap items-end gap-3">
          <label className="min-w-[220px] flex-1">
            <span className={adminLabel}>Search</span>
            <input
              value={searchDraft}
              onChange={(e) => setSearchDraft(e.target.value)}
              placeholder="Email, username…"
              className={adminInput}
            />
          </label>
          <button type="submit" className={adminBtnPrimary}>
            Search
          </button>
          <button type="button" onClick={() => load()} className={`${adminBtnSecondary} gap-1`}>
            <span className="material-symbols-outlined text-[18px]">refresh</span>
            Refresh
          </button>
        </form>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className={`${adminCard} p-5 sm:p-6`}>
          <p className="text-sm font-medium text-slate-500">Total moderators</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{paged.totalCount}</p>
        </div>
      </div>

      <section className={adminTableWrap}>
        <div className="border-b border-slate-200 px-6 py-4">
          <h2 className="text-base font-bold text-slate-900">Directory</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className={adminThead}>
              <tr>
                <th className="px-6 py-3">Account</th>
                <th className="px-6 py-3">Phone</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                    Loading…
                  </td>
                </tr>
              ) : paged.items.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                    No moderators yet.
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
                        <span className="text-xs font-semibold text-slate-700">{displayAccountStatus(row.status)}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => navigate(`/admin/moderators/${row.userId}`, { state: { row } })}
                          className="rounded-lg border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-bold text-primary hover:bg-primary/10"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        <div className={adminTableFooter}>
          <p className="text-sm text-slate-500">
            Page {paged.pageNumber} / {Math.max(1, paged.totalPages)}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={pageNumber <= 1 || loading}
              onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
              className={adminBtnSecondary}
            >
              Previous
            </button>
            <button
              type="button"
              disabled={pageNumber >= paged.totalPages || loading}
              onClick={() => setPageNumber((p) => p + 1)}
              className={adminBtnSecondary}
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </AdminPage>
  );
}
