import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

const EXISTING_USERNAMES = ["julian.vance", "elena.rossi", "marcus.chen", "admin.boxhub"];
const EXISTING_EMAILS = ["vance.j@boxhub.com", "rossi.e@boxhub.com", "chen.m@boxhub.com", "admin@boxhub.vn"];

const GENDERS = [
  { value: "", label: "Chọn giới tính" },
  { value: "male", label: "Nam" },
  { value: "female", label: "Nữ" },
  { value: "other", label: "Khác" },
];

const initialForm = {
  fullName: "",
  username: "",
  email: "",
  phone: "",
  birthDate: "",
  gender: "",
  password: "",
  confirmPassword: "",
  verifyCode: "",
};

function isStrongPassword(value) {
  const hasMinLength = value.length >= 8;
  const hasUpper = /[A-Z]/.test(value);
  const hasLower = /[a-z]/.test(value);
  const hasNumber = /\d/.test(value);
  return hasMinLength && hasUpper && hasLower && hasNumber;
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function AdminModeratorCreate() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  const adminName = user?.name || user?.fullName || user?.username || user?.email || "Admin BoxHub";
  const adminEmail = user?.email || "admin@boxhub.vn";

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
    if (key === "email") {
      setEmailVerified(false);
      setVerificationSent(false);
      setForm((prev) => ({ ...prev, verifyCode: "" }));
    }
  };

  const sendVerificationCode = () => {
    if (!isValidEmail(form.email)) {
      setErrors((prev) => ({ ...prev, email: "Email không đúng định dạng." }));
      return;
    }
    const duplicated = EXISTING_EMAILS.includes(form.email.trim().toLowerCase());
    if (duplicated) {
      setErrors((prev) => ({ ...prev, email: "Email đã tồn tại trong hệ thống." }));
      return;
    }
    setVerificationSent(true);
  };

  const verifyEmailCode = () => {
    if (!verificationSent) return;
    if (form.verifyCode.trim() === "123456") {
      setEmailVerified(true);
      setErrors((prev) => ({ ...prev, verifyCode: "" }));
      return;
    }
    setEmailVerified(false);
    setErrors((prev) => ({ ...prev, verifyCode: "Mã xác thực không đúng. Dùng mã demo: 123456." }));
  };

  const validate = () => {
    const next = {};
    const username = form.username.trim().toLowerCase();
    const email = form.email.trim().toLowerCase();

    if (!form.fullName.trim()) next.fullName = "Vui lòng nhập họ và tên.";
    if (!username) next.username = "Vui lòng nhập username.";
    else if (!/^[a-z0-9._-]{4,20}$/.test(username)) {
      next.username = "Username chỉ gồm chữ thường, số, dấu . _ - và từ 4-20 ký tự.";
    } else if (EXISTING_USERNAMES.includes(username)) {
      next.username = "Username đã tồn tại.";
    }

    if (!email) next.email = "Vui lòng nhập email.";
    else if (!isValidEmail(email)) next.email = "Email không đúng định dạng.";
    else if (EXISTING_EMAILS.includes(email)) next.email = "Email đã tồn tại trong hệ thống.";

    if (!form.phone.trim()) next.phone = "Vui lòng nhập số điện thoại.";
    else if (!/^[0-9]{9,11}$/.test(form.phone.trim())) next.phone = "Số điện thoại gồm 9-11 chữ số.";

    if (!form.birthDate) next.birthDate = "Vui lòng chọn ngày sinh.";
    if (!form.gender) next.gender = "Vui lòng chọn giới tính.";

    if (!form.password) next.password = "Vui lòng nhập mật khẩu.";
    else if (!isStrongPassword(form.password)) {
      next.password = "Mật khẩu chưa đủ mạnh (>=8 ký tự, có hoa, thường, số).";
    }

    if (!form.confirmPassword) next.confirmPassword = "Vui lòng xác nhận mật khẩu.";
    else if (form.confirmPassword !== form.password) next.confirmPassword = "Mật khẩu xác nhận không khớp.";

    if (!emailVerified) next.verifyCode = "Email chưa được xác thực.";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    window.setTimeout(() => {
      setIsSubmitting(false);
      navigate("/admin/moderators");
    }, 600);
  };

  return (
    <main className="flex-1 overflow-y-auto p-8">
      <header className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-primary">Tạo mới Moderator</h2>
          <p className="mt-1 text-slate-500">Chỉ Admin mới có quyền tạo hoặc thay đổi thông tin tài khoản Moderator.</p>
        </div>
        <button
          type="button"
          onClick={() => navigate("/admin/moderators")}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50"
        >
          Quay lại danh sách
        </button>
      </header>

      <section className="mb-6 rounded-xl border border-primary/10 bg-white p-5 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Admin đang thao tác</p>
        <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="rounded-lg bg-slate-50 px-4 py-3">
            <p className="text-xs text-slate-500">Tên Admin</p>
            <p className="text-sm font-bold text-slate-900">{adminName}</p>
          </div>
          <div className="rounded-lg bg-slate-50 px-4 py-3">
            <p className="text-xs text-slate-500">Email Admin</p>
            <p className="text-sm font-bold text-slate-900">{adminEmail}</p>
          </div>
        </div>
      </section>

      <form onSubmit={onSubmit} className="space-y-6">
        <section className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-bold text-slate-900">Thông tin cá nhân</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-sm font-semibold text-slate-700">Họ + Tên</span>
              <input
                value={form.fullName}
                onChange={(e) => updateField("fullName", e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/20"
              />
              {errors.fullName ? <p className="mt-1 text-xs font-medium text-rose-600">{errors.fullName}</p> : null}
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-semibold text-slate-700">Username</span>
              <input
                value={form.username}
                onChange={(e) => updateField("username", e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/20"
              />
              {errors.username ? <p className="mt-1 text-xs font-medium text-rose-600">{errors.username}</p> : null}
            </label>

            <div className="md:col-span-2">
              <span className="mb-1 block text-sm font-semibold text-slate-700">Email (có xác thực)</span>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto]">
                <input
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/20"
                />
                <button
                  type="button"
                  onClick={sendVerificationCode}
                  className="rounded-xl border border-primary/20 px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
                >
                  Gửi mã xác thực
                </button>
              </div>
              {errors.email ? <p className="mt-1 text-xs font-medium text-rose-600">{errors.email}</p> : null}
              <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto]">
                <input
                  value={form.verifyCode}
                  onChange={(e) => updateField("verifyCode", e.target.value)}
                  placeholder="Nhập mã xác thực email"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/20"
                />
                <button
                  type="button"
                  onClick={verifyEmailCode}
                  className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:bg-slate-300"
                  disabled={!verificationSent}
                >
                  Xác thực email
                </button>
              </div>
              <p className="mt-1 text-xs text-slate-500">Mã demo để test: 123456</p>
              {errors.verifyCode ? <p className="mt-1 text-xs font-medium text-rose-600">{errors.verifyCode}</p> : null}
              {emailVerified ? <p className="mt-1 text-xs font-semibold text-emerald-600">Email đã được xác thực.</p> : null}
            </div>

            <label className="block">
              <span className="mb-1 block text-sm font-semibold text-slate-700">Số điện thoại</span>
              <input
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/20"
              />
              {errors.phone ? <p className="mt-1 text-xs font-medium text-rose-600">{errors.phone}</p> : null}
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-semibold text-slate-700">Ngày sinh</span>
              <input
                type="date"
                value={form.birthDate}
                onChange={(e) => updateField("birthDate", e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/20"
              />
              {errors.birthDate ? <p className="mt-1 text-xs font-medium text-rose-600">{errors.birthDate}</p> : null}
            </label>

            <label className="block md:col-span-2">
              <span className="mb-1 block text-sm font-semibold text-slate-700">Giới tính</span>
              <select
                value={form.gender}
                onChange={(e) => updateField("gender", e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/20"
              >
                {GENDERS.map((g) => (
                  <option key={g.value} value={g.value}>
                    {g.label}
                  </option>
                ))}
              </select>
              {errors.gender ? <p className="mt-1 text-xs font-medium text-rose-600">{errors.gender}</p> : null}
            </label>
          </div>
        </section>

        <section className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-bold text-slate-900">Thông tin đăng nhập</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-sm font-semibold text-slate-700">Mật khẩu</span>
              <input
                type="password"
                value={form.password}
                onChange={(e) => updateField("password", e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/20"
              />
              {errors.password ? <p className="mt-1 text-xs font-medium text-rose-600">{errors.password}</p> : null}
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-semibold text-slate-700">Xác nhận mật khẩu</span>
              <input
                type="password"
                value={form.confirmPassword}
                onChange={(e) => updateField("confirmPassword", e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/20"
              />
              {errors.confirmPassword ? <p className="mt-1 text-xs font-medium text-rose-600">{errors.confirmPassword}</p> : null}
            </label>
          </div>

          <div className="mt-4 rounded-lg bg-slate-50 p-3">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">Password hợp lệ</p>
            <ul className="space-y-1 text-xs">
              <li className={passwordRules.length ? "text-emerald-600" : "text-slate-500"}>Tối thiểu 8 ký tự</li>
              <li className={passwordRules.upper ? "text-emerald-600" : "text-slate-500"}>Có ít nhất 1 chữ in hoa</li>
              <li className={passwordRules.lower ? "text-emerald-600" : "text-slate-500"}>Có ít nhất 1 chữ thường</li>
              <li className={passwordRules.number ? "text-emerald-600" : "text-slate-500"}>Có ít nhất 1 chữ số</li>
            </ul>
          </div>
        </section>

        <section className="rounded-xl border border-primary/10 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-600">
            Ghi chú: Moderator phải tự lưu thông tin đăng nhập. Nếu thay đổi thông tin tài khoản, chỉ Admin mới có quyền thực hiện.
          </p>
        </section>

        <div className="flex flex-wrap justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate("/admin/moderators")}
            className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            Hủy
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {isSubmitting ? "Đang tạo..." : "Tạo tài khoản"}
          </button>
        </div>
      </form>
    </main>
  );
}
