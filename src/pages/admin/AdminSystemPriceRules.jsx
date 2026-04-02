import React, { useCallback, useEffect, useState } from "react";
import { AdminErrorAlert, AdminPage, AdminPageHeader, AdminSection } from "../../components/admin/AdminPageChrome";
import {
  adminBtnPrimary,
  adminBtnSecondary,
  adminInput,
  adminSelect,
  adminTableFooter,
  adminTableWrap,
  adminThead,
} from "../../components/admin/adminUi";
import { useAuthContext } from "../../contexts/AuthContext";
import {
  adminApiError,
  adminCreateSystemPriceRule,
  adminDeleteSystemPriceRule,
  adminGetSystemPriceRules,
  adminToggleSystemPriceRule,
  adminUpdateSystemPriceRule,
} from "../../services/adminService";

function normalizeRules(data) {
  const d = data ?? {};
  const items = d.items ?? d.Items ?? (Array.isArray(d) ? d : []);
  return {
    items: Array.isArray(items) ? items : [],
    totalCount: d.totalCount ?? d.TotalCount ?? items.length,
    pageNumber: d.pageNumber ?? d.PageNumber ?? 1,
    pageSize: d.pageSize ?? d.PageSize ?? 20,
    totalPages: d.totalPages ?? d.TotalPages ?? 1,
  };
}

function ruleId(row) {
  return row?.ruleId ?? row?.RuleId ?? row?.id ?? row?.Id;
}

const PRICING_MODE_DISPLAY = {
  HOURLY: "Hourly",
  OVERNIGHT: "Overnight",
};

function displayPricingMode(mode) {
  if (!mode) return "—";
  return PRICING_MODE_DISPLAY[mode] ?? "—";
}

