import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { adminApiError, adminRegisterAdmin } from "../../services/adminService";

const GENDERS = [
  { value: "", label: "Chọn giới tính" },
  { value: "Male", label: "Nam" },
  { value: "Female", label: "Nữ" },
  { value: "Other", label: "Khác" },
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

export default function AdminAdminCreate() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const token = user?.token;

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");

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

    if (!form.firstName.trim()) next.firstName = "Vui lòng nhập tên.";
    if (!form.lastName.trim()) next.lastName = "Vui lòng nhập họ / đệm.";
    if (!username) next.username = "Vui lòng nhập username.";
    else if (!/^[a-z0-9._-]{4,50}$/.test(username)) next.username = "Username không hợp lệ.";
    if (!email) next.email = "Vui lòng nhập email.";
    else if (!isValidEmail(email)) next.email = "Email không hợp lệ.";
    if (!form.phone.trim()) next.phone = "Cần số điện thoại.";
    else if (!/^[0-9]{9,15}$/.test(form.phone.replace(/\s/g, ""))) next.phone = "SĐT không hợp lệ.";
    if (!form.birthDate) next.birthDate = "Chọn ngày sinh.";
    if (!form.gender) next.gender = "Chọn giới tính.";
    if (!form.password) next.password = "Nhập mật khẩu.";
    else if (!isStrongPassword(form.password)) next.password = "Mật khẩu chưa đủ mạnh.";
    if (form.confirmPassword !== form.password) next.confirmPassword = "Mật khẩu xác nhận không khớp.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    if (!validate()) return;
    if (!token) {
      setApiError("Chưa đăng nhập.");
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
      await adminRegisterAdmin(token, body);
      navigate("/admin/users");
    } catch (err) {
      setApiError(adminApiError(err, "Đăng ký admin thất bại."));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex-1 overflow-y-auto p-8">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-primary">Tạo tài khoản Admin</h2>
          <p className="text-sm text-slate-500">POST /api/Admin/Register</p>
        </div>
        <button
          type="button"
          onClick={() => navigate("/admin/moderators")}
          className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
        >
          Quay lại
        </button>
      </header>

      {apiError ? (
        <div className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">{apiError}</div>
      ) : null}

      <form onSubmit={onSubmit} className="max-w-3xl space-y-6">
        <section className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Tên</span>
              <input
                value={form.firstName}
                onChange={(e) => updateField("firstName", e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              />
              {errors.firstName ? <p className="mt-1 text-xs text-rose-600">{errors.firstName}</p> : null}
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Họ & đệm</span>
              <input
                value={form.lastName}
                onChange={(e) => updateField("lastName", e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              />
              {errors.lastName ? <p className="mt-1 text-xs text-rose-600">{errors.lastName}</p> : null}
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Username</span>
              <input
                value={form.username}
                onChange={(e) => updateField("username", e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              />
              {errors.username ? <p className="mt-1 text-xs text-rose-600">{errors.username}</p> : null}
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Email</span>
              <input
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              />
              {errors.email ? <p className="mt-1 text-xs text-rose-600">{errors.email}</p> : null}
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Điện thoại</span>
              <input
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              />
              {errors.phone ? <p className="mt-1 text-xs text-rose-600">{errors.phone}</p> : null}
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Ngày sinh</span>
              <input
                type="date"
                value={form.birthDate}
                onChange={(e) => updateField("birthDate", e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              />
              {errors.birthDate ? <p className="mt-1 text-xs text-rose-600">{errors.birthDate}</p> : null}
            </label>
            <label className="block md:col-span-2">
              <span className="text-sm font-semibold text-slate-700">Giới tính</span>
              <select
                value={form.gender}
                onChange={(e) => updateField("gender", e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
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
        </section>

        <section className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Mật khẩu</span>
              <input
                type="password"
                value={form.password}
                onChange={(e) => updateField("password", e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              />
              {errors.password ? <p className="mt-1 text-xs text-rose-600">{errors.password}</p> : null}
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Xác nhận</span>
              <input
                type="password"
                value={form.confirmPassword}
                onChange={(e) => updateField("confirmPassword", e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              />
              {errors.confirmPassword ? <p className="mt-1 text-xs text-rose-600">{errors.confirmPassword}</p> : null}
            </label>
          </div>
          <ul className="mt-3 space-y-1 text-xs text-slate-500">
            <li className={passwordRules.length ? "text-emerald-600" : ""}>≥ 8 ký tự</li>
            <li className={passwordRules.upper ? "text-emerald-600" : ""}>Chữ hoa</li>
            <li className={passwordRules.lower ? "text-emerald-600" : ""}>Chữ thường</li>
            <li className={passwordRules.number ? "text-emerald-600" : ""}>Chữ số</li>
          </ul>
        </section>

        <div className="flex justify-end gap-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-primary px-5 py-2 text-sm font-bold text-white hover:opacity-90 disabled:opacity-50"
          >
            {isSubmitting ? "Đang tạo…" : "Tạo admin"}
          </button>
        </div>
      </form>
    </main>
  );
}
