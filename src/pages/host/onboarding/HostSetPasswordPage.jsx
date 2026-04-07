import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "../../../config/axios";

const inputField =
  "w-full rounded-xl border-0 bg-primary/5 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-primary/30";

export default function HostSetPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Bắt token từ thanh địa chỉ URL
  const token = searchParams.get("token");

  const [pwStrength, setPwStrength] = useState(0);
  const [settingPassword, setSettingPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setError("Đường dẫn không hợp lệ hoặc đã hết hạn (Thiếu token).");
      return;
    }

    const fd = new FormData(e.target);
    const pw = fd.get("password");
    const pw2 = fd.get("confirm");

    if (pw !== pw2) {
      setError("Mật khẩu nhập lại không khớp.");
      return;
    }
    if (String(pw).length < 8) {
      setError("Mật khẩu phải có ít nhất 8 ký tự.");
      return;
    }

    setSettingPassword(true);
    setError("");

    try {
      // ĐÃ LẮP ĐÚNG API CHUẨN CỦA BACKEND VÀO ĐÂY:
      await axios.post(
        "/host/register/set-password", 
        { newPassword: pw, confirmPassword: pw2 },
        {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        }
      );
      
      alert("Tạo mật khẩu thành công! Chào mừng bạn đến với BoxHub.");
      //navigate("/internal/login", { replace: true });
      
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || "Không thể tạo mật khẩu. Token có thể đã hết hạn.";
      setError(msg);
    } finally {
      setSettingPassword(false);
    }
  };

  if (!token) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="max-w-md text-center">
          <span className="material-symbols-outlined text-6xl text-red-500 mb-4">error</span>
          <h1 className="text-2xl font-black text-slate-900 mb-2">Đường dẫn không hợp lệ</h1>
          <p className="text-slate-600 mb-6">Thiếu mã xác thực (Token). Vui lòng nhấp vào đường link chính xác trong email của bạn.</p>
          <button onClick={() => navigate("/")} className="font-bold text-primary hover:underline">Về trang chủ</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="mx-auto w-full max-w-lg rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl md:p-12">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <span className="material-symbols-outlined text-3xl text-emerald-600">verified_user</span>
          </div>
          <h1 className="mb-2 text-3xl font-extrabold text-slate-900">Tạo mật khẩu Host</h1>
          <p className="text-slate-600">Hồ sơ của bạn đã được duyệt. Hãy tạo mật khẩu để bắt đầu quản lý không gian.</p>
        </div>

        {error && <p className="mb-4 rounded-xl bg-red-50 p-3 text-sm font-medium text-red-600 border border-red-100">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">Mật khẩu mới</label>
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
                placeholder="Tối thiểu 8 ký tự"
              />
              <div className="mt-2 flex gap-1">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`h-1.5 flex-1 rounded-full transition-colors ${
                      pwStrength >= i ? (pwStrength === 1 ? "bg-red-400" : pwStrength === 2 ? "bg-amber-400" : "bg-emerald-500") : "bg-slate-100"
                    }`}
                  />
                ))}
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">Nhập lại mật khẩu</label>
              <input 
                name="confirm" 
                type="password" 
                required 
                minLength={8} 
                className={inputField} 
                placeholder="Nhập lại mật khẩu mới"
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={settingPassword} 
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 text-lg font-bold text-white shadow-md transition hover:bg-primary/90 disabled:opacity-50"
          >
            {settingPassword ? "Đang xử lý..." : "Hoàn tất đăng ký"}
            {!settingPassword && <span className="material-symbols-outlined">login</span>}
          </button>
        </form>
      </div>
    </div>
  );
}