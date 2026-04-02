import React, { useCallback, useEffect, useState } from "react";
import { AdminErrorAlert, AdminPage, AdminPageHeader, AdminSection } from "../../components/admin/AdminPageChrome";
import { adminBtnPrimary, adminBtnSecondary, adminInput, adminSelect, adminTableWrap, adminThead } from "../../components/admin/adminUi";
import { useAuthContext } from "../../contexts/AuthContext";
import {
  adminApiError,
  adminCreateAddonService,
  adminDeleteAddonService,
  adminGetAddonServices,
  adminPatchAddonService,
  adminToggleAddonService,
} from "../../services/adminService";

function asList(data) {
  if (Array.isArray(data)) return data;
  if (!data) return [];
  return data.items ?? data.Items ?? [];
}

function sid(row) {
  return row?.serviceId ?? row?.ServiceId ?? row?.id ?? row?.Id;
}

function sf(row, a, b) {
  return row?.[a] ?? row?.[b] ?? "";
}

export default function AdminAddonServices() {
  const { user } = useAuthContext();
  const token = user?.token;

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeOnly, setActiveOnly] = useState("");

  const [serviceName, setServiceName] = useState("");
  const [unit, setUnit] = useState("");
  const [description, setDescription] = useState("");

  const [editId, setEditId] = useState(null);
  const [eName, setEName] = useState("");
  const [eUnit, setEUnit] = useState("");
  const [eDesc, setEDesc] = useState("");

  const load = useCallback(async () => {
    if (!token) {
      setError("Not signed in.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError("");
    try {
      const params = {};
      if (activeOnly === "true") params.isActive = true;
      if (activeOnly === "false") params.isActive = false;
      const { data } = await adminGetAddonServices(token, params);
      setRows(asList(data));
    } catch (e) {
      setError(adminApiError(e, "Could not load add-on services."));
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [token, activeOnly]);

  useEffect(() => {
    load();
  }, [load]);

  const onCreate = async (e) => {
    e.preventDefault();
    if (!token || !serviceName.trim()) return;
    setError("");
    try {
      await adminCreateAddonService(token, { serviceName: serviceName.trim(), unit, description });
      setServiceName("");
      setUnit("");
      setDescription("");
      await load();
    } catch (e2) {
      setError(adminApiError(e2, "Create failed."));
    }
  };

  const startEdit = (row) => {
    setEditId(sid(row));
    setEName(sf(row, "serviceName", "ServiceName"));
    setEUnit(sf(row, "unit", "Unit"));
    setEDesc(sf(row, "description", "Description"));
  };

  const saveEdit = async () => {
    if (!token || !editId) return;
    setError("");
    try {
      await adminPatchAddonService(token, editId, {
        serviceName: eName,
        unit: eUnit,
        description: eDesc,
      });
      setEditId(null);
      await load();
    } catch (e2) {
      setError(adminApiError(e2, "Update failed."));
    }
  };

  const onToggle = async (id) => {
    if (!token) return;
    setError("");
    try {
      await adminToggleAddonService(token, id);
      await load();
    } catch (e2) {
      setError(adminApiError(e2, "Toggle failed."));
    }
  };

  const onDelete = async (id) => {
    if (!token || !window.confirm("Delete this service?")) return;
    setError("");
    try {
      await adminDeleteAddonService(token, id);
      await load();
    } catch (e2) {
      setError(adminApiError(e2, "Delete failed."));
    }
  };

  return (
    <AdminPage>
      <AdminPageHeader
        title="Add-on services"
        description="Optional extras guests can add to a booking."
      />

      <AdminErrorAlert>{error}</AdminErrorAlert>

      <div className="mb-6 flex flex-wrap items-end gap-3">
        <select value={activeOnly} onChange={(e) => setActiveOnly(e.target.value)} className={`${adminSelect} w-full min-w-[200px] sm:w-auto`}>
          <option value="">All</option>
          <option value="true">Enabled only</option>
          <option value="false">Disabled only</option>
        </select>
        <button type="button" onClick={() => load()} className={adminBtnSecondary}>
          Refresh
        </button>
      </div>

      <AdminSection title="New service" className="mb-6">
        <form onSubmit={onCreate} className="grid grid-cols-1 gap-3 md:grid-cols-4">
          <input
            required
            placeholder="Service name *"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            className={adminInput}
          />
          <input placeholder="Unit" value={unit} onChange={(e) => setUnit(e.target.value)} className={adminInput} />
          <input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`${adminInput} md:col-span-2`}
          />
          <button type="submit" className={`${adminBtnPrimary} md:col-span-4 w-full md:w-auto`}>
            Create
          </button>
        </form>
      </AdminSection>

      <div className={adminTableWrap}>
        <table className="min-w-full text-left text-sm">
          <thead className={adminThead}>
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Unit</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Enabled</th>
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
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                  No data.
                </td>
              </tr>
            ) : (
              rows.map((row) => {
                const id = sid(row);
                const active = row?.isActive ?? row?.IsActive;
                const editing = editId && String(editId) === String(id);
                return (
                  <tr key={id} className="border-b border-slate-50 hover:bg-slate-50/80">
                    <td className="px-6 py-4 font-mono text-xs text-slate-500">{String(id).slice(0, 8)}…</td>
                    <td className="px-6 py-4">
                      {editing ? (
                        <input value={eName} onChange={(e) => setEName(e.target.value)} className={adminInput} />
                      ) : (
                        sf(row, "serviceName", "ServiceName")
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editing ? (
                        <input value={eUnit} onChange={(e) => setEUnit(e.target.value)} className={adminInput} />
                      ) : (
                        sf(row, "unit", "Unit")
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editing ? (
                        <input value={eDesc} onChange={(e) => setEDesc(e.target.value)} className={adminInput} />
                      ) : (
                        sf(row, "description", "Description")
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-700">{active == null ? "—" : active ? "On" : "Off"}</td>
                    <td className="px-6 py-4 text-right text-xs">
                      {editing ? (
                        <>
                          <button type="button" className="font-bold text-primary" onClick={saveEdit}>
                            Save
                          </button>
                          <button type="button" className="ml-2 text-slate-500" onClick={() => setEditId(null)}>
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button type="button" className="font-bold text-primary" onClick={() => startEdit(row)}>
                            Edit
                          </button>
                          <button type="button" className="ml-2 font-bold text-slate-600" onClick={() => onToggle(id)}>
                            On/off
                          </button>
                          <button type="button" className="ml-2 font-bold text-rose-600" onClick={() => onDelete(id)}>
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
