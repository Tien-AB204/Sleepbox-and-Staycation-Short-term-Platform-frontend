import React, { useState } from "react";

// --- MOCK DATA ---
const MOCK_DISPUTES = [
  {
    id: "DSP-8472",
    guestName: "Nguyễn Văn A",
    hostName: "Kai Trần",
    facilityName: "CyberBox District 1",
    bookingId: "BOX-54237982",
    issue: "Máy lạnh hỏng, phòng rất nóng và có mùi",
    status: "pending",
    amountPaid: 460000,
    createdAt: "20/10/2023 - 15:30",
    timeline: [
      { 
        id: 1, sender: "guest", time: "20/10/2023 - 15:00", 
        text: "Tôi vừa nhận phòng lúc 14h, nhưng máy lạnh trong box số 1 không hoạt động. Phòng rất nóng và bí, tôi không thể nghỉ ngơi được.", 
        images: ["https://images.unsplash.com/photo-1616486022655-a50d249f7ce7?w=300"] 
      },
      { 
        id: 2, sender: "host", time: "20/10/2023 - 15:15", 
        text: "Chào bạn, mình đã báo nhân viên kiểm tra. Máy lạnh tổng vẫn hoạt động bình thường, do bạn chưa kéo kín rèm nên hơi lạnh bị thoát ra ngoài ạ.", 
        images: [] 
      },
      { 
        id: 3, sender: "guest", time: "20/10/2023 - 15:20", 
        text: "Tôi đã kéo kín rèm ngay từ đầu. Quạt thông gió trong box của tôi bị hỏng hoàn toàn. Đề nghị hệ thống xem xét hoàn tiền, tôi đã phải trả phòng sớm.", 
        images: ["https://images.unsplash.com/photo-1542296332-2e4473faf563?w=300"] 
      }
    ]
  },
  {
    id: "DSP-9103",
    guestName: "Trần B",
    hostName: "Lê Minh",
    facilityName: "Zen Capsule Tân Bình",
    bookingId: "BOX-66210099",
    issue: "Khách ồn ào, không tuân thủ nội quy",
    status: "reviewing",
    amountPaid: 250000,
    createdAt: "21/10/2023 - 23:45",
    timeline: [
      { 
        id: 1, sender: "guest", time: "21/10/2023 - 23:30", 
        text: "Nhóm khách ở pod bên cạnh nói chuyện điện thoại rất to lúc nửa đêm. Tôi gọi số hotline của host nhưng không ai nghe máy.", 
        images: [] 
      }
    ]
  }
];

