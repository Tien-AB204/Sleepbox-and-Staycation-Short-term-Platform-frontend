import React, { useCallback, useEffect, useState } from "react";
import { AdminErrorAlert, AdminPage, AdminPageHeader, AdminSection } from "../../components/admin/AdminPageChrome";
import { adminBtnPrimary, adminInput, adminSelect, adminTableWrap, adminThead } from "../../components/admin/adminUi";
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

const CAPACITY_LABEL = { SINGLE: "Single", DOUBLE: "Double", FAMILY: "Family" };
const CLASS_LABEL = { STANDARD: "Standard", PREMIUM: "Premium" };

function displayCapacity(v) {
  if (!v) return "—";
  return CAPACITY_LABEL[v] ?? "—";
}

function displayClass(v) {
  if (!v) return "—";
  return CLASS_LABEL[v] ?? "—";
}

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
      setError("Not signed in.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError("");
    try {
      const { data } = await adminGetBoxTypePriceLimits(token);
      setRows(asList(data));
    } catch (e) {
      setError(adminApiError(e, "Could not load price limits."));
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
      setError(adminApiError(e2, "Create failed."));
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
      setError(adminApiError(e2, "Update failed."));
    }
  };

  return (
    <AdminPage>
      <AdminPageHeader
        title="Box type price limits"
        description="Allowed price range per box size and tier."
      />

      <AdminErrorAlert>{error}</AdminErrorAlert>

      <AdminSection title="Add limit" className="mb-6">
        <form onSubmit={onCreate} className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6">
          <select value={capacityType} onChange={(e) => setCapacityType(e.target.value)} className={adminSelect}>
            {CAPS.map((c) => (
              <option key={c} value={c}>
                {CAPACITY_LABEL[c]}
              </option>
            ))}
          </select>
          <select value={boxClass} onChange={(e) => setBoxClass(e.target.value)} className={adminSelect}>
            {CLASSES.map((c) => (
              <option key={c} value={c}>
                {CLASS_LABEL[c]}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Min price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className={adminInput}
          />
          <input
            type="number"
            placeholder="Max price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className={adminInput}
          />
          <button type="submit" className={`${adminBtnPrimary} lg:col-span-2 w-full`}>
            Add configuration
          </button>
        </form>
      </AdminSection>

      <div className={adminTableWrap}>
        <table className="min-w-full text-left text-sm">
          <thead className={adminThead}>
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Capacity</th>
              <th className="px-6 py-3">Class</th>
              <th className="px-6 py-3">Min</th>
              <th className="px-6 py-3">Max</th>
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
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                  No records yet.
                </td>
              </tr>
            ) : (
              rows.map((row) => {
                const id = rid(row);
                const editing = editRow && String(editRow) === String(id);
                return (
                  <tr key={id} className="border-b border-slate-50 hover:bg-slate-50/80">
                    <td className="px-6 py-4 font-mono text-xs text-slate-500">{String(id).slice(0, 8)}…</td>
                    <td className="px-6 py-4">{displayCapacity(row.capacityType ?? row.CapacityType)}</td>
                    <td className="px-6 py-4">{displayClass(row.boxClass ?? row.BoxClass)}</td>
                    <td className="px-6 py-4">
                      {editing ? (
                        <input value={eMin} onChange={(e) => setEMin(e.target.value)} className={`${adminInput} max-w-[8rem]`} />
                      ) : (
                        row.minPrice ?? row.MinPrice
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editing ? (
                        <input value={eMax} onChange={(e) => setEMax(e.target.value)} className={`${adminInput} max-w-[8rem]`} />
                      ) : (
                        row.maxPrice ?? row.MaxPrice
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editing ? (
                        <input type="checkbox" checked={eActive} onChange={(e) => setEActive(e.target.checked)} />
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
                          <button type="button" className="ml-2" onClick={() => setEditRow(null)}>
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
                                await adminToggleBoxTypePriceLimit(token, id);
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
                              if (!window.confirm("Delete this record?")) return;
                              try {
                                await adminDeleteBoxTypePriceLimit(token, id);
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
      </div>
    </AdminPage>
  );
}
