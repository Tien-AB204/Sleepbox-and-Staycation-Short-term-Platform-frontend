import React, { useState, useEffect } from "react";
// Đảm bảo bạn đã config axios instance trong thư mục config, nếu chưa có thì dùng: import axios from "axios";
import axios from "../../config/axios"; 

export default function HostApproval() {
  const [requests, setRequests] = useState([]);
  const [selectedReq, setSelectedReq] = useState(null);
  
  // Trạng thái Loading
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // State Modal Từ Chối
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  // =========================================================================
  // 1. FETCH DANH SÁCH HỒ SƠ CHỜ DUYỆT
  // =========================================================================
  const fetchDrafts = async () => {
    setIsLoadingList(true);
    try {
      // Truyền params dựa theo Swagger: page, pageSize, status
      const response = await axios.get("moderator/host-drafts", {
        params: {
          page: 1,
          pageSize: 10,
          reviewStatus: "pending" // Chỉ lấy các hồ sơ đang chờ duyệt
        }
      });
      
      // Xử lý an toàn dữ liệu trả về (tùy thuộc backend bọc trong data hay items)
      const draftList = response.data?.data || response.data?.items || response.data || [];
      setRequests(draftList);
      
      // Nếu danh sách không rỗng và chưa chọn ai, tự động chọn người đầu tiên
      if (draftList.length > 0 && !selectedReq) {
        handleSelectDraft(draftList[0].draftId || draftList[0].id);
      } else if (draftList.length === 0) {
        setSelectedReq(null);
      }
    } catch (error) {
      console.error("Lỗi khi tải danh sách host drafts:", error);
    } finally {
      setIsLoadingList(false);
    }
  };

  useEffect(() => {
    fetchDrafts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // =========================================================================
  // 2. FETCH CHI TIẾT 1 HỒ SƠ
  // =========================================================================
  const handleSelectDraft = async (draftId) => {
    if (!draftId) return;
    setIsLoadingDetail(true);
    try {
      const response = await axios.get(`moderator/host-draft/${draftId}`);
      const detailData = response.data?.data || response.data;
      setSelectedReq(detailData);
    } catch (error) {
      console.error("Lỗi khi tải chi tiết hồ sơ:", error);
      alert("Không thể tải chi tiết hồ sơ này!");
    } finally {
      setIsLoadingDetail(false);
    }
  };

  // =========================================================================
  // 3. API POST XỬ LÝ PHÊ DUYỆT / TỪ CHỐI
  // =========================================================================
  const submitReview = async (actionStr, reason = "") => {
    if (!selectedReq) return;
    
    setIsSubmitting(true);
    try {
      const draftId = selectedReq.draftId || selectedReq.id;
      
      // Payload dựa theo Swagger
      const payload = {
        action: actionStr, // "Approved" hoặc "Rejected" (Tùy định nghĩa enum của BE)
        rejectReason: reason,
        documentReviews: [] // Mảng trống nếu duyệt cả cục, hoặc tùy BE bắt buộc
      };

      await axios.post(`moderator/host-draft/${draftId}/review`, payload);
      
      alert(`Đã ${actionStr === "Approved" ? "PHÊ DUYỆT" : "YÊU CẦU CẬP NHẬT LẠI"} thành công!`);
      
      // Đóng modal, reset form, load lại danh sách
      setIsRejectModalOpen(false);
      setRejectReason("");
      setSelectedReq(null);
      fetchDrafts(); 
      
    } catch (error) {
      console.error("Lỗi khi gửi phán quyết:", error);
      alert("Có lỗi xảy ra khi xử lý hệ thống.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleApprove = () => {
    if(window.confirm("Bạn xác nhận các giấy tờ này hoàn toàn hợp lệ?")) {
      submitReview("Approved"); 
    }
  };

  const handleReject = () => {
    if (!rejectReason.trim()) {
      alert("Vui lòng nhập lý do từ chối để Host cập nhật lại giấy tờ!");
      return;
    }
    submitReview("Rejected", rejectReason);
  };

  // =========================================================================
  // HELPER LẤY URL ẢNH TỪ MẢNG DOCUMENTS (Nếu BE trả về dạng mảng)
  // =========================================================================
  const getDocumentUrl = (docs, keyword) => {
    if (!docs) return "https://placehold.co/600x400/f8fafc/94a3b8?text=Chưa+cập+nhật";
    // Nếu BE trả thẳng object { idFront: '...', idBack: '...' }
    if (!Array.isArray(docs)) return docs[keyword] || "https://placehold.co/600x400/f8fafc/94a3b8?text=Chưa+cập+nhật";
    
    // Nếu BE trả về array [{ documentType: 'ID_FRONT', url: '...' }]
    const doc = docs.find(d => d.documentType?.toUpperCase().includes(keyword.toUpperCase()));
    return doc?.url || "https://placehold.co/600x400/f8fafc/94a3b8?text=Chưa+cập+nhật";
  };

  return (
    <div className="h-full flex flex-col">
      {/* HEADER TỔNG */}
      <div className="mb-6 flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Duyệt Hồ Sơ Host (KYC)</h1>
          <p className="text-sm text-slate-500 mt-1">Kiểm tra danh tính và giấy tờ tùy thân của đối tác mới.</p>
        </div>
        <div className="flex bg-white border border-slate-200 rounded-lg p-1 shadow-sm">
          <button className="px-4 py-1.5 text-sm font-bold bg-slate-100 text-slate-800 rounded-md flex items-center gap-2">
            Chờ duyệt 
            <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{requests.length}</span>
          </button>
        </div>
      </div>

      {/* KHU VỰC MASTER - DETAIL (CHIA 2 CỘT) */}
      <div className="flex-1 flex gap-6 min-h-0 overflow-hidden">
        
        {/* CỘT TRÁI: DANH SÁCH YÊU CẦU */}
        <div className="w-1/3 bg-white border border-slate-200 rounded-2xl flex flex-col overflow-hidden shadow-sm shrink-0">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
              <input 
                type="text" 
                placeholder="Tìm tên, CCCD..." 
                className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-[#4059AD] focus:ring-1 focus:ring-[#4059AD]/20 transition-all"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-2 relative">
            {isLoadingList ? (
              <div className="absolute inset-0 flex items-center justify-center bg-white/80">
                <span className="material-symbols-outlined animate-spin text-3xl text-[#4059AD]">progress_activity</span>
              </div>
            ) : requests.length > 0 ? (
              requests.map(req => {
                const reqId = req.draftId || req.id;
                const isSelected = selectedReq && (selectedReq.draftId === reqId || selectedReq.id === reqId);
                
                return (
                  <div 
                    key={reqId}
                    onClick={() => handleSelectDraft(reqId)}
                    className={`p-4 rounded-xl cursor-pointer border transition-all ${
                      isSelected 
                        ? "bg-[#4059AD]/5 border-[#4059AD] shadow-sm" 
                        : "bg-white border-transparent hover:border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider bg-amber-100 text-amber-700">
                        Chờ KYC
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        {req.createdAt ? new Date(req.createdAt).toLocaleDateString('vi-VN') : 'Mới đây'}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 truncate">{req.fullName || req.name || "Chưa cập nhật tên"}</h3>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">mail</span> {req.email || "Không có email"}
                    </p>
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center text-slate-400">
                <span className="material-symbols-outlined text-4xl mb-2 opacity-30">check_circle</span>
                <p className="text-sm font-bold">Không còn hồ sơ nào đang chờ duyệt!</p>
              </div>
            )}
          </div>
        </div>

        {/* CỘT PHẢI: CHI TIẾT GIẤY TỜ */}
        <div className="w-2/3 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col overflow-hidden relative">
          
          {isLoadingDetail ? (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
               <span className="material-symbols-outlined animate-spin text-4xl text-[#4059AD] mb-3">autorenew</span>
               <p className="font-bold text-sm">Đang tải dữ liệu hồ sơ...</p>
            </div>
          ) : selectedReq ? (
            <>
              {/* Header Chi tiết */}
              <div className="p-6 border-b border-slate-100 shrink-0 bg-slate-50/50 flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-[#4059AD] text-white flex items-center justify-center font-bold text-2xl shadow-md">
                    {(selectedReq.fullName || selectedReq.name || "A").charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-slate-900">{selectedReq.fullName || selectedReq.name || "Chưa cập nhật tên"}</h2>
                    <p className="text-sm text-slate-500 mt-0.5">{selectedReq.email} {selectedReq.phone ? `• ${selectedReq.phone}` : ''}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mã định danh</p>
                  <p className="text-sm font-black text-[#4059AD]">{selectedReq.draftId || selectedReq.id}</p>
                </div>
              </div>

              {/* Nội dung đối chiếu */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-8 pb-28">
                <div className="grid grid-cols-2 gap-8">
                  
                  {/* Thông tin khai báo */}
                  <div className="col-span-2 md:col-span-1 space-y-5">
                    <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2">Thông tin khai báo</h3>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Họ và tên</p>
                      <p className="font-bold text-slate-800">{selectedReq.fullName || selectedReq.name || "—"}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Số CMND/CCCD</p>
                      <p className="font-black text-[#4059AD] text-lg tracking-widest">{selectedReq.idCardNumber || selectedReq.identityCard || "—"}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Địa chỉ thường trú</p>
                      <p className="font-medium text-slate-800">{selectedReq.address || "—"}</p>
                    </div>
                  </div>

                  {/* Ảnh Selfie đối chiếu */}
                  <div className="col-span-2 md:col-span-1 flex flex-col items-center justify-center bg-slate-50 border border-slate-200 rounded-2xl p-4">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Ảnh chân dung xác thực</p>
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-lg relative cursor-zoom-in">
                      <img 
                        src={getDocumentUrl(selectedReq.documents, 'SELFIE')} 
                        alt="Selfie" 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  </div>

                  {/* Giấy tờ mặt trước & sau */}
                  <div className="col-span-2 mt-4">
                    <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2 mb-4">Hình ảnh CMND/CCCD</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <p className="text-xs font-bold text-slate-500 text-center">Mặt trước</p>
                        <div className="aspect-[1.6/1] rounded-xl overflow-hidden border border-slate-200 shadow-sm cursor-zoom-in group relative bg-slate-100">
                          <img 
                            src={getDocumentUrl(selectedReq.documents, 'FRONT')} 
                            alt="ID Front" 
                            className="w-full h-full object-contain group-hover:scale-105 transition-transform" 
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <p className="text-xs font-bold text-slate-500 text-center">Mặt sau</p>
                        <div className="aspect-[1.6/1] rounded-xl overflow-hidden border border-slate-200 shadow-sm cursor-zoom-in group relative bg-slate-100">
                          <img 
                            src={getDocumentUrl(selectedReq.documents, 'BACK')} 
                            alt="ID Back" 
                            className="w-full h-full object-contain group-hover:scale-105 transition-transform" 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>

              {/* ACTION BAR */}
              <div className="absolute bottom-0 left-0 w-full bg-white border-t border-slate-200 p-5 flex justify-end gap-3 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
                <button 
                  disabled={isSubmitting}
                  onClick={() => setIsRejectModalOpen(true)}
                  className="px-6 py-2.5 rounded-xl border-2 border-red-100 text-red-600 font-bold text-sm hover:bg-red-50 hover:border-red-200 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="material-symbols-outlined text-[18px]">cancel</span> Yêu cầu cập nhật lại
                </button>
                <button 
                  disabled={isSubmitting}
                  onClick={handleApprove}
                  className="px-8 py-2.5 rounded-xl bg-[#059669] text-white font-bold text-sm hover:bg-[#047857] shadow-lg shadow-green-200 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                  ) : (
                    <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
                  )}
                  Phê duyệt danh tính
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 bg-slate-50 flex flex-col items-center justify-center text-slate-400">
              <span className="material-symbols-outlined text-6xl mb-4 opacity-20">badge</span>
              <p className="font-bold">Chọn một hồ sơ bên trái để đối chiếu danh tính</p>
            </div>
          )}
        </div>
      </div>

      {/* ================= MODAL TỪ CHỐI ================= */}
      {isRejectModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl animate-fade-in-up">
            <div className="flex items-center gap-3 text-red-600 mb-4">
              <span className="material-symbols-outlined text-3xl">warning</span>
              <h2 className="text-xl font-black text-slate-900">Yêu cầu cập nhật lại</h2>
            </div>
            <p className="text-sm text-slate-600 mb-4">
              Vui lòng cung cấp lý do để người dùng chụp và tải lên lại giấy tờ chính xác hơn.
            </p>
            
            <textarea 
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Ví dụ: Ảnh CMND bị mờ, lóa sáng, ảnh chân dung không rõ mặt..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 min-h-[120px] outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all text-sm font-medium resize-none mb-6"
            ></textarea>

            <div className="flex justify-end gap-3">
              <button 
                disabled={isSubmitting}
                onClick={() => { setIsRejectModalOpen(false); setRejectReason(""); }}
                className="px-5 py-2.5 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-colors text-sm disabled:opacity-50"
              >
                Hủy bỏ
              </button>
              <button 
                disabled={isSubmitting}
                onClick={handleReject}
                className="px-6 py-2.5 rounded-xl bg-red-600 text-white font-bold text-sm hover:bg-red-700 shadow-lg shadow-red-200 transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {isSubmitting && <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>}
                Gửi yêu cầu
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}