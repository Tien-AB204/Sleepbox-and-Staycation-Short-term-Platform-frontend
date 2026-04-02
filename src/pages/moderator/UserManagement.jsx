import React, { useState, useEffect } from "react";
import axios from "../../config/axios"; // Gọi axios instance đã config

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all"); // 'all', 'Guest', 'Host'

  // Loading States
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Modal Khóa/Mở khóa
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionReason, setActionReason] = useState("");

  // Modal Xem chi tiết User
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [userDetail, setUserDetail] = useState(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [detailTab, setDetailTab] = useState("account");

  // =========================================================================
  // 1. GỌI API LẤY DANH SÁCH USER (Có Lọc & Phân trang)
  // =========================================================================
  const fetchUsers = async () => {
    setIsLoadingList(true);
    try {
      const response = await axios.get("/moderator/users", {
        params: {
          Keyword: searchTerm || undefined,
          Role: roleFilter !== "all" ? roleFilter : undefined,
          PageNumber: 1,
          PageSize: 50 // Tạm lấy 50 user đầu tiên
        }
      });
      // Tùy theo BE trả về data.items hay data trực tiếp
      const userList = response.data?.items || response.data?.data?.items || [];
      setUsers(userList);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách user:", error);
    } finally {
      setIsLoadingList(false);
    }
  };

  // Gọi API lần đầu & khi đổi Role Filter
  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roleFilter]);

  // Xử lý debounce khi gõ tìm kiếm (Tránh spam API)
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchUsers();
    }, 500); // Đợi user gõ xong 500ms mới gọi API
    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);


  // =========================================================================
  // 2. GỌI API XEM CHI TIẾT 1 USER
  // =========================================================================
  const openDetailModal = async (userId) => {
    setIsDetailModalOpen(true);
    setIsLoadingDetail(true);
    setUserDetail(null);
    setDetailTab("account");
    try {
      const response = await axios.get(`/moderator/users/${userId}`);
      setUserDetail(response.data?.data || response.data);
    } catch (error) {
      console.error("Lỗi khi xem chi tiết user:", error);
      alert("Không thể tải thông tin chi tiết người dùng này.");
      setIsDetailModalOpen(false);
    } finally {
      setIsLoadingDetail(false);
    }
  };


  // =========================================================================
  // 3. GỌI API ĐÌNH CHỈ USER (SUSPEND)
  // =========================================================================
  const openConfirmModal = (user) => {
    setSelectedUser(user);
    setActionReason("");
    setIsModalOpen(true);
  };

  const handleToggleStatus = async () => {
    if (!selectedUser) return;

    // Trạng thái ở DB trả về thường là "Active" hoặc "Suspended"
    const isActive = selectedUser.status === 'Active' || selectedUser.status === 'active';

    if (isActive) {
      // ===== LOGIC KHÓA TÀI KHOẢN (Đã có API) =====
      setIsSubmitting(true);
      try {
        await axios.put(`/moderator/users/${selectedUser.userId}/suspend`, {
          reason: actionReason
        });
        alert(`Đã ĐÌNH CHỈ tài khoản ${selectedUser.username} thành công!`);
        setIsModalOpen(false);
        fetchUsers(); // Load lại list
      } catch (error) {
        console.error("Lỗi khi đình chỉ user:", error);
        alert("Đình chỉ thất bại. Vui lòng thử lại!");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // ===== LOGIC MỞ KHÓA TÀI KHOẢN (Chưa có API theo spec của bạn) =====
      alert("Tính năng MỞ KHÓA hiện chưa được cung cấp từ Backend. Vui lòng báo Backend bổ sung API Unsuspend/Activate nhé!");
      setIsModalOpen(false);
    }
  };

  return (
    <div className="h-full flex flex-col relative">
      
      {/* HEADER & TOOLBAR */}
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Quản Lý Người Dùng</h1>
          <p className="text-sm text-slate-500 mt-1">Danh sách Guest và Host đang hoạt động trên hệ thống.</p>
        </div>

        {/* Thanh Search & Filter */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
            <input 
              type="text" 
              placeholder="Tìm tên, email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm outline-none focus:border-[#4059AD] focus:ring-1 focus:ring-[#4059AD]/20 transition-all shadow-sm"
            />
          </div>
          <select 
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold text-slate-700 outline-none focus:border-[#4059AD] shadow-sm cursor-pointer"
          >
            <option value="all">Tất cả vai trò</option>
            <option value="Guest">Chỉ Guest (Khách)</option>
            <option value="Host">Chỉ Host (Chủ cơ sở)</option>
          </select>
        </div>
      </div>

      {/* BẢNG DỮ LIỆU */}
      <div className="flex-1 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col min-h-0 relative">
        {isLoadingList && (
          <div className="absolute inset-0 z-20 bg-white/50 backdrop-blur-[1px] flex items-center justify-center">
             <span className="material-symbols-outlined animate-spin text-4xl text-[#4059AD]">autorenew</span>
          </div>
        )}

        <div className="overflow-x-auto flex-1 custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 sticky top-0 z-10 shadow-sm border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Người dùng</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Thông tin liên hệ</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Vai trò</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Trạng thái</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Ngày tham gia</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.length > 0 ? (
                users.map((user) => {
                  const isActive = user.status === 'Active' || user.status === 'active';
                  const isHost = user.role === 'Host' || user.role === 'host';
                  
                  return (
                    <tr key={user.userId} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-200 shrink-0 overflow-hidden border border-slate-200 flex items-center justify-center text-[#4059AD] font-bold">
                            {user.username ? user.username.charAt(0).toUpperCase() : "U"}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900">{user.username || "Chưa cập nhật"}</p>
                            <p className="text-[10px] font-bold text-slate-400 mt-0.5 truncate w-32" title={user.userId}>{user.userId}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-700">{user.email}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{user.phone || "Chưa cập nhật SĐT"}</p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-md text-[11px] font-black uppercase tracking-wider border ${
                          isHost ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-slate-100 text-slate-600 border-slate-200'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                          isActive ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
                          {isActive ? 'Hoạt động' : 'Đình chỉ'}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString('vi-VN') : '—'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-1">
                          {/* NÚT XEM CHI TIẾT */}
                          <button 
                            onClick={() => openDetailModal(user.userId)}
                            className="p-2 text-slate-400 hover:text-[#4059AD] hover:bg-blue-50 rounded-lg transition-colors"
                            title="Xem chi tiết"
                          >
                            <span className="material-symbols-outlined text-[20px]">visibility</span>
                          </button>
                          
                          {/* NÚT KHÓA/MỞ KHÓA */}
                          {isActive ? (
                            <button 
                              onClick={() => openConfirmModal(user)}
                              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Khóa tài khoản"
                            >
                              <span className="material-symbols-outlined text-[20px]">lock</span>
                            </button>
                          ) : (
                            <button 
                              onClick={() => openConfirmModal(user)}
                              className="p-2 text-red-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Mở khóa tài khoản"
                            >
                              <span className="material-symbols-outlined text-[20px]">lock_open_right</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                    {!isLoadingList && "Không tìm thấy người dùng nào phù hợp với bộ lọc."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= MODAL KHÓA / MỞ KHÓA ================= */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl animate-fade-in-up">
            
            <div className={`flex items-center gap-3 mb-4 ${(selectedUser.status === 'Active' || selectedUser.status === 'active') ? 'text-red-600' : 'text-green-600'}`}>
              <span className="material-symbols-outlined text-3xl">
                {(selectedUser.status === 'Active' || selectedUser.status === 'active') ? 'gpp_bad' : 'gpp_good'}
              </span>
              <h2 className="text-xl font-black text-slate-900">
                {(selectedUser.status === 'Active' || selectedUser.status === 'active') ? 'Đình chỉ tài khoản' : 'Mở khóa tài khoản'}
              </h2>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-xl mb-4 border border-slate-100">
              <p className="text-sm text-slate-600">Bạn đang thao tác với người dùng:</p>
              <p className="text-base font-black text-slate-900 mt-1">{selectedUser.username} <span className="text-sm font-bold text-[#4059AD]">({selectedUser.role})</span></p>
            </div>

            {(selectedUser.status === 'Active' || selectedUser.status === 'active') ? (
              <>
                <p className="text-sm text-slate-600 mb-2">Vui lòng ghi lý do đình chỉ:</p>
                <textarea 
                  value={actionReason}
                  onChange={(e) => setActionReason(e.target.value)}
                  placeholder="Ví dụ: Gian lận, Spam hệ thống..."
                  className="w-full bg-white border border-slate-200 rounded-xl p-3 min-h-[100px] outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all text-sm resize-none mb-6"
                ></textarea>
              </>
            ) : (
              <p className="text-sm text-slate-600 mb-6">
                Tài khoản này sẽ được khôi phục trạng thái hoạt động bình thường. (Cần Backend API hỗ trợ)
              </p>
            )}

            <div className="flex justify-end gap-3">
              <button 
                disabled={isSubmitting}
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-colors text-sm disabled:opacity-50"
              >
                Hủy bỏ
              </button>
              <button 
                disabled={isSubmitting}
                onClick={handleToggleStatus}
                className={`px-6 py-2.5 rounded-xl text-white font-bold text-sm shadow-lg transition-all flex items-center gap-2 disabled:opacity-50 ${
                  (selectedUser.status === 'Active' || selectedUser.status === 'active')
                    ? 'bg-red-600 hover:bg-red-700 shadow-red-200' 
                    : 'bg-green-600 hover:bg-green-700 shadow-green-200'
                }`}
              >
                {isSubmitting ? (
                   <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                ) : (
                  <span className="material-symbols-outlined text-[18px]">
                    {(selectedUser.status === 'Active' || selectedUser.status === 'active') ? 'lock' : 'lock_open_right'}
                  </span>
                )}
                {(selectedUser.status === 'Active' || selectedUser.status === 'active') ? 'Xác nhận Đình chỉ' : 'Xác nhận Mở khóa'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL XEM CHI TIẾT USER ================= */}
      {isDetailModalOpen && (
        <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-3xl p-6 md:p-8 shadow-2xl animate-fade-in-up relative overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Nút tắt */}
            <button onClick={() => setIsDetailModalOpen(false)} className="absolute top-5 right-5 p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors z-10">
              <span className="material-symbols-outlined">close</span>
            </button>

            {isLoadingDetail ? (
              <div className="py-20 flex flex-col items-center justify-center text-slate-400">
                <span className="material-symbols-outlined animate-spin text-4xl text-[#4059AD] mb-3">autorenew</span>
                <p className="text-sm font-bold">Đang tải thông tin chi tiết...</p>
              </div>
            ) : userDetail ? (
              <>
                {/* ================= HEADER CHUNG ================= */}
                <div className="flex items-center gap-5 shrink-0 mb-6 border-b border-slate-100 pb-6">
                  {userDetail.guestProfile?.avatarUrl ? (
                    <img 
                      src={userDetail.guestProfile.avatarUrl} 
                      alt="Avatar" 
                      className="w-20 h-20 rounded-full object-cover shadow-md border-2 border-slate-100 shrink-0"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-[#4059AD] text-white flex items-center justify-center text-3xl font-black shadow-md shrink-0">
                      {userDetail.username ? userDetail.username.charAt(0).toUpperCase() : "U"}
                    </div>
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-2xl font-black text-slate-900 leading-tight truncate">{userDetail.username || "Chưa cập nhật tên"}</h3>
                    
                    <div className="flex items-center gap-1.5 text-slate-600 mt-1">
                      <span className="material-symbols-outlined text-[16px]">mail</span>
                      <p className="text-sm font-medium truncate">{userDetail.email}</p>
                      {userDetail.isEmailVerified ? (
                        <span className="material-symbols-outlined text-green-500 text-[18px]" title={`Đã xác minh lúc ${new Date(userDetail.emailVerifiedAt).toLocaleString('vi-VN')}`}>verified</span>
                      ) : (
                        <span className="material-symbols-outlined text-orange-400 text-[18px]" title="Chưa xác minh email">warning</span>
                      )}
                    </div>

                    <div className="flex gap-2 mt-3">
                      <span className="bg-slate-100 text-slate-600 text-[10px] px-2.5 py-1 rounded-md uppercase font-black tracking-widest border border-slate-200">
                        {userDetail.role}
                      </span>
                      <span className={`text-[10px] px-2.5 py-1 rounded-md uppercase font-black tracking-widest border ${
                        userDetail.status === 'Active' || userDetail.status === 'active' 
                          ? 'bg-green-50 text-green-700 border-green-200' 
                          : 'bg-red-50 text-red-700 border-red-200'
                      }`}>
                        {userDetail.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 pb-4">
                  
                  {/* ================= GIAO DIỆN CHO GUEST (KHÔNG TAB) ================= */}
                  {(userDetail.role === 'Guest' || userDetail.role === 'guest') && (
                    <div className="space-y-6 animate-fade-in">
                      <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#4059AD]">person</span>
                        Hồ sơ Khách hàng
                      </h4>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 text-sm bg-slate-50/50 p-6 border border-slate-100 rounded-2xl">
                        <div className="sm:col-span-2">
                          <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mb-1">User ID</p>
                          <p className="font-semibold text-slate-800 font-mono text-xs bg-white p-2 border border-slate-200 rounded-lg inline-block break-all">{userDetail.userId}</p>
                        </div>
                        
                        <div>
                          <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mb-1">Họ và tên</p>
                          <p className="font-semibold text-slate-800">
                            {userDetail.guestProfile ? `${userDetail.guestProfile.firstName || ''} ${userDetail.guestProfile.lastName || ''}`.trim() || "—" : "—"}
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mb-1">Số điện thoại</p>
                          <p className="font-semibold text-slate-800">{userDetail.phone || "—"}</p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mb-1">Giới tính</p>
                          <p className="font-semibold text-slate-800">{userDetail.guestProfile?.gender || "—"}</p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mb-1">Ngày sinh (DOB)</p>
                          <p className="font-semibold text-slate-800">{userDetail.guestProfile?.dateOfBirth ? new Date(userDetail.guestProfile.dateOfBirth).toLocaleDateString('vi-VN') : "—"}</p>
                        </div>

                        <div className="sm:col-span-2 mt-2 pt-4 border-t border-slate-200/60 grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                          <div>
                            <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mb-1 flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">calendar_add_on</span> Ngày tạo tài khoản</p>
                            <p className="font-semibold text-slate-800">{userDetail.createdAt ? new Date(userDetail.createdAt).toLocaleString('vi-VN') : "—"}</p>
                          </div>
                          <div>
                            <p className="text-[#4059AD] text-[10px] uppercase font-bold tracking-widest mb-1 flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">login</span> Đăng nhập lần cuối</p>
                            <p className="font-bold text-[#4059AD]">{userDetail.lastLoginAt ? new Date(userDetail.lastLoginAt).toLocaleString('vi-VN') : "—"}</p>
                          </div>
                        </div>

                        {userDetail.deletedAt && (
                          <div className="sm:col-span-2 bg-red-50 p-4 rounded-xl border border-red-100 mt-2">
                            <p className="text-red-500 text-[10px] uppercase font-bold tracking-widest mb-1 flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">delete_forever</span> Tài khoản đã bị xóa/vô hiệu hóa lúc</p>
                            <p className="font-black text-red-600">{new Date(userDetail.deletedAt).toLocaleString('vi-VN')}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* ================= GIAO DIỆN CHO HOST (CÓ TAB VÌ NHIỀU GIẤY TỜ) ================= */}
                  {(userDetail.role === 'Host' || userDetail.role === 'host') && (
                    <>
                      <div className="flex gap-6 border-b border-slate-200 mb-6 shrink-0">
                        <button 
                          onClick={() => setDetailTab("account")}
                          className={`pb-3 text-sm font-bold transition-all relative ${detailTab === "account" ? "text-[#4059AD]" : "text-slate-500 hover:text-slate-800"}`}
                        >
                          Hệ thống & Liên hệ
                          {detailTab === "account" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#4059AD] rounded-t-full"></div>}
                        </button>
                        <button 
                          onClick={() => setDetailTab("profile")}
                          className={`pb-3 text-sm font-bold transition-all relative ${detailTab === "profile" ? "text-[#4059AD]" : "text-slate-500 hover:text-slate-800"}`}
                        >
                          Hồ sơ Pháp lý Host
                          {detailTab === "profile" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#4059AD] rounded-t-full"></div>}
                        </button>
                      </div>

                      {/* TAB 1: HOST - ACCOUNT (Đồng bộ giao diện giống Guest) */}
                      {detailTab === "account" && (
                        <div className="space-y-6 animate-fade-in">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 text-sm bg-slate-50/50 p-6 border border-slate-100 rounded-2xl">
                            <div className="sm:col-span-2">
                              <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mb-1">User ID</p>
                              <p className="font-semibold text-slate-800 font-mono text-xs bg-white p-2 border border-slate-200 rounded-lg inline-block break-all">{userDetail.userId}</p>
                            </div>
                            
                            <div>
                              <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mb-1">Họ và tên</p>
                              <p className="font-semibold text-slate-800">
                                {userDetail.guestProfile ? `${userDetail.guestProfile.firstName || ''} ${userDetail.guestProfile.lastName || ''}`.trim() || "—" : "—"}
                              </p>
                            </div>
                            <div>
                              <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mb-1">Số điện thoại</p>
                              <p className="font-semibold text-slate-800">{userDetail.phone || "—"}</p>
                            </div>
                            <div>
                              <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mb-1">Giới tính</p>
                              <p className="font-semibold text-slate-800">{userDetail.guestProfile?.gender || "—"}</p>
                            </div>
                            <div>
                              <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mb-1">Ngày sinh (DOB)</p>
                              <p className="font-semibold text-slate-800">{userDetail.guestProfile?.dateOfBirth ? new Date(userDetail.guestProfile.dateOfBirth).toLocaleDateString('vi-VN') : "—"}</p>
                            </div>

                            <div className="sm:col-span-2 mt-2 pt-4 border-t border-slate-200/60 grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                              <div>
                                <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mb-1 flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">calendar_add_on</span> Ngày tạo tài khoản</p>
                                <p className="font-semibold text-slate-800">{userDetail.createdAt ? new Date(userDetail.createdAt).toLocaleString('vi-VN') : "—"}</p>
                              </div>
                              <div>
                                <p className="text-[#4059AD] text-[10px] uppercase font-bold tracking-widest mb-1 flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">login</span> Đăng nhập lần cuối</p>
                                <p className="font-bold text-[#4059AD]">{userDetail.lastLoginAt ? new Date(userDetail.lastLoginAt).toLocaleString('vi-VN') : "—"}</p>
                              </div>
                            </div>

                            {userDetail.deletedAt && (
                              <div className="sm:col-span-2 bg-red-50 p-4 rounded-xl border border-red-100 mt-2">
                                <p className="text-red-500 text-[10px] uppercase font-bold tracking-widest mb-1 flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">delete_forever</span> Tài khoản đã bị xóa/vô hiệu hóa lúc</p>
                                <p className="font-black text-red-600">{new Date(userDetail.deletedAt).toLocaleString('vi-VN')}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* TAB 2: HOST - PROFILE PHÁP LÝ */}
                      {detailTab === "profile" && (
                        <div className="animate-fade-in space-y-6">
                          {userDetail.hostProfile ? (
                            <>
                              {/* Trạng thái xác thực */}
                              <div className={`p-4 rounded-xl border flex items-start gap-3 ${userDetail.hostProfile.verifiedStatus === 'Approved' ? 'bg-green-50 border-green-200' : userDetail.hostProfile.verifiedStatus === 'Rejected' ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-200'}`}>
                                <span className={`material-symbols-outlined mt-0.5 ${userDetail.hostProfile.verifiedStatus === 'Approved' ? 'text-green-600' : userDetail.hostProfile.verifiedStatus === 'Rejected' ? 'text-red-600' : 'text-amber-600'}`}>
                                  {userDetail.hostProfile.verifiedStatus === 'Approved' ? 'verified_user' : userDetail.hostProfile.verifiedStatus === 'Rejected' ? 'gpp_bad' : 'pending_actions'}
                                </span>
                                <div className="flex-1">
                                  <p className={`text-sm font-bold ${userDetail.hostProfile.verifiedStatus === 'Approved' ? 'text-green-800' : userDetail.hostProfile.verifiedStatus === 'Rejected' ? 'text-red-800' : 'text-amber-800'}`}>
                                    Trạng thái KYC: {userDetail.hostProfile.verifiedStatus || "Chờ xử lý"}
                                  </p>
                                  <div className="grid grid-cols-2 gap-4 mt-2 text-xs text-slate-600">
                                    <p>Gửi duyệt lúc: {userDetail.hostProfile.submittedAt ? new Date(userDetail.hostProfile.submittedAt).toLocaleString('vi-VN') : "—"}</p>
                                    <p>Duyệt lúc: {userDetail.hostProfile.verifiedAt ? new Date(userDetail.hostProfile.verifiedAt).toLocaleString('vi-VN') : "—"}</p>
                                    <p className="col-span-2">Người duyệt (Mod): <span className="font-bold">{userDetail.hostProfile.verifiedBy || "—"}</span></p>
                                  </div>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 text-sm bg-white p-2">
                                <div className="sm:col-span-2">
                                  <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mb-1">Tên Doanh nghiệp / Tổ chức</p>
                                  <p className="font-black text-[#4059AD] text-base">{userDetail.hostProfile.businessName || "—"}</p>
                                </div>
                                <div><p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mb-1">Mã số thuế</p><p className="font-semibold text-slate-800">{userDetail.hostProfile.taxCode || "—"}</p></div>
                                <div><p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mb-1">Người đại diện pháp luật</p><p className="font-semibold text-slate-800">{userDetail.hostProfile.representativeName || "—"}</p></div>
                                <div className="sm:col-span-2"><p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mb-1">Số CMND / CCCD đại diện</p><p className="font-black text-slate-800 tracking-wider bg-slate-100 px-3 py-1.5 rounded-lg inline-block">{userDetail.hostProfile.representativeIdNumber || "—"}</p></div>
                                <div className="sm:col-span-2"><p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mb-1">Địa chỉ đăng ký kinh doanh</p><p className="font-semibold text-slate-800">{userDetail.hostProfile.addressDetail ? `${userDetail.hostProfile.addressDetail}, Phường ${userDetail.hostProfile.addressWard}, Quận ${userDetail.hostProfile.addressDistrict}` : "—"}</p></div>
                              </div>

                              {/* Ảnh CMND */}
                              <div className="pt-4 border-t border-slate-100">
                                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Giấy tờ tùy thân</h4>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="flex flex-col gap-2">
                                    <p className="text-xs font-bold text-slate-500 text-center">Mặt trước</p>
                                    <div className="aspect-[1.6/1] rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
                                      {userDetail.hostProfile.representativeFrontUrl ? (
                                        <img src={userDetail.hostProfile.representativeFrontUrl} alt="Mặt trước" className="w-full h-full object-contain" />
                                      ) : <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">Chưa cập nhật</div>}
                                    </div>
                                  </div>
                                  <div className="flex flex-col gap-2">
                                    <p className="text-xs font-bold text-slate-500 text-center">Mặt sau</p>
                                    <div className="aspect-[1.6/1] rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
                                      {userDetail.hostProfile.representativeBackUrl ? (
                                        <img src={userDetail.hostProfile.representativeBackUrl} alt="Mặt sau" className="w-full h-full object-contain" />
                                      ) : <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">Chưa cập nhật</div>}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : (
                            <div className="text-center py-10"><p className="text-sm text-slate-500 italic">Host này chưa khai báo hồ sơ pháp lý.</p></div>
                          )}
                        </div>
                      )}
                    </>
                  )}

                </div>

                {/* 4. ACTION BAR */}
                <div className="mt-4 pt-4 border-t border-slate-100 flex justify-end shrink-0">
                  <button 
                    onClick={() => setIsDetailModalOpen(false)}
                    className="px-8 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors text-sm"
                  >
                    Đóng cửa sổ
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </div>
      )}

    </div>
  );
}