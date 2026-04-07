import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HostArea() {
  const navigate = useNavigate();
  // Mock Data Tầng (Sau này BE sẽ trả về)
  const [areas, setAreas] = useState([
    { id: "A01", name: "Tầng 1 - Khu A", boxCount: 15, status: "Active" },
    { id: "A02", name: "Tầng 2 - Khu A", boxCount: 8, status: "Active" },
    { id: "B01", name: "Khu VIP Trệt", boxCount: 20, status: "Maintenance" }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [areaName, setAreaName] = useState("");

  const handleCreateArea = (e) => {
    e.preventDefault();
    if (!areaName.trim()) return;
    const newArea = {
      id: `NEW_${Date.now()}`,
      name: areaName,
      boxCount: 0,
      status: "Active"
    };
    setAreas([...areas, newArea]);
    setIsModalOpen(false);
    setAreaName("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Quản lý Khu vực & Tầng</h1>
          <p className="text-sm text-slate-500 mt-1">Tạo các tầng hoặc khu vực để phân nhóm Sleepbox dễ dàng hơn.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#4059AD] text-white px-5 py-2.5 rounded-xl font-bold hover:bg-[#32488d] transition-colors shadow-sm"
        >
          <span className="material-symbols-outlined text-[20px]">add_circle</span>
          Thêm Khu vực
        </button>
      </div>

      {/* Grid Khu Vực */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {areas.map((area) => (
          <div key={area.id} className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            {area.status === "Maintenance" && (
              <div className="absolute top-3 right-[-30px] bg-amber-500 text-white text-[10px] font-bold py-1 px-8 rotate-45">
                Bảo trì
              </div>
            )}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                <span className="material-symbols-outlined">layers</span>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">{area.name}</h3>
                <p className="text-xs font-medium text-slate-500">{area.boxCount} / 20 Box</p>
              </div>
            </div>
            
            <div className="mt-auto pt-4 flex items-center gap-2 border-t border-slate-100">
              <button onClick={() => navigate(`/host/sleepbox/${area.id}`)} className="flex-1 bg-indigo-50 text-indigo-700 font-bold py-2 rounded-lg text-sm hover:bg-indigo-100 transition-colors">
                Quản lý Box
              </button>
              <button className="w-10 h-10 flex items-center justify-center border border-slate-200 text-slate-400 rounded-lg hover:text-slate-700 hover:bg-slate-50 transition-colors">
                <span className="material-symbols-outlined text-[20px]">edit</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Thêm Tầng */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-fade-in-up overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h2 className="font-black text-lg text-slate-900">Thêm Khu vực mới</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleCreateArea} className="p-5">
              <label className="block text-sm font-bold text-slate-700 mb-2">Tên Khu vực / Tầng</label>
              <input 
                type="text" 
                required
                value={areaName}
                onChange={(e) => setAreaName(e.target.value)}
                placeholder="Ví dụ: Tầng 1, Khu A, Phân khu Nam..." 
                className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all mb-6"
              />
              <div className="flex gap-3 justify-end">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">Hủy</button>
                <button type="submit" className="px-6 py-2.5 font-bold text-white bg-[#4059AD] hover:bg-[#32488d] rounded-xl shadow-md transition-colors">Tạo mới</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}