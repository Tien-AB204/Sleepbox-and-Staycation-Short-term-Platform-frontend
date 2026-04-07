import React, { useCallback, useEffect, useState } from "react";
import { AdminErrorAlert, AdminPage, AdminPageHeader, AdminSection } from "../../components/admin/AdminPageChrome";
import {
  adminBtnDangerOutline,
  adminBtnPrimary,
  adminBtnSecondary,
  adminCard,
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

function formatDt(iso) {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "—";
    return d.toLocaleString("en-US");
  } catch {
    return "—";
  }
}

function FeeCard({ item }) {
  if (!item) return null;
  const isPercent = item.calculationMethod === "PERCENTAGE";
  const val = isPercent ? `${item.percentageValue ?? 0}%` : `$${item.fixedAmount ?? 0}`;
  const statusClass = item.status === "ACTIVE" 
    ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
    : item.status === "INACTIVE" 
      ? "bg-slate-100 text-slate-600 border-slate-200"
      : "bg-amber-50 text-amber-700 border-amber-200";

  return (
    <div className={`relative flex flex-col gap-3 rounded-xl border p-4 shadow-sm ${item.status === "INACTIVE" ? "opacity-75" : "bg-white border-slate-200/90"}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-slate-900">{item.feeName || item.feeCode}</h4>
          <p className="mt-0.5 text-xs font-medium text-slate-500">
            {item.feeType} • Applies to {item.appliedBaseOn}
          </p>
        </div>
        {item.status && (
          <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${statusClass}`}>
            {item.status}
          </span>
        )}
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-black tracking-tight text-slate-900">{val}</span>
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{item.calculationMethod}</span>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-2 border-t border-slate-100 pt-3 text-xs">
        <div>
          <span className="block text-slate-400 font-medium">Effective from</span>
          <span className="font-semibold text-slate-700">{formatDt(item.effectiveFrom)}</span>
        </div>
        <div>
          <span className="block text-slate-400 font-medium">Effective to</span>
          <span className="font-semibold text-slate-700">{item.effectiveTo ? formatDt(item.effectiveTo) : "Forever"}</span>
        </div>
      </div>
      
      <div className="mt-1 text-[10px] text-slate-400 font-mono break-all">
        ID: {item.configId}
      </div>
    </div>
  );
}

function extractItems(response) {
  if (!response || !response.data) return [];
  // if data is an array
  if (Array.isArray(response.data)) return response.data;
  // if data has history array
  if (response.data.history && Array.isArray(response.data.history)) return response.data.history;
  // if data is a single object
  if (typeof response.data === "object" && response.data.configId) return [response.data];
  return [];
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

      <div className="mb-8 grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
        <AdminSection title="Current fee setup">
          {loading ? (
            <div className="p-8 text-center text-sm text-slate-500">Loading...</div>
          ) : extractItems(current).length === 0 ? (
            <div className={`${adminCard} flex flex-col items-center justify-center p-8 text-center`}>
              <span className="material-symbols-outlined mb-2 text-3xl text-slate-300">receipt_long</span>
              <p className="text-sm font-medium text-slate-500">No active fees configured.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {extractItems(current).map(item => (
                <FeeCard key={item.configId} item={item} />
              ))}
            </div>
          )}
        </AdminSection>

        <AdminSection title="Scheduled & History">
          {loading ? (
            <div className="p-8 text-center text-sm text-slate-500">Loading...</div>
          ) : extractItems(timeline).length === 0 ? (
            <div className={`${adminCard} flex flex-col items-center justify-center p-8 text-center`}>
              <span className="material-symbols-outlined mb-2 text-3xl text-slate-300">history</span>
              <p className="text-sm font-medium text-slate-500">No upcoming changes or history.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {extractItems(timeline).map(item => (
                <FeeCard key={item.configId} item={item} />
              ))}
            </div>
          )}
        </AdminSection>
      </div>

      <AdminSection title="New fee configuration">
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Labeled fields with cleaner spacing */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-slate-700">FeeCode</label>
              <select value={feeCode} onChange={(e) => setFeeCode(e.target.value)} className={adminSelect}>
                <option value="COMMISSION">COMMISSION</option>
                <option value="SERVICE_FEE">SERVICE_FEE</option>
                <option value="VAT">VAT</option>
              </select>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-slate-700">FeeName</label>
              <input value={feeName} onChange={(e) => setFeeName(e.target.value)} className={adminInput} />
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-slate-700">FeeType <span className="font-normal text-slate-400">(optional)</span></label>
              <select value={feeType} onChange={(e) => setFeeType(e.target.value)} className={adminSelect}>
                <option value="">—</option>
                <option value="HOST_FEE">HOST_FEE</option>
                <option value="GUEST_FEE">GUEST_FEE</option>
              </select>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-slate-700">CalculationMethod</label>
              <select value={calcMethod} onChange={(e) => setCalcMethod(e.target.value)} className={adminSelect}>
                <option value="PERCENTAGE">PERCENTAGE</option>
                <option value="FIXED">FIXED</option>
              </select>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-slate-700">PercentageValue</label>
              <input value={pct} onChange={(e) => setPct(e.target.value)} className={adminInput} disabled={calcMethod === "FIXED"} />
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-slate-700">FixedAmount</label>
              <input value={fixed} onChange={(e) => setFixed(e.target.value)} className={adminInput} disabled={calcMethod === "PERCENTAGE"} />
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-slate-700">AppliedBaseOn</label>
              <select value={appliedBaseOn} onChange={(e) => setAppliedBaseOn(e.target.value)} className={adminSelect}>
                <option value="BOX_PRICE">BOX_PRICE</option>
                <option value="SUBTOTAL">SUBTOTAL</option>
                <option value="TOTAL_BOOKING">TOTAL_BOOKING</option>
                <option value="COMMISSION_AMOUNT">COMMISSION_AMOUNT</option>
              </select>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-slate-700">Priority</label>
              <input value={priority} onChange={(e) => setPriority(e.target.value)} className={adminInput} />
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-slate-700">CalculationOrder</label>
              <input value={calcOrder} onChange={(e) => setCalcOrder(e.target.value)} className={adminInput} />
            </div>
            
            {/* Empty div to keep dates on the next row together if needed, or let them flow normally */}
            <div className="hidden md:block"></div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-slate-700">EffectiveFrom</label>
              <input
                type="datetime-local"
                value={effectiveFrom}
                onChange={(e) => setEffectiveFrom(e.target.value)}
                className={adminInput}
              />
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-slate-700">EffectiveTo <span className="font-normal text-slate-400">(optional)</span></label>
              <input
                type="datetime-local"
                value={effectiveTo}
                onChange={(e) => setEffectiveTo(e.target.value)}
                className={adminInput}
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-100">
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
