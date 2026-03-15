import React from "react";

const Profile = () => {
  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 py-12">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-8">Hồ sơ cá nhân</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Cột trái: Menu điều hướng */}
        <div className="col-span-1">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <ul className="space-y-2">
              <li>
                <button className="w-full text-left px-4 py-3 rounded-xl bg-[#351a5b]/10 text-[#351a5b] font-bold flex items-center gap-3">
                  <span className="material-symbols-outlined">person</span>
                  Thông tin cá nhân
                </button>
              </li>
              <li>
                <button className="w-full text-left px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 font-medium flex items-center gap-3 transition-colors">
                  <span className="material-symbols-outlined">security</span>
                  Đăng nhập & Bảo mật
                </button>
              </li>
              <li>
                <button className="w-full text-left px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 font-medium flex items-center gap-3 transition-colors">
                  <span className="material-symbols-outlined">payments</span>
                  Thanh toán & Thanh toán
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Cột phải: Khung nội dung */}
        <div className="col-span-1 md:col-span-2">
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <div className="flex items-center gap-6 mb-8 border-b border-slate-100 pb-8">
              <div className="h-24 w-24 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                <span className="material-symbols-outlined text-5xl text-slate-400">
                  person
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Khách Hàng Mới</h2>
                <p className="text-slate-500 mt-1">Cập nhật thông tin của bạn để quản lý đặt phòng dễ dàng hơn.</p>
              </div>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700">Tên hợp pháp</label>
                  <input 
                    type="text" 
                    placeholder="Nguyễn Văn A" 
                    className="p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#351a5b] focus:ring-1 focus:ring-[#351a5b] transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700">Số điện thoại</label>
                  <input 
                    type="tel" 
                    placeholder="+84 123 456 789" 
                    className="p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#351a5b] focus:ring-1 focus:ring-[#351a5b] transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700">Địa chỉ Email</label>
                <input 
                  type="email" 
                  placeholder="email@example.com" 
                  className="p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#351a5b] focus:ring-1 focus:ring-[#351a5b] transition-all"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button 
                  type="button" 
                  className="bg-[#351a5b] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#2a1447] transition-colors shadow-md"
                >
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;