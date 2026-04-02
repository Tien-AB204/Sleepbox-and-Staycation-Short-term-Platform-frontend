import React, { useCallback, useEffect, useState } from "react";
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
      setError("Chưa đăng nhập.");
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
      setError(adminApiError(e, "Không tải được quy tắc giá."));
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
      setError(adminApiError(e2, "Tạo quy tắc thất bại."));
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
      setError(adminApiError(e2, "Cập nhật thất bại."));
    }
  };

  return (
    <main className="flex-1 overflow-y-auto p-8">
      <header className="mb-6">
        <h2 className="text-2xl font-extrabold text-slate-900">Quy tắc giá hệ thống</h2>
        <p className="text-sm text-slate-500">/api/admin/pricing/system-price-rules</p>
      </header>

      {error ? (
        <div className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">{error}</div>
      ) : null}

      <div className="mb-4 flex flex-wrap gap-2">
        <select value={mode} onChange={(e) => { setMode(e.target.value); setPageNumber(1); }} className="rounded-lg border px-2 py-2 text-sm">
          <option value="">Mọi mode</option>
          <option value="HOURLY">HOURLY</option>
          <option value="OVERNIGHT">OVERNIGHT</option>
        </select>
        <select
          value={activeFilter}
          onChange={(e) => { setActiveFilter(e.target.value); setPageNumber(1); }}
          className="rounded-lg border px-2 py-2 text-sm"
        >
          <option value="">isActive: tất cả</option>
          <option value="true">Chỉ active</option>
          <option value="false">Chỉ inactive</option>
        </select>
        <button type="button" onClick={() => load()} className="rounded-lg border px-4 py-2 text-sm">
          Làm mới
        </button>
      </div>

      <form onSubmit={onCreate} className="mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="mb-3 font-bold text-slate-900">Tạo quy tắc</h3>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          <select value={createMode} onChange={(e) => setCreateMode(e.target.value)} className="rounded border px-2 py-2 text-sm">
            <option value="HOURLY">HOURLY</option>
            <option value="OVERNIGHT">OVERNIGHT</option>
          </select>
          <input placeholder="minHours" value={minHours} onChange={(e) => setMinHours(e.target.value)} className="rounded border px-2 py-2 text-sm" />
          <input placeholder="maxHours" value={maxHours} onChange={(e) => setMaxHours(e.target.value)} className="rounded border px-2 py-2 text-sm" />
          <input placeholder="minPrice" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="rounded border px-2 py-2 text-sm" />
          <input placeholder="maxPrice" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="rounded border px-2 py-2 text-sm" />
          <input placeholder="priority" value={priority} onChange={(e) => setPriority(e.target.value)} className="rounded border px-2 py-2 text-sm" />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
            isActive
          </label>
          <button type="submit" className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white">
            Tạo
          </button>
        </div>
      </form>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b bg-slate-50 text-xs font-bold uppercase text-slate-500">
            <tr>
              <th className="px-3 py-2">Rule</th>
              <th className="px-3 py-2">Mode</th>
              <th className="px-3 py-2">Giờ</th>
              <th className="px-3 py-2">Giá</th>
              <th className="px-3 py-2">Ưu tiên</th>
              <th className="px-3 py-2">Active</th>
              <th className="px-3 py-2 text-right">Tác vụ</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="py-8 text-center">
                  Đang tải…
                </td>
              </tr>
            ) : paged.items.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-500">
                  Không có quy tắc.
                </td>
              </tr>
            ) : (
              paged.items.map((row) => {
                const id = ruleId(row);
                const editing = editId && String(editId) === String(id);
                const pm = row.pricingMode ?? row.PricingMode;
                return (
                  <tr key={id} className="border-b border-slate-100">
                    <td className="px-3 py-2 font-mono text-xs">{String(id).slice(0, 8)}…</td>
                    <td className="px-3 py-2">{pm}</td>
                    <td className="px-3 py-2">
                      {editing ? (
                        <span className="flex gap-1">
                          <input value={eMinH} onChange={(e) => setEMinH(e.target.value)} className="w-12 rounded border text-xs" />
                          <input value={eMaxH} onChange={(e) => setEMaxH(e.target.value)} className="w-12 rounded border text-xs" />
                        </span>
                      ) : (
                        `${row.minHours ?? row.MinHours ?? "—"} – ${row.maxHours ?? row.MaxHours ?? "—"}`
                      )}
                    </td>
                    <td className="px-3 py-2">
                      {editing ? (
                        <span className="flex gap-1">
                          <input value={eMinP} onChange={(e) => setEMinP(e.target.value)} className="w-16 rounded border text-xs" />
                          <input value={eMaxP} onChange={(e) => setEMaxP(e.target.value)} className="w-16 rounded border text-xs" />
                        </span>
                      ) : (
                        `${row.minPrice ?? row.MinPrice ?? "—"} – ${row.maxPrice ?? row.MaxPrice ?? "—"}`
                      )}
                    </td>
                    <td className="px-3 py-2">
                      {editing ? (
                        <input value={ePri} onChange={(e) => setEPri(e.target.value)} className="w-14 rounded border text-xs" />
                      ) : (
                        row.priority ?? row.Priority
                      )}
                    </td>
                    <td className="px-3 py-2">
                      {editing ? (
                        <input type="checkbox" checked={eAct} onChange={(e) => setEAct(e.target.checked)} />
                      ) : row.isActive ?? row.IsActive ? (
                        "Có"
                      ) : (
                        "Không"
                      )}
                    </td>
                    <td className="px-3 py-2 text-right text-xs">
                      {editing ? (
                        <>
                          <button type="button" className="font-bold text-primary" onClick={saveEdit}>
                            Lưu
                          </button>
                          <button type="button" className="ml-2" onClick={() => setEditId(null)}>
                            Hủy
                          </button>
                        </>
                      ) : (
                        <>
                          <button type="button" className="font-bold text-primary" onClick={() => startEdit(row)}>
                            Sửa
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
                                setError(adminApiError(e2, "Toggle thất bại."));
                              }
                            }}
                          >
                            Toggle
                          </button>
                          <button
                            type="button"
                            className="ml-2 font-bold text-rose-600"
                            onClick={async () => {
                              if (!window.confirm("Xóa rule?")) return;
                              try {
                                await adminDeleteSystemPriceRule(token, id);
                                await load();
                              } catch (e2) {
                                setError(adminApiError(e2, "Xóa thất bại."));
                              }
                            }}
                          >
                            Xóa
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
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
        <span>
          {paged.totalCount} quy tắc — trang {pageNumber} / {Math.max(1, paged.totalPages)}
        </span>
        <span className="flex gap-2">
          <button
            type="button"
            disabled={pageNumber <= 1}
            onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
            className="rounded border px-3 py-1 disabled:opacity-40"
          >
            Trước
          </button>
          <button
            type="button"
            disabled={pageNumber >= paged.totalPages}
            onClick={() => setPageNumber((p) => p + 1)}
            className="rounded border px-3 py-1 disabled:opacity-40"
          >
            Sau
          </button>
        </span>
      </div>
    </main>
  );
}
