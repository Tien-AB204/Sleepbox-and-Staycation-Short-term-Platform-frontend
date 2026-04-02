import React, { useCallback, useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import {
  getApiErrorMessage,
  hostCreateAmenity,
  hostDeleteAmenity,
  hostGetAmenities,
  hostUpdateAmenity,
} from "../../services/hostService";

function asAmenityList(data) {
  if (Array.isArray(data)) return data;
  if (!data) return [];
  const inner = data.items ?? data.Items ?? data.data ?? data.Data;
  if (Array.isArray(inner)) return inner;
  return [];
}

function amenityId(row) {
  return row?.id ?? row?.amenityId ?? row?.AmenityId ?? row?.ID;
}

function amenityField(row, a, b) {
  return row?.[a] ?? row?.[b] ?? "";
}

export default function HostAmenities() {
  const { user } = useAuthContext();
  const token = user?.token;

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [qDraft, setQDraft] = useState("");
  const [q, setQ] = useState("");

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editType, setEditType] = useState("");
  const [editDesc, setEditDesc] = useState("");

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
      if (q.trim()) params.q = q.trim();
      const { data } = await hostGetAmenities(token, params);
      setRows(asAmenityList(data));
    } catch (e) {
      setError(getApiErrorMessage(e, "Không tải được tiện ích."));
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [token, q]);

  useEffect(() => {
    load();
  }, [load]);

  const startEdit = (row) => {
    const id = amenityId(row);
    setEditingId(id);
    setEditName(amenityField(row, "name", "Name"));
    setEditType(amenityField(row, "type", "Type"));
    setEditDesc(amenityField(row, "description", "Description"));
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const onCreate = async (e) => {
    e.preventDefault();
    if (!token) return;
    setError("");
    try {
      await hostCreateAmenity(token, { name, type, description });
      setName("");
      setType("");
      setDescription("");
      await load();
    } catch (e2) {
      setError(getApiErrorMessage(e2, "Tạo tiện ích thất bại."));
    }
  };

  const onSaveEdit = async (e) => {
    e.preventDefault();
    if (!token || editingId == null) return;
    setError("");
    try {
      await hostUpdateAmenity(token, editingId, {
        name: editName,
        type: editType,
        description: editDesc,
      });
      cancelEdit();
      await load();
    } catch (e2) {
      setError(getApiErrorMessage(e2, "Cập nhật thất bại."));
    }
  };

  const onDelete = async (id) => {
    if (!token || !window.confirm("Xóa tiện ích này?")) return;
    setError("");
    try {
      await hostDeleteAmenity(token, id);
      await load();
    } catch (e2) {
      setError(getApiErrorMessage(e2, "Xóa thất bại."));
    }
  };

  return (
    <main className="flex-1 overflow-y-auto p-8">
      <header className="mb-6">
        <h2 className="text-2xl font-extrabold text-slate-900">Tiện ích (Amenities)</h2>
        <p className="mt-1 text-sm text-slate-500">
          Quản lý qua tài khoản Host — <code className="rounded bg-slate-100 px-1">/api/amenities</code>
        </p>
      </header>

      {error ? (
        <div className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">{error}</div>
      ) : null}

      <div className="mb-6 flex flex-wrap items-end gap-3 rounded-xl border border-primary/10 bg-white p-4 shadow-sm">
        <label className="min-w-[200px] flex-1">
          <span className="text-xs font-bold uppercase text-slate-500">Tìm (q)</span>
          <input
            value={qDraft}
            onChange={(e) => setQDraft(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
        </label>
        <button
          type="button"
          onClick={() => setQ(qDraft.trim())}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white"
        >
          Lọc
        </button>
        <button
          type="button"
          onClick={() => {
            setQDraft("");
            setQ("");
          }}
          className="rounded-lg border border-slate-200 px-4 py-2 text-sm"
        >
          Xóa lọc
        </button>
        <button
          type="button"
          onClick={() => load()}
          className="rounded-lg border border-slate-200 px-4 py-2 text-sm"
        >
          Làm mới
        </button>
      </div>

      <form
        onSubmit={onCreate}
        className="mb-6 grid grid-cols-1 gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-4"
      >
        <input
          placeholder="Tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
        />
        <input
          placeholder="Loại (type)"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
        />
        <input
          placeholder="Mô tả"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm md:col-span-2"
        />
        <button type="submit" className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white md:col-span-4">
          Thêm tiện ích
        </button>
      </form>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b bg-slate-50 text-xs font-bold uppercase text-slate-500">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Tên</th>
                <th className="px-4 py-2">Loại</th>
                <th className="px-4 py-2">Mô tả</th>
                <th className="px-4 py-2 text-right">Tác vụ</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                    Đang tải…
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                    Không có dữ liệu.
                  </td>
                </tr>
              ) : (
                rows.map((row) => {
                  const id = amenityId(row);
                  const isEdit = editingId != null && String(editingId) === String(id);
                  return (
                    <tr key={id ?? JSON.stringify(row)} className="border-b border-slate-100">
                      <td className="px-4 py-2 font-mono text-xs">{id}</td>
                      <td className="px-4 py-2">
                        {isEdit ? (
                          <input
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="w-full rounded border px-2 py-1 text-sm"
                          />
                        ) : (
                          amenityField(row, "name", "Name")
                        )}
                      </td>
                      <td className="px-4 py-2">
                        {isEdit ? (
                          <input
                            value={editType}
                            onChange={(e) => setEditType(e.target.value)}
                            className="w-full rounded border px-2 py-1 text-sm"
                          />
                        ) : (
                          amenityField(row, "type", "Type")
                        )}
                      </td>
                      <td className="px-4 py-2">
                        {isEdit ? (
                          <input
                            value={editDesc}
                            onChange={(e) => setEditDesc(e.target.value)}
                            className="w-full rounded border px-2 py-1 text-sm"
                          />
                        ) : (
                          amenityField(row, "description", "Description")
                        )}
                      </td>
                      <td className="px-4 py-2 text-right">
                        {isEdit ? (
                          <div className="flex justify-end gap-1">
                            <button type="button" onClick={onSaveEdit} className="text-xs font-bold text-primary">
                              Lưu
                            </button>
                            <button type="button" onClick={cancelEdit} className="text-xs text-slate-500">
                              Hủy
                            </button>
                          </div>
                        ) : (
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => startEdit(row)}
                              className="text-xs font-bold text-primary hover:underline"
                            >
                              Sửa
                            </button>
                            <button
                              type="button"
                              onClick={() => onDelete(id)}
                              className="text-xs font-bold text-rose-600 hover:underline"
                            >
                              Xóa
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
