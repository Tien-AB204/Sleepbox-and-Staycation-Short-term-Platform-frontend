import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminErrorAlert, AdminPage, AdminPageHeader, AdminSection } from "../../components/admin/AdminPageChrome";
import {
  adminBtnPrimary,
  adminBtnSecondary,
  adminCard,
  adminInput,
  adminLabel as adminLabelClass,
  adminSelect,
} from "../../components/admin/adminUi";
import { useAuthContext } from "../../contexts/AuthContext";
import { adminApiError, adminRegisterModerator } from "../../services/adminService";

const GENDERS = [
  { value: "", label: "Select gender" },
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
];

function isStrongPassword(value) {
  return value.length >= 8 && /[A-Z]/.test(value) && /[a-z]/.test(value) && /\d/.test(value);
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

const initialForm = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  phone: "",
  birthDate: "",
  gender: "",
  password: "",
  confirmPassword: "",
};

export default function AdminModeratorCreate() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const token = user?.token;

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");

  const adminLabel = user?.email || user?.unique_name || "Admin";

  const passwordRules = useMemo(
    () => ({
      length: form.password.length >= 8,
      upper: /[A-Z]/.test(form.password),
      lower: /[a-z]/.test(form.password),
      number: /\d/.test(form.password),
    }),
    [form.password],
  );

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
    setApiError("");
  };

  const validate = () => {
    const next = {};
    const username = form.username.trim().toLowerCase();
    const email = form.email.trim().toLowerCase();

    if (!form.firstName.trim()) next.firstName = "Please enter first name.";
    if (!form.lastName.trim()) next.lastName = "Please enter last name.";

    if (!username) next.username = "Please enter username.";
    else if (!/^[a-z0-9._-]{4,50}$/.test(username)) {
      next.username = "Username: lowercase letters, digits, . _ - and 4–50 characters.";
    }

    if (!email) next.email = "Please enter email.";
    else if (!isValidEmail(email)) next.email = "Invalid email.";

    if (!form.phone.trim()) next.phone = "Please enter phone number.";
    else if (!/^[0-9]{9,15}$/.test(form.phone.replace(/\s/g, ""))) next.phone = "Invalid phone number.";

    if (!form.birthDate) next.birthDate = "Please select date of birth.";
    if (!form.gender) next.gender = "Please select gender.";

    if (!form.password) next.password = "Enter a password.";
    else if (!isStrongPassword(form.password)) {
      next.password = "Password needs ≥8 characters with uppercase, lowercase, and a digit.";
    }

    if (form.confirmPassword !== form.password) next.confirmPassword = "Passwords do not match.";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    if (!validate()) return;
    if (!token) {
      setApiError("Not signed in.");
      return;
    }

    const body = {
      username: form.username.trim().toLowerCase(),
      email: form.email.trim().toLowerCase(),
      password: form.password,
      phone: form.phone.replace(/\s/g, ""),
      gender: form.gender,
      dateOfBirth: form.birthDate,
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
    };

    setIsSubmitting(true);
    try {
      await adminRegisterModerator(token, body);
      navigate("/admin/moderators");
    } catch (err) {
      setApiError(adminApiError(err, "Failed to create moderator."));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminPage narrow>
      <AdminPageHeader
        title="Create moderator"
        description="Invite someone to help moderate listings and users."
        actions={
          <button type="button" onClick={() => navigate("/admin/moderators")} className={adminBtnSecondary}>
            Back
          </button>
        }
      />

      <AdminErrorAlert>{apiError}</AdminErrorAlert>

      <div className={`${adminCard} mb-6 p-5 sm:p-6`}>
        <span className={adminLabelClass}>Acting admin</span>
        <p className="mt-1 text-sm font-semibold text-slate-900">{adminLabel}</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <AdminSection title="Profile">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-sm font-semibold text-slate-700">First name</span>
              <input
                value={form.firstName}
                onChange={(e) => updateField("firstName", e.target.value)}
                className={adminInput}
              />
              {errors.firstName ? <p className="mt-1 text-xs text-rose-600">{errors.firstName}</p> : null}
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-semibold text-slate-700">Last name</span>
              <input
                value={form.lastName}
                onChange={(e) => updateField("lastName", e.target.value)}
                className={adminInput}
              />
              {errors.lastName ? <p className="mt-1 text-xs text-rose-600">{errors.lastName}</p> : null}
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-semibold text-slate-700">Username</span>
              <input
                value={form.username}
                onChange={(e) => updateField("username", e.target.value)}
                className={adminInput}
              />
              {errors.username ? <p className="mt-1 text-xs text-rose-600">{errors.username}</p> : null}
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-semibold text-slate-700">Email</span>
              <input
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                className={adminInput}
              />
              {errors.email ? <p className="mt-1 text-xs text-rose-600">{errors.email}</p> : null}
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-semibold text-slate-700">Phone</span>
              <input
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                className={adminInput}
              />
              {errors.phone ? <p className="mt-1 text-xs text-rose-600">{errors.phone}</p> : null}
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-semibold text-slate-700">Date of birth</span>
              <input
                type="date"
                value={form.birthDate}
                onChange={(e) => updateField("birthDate", e.target.value)}
                className={adminInput}
              />
              {errors.birthDate ? <p className="mt-1 text-xs text-rose-600">{errors.birthDate}</p> : null}
            </label>
            <label className="block md:col-span-2">
              <span className="mb-1 block text-sm font-semibold text-slate-700">Gender</span>
              <select
                value={form.gender}
                onChange={(e) => updateField("gender", e.target.value)}
                className={adminSelect}
              >
                {GENDERS.map((g) => (
                  <option key={g.value || "x"} value={g.value}>
                    {g.label}
                  </option>
                ))}
              </select>
              {errors.gender ? <p className="mt-1 text-xs text-rose-600">{errors.gender}</p> : null}
            </label>
          </div>
        </AdminSection>

        <AdminSection title="Password">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-sm font-semibold text-slate-700">Password</span>
              <input
                type="password"
                value={form.password}
                onChange={(e) => updateField("password", e.target.value)}
                className={adminInput}
              />
              {errors.password ? <p className="mt-1 text-xs text-rose-600">{errors.password}</p> : null}
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-semibold text-slate-700">Confirm</span>
              <input
                type="password"
                value={form.confirmPassword}
                onChange={(e) => updateField("confirmPassword", e.target.value)}
                className={adminInput}
              />
              {errors.confirmPassword ? <p className="mt-1 text-xs text-rose-600">{errors.confirmPassword}</p> : null}
            </label>
          </div>
          <ul className="mt-3 space-y-1 text-xs text-slate-500">
            <li className={passwordRules.length ? "text-emerald-600" : ""}>≥ 8 characters</li>
            <li className={passwordRules.upper ? "text-emerald-600" : ""}>Uppercase letter</li>
            <li className={passwordRules.lower ? "text-emerald-600" : ""}>Lowercase letter</li>
            <li className={passwordRules.number ? "text-emerald-600" : ""}>Digit</li>
          </ul>
        </AdminSection>

        <div className="flex flex-wrap justify-end gap-3">
          <button type="button" onClick={() => navigate("/admin/moderators")} className={adminBtnSecondary}>
            Cancel
          </button>
          <button type="submit" disabled={isSubmitting} className={adminBtnPrimary}>
            {isSubmitting ? "Submitting…" : "Create moderator"}
          </button>
        </div>
      </form>
    </AdminPage>
  );
}
