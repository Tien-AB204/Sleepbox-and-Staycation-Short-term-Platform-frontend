import React, { useState } from "react";

// --- MOCK DATA ---
const MOCK_REQUESTS = [
  {
    id: "REQ-001",
    hostName: "Kai Trần",
    hostEmail: "kaitran@gmail.com",
    facilityName: "CyberBox District 1",
    address: "123 Lê Lợi, Phường Bến Thành, Quận 1, TP. HCM",
    type: "Sleepbox",
    submittedAt: "20/10/2023 - 09:30",
    status: "pending",
    description: "CyberBox là mô hình sleepbox hiện đại với không gian riêng tư, trang bị khóa từ, điều hòa trung tâm và khu vực sinh hoạt chung rộng rãi.",
    amenities: ["Wi-Fi", "Điều hòa", "Bếp chung", "Máy giặt", "An ninh 24/7"],
    images: [
      "https://images.unsplash.com/photo-1596120236172-231999844ade?w=400",
      "https://images.unsplash.com/photo-1555854817-5b2260d538bb?w=400"
    ],
    documents: [
      { id: 1, name: "Giấy phép kinh doanh", type: "PDF", url: "#" },
      { id: 2, name: "Giấy chứng nhận PCCC", type: "PDF", url: "#" },
      { id: 3, name: "CCCD/CMND Chủ cơ sở", type: "Image", url: "#" }
    ]
  },
  {
    id: "REQ-002",
    hostName: "Lê Minh",
    hostEmail: "minhle99@gmail.com",
    facilityName: "Zen Capsule Tân Bình",
    address: "45 Trường Sơn, Phường 2, Tân Bình, TP. HCM",
    type: "Capsule",
    submittedAt: "21/10/2023 - 14:15",
    status: "pending",
    description: "Không gian nghỉ ngơi yên tĩnh ngay sát sân bay Tân Sơn Nhất, phù hợp cho khách chờ nối chuyến.",
    amenities: ["Wi-Fi", "Phòng tắm chung", "Lễ tân 24/24"],
    images: [
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=400"
    ],
    documents: [
      { id: 1, name: "Giấy phép kinh doanh", type: "PDF", url: "#" },
      { id: 2, name: "CCCD/CMND Chủ cơ sở", type: "Image", url: "#" }
    ]
  }
];

