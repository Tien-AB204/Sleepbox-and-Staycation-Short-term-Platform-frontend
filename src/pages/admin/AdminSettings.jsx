import React, { useState } from "react";

function SectionFooter({ onReset = () => {} }) {
  return (
    <div className="flex justify-end gap-3 bg-slate-50 px-6 py-4">
      <button
        type="button"
        onClick={onReset}
        className="px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:text-slate-900"
      >
        Đặt lại
      </button>
      <button type="button" className="rounded-lg bg-primary px-6 py-2 text-sm font-bold text-white hover:opacity-90">
        Lưu thay đổi
      </button>
    </div>
  );
}

export default function AdminSettings() {
  const [commission, setCommission] = useState("15");
  const [payoutMin, setPayoutMin] = useState("500000");
  const [hourMin, setHourMin] = useState("1");
  const [hourMax, setHourMax] = useState("12");
  const [sessionTimeout, setSessionTimeout] = useState("60");
  const [pwdLen, setPwdLen] = useState("12");
  const [twoFa, setTwoFa] = useState(true);

  return (
    <main className="mx-auto max-w-5xl flex-1 p-8">
      <header className="mb-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Cài đặt hệ thống</h2>
        <p className="mt-1 text-slate-500">Cấu hình toàn nền tảng và chính sách kinh doanh.</p>
      </header>

      <div className="space-y-8">
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 p-6">
            <span className="material-symbols-outlined text-primary">payments</span>
            <h3 className="text-lg font-bold">Phí nền tảng</h3>
          </div>
          <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Hoa hồng chủ kho (%)</label>
              <div className="relative flex items-center">
                <input
                  type="number"
                  value={commission}
                  onChange={(e) => setCommission(e.target.value)}
                  className="h-12 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 pr-12 transition-all focus:border-primary focus:ring-primary"
                />
                <span className="absolute right-4 text-slate-400">%</span>
              </div>
              <p className="text-xs text-slate-500">Phần khấu trừ trên mỗi giao dịch đặt phòng thành công.</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Ngưỡng chi trả tối thiểu (₫)</label>
              <input
                type="number"
                value={payoutMin}
                onChange={(e) => setPayoutMin(e.target.value)}
                className="h-12 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 transition-all focus:border-primary focus:ring-primary"
              />
              <p className="text-xs text-slate-500">Số dư tối thiểu để chủ kho rút tiền.</p>
            </div>
          </div>
          <SectionFooter />
        </section>

        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 p-6">
            <span className="material-symbols-outlined text-primary">event_available</span>
            <h3 className="text-lg font-bold">Quy đặt phòng</h3>
          </div>
          <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Giới hạn đặt theo giờ</label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={hourMin}
                  onChange={(e) => setHourMin(e.target.value)}
                  className="h-12 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 focus:ring-primary"
                  placeholder="Tối thiểu"
                />
                <span className="text-sm text-slate-400">đến</span>
                <input
                  type="number"
                  value={hourMax}
                  onChange={(e) => setHourMax(e.target.value)}
                  className="h-12 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 focus:ring-primary"
                  placeholder="Tối đa"
                />
              </div>
              <p className="text-xs text-slate-500">Số giờ tối thiểu / tối đa mỗi phiên.</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Chính sách hủy</label>
              <select className="h-12 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 focus:ring-primary">
                <option>Linh hoạt (hoàn đủ trước 24h)</option>
                <option selected>Trung bình (hoàn đủ trước 48h)</option>
                <option>Chặt (hoàn 50% trước 7 ngày)</option>
              </select>
              <p className="text-xs text-slate-500">Chính sách mặc định áp dụng cho tin đăng.</p>
            </div>
          </div>
          <SectionFooter />
        </section>

        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 p-6">
            <span className="material-symbols-outlined text-primary">shield</span>
            <h3 className="text-lg font-bold">Bảo mật</h3>
          </div>
          <div className="space-y-6 p-6">
            <div className="flex items-center justify-between rounded-lg bg-slate-50 p-4">
              <div>
                <h4 className="text-sm font-bold">Xác thực hai lớp (2FA)</h4>
                <p className="text-xs text-slate-500">Bắt buộc 2FA cho nhân viên và chủ kho lớn.</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={twoFa}
                onClick={() => setTwoFa((v) => !v)}
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${twoFa ? "bg-primary" : "bg-slate-300"}`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${twoFa ? "translate-x-5" : ""}`}
                />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Hết phiên (phút)</label>
                <input
                  type="number"
                  value={sessionTimeout}
                  onChange={(e) => setSessionTimeout(e.target.value)}
                  className="h-12 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 focus:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Độ dài mật khẩu tối thiểu</label>
                <input
                  type="number"
                  value={pwdLen}
                  onChange={(e) => setPwdLen(e.target.value)}
                  className="h-12 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 focus:ring-primary"
                />
              </div>
            </div>
          </div>
          <SectionFooter />
        </section>

        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 p-6">
            <span className="material-symbols-outlined text-primary">notifications_active</span>
            <h3 className="text-lg font-bold">Cấu hình thông báo</h3>
          </div>
          <div className="space-y-4 p-6">
            {[
              {
                icon: "mail",
                title: "Email xác nhận đặt phòng mới",
                sub: "Gửi cho chủ kho khi có khách đặt.",
              },
              {
                icon: "sms",
                title: "SMS hủy phòng khẩn",
                sub: "Gửi cho khách khi có thay đổi phút chót.",
              },
            ].map((row) => (
              <div
                key={row.title}
                className="group flex cursor-pointer items-center justify-between rounded-lg border border-slate-100 p-3 transition-colors hover:bg-slate-50"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-slate-400 transition-colors group-hover:text-primary">
                    {row.icon}
                  </span>
                  <div>
                    <p className="text-sm font-bold">{row.title}</p>
                    <p className="text-xs text-slate-500">{row.sub}</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-slate-400">chevron_right</span>
              </div>
            ))}
          </div>
          <div className="flex justify-end bg-slate-50 px-6 py-4">
            <button type="button" className="rounded-lg bg-primary px-6 py-2 text-sm font-bold text-white hover:opacity-90">
              Quản lý mẫu thông báo
            </button>
          </div>
        </section>

        <section className="mb-12 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 p-6">
            <span className="material-symbols-outlined text-primary">language</span>
            <h3 className="text-lg font-bold">Ngôn ngữ & tiền tệ</h3>
          </div>
          <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Ngôn ngữ mặc định</label>
              <select className="h-12 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 focus:ring-primary">
                <option selected>Tiếng Việt</option>
                <option>English</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Đơn vị tiền tệ</label>
              <select className="h-12 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 focus:ring-primary">
                <option selected>VND (₫) — Đồng Việt Nam</option>
                <option>USD ($)</option>
              </select>
            </div>
          </div>
          <SectionFooter />
        </section>
      </div>
    </main>
  );
}
