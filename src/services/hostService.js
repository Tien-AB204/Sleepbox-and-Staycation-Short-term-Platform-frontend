import axios from "../config/axios";

/** Lỗi ASP.NET kiểu "not in the correct format" — thiếu mô tả định dạng cho người dùng. */
const GENERIC_FORMAT_RE =
  /not in the correct format|incorrect format|đúng định dạng|không hợp lệ về định dạng/i;

/** Gợi ý định dạng (FE) khớp rule thường gặp; bổ sung khi API không nói rõ. */
const HOST_REGISTER_FIELD_FORMAT_HINT_VI = {
  idNumber:
    "Nhập chỉ các chữ số: căn cước (CCCD) 12 số, hoặc CMND cũ 9 số — không dấu cách, không chữ cái hay ký tự đặc biệt.",
  taxCode:
    "Mã số thuế: tối đa 10 ký tự hợp lệ theo hệ thống (thường là chữ số). Chưa có MST thì để trống ô này.",
};

/** Map tên property từ API (PascalCase / snake_case) → key nội bộ HostOnboardingPage. */
const HOST_REGISTER_API_KEY_TO_FORM = {
  TaxCode: "taxCode",
  tax_code: "taxCode",
  taxCode: "taxCode",
  RepresentativeIdNumber: "idNumber",
  representative_id_number: "idNumber",
  representativeIdNumber: "idNumber",
  RepresentativeIdName: "firstName",
  representativeIdName: "firstName",
  Username: "username",
  username: "username",
  Email: "email",
  email: "email",
  Phone: "phone",
  phone: "phone",
  FirstName: "firstName",
  first_name: "firstName",
  firstName: "firstName",
  LastName: "lastName",
  last_name: "lastName",
  lastName: "lastName",
  BrandName: "brandName",
  brand_name: "brandName",
  brandName: "brandName",
  BusinessName: "businessName",
  business_name: "businessName",
  businessName: "businessName",
  AddressDistrict: "district",
  address_district: "district",
  addressDistrict: "district",
  AddressWard: "ward",
  address_ward: "ward",
  addressWard: "ward",
  AddressDetail: "companyAddress",
  address_detail: "companyAddress",
  addressDetail: "companyAddress",
  BankName: "bankName",
  bank_name: "bankName",
  bankName: "bankName",
  AccountNumber: "bankAccount",
  account_number: "bankAccount",
  accountNumber: "bankAccount",
  AccountName: "bankHolder",
  account_name: "bankHolder",
  accountName: "bankHolder",
  PaymentMethod: "paymentMethod",
  payment_method: "paymentMethod",
  paymentMethod: "paymentMethod",
  CompanyRegistration: "companyRegistration",
  company_registration: "companyRegistration",
  companyRegistration: "companyRegistration",
  BrandAvatar: "brandAvatar",
  brand_avatar: "brandAvatar",
  brandAvatar: "brandAvatar",
  RepresentativeFrontUrl: "representativeFront",
  representative_front_url: "representativeFront",
  representativeFrontUrl: "representativeFront",
  RepresentativeBackUrl: "representativeBack",
  representative_back_url: "representativeBack",
  representativeBackUrl: "representativeBack",
};

const normalizeApiErrorKey = (raw) => {
  if (!raw || typeof raw !== "string") return raw;
  return raw.replace(/^\$\["?/, "").replace(/"\]?$/, "").replace(/^\$\./, "");
};

/**
 * @param {string} formKey — key nội bộ (idNumber, taxCode, …)
 * @param {string} rawMessage — đoạn API trả về
 */
const attachHostRegisterFormatHint = (formKey, rawMessage) => {
  const t = String(rawMessage || "").trim();
  const hint = HOST_REGISTER_FIELD_FORMAT_HINT_VI[formKey];
  if (!hint) return t;
  if (!t) return hint;
  if (GENERIC_FORMAT_RE.test(t)) return hint;
  if (formKey === "taxCode" && /length|characters|ký tự|fewer|more/i.test(t)) {
    return `${t} ${hint}`;
  }
  return t;
};

/** Gộp `errors` từ ASP.NET ValidationProblemDetails (có `title` chung nhưng không có `detail`). */
const formatValidationErrors = (errors) => {
  if (!errors || typeof errors !== "object") return "";
  const parts = [];
  for (const [key, v] of Object.entries(errors)) {
    const apiKey = normalizeApiErrorKey(key);
    const formKey = HOST_REGISTER_API_KEY_TO_FORM[apiKey];
    const field = key && !key.startsWith("$") ? `${key}: ` : "";
    if (Array.isArray(v)) {
      for (const item of v) {
        if (item != null && String(item).trim()) {
          const raw = String(item).trim();
          const display = formKey ? attachHostRegisterFormatHint(formKey, raw) : raw;
          parts.push(`${field}${display}`.trim());
        }
      }
    } else if (v != null && String(v).trim()) {
      const raw = String(v).trim();
      const display = formKey ? attachHostRegisterFormatHint(formKey, raw) : raw;
      parts.push(`${field}${display}`.trim());
    }
  }
  return parts.join("; ");
};

