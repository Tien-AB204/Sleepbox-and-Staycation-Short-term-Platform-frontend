import React, { useCallback, useEffect, useState } from "react";
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
      setError("Chưa đăng nhập.");
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
      setError(adminApiError(e, "Không tải được dịch vụ add-on."));
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
      setError(adminApiError(e2, "Tạo thất bại."));
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
      setError(adminApiError(e2, "Cập nhật thất bại."));
    }
  };

  const onToggle = async (id) => {
    if (!token) return;
    setError("");
    try {
      await adminToggleAddonService(token, id);
      await load();
    } catch (e2) {
      setError(adminApiError(e2, "Toggle thất bại."));
    }
  };

  const onDelete = async (id) => {
    if (!token || !window.confirm("Xóa dịch vụ này?")) return;
    setError("");
    try {
      await adminDeleteAddonService(token, id);
      await load();
    } catch (e2) {
      setError(adminApiError(e2, "Xóa thất bại."));
    }
  };

  return (
    <main className="flex-1 overflow-y-auto p-8">
      <header className="mb-6">
        <h2 className="text-2xl font-extrabold text-slate-900">Dịch vụ add-on</h2>
        <p className="text-sm text-slate-500">/api/admin/pricing/addon-services</p>
      </header>

      {error ? (
        <div className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">{error}</div>
      ) : null}

      <div className="mb-4 flex flex-wrap gap-3">
        <select
          value={activeOnly}
          onChange={(e) => setActiveOnly(e.target.value)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
        >
          <option value="">Tất cả trạng thái</option>
          <option value="true">Chỉ đang bật</option>
          <option value="false">Chỉ đang tắt</option>
        </select>
        <button type="button" onClick={() => load()} className="rounded-lg border border-slate-200 px-4 py-2 text-sm">
          Làm mới
        </button>
      </div>

      <form
        onSubmit={onCreate}
        className="mb-6 grid grid-cols-1 gap-2 rounded-xl border border-slate-200 bg-white p-4 md:grid-cols-4"
      >
        <input
          required
          placeholder="Tên dịch vụ *"
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
          className="rounded-lg border px-3 py-2 text-sm"
        />
        <input placeholder="Đơn vị" value={unit} onChange={(e) => setUnit(e.target.value)} className="rounded-lg border px-3 py-2 text-sm" />
        <input
          placeholder="Mô tả"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="rounded-lg border px-3 py-2 text-sm md:col-span-2"
        />
        <button type="submit" className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white md:col-span-4">
          Tạo mới
        </button>
      </form>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b bg-slate-50 text-xs font-bold uppercase text-slate-500">
            <tr>
              <th className="px-3 py-2">ID</th>
              <th className="px-3 py-2">Tên</th>
              <th className="px-3 py-2">Đơn vị</th>
              <th className="px-3 py-2">Mô tả</th>
              <th className="px-3 py-2">Active</th>
              <th className="px-3 py-2 text-right">Tác vụ</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="px-3 py-8 text-center">
                  Đang tải…
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-3 py-8 text-center text-slate-500">
                  Không có dữ liệu.
                </td>
              </tr>
            ) : (
              rows.map((row) => {
                const id = sid(row);
                const active = row?.isActive ?? row?.IsActive;
                const editing = editId && String(editId) === String(id);
                return (
                  <tr key={id} className="border-b border-slate-100">
                    <td className="px-3 py-2 font-mono text-xs">{String(id).slice(0, 8)}…</td>
                    <td className="px-3 py-2">
                      {editing ? (
                        <input value={eName} onChange={(e) => setEName(e.target.value)} className="w-full rounded border px-2 py-1 text-sm" />
                      ) : (
                        sf(row, "serviceName", "ServiceName")
                      )}
                    </td>
                    <td className="px-3 py-2">
                      {editing ? (
                        <input value={eUnit} onChange={(e) => setEUnit(e.target.value)} className="w-full rounded border px-2 py-1 text-sm" />
                      ) : (
                        sf(row, "unit", "Unit")
                      )}
                    </td>
                    <td className="px-3 py-2">
                      {editing ? (
                        <input value={eDesc} onChange={(e) => setEDesc(e.target.value)} className="w-full rounded border px-2 py-1 text-sm" />
                      ) : (
                        sf(row, "description", "Description")
                      )}
                    </td>
                    <td className="px-3 py-2">{active == null ? "—" : active ? "Có" : "Không"}</td>
                    <td className="px-3 py-2 text-right text-xs">
                      {editing ? (
                        <>
                          <button type="button" className="font-bold text-primary" onClick={saveEdit}>
                            Lưu
                          </button>
                          <button type="button" className="ml-2 text-slate-500" onClick={() => setEditId(null)}>
                            Hủy
                          </button>
                        </>
                      ) : (
                        <>
                          <button type="button" className="font-bold text-primary" onClick={() => startEdit(row)}>
                            Sửa
                          </button>
                          <button type="button" className="ml-2 font-bold text-slate-600" onClick={() => onToggle(id)}>
                            Bật/tắt
                          </button>
                          <button type="button" className="ml-2 font-bold text-rose-600" onClick={() => onDelete(id)}>
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
