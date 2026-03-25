import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthContext";
import {
  getHostOnboardingDraft,
  saveHostOnboardingDraft,
  setHostOnboardingComplete,
  clearHostOnboardingDraft,
} from "../../../utils/hostOnboarding";
import { HOST_STEPS } from "./hostOnboardingSteps";

const IMG_HOST =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCtprjlY6ZRvEVmL5JMhqaC890HCAiuNyj4_IOwpQjpAwj_5emfO5VQMUCsIdbX-G0NXpeWAAzhrwNZOO5EdWyxMXn7yaeXtM1PQVUqI7Il_4Zh33T3IYga_SZolNGraj0yrvqDs5u0_9DmayE02MTvvP1AhJu1c_rxaTivbvQuTVTT0rHi8V84vx0QUtuNU4NK21sMWk8CEGCwU54Xj747Je8T9AF2owE3x_Z5oz0dXbL2SxWF4ldK1gihEJ6hzRvyQIPDi4-rqN7m";

const IMG_SUPPORT_STRIP =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCt35oVmCaUiG6Q1i62WlTYydz8Pc1Tf0XfNUISJOI31N_vHRiGavZyt1yWIJc01K3OqjSlWazWMX8L0ceDYgQUpjH9BR1wtRZ0J-8h96riNL7fs_8xrCEW4aOLetzPK36eRGbRCz1AeC53OtXPRIXWMcOkLqnIcyRG7VLhF6YRSGiVmHQjv2R76APg57zrOsRbrKDNJCw6e2u1ZpZL2BCGkKV8Qlc1M_lu83U9DwnJhRf1krSIoQexFkR1Hl9mNIk0dwkMhCl0V3Pr";

const IMG_OFFICE_SIDEBAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBrbW9y4YAYGGeS4KffmtYd5tyQbPW4luGFDP1JMo9_0ogJuSwz3Vpq9kcE9aP5mgGQYgTfeev2dv7tYotVMiuHqCAMH9FPXrQq-7RwiSq5o6oR3WzsIQWgrEiQ4NSUv_AQWHPBr7VQEEHW2iCj3IY3oyNxsJJt9V87f-N0XsyXSVNSkQscBMtkB189jVPldCVwo_eblPrUqM9oZ3P1a-OzVspP__wIOYnEtzB4h_1tOtyLf30oK3_Nk0bvlhP_lTbvyV6tFUXi-bXH";

const inputField =
  "w-full rounded-xl border-0 bg-primary/5 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-primary/30";

/** 6 ô OTP — giống layout Stitch */
function OtpSix({ onComplete }) {
  const [digits, setDigits] = useState(() => Array(6).fill(""));
  const refs = useRef([]);

  const setAt = (i, ch) => {
    const c = ch.replace(/\D/g, "").slice(-1) || "";
    const next = [...digits];
    next[i] = c;
    setDigits(next);
    if (c && i < 5) refs.current[i + 1]?.focus();
    const code = next.join("");
    if (code.length === 6) onComplete(code);
  };

  const onKeyDown = (i, e) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) refs.current[i - 1]?.focus();
  };

  const onPaste = (e) => {
    e.preventDefault();
    const t = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const next = t.split("");
    while (next.length < 6) next.push("");
    setDigits(next.map((d, idx) => next[idx] || ""));
    const filled = next.slice(0, 6).join("");
    if (filled.length === 6) onComplete(filled);
    refs.current[Math.min(t.length, 5)]?.focus();
  };

  return (
    <div className="mb-8 flex justify-between gap-2 md:gap-4" onPaste={onPaste}>
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={d}
          onChange={(e) => setAt(i, e.target.value)}
          onKeyDown={(e) => onKeyDown(i, e)}
          className={`h-14 w-12 rounded-xl border-2 text-center text-2xl font-bold md:h-20 md:w-16 ${
            d ? "border-primary bg-white" : "border-slate-200 bg-primary/5"
          } focus:border-primary focus:ring-0`}
        />
      ))}
    </div>
  );
}