/** Trả về { taxCode: "...", idNumber: "..." } hoặc null. */
export const extractHostRegisterFieldErrors = (err) => {
  const raw = err?.response?.data?.errors;
  if (!raw || typeof raw !== "object") return null;
  const out = {};
  for (const [k, messages] of Object.entries(raw)) {
    const apiKey = normalizeApiErrorKey(k);
    const formKey = HOST_REGISTER_API_KEY_TO_FORM[apiKey];
    if (!formKey) continue;
    const text = Array.isArray(messages) ? messages.filter(Boolean).join(" ") : String(messages || "");
    const t = text.trim();
    if (!t) continue;
    const display = attachHostRegisterFormatHint(formKey, t);
    out[formKey] = out[formKey] ? `${out[formKey]} ${display}` : display;
  }
  return Object.keys(out).length ? out : null;
};

/** Thời gian chờ riêng cho OTP đăng ký host (Render cold start / SMTP thường > 15s). */
const HOST_REGISTER_OTP_TIMEOUT_MS = 60000;

/** Bắt lỗi ASP.NET / Swagger (message, title, detail, errors{}). */
export const getApiErrorMessage = (err, fallback) => {
  const rawMsg = typeof err?.message === "string" ? err.message : "";
  if (err?.code === "ECONNABORTED" || /timeout/i.test(rawMsg)) {
    return "Hết thời gian chờ máy chủ. Backend trên Render lần đầu có thể khởi động 30–60 giây; gửi OTP cũng chậm nếu SMTP chưa cấu hình. Hãy thử lại.";
  }

  const status = err.response?.status;
  const d = err.response?.data;

  if (d && typeof d === "object") {
    const validationText = formatValidationErrors(d.errors);
    if (validationText) return validationText;
    if (d.message) {
      const m = d.message;
      return Array.isArray(m) ? m.join("; ") : String(m);
    }
    if (d.title && d.detail) return `${d.title}: ${d.detail}`;
    if (d.title) return String(d.title);
    if (d.error) return String(d.error);
  }
  if (typeof d === "string" && d.trim()) return d;

  if (status === 401) {
    return "Phiên chỉnh sửa hết hạn hoặc token không hợp lệ. Vui lòng quay lại bước email/OTP và xác thực lại.";
  }

  if (status === 404) {
    return "Không tìm thấy API (404). Kiểm tra địa chỉ máy chủ hoặc phiên bản backend.";
  }

  if (status != null && status >= 500) {
    return "Máy chủ trả lỗi 500 — thường do chưa cấu hình gửi email (SMTP) trên backend hoặc lỗi nội bộ API. Kiểm tra log trên Render và biến môi trường gửi mail.";
  }

  if (!d) return err.message || fallback;
  return fallback;
};

const decodeJwtPayload = (jwt) => {
  try {
    const parts = String(jwt).split(".");
    if (parts.length < 2) return null;
    let b64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const pad = b64.length % 4;
    if (pad) b64 += "=".repeat(4 - pad);
    const json = atob(b64);
    return JSON.parse(json);
  } catch {
    return null;
  }
};

/** JWT chỉnh draft host thường có claim `sub` = draftId (uuid). */
const draftIdFromRegisterToken = (token) => {
  const payload = decodeJwtPayload(token);
  if (!payload) return undefined;
  const sub = payload.sub;
  if (typeof sub === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(sub)) {
    return sub;
  }
  return payload.draft_id ?? payload.draftId;
};

/** Phản hồi send-otp / verify-otp / resend-otp — chuẩn hóa bòn vét token mọi ngóc ngách */
const unwrapHostRegisterResponse = (data) => {
  if (!data || typeof data !== "object") return {};
  
  // Xử lý việc Backend mới hay bọc token trong biến `data`
  let tokenRaw = data.token ?? data.Token;
  if (!tokenRaw && data.data) {
    tokenRaw = typeof data.data === "string" ? data.data : (data.data.token ?? data.data.Token);
  }
  const token = tokenRaw != null && String(tokenRaw).trim() !== "" ? String(tokenRaw).trim() : undefined;
  
  let draftFromBody = data.draftId ?? data.DraftId;
  if (!draftFromBody && data.data && typeof data.data === "object") {
    draftFromBody = data.data.draftId ?? data.data.DraftId;
  }
  const draftId = draftFromBody ?? (token ? draftIdFromRegisterToken(token) : undefined);
  
  return {
    ...data,
    draftId,
    token,
    success: data.success ?? data.Success ?? data.isSuccess ?? true,
    message: data.message ?? data.Message,
  };
};

