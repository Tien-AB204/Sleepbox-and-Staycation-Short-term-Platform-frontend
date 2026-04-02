import axios from "../config/axios";

const bearer = (token) => (token ? { Authorization: `Bearer ${token}` } : {});

/** Parse ASP.NET errors (errors{}, message, title/detail). */
export function adminApiError(err, fallback = "Something went wrong.") {
  const status = err.response?.status;
  const d = err.response?.data;

  if (d && typeof d === "object") {
    const errors = d.errors;
    if (errors && typeof errors === "object") {
      const parts = [];
      for (const [k, v] of Object.entries(errors)) {
        const field = String(k || "").replace(/^\$\./, "");
        const msgs = Array.isArray(v) ? v : [v];
        for (const m of msgs) {
          if (m != null && String(m).trim()) parts.push(field ? `${field}: ${m}` : String(m));
        }
      }
      if (parts.length) return parts.join("; ");
    }
    if (d.message != null) {
      const m = d.message;
      return Array.isArray(m) ? m.filter(Boolean).join("; ") : String(m);
    }
    if (d.title && d.detail) return `${d.title}: ${d.detail}`;
    if (d.title) return String(d.title);
    if (d.error) return String(d.error);
  }
  if (typeof d === "string" && d.trim()) return d;
  if (status === 401) return "Session expired or invalid. Please sign in again.";
  if (status === 403) return "You do not have permission to perform this action.";
  if (err?.message) return String(err.message);
  return fallback;
}

export function adminGetUserList(token, params = {}) {
  return axios.get("/Admin/Users/Get-list", { headers: bearer(token), params });
}

export function adminSuspendUser(token, targetUserId, reason) {
  return axios.patch(`/Admin/Users/${targetUserId}/Suspend`, { reason }, { headers: bearer(token) });
}

export function adminRegisterAdmin(token, body) {
  return axios.post("/Admin/Register", body, { headers: bearer(token) });
}

export function adminRegisterModerator(token, body) {
  return axios.post("/Admin/moderators/register", body, { headers: bearer(token) });
}

export function adminUpdateModerator(token, moderatorId, body) {
  return axios.put(`/Admin/moderators/${moderatorId}`, body, { headers: bearer(token) });
}

export function adminGetAddonServices(token, params = {}) {
  return axios.get("/admin/pricing/addon-services", { headers: bearer(token), params });
}

export function adminCreateAddonService(token, body) {
  return axios.post("/admin/pricing/addon-services", body, { headers: bearer(token) });
}

export function adminPatchAddonService(token, serviceId, body) {
  return axios.patch(`/admin/pricing/addon-services/${serviceId}`, body, { headers: bearer(token) });
}

export function adminDeleteAddonService(token, serviceId) {
  return axios.delete(`/admin/pricing/addon-services/${serviceId}`, { headers: bearer(token) });
}

export function adminToggleAddonService(token, serviceId) {
  return axios.patch(`/admin/pricing/addon-services/${serviceId}/toggle`, null, { headers: bearer(token) });
}

export function adminGetBoxTypePriceLimits(token) {
  return axios.get("/admin/pricing/box-type-price-limits", { headers: bearer(token) });
}

export function adminGetBoxTypePriceLimitsByType(token, params) {
  return axios.get("/admin/pricing/box-type-price-limits/by-type", { headers: bearer(token), params });
}

export function adminCreateBoxTypePriceLimit(token, body) {
  return axios.post("/admin/pricing/box-type-price-limits", body, { headers: bearer(token) });
}

export function adminUpdateBoxTypePriceLimit(token, id, body) {
  return axios.put(`/admin/pricing/box-type-price-limits/${id}`, body, { headers: bearer(token) });
}

export function adminDeleteBoxTypePriceLimit(token, id) {
  return axios.delete(`/admin/pricing/box-type-price-limits/${id}`, { headers: bearer(token) });
}

export function adminToggleBoxTypePriceLimit(token, id) {
  return axios.patch(`/admin/pricing/box-type-price-limits/${id}/toggle-active`, null, { headers: bearer(token) });
}

export function adminGetPlatformFeeConfig(token) {
  return axios.get("/admin/pricing/platform-fee-config", { headers: bearer(token) });
}

export function adminPostPlatformFeeConfig(token, formData) {
  return axios.post("/admin/pricing/platform-fee-config", formData, {
    headers: bearer(token),
  });
}

export function adminGetPlatformFeeTimeline(token, params = {}) {
  return axios.get("/admin/pricing/platform-fee-config/timeline", { headers: bearer(token), params });
}

export function adminDeactivatePlatformFeeConfig(token, configId) {
  return axios.patch(`/admin/pricing/platform-fee-config/${configId}/deactivate`, null, { headers: bearer(token) });
}

export function adminGetSystemPriceRules(token, params = {}) {
  return axios.get("/admin/pricing/system-price-rules", { headers: bearer(token), params });
}

export function adminCreateSystemPriceRule(token, body) {
  return axios.post("/admin/pricing/system-price-rules", body, { headers: bearer(token) });
}

export function adminGetSystemPriceRule(token, ruleId) {
  return axios.get(`/admin/pricing/system-price-rules/${ruleId}`, { headers: bearer(token) });
}

export function adminUpdateSystemPriceRule(token, ruleId, body) {
  return axios.put(`/admin/pricing/system-price-rules/${ruleId}`, body, { headers: bearer(token) });
}

export function adminDeleteSystemPriceRule(token, ruleId) {
  return axios.delete(`/admin/pricing/system-price-rules/${ruleId}`, { headers: bearer(token) });
}

export function adminToggleSystemPriceRule(token, ruleId) {
  return axios.patch(`/admin/pricing/system-price-rules/${ruleId}/toggle-active`, null, { headers: bearer(token) });
}
