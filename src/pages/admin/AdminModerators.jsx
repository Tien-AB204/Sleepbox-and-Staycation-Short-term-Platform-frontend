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

/** BE may expose account state as status, AccountStatus, UserStatus, etc. */
function pickAccountStatus(raw) {
  if (!raw) return "";
  const s =
    pick(raw, "status", "Status") ??
    pick(raw, "accountStatus", "AccountStatus") ??
    pick(raw, "userStatus", "UserStatus");
  if (s == null) return "";
  return String(s);
}

function normalizeAccountItem(raw) {
  return {
    userId: pick(raw, "userId", "UserId"),
    username: pick(raw, "username", "Username") ?? "",
    email: pick(raw, "email", "Email") ?? "",
    phone: pick(raw, "phone", "Phone") ?? "",
    role: pick(raw, "role", "Role") ?? "",
    status: pickAccountStatus(raw),
    representativeName: pick(raw, "representativeName", "RepresentativeName") ?? "",
    firstName: pick(raw, "firstName", "FirstName") ?? "",
    lastName: pick(raw, "lastName", "LastName") ?? "",
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

/** Legal / display name when BE sends first & last (or only representativeName). */
function displayLegalName(row) {
  const f = (row.firstName || "").trim();
  const l = (row.lastName || "").trim();
  const combined = [f, l].filter(Boolean).join(" ").trim();
  if (combined) return combined;
  const rep = (row.representativeName || "").trim();
  if (rep) return rep;
  return "";
}

/** Login identity: @username with email underneath when both exist. */
function accountPrimaryLine(row) {
  const u = (row.username || "").trim();
  const e = (row.email || "").trim();
  if (u) return `@${u}`;
  return e || "—";
}

function accountSecondaryLine(row) {
  const u = (row.username || "").trim();
  const e = (row.email || "").trim();
  if (u && e) return e;
  return "";
}

function statusPillClass(rawStatus) {
  const k = String(rawStatus || "").toLowerCase();
  if (k.includes("suspend")) return "border-rose-200/80 bg-rose-50 text-rose-800";
  if (k.includes("inactive")) return "border-slate-200 bg-slate-100 text-slate-700";
  if (!rawStatus) return "border-slate-200 bg-slate-50 text-slate-500";
  return "border-emerald-200/80 bg-emerald-50 text-emerald-900";
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
        <div className="border-b border-slate-200 px-5 py-3.5 sm:px-6">
          <h2 className="text-base font-bold text-slate-900">Directory</h2>
        </div>
        <div className="overflow-x-auto">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
            <table className="w-full table-fixed text-left text-sm">
              <colgroup>
                <col className="w-[22%]" />
                <col className="w-[30%] sm:w-[28%]" />
                <col className="w-[16%]" />
                <col className="w-[17%]" />
                <col className="w-[15%]" />
              </colgroup>
              <thead className={adminThead}>
                <tr>
                  <th className="px-0 py-2.5 pr-3">Name</th>
                  <th className="px-0 py-2.5 pr-3">Account</th>
                  <th className="px-0 py-2.5 pr-3">Phone</th>
                  <th className="px-0 py-2.5 pr-3">Status</th>
                  <th className="px-0 py-2.5 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-0 py-10 text-center text-slate-500">
                      Loading…
                    </td>
                  </tr>
                ) : paged.items.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-0 py-10 text-center text-slate-500">
                      No moderators yet.
                    </td>
                  </tr>
                ) : (
                  paged.items.map((row) => {
                    const legal = displayLegalName(row);
                    const primary = accountPrimaryLine(row);
                    const secondary = accountSecondaryLine(row);
                    const statusLabel = displayAccountStatus(row.status);
                    const statusPill =
                      statusLabel === "—"
                        ? "border-slate-200 bg-slate-50 text-slate-500"
                        : statusPillClass(row.status);
                    return (
                      <tr key={row.userId} className="border-b border-slate-100 align-middle hover:bg-slate-50/70">
                        <td className="px-0 py-2.5 pr-3">
                          <div className="min-w-0 truncate font-medium text-slate-900" title={legal || undefined}>
                            {legal || "—"}
                          </div>
                        </td>
                        <td className="px-0 py-2.5 pr-3">
                          <div className="min-w-0">
                            <div className="truncate font-semibold text-slate-900" title={primary}>
                              {primary}
                            </div>
                            {secondary ? (
                              <div className="truncate text-xs text-slate-500" title={secondary}>
                                {secondary}
                              </div>
                            ) : null}
                          </div>
                        </td>
                        <td className="px-0 py-2.5 pr-3">
                          <span className="block truncate font-medium tabular-nums text-slate-700">
                            {row.phone?.trim() || "—"}
                          </span>
                        </td>
                        <td className="px-0 py-2.5 pr-3">
                          <span
                            className={`inline-flex max-w-full items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold leading-tight ${statusPill}`}
                            title={statusLabel}
                          >
                            <span className="truncate">{statusLabel}</span>
                          </span>
                        </td>
                        <td className="px-0 py-2.5 text-left">
                          <button
                            type="button"
                            onClick={() => navigate(`/admin/moderators/${row.userId}`, { state: { row } })}
                            className="inline-flex rounded-lg border border-primary/25 bg-primary/5 px-3 py-1.5 text-xs font-bold text-primary transition-colors hover:bg-primary/10"
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