const draftTokenRequestOptions = (token) => {
  const t = token != null ? String(token).trim() : "";
  if (!t) return { params: {}, headers: {} };
  return {
    params: { token: t },
    headers: { Authorization: `Bearer ${t}` },
  };
};

// =========================================================================
// CÁC API OTP MỚI ĐÃ ĐƯỢC CẬP NHẬT TẠI ĐÂY
// =========================================================================

/** `POST /api/otp/send` — body: `{ email, purpose }` */
export const sendHostRegisterOtp = async (email) => {
  try {
    const res = await axios.post("/otp/send", { email, purpose: "HOST_REGISTER" }, { timeout: HOST_REGISTER_OTP_TIMEOUT_MS });
    return unwrapHostRegisterResponse(res.data);
  } catch (err) {
    throw getApiErrorMessage(err, "Gửi OTP đăng ký host thất bại");
  }
};

/** `POST /api/otp/verify` — body: `{ email, otpCode, purpose }` */
export const verifyHostRegisterOtp = async ({ email, otpCode }) => {
  try {
    const res = await axios.post("/otp/verify", { email, otpCode, purpose: "HOST_REGISTER" }, { timeout: HOST_REGISTER_OTP_TIMEOUT_MS });
    return unwrapHostRegisterResponse(res.data);
  } catch (err) {
    throw getApiErrorMessage(err, "Xác thực OTP thất bại");
  }
};

/** `POST /api/otp/resend` — body: `{ email, purpose }` */
export const resendHostRegisterOtp = async (email) => {
  try {
    const res = await axios.post("/otp/resend", { email, purpose: "HOST_REGISTER" }, { timeout: HOST_REGISTER_OTP_TIMEOUT_MS });
    return unwrapHostRegisterResponse(res.data);
  } catch (err) {
    throw getApiErrorMessage(err, "Gửi lại OTP thất bại");
  }
};

// =========================================================================
// CÁC API KHÁC GIỮ NGUYÊN
// =========================================================================

export const updateHostRegisterDraft = async ({ token, payload }) => {
  console.log("🔥 TOKEN GỬI ĐI TỪ BƯỚC 5 LÀ:", token);
  try {
    const formData = new FormData();
    Object.entries(payload || {}).forEach(([key, value]) => {
      // Dùng Duck-typing thay vì instanceof File
      const isFile = value && typeof value === "object" && value.size !== undefined && value.name !== undefined;
      const hasValue = isFile ? value.size > 0 : value !== undefined && value !== null && String(value).trim() !== "";
      
      if (hasValue) {
        formData.append(key, value);
      }
    });
    
    const res = await axios.post(`/host/register/draft`, formData, {
      ...draftTokenRequestOptions(token),
      timeout: 120000, // Tăng timeout vì có thể upload file lớn (đại diện, đăng ký kinh doanh)
    });
    return res.data;
  } catch (err) {
    const msg = getApiErrorMessage(err, "Lưu hồ sơ đăng ký host thất bại");
    const fieldErrors = extractHostRegisterFieldErrors(err);
    const e = new Error(msg);
    if (fieldErrors) e.fieldErrors = fieldErrors;
    throw e;
  }
};

export const getHostRegisterDraft = async ({ draftId, token }) => {
  try {
    const res = await axios.get(`/host/register/draft/${draftId}`, {
      ...draftTokenRequestOptions(token),
    });
    return res.data;
  } catch (err) {
    throw getApiErrorMessage(err, "Không thể lấy trạng thái hồ sơ");
  }
};

export const setHostPassword = async ({ newPassword, confirmPassword }) => {
  try {
    const res = await axios.post("/host/set-password", { newPassword, confirmPassword });
    return res.data;
  } catch (err) {
    throw getApiErrorMessage(err, "Thiết lập mật khẩu host thất bại");
  }
};

const hostBearer = (token) => (token ? { Authorization: `Bearer ${token}` } : {});

/** CRUD tiện ích — Swagger tag Amenity, dùng JWT host (Bearer). */
export const hostGetAmenities = (token, params = {}) =>
  axios.get("/amenities", { headers: hostBearer(token), params });

export const hostCreateAmenity = (token, body) =>
  axios.post("/amenities", body, { headers: hostBearer(token) });

export const hostUpdateAmenity = (token, id, body) =>
  axios.put(`/amenities/${id}`, body, { headers: hostBearer(token) });

export const hostDeleteAmenity = (token, id) =>
  axios.delete(`/amenities/${id}`, { headers: hostBearer(token) });