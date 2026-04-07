import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthContext";
import {
  getHostOnboardingDraft,
  saveHostOnboardingDraft,
  setHostOnboardingComplete,
  clearHostOnboardingDraft,
  saveDraftFilesToDB,       // <-- THÊM MỚI
  getDraftFilesFromDB,      // <-- THÊM MỚI
  clearDraftFilesFromDB,    // <-- THÊM MỚI
} from "../../../utils/hostOnboarding";
import { HOST_STEPS } from "./hostOnboardingSteps";
import {
  sendHostRegisterOtp,
  verifyHostRegisterOtp,
  resendHostRegisterOtp,
  updateHostRegisterDraft,
  getHostRegisterDraft,
  setHostPassword,
} from "../../../services/hostService";

const IMG_HOST =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCtprjlY6ZRvEVmL5JMhqaC890HCAiuNyj4_IOwpQjpAwj_5emfO5VQMUCsIdbX-G0NXpeWAAzhrwNZOO5EdWyxMXn7yaeXtM1PQVUqI7Il_4Zh33T3IYga_SZolNGraj0yrvqDs5u0_9DmayE02MTvvP1AhJu1c_rxaTivbvQuTVTT0rHi8V84vx0QUtuNU4NK21sMWk8CEGCwU54Xj747Je8T9AF2owE3x_Z5oz0dXbL2SxWF4ldK1gihEJ6hzRvyQIPDi4-rqN7m";

const IMG_SUPPORT_STRIP =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCt35oVmCaUiG6Q1i62WlTYydz8Pc1Tf0XfNUISJOI31N_vHRiGavZyt1yWIJc01K3OqjSlWazWMX8L0ceDYgQUpjH9BR1wtRZ0J-8h96riNL7fs_8xrCEW4aOLetzPK36eRGbRCz1AeC53OtXPRIXWMcOkLqnIcyRG7VLhF6YRSGiVmHQjv2R76APg57zrOsRbrKDNJCw6e2u1ZpZL2BCGkKV8Qlc1M_lu83U9DwnJhRf1krSIoQexFkR1Hl9mNIk0dwkMhCl0V3Pr";

const IMG_OFFICE_SIDEBAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBrbW9y4YAYGGeS4KffmtYd5tyQbPW4luGFDP1JMo9_0ogJuSwz3Vpq9kcE9aP5mgGQYgTfeev2dv7tYotVMiuHqCAMH9FPXrQq-7RwiSq5o6oR3WzsIQWgrEiQ4NSUv_AQWHPBr7VQEEHW2iCj3IY3oyNxsJJt9V87f-N0XsyXSVNSkQscBMtkB189jVPldCVwo_eblPrUqM9oZ3P1a-OzVspP__wIOYnEtzB4h_1tOtyLf30oK3_Nk0bvlhP_lTbvyV6tFUXi-bXH";

const inputField =
  "w-full rounded-xl border-0 bg-primary/5 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-primary/30";

const fieldLabel =
  "mb-1.5 block text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500";

const HOST_ONBOARD_STEP3_ERR_KEYS = new Set([
  "username",
  "lastName",
  "firstName",
  "phone",
  "idNumber",
  "representativeFront",
  "representativeBack",
]);
const HOST_ONBOARD_STEP4_ERR_KEYS = new Set([
  "businessName", // <-- Đổi companyName thành businessName
  "taxCode",
  "brandName",
  "district",
  "ward",
  "companyAddress",
  "companyRegistration",
  "brandAvatar",
]);
const HOST_ONBOARD_STEP5_ERR_KEYS = new Set(["bankName", "bankAccount", "bankHolder", "paymentMethod"]);

/** Khôi phục draft cũ chỉ có fullName → tách họ / đệm+tên cho default input. */
const legacyDraftNameDefaults = (draft) => {
  if (draft?.lastName != null || draft?.firstName != null) {
    return { lastName: draft.lastName || "", firstName: draft.firstName || "" };
  }
  const raw = String(draft?.fullName || "").trim();
  if (!raw) return { lastName: "", firstName: "" };
  const parts = raw.split(/\s+/);
  if (parts.length === 1) return { lastName: parts[0], firstName: parts[0] };
  return { lastName: parts[0], firstName: parts.slice(1).join(" ") };
};

const onboardingErrorMessage = (err, fallback) => {
  if (typeof err === "string") return err;
  if (err instanceof Error && err.message) return err.message;
  return fallback;
};

/** File đính kèm đăng ký — không ghi sessionStorage, chỉ giữ trong phiên đến khi gửi một lần lên API. */
const emptyRegisterDraftFiles = () => ({
  representativeFront: null,
  representativeBack: null,
  companyRegistration: null,
  brandAvatar: null,
});

const buildRegisterDraftApiPayload = (d, files) => {
  const repIdName = String(d.idName || d.fullName || "").trim() ||
    [d.lastName, d.firstName].filter(Boolean).join(" ").trim();

  const phone = typeof d.phone === "string" ? d.phone.trim() : d.phone;
  const idNum = typeof d.idNumber === "string" ? d.idNumber.trim() : d.idNumber;

  /** CHUẨN SNAKE_CASE 100% THEO ĐÚNG SWAGGER BE YÊU CẦU */
  return {
    username: d.username,
    phone: phone,
    first_name: d.firstName,
    last_name: d.lastName,
    representative_id_name: repIdName,
    representative_id_number: idNum,
    representative_front_url: files.representativeFront,
    representative_back_url: files.representativeBack,
    tax_code: d.taxCode,
    brand_name: d.brandName,
    brand_avatar: files.brandAvatar,
    business_name: d.businessName, // Sếp nhớ nãy mình đã đổi tên biến nội bộ thành businessName rồi nhé
    address_district: d.district,
    address_ward: d.ward,
    address_detail: d.companyAddress,
    company_registration: files.companyRegistration,
    bank_name: d.bankName,
    account_number: d.bankAccount,
    account_name: d.bankHolder,
    payment_method: d.paymentMethod,
  };
};

const validateFullRegisterDraft = (d, files) => {
  const errs = [];
  // Tuyệt chiêu Duck-typing: Check size và name thay vì dùng instanceof File
  const isValidFile = (f) => f && typeof f === "object" && f.size > 0 && f.name !== undefined;

  if (!String(d.username || "").trim()) errs.push("Tên đăng nhập");
  if (!String(d.lastName || "").trim() || !String(d.firstName || "").trim()) errs.push("Họ và tên");
  if (!String(d.phone || "").trim()) errs.push("Số điện thoại");
  if (!String(d.idNumber || "").trim()) errs.push("Số CCCD/CMND");
  
  if (!isValidFile(files.representativeFront)) errs.push("Ảnh mặt trước CCCD");
  if (!isValidFile(files.representativeBack)) errs.push("Ảnh mặt sau CCCD");
  
  if (!String(d.businessName || "").trim()) errs.push("Tên doanh nghiệp"); 
  if (!String(d.brandName || "").trim()) errs.push("Tên thương hiệu");
  if (!String(d.district || "").trim()) errs.push("Quận/Huyện");
  if (!String(d.ward || "").trim()) errs.push("Phường/Xã");
  if (!String(d.companyAddress || "").trim()) errs.push("Địa chỉ trụ sở");
  
  if (!isValidFile(files.companyRegistration)) errs.push("Giấy phép kinh doanh (file)");
  if (!isValidFile(files.brandAvatar)) errs.push("Avatar thương hiệu (file)");
  
  if (!String(d.bankAccount || "").trim()) errs.push("Số tài khoản ngân hàng");
  if (!String(d.bankHolder || "").trim()) errs.push("Tên chủ tài khoản");
  return errs;
};

const MAX_ID_CARD_IMAGE_BYTES = 5 * 1024 * 1024;
const ID_CARD_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

/** Tên đăng nhập: email hợp lệ hoặc 4–50 ký tự [a-z0-9._-] (không dấu cách). */
const validateHostUsername = (raw) => {
  const s = String(raw ?? "").trim();
  if (!s) return "Vui lòng nhập tên đăng nhập.";
  if (s.includes("@")) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)) return "Email không đúng định dạng.";
    return "";
  }
  if (s.length < 4 || s.length > 50) return "Tên đăng nhập cần 4–50 ký tự.";
  if (!/^[a-z0-9._-]+$/i.test(s)) return "Chỉ dùng chữ không dấu, số, dấu chấm, gạch dưới và gạch ngang.";
  return "";
};

