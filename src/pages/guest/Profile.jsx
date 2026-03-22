import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import axios from "../../config/axios";

// HÀM HỖ TRỢ: Chuyển đổi "YYYY-MM-DD" từ API sang object {day, month, year} cho UI
const parseDate = (dobString) => {
  if (!dobString) return { day: "", month: "", year: "" };
  const [y, m, d] = dobString.split("-");
  return { 
    day: parseInt(d, 10).toString(), 
    month: parseInt(m, 10).toString(), 
    year: y 
  };
};

// HÀM HỖ TRỢ: Chuyển đổi {day, month, year} từ UI thành "YYYY-MM-DD" cho API
const formatDate = (day, month, year) => {
  if (!day || !month || !year) return null;
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

const Profile = () => {
  const { user } = useAuthContext();
  
  // State quản lý dữ liệu hiển thị & form
  const [data, setData] = useState({
    username: "",
    firstName: "", 
    lastName: "", 
    email: "", 
    phone: "",
    gender: "", 
    dobDay: "", 
    dobMonth: "", 
    dobYear: "",
    avatarUrl: "", 
    isGoogleLinked: false 
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // State điều khiển chế độ Sửa
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.token) return;
      try {
        const response = await axios.get("auth/guest/me", {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });

        const resData = response.data;
        const dob = parseDate(resData.dateOfBirth);
        
        setData({
          username: resData.username || "",
          firstName: resData.firstName || "",
          lastName: resData.lastName || "",
          email: user.email || resData.email || "", // Ưu tiên email từ context
          phone: resData.phone || "",
          gender: resData.gender || "",
          dobDay: dob.day,
          dobMonth: dob.month,
          dobYear: dob.year,
          avatarUrl: resData.avatarUrl || "",
          isGoogleLinked: false 
        });
      } catch (error) {
        console.error("Lỗi khi tải profile:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      const payload = {
        username: data.username,
        phone: data.phone,
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        dateOfBirth: formatDate(data.dobDay, data.dobMonth, data.dobYear),
        avatarUrl: data.avatarUrl
      };

      // Dùng axios instance để PUT dữ liệu
      await axios.put("auth/guest/me/profile", payload, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });

      // Nếu API trả về 200 OK thì code chạy tiếp xuống đây
      setIsEditingPersonal(false);
      setIsEditingPhone(false);
      alert("Cập nhật thông tin thành công!");
      
    } catch (error) {
      console.error("Lỗi khi lưu profile:", error);
      alert("Cập nhật thất bại. Vui lòng kiểm tra lại!");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="py-20 text-center text-slate-500 font-medium">Đang tải dữ liệu...</div>;

  // Tạo mảng Ngày, Tháng, Năm cho Dropdown
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 lg:px-0 py-10 flex flex-col md:flex-row gap-8">
      
      {/* SIDEBAR BÊN TRÁI (STYLE TRAVELOKA) */}
      <div className="w-full md:w-[320px] shrink-0">
        
        {/* Khung User Info */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm mb-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center text-[#4059AD] font-bold text-2xl overflow-hidden border border-slate-100">
                {data.avatarUrl ? <img src={data.avatarUrl} alt="avt" className="w-full h-full object-cover"/> : <span className="material-symbols-outlined text-4xl text-slate-400">person</span>}
              </div>
              <button className="absolute bottom-0 right-0 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-sm text-slate-600 hover:text-[#4059AD] transition">
                <span className="material-symbols-outlined text-[14px]">photo_camera</span>
              </button>
            </div>
            <div>
              <h2 className="font-bold text-slate-800 text-lg line-clamp-1">{data.lastName} {data.firstName}</h2>
              <p className="text-xs text-slate-500">Thành viên BoxHub</p>
            </div>
          </div>
          {/* Huy hiệu thành viên */}
          <div className="w-full bg-gradient-to-r from-[#FED880] to-[#f4c24d] rounded-xl p-3 flex justify-between items-center text-[#1e1b4b] cursor-pointer hover:shadow-md transition">
            <span className="font-bold text-sm flex items-center gap-2"><span className="material-symbols-outlined text-[18px]">workspace_premium</span> Bronze Priority</span>
            <span className="material-symbols-outlined text-[20px]">chevron_right</span>
          </div>
        </div>

        {/* Menu Điều Hướng */}
        <div className="bg-white rounded-2xl border border-slate-200 py-3 shadow-sm flex flex-col">
          <button className="flex items-center gap-3 px-5 py-3 bg-blue-50/50 border-l-4 border-[#4059AD] text-[#4059AD] font-bold text-sm">
            <span className="material-symbols-outlined text-[20px]">settings</span> Tài khoản
          </button>
          <button className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50 text-slate-600 font-medium text-sm transition">
            <span className="material-symbols-outlined text-[20px]">luggage</span> Đặt chỗ của tôi
          </button>
          <button className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50 text-slate-600 font-medium text-sm transition">
            <span className="material-symbols-outlined text-[20px]">receipt_long</span> Danh sách giao dịch
          </button>
          <button className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50 text-slate-600 font-medium text-sm transition">
            <span className="material-symbols-outlined text-[20px]">notifications</span> Cài đặt thông báo
          </button>
        </div>
      </div>

      {/* KHUNG NỘI DUNG BÊN PHẢI */}
      <div className="flex-1">
        <h1 className="text-2xl font-extrabold text-slate-900 mb-6">Cài đặt</h1>
        
        {/* Tabs mini */}
        <div className="flex border-b border-slate-200 mb-6 gap-6">
          <button className="pb-3 border-b-2 border-[#4059AD] font-bold text-[#4059AD] text-sm">Thông tin tài khoản</button>
          <button className="pb-3 border-b-2 border-transparent font-medium text-slate-500 text-sm hover:text-slate-800 transition">Mật khẩu & Bảo mật</button>
        </div>

        {/* --- DỮ LIỆU CÁ NHÂN --- */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="font-bold text-slate-800">Dữ liệu cá nhân</h3>
            {!isEditingPersonal && (
              <button onClick={() => setIsEditingPersonal(true)} className="text-[#4059AD] font-bold text-sm hover:underline">Chỉnh sửa</button>
            )}
          </div>
          
          <div className="p-6">
            {!isEditingPersonal ? (
              // View Mode
              <div className="grid grid-cols-2 gap-y-6">
                <div>
                  <p className="text-xs text-slate-500 font-medium mb-1">Tên người dùng (Username)</p>
                  <p className="font-bold text-slate-800">{data.username || "Chưa cập nhật"}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium mb-1">Tên đầy đủ</p>
                  <p className="font-bold text-slate-800">{data.lastName} {data.firstName}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium mb-1">Giới tính</p>
                  <p className="font-bold text-slate-800">{data.gender || "Chưa cập nhật"}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium mb-1">Ngày sinh</p>
                  <p className="font-bold text-slate-800">
                    {data.dobDay ? `${data.dobDay} Tháng ${data.dobMonth} ${data.dobYear}` : "Chưa cập nhật"}
                  </p>
                </div>
              </div>
            ) : (
              // Edit Mode
              <div className="space-y-5 animate-fade-in-up">
                
                <div className="space-y-1.5 w-full sm:w-1/2 pr-2">
                  <label className="text-xs font-medium text-slate-600">Tên người dùng (Username)</label>
                  <input type="text" name="username" value={data.username} onChange={handleChange} placeholder="VD: tien.tran2k3" className="w-full bg-[#f0f4f8] border-none rounded-xl px-4 py-3 text-slate-800 font-medium focus:ring-2 focus:ring-[#4059AD]/30 outline-none"/>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-600">Họ</label>
                    <input type="text" name="lastName" value={data.lastName} onChange={handleChange} className="w-full bg-[#f0f4f8] border-none rounded-xl px-4 py-3 text-slate-800 font-medium focus:ring-2 focus:ring-[#4059AD]/30 outline-none"/>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-600">Đệm và Tên</label>
                    <input type="text" name="firstName" value={data.firstName} onChange={handleChange} className="w-full bg-[#f0f4f8] border-none rounded-xl px-4 py-3 text-slate-800 font-medium focus:ring-2 focus:ring-[#4059AD]/30 outline-none"/>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-600">Giới tính</label>
                    <select name="gender" value={data.gender} onChange={handleChange} className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 font-medium focus:border-[#4059AD] outline-none bg-white">
                      <option value="">Chọn</option>
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                      <option value="Khác">Khác</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-600">Ngày sinh</label>
                    <div className="grid grid-cols-3 gap-2">
                      <select name="dobDay" value={data.dobDay} onChange={handleChange} className="border border-slate-200 rounded-xl px-2 py-3 text-slate-800 font-medium text-sm outline-none bg-white">
                        <option value="">Ngày</option>
                        {days.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                      <select name="dobMonth" value={data.dobMonth} onChange={handleChange} className="border border-slate-200 rounded-xl px-2 py-3 text-slate-800 font-medium text-sm outline-none bg-white">
                        <option value="">Tháng</option>
                        {months.map(m => <option key={m} value={m}>Tháng {m}</option>)}
                      </select>
                      <select name="dobYear" value={data.dobYear} onChange={handleChange} className="border border-slate-200 rounded-xl px-2 py-3 text-slate-800 font-medium text-sm outline-none bg-white">
                        <option value="">Năm</option>
                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <button disabled={isSaving} onClick={() => setIsEditingPersonal(false)} className="px-6 py-2.5 rounded-xl font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 transition text-sm">Có lẽ để sau</button>
                  <button disabled={isSaving} onClick={handleSaveProfile} className="px-6 py-2.5 rounded-xl font-bold text-white bg-[#4059AD] hover:bg-[#32488f] shadow-sm transition text-sm flex items-center gap-2">
                    {isSaving ? "Đang lưu..." : "Lưu"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* --- EMAIL --- */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-slate-800 mb-1">Email</h3>
            <p className="text-sm font-medium text-slate-800">{data.email}</p>
          </div>
          <span className="text-xs font-bold text-[#CEE397] bg-[#CEE397]/20 px-3 py-1 rounded-md text-green-700">Đã xác minh</span>
        </div>

        {/* --- SỐ DI ĐỘNG --- */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-800">Số di động</h3>
            {!isEditingPhone && (
              <button onClick={() => setIsEditingPhone(true)} className="text-[#4059AD] font-bold text-sm hover:underline">Chỉnh sửa</button>
            )}
          </div>
          <div className="p-6">
            {!isEditingPhone ? (
              <p className="font-medium text-slate-800">{data.phone || "Chưa thêm số điện thoại"}</p>
            ) : (
              <div className="flex gap-3">
                <input type="tel" value={data.phone} onChange={handleChange} name="phone" className="flex-1 border border-slate-300 rounded-xl px-4 py-2.5 focus:border-[#4059AD] outline-none font-medium"/>
                <button disabled={isSaving} onClick={handleSaveProfile} className="bg-[#4059AD] text-white px-6 rounded-xl font-bold text-sm hover:bg-[#32488f] transition">
                  {isSaving ? "Đang lưu..." : "Lưu"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* --- LIÊN KẾT MẠNG XÃ HỘI --- */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="mb-4">
            <h3 className="font-bold text-slate-800 mb-1">Tài khoản đã Liên kết</h3>
            <p className="text-xs text-slate-500">Liên kết tài khoản mạng xã hội của bạn để đăng nhập dễ dàng</p>
          </div>
          
          <div className="flex items-center justify-between py-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6"/>
              <span className="font-bold text-sm text-slate-700">Google</span>
              {data.isGoogleLinked && <span className="material-symbols-outlined text-[#CEE397] text-[18px] ml-1 bg-green-700 rounded-full">check_circle</span>}
            </div>
            {data.isGoogleLinked ? (
              <span className="text-[#4059AD] text-sm font-bold opacity-50">Đã liên kết</span>
            ) : (
              <button className="text-[#4059AD] text-sm font-bold hover:underline">Liên kết</button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;