export default function HostOnboardingPage() {
  const { step } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const current = Math.min(7, Math.max(1, parseInt(step, 10) || 1));

  const [draft, setDraft] = useState(() => getHostOnboardingDraft());
  const [otpReady, setOtpReady] = useState(false);
  const [pwStrength, setPwStrength] = useState(0);

  useEffect(() => {
    if (step && (parseInt(step, 10) < 1 || parseInt(step, 10) > 7 || Number.isNaN(parseInt(step, 10)))) {
      navigate("/host/register/1", { replace: true });
    }
  }, [step, navigate]);

  const patchDraft = (p) => {
    saveHostOnboardingDraft(p);
    setDraft((d) => ({ ...d, ...p }));
  };

  const go = (n) => navigate(`/host/register/${n}`);

  const finishAndEnterHost = async () => {
    setHostOnboardingComplete();
    clearHostOnboardingDraft();
    if (user) {
      navigate("/host/dashboard", { replace: true });
      return;
    }
    navigate("/internal/login", {
      replace: true,
      state: { from: { pathname: "/host/dashboard" } },
    });
  };

  /* ---------- Step 1 ---------- */
  if (current === 1) {
    return (
      <div className="relative">
        <div className="pointer-events-none absolute -left-[5%] -top-[10%] h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-[10%] -right-[5%] h-[500px] w-[500px] rounded-full bg-sky-500/5 blur-3xl" />

        <div className="relative mx-auto grid max-w-[1000px] gap-8 lg:grid-cols-2 lg:items-center">
          <div className="hidden space-y-8 pr-0 lg:block lg:pr-12">
            <div className="space-y-4">
              <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
                Trở thành đối tác
              </span>
              <h1 className="text-[40px] font-extrabold leading-tight tracking-tight text-primary">
                Biến không gian trống thành nguồn thu nhập.
              </h1>
              <p className="text-lg leading-relaxed text-slate-600">
                BoxHub giúp hàng ngàn cá nhân và doanh nghiệp tối ưu hóa diện tích kho bãi, gara hoặc tầng hầm còn trống.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm">
                <span className="material-symbols-outlined mb-3 text-3xl text-primary">verified_user</span>
                <h3 className="mb-1 font-bold text-primary">An tâm tuyệt đối</h3>
                <p className="text-sm text-slate-500">Quy trình xác thực người thuê chặt chẽ.</p>
              </div>
              <div className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm">
                <span className="material-symbols-outlined mb-3 text-3xl text-primary">payments</span>
                <h3 className="mb-1 font-bold text-primary">Thanh toán tự động</h3>
                <p className="text-sm text-slate-500">Nhận tiền trực tiếp vào tài khoản mỗi kỳ.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-xl border border-primary/10 bg-primary/5 py-4 pl-4 pr-6">
              <img src={IMG_HOST} alt="" className="h-12 w-12 shrink-0 rounded-full border-2 border-white object-cover shadow-sm" />
              <div>
                <p className="text-sm italic text-slate-600">
                  &quot;Tôi đã kiếm thêm thu nhập từ căn hầm không dùng đến. Quy trình cực kỳ đơn giản.&quot;
                </p>
                <p className="mt-1 text-xs font-bold text-primary">— Minh Tuấn, Host tại TP.HCM</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-sm md:p-12">
            <div className="mb-10 text-center lg:text-left">
              <h2 className="mb-2 text-2xl font-extrabold text-primary">Đăng ký Host</h2>
              <p className="text-slate-500">Bắt đầu hành trình của bạn với BoxHub ngay hôm nay.</p>
            </div>
            <form
              className="space-y-8"
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.target);
                const email = fd.get("email")?.trim();
                if (!email) return;
                patchDraft({ email });
                go(2);
              }}
            >
              <div className="space-y-3">
                <label className="ml-1 block text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  Địa chỉ email
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">mail</span>
                  <input
                    name="email"
                    type="email"
                    required
                    defaultValue={draft.email || ""}
                    placeholder="email@company.com"
                    className={`${inputField} pl-12`}
                  />
                </div>
                <p className="px-1 text-[10px] italic text-slate-400">
                  Sử dụng email cá nhân hoặc email doanh nghiệp để quản lý không gian của bạn.
                </p>
              </div>
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 text-lg font-bold text-white shadow-sm transition hover:shadow-md active:scale-[0.98]"
              >
                Gửi yêu cầu đăng ký
                <span className="material-symbols-outlined text-xl transition group-hover:translate-x-1">arrow_forward</span>
              </button>
              <p className="text-center text-xs text-slate-500">
                Bằng cách tiếp tục, bạn đồng ý với{" "}
                <span className="font-bold text-primary">Điều khoản Dịch vụ</span> và{" "}
                <span className="font-bold text-primary">Chính sách Bảo mật</span> của BoxHub.
              </p>
            </form>
          </div>
        </div>

        <footer className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200/80 py-8 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 md:flex-row">
          <span>© {new Date().getFullYear()} BoxHub Ecosystem.</span>
          <div className="flex flex-wrap justify-center gap-6">
            <span className="cursor-pointer hover:text-primary">Trung tâm trợ giúp</span>
            <span className="cursor-pointer hover:text-primary">Quy trình Host</span>
            <span className="cursor-pointer hover:text-primary">Tiêu chuẩn an toàn</span>
          </div>
        </footer>
      </div>
    );
  }

  /* ---------- Step 2 — OTP + hero Stitch ---------- */
  if (current === 2) {
    return (
      <div className="mx-auto max-w-2xl">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <span className="material-symbols-outlined text-4xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
              mail
            </span>
          </div>
          <h1 className="mb-4 text-3xl font-extrabold leading-tight text-slate-900 md:text-[30px]">
            Vui lòng kiểm tra email để xác nhận
          </h1>
          <p className="mx-auto max-w-lg text-lg text-slate-600">
            Chúng tôi đã gửi mã 6 chữ số đến{" "}
            <span className="font-bold text-primary">{draft.email || "email của bạn"}</span>. Nhập mã bên dưới (demo: bất kỳ 6 số).
          </p>
        </div>

        <div className="mb-8 rounded-xl border border-slate-200/80 bg-white p-8 shadow-sm">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!otpReady) return;
              patchDraft({ emailVerified: true });
              go(3);
            }}
          >
            <OtpSix
              onComplete={(code) => {
                if (code.length === 6) setOtpReady(true);
              }}
            />
            <button
              type="submit"
              disabled={!otpReady}
              className="w-full rounded-xl bg-primary py-4 text-lg font-bold text-white shadow-sm transition hover:brightness-110 active:scale-[0.98] disabled:opacity-50"
            >
              Xác nhận tài khoản
            </button>
          </form>
        </div>

        <div className="mb-8 flex flex-col items-center gap-6">
          <p className="font-medium text-slate-600">
            Không nhận được email?{" "}
            <button type="button" className="font-bold text-primary hover:underline">
              Gửi lại mã
            </button>
          </p>
          <div className="grid w-full max-w-md grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4">
              <span className="material-symbols-outlined text-slate-500">drafts</span>
              <div className="text-sm">
                <p className="font-bold text-slate-900">Kiểm tra Thư rác</p>
                <p className="text-xs text-slate-500">Đôi khi email bị lạc vào đây.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4">
              <span className="material-symbols-outlined text-slate-500">edit</span>
              <div className="text-sm">
                <p className="font-bold text-slate-900">Đổi địa chỉ</p>
                <p className="text-xs text-slate-500">Nhập sai email? Sửa ở bước trước.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-12 h-32 w-full overflow-hidden rounded-xl">
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-primary/10 to-transparent" />
          <img
            src={IMG_SUPPORT_STRIP}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-30 grayscale"
          />
          <div className="relative z-20 flex h-full items-center px-8">
            <p className="text-sm font-medium italic text-primary/70">
              &quot;BoxHub bảo mật thông tin của bạn thông qua quy trình xác thực đa lớp.&quot;
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button type="button" onClick={() => go(1)} className="font-bold text-slate-500 hover:text-primary">
            ← Quay lại nhập email
          </button>
        </div>
      </div>
    );
  }

  /* ---------- Step 3 — form + sidebar Stitch ---------- */
  if (current === 3) {
    return (
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-slate-900">Thông tin cá nhân</h1>
            <p className="max-w-lg text-slate-600">
              Vui lòng cung cấp chính xác thông tin định danh của chủ không gian hoặc người đại diện pháp luật.
            </p>
          </div>
          <div className="hidden text-right md:block">
            <span className="mb-1 block text-sm font-bold text-primary">Tiến độ: ~43%</span>
            <div className="h-2 w-32 overflow-hidden rounded-full bg-primary/10">
              <div className="h-full w-[43%] rounded-full bg-primary" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-8">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.target);
                patchDraft({
                  fullName: fd.get("fullName"),
                  phone: fd.get("phone"),
                  idNumber: fd.get("idNumber"),
                });
                go(4);
              }}
              className="space-y-8"
            >
              <section className="rounded-xl border border-slate-200/80 bg-white p-6 shadow-sm md:p-8">
                <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-slate-900">
                  <span className="material-symbols-outlined text-primary">badge</span>
                  Thông tin định danh
                </h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-slate-600">Họ &amp; tên</label>
                    <input name="fullName" required defaultValue={draft.fullName || ""} className={inputField} placeholder="Nhập đầy đủ họ và tên" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-600">Số điện thoại</label>
                    <input name="phone" required defaultValue={draft.phone || ""} className={inputField} placeholder="0xxx xxx xxx" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-600">CCCD / CMND</label>
                    <input name="idNumber" required defaultValue={draft.idNumber || ""} className={inputField} placeholder="12 chữ số" />
                  </div>
                </div>
              </section>

              <section className="rounded-xl border border-dashed border-slate-300 bg-slate-50/50 p-8 text-center">
                <span className="material-symbols-outlined text-4xl text-primary/40">add_a_photo</span>
                <p className="mt-2 text-sm font-bold text-slate-600">Tải ảnh CCCD (bản demo — bỏ qua)</p>
                <p className="mt-1 text-xs text-slate-500">JPG, PNG tối đa 5MB</p>
              </section>

              <div className="flex items-center justify-between pt-2">
                <button type="button" onClick={() => go(2)} className="flex items-center gap-2 font-bold text-slate-500 hover:text-primary">
                  <span className="material-symbols-outlined text-sm">arrow_back_ios</span>
                  Quay lại
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-3 rounded-xl bg-primary px-10 py-4 font-bold text-white shadow-lg shadow-primary/20 transition hover:scale-[1.02] active:scale-95"
                >
                  Tiếp tục
                  <span className="material-symbols-outlined text-sm">arrow_forward_ios</span>
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-6 lg:col-span-4">
            <div className="sticky top-24 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h4 className="mb-4 font-bold text-primary">Tại sao cần thông tin này?</h4>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                    <span className="material-symbols-outlined text-sm text-emerald-600" style={{ fontVariationSettings: "'FILL' 1" }}>
                      verified_user
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">Xác thực danh tính đảm bảo an toàn cho chủ kho và khách thuê.</p>
                </li>
                <li className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <span className="material-symbols-outlined text-sm text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                      account_balance
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">Thông tin phục vụ quyết toán và thanh toán định kỳ.</p>
                </li>
                <li className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/10">
                    <span className="material-symbols-outlined text-sm text-amber-600" style={{ fontVariationSettings: "'FILL' 1" }}>
                      lock
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">BoxHub cam kết bảo mật thông tin cá nhân của bạn.</p>
                </li>
              </ul>
              <div className="relative mt-8 overflow-hidden rounded-xl">
                <img src={IMG_OFFICE_SIDEBAR} alt="" className="h-40 w-full object-cover" />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-primary/80 to-transparent p-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white">Trust &amp; Security</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- Step 4 ---------- */
  if (current === 4) {
    return (
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-extrabold text-slate-900">Thông tin doanh nghiệp</h1>
          <p className="text-slate-600">Khai báo nếu bạn cho thuê với tư cách công ty / hộ kinh doanh.</p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.target);
            patchDraft({
              companyName: fd.get("companyName"),
              taxCode: fd.get("taxCode"),
              companyAddress: fd.get("companyAddress"),
            });
            go(5);
          }}
          className="space-y-6"
        >
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h3 className="mb-6 flex items-center gap-2 font-bold text-slate-900">
              <span className="material-symbols-outlined text-primary">storefront</span>
              Doanh nghiệp
            </h3>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600">Tên doanh nghiệp</label>
                <input name="companyName" required defaultValue={draft.companyName || ""} className={inputField} />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600">Mã số thuế</label>
                <input name="taxCode" defaultValue={draft.taxCode || ""} className={inputField} />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600">Địa chỉ trụ sở</label>
                <textarea name="companyAddress" rows={3} defaultValue={draft.companyAddress || ""} className={inputField} />
              </div>
            </div>
          </section>
          <div className="flex justify-between">
            <button type="button" onClick={() => go(3)} className="font-bold text-slate-500 hover:text-primary">
              ← Quay lại
            </button>
            <button type="submit" className="rounded-xl bg-primary px-8 py-3 font-bold text-white shadow-md">
              Tiếp tục
            </button>
          </div>
        </form>
      </div>
    );
  }

  /* ---------- Step 5 ---------- */
  if (current === 5) {
    return (
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-extrabold text-slate-900">Liên kết ngân hàng</h1>
          <p className="text-slate-600">Nhận thanh toán an toàn — thông tin được mã hóa.</p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.target);
            patchDraft({
              bankName: fd.get("bankName"),
              bankAccount: fd.get("bankAccount"),
              bankHolder: fd.get("bankHolder"),
            });
            go(6);
          }}
          className="space-y-6"
        >
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="chart-gradient mb-6 rounded-xl bg-gradient-to-b from-primary/5 to-transparent p-4">
              <p className="text-sm font-medium text-slate-600">Số dư dự kiến sẽ được chuyển vào tài khoản này sau mỗi giao dịch.</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold">Ngân hàng</label>
                <select
                  name="bankName"
                  defaultValue={draft.bankName || "Vietcombank"}
                  className={inputField}
                >
                  <option>Vietcombank</option>
                  <option>Techcombank</option>
                  <option>MB Bank</option>
                  <option>VPBank</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold">Số tài khoản</label>
                <input name="bankAccount" required defaultValue={draft.bankAccount || ""} className={inputField} />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold">Tên chủ tài khoản</label>
                <input name="bankHolder" required defaultValue={draft.bankHolder || draft.fullName || ""} className={inputField} />
              </div>
            </div>
          </section>
          <div className="flex justify-between">
            <button type="button" onClick={() => go(4)} className="font-bold text-slate-500 hover:text-primary">
              ← Quay lại
            </button>
            <button type="submit" className="rounded-xl bg-primary px-8 py-3 font-bold text-white shadow-md">
              Tiếp tục
            </button>
          </div>
        </form>
      </div>
    );
  }

  /* ---------- Step 6 ---------- */
  if (current === 6) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-amber-100">
          <span className="material-symbols-outlined text-5xl text-amber-600">hourglass_top</span>
        </div>
        <h1 className="mb-4 text-3xl font-extrabold text-slate-900">Hồ sơ đang được xem xét</h1>
        <p className="mb-10 max-w-lg text-lg text-slate-600">
          BoxHub thường phản hồi trong <strong className="text-primary">24–48 giờ</strong>. Bạn sẽ nhận email khi được duyệt. Demo: nhấn nút bên dưới để
          mô phỏng đã duyệt.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => go(5)}
            className="rounded-xl border-2 border-slate-200 px-10 py-4 font-bold text-slate-700 transition hover:bg-slate-50"
          >
            Quay lại
          </button>
          <button
            type="button"
            onClick={() => go(7)}
            className="rounded-xl bg-primary px-10 py-4 font-bold text-white shadow-lg shadow-primary/25"
          >
            Đã được duyệt (demo)
          </button>
        </div>
      </div>
    );
  }

  /* ---------- Step 7 ---------- */
  const step7Label = HOST_STEPS.find((s) => s.n === 7)?.label || "";
  return (
    <div className="mx-auto max-w-lg">
      <div className="mb-8 hidden text-center lg:block">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{step7Label}</p>
      </div>
      <h1 className="mb-2 text-3xl font-extrabold text-slate-900">Tạo mật khẩu</h1>
      <p className="mb-8 text-slate-600">Hoàn tất để vào trang quản lý Host. Tối thiểu 8 ký tự.</p>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const fd = new FormData(e.target);
          const pw = fd.get("password");
          const pw2 = fd.get("confirm");
          if (pw !== pw2 || String(pw).length < 8) return;
          patchDraft({ passwordSet: true });
          await finishAndEnterHost();
        }}
        className="space-y-6"
      >
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold">Mật khẩu</label>
              <input
                name="password"
                type="password"
                required
                minLength={8}
                onChange={(e) => {
                  const len = e.target.value.length;
                  setPwStrength(len < 8 ? 1 : len < 12 ? 2 : 3);
                }}
                className={inputField}
              />
              <div className="mt-2 flex gap-1">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full ${
                      pwStrength >= i ? (pwStrength === 1 ? "bg-red-400" : pwStrength === 2 ? "bg-amber-400" : "bg-emerald-500") : "bg-slate-200"
                    }`}
                  />
                ))}
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold">Nhập lại mật khẩu</label>
              <input name="confirm" type="password" required minLength={8} className={inputField} />
            </div>
          </div>
        </section>
        <div className="flex gap-3">
          <button type="button" onClick={() => go(6)} className="flex-1 rounded-xl border border-slate-200 py-4 font-bold text-slate-600">
            Quay lại
          </button>
          <button type="submit" className="flex-1 rounded-xl bg-primary py-4 font-bold text-white shadow-md">
            Hoàn tất đăng ký
          </button>
        </div>
      </form>
    </div>
  );
}