const VI_NAME_RE = /^[\p{L}\s'.-]+$/u;
const validateVietnameseNamePart = (raw, fieldLabel) => {
  const t = String(raw ?? "").trim();
  if (!t) return `Vui lòng nhập ${fieldLabel}.`;
  if (/\d/.test(t)) return `${fieldLabel} không được chứa chữ số.`;
  if (!VI_NAME_RE.test(t)) return `${fieldLabel} chỉ gồm chữ (có dấu), khoảng trắng, dấu . ' -`;
  if (t.length > 80) return `${fieldLabel} tối đa 80 ký tự.`;
  return "";
};

const normalizeVnPhoneDigits = (raw) => {
  let s = String(raw ?? "").replace(/[\s.-]/g, "");
  if (s.startsWith("+84")) s = `0${s.slice(3)}`;
  else if (s.startsWith("84") && s.length >= 10) s = `0${s.slice(2)}`;
  return s;
};

const validateVietnamPhone = (raw) => {
  const s = normalizeVnPhoneDigits(raw);
  if (!s) return "Vui lòng nhập số điện thoại.";
  if (!/^0[35789]\d{8}$/.test(s)) {
    return "Số điện thoại Việt Nam: 10 số, đầu 03 / 05 / 07 / 08 / 09 (có thể nhập +84…).";
  }
  return "";
};

const validateCitizenIdNumber = (raw) => {
  const d = String(raw ?? "").replace(/\s/g, "");
  if (!d) return "Vui lòng nhập số CCCD/CMND.";
  if (!/^\d+$/.test(d)) return "Chỉ nhập chữ số.";
  if (d.length !== 9 && d.length !== 12) return "CMND: 9 số — CCCD: 12 số.";
  return "";
};

const validateIdCardImageFile = (file) => {
  if (!(file instanceof File) || file.size <= 0) return "Vui lòng chọn ảnh.";
  if (!ID_CARD_IMAGE_TYPES.has(file.type)) return "Chỉ dùng ảnh JPG, PNG hoặc WebP.";
  if (file.size > MAX_ID_CARD_IMAGE_BYTES) return "Ảnh tối đa 5MB.";
  return "";
};

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
  const [sendingOtp, setSendingOtp] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [otpInfo, setOtpInfo] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(false);
  const [settingPassword, setSettingPassword] = useState(false);

  // --- THÊM LOGIC ĐẾM NGƯỢC OTP ---
  const [resendTimer, setResendTimer] = useState(60); 

  useEffect(() => {
    if (current === 2 && resendTimer > 0) {
      const timerId = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [current, resendTimer]);
  // --------------------------------

  const idFrontBlobRef = useRef(null);
  const idBackBlobRef = useRef(null);
  const idFrontInputRef = useRef(null);
  const idBackInputRef = useRef(null);
  const [idFrontPreviewUrl, setIdFrontPreviewUrl] = useState(null);
  const [idBackPreviewUrl, setIdBackPreviewUrl] = useState(null);
  const [idFrontFileLabel, setIdFrontFileLabel] = useState("");
  const [idBackFileLabel, setIdBackFileLabel] = useState("");
  const [registerDraftFiles, setRegisterDraftFiles] = useState(emptyRegisterDraftFiles);

  const companyRegInputRef = useRef(null);
  const brandAvatarInputRef = useRef(null);
  const companyRegBlobRef = useRef(null);
  const brandAvatarBlobRef = useRef(null);
  const [companyRegPreviewUrl, setCompanyRegPreviewUrl] = useState(null);
  const [companyRegIsPdf, setCompanyRegIsPdf] = useState(false);
  const [companyRegFileLabel, setCompanyRegFileLabel] = useState("");
  const [brandAvatarPreviewUrl, setBrandAvatarPreviewUrl] = useState(null);
  const [brandAvatarFileLabel, setBrandAvatarFileLabel] = useState("");
  const [apiFieldErrors, setApiFieldErrors] = useState({});
  /** Lỗi validate tức thì bước 3 (ưu tiên hiển thị cùng lỗi API). */
  const [step3FieldErrors, setStep3FieldErrors] = useState({});

  const clearApiField = (key) => {
    setApiFieldErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const inputErrRing = "ring-2 ring-red-500 bg-red-50/40";
  const inpCls = (fieldKey, extra = "") =>
    [inputField, extra, apiFieldErrors[fieldKey] ? inputErrRing : ""].filter(Boolean).join(" ");

  const inpClsStep3 = (fieldKey, extra = "") =>
    [
      inputField,
      extra,
      apiFieldErrors[fieldKey] || step3FieldErrors[fieldKey] ? inputErrRing : "",
    ]
      .filter(Boolean)
      .join(" ");

  /** Ưu tiên lỗi API (sau submit); khi đang gõ, `clearApiField` xóa API và còn validate client. */
  const step3Msg = (key) => apiFieldErrors[key] || step3FieldErrors[key];

  const bindStep3ValidatedInput = (key, validator) => ({
    onInput: (e) => {
      clearApiField(key);
      const msg = validator(e.target.value);
      setStep3FieldErrors((prev) => {
        const next = { ...prev };
        if (msg) next[key] = msg;
        else delete next[key];
        return next;
      });
    },
  });

  const showApiErrOutsideStep = (stepKeys) =>
    Object.keys(apiFieldErrors).length > 0 && Object.keys(apiFieldErrors).some((k) => !stepKeys.has(k));

  useEffect(() => {
    if (step && (parseInt(step, 10) < 1 || parseInt(step, 10) > 7 || Number.isNaN(parseInt(step, 10)))) {
      navigate("/host/register/1", { replace: true });
    }
  }, [step, navigate]);

  useEffect(() => {
    if (current !== 3) setStep3FieldErrors({});
  }, [current]);

  // --- TỰ ĐỘNG KHÔI PHỤC ẢNH TỪ KHO NGẦM KHI F5 ---
  useEffect(() => {
    getDraftFilesFromDB().then((savedFiles) => {
      if (savedFiles) {
        setRegisterDraftFiles(savedFiles);
        // Khôi phục giao diện hiển thị ảnh
        if (savedFiles.representativeFront) applyFrontFile(savedFiles.representativeFront, false);
        if (savedFiles.representativeBack) applyBackFile(savedFiles.representativeBack, false);
        if (savedFiles.companyRegistration) applyCompanyRegFile(savedFiles.companyRegistration, false);
        if (savedFiles.brandAvatar) applyBrandAvatarFile(savedFiles.brandAvatar, false);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // --------------------------------------------------

  useEffect(() => {
    if (current !== 3) {
      if (idFrontBlobRef.current) {
        URL.revokeObjectURL(idFrontBlobRef.current);
        idFrontBlobRef.current = null;
      }
      if (idBackBlobRef.current) {
        URL.revokeObjectURL(idBackBlobRef.current);
        idBackBlobRef.current = null;
      }
      setIdFrontPreviewUrl(null);
      setIdBackPreviewUrl(null);
      setIdFrontFileLabel("");
      setIdBackFileLabel("");
    }
  }, [current]);

  /** Quay lại bước 3 — khôi phục ảnh CCCD đã chọn (chỉ lưu RAM, không qua sessionStorage). */
  useEffect(() => {
    if (current !== 3) return;
    const front = registerDraftFiles.representativeFront;
    const back = registerDraftFiles.representativeBack;
    if (front instanceof File && front.size > 0) applyFrontFile(front, true);
    if (back instanceof File && back.size > 0) applyBackFile(back, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- chỉ khôi phục khi vào lại bước 3 hoặc file đã lưu thay đổi
  }, [current, registerDraftFiles.representativeFront, registerDraftFiles.representativeBack]);

  useEffect(() => {
    if (current !== 4) {
      if (companyRegBlobRef.current) {
        URL.revokeObjectURL(companyRegBlobRef.current);
        companyRegBlobRef.current = null;
      }
      if (brandAvatarBlobRef.current) {
        URL.revokeObjectURL(brandAvatarBlobRef.current);
        brandAvatarBlobRef.current = null;
      }
      setCompanyRegPreviewUrl(null);
      setCompanyRegIsPdf(false);
      setCompanyRegFileLabel("");
      setBrandAvatarPreviewUrl(null);
      setBrandAvatarFileLabel("");
    }
  }, [current]);

  useEffect(() => {
    if (current !== 4) return;
    const reg = registerDraftFiles.companyRegistration;
    const av = registerDraftFiles.brandAvatar;
    if (reg instanceof File && reg.size > 0) applyCompanyRegFile(reg, true);
    if (av instanceof File && av.size > 0 && av.type.startsWith("image/")) applyBrandAvatarFile(av, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, registerDraftFiles.companyRegistration, registerDraftFiles.brandAvatar]);

  useEffect(() => {
    return () => {
      if (idFrontBlobRef.current) URL.revokeObjectURL(idFrontBlobRef.current);
      if (idBackBlobRef.current) URL.revokeObjectURL(idBackBlobRef.current);
      if (companyRegBlobRef.current) URL.revokeObjectURL(companyRegBlobRef.current);
      if (brandAvatarBlobRef.current) URL.revokeObjectURL(brandAvatarBlobRef.current);
    };
  }, []);

  const assignToInput = (inputRef, file) => {
    if (!inputRef.current || !file) return;
    try {
      const dt = new DataTransfer();
      dt.items.add(file);
      inputRef.current.files = dt.files;
    } catch {
      /* ignore */
    }
  };

  const applyFrontFile = (file, syncInput = false) => {
    if (idFrontBlobRef.current) {
      URL.revokeObjectURL(idFrontBlobRef.current);
      idFrontBlobRef.current = null;
    }
    setStep3FieldErrors((prev) => {
      const next = { ...prev };
      delete next.representativeFront;
      return next;
    });

    if (!file) {
      setIdFrontPreviewUrl(null);
      setIdFrontFileLabel("");
      return;
    }

    setIdFrontFileLabel(file.name);

    const fileErr = validateIdCardImageFile(file);
    if (fileErr) {
      setStep3FieldErrors((prev) => ({ ...prev, representativeFront: fileErr }));
      setIdFrontPreviewUrl(null);
      if (syncInput) assignToInput(idFrontInputRef, file);
      return;
    }

    const url = URL.createObjectURL(file);
    idFrontBlobRef.current = url;
    setIdFrontPreviewUrl(url);
    clearApiField("representativeFront");
    if (syncInput) assignToInput(idFrontInputRef, file);
  };

  const applyBackFile = (file, syncInput = false) => {
    if (idBackBlobRef.current) {
      URL.revokeObjectURL(idBackBlobRef.current);
      idBackBlobRef.current = null;
    }
    setStep3FieldErrors((prev) => {
      const next = { ...prev };
      delete next.representativeBack;
      return next;
    });

    if (!file) {
      setIdBackPreviewUrl(null);
      setIdBackFileLabel("");
      return;
    }

    setIdBackFileLabel(file.name);

    const fileErr = validateIdCardImageFile(file);
    if (fileErr) {
      setStep3FieldErrors((prev) => ({ ...prev, representativeBack: fileErr }));
      setIdBackPreviewUrl(null);
      if (syncInput) assignToInput(idBackInputRef, file);
      return;
    }

    const url = URL.createObjectURL(file);
    idBackBlobRef.current = url;
    setIdBackPreviewUrl(url);
    clearApiField("representativeBack");
    if (syncInput) assignToInput(idBackInputRef, file);
  };

  const onIdFrontFileChange = (e) => {
    applyFrontFile(e.target.files?.[0], false);
  };

  const onIdBackFileChange = (e) => {
    applyBackFile(e.target.files?.[0], false);
  };

  const onIdFrontDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) applyFrontFile(file, true);
  };

  const onIdBackDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) applyBackFile(file, true);
  };

  const applyCompanyRegFile = (file, syncInput = false) => {
    if (companyRegBlobRef.current) {
      URL.revokeObjectURL(companyRegBlobRef.current);
      companyRegBlobRef.current = null;
    }
    if (!file || file.size <= 0) {
      setCompanyRegPreviewUrl(null);
      setCompanyRegIsPdf(false);
      setCompanyRegFileLabel("");
      return;
    }
    const isPdf = file.type === "application/pdf";
    setCompanyRegIsPdf(isPdf);
    setCompanyRegFileLabel(file.name);
    if (isPdf) {
      setCompanyRegPreviewUrl(null);
    } else if (file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      companyRegBlobRef.current = url;
      setCompanyRegPreviewUrl(url);
    } else {
      setCompanyRegPreviewUrl(null);
    }
    clearApiField("companyRegistration");
    if (syncInput) assignToInput(companyRegInputRef, file);
  };

  const applyBrandAvatarFile = (file, syncInput = false) => {
    if (brandAvatarBlobRef.current) {
      URL.revokeObjectURL(brandAvatarBlobRef.current);
      brandAvatarBlobRef.current = null;
    }
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      brandAvatarBlobRef.current = url;
      setBrandAvatarPreviewUrl(url);
      setBrandAvatarFileLabel(file.name);
      clearApiField("brandAvatar");
      if (syncInput) assignToInput(brandAvatarInputRef, file);
    } else {
      setBrandAvatarPreviewUrl(null);
      setBrandAvatarFileLabel("");
    }
  };

  const onCompanyRegFileChange = (e) => {
    applyCompanyRegFile(e.target.files?.[0], false);
  };

  const onBrandAvatarFileChange = (e) => {
    applyBrandAvatarFile(e.target.files?.[0], false);
  };

  const onCompanyRegDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && (file.type.startsWith("image/") || file.type === "application/pdf")) {
      applyCompanyRegFile(file, true);
    }
  };

  const onBrandAvatarDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) applyBrandAvatarFile(file, true);
  };

  const patchDraft = (p) => {
    saveHostOnboardingDraft(p);
    setDraft((d) => ({ ...d, ...p }));
  };

  const go = (n) => navigate(`/host/register/${n}`);

const getRegisterCredentials = () => {
    // Tắt cái trò "chặn cửa" của Frontend đi, cứ có gì gửi nấy cho Backend phân xử!
    const token = draft.registerToken || "";
    const draftId = draft.registerDraftId || "";
    return { draftId, token };
  };

  const saveDraftToApi = async (payload) => {
    const { token } = getRegisterCredentials();
    setSavingDraft(true);
    setOtpError("");
    try {
      // Chỉ truyền token và payload
      const res = await updateHostRegisterDraft({ token, payload });
      
      // Hứng draftId do BE trả về sau khi tạo thành công ở Bước 5 (để dùng cho Bước 6)
      if (res?.draftId || res?.id) {
        patchDraft({ registerDraftId: res.draftId || res.id });
      }
      return res;
    } finally {
      setSavingDraft(false);
    }
  };

  const applyDraftApiCatch = (error, fallbackMsg) => {
    if (error instanceof Error && error.fieldErrors && typeof error.fieldErrors === "object") {
      setApiFieldErrors(error.fieldErrors);
    } else {
      setApiFieldErrors({});
    }
    setOtpError(onboardingErrorMessage(error, fallbackMsg));
  };

  /** Một lần gửi multipart đầy đủ sau bước ngân hàng (sau khi user đã điền hết các bước 3–5). */
  const submitFullRegisterDraft = async (mergedDraft, files) => {
    setOtpError("");
    setApiFieldErrors({});
    const missing = validateFullRegisterDraft(mergedDraft, files);
    if (missing.length) {
      setOtpError(`Vui lòng hoàn thành: ${missing.join(", ")}.`);
      return false;
    }
    try {
      await saveDraftToApi(buildRegisterDraftApiPayload(mergedDraft, files));
      setApiFieldErrors({});
      return true;
    } catch (error) {
      if (error instanceof Error && error.fieldErrors && typeof error.fieldErrors === "object") {
        setApiFieldErrors(error.fieldErrors);
      } else {
        setApiFieldErrors({});
      }
      setOtpError(onboardingErrorMessage(error, "Không thể gửi hồ sơ đăng ký."));
      return false;
    }
  };

  const handleSendOtp = async (email) => {
    if (!email) return;
    setSendingOtp(true);
    setOtpError("");
    setOtpInfo("");
    try {
      const result = await sendHostRegisterOtp(email);
      patchDraft({
        email,
        registerDraftId: result?.draftId || draft.registerDraftId,
        registerToken: result?.token || draft.registerToken,
      });
      setOtpInfo("Đã gửi OTP đến email của bạn.");
      setResendTimer(60); // <-- Bắt đầu đếm ngược 60s khi chuyển sang bước 2
      go(2);
    } catch (error) {
      setOtpError(onboardingErrorMessage(error, "Không thể gửi OTP. Vui lòng thử lại."));
    } finally {
      setSendingOtp(false);
    }
  };

  const finishAndEnterHost = async () => {
    setHostOnboardingComplete();
    clearHostOnboardingDraft();
    clearDraftFilesFromDB();
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
              onSubmit={async (e) => {
                e.preventDefault();
                const fd = new FormData(e.target);
                const email = fd.get("email")?.trim().toLowerCase();
                if (!email) return;
                await handleSendOtp(email);
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
                {otpError ? <p className="px-1 text-xs text-red-600">{otpError}</p> : null}
              </div>
              <button
                type="submit"
                disabled={sendingOtp}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 text-lg font-bold text-white shadow-sm transition hover:shadow-md active:scale-[0.98]"
              >
                {sendingOtp ? "Đang gửi..." : "Gửi yêu cầu đăng ký"}
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
            <span className="font-bold text-primary">{draft.email || "email của bạn"}</span>. Nhập mã bên dưới để xác thực.
          </p>
          {otpInfo ? <p className="mt-2 text-sm font-medium text-emerald-600">{otpInfo}</p> : null}
          {otpError ? <p className="mt-2 text-sm font-medium text-red-600">{otpError}</p> : null}
        </div>

        <div className="mb-8 rounded-xl border border-slate-200/80 bg-white p-8 shadow-sm">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (!otpReady || !draft.email || !otpCode) return;
              setVerifyingOtp(true);
              setOtpError("");
              try {
                const result = await verifyHostRegisterOtp({ email: draft.email, otpCode });
                patchDraft({
                  emailVerified: !!result?.success,
                  registerDraftId: result?.draftId || draft.registerDraftId,
                  registerToken: result?.token || draft.registerToken,
                });
                go(3);
              } catch (error) {
                setOtpError(onboardingErrorMessage(error, "Mã OTP không hợp lệ hoặc đã hết hạn."));
              } finally {
                setVerifyingOtp(false);
              }
            }}
          >
            <OtpSix
              onComplete={(code) => {
                setOtpCode(code);
                setOtpReady(code.length === 6);
              }}
            />
            <button
              type="submit"
              disabled={!otpReady || verifyingOtp}
              className="w-full rounded-xl bg-primary py-4 text-lg font-bold text-white shadow-sm transition hover:brightness-110 active:scale-[0.98] disabled:opacity-50"
            >
              {verifyingOtp ? "Đang xác thực..." : "Xác nhận tài khoản"}
            </button>
          </form>
        </div>

        <div className="mb-8 flex flex-col items-center gap-6">
          <p className="font-medium text-slate-600">
            Không nhận được email?{" "}
            <button
              type="button"
              disabled={sendingOtp || !draft.email || resendTimer > 0}
              onClick={async () => {
                if (!draft.email) return;
                setSendingOtp(true);
                setOtpError("");
                setOtpInfo("");
                try {
                  await resendHostRegisterOtp(draft.email);
                  setOtpInfo("Đã gửi lại OTP. Vui lòng kiểm tra email.");
                  setResendTimer(60); // <-- Reset lại 60s khi bấm gửi lại thành công
                } catch (error) {
                  setOtpError(onboardingErrorMessage(error, "Không thể gửi lại OTP."));
                } finally {
                  setSendingOtp(false);
                }
              }}
              className="font-bold text-primary hover:underline disabled:cursor-not-allowed disabled:opacity-50 min-w-[120px] text-left"
            >
              {sendingOtp ? "Đang gửi..." : resendTimer > 0 ? `Gửi lại mã (${resendTimer}s)` : "Gửi lại mã"}
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
    const nameDefaults = legacyDraftNameDefaults(draft);
    return (
      <div className="mx-auto max-w-6xl">
        <div className="mb-5">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Thông tin cá nhân</h1>
          {otpError ? <p className="mt-2 text-sm font-medium text-red-600">{otpError}</p> : null}
          {showApiErrOutsideStep(HOST_ONBOARD_STEP3_ERR_KEYS) ? (
            <p className="mt-2 text-xs text-amber-800">
              Có lỗi từ bước Doanh nghiệp hoặc Ngân hàng — sửa các ô tương ứng ở các bước đó (viền đỏ).
            </p>
          ) : null}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-8">
            <form
              key="form-step-3"
              onSubmit={async (e) => {
                e.preventDefault();
                const fd = new FormData(e.target);
                const frontIdFile = fd.get("representativeFrontFile");
                const backIdFile = fd.get("representativeBackFile");
                const username = fd.get("username")?.trim();
                const lastName = fd.get("lastName")?.trim();
                const firstName = fd.get("firstName")?.trim();
                const fullName = [lastName, firstName].filter(Boolean).join(" ").trim();
                const payload = {
                  username,
                  lastName,
                  firstName,
                  fullName,
                  phone: fd.get("phone"),
                  idNumber: fd.get("idNumber"),
                };
                setOtpError("");
                const clientErrs = {};
                const eu = validateHostUsername(username);
                if (eu) clientErrs.username = eu;
                const eln = validateVietnameseNamePart(firstName, "Họ");
                if (eln) clientErrs.firstName = eln;
                const efn = validateVietnameseNamePart(lastName, "Tên");
                if (efn) clientErrs.lastName = efn;
                const ep = validateVietnamPhone(fd.get("phone"));
                if (ep) clientErrs.phone = ep;
                const eid = validateCitizenIdNumber(fd.get("idNumber"));
                if (eid) clientErrs.idNumber = eid;
                const eFront = validateIdCardImageFile(frontIdFile instanceof File ? frontIdFile : null);
                if (eFront) clientErrs.representativeFront = eFront;
                const eBack = validateIdCardImageFile(backIdFile instanceof File ? backIdFile : null);
                if (eBack) clientErrs.representativeBack = eBack;
                setStep3FieldErrors(clientErrs);
                if (Object.keys(clientErrs).length > 0) {
                  setOtpError("Vui lòng sửa các trường chưa hợp lệ (viền đỏ).");
                  return;
                }
                const merged = { ...draft, ...payload };
                const files = {
                  ...registerDraftFiles,
                  representativeFront: frontIdFile,
                  representativeBack: backIdFile,
                };
                try {
                  patchDraft(payload);
                  setRegisterDraftFiles(files);
                  saveDraftFilesToDB(files);
                  setApiFieldErrors({});
                  setStep3FieldErrors({});
                  setOtpError("");
                  go(4);
                } catch (error) {
                  applyDraftApiCatch(error, "Không thể lưu bước thông tin cá nhân. Vui lòng kiểm tra lại.");
                }
              }}
              className="space-y-5"
            >
              <section className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.06)] md:p-6">
                <div className="space-y-5">
                  <div>
                    <label htmlFor="host-reg-username" className={`${fieldLabel} mb-1.5 block`}>
                      Tên đăng nhập
                    </label>
                    <input
                      id="host-reg-username"
                      name="username" // <-- Phải là username
                      required
                      minLength={3}
                      maxLength={64}
                      autoComplete="off" // <-- Tắt để trình duyệt không tự đồng bộ bậy bạ
                      defaultValue={draft.username || ""} // <-- Gọi đúng biến username
                      className={inpClsStep3("username")}
                      placeholder="VD: nguyenvanan hoặc email@domain.com"
                      {...bindStep3ValidatedInput("username", validateHostUsername)}
                    />
                    {step3Msg("username") ? (
                      <p className="mt-1 text-xs font-medium text-red-600">{step3Msg("username")}</p>
                    ) : null}
                  </div>

                  <div className="h-px bg-slate-100" aria-hidden />

                  <div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="host-reg-lastname" className={fieldLabel}>
                          Họ
                        </label>
                        <input
                          id="host-reg-lastname"
                          name="lastName"
                          required
                          autoComplete="family-name"
                          defaultValue={nameDefaults.lastName}
                          className={inpClsStep3("lastName", "mt-1.5")}
                          placeholder="Ví dụ: Nguyễn"
                          {...bindStep3ValidatedInput("lastName", (v) => validateVietnameseNamePart(v, "Họ"))}
                        />
                        {step3Msg("lastName") ? (
                          <p className="mt-1 text-xs font-medium text-red-600">{step3Msg("lastName")}</p>
                        ) : null}
                      </div>
                      <div>
                        <label htmlFor="host-reg-firstname" className={fieldLabel}>
                          Tên
                        </label>
                        <input
                          id="host-reg-firstname"
                          name="firstName"
                          required
                          autoComplete="given-name"
                          defaultValue={nameDefaults.firstName}
                          className={inpClsStep3("firstName", "mt-1.5")}
                          placeholder="Ví dụ: Văn An"
                          {...bindStep3ValidatedInput("firstName", (v) => validateVietnameseNamePart(v, "Tên"))}
                        />
                        {step3Msg("firstName") ? (
                          <p className="mt-1 text-xs font-medium text-red-600">{step3Msg("firstName")}</p>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-slate-100" aria-hidden />

                  <div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="host-reg-phone" className={fieldLabel}>
                          Số điện thoại
                        </label>
                        <input
                          id="host-reg-phone"
                          name="phone"
                          required
                          autoComplete="tel"
                          defaultValue={draft.phone || ""}
                          className={inpClsStep3("phone", "mt-1.5")}
                          placeholder="0xxx xxx xxx hoặc +84…"
                          {...bindStep3ValidatedInput("phone", validateVietnamPhone)}
                        />
                        {step3Msg("phone") ? (
                          <p className="mt-1 text-xs font-medium text-red-600">{step3Msg("phone")}</p>
                        ) : null}
                      </div>
                      <div>
                        <label htmlFor="host-reg-id" className={fieldLabel}>
                          Số CCCD / CMND
                        </label>
                        <input
                          id="host-reg-id"
                          name="idNumber"
                          required
                          inputMode="numeric"
                          autoComplete="off"
                          defaultValue={draft.idNumber || ""}
                          className={inpClsStep3("idNumber", "mt-1.5")}
                          placeholder="9 số (CMND) hoặc 12 số (CCCD)"
                          {...bindStep3ValidatedInput("idNumber", validateCitizenIdNumber)}
                        />
                        {step3Msg("idNumber") ? (
                          <p className="mt-1 text-xs font-medium text-red-600">{step3Msg("idNumber")}</p>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  {/* ===== ĐÂY CHÍNH LÀ Ô HỌ TÊN TRÊN CCCD MỚI ===== */}
                  <div className="h-px bg-slate-100" aria-hidden />

                  <div>
                    <label htmlFor="host-reg-idname" className={`${fieldLabel} mb-1.5 block`}>
                      Họ tên trên CCCD / CMND
                    </label>
                    <input
                      id="host-reg-idname"
                      name="idName"
                      required
                      autoComplete="name"
                      defaultValue={draft.idName || draft.fullName || ""}
                      className={inpClsStep3("idName")}
                      placeholder="VD: NGUYEN VAN A"
                      style={{ textTransform: "uppercase" }} // Thuộc tính này sẽ ép chữ tự động viết hoa
                      {...bindStep3ValidatedInput("idName", (v) => validateVietnameseNamePart(v, "Họ tên trên CCCD"))}
                    />
                    {step3Msg("idName") ? (
                      <p className="mt-1 text-xs font-medium text-red-600">{step3Msg("idName")}</p>
                    ) : null}
                  </div>
                  {/* ============================================== */}

                </div>
              </section>

              <section className="rounded-2xl border-2 border-dashed border-slate-200/90 bg-gradient-to-b from-white to-slate-50/80 p-5 md:p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <span className="material-symbols-outlined text-[24px]">add_a_photo</span>
                  </span>
                  <div className="min-w-0">
                    <h4 className="text-base font-bold text-slate-900">Ảnh CCCD / CMND</h4>
                    <p className="mt-0.5 text-xs text-slate-500">JPG, PNG, WebP · tối đa 5MB</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-end justify-between gap-2">
                      <span className={fieldLabel}>Mặt trước</span>
                    </div>
                    <input
                      ref={idFrontInputRef}
                      id="host-reg-id-front"
                      name="representativeFrontFile"
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      required
                      onChange={onIdFrontFileChange}
                      className="sr-only"
                      tabIndex={-1}
                      aria-label="Tệp ảnh mặt trước CCCD"
                    />
                    <div
                      role="button"
                      tabIndex={0}
                      aria-label="Ảnh mặt trước CCCD"
                      onClick={() => idFrontInputRef.current?.click()}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          idFrontInputRef.current?.click();
                        }
                      }}
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onDrop={onIdFrontDrop}
                      className={`relative w-full cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed transition-colors ${
                        step3Msg("representativeFront")
                          ? "border-red-500 bg-red-50/40"
                          : idFrontPreviewUrl
                            ? "border-slate-200 bg-slate-100/90"
                            : "border-slate-200 bg-slate-50/90 hover:border-primary/40 hover:bg-primary/[0.03]"
                      }`}
                    >
                      <div className="relative aspect-[85.6/54] w-full">
                        {idFrontPreviewUrl ? (
                          <img
                            src={idFrontPreviewUrl}
                            alt=""
                            className="absolute inset-0 h-full w-full object-contain p-2"
                          />
                        ) : (
                          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 px-4 text-center">
                            <span className="material-symbols-outlined text-3xl text-slate-400">id_card</span>
                            <p className="text-sm font-medium text-slate-600">Chọn ảnh</p>
                          </div>
                        )}
                      </div>
                    </div>
                    {idFrontFileLabel ? (
                      <p className="truncate text-xs text-slate-500" title={idFrontFileLabel}>
                        {idFrontFileLabel}
                      </p>
                    ) : null}
                    {step3Msg("representativeFront") ? (
                      <p className="text-xs font-medium text-red-600">{step3Msg("representativeFront")}</p>
                    ) : null}
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex items-end justify-between gap-2">
                      <span className={fieldLabel}>Mặt sau</span>
                    </div>
                    <input
                      ref={idBackInputRef}
                      id="host-reg-id-back"
                      name="representativeBackFile"
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      required
                      onChange={onIdBackFileChange}
                      className="sr-only"
                      tabIndex={-1}
                      aria-label="Tệp ảnh mặt sau CCCD"
                    />
                    <div
                      role="button"
                      tabIndex={0}
                      aria-label="Ảnh mặt sau CCCD"
                      onClick={() => idBackInputRef.current?.click()}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          idBackInputRef.current?.click();
                        }
                      }}
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onDrop={onIdBackDrop}
                      className={`relative w-full cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed transition-colors ${
                        step3Msg("representativeBack")
                          ? "border-red-500 bg-red-50/40"
                          : idBackPreviewUrl
                            ? "border-slate-200 bg-slate-100/90"
                            : "border-slate-200 bg-slate-50/90 hover:border-primary/40 hover:bg-primary/[0.03]"
                      }`}
                    >
                      <div className="relative aspect-[85.6/54] w-full">
                        {idBackPreviewUrl ? (
                          <img
                            src={idBackPreviewUrl}
                            alt=""
                            className="absolute inset-0 h-full w-full object-contain p-2"
                          />
                        ) : (
                          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 px-4 text-center">
                            <span className="material-symbols-outlined text-3xl text-slate-400">flip</span>
                            <p className="text-sm font-medium text-slate-600">Chọn ảnh</p>
                          </div>
                        )}
                      </div>
                    </div>
                    {idBackFileLabel ? (
                      <p className="truncate text-xs text-slate-500" title={idBackFileLabel}>
                        {idBackFileLabel}
                      </p>
                    ) : null}
                    {step3Msg("representativeBack") ? (
                      <p className="text-xs font-medium text-red-600">{step3Msg("representativeBack")}</p>
                    ) : null}
                  </div>
                </div>
              </section>

              <div className="flex items-center justify-between pt-1">
                <button type="button" onClick={() => go(2)} className="flex items-center gap-2 font-bold text-slate-500 hover:text-primary">
                  <span className="material-symbols-outlined text-sm">arrow_back_ios</span>
                  Quay lại
                </button>
                <button
                  type="submit"
                  disabled={savingDraft}
                  className="flex items-center gap-3 rounded-xl bg-primary px-10 py-4 font-bold text-white shadow-lg shadow-primary/20 transition hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                >
                  {savingDraft ? "Đang lưu…" : "Tiếp tục"}
                  <span className="material-symbols-outlined text-sm">arrow_forward_ios</span>
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-5 lg:col-span-4">
            <div className="sticky top-24 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h4 className="mb-3 font-bold text-primary">Tại sao cần thông tin này?</h4>
              <ul className="space-y-3">
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

  /* ---------- Step 4 — cùng rhythm UI với bước 3 ---------- */
  if (current === 4) {
    return (
      <div className="mx-auto max-w-6xl">
        <div className="mb-5">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Thông tin doanh nghiệp</h1>
          <p className="mt-1 text-sm text-slate-600">Khai báo khi bạn cho thuê với tư cách công ty hoặc hộ kinh doanh.</p>
          {otpError ? <p className="mt-2 text-sm font-medium text-red-600">{otpError}</p> : null}
          {showApiErrOutsideStep(HOST_ONBOARD_STEP4_ERR_KEYS) ? (
            <p className="mt-2 text-xs text-amber-800">
              Có lỗi ở bước Thông tin cá nhân hoặc Ngân hàng — dùng Quay lại hoặc xem ô viền đỏ ở các bước đó.
            </p>
          ) : null}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-8">
            <form
              key="form-step-4"
              onSubmit={async (e) => {
                e.preventDefault();
                const fd = new FormData(e.target);
                const companyRegistrationFile = fd.get("companyRegistrationFile");
                const brandAvatarFile = fd.get("brandAvatarFile");
                const payload = {
                  businessName: fd.get("businessName"), // <-- Đổi thành businessName
                  taxCode: fd.get("taxCode"),
                  brandName: fd.get("brandName"),
                  district: fd.get("district"),
                  ward: fd.get("ward"),
                  companyAddress: fd.get("companyAddress"),
                };
                const nextCo =
                  companyRegistrationFile instanceof File && companyRegistrationFile.size > 0
                    ? companyRegistrationFile
                    : registerDraftFiles.companyRegistration;
                const nextAvatar =
                  brandAvatarFile instanceof File && brandAvatarFile.size > 0 ? brandAvatarFile : registerDraftFiles.brandAvatar;
                setOtpError("");
                if (!(nextCo instanceof File) || nextCo.size <= 0) {
                  setOtpError("Vui lòng tải giấy đăng ký doanh nghiệp.");
                  return;
                }
                if (!(nextAvatar instanceof File) || nextAvatar.size <= 0) {
                  setOtpError("Vui lòng tải avatar thương hiệu.");
                  return;
                }
                const merged = { ...draft, ...payload };
                const nextFiles = {
                  ...registerDraftFiles,
                  companyRegistration: nextCo,
                  brandAvatar: nextAvatar,
                };
                try {
                  patchDraft(payload);
                  setRegisterDraftFiles(nextFiles);
                  saveDraftFilesToDB(nextFiles); // <--- DÒNG MỚI ĐỂ LƯU ẢNH VÀO KHO
                  setApiFieldErrors({});
                  setOtpError("");
                  go(5);
                } catch (error) {
                  applyDraftApiCatch(error, "Không thể lưu bước doanh nghiệp. Vui lòng kiểm tra lại.");
                }
              }}
              className="space-y-5"
            >
              <section className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.06)] md:p-6">
                <div className="space-y-5">
                  <div>
                    <label htmlFor="host-step4-company" className={`${fieldLabel} mb-1.5 block`}>
                      Tên doanh nghiệp
                    </label>
                    <input
                      id="host-step4-company"
                      name="businessName" // <-- Đổi thành businessName
                      required
                      autoComplete="off"
                      defaultValue={draft.businessName || ""} // <-- Đổi thành draft.businessName
                      className={inpCls("businessName")} // <-- Đổi thành businessName
                      placeholder="Tên trên giấy đăng ký kinh doanh"
                      onInput={() => clearApiField("businessName")} // <-- Đổi thành businessName
                    />
                    {apiFieldErrors.businessName ? ( // <-- Đổi thành businessName
                      <p className="mt-1 text-xs font-medium text-red-600">{apiFieldErrors.businessName}</p>
                    ) : null}
                  </div>

                  <div className="h-px bg-slate-100" aria-hidden />

                  <div>
                    <label htmlFor="host-step4-tax" className={`${fieldLabel} mb-1.5 block`}>
                      Mã số thuế
                    </label>
                    <input
                      id="host-step4-tax"
                      name="taxCode"
                      inputMode="numeric"
                      autoComplete="off"
                      defaultValue={draft.taxCode || ""}
                      className={inpCls("taxCode")}
                      placeholder="Để trống nếu chưa có"
                      onInput={() => clearApiField("taxCode")}
                    />
                    {apiFieldErrors.taxCode ? (
                      <p className="mt-1 text-xs font-medium text-red-600">{apiFieldErrors.taxCode}</p>
                    ) : null}
                  </div>

                  <div className="h-px bg-slate-100" aria-hidden />

                  <div>
                    <label htmlFor="host-step4-brand" className={`${fieldLabel} mb-1.5 block`}>
                      Tên thương hiệu
                    </label>
                    <input
                      id="host-step4-brand"
                      name="brandName"
                      required
                      defaultValue={draft.brandName || ""}
                      className={inpCls("brandName")}
                      placeholder="Tên hiển thị với khách"
                      onInput={() => clearApiField("brandName")}
                    />
                    {apiFieldErrors.brandName ? (
                      <p className="mt-1 text-xs font-medium text-red-600">{apiFieldErrors.brandName}</p>
                    ) : null}
                  </div>

                  <div className="h-px bg-slate-100" aria-hidden />

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="host-step4-district" className={fieldLabel}>
                        Quận / Huyện
                      </label>
                      <input
                        id="host-step4-district"
                        name="district"
                        required
                        defaultValue={draft.district || ""}
                        className={inpCls("district", "mt-1.5")}
                        onInput={() => clearApiField("district")}
                      />
                      {apiFieldErrors.district ? (
                        <p className="mt-1 text-xs font-medium text-red-600">{apiFieldErrors.district}</p>
                      ) : null}
                    </div>
                    <div>
                      <label htmlFor="host-step4-ward" className={fieldLabel}>
                        Phường / Xã
                      </label>
                      <input
                        id="host-step4-ward"
                        name="ward"
                        required
                        defaultValue={draft.ward || ""}
                        className={inpCls("ward", "mt-1.5")}
                        onInput={() => clearApiField("ward")}
                      />
                      {apiFieldErrors.ward ? (
                        <p className="mt-1 text-xs font-medium text-red-600">{apiFieldErrors.ward}</p>
                      ) : null}
                    </div>
                  </div>

                  <div className="h-px bg-slate-100" aria-hidden />

                  <div>
                    <label htmlFor="host-step4-address" className={`${fieldLabel} mb-1.5 block`}>
                      Địa chỉ trụ sở
                    </label>
                    <textarea
                      id="host-step4-address"
                      name="companyAddress"
                      required
                      rows={3}
                      defaultValue={draft.companyAddress || ""}
                      className={inpCls("companyAddress")}
                      placeholder="Số nhà, đường, tòa nhà…"
                      onInput={() => clearApiField("companyAddress")}
                    />
                    {apiFieldErrors.companyAddress ? (
                      <p className="mt-1 text-xs font-medium text-red-600">{apiFieldErrors.companyAddress}</p>
                    ) : null}
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border-2 border-dashed border-slate-200/90 bg-gradient-to-b from-white to-slate-50/80 p-5 md:p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <span className="material-symbols-outlined text-[24px]">folder_special</span>
                  </span>
                  <div className="min-w-0">
                    <h4 className="text-base font-bold text-slate-900">Giấy phép &amp; hình ảnh thương hiệu</h4>
                    <p className="mt-0.5 text-xs text-slate-500">GPKD: ảnh hoặc PDF · Avatar: JPG, PNG, WebP</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <span className={fieldLabel}>Giấy đăng ký doanh nghiệp</span>
                    <input
                      ref={companyRegInputRef}
                      id="host-step4-gpkd"
                      name="companyRegistrationFile"
                      type="file"
                      accept="image/jpeg,image/png,image/webp,application/pdf"
                      onChange={onCompanyRegFileChange}
                      className="sr-only"
                      tabIndex={-1}
                      aria-label="Tệp giấy đăng ký doanh nghiệp"
                    />
                    <div
                      role="button"
                      tabIndex={0}
                      aria-label="Tải giấy đăng ký doanh nghiệp"
                      onClick={() => companyRegInputRef.current?.click()}
                      onKeyDown={(ev) => {
                        if (ev.key === "Enter" || ev.key === " ") {
                          ev.preventDefault();
                          companyRegInputRef.current?.click();
                        }
                      }}
                      onDragOver={(ev) => {
                        ev.preventDefault();
                        ev.stopPropagation();
                      }}
                      onDrop={onCompanyRegDrop}
                      className={`relative w-full cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed transition-colors ${
                        apiFieldErrors.companyRegistration
                          ? "border-red-500 bg-red-50/40"
                          : companyRegPreviewUrl || companyRegIsPdf
                            ? "border-slate-200 bg-slate-100/90"
                            : "border-slate-200 bg-slate-50/90 hover:border-primary/40 hover:bg-primary/[0.03]"
                      }`}
                    >
                      <div className="relative aspect-[4/3] w-full min-h-[140px]">
                        {companyRegPreviewUrl ? (
                          <img
                            src={companyRegPreviewUrl}
                            alt=""
                            className="absolute inset-0 h-full w-full object-contain p-2"
                          />
                        ) : companyRegIsPdf ? (
                          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4">
                            <span className="material-symbols-outlined text-4xl text-red-500">picture_as_pdf</span>
                            <p className="text-sm font-medium text-slate-600">Đã chọn PDF</p>
                          </div>
                        ) : (
                          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 px-4 text-center">
                            <span className="material-symbols-outlined text-3xl text-slate-400">description</span>
                            <p className="text-sm font-medium text-slate-600">Chọn hoặc kéo thả</p>
                          </div>
                        )}
                      </div>
                    </div>
                    {companyRegFileLabel ? (
                      <p className="truncate text-xs text-slate-500" title={companyRegFileLabel}>
                        {companyRegFileLabel}
                      </p>
                    ) : null}
                    {apiFieldErrors.companyRegistration ? (
                      <p className="text-xs font-medium text-red-600">{apiFieldErrors.companyRegistration}</p>
                    ) : null}
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className={fieldLabel}>Avatar thương hiệu</span>
                    <input
                      ref={brandAvatarInputRef}
                      id="host-step4-avatar"
                      name="brandAvatarFile"
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={onBrandAvatarFileChange}
                      className="sr-only"
                      tabIndex={-1}
                      aria-label="Tệp avatar thương hiệu"
                    />
                    <div
                      role="button"
                      tabIndex={0}
                      aria-label="Tải avatar thương hiệu"
                      onClick={() => brandAvatarInputRef.current?.click()}
                      onKeyDown={(ev) => {
                        if (ev.key === "Enter" || ev.key === " ") {
                          ev.preventDefault();
                          brandAvatarInputRef.current?.click();
                        }
                      }}
                      onDragOver={(ev) => {
                        ev.preventDefault();
                        ev.stopPropagation();
                      }}
                      onDrop={onBrandAvatarDrop}
                      className={`relative w-full cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed transition-colors ${
                        apiFieldErrors.brandAvatar
                          ? "border-red-500 bg-red-50/40"
                          : brandAvatarPreviewUrl
                            ? "border-slate-200 bg-slate-100/90"
                            : "border-slate-200 bg-slate-50/90 hover:border-primary/40 hover:bg-primary/[0.03]"
                      }`}
                    >
                      <div className="relative aspect-square max-h-[200px] w-full max-w-[200px] mx-auto">
                        {brandAvatarPreviewUrl ? (
                          <img
                            src={brandAvatarPreviewUrl}
                            alt=""
                            className="absolute inset-0 h-full w-full rounded-2xl object-cover p-1"
                          />
                        ) : (
                          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 px-4 text-center">
                            <span className="material-symbols-outlined text-3xl text-slate-400">add_a_photo</span>
                            <p className="text-sm font-medium text-slate-600">Chọn ảnh logo</p>
                          </div>
                        )}
                      </div>
                    </div>
                    {brandAvatarFileLabel ? (
                      <p className="truncate text-xs text-slate-500" title={brandAvatarFileLabel}>
                        {brandAvatarFileLabel}
                      </p>
                    ) : null}
                    {apiFieldErrors.brandAvatar ? (
                      <p className="text-xs font-medium text-red-600">{apiFieldErrors.brandAvatar}</p>
                    ) : null}
                  </div>
                </div>
              </section>

              <div className="flex items-center justify-between pt-1">
                <button type="button" onClick={() => go(3)} className="flex items-center gap-2 font-bold text-slate-500 hover:text-primary">
                  <span className="material-symbols-outlined text-sm">arrow_back_ios</span>
                  Quay lại
                </button>
                <button
                  type="submit"
                  disabled={savingDraft}
                  className="flex items-center gap-3 rounded-xl bg-primary px-10 py-4 font-bold text-white shadow-lg shadow-primary/20 transition hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                >
                  {savingDraft ? "Đang lưu…" : "Tiếp tục"}
                  <span className="material-symbols-outlined text-sm">arrow_forward_ios</span>
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-5 lg:col-span-4">
            <div className="sticky top-24 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h4 className="mb-3 font-bold text-primary">Vì sao cần thông tin doanh nghiệp?</h4>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                    <span className="material-symbols-outlined text-sm text-emerald-600" style={{ fontVariationSettings: "'FILL' 1" }}>
                      gavel
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">Hồ sơ pháp lý giúp BoxHub xác minh bạn là đơn vị kinh doanh hợp lệ.</p>
                </li>
                <li className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <span className="material-symbols-outlined text-sm text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                      storefront
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">Thương hiệu và avatar hiển thị thống nhất trên nền tảng.</p>
                </li>
                <li className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/10">
                    <span className="material-symbols-outlined text-sm text-amber-600" style={{ fontVariationSettings: "'FILL' 1" }}>
                      map
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">Địa chỉ trụ sở dùng cho hợp đồng và liên hệ chính thức.</p>
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

  /* ---------- Step 5 — bank_name, account_number, account_name, payment_method (chuỗi) ---------- */
  if (current === 5) {
    return (
      <div className="mx-auto max-w-6xl">
        <div className="mb-5">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Liên kết ngân hàng</h1>
          <p className="mt-1 text-sm text-slate-600">
            Thanh toán định kỳ được chuyển về tài khoản bạn khai báo — toàn bộ là thông tin dạng chữ, không tải file.
          </p>
          {otpError ? <p className="mt-2 text-sm font-medium text-red-600">{otpError}</p> : null}
          {showApiErrOutsideStep(HOST_ONBOARD_STEP5_ERR_KEYS) ? (
            <p className="mt-2 text-xs text-amber-800">
              Có lỗi ở bước trước — dùng Quay lại để sửa các ô viền đỏ (ví dụ mã số thuế, CCCD).
            </p>
          ) : null}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-8">
            <form
              key="form-step-5"
              onSubmit={async (e) => {
                e.preventDefault();
                const fd = new FormData(e.target);
                const payload = {
                  bankName: fd.get("bankName"),
                  bankAccount: fd.get("bankAccount"),
                  bankHolder: fd.get("bankHolder"),
                  paymentMethod: fd.get("paymentMethod"),
                };
                patchDraft(payload);
                const merged = { ...draft, ...payload };
                const ok = await submitFullRegisterDraft(merged, registerDraftFiles);
                if (!ok) return;
                go(6);
              }}
              className="space-y-5"
            >
              <section className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.06)] md:p-6">
                <div className="mb-5 rounded-xl bg-gradient-to-b from-primary/5 to-transparent p-4">
                  <p className="text-sm font-medium text-slate-600">
                    Số dư dự kiến sẽ được chuyển vào tài khoản này sau mỗi giao dịch.
                  </p>
                </div>
                <div className="space-y-5">
                  <div>
                    <label htmlFor="host-step5-bank" className={`${fieldLabel} mb-1.5 block`}>
                      Tên ngân hàng
                    </label>
                    <select
                      id="host-step5-bank"
                      name="bankName"
                      required
                      defaultValue={draft.bankName || "Vietcombank"}
                      className={inpCls("bankName")}
                      onChange={() => clearApiField("bankName")}
                    >
                      <option>Vietcombank</option>
                      <option>Techcombank</option>
                      <option>MB Bank</option>
                      <option>VPBank</option>
                    </select>
                    {apiFieldErrors.bankName ? (
                      <p className="mt-1 text-xs font-medium text-red-600">{apiFieldErrors.bankName}</p>
                    ) : null}
                  </div>

                  <div className="h-px bg-slate-100" aria-hidden />

                  <div>
                    <label htmlFor="host-step5-account" className={`${fieldLabel} mb-1.5 block`}>
                      Số tài khoản
                    </label>
                    <input
                      id="host-step5-account"
                      name="bankAccount"
                      required
                      inputMode="numeric"
                      autoComplete="off"
                      defaultValue={draft.bankAccount || ""}
                      className={inpCls("bankAccount")}
                      placeholder="Chỉ số, không dấu cách"
                      onInput={() => clearApiField("bankAccount")}
                    />
                    {apiFieldErrors.bankAccount ? (
                      <p className="mt-1 text-xs font-medium text-red-600">{apiFieldErrors.bankAccount}</p>
                    ) : null}
                  </div>

                  <div className="h-px bg-slate-100" aria-hidden />

                  <div>
                    <label htmlFor="host-step5-holder" className={`${fieldLabel} mb-1.5 block`}>
                      Tên chủ tài khoản
                    </label>
                    <input
                      id="host-step5-holder"
                      name="bankHolder" // Tên biến duy nhất, không đụng hàng
                      required
                      autoComplete="off" // Cấm trình duyệt điền bậy
                      defaultValue={draft.bankHolder || ""} // Chỉ lấy đúng dữ liệu của chính nó, không mượn ai hết
                      className={inpCls("bankHolder")}
                      placeholder="VD: NGUYEN VAN A hoặc CONG TY TNHH ABC"
                      style={{ textTransform: "uppercase" }} // Tự động viết hoa chữ
                      onInput={() => clearApiField("bankHolder")}
                    />
                    {apiFieldErrors.bankHolder ? (
                      <p className="mt-1 text-xs font-medium text-red-600">{apiFieldErrors.bankHolder}</p>
                    ) : null}
                  </div>

                  <div className="h-px bg-slate-100" aria-hidden />

                  <div>
                    <label htmlFor="host-step5-payment" className={`${fieldLabel} mb-1.5 block`}>
                      Phương thức thanh toán
                    </label>
                    <select
                      id="host-step5-payment"
                      name="paymentMethod"
                      required
                      defaultValue={draft.paymentMethod || "BankTransfer"}
                      className={inpCls("paymentMethod")}
                      onChange={() => clearApiField("paymentMethod")}
                    >
                      <option value="BankTransfer">Chuyển khoản ngân hàng</option>
                      <option value="ManualSettlement">Quyết toán thủ công</option>
                    </select>
                    {apiFieldErrors.paymentMethod ? (
                      <p className="mt-1 text-xs font-medium text-red-600">{apiFieldErrors.paymentMethod}</p>
                    ) : null}
                  </div>
                </div>
              </section>

              <div className="flex items-center justify-between pt-1">
                <button type="button" onClick={() => go(4)} className="flex items-center gap-2 font-bold text-slate-500 hover:text-primary">
                  <span className="material-symbols-outlined text-sm">arrow_back_ios</span>
                  Quay lại
                </button>
                <button
                  type="submit"
                  disabled={savingDraft}
                  className="flex items-center gap-3 rounded-xl bg-primary px-10 py-4 font-bold text-white shadow-lg shadow-primary/20 transition hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
                >
                  {savingDraft ? "Đang gửi hồ sơ..." : "Gửi hồ sơ & tiếp tục"}
                  {!savingDraft ? <span className="material-symbols-outlined text-sm">arrow_forward_ios</span> : null}
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-5 lg:col-span-4">
            <div className="sticky top-24 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h4 className="mb-3 font-bold text-primary">Vì sao cần tài khoản ngân hàng?</h4>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                    <span className="material-symbols-outlined text-sm text-emerald-600" style={{ fontVariationSettings: "'FILL' 1" }}>
                      payments
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">Tiền thuê được chuyển thẳng vào tài khoản bạn đăng ký.</p>
                </li>
                <li className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <span className="material-symbols-outlined text-sm text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                      shield_lock
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">Thông tin được truyền qua kênh bảo mật, không lưu mật khẩu ngân hàng.</p>
                </li>
                <li className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/10">
                    <span className="material-symbols-outlined text-sm text-amber-600" style={{ fontVariationSettings: "'FILL' 1" }}>
                      edit_document
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">Bạn có thể cập nhật sau khi được duyệt host, theo quy định nền tảng.</p>
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

  /* ---------- Step 6 ---------- */
  if (current === 6) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-amber-100">
          <span className="material-symbols-outlined text-5xl text-amber-600">hourglass_top</span>
        </div>
        <h1 className="mb-4 text-3xl font-extrabold text-slate-900">Hồ sơ đang được xem xét</h1>
        <p className="mb-10 max-w-lg text-lg text-slate-600">
          BoxHub thường phản hồi trong <strong className="text-primary">24–48 giờ</strong>. Bạn sẽ nhận email khi được duyệt.
        </p>
        {otpError ? <p className="mb-4 text-sm font-medium text-red-600">{otpError}</p> : null}
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
            onClick={async () => {
              setCheckingStatus(true);
              setOtpError("");
              try {
                const { draftId, token } = getRegisterCredentials();
                const data = await getHostRegisterDraft({ draftId, token });
                const verifiedStatus = String(
                  data?.verifiedStatus || data?.hostProfile?.verifiedStatus || data?.status || ""
                ).toLowerCase();
                if (verifiedStatus.includes("approved") || verifiedStatus.includes("active")) {
                  go(7);
                  return;
                }
                if (verifiedStatus.includes("rejected")) {
                  setOtpError(data?.rejectReason || data?.hostProfile?.rejectReason || "Hồ sơ đã bị từ chối. Vui lòng cập nhật lại thông tin.");
                  return;
                }
                setOtpError("Hồ sơ chưa được duyệt. Vui lòng thử lại sau.");
              } catch (error) {
                setOtpError(onboardingErrorMessage(error, "Không thể kiểm tra trạng thái hồ sơ."));
              } finally {
                setCheckingStatus(false);
              }
            }}
            disabled={checkingStatus}
            className="rounded-xl bg-primary px-10 py-4 font-bold text-white shadow-lg shadow-primary/25"
          >
            {checkingStatus ? "Đang kiểm tra..." : "Kiểm tra trạng thái duyệt"}
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
      {otpError ? <p className="mb-4 text-sm font-medium text-red-600">{otpError}</p> : null}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const fd = new FormData(e.target);
          const pw = fd.get("password");
          const pw2 = fd.get("confirm");
          if (pw !== pw2 || String(pw).length < 8) return;
          setSettingPassword(true);
          setOtpError("");
          try {
            await setHostPassword({
              newPassword: pw,
              confirmPassword: pw2,
            });
            patchDraft({ passwordSet: true });
            await finishAndEnterHost();
          } catch (error) {
            setOtpError(onboardingErrorMessage(error, "Không thể tạo mật khẩu."));
          } finally {
            setSettingPassword(false);
          }
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
          <button type="submit" disabled={settingPassword} className="flex-1 rounded-xl bg-primary py-4 font-bold text-white shadow-md disabled:opacity-50">
            {settingPassword ? "Đang xử lý..." : "Hoàn tất đăng ký"}
          </button>
        </div>
      </form>
    </div>
  );
}
