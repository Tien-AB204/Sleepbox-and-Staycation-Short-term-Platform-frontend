import React, { useCallback, useEffect, useState } from "react";
import { AdminErrorAlert, AdminPage, AdminPageHeader, AdminSection } from "../../components/admin/AdminPageChrome";
import {
  adminBtnDangerOutline,
  adminBtnPrimary,
  adminBtnSecondary,
  adminCodeBlock,
  adminInput,
  adminSelect,
} from "../../components/admin/adminUi";
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
      setError("Not signed in.");
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
      setError(adminApiError(e, "Could not load fee configuration."));
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
      setError("EffectiveFrom is required (ISO date-time).");
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
      setError(adminApiError(e2, "Failed to create fee configuration."));
    } finally {
      setBusy(false);
    }
  };

  const deactivateId = async () => {
    const raw = window.prompt("Enter configId (UUID) to deactivate:");
    if (!raw || !token) return;
    setBusy(true);
    setError("");
    try {
      await adminDeactivatePlatformFeeConfig(token, raw.trim());
      await refresh();
    } catch (e2) {
      setError(adminApiError(e2, "Deactivate failed."));
    } finally {
      setBusy(false);
    }
  };

  return (
    <AdminPage>
      <AdminPageHeader
        title="Platform fee"
        description="Commission and service fees applied to bookings."
        actions={
          <button type="button" onClick={() => refresh()} className={adminBtnSecondary}>
            Refresh
          </button>
        }
      />

      <AdminErrorAlert>{error}</AdminErrorAlert>

      <div className="mb-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <AdminSection title="Current fee setup">
          <pre className={adminCodeBlock}>{loading ? "…" : pretty(current)}</pre>
        </AdminSection>
        <AdminSection title="Scheduled changes">
          <pre className={adminCodeBlock}>{loading ? "…" : pretty(timeline)}</pre>
        </AdminSection>
      </div>

      <AdminSection title="New fee configuration" className="max-w-3xl">
        <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="block text-sm font-medium text-slate-700">
            FeeCode
            <select value={feeCode} onChange={(e) => setFeeCode(e.target.value)} className={`${adminSelect} mt-1.5`}>
              <option value="COMMISSION">COMMISSION</option>
              <option value="SERVICE_FEE">SERVICE_FEE</option>
              <option value="VAT">VAT</option>
            </select>
          </label>
          <label className="block text-sm font-medium text-slate-700">
            FeeName
            <input value={feeName} onChange={(e) => setFeeName(e.target.value)} className={`${adminInput} mt-1.5`} />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            FeeType (optional)
            <select value={feeType} onChange={(e) => setFeeType(e.target.value)} className={`${adminSelect} mt-1.5`}>
              <option value="">—</option>
              <option value="HOST_FEE">HOST_FEE</option>
              <option value="GUEST_FEE">GUEST_FEE</option>
            </select>
          </label>
          <label className="block text-sm font-medium text-slate-700">
            CalculationMethod
            <select value={calcMethod} onChange={(e) => setCalcMethod(e.target.value)} className={`${adminSelect} mt-1.5`}>
              <option value="PERCENTAGE">PERCENTAGE</option>
              <option value="FIXED">FIXED</option>
            </select>
          </label>
          <label className="block text-sm font-medium text-slate-700">
            PercentageValue
            <input value={pct} onChange={(e) => setPct(e.target.value)} className={`${adminInput} mt-1.5`} />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            FixedAmount
            <input value={fixed} onChange={(e) => setFixed(e.target.value)} className={`${adminInput} mt-1.5`} />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            AppliedBaseOn
            <select value={appliedBaseOn} onChange={(e) => setAppliedBaseOn(e.target.value)} className={`${adminSelect} mt-1.5`}>
              <option value="BOX_PRICE">BOX_PRICE</option>
              <option value="SUBTOTAL">SUBTOTAL</option>
              <option value="TOTAL_BOOKING">TOTAL_BOOKING</option>
              <option value="COMMISSION_AMOUNT">COMMISSION_AMOUNT</option>
            </select>
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Priority
            <input value={priority} onChange={(e) => setPriority(e.target.value)} className={`${adminInput} mt-1.5`} />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            CalculationOrder
            <input value={calcOrder} onChange={(e) => setCalcOrder(e.target.value)} className={`${adminInput} mt-1.5`} />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            EffectiveFrom (datetime-local)
            <input
              type="datetime-local"
              value={effectiveFrom}
              onChange={(e) => setEffectiveFrom(e.target.value)}
              className={`${adminInput} mt-1.5`}
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            EffectiveTo (optional)
            <input
              type="datetime-local"
              value={effectiveTo}
              onChange={(e) => setEffectiveTo(e.target.value)}
              className={`${adminInput} mt-1.5`}
            />
          </label>
        </div>
        <div className="flex flex-wrap gap-3 pt-2">
          <button type="submit" disabled={busy} className={adminBtnPrimary}>
            Save configuration
          </button>
          <button type="button" disabled={busy} onClick={deactivateId} className={adminBtnDangerOutline}>
            Deactivate by ID…
          </button>
        </div>
        </form>
      </AdminSection>
    </AdminPage>
  );
}
