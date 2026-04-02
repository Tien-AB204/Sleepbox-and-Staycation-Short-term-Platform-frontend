import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { adminApiError, adminGetUserList, adminUpdateModerator } from "../../services/adminService";

const GENDERS = [
  { value: "", label: "— Không đổi / để trống —" },
  { value: "Male", label: "Nam" },
  { value: "Female", label: "Nữ" },
  { value: "Other", label: "Khác" },
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
    representativeName: pick(raw, "representativeName", "RepresentativeName") ?? "",
  };
}

function guessNameParts(full) {
  const t = (full || "").trim();
  if (!t) return { first: "", last: "" };
  const parts = t.split(/\s+/);
  if (parts.length === 1) return { first: parts[0], last: "" };
  return { first: parts[parts.length - 1], last: parts.slice(0, -1).join(" ") };
}

export default function AdminModeratorEdit() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const token = user?.token;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailDisplay, setEmailDisplay] = useState("");

  const hydrate = useCallback(
    (row) => {
      if (!row) return;
      setUsername(row.username || "");
      setPhone(row.phone || "");
      setEmailDisplay(row.email || "");
      const { first, last } = guessNameParts(row.representativeName);
      setFirstName(first);
      setLastName(last);
    },
    [],
  );

  const load = useCallback(async () => {
    if (!token || !id) {
      setLoading(false);
      setError("Thiếu token hoặc mã moderator.");
      return;
    }

    const fromNav = location.state?.row;
    if (fromNav && String(fromNav.userId ?? fromNav.UserId) === String(id)) {
      hydrate(normalizeAccountItem(fromNav));
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");
    try {
      const { data } = await adminGetUserList(token, { Role: "Moderator", PageNumber: 1, PageSize: 200 });
      const itemsRaw = data?.items ?? data?.Items ?? [];
      const list = Array.isArray(itemsRaw) ? itemsRaw.map(normalizeAccountItem) : [];
      const row = list.find((r) => String(r.userId) === String(id));
      if (!row) {
        setError("Không tìm thấy moderator.");
      } else {
        hydrate(row);
      }
    } catch (e) {
      setError(adminApiError(e, "Không tải được moderator."));
    } finally {
      setLoading(false);
    }
  }, [token, id, location.state, hydrate]);

  useEffect(() => {
    load();
  }, [load]);

  const onSave = async (e) => {
    e.preventDefault();
    if (!token || !id) return;
    setSaving(true);
    setError("");
    try {
      const body = {};
      if (username.trim()) body.username = username.trim();
      if (phone.trim()) body.phone = phone.replace(/\s/g, "");
      if (gender) body.gender = gender;
      if (birthDate) body.dateOfBirth = birthDate;
      if (firstName.trim()) body.firstName = firstName.trim();
      if (lastName.trim()) body.lastName = lastName.trim();

      if (Object.keys(body).length === 0) {
        setError("Nhập ít nhất một trường để cập nhật.");
        setSaving(false);
        return;
      }

      await adminUpdateModerator(token, id, body);
      navigate("/admin/moderators");
    } catch (e) {
      setError(adminApiError(e, "Cập nhật thất bại."));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="flex-1 p-8">
        <p className="text-slate-500">Đang tải…</p>
      </main>
    );
  }

  return (
    <main className="flex-1 overflow-y-auto p-8">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-primary">Sửa moderator</h2>
          <p className="mt-1 text-sm text-slate-500">PUT /api/Admin/moderators/{"{id}"}</p>
        </div>
        <button
          type="button"
          onClick={() => navigate("/admin/moderators")}
          className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
        >
          Quay lại
        </button>
      </header>

      {error ? (
        <div className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">{error}</div>
      ) : null}

      <form onSubmit={onSave} className="max-w-2xl space-y-4 rounded-xl border border-primary/10 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-600">
          Email: <span className="font-semibold text-slate-900">{emailDisplay || "—"}</span> (không đổi qua form này nếu API không hỗ trợ)
        </p>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Username</span>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-primary/40"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Điện thoại</span>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-primary/40"
          />
        </label>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Tên</span>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-primary/40"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Họ & đệm</span>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-primary/40"
            />
          </label>
        </div>
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Giới tính</span>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-primary/40"
          >
            {GENDERS.map((g) => (
              <option key={g.value || "_"} value={g.value}>
                {g.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Ngày sinh</span>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-primary/40"
          />
        </label>

        <div className="flex justify-end gap-2 pt-4">
          <button
            type="button"
            onClick={() => navigate("/admin/moderators")}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Hủy
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white hover:opacity-90 disabled:opacity-50"
          >
            {saving ? "Đang lưu…" : "Lưu"}
          </button>
        </div>
      </form>
    </main>
  );
}