export default function DisputeManagement() {
  const [disputes, setDisputes] = useState(MOCK_DISPUTES);
  const [selectedDispute, setSelectedDispute] = useState(MOCK_DISPUTES[0]);
  
  // States cho Form Đề xuất giải quyết
  const [resolutionType, setResolutionType] = useState(""); // 'full', 'partial', 'reject'
  const [refundAmount, setRefundAmount] = useState("");
  const [modNote, setModNote] = useState("");

  const handleSubmitResolution = () => {
    if (!resolutionType) {
      alert("Vui lòng chọn hướng giải quyết!");
      return;
    }
    if (resolutionType === "partial" && !refundAmount) {
      alert("Vui lòng nhập số tiền hoàn lại cho Guest!");
      return;
    }
    if (!modNote.trim()) {
      alert("Vui lòng ghi chú lý do ra quyết định để Admin xem xét!");
      return;
    }

    const resolutionText = 
      resolutionType === "full" ? `Hoàn 100% (${selectedDispute.amountPaid.toLocaleString('vi-VN')}đ)` :
      resolutionType === "partial" ? `Hoàn một phần (${Number(refundAmount).toLocaleString('vi-VN')}đ)` :
      "Bác bỏ khiếu nại (Không hoàn tiền)";

    alert(`Đã gửi đề xuất lên Admin thành công!\nQuyết định: ${resolutionText}\nGhi chú: ${modNote}`);
    
    // Reset form
    setResolutionType("");
    setRefundAmount("");
    setModNote("");
  };

  return (
    <div className="h-full flex flex-col">
      
      {/* HEADER TỔNG */}
      <div className="mb-6 flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Quản Lý Khiếu Nại (Disputes)</h1>
          <p className="text-sm text-slate-500 mt-1">Mod xem xét bằng chứng và đề xuất hướng giải quyết lên Admin.</p>
        </div>
      </div>

      {/* KHU VỰC CHIA 2 CỘT */}
      <div className="flex-1 flex gap-6 min-h-0 overflow-hidden">
        
        {/* CỘT TRÁI: DANH SÁCH KHIẾU NẠI */}
        <div className="w-1/3 bg-white border border-slate-200 rounded-2xl flex flex-col overflow-hidden shadow-sm shrink-0">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
              <input 
                type="text" 
                placeholder="Tìm mã booking, mã khiếu nại..." 
                className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-[#4059AD] focus:ring-1 focus:ring-[#4059AD]/20 transition-all"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-2">
            {disputes.map(dsp => (
              <div 
                key={dsp.id}
                onClick={() => {
                  setSelectedDispute(dsp);
                  setResolutionType(""); // reset form khi đổi thẻ
                  setModNote("");
                }}
                className={`p-4 rounded-xl cursor-pointer border transition-all ${
                  selectedDispute.id === dsp.id 
                    ? "bg-[#4059AD]/5 border-[#4059AD] shadow-sm" 
                    : "bg-white border-transparent hover:border-slate-200 hover:bg-slate-50"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider bg-red-100 text-red-700">
                    Khẩn cấp
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{dsp.createdAt.split(" - ")[0]}</span>
                </div>
                <h3 className="font-bold text-slate-900 truncate">{dsp.issue}</h3>
                <p className="text-xs text-slate-500 mt-1 flex items-center justify-between">
                  <span>Booking: {dsp.bookingId}</span>
                  <span className="font-bold text-[#4059AD]">{dsp.id}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CỘT PHẢI: CHI TIẾT & XỬ LÝ */}
        {selectedDispute ? (
          <div className="w-2/3 flex gap-4 overflow-hidden">
            
            {/* PANEL 1: TIMELINE (BẰNG CHỨNG) */}
            <div className="flex-1 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col overflow-hidden">
              <div className="p-5 border-b border-slate-100 shrink-0 bg-slate-50/50">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg font-black text-slate-900 mb-1">{selectedDispute.issue}</h2>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">domain</span> {selectedDispute.facilityName}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Giá trị đơn</p>
                    <p className="text-lg font-black text-green-600">{selectedDispute.amountPaid.toLocaleString('vi-VN')}đ</p>
                  </div>
                </div>
              </div>

              {/* Khu vực Timeline Chat & Evidence */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6 bg-slate-50">
                <div className="text-center">
                  <span className="text-xs font-bold text-slate-400 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
                    Lịch sử trao đổi / Bằng chứng
                  </span>
                </div>

                {selectedDispute.timeline.map((msg) => (
                  <div key={msg.id} className={`flex flex-col ${msg.sender === 'guest' ? 'items-end' : 'items-start'}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">{msg.time}</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        msg.sender === 'guest' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {msg.sender === 'guest' ? `Guest: ${selectedDispute.guestName}` : `Host: ${selectedDispute.hostName}`}
                      </span>
                    </div>
                    
                    <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      msg.sender === 'guest' ? 'bg-white border border-slate-200 rounded-tr-none text-slate-700' : 'bg-[#4059AD] text-white rounded-tl-none'
                    }`}>
                      {msg.text}
                    </div>

                    {msg.images.length > 0 && (
                      <div className={`flex gap-2 mt-2 max-w-[80%] ${msg.sender === 'guest' ? 'justify-end' : 'justify-start'}`}>
                        {msg.images.map((img, i) => (
                          <img key={i} src={img} alt="Evidence" className="w-24 h-24 object-cover rounded-xl border-2 border-white shadow-md cursor-zoom-in hover:scale-105 transition-transform" />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* PANEL 2: FORM RA QUYẾT ĐỊNH */}
            <div className="w-[320px] bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col shrink-0 overflow-hidden">
              <div className="p-5 border-b border-slate-100 bg-slate-50/50 shrink-0">
                <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#4059AD]">gavel</span> Phán quyết
                </h2>
                <p className="text-xs text-slate-500 mt-1">Đề xuất lên Admin để duyệt hoàn tiền</p>
              </div>

              <div className="p-5 flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-5">
                
                {/* Các Option Hoàn Tiền */}
                <div className="space-y-3">
                  <label className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${resolutionType === 'full' ? 'border-[#4059AD] bg-[#4059AD]/5' : 'border-slate-100 hover:border-slate-200'}`}>
                    <input type="radio" name="resolution" value="full" className="mt-1 text-[#4059AD] focus:ring-[#4059AD]" onChange={(e) => setResolutionType(e.target.value)} checked={resolutionType === 'full'} />
                    <div>
                      <p className="font-bold text-slate-800 text-sm">Hoàn tiền 100%</p>
                      <p className="text-xs text-slate-500 mt-0.5">Lỗi hoàn toàn do phía Host/Cơ sở vật chất.</p>
                      {resolutionType === 'full' && <p className="text-sm font-black text-green-600 mt-1.5">Hoàn lại: {selectedDispute.amountPaid.toLocaleString('vi-VN')}đ</p>}
                    </div>
                  </label>

                  <label className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${resolutionType === 'partial' ? 'border-[#4059AD] bg-[#4059AD]/5' : 'border-slate-100 hover:border-slate-200'}`}>
                    <input type="radio" name="resolution" value="partial" className="mt-1 text-[#4059AD] focus:ring-[#4059AD]" onChange={(e) => setResolutionType(e.target.value)} checked={resolutionType === 'partial'} />
                    <div className="w-full">
                      <p className="font-bold text-slate-800 text-sm">Hoàn tiền một phần</p>
                      <p className="text-xs text-slate-500 mt-0.5">Thương lượng giữa 2 bên hoặc lỗi một phần.</p>
                      {resolutionType === 'partial' && (
                        <div className="mt-2 flex items-center gap-2">
                          <input 
                            type="number" 
                            placeholder="Nhập số tiền..." 
                            value={refundAmount}
                            onChange={(e) => setRefundAmount(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-bold outline-none focus:border-[#4059AD]" 
                          />
                          <span className="text-xs font-bold text-slate-500">VNĐ</span>
                        </div>
                      )}
                    </div>
                  </label>

                  <label className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${resolutionType === 'reject' ? 'border-red-500 bg-red-50' : 'border-slate-100 hover:border-slate-200'}`}>
                    <input type="radio" name="resolution" value="reject" className="mt-1 text-red-600 focus:ring-red-500" onChange={(e) => setResolutionType(e.target.value)} checked={resolutionType === 'reject'} />
                    <div>
                      <p className="font-bold text-red-700 text-sm">Bác bỏ khiếu nại</p>
                      <p className="text-xs text-red-600/70 mt-0.5">Guest vi phạm hoặc không có bằng chứng hợp lệ. Không hoàn tiền.</p>
                    </div>
                  </label>
                </div>

                {/* Khung Ghi chú của Mod */}
                <div className="mt-auto">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2">Ghi chú biên bản xử lý *</label>
                  <textarea 
                    value={modNote}
                    onChange={(e) => setModNote(e.target.value)}
                    placeholder="Ghi rõ lý do Mod đưa ra quyết định này để Admin duyệt..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 min-h-[100px] outline-none focus:border-[#4059AD] focus:ring-1 focus:ring-[#4059AD]/20 transition-all text-sm resize-none"
                  ></textarea>
                </div>

                <button 
                  onClick={handleSubmitResolution}
                  className="w-full bg-[#4059AD] text-white py-3 rounded-xl font-bold text-sm hover:bg-[#32488f] shadow-[0_8px_20px_rgba(64,89,173,0.25)] transition-all flex justify-center items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">send</span> Đề xuất lên Admin
                </button>

              </div>
            </div>

          </div>
        ) : (
          <div className="w-2/3 bg-slate-50 border border-slate-200 rounded-2xl border-dashed flex flex-col items-center justify-center text-slate-400">
            <span className="material-symbols-outlined text-6xl mb-4 opacity-20">gavel</span>
            <p className="font-bold">Chọn một khiếu nại để xem bằng chứng và xử lý</p>
          </div>
        )}
      </div>

    </div>
  );
}