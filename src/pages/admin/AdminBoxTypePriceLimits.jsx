import React, { useCallback, useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import {
  adminApiError,
  adminCreateBoxTypePriceLimit,
  adminDeleteBoxTypePriceLimit,
  adminGetBoxTypePriceLimits,
  adminToggleBoxTypePriceLimit,
  adminUpdateBoxTypePriceLimit,
} from "../../services/adminService";

function asList(data) {
  if (Array.isArray(data)) return data;
  if (!data) return [];
  return data.items ?? data.Items ?? [];
}

function rid(row) {
  return row?.id ?? row?.Id ?? row?.priceLimitId ?? row?.PriceLimitId;
}

const CAPS = ["SINGLE", "DOUBLE", "FAMILY"];
const CLASSES = ["STANDARD", "PREMIUM"];

export default function AdminBoxTypePriceLimits() {
  const { user } = useAuthContext();
  const token = user?.token;

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [capacityType, setCapacityType] = useState("SINGLE");
  const [boxClass, setBoxClass] = useState("STANDARD");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [editRow, setEditRow] = useState(null);
  const [eMin, setEMin] = useState("");
  const [eMax, setEMax] = useState("");
  const [eActive, setEActive] = useState(true);

  const load = useCallback(async () => {
    if (!token) {
      setError("Chưa đăng nhập.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError("");
    try {
      const { data } = await adminGetBoxTypePriceLimits(token);
      setRows(asList(data));
    } catch (e) {
      setError(adminApiError(e, "Không tải được giới hạn giá."));
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    load();
  }, [load]);

  const onCreate = async (e) => {
    e.preventDefault();
    if (!token) return;
    setError("");
    try {
      await adminCreateBoxTypePriceLimit(token, {
        capacityType,
        boxClass,
        minPrice: minPrice === "" ? undefined : Number(minPrice),
        maxPrice: maxPrice === "" ? undefined : Number(maxPrice),
      });
      setMinPrice("");
      setMaxPrice("");
      await load();
    } catch (e2) {
      setError(adminApiError(e2, "Tạo thất bại."));
    }
  };

  const startEdit = (row) => {
    setEditRow(rid(row));
    setEMin(String(row.minPrice ?? row.MinPrice ?? ""));
    setEMax(String(row.maxPrice ?? row.MaxPrice ?? ""));
    setEActive(Boolean(row.isActive ?? row.IsActive ?? true));
  };

  const saveEdit = async () => {
    if (!token || !editRow) return;
    setError("");
    try {
      await adminUpdateBoxTypePriceLimit(token, editRow, {
        minPrice: eMin === "" ? undefined : Number(eMin),
        maxPrice: eMax === "" ? undefined : Number(eMax),
        isActive: eActive,
      });
      setEditRow(null);
      await load();
    } catch (e2) {
      setError(adminApiError(e2, "Cập nhật thất bại."));
    }
  };

  return (
    <main className="flex-1 overflow-y-auto p-8">
      <header className="mb-6">
        <h2 className="text-2xl font-extrabold text-slate-900">Giới hạn giá theo loại box</h2>
        <p className="text-sm text-slate-500">/api/admin/pricing/box-type-price-limits</p>
      </header>

      {error ? (
        <div className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">{error}</div>
      ) : null}

      <form
        onSubmit={onCreate}
        className="mb-6 grid grid-cols-2 gap-2 rounded-xl border border-slate-200 bg-white p-4 md:grid-cols-6"
      >
        <select value={capacityType} onChange={(e) => setCapacityType(e.target.value)} className="rounded-lg border px-2 py-2 text-sm">
          {CAPS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select value={boxClass} onChange={(e) => setBoxClass(e.target.value)} className="rounded-lg border px-2 py-2 text-sm">
          {CLASSES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="min"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="rounded-lg border px-2 py-2 text-sm"
        />
        <input
          type="number"
          placeholder="max"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="rounded-lg border px-2 py-2 text-sm"
        />
        <button type="submit" className="col-span-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white md:col-span-2">
          Thêm cấu hình
        </button>
      </form>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b bg-slate-50 text-xs font-bold uppercase text-slate-500">
            <tr>
              <th className="px-3 py-2">ID</th>
              <th className="px-3 py-2">Capacity</th>
              <th className="px-3 py-2">Class</th>
              <th className="px-3 py-2">Min</th>
              <th className="px-3 py-2">Max</th>
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
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-500">
                  Chưa có bản ghi.
                </td>
              </tr>
            ) : (
              rows.map((row) => {
                const id = rid(row);
                const editing = editRow && String(editRow) === String(id);
                return (
                  <tr key={id} className="border-b border-slate-100">
                    <td className="px-3 py-2 font-mono text-xs">{String(id).slice(0, 8)}…</td>
                    <td className="px-3 py-2">{row.capacityType ?? row.CapacityType}</td>
                    <td className="px-3 py-2">{row.boxClass ?? row.BoxClass}</td>
                    <td className="px-3 py-2">
                      {editing ? (
                        <input value={eMin} onChange={(e) => setEMin(e.target.value)} className="w-24 rounded border px-1 text-sm" />
                      ) : (
                        row.minPrice ?? row.MinPrice
                      )}
                    </td>
                    <td className="px-3 py-2">
                      {editing ? (
                        <input value={eMax} onChange={(e) => setEMax(e.target.value)} className="w-24 rounded border px-1 text-sm" />
                      ) : (
                        row.maxPrice ?? row.MaxPrice
                      )}
                    </td>
                    <td className="px-3 py-2">
                      {editing ? (
                        <input type="checkbox" checked={eActive} onChange={(e) => setEActive(e.target.checked)} />
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
                          <button type="button" className="ml-2" onClick={() => setEditRow(null)}>
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
                                await adminToggleBoxTypePriceLimit(token, id);
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
                              if (!window.confirm("Xóa?")) return;
                              try {
                                await adminDeleteBoxTypePriceLimit(token, id);
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
    </main>
  );
}
