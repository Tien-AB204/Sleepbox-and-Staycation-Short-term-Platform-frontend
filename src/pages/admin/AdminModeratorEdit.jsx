import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { AdminErrorAlert, AdminPage, AdminPageHeader, AdminSection } from "../../components/admin/AdminPageChrome";
import { adminBtnPrimary, adminBtnSecondary, adminInput, adminSelect } from "../../components/admin/adminUi";
import { useAuthContext } from "../../contexts/AuthContext";
import { adminApiError, adminGetUserList, adminUpdateModerator } from "../../services/adminService";

const GENDERS = [
  { value: "", label: "— No change / leave empty —" },
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
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
      setError("Missing token or moderator id.");
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
        setError("Moderator not found.");
      } else {
        hydrate(row);
      }
    } catch (e) {
      setError(adminApiError(e, "Could not load moderator."));
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
        setError("Enter at least one field to update.");
        setSaving(false);
        return;
      }

      await adminUpdateModerator(token, id, body);
      navigate("/admin/moderators");
    } catch (e) {
      setError(adminApiError(e, "Update failed."));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminPage narrow>
        <p className="text-sm text-slate-500">Loading…</p>
      </AdminPage>
    );
  }

  return (
    <AdminPage narrow>
      <AdminPageHeader
        title="Edit moderator"
        description="Update profile details for this moderator."
        actions={
          <button type="button" onClick={() => navigate("/admin/moderators")} className={adminBtnSecondary}>
            Back
          </button>
        }
      />

      <AdminErrorAlert>{error}</AdminErrorAlert>

      <AdminSection className="max-w-2xl">
        <form onSubmit={onSave} className="space-y-4">
          <p className="text-sm text-slate-600">
            Email: <span className="font-semibold text-slate-900">{emailDisplay || "—"}</span> (read-only on this screen)
          </p>

          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Username</span>
            <input value={username} onChange={(e) => setUsername(e.target.value)} className={`${adminInput} mt-1.5`} />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Phone</span>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} className={`${adminInput} mt-1.5`} />
          </label>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">First name</span>
              <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className={`${adminInput} mt-1.5`} />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Last name</span>
              <input value={lastName} onChange={(e) => setLastName(e.target.value)} className={`${adminInput} mt-1.5`} />
            </label>
          </div>
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Gender</span>
            <select value={gender} onChange={(e) => setGender(e.target.value)} className={`${adminSelect} mt-1.5`}>
              {GENDERS.map((g) => (
                <option key={g.value || "_"} value={g.value}>
                  {g.label}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Date of birth</span>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className={`${adminInput} mt-1.5`}
            />
          </label>

          <div className="flex justify-end gap-2 pt-4">
            <button type="button" onClick={() => navigate("/admin/moderators")} className={adminBtnSecondary}>
              Cancel
            </button>
            <button type="submit" disabled={saving} className={adminBtnPrimary}>
              {saving ? "Saving…" : "Save"}
            </button>
          </div>
        </form>
      </AdminSection>
    </AdminPage>
  );
}
