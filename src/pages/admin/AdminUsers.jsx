import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AdminErrorAlert, AdminPage, AdminPageHeader } from "../../components/admin/AdminPageChrome";
import {
  adminBtnPrimary,
  adminBtnSecondary,
  adminCard,
  adminInput,
  adminLabel,
  adminModalPanel,
  adminSelect,
  adminTableFooter,
  adminTableToolbar,
  adminTableWrap,
  adminTextarea,
  adminThead,
} from "../../components/admin/adminUi";
import { useAuthContext } from "../../contexts/AuthContext";
import { adminApiError, adminGetUserList, adminSuspendUser } from "../../services/adminService";

const TABS = [
  { id: "all", label: "All", role: null },
  { id: "guest", label: "Guest", role: "Guest" },
  { id: "host", label: "Host", role: "Host" },
  { id: "staff", label: "Staff", role: "Staff" },
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

/** UI copy only — API still uses Guest, Host, Active, … */
const ROLE_DISPLAY = {
  Guest: "Guest",
  Host: "Host",
  Staff: "Staff",
  Moderator: "Moderator",
  Admin: "Admin",
};

const STATUS_DISPLAY = {
  Active: "In good standing",
  Suspended: "Access restricted",
  Inactive: "Not in use",
};

function displayRole(role) {
  if (!role) return "—";
  return ROLE_DISPLAY[role] ?? "—";
}

function displayAccountStatus(status) {
  if (!status) return "—";
  return STATUS_DISPLAY[status] ?? "—";
}

function formatDt(iso) {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "—";
    return d.toLocaleString("en-US");
  } catch {
    return "—";
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
      setError("Not signed in.");
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
      setError(adminApiError(e, "Could not load users."));
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
      setError("Suspension reason must be at least 3 characters.");
      return;
    }
    setSuspendBusy(true);
    setError("");
    try {
      await adminSuspendUser(token, suspendTarget.userId, reason);
      closeSuspend();
      await load();
    } catch (e) {
      setError(adminApiError(e, "Failed to suspend account."));
    } finally {
      setSuspendBusy(false);
    }
  };

  return (
    <AdminPage>
      <AdminPageHeader
        title="User management"
        description="Search, filter, and manage accounts. Suspend access when needed."
      />

      <AdminErrorAlert>{error}</AdminErrorAlert>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className={`${adminCard} p-5 sm:p-6`}>
          <p className="text-sm font-medium text-slate-500">Total (current query)</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{paged.totalCount}</p>
        </div>
        <div className={`${adminCard} p-5 sm:p-6 md:col-span-2`}>
          <form onSubmit={onSearchSubmit} className="flex flex-wrap items-end gap-3">
            <label className="min-w-[200px] flex-1">
              <span className={adminLabel}>Search</span>
              <input
                value={searchDraft}
                onChange={(e) => setSearchDraft(e.target.value)}
                placeholder="Email, username…"
                className={adminInput}
              />
            </label>
            <label className="w-full min-w-[160px] md:w-48">
              <span className={adminLabel}>Status</span>
              <select
                value={userStatus}
                onChange={(e) => {
                  setUserStatus(e.target.value);
                  setPageNumber(1);
                }}
                className={adminSelect}
              >
                <option value="">All</option>
                <option value="Active">{STATUS_DISPLAY.Active}</option>
                <option value="Suspended">{STATUS_DISPLAY.Suspended}</option>
                <option value="Inactive">{STATUS_DISPLAY.Inactive}</option>
              </select>
            </label>
            <button type="submit" className={adminBtnPrimary}>
              Apply
            </button>
          </form>
        </div>
      </div>

      <div className={adminTableWrap}>
        <div className={adminTableToolbar}>
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
          <button type="button" onClick={() => load()} className={`${adminBtnSecondary} gap-2`}>
            <span className="material-symbols-outlined text-[20px]">refresh</span>
            Refresh
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead className={adminThead}>
              <tr>
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Last login</th>
                <th className="px-6 py-3">Created</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    Loading…
                  </td>
                </tr>
              ) : paged.items.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    No records found.
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
                          {displayRole(row.role)}
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
                          {displayAccountStatus(row.status)}
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
                            Suspend
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

        <div className={adminTableFooter}>
          <p className="text-sm text-slate-500">
            Page {paged.pageNumber} / {Math.max(1, paged.totalPages)} — {paged.totalCount} users
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
      </div>

      {suspendTarget ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className={adminModalPanel}>
            <h3 className="text-lg font-bold text-slate-900">Suspend account</h3>
            <p className="mt-2 text-sm text-slate-600">
              <span className="font-semibold">{suspendTarget.username || suspendTarget.email}</span>
            </p>
            <label className="mt-4 block">
              <span className="text-sm font-semibold text-slate-700">Reason (required)</span>
              <textarea
                value={suspendReason}
                onChange={(e) => setSuspendReason(e.target.value)}
                rows={4}
                className={`${adminTextarea} mt-2`}
                placeholder="Enter a reason (at least 3 characters)…"
              />
            </label>
            <div className="mt-6 flex justify-end gap-2">
              <button type="button" onClick={closeSuspend} disabled={suspendBusy} className={adminBtnSecondary}>
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmSuspend}
                disabled={suspendBusy}
                className="inline-flex h-10 items-center justify-center rounded-lg bg-rose-600 px-4 text-sm font-bold text-white shadow-sm transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {suspendBusy ? "Processing…" : "Confirm suspend"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </AdminPage>
  );
}
