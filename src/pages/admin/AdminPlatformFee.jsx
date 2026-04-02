import React, { useCallback, useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import {
  adminApiError,
  adminDeactivatePlatformFeeConfig,
  adminGetPlatformFeeConfig,
  adminGetPlatformFeeTimeline,
  adminPostPlatformFeeConfig,
} from "../../services/adminService";

function pretty(obj) {
  try {
    return JSON.stringify(obj, null, 2);
  } catch {
    return String(obj);
  }
}

export default function AdminPlatformFee() {
  const { user } = useAuthContext();
  const token = user?.token;

  const [current, setCurrent] = useState(null);
  const [timeline, setTimeline] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const [feeCode, setFeeCode] = useState("COMMISSION");
  const [feeName, setFeeName] = useState("Commission");
  const [feeType, setFeeType] = useState("");
  const [calcMethod, setCalcMethod] = useState("PERCENTAGE");
  const [pct, setPct] = useState("10");
  const [fixed, setFixed] = useState("");
  const [appliedBaseOn, setAppliedBaseOn] = useState("BOX_PRICE");
  const [priority, setPriority] = useState("1");
  const [calcOrder, setCalcOrder] = useState("1");
  const [effectiveFrom, setEffectiveFrom] = useState("");
  const [effectiveTo, setEffectiveTo] = useState("");

  const refresh = useCallback(async () => {
    if (!token) {
      setError("Chưa đăng nhập.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError("");
    try {
      const [c, t] = await Promise.all([
        adminGetPlatformFeeConfig(token),
        adminGetPlatformFeeTimeline(token, {}),
      ]);
      setCurrent(c.data);
      setTimeline(t.data);
    } catch (e) {
      setError(adminApiError(e, "Không tải được cấu hình phí."));
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!token) return;
    if (!effectiveFrom) {
      setError("Cần EffectiveFrom (ISO date-time).");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("FeeCode", feeCode);
      fd.append("FeeName", feeName);
      if (feeType) fd.append("FeeType", feeType);
      fd.append("CalculationMethod", calcMethod);
      if (calcMethod === "PERCENTAGE" && pct !== "") fd.append("PercentageValue", String(pct));
      if (calcMethod === "FIXED" && fixed !== "") fd.append("FixedAmount", String(fixed));
      fd.append("AppliedBaseOn", appliedBaseOn);
      fd.append("Priority", String(priority));
      fd.append("CalculationOrder", String(calcOrder));
      const fromIso = effectiveFrom.includes("T") ? effectiveFrom : `${effectiveFrom}:00`;
      fd.append("EffectiveFrom", new Date(fromIso).toISOString());
      if (effectiveTo) {
        const toIso = effectiveTo.includes("T") ? effectiveTo : `${effectiveTo}:00`;
        fd.append("EffectiveTo", new Date(toIso).toISOString());
      }

      await adminPostPlatformFeeConfig(token, fd);
      await refresh();
    } catch (e2) {
      setError(adminApiError(e2, "Tạo cấu hình phí thất bại."));
    } finally {
      setBusy(false);
    }
  };

  const deactivateId = async () => {
    const raw = window.prompt("Nhập configId (UUID) cần deactivate:");
    if (!raw || !token) return;
    setBusy(true);
    setError("");
    try {
      await adminDeactivatePlatformFeeConfig(token, raw.trim());
      await refresh();
    } catch (e2) {
      setError(adminApiError(e2, "Deactivate thất bại."));
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="flex-1 overflow-y-auto p-8">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">Phí nền tảng</h2>
          <p className="text-sm text-slate-500">GET/POST multipart /api/admin/pricing/platform-fee-config</p>
        </div>
        <button type="button" onClick={() => refresh()} className="rounded-lg border border-slate-200 px-4 py-2 text-sm">
          Làm mới
        </button>
      </header>

      {error ? (
        <div className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">{error}</div>
      ) : null}

      <div className="mb-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <section className="rounded-xl border border-slate-200 bg-slate-900 p-4 text-slate-100">
          <h3 className="text-sm font-bold text-primary">Cấu hình hiện tại (raw)</h3>
          <pre className="mt-2 max-h-80 overflow-auto text-xs">{loading ? "…" : pretty(current)}</pre>
        </section>
        <section className="rounded-xl border border-slate-200 bg-slate-900 p-4 text-slate-100">
          <h3 className="text-sm font-bold text-sky-300">Timeline (raw)</h3>
          <pre className="mt-2 max-h-80 overflow-auto text-xs">{loading ? "…" : pretty(timeline)}</pre>
        </section>
      </div>

      <form onSubmit={onSubmit} className="max-w-3xl space-y-3 rounded-xl border border-primary/15 bg-white p-6 shadow-sm">
        <h3 className="font-bold text-slate-900">Tạo cấu hình mới (multipart)</h3>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <label className="block text-sm">
            FeeCode
            <select value={feeCode} onChange={(e) => setFeeCode(e.target.value)} className="mt-1 w-full rounded border px-2 py-2">
              <option value="COMMISSION">COMMISSION</option>
              <option value="SERVICE_FEE">SERVICE_FEE</option>
              <option value="VAT">VAT</option>
            </select>
          </label>
          <label className="block text-sm">
            FeeName
            <input value={feeName} onChange={(e) => setFeeName(e.target.value)} className="mt-1 w-full rounded border px-2 py-2" />
          </label>
          <label className="block text-sm">
            FeeType (tuỳ chọn)
            <select value={feeType} onChange={(e) => setFeeType(e.target.value)} className="mt-1 w-full rounded border px-2 py-2">
              <option value="">—</option>
              <option value="HOST_FEE">HOST_FEE</option>
              <option value="GUEST_FEE">GUEST_FEE</option>
            </select>
          </label>
          <label className="block text-sm">
            CalculationMethod
            <select value={calcMethod} onChange={(e) => setCalcMethod(e.target.value)} className="mt-1 w-full rounded border px-2 py-2">
              <option value="PERCENTAGE">PERCENTAGE</option>
              <option value="FIXED">FIXED</option>
            </select>
          </label>
          <label className="block text-sm">
            PercentageValue
            <input value={pct} onChange={(e) => setPct(e.target.value)} className="mt-1 w-full rounded border px-2 py-2" />
          </label>
          <label className="block text-sm">
            FixedAmount
            <input value={fixed} onChange={(e) => setFixed(e.target.value)} className="mt-1 w-full rounded border px-2 py-2" />
          </label>
          <label className="block text-sm">
            AppliedBaseOn
            <select value={appliedBaseOn} onChange={(e) => setAppliedBaseOn(e.target.value)} className="mt-1 w-full rounded border px-2 py-2">
              <option value="BOX_PRICE">BOX_PRICE</option>
              <option value="SUBTOTAL">SUBTOTAL</option>
              <option value="TOTAL_BOOKING">TOTAL_BOOKING</option>
              <option value="COMMISSION_AMOUNT">COMMISSION_AMOUNT</option>
            </select>
          </label>
          <label className="block text-sm">
            Priority
            <input value={priority} onChange={(e) => setPriority(e.target.value)} className="mt-1 w-full rounded border px-2 py-2" />
          </label>
          <label className="block text-sm">
            CalculationOrder
            <input value={calcOrder} onChange={(e) => setCalcOrder(e.target.value)} className="mt-1 w-full rounded border px-2 py-2" />
          </label>
          <label className="block text-sm">
            EffectiveFrom (datetime-local)
            <input
              type="datetime-local"
              value={effectiveFrom}
              onChange={(e) => setEffectiveFrom(e.target.value)}
              className="mt-1 w-full rounded border px-2 py-2"
            />
          </label>
          <label className="block text-sm">
            EffectiveTo (tuỳ chọn)
            <input
              type="datetime-local"
              value={effectiveTo}
              onChange={(e) => setEffectiveTo(e.target.value)}
              className="mt-1 w-full rounded border px-2 py-2"
            />
          </label>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="submit" disabled={busy} className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white disabled:opacity-50">
            Gửi POST
          </button>
          <button type="button" disabled={busy} onClick={deactivateId} className="rounded-lg border border-rose-200 px-4 py-2 text-sm text-rose-700">
            Deactivate theo ID…
          </button>
        </div>
      </form>
    </main>
  );
}
