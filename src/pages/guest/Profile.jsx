import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../contexts/AuthContext";

// GIẢ LẬP: Service gọi API (Bạn cần thay thế bằng API call thực tế)
const fetchUserProfileApi = async (userId) => {
  console.log(`Calling API to fetch profile for user ${userId}`);
  // Mock data trả về
  return {
    fullName: "Nguyễn Văn Tiến",
    email: "tien.nguyen@boxhub.com",
    phone: "0901234567",
    avatar: null, // hoặc link hình ảnh
  };
};

const Profile = () => {
  const { user } = useAuthContext(); // Lấy userId từ Context để gọi API
  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    phone: "",
    avatar: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // 1. GỌI API KHI TRANG LOAD
  useEffect(() => {
    const getProfile = async () => {
      if (!user?.userId) return;
      try {
        // REPLACE: Gọi API service thực tế của bạn
        const data = await fetchUserProfileApi(user.userId);
        setProfileData(data);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin hồ sơ:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getProfile();
  }, [user]);

  // Hàm xử lý khi input thay đổi
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  // Hàm xử lý khi nhấn Lưu thay đổi
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      // REPLACE: Gọi API cập nhật profile
      console.log("Cập nhật profile với data:", profileData);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Mock API delay
      alert("Cập nhật thông tin thành công!");
    } catch (error) {
      alert("Lỗi khi cập nhật thông tin!");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="p-10 text-center text-slate-500">Đang tải thông tin hồ sơ...</div>;

  return (
    // Toàn bộ content bọc trong div bg-white, h-full
    <div className="w-full max-w-[1200px] mx-auto px-4 lg:px-0 py-12 bg-white flex flex-col items-center">
      
      {/* KHUNG HEADER HỒ SƠ */}
      <div className="w-full flex items-center gap-6 mb-12 border-b border-slate-100 pb-10 max-w-[1000px]">
        {/* Avatar bên trái */}
        <div className="h-28 w-28 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border-4 border-white shadow-xl shrink-0">
          {profileData.avatar ? (
            <img src={profileData.avatar} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <span className="material-symbols-outlined text-6xl text-slate-300">person</span>
          )}
        </div>
        {/* Tên và câu chào bên phải */}
        <div className="flex-1">
          <p className="text-xs font-bold text-[#351a5b] uppercase tracking-widest mb-1">Cài đặt tài khoản</p>
          <h1 className="text-3xl font-extrabold text-slate-900">{profileData.fullName || 'Thành viên mới'}</h1>
          <p className="text-slate-500 mt-2 max-w-xlLeading-relaxed">
            Quản lý thông tin cá nhân của bạn để đảm bảo bảo mật và cá nhân hóa trải nghiệm trên BoxHub.
          </p>
        </div>
      </div>

      {/* KHUNG NỘI DUNG FORM CHÍNH */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 w-full max-w-[1000px]">
        
        {/* CỘT TRÁI: DANH SÁCH MENU (GIỮ NGUYÊN UI NHƯNG RE-CODE GỌN) */}
        <div className="col-span-1">
          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-2 sticky top-28">
            <button className="w-full text-left px-5 py-4 rounded-xl bg-[#351a5b]/5 text-[#351a5b] font-extrabold flex items-center gap-3">
              <span className="material-symbols-outlined text-[22px]">person</span>
              Thông tin cá nhân
            </button>
            <button className="w-full text-left px-5 py-4 rounded-xl text-slate-600 hover:bg-slate-50 font-semibold flex items-center gap-3 transition">
              <span className="material-symbols-outlined text-[22px]">security</span>
              Đăng nhập & Bảo mật
            </button>
            <button className="w-full text-left px-5 py-4 rounded-xl text-slate-600 hover:bg-slate-50 font-semibold flex items-center gap-3 transition">
              <span className="material-symbols-outlined text-[22px]">history</span>
              Thanh toán & Đặt phòng
            </button>
          </div>
        </div>

        {/* CỘT PHẢI: FORM NHẬP THÔNG TIN (UI CÁCH ĐIỆU GỌN HƠN) */}
        <div className="col-span-1 md:col-span-3">
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 p-10 shadow-lg space-y-8">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
              {/* Tên legal */}
              <div className="flex flex-col gap-2.5">
                <label className="text-sm font-extrabold text-[#1e1b4b]">Tên hợp pháp</label>
                <input 
                  type="text" 
                  name="fullName"
                  value={profileData.fullName}
                  onChange={handleInputChange}
                  placeholder="Nguyễn Văn A" 
                  className="w-full bg-[#f0f4f8] border border-transparent rounded-full px-6 py-4 focus:ring-2 focus:ring-[#351a5b]/20 transition text-slate-700 font-medium"
                />
              </div>
              {/* Số điện thoại */}
              <div className="flex flex-col gap-2.5">
                <label className="text-sm font-extrabold text-[#1e1b4b]">Số điện thoại</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={profileData.phone}
                  onChange={handleInputChange}
                  placeholder="090 123 4567" 
                  className="w-full bg-[#f0f4f8] border border-transparent rounded-full px-6 py-4 focus:ring-2 focus:ring-[#351a5b]/20 transition text-slate-700 font-medium"
                />
              </div>
            </div>

            {/* Địa chỉ Email (vô hiệu hóa không cho đổi ở đây) */}
            <div className="flex flex-col gap-2.5">
              <label className="text-sm font-extrabold text-[#1e1b4b]">Địa chỉ Email</label>
              <input 
                type="email" 
                value={profileData.email}
                disabled
                placeholder="email@example.com" 
                className="w-full bg-slate-100 border border-transparent rounded-full px-6 py-4 text-slate-500 font-medium cursor-not-allowed"
              />
              <p className="text-xs text-slate-400 px-1 mt-1">Để thay đổi email, vui lòng vào phần 'Đăng nhập & Bảo mật'.</p>
            </div>

            {/* Nút lưu */}
            <div className="pt-6 border-t border-slate-100 flex justify-end">
              <button 
                type="submit" 
                disabled={isSaving}
                className="bg-[#351a5b] text-white px-10 py-4 rounded-full font-bold hover:bg-[#2a1447] transition shadow-md disabled:opacity-70 flex items-center gap-2"
              >
                {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};

export default Profile;