export default function AdminSystemPriceRules() {
  const { user } = useAuthContext();
  const token = user?.token;

  const [mode, setMode] = useState("");
  const [activeFilter, setActiveFilter] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const PAGE_SIZE = 20;

  const [paged, setPaged] = useState({ items: [], totalPages: 1, totalCount: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [createMode, setCreateMode] = useState("HOURLY");
  const [minHours, setMinHours] = useState("");
  const [maxHours, setMaxHours] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [priority, setPriority] = useState("0");
  const [isActive, setIsActive] = useState(true);

  const [editId, setEditId] = useState(null);
  const [eMinH, setEMinH] = useState("");
  const [eMaxH, setEMaxH] = useState("");
  const [eMinP, setEMinP] = useState("");
  const [eMaxP, setEMaxP] = useState("");
  const [ePri, setEPri] = useState("");
  const [eAct, setEAct] = useState(true);

  const load = useCallback(async () => {
    if (!token) {
      setError("Not signed in.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError("");
    try {
      const params = { PageNumber: pageNumber, PageSize: PAGE_SIZE };
      if (mode) params.mode = mode;
      if (activeFilter === "true") params.isActive = true;
      if (activeFilter === "false") params.isActive = false;
      const { data } = await adminGetSystemPriceRules(token, params);
      setPaged(normalizeRules(data));
    } catch (e) {
      setError(adminApiError(e, "Could not load price rules."));
      setPaged({ items: [], totalPages: 0, totalCount: 0 });
    } finally {
      setLoading(false);
    }
  }, [token, pageNumber, mode, activeFilter]);

  useEffect(() => {
    load();
  }, [load]);

  const onCreate = async (e) => {
    e.preventDefault();
    if (!token) return;
    setError("");
    try {
      const body = {
        pricingMode: createMode,
        minHours: minHours === "" ? undefined : Number(minHours),
        maxHours: maxHours === "" ? undefined : Number(maxHours),
        minPrice: minPrice === "" ? undefined : Number(minPrice),
        maxPrice: maxPrice === "" ? undefined : Number(maxPrice),
        priority: priority === "" ? undefined : Number(priority),
        isActive,
      };
      await adminCreateSystemPriceRule(token, body);
      setMinHours("");
      setMaxHours("");
      setMinPrice("");
      setMaxPrice("");
      await load();
    } catch (e2) {
      setError(adminApiError(e2, "Failed to create rule."));
    }
  };

  const startEdit = (row) => {
    const id = ruleId(row);
    setEditId(id);
    setEMinH(String(row.minHours ?? row.MinHours ?? ""));
    setEMaxH(String(row.maxHours ?? row.MaxHours ?? ""));
    setEMinP(String(row.minPrice ?? row.MinPrice ?? ""));
    setEMaxP(String(row.maxPrice ?? row.MaxPrice ?? ""));
    setEPri(String(row.priority ?? row.Priority ?? ""));
    setEAct(Boolean(row.isActive ?? row.IsActive ?? true));
  };

  const saveEdit = async () => {
    if (!token || !editId) return;
    setError("");
    try {
      await adminUpdateSystemPriceRule(token, editId, {
        minHours: eMinH === "" ? undefined : Number(eMinH),
        maxHours: eMaxH === "" ? undefined : Number(eMaxH),
        minPrice: eMinP === "" ? undefined : Number(eMinP),
        maxPrice: eMaxP === "" ? undefined : Number(eMaxP),
        priority: ePri === "" ? undefined : Number(ePri),
        isActive: eAct,
      });
      setEditId(null);
      await load();
    } catch (e2) {
      setError(adminApiError(e2, "Update failed."));
    }
  };

  return (
    <AdminPage>
      <AdminPageHeader
        title="System price rules"
        description="Define how minimum, maximum, and priority apply across booking modes."
      />

      <AdminErrorAlert>{error}</AdminErrorAlert>

      <div className="mb-6 flex flex-wrap items-end gap-3">
        <select
          value={mode}
          onChange={(e) => {
            setMode(e.target.value);
            setPageNumber(1);
          }}
          className={`${adminSelect} w-full min-w-[180px] sm:w-auto`}
        >
          <option value="">All booking modes</option>
          <option value="HOURLY">{PRICING_MODE_DISPLAY.HOURLY}</option>
          <option value="OVERNIGHT">{PRICING_MODE_DISPLAY.OVERNIGHT}</option>
        </select>
        <select
          value={activeFilter}
          onChange={(e) => {
            setActiveFilter(e.target.value);
            setPageNumber(1);
          }}
          className={`${adminSelect} w-full min-w-[160px] sm:w-auto`}
        >
          <option value="">All rules</option>
          <option value="true">Enabled only</option>
          <option value="false">Disabled only</option>
        </select>
        <button type="button" onClick={() => load()} className={adminBtnSecondary}>
          Refresh
        </button>
      </div>

      <AdminSection title="Create rule" className="mb-6">
        <form onSubmit={onCreate}>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <select value={createMode} onChange={(e) => setCreateMode(e.target.value)} className={adminSelect}>
              <option value="HOURLY">{PRICING_MODE_DISPLAY.HOURLY}</option>
              <option value="OVERNIGHT">{PRICING_MODE_DISPLAY.OVERNIGHT}</option>
            </select>
            <input placeholder="Min hours" value={minHours} onChange={(e) => setMinHours(e.target.value)} className={adminInput} />
            <input placeholder="Max hours" value={maxHours} onChange={(e) => setMaxHours(e.target.value)} className={adminInput} />
            <input placeholder="Min price" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className={adminInput} />
            <input placeholder="Max price" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className={adminInput} />
            <input placeholder="Priority" value={priority} onChange={(e) => setPriority(e.target.value)} className={adminInput} />
            <label className="flex h-10 items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="rounded border-slate-300" />
              Rule enabled
            </label>
            <button type="submit" className={`${adminBtnPrimary} w-full sm:w-auto`}>
              Create
            </button>
          </div>
        </form>
      </AdminSection>

      <div className={adminTableWrap}>
        <table className="min-w-full text-left text-sm">
          <thead className={adminThead}>
            <tr>
              <th className="px-6 py-3">Rule</th>
              <th className="px-6 py-3">Booking mode</th>
              <th className="px-6 py-3">Hours</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Priority</th>
              <th className="px-6 py-3">Enabled</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                  Loading…
                </td>
              </tr>
            ) : paged.items.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                  No rules.
                </td>
              </tr>
            ) : (
              paged.items.map((row) => {
                const id = ruleId(row);
                const editing = editId && String(editId) === String(id);
                const pm = row.pricingMode ?? row.PricingMode;
                return (
                  <tr key={id} className="border-b border-slate-50 hover:bg-slate-50/80">
                    <td className="px-6 py-4 font-mono text-xs text-slate-500">{String(id).slice(0, 8)}…</td>
                    <td className="px-6 py-4">{displayPricingMode(pm)}</td>
                    <td className="px-6 py-4">
                      {editing ? (
                        <span className="flex gap-1">
                          <input value={eMinH} onChange={(e) => setEMinH(e.target.value)} className="w-14 rounded-lg border border-slate-200 px-1 py-1 text-xs" />
                          <input value={eMaxH} onChange={(e) => setEMaxH(e.target.value)} className="w-14 rounded-lg border border-slate-200 px-1 py-1 text-xs" />
                        </span>
                      ) : (
                        `${row.minHours ?? row.MinHours ?? "—"} – ${row.maxHours ?? row.MaxHours ?? "—"}`
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editing ? (
                        <span className="flex gap-1">
                          <input value={eMinP} onChange={(e) => setEMinP(e.target.value)} className="w-20 rounded-lg border border-slate-200 px-1 py-1 text-xs" />
                          <input value={eMaxP} onChange={(e) => setEMaxP(e.target.value)} className="w-20 rounded-lg border border-slate-200 px-1 py-1 text-xs" />
                        </span>
                      ) : (
                        `${row.minPrice ?? row.MinPrice ?? "—"} – ${row.maxPrice ?? row.MaxPrice ?? "—"}`
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editing ? (
                        <input value={ePri} onChange={(e) => setEPri(e.target.value)} className="w-16 rounded-lg border border-slate-200 px-1 py-1 text-xs" />
                      ) : (
                        row.priority ?? row.Priority
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editing ? (
                        <input type="checkbox" checked={eAct} onChange={(e) => setEAct(e.target.checked)} />
                      ) : row.isActive ?? row.IsActive ? (
                        "On"
                      ) : (
                        "Off"
                      )}
                    </td>
                    <td className="px-6 py-4 text-right text-xs">
                      {editing ? (
                        <>
                          <button type="button" className="font-bold text-primary" onClick={saveEdit}>
                            Save
                          </button>
                          <button type="button" className="ml-2" onClick={() => setEditId(null)}>
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button type="button" className="font-bold text-primary" onClick={() => startEdit(row)}>
                            Edit
                          </button>
                          <button
                            type="button"
                            className="ml-2 font-bold text-slate-600"
                            onClick={async () => {
                              if (!token) return;
                              try {
                                await adminToggleSystemPriceRule(token, id);
                                await load();
                              } catch (e2) {
                                setError(adminApiError(e2, "Toggle failed."));
                              }
                            }}
                          >
                            Toggle
                          </button>
                          <button
                            type="button"
                            className="ml-2 font-bold text-rose-600"
                            onClick={async () => {
                              if (!window.confirm("Delete this rule?")) return;
                              try {
                                await adminDeleteSystemPriceRule(token, id);
                                await load();
                              } catch (e2) {
                                setError(adminApiError(e2, "Delete failed."));
                              }
                            }}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
        <div className={adminTableFooter}>
          <span className="text-sm text-slate-600">
            {paged.totalCount} rules — page {pageNumber} / {Math.max(1, paged.totalPages)}
          </span>
          <span className="flex gap-2">
            <button
              type="button"
              disabled={pageNumber <= 1}
              onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
              className={adminBtnSecondary}
            >
              Previous
            </button>
            <button
              type="button"
              disabled={pageNumber >= paged.totalPages}
              onClick={() => setPageNumber((p) => p + 1)}
              className={adminBtnSecondary}
            >
              Next
            </button>
          </span>
        </div>
      </div>
    </AdminPage>
  );
}