export default function FacilityApproval() {
  const [requests, setRequests] = useState(MOCK_REQUESTS);
  const [selectedReq, setSelectedReq] = useState(MOCK_REQUESTS[0]);
  const [activeTab, setActiveTab] = useState("info"); // 'info' hoặc 'docs'
  
  // State Modal Từ Chối
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  // Hàm xử lý
  const handleApprove = () => {
    alert(`Đã DUYỆT cơ sở: ${selectedReq.facilityName}`);
    // Ở thực tế sẽ gọi API, sau đó xóa khỏi list pending
  };

  const handleReject = () => {
    if (!rejectReason.trim()) {
      alert("Vui lòng nhập lý do từ chối để Host biết đường sửa!");
      return;
    }
    alert(`Đã TỪ CHỐI cơ sở: ${selectedReq.facilityName}\nLý do: ${rejectReason}`);
    setIsRejectModalOpen(false);
    setRejectReason("");
    // Ở thực tế sẽ gọi API update status = rejected
  };

  return (
    <div className="h-full flex flex-col">
      
      {/* HEADER TỔNG */}
      <div className="mb-6 flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Duyệt Cơ Sở Mới</h1>
          <p className="text-sm text-slate-500 mt-1">Có <span className="font-bold text-[#4059AD]">{requests.length}</span> yêu cầu đang chờ kiểm duyệt.</p>
        </div>
        <div className="flex bg-white border border-slate-200 rounded-lg p-1 shadow-sm">
          <button className="px-4 py-1.5 text-sm font-bold bg-slate-100 text-slate-800 rounded-md">Chờ duyệt</button>
          <button className="px-4 py-1.5 text-sm font-medium text-slate-500 hover:text-slate-800">Đã xử lý</button>
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
                placeholder="Tìm tên cơ sở, host..." 
                className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-[#4059AD] focus:ring-1 focus:ring-[#4059AD]/20 transition-all"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-2">
            {requests.map(req => (
              <div 
                key={req.id}
                onClick={() => setSelectedReq(req)}
                className={`p-4 rounded-xl cursor-pointer border transition-all ${
                  selectedReq.id === req.id 
                    ? "bg-[#4059AD]/5 border-[#4059AD] shadow-sm" 
                    : "bg-white border-transparent hover:border-slate-200 hover:bg-slate-50"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider bg-amber-100 text-amber-700">
                    Chờ duyệt
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{req.submittedAt.split(" - ")[0]}</span>
                </div>
                <h3 className="font-bold text-slate-900 truncate">{req.facilityName}</h3>
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">person</span> {req.hostName}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CỘT PHẢI: CHI TIẾT */}
        {selectedReq ? (
          <div className="w-2/3 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col overflow-hidden relative">
            
            {/* Header Chi tiết */}
            <div className="px-8 pt-8 pb-4 border-b border-slate-100 shrink-0">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-black text-slate-900">{selectedReq.facilityName}</h2>
                  <p className="text-sm text-slate-500 mt-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">location_on</span>
                    {selectedReq.address}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mã yêu cầu</p>
                  <p className="text-sm font-black text-[#4059AD]">{selectedReq.id}</p>
                </div>
              </div>

              {/* Custom TABS */}
              <div className="flex gap-6 border-b border-slate-200">
                <button 
                  onClick={() => setActiveTab("info")}
                  className={`pb-3 text-sm font-bold transition-all relative ${activeTab === "info" ? "text-[#4059AD]" : "text-slate-500 hover:text-slate-800"}`}
                >
                  Thông tin cơ sở
                  {activeTab === "info" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#4059AD] rounded-t-full"></div>}
                </button>
                <button 
                  onClick={() => setActiveTab("docs")}
                  className={`pb-3 text-sm font-bold transition-all relative flex items-center gap-1 ${activeTab === "docs" ? "text-[#4059AD]" : "text-slate-500 hover:text-slate-800"}`}
                >
                  Giấy tờ pháp lý 
                  <span className="bg-red-100 text-red-600 text-[10px] px-1.5 py-0.5 rounded-full">{selectedReq.documents.length}</span>
                  {activeTab === "docs" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#4059AD] rounded-t-full"></div>}
                </button>
              </div>
            </div>

            {/* Nội dung Tab cuộn được */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-8 pb-28">
              
              {/* TAB 1: THÔNG TIN */}
              {activeTab === "info" && (
                <div className="space-y-8 animate-fade-in">
                  {/* Host Info */}
                  <div className="bg-slate-50 rounded-xl p-4 flex items-center gap-4 border border-slate-100">
                    <div className="w-12 h-12 rounded-full bg-[#4059AD] text-white flex items-center justify-center font-bold text-xl">
                      {selectedReq.hostName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Thông tin Chủ cơ sở (Host)</p>
                      <p className="font-bold text-slate-900">{selectedReq.hostName}</p>
                      <p className="text-sm text-slate-500">{selectedReq.hostEmail}</p>
                    </div>
                  </div>

                  {/* Mô tả */}
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-2">Mô tả cơ sở</h3>
                    <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl">{selectedReq.description}</p>
                  </div>

                  {/* Tiện ích */}
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-3">Tiện nghi đăng ký</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedReq.amenities.map((am, i) => (
                        <span key={i} className="bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600">
                          {am}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Hình ảnh */}
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-3">Hình ảnh thực tế ({selectedReq.images.length})</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedReq.images.map((img, i) => (
                        <div key={i} className="aspect-video rounded-xl overflow-hidden border border-slate-200 bg-slate-100 relative group cursor-zoom-in">
                          <img src={img} alt="Facility" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: GIẤY TỜ */}
              {activeTab === "docs" && (
                <div className="space-y-4 animate-fade-in">
                  <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex gap-3 mb-6">
                    <span className="material-symbols-outlined text-amber-600">warning</span>
                    <p className="text-sm text-amber-800 font-medium">
                      Mod vui lòng kiểm tra kỹ thông tin trên giấy tờ phải trùng khớp với thông tin Host và địa chỉ cơ sở đã khai báo.
                    </p>
                  </div>

                  {selectedReq.documents.map(doc => (
                    <div key={doc.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:shadow-md transition-shadow bg-white">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${doc.type === 'PDF' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>
                          <span className="material-symbols-outlined text-2xl">{doc.type === 'PDF' ? 'picture_as_pdf' : 'image'}</span>
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{doc.name}</p>
                          <p className="text-xs text-slate-500 uppercase tracking-widest mt-0.5">Tệp {doc.type}</p>
                        </div>
                      </div>
                      <button className="text-[#4059AD] bg-[#4059AD]/10 hover:bg-[#4059AD]/20 px-4 py-2 rounded-lg text-sm font-bold transition-colors flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">visibility</span> Xem tài liệu
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ACTION BAR (Dính ở đáy) */}
            <div className="absolute bottom-0 left-0 w-full bg-white border-t border-slate-200 p-5 flex justify-end gap-3 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
              <button 
                onClick={() => setIsRejectModalOpen(true)}
                className="px-6 py-2.5 rounded-xl border-2 border-red-100 text-red-600 font-bold text-sm hover:bg-red-50 hover:border-red-200 transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">cancel</span> Từ chối
              </button>
              <button 
                onClick={handleApprove}
                className="px-8 py-2.5 rounded-xl bg-[#059669] text-white font-bold text-sm hover:bg-[#047857] shadow-lg shadow-green-200 transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">check_circle</span> Phê duyệt cơ sở
              </button>
            </div>
            
          </div>
        ) : (
          <div className="w-2/3 bg-slate-50 border border-slate-200 rounded-2xl border-dashed flex flex-col items-center justify-center text-slate-400">
            <span className="material-symbols-outlined text-6xl mb-4 opacity-20">domain_verification</span>
            <p className="font-bold">Chọn một yêu cầu bên trái để xem chi tiết</p>
          </div>
        )}
      </div>

      {/* ================= MODAL TỪ CHỐI ================= */}
      {isRejectModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl animate-fade-in-up">
            <div className="flex items-center gap-3 text-red-600 mb-4">
              <span className="material-symbols-outlined text-3xl">warning</span>
              <h2 className="text-xl font-black text-slate-900">Từ chối xét duyệt</h2>
            </div>
            <p className="text-sm text-slate-600 mb-4">
              Vui lòng cung cấp lý do từ chối để Host <span className="font-bold">{selectedReq?.hostName}</span> có thể khắc phục và gửi lại yêu cầu.
            </p>
            
            <textarea 
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Ví dụ: Hình ảnh CMND bị mờ, không đọc được số..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 min-h-[120px] outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all text-sm font-medium resize-none mb-6"
            ></textarea>

            <div className="flex justify-end gap-3">
              <button 
                onClick={() => { setIsRejectModalOpen(false); setRejectReason(""); }}
                className="px-5 py-2.5 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-colors text-sm"
              >
                Hủy bỏ
              </button>
              <button 
                onClick={handleReject}
                className="px-6 py-2.5 rounded-xl bg-red-600 text-white font-bold text-sm hover:bg-red-700 shadow-lg shadow-red-200 transition-all"
              >
                Xác nhận từ chối
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}