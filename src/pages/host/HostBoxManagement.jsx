import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Quy tắc index position 20 slot:
// Cột trái (0-4): Dưới (col * 2), Trên (col * 2 + 1) -> Index 0 đến 9
// Cột phải (5-9): Dưới (col * 2), Trên (col * 2 + 1) -> Index 10 đến 19
const TOTAL_SLOTS = 20;

export default function HostBoxManagement() {
  const { areaId } = useParams();
  const navigate = useNavigate();

  // Đã xóa trường areaName khỏi Mock Data
  const [boxes, setBoxes] = useState([
    { id: "B1", name: "Box 101", position: 0, boxType: "đơn", boxLevel: "thường", status: "mở khóa", dims: { length: "2", width: "1", height: "1.2" } },
    { id: "B2", name: "Box 102", position: 1, boxType: "đơn", boxLevel: "cao cấp", status: "mở khóa", dims: { length: "2", width: "1", height: "1.2" } },
    { id: "B3", name: "Box 103", position: 2, boxType: "đôi", boxLevel: "thường", status: "khóa", dims: { length: "2", width: "1.4", height: "1.2" } },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBox, setEditingBox] = useState(null); 

  // Form State (Đã xóa areaNameField)
  const [boxName, setBoxName] = useState("");
  const [boxType, setBoxType] = useState(""); 
  const [boxLevel, setBoxLevel] = useState("");
  const [boxStatus, setBoxStatus] = useState("mở khóa");
  const [boxDims, setBoxDims] = useState({ length: "", width: "", height: "" });
  const [currentPos, setCurrentPos] = useState(null);

  const handleOpenCreate = () => {
    const occupiedPos = boxes.map(b => b.position);
    let firstEmpty = null;
    for (let i = 0; i < TOTAL_SLOTS; i++) {
      if (!occupiedPos.includes(i)) {
        firstEmpty = i;
        break;
      }
    }
    if (firstEmpty === null) return alert("Khu vực này đã đầy 20 Box!");

    setEditingBox(null);
    setBoxName("");
    setBoxType("đơn"); 
    setBoxLevel("thường");
    setBoxStatus("mở khóa");
    setBoxDims({ length: "", width: "", height: "" });
    setCurrentPos(firstEmpty);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (box) => {
    setEditingBox(box);
    setBoxName(box.name);
    setBoxType(box.boxType || "đơn"); 
    setBoxLevel(box.boxLevel || "thường");
    setBoxStatus(box.status || "mở khóa");
    setBoxDims(box.dims || { length: "", width: "", height: "" });
    setCurrentPos(box.position);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingBox(null);
    setCurrentPos(null);
  };

  const moveToTop = () => {
    if (currentPos % 2 !== 0) return; 
    const targetPos = currentPos + 1;
    const occupiedPos = boxes.filter(b => b.id !== editingBox?.id).map(b => b.position);
    if (occupiedPos.includes(targetPos)) return alert("Tầng trên của cột này đã có Box!");
    setCurrentPos(targetPos);
  };

  const moveToBot = () => {
    if (currentPos % 2 === 0) return; 
    const targetPos = currentPos - 1;
    const occupiedPos = boxes.filter(b => b.id !== editingBox?.id).map(b => b.position);
    if (occupiedPos.includes(targetPos)) return alert("Tầng dưới của cột này đã có Box!"); 
    setCurrentPos(targetPos);
  };

  const handleSave = (e) => {
    e.preventDefault(); // Chặn hành vi load lại trang mặc định của Form

    // Thêm kiểm tra chống rủi ro không chọn giường
    if (currentPos === null) return alert("Vui lòng chọn vị trí giường trên sa bàn!");

    const newBoxData = {
      name: boxName, 
      boxType: boxType, 
      boxLevel: boxLevel,
      status: boxStatus,
      dims: boxDims,
      position: currentPos 
    };

    if (editingBox) {
      setBoxes(boxes.map(b => b.id === editingBox.id ? { ...b, ...newBoxData } : b));
    } else {
      setBoxes([...boxes, { id: `NEW_${Date.now()}`, ...newBoxData }]);
    }
    handleCloseForm();
  };

  const activePositions = boxes.map(b => b.position);
  if (isFormOpen && currentPos !== null && !activePositions.includes(currentPos)) {
    activePositions.push(currentPos);
  }

  const hasLeftBoxes = activePositions.some(pos => pos >= 0 && pos <= 9);
  const hasRightBoxes = activePositions.some(pos => pos >= 10 && pos <= 19);

  const Slot = ({ pos, label }) => {
    const occupiedBox = boxes.find(b => b.position === pos);
    const isCurrentActive = isFormOpen && currentPos === pos;
    const isAvailable = isFormOpen && (!occupiedBox || occupiedBox.id === editingBox?.id);

    return (
      <div 
        onClick={() => isAvailable && setCurrentPos(pos)}
        className={`flex-1 flex flex-col items-center justify-center rounded-lg border transition-all duration-300
          ${isAvailable ? "cursor-pointer hover:border-emerald-400 hover:bg-emerald-50" : ""}
          ${isCurrentActive ? "border-emerald-500 bg-emerald-100 shadow-[0_0_15px_rgba(16,185,129,0.4)] scale-[1.02] z-10"
            : occupiedBox && occupiedBox.id !== editingBox?.id
              ? `border-indigo-200 ${occupiedBox.status === 'khóa' ? 'bg-slate-200' : 'bg-indigo-50'} opacity-60 cursor-not-allowed`
              : "border-dashed border-slate-300 bg-white"}
        `}
      >
        <div className="flex items-center gap-1 mb-0.5">
          <span className="text-[10px] text-slate-400 font-bold">{label}</span>
          {occupiedBox && occupiedBox.id !== editingBox?.id && occupiedBox.status === 'khóa' && (
            <span className="material-symbols-outlined text-[10px] text-slate-500">lock</span>
          )}
        </div>
        
        {isCurrentActive ? (
          <span className="font-black text-emerald-700 text-xs">{boxName || "Đang chọn..."}</span>
        ) : occupiedBox && occupiedBox.id !== editingBox?.id ? (
          <div className="text-center">
            <span className="font-black text-indigo-900 text-xs block">{occupiedBox.name}</span>
            <span className={`text-[8px] font-bold px-1 py-0.5 rounded capitalize ${occupiedBox.boxLevel === 'cao cấp' ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-600'}`}>
                {occupiedBox.boxType} {occupiedBox.boxLevel === 'cao cấp' ? 'VIP' : ''}
            </span>
          </div>
        ) : (
          <span className="text-xs text-slate-300 font-medium">Trống</span>
        )}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-4 mb-6 shrink-0">
        <button onClick={() => navigate("/host/area")} className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-500 hover:text-indigo-600 shadow-sm"><span className="material-symbols-outlined">arrow_back</span></button>
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Quản lý Box - Tầng {areaId}</h1>
          <p className="text-sm text-slate-500 mt-1">Sắp xếp sơ đồ 20 Box (Giường tầng) của khu vực này.</p>
        </div>
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        {/* CỘT TRÁI (45%): Form và List */}
        <div className="w-[45%] bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden relative">
          
          <div className={`absolute inset-0 bg-white z-20 flex flex-col transition-transform duration-300 ${isFormOpen ? "translate-x-0" : "-translate-x-full"}`}>
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="font-black text-lg">{editingBox ? "Sửa thông tin Box" : "Tạo Box mới"}</h2>
              <button onClick={handleCloseForm} className="text-slate-400 hover:text-red-500"><span className="material-symbols-outlined">close</span></button>
            </div>
            
            {/* LƯU Ý: Nút Submit đã được nhét vào trong Form này */}
            <form onSubmit={handleSave} className="flex-1 flex flex-col min-h-0">
              <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
                
                {/* Ghép Tên Box và Trạng Thái chung 1 hàng */}
                <div className="flex gap-3">
                  <div className="flex-[2]">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tên Box</label>
                    <input type="text" required value={boxName} onChange={(e) => setBoxName(e.target.value)} className="w-full bg-slate-50 border border-slate-200 px-3 py-2.5 rounded-xl outline-none focus:border-indigo-400 text-sm" placeholder="VD: Box 101" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Trạng thái</label>
                    <select required value={boxStatus} onChange={(e) => setBoxStatus(e.target.value)} className="w-full bg-slate-50 border border-slate-200 px-3 py-2.5 rounded-xl outline-none focus:border-indigo-400 text-sm font-bold text-slate-700">
                        <option value="mở khóa">Mở khóa</option>
                        <option value="khóa">Khóa</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 p-3 bg-slate-50 border border-slate-100 rounded-xl">
                  <div className="flex-1">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Sức chứa</label>
                    <select required value={boxType} onChange={(e) => setBoxType(e.target.value)} className="w-full bg-white border border-slate-200 px-3 py-2 rounded-lg outline-none focus:border-indigo-400 text-sm">
                        <option value="đơn">Box Đơn</option>
                        <option value="đôi">Box Đôi</option>
                        <option value="family">Box Family</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Phân khúc</label>
                    <select required value={boxLevel} onChange={(e) => setBoxLevel(e.target.value)} className="w-full bg-white border border-slate-200 px-3 py-2 rounded-lg outline-none focus:border-indigo-400 text-sm">
                        <option value="thường">Thường</option>
                        <option value="cao cấp">Cao cấp (VIP)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kích thước (Mét)</label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold">D:</span>
                      <input type="number" step="0.1" required value={boxDims.length} onChange={(e) => setBoxDims({...boxDims, length: e.target.value})} className="w-full bg-slate-50 border border-slate-200 pl-8 pr-2 py-2 rounded-lg outline-none focus:border-indigo-400 text-sm" placeholder="2.0" />
                    </div>
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold">R:</span>
                      <input type="number" step="0.1" required value={boxDims.width} onChange={(e) => setBoxDims({...boxDims, width: e.target.value})} className="w-full bg-slate-50 border border-slate-200 pl-8 pr-2 py-2 rounded-lg outline-none focus:border-indigo-400 text-sm" placeholder="1.2" />
                    </div>
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold">C:</span>
                      <input type="number" step="0.1" required value={boxDims.height} onChange={(e) => setBoxDims({...boxDims, height: e.target.value})} className="w-full bg-slate-50 border border-slate-200 pl-8 pr-2 py-2 rounded-lg outline-none focus:border-indigo-400 text-sm" placeholder="1.5" />
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-indigo-50/50 border border-indigo-100 rounded-xl mt-4">
                  <label className="block text-[11px] font-bold text-indigo-800 uppercase tracking-wider mb-2 text-center">Vị trí Giường</label>
                  <div className="flex gap-2">
                    <button type="button" onClick={moveToTop} disabled={currentPos !== null && currentPos % 2 !== 0} className="flex-1 flex items-center justify-center gap-1 py-2 bg-white rounded-lg shadow-sm border border-indigo-200 text-indigo-700 text-sm font-bold hover:bg-indigo-600 hover:text-white disabled:opacity-50 transition-colors">
                      <span className="material-symbols-outlined text-[18px]">vertical_align_top</span> Tầng Trên
                    </button>
                    <button type="button" onClick={moveToBot} disabled={currentPos !== null && currentPos % 2 === 0} className="flex-1 flex items-center justify-center gap-1 py-2 bg-white rounded-lg shadow-sm border border-indigo-200 text-indigo-700 text-sm font-bold hover:bg-indigo-600 hover:text-white disabled:opacity-50 transition-colors">
                      <span className="material-symbols-outlined text-[18px]">vertical_align_bottom</span> Tầng Dưới
                    </button>
                  </div>
                </div>
              </div>

              {/* KHÓA CHẶT FORM: Nút Lưu thông tin phải nằm ở đây và là type="submit" */}
              <div className="p-4 border-t border-slate-100 shrink-0">
                <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 shadow-md">Lưu thông tin</button>
              </div>
            </form>
          </div>

          <div className="p-5 border-b border-slate-100 flex justify-between items-center shrink-0">
            <h2 className="font-black text-lg text-slate-800">Danh sách Box</h2>
            <span className="bg-indigo-100 text-indigo-700 font-bold px-3 py-1 rounded-lg text-xs">{boxes.length}/20</span>
          </div>
          <div className="p-4 border-b border-slate-100 shrink-0">
            <button onClick={handleOpenCreate} disabled={boxes.length >= 20} className="w-full border-2 border-dashed border-indigo-300 bg-indigo-50 text-indigo-700 font-bold py-3 rounded-xl hover:bg-indigo-100 transition-colors disabled:opacity-50">+ Thêm Box Mới</button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50 custom-scrollbar">
            {boxes.map(box => (
              <div key={box.id} className={`flex items-center justify-between p-4 bg-white border rounded-xl transition-colors group shadow-sm relative overflow-hidden ${box.status === 'khóa' ? 'border-red-200 bg-slate-50' : 'border-slate-200 hover:border-indigo-300'}`}>
                {/* Đã xóa dòng areaName hiển thị mờ */}
                <div className="relative z-10">
                  <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                    {box.name}
                    {box.status === 'khóa' && <span className="material-symbols-outlined text-[16px] text-red-500" title="Box đang khóa">lock</span>}
                  </h4>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded">Cột {Math.floor(box.position / 2) + 1}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${box.position % 2 !== 0 ? 'bg-sky-100 text-sky-600' : 'bg-amber-100 text-amber-600'}`}>
                      {box.position % 2 !== 0 ? "Tầng Trên" : "Tầng Dưới"}
                    </span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded capitalize ${box.boxLevel === 'cao cấp' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'}`}>
                        {box.boxType} {box.boxLevel === 'cao cấp' ? 'VIP' : ''}
                    </span>
                    {box.dims && box.dims.length && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 bg-slate-100 text-slate-400 rounded">
                        {box.dims.length}x{box.dims.width}x{box.dims.height}m
                      </span>
                    )}
                  </div>
                </div>
                <button onClick={() => handleOpenEdit(box)} className="relative z-10 text-indigo-600 p-2 bg-indigo-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"><span className="material-symbols-outlined text-[18px]">edit</span></button>
              </div>
            ))}
          </div>
        </div>

        {/* CỘT PHẢI (55%): SA BÀN */}
        <div className="w-[55%] bg-[#f8fafc] rounded-2xl border border-slate-200 shadow-inner p-6 flex flex-col relative">
          <div className="flex-1 flex flex-col h-full max-w-4xl mx-auto w-full">
            
            <div className="grid grid-cols-[1fr_120px_1fr] gap-4 mb-4 shrink-0">
              <div className="text-center flex justify-center items-end">
                <span className={`transition-all duration-500 bg-indigo-100/80 text-indigo-800 font-black text-[10px] px-3 py-1.5 rounded-md uppercase tracking-[0.2em] shadow-sm border border-indigo-200/50 ${hasLeftBoxes ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                  Dãy Bên Trái
                </span>
              </div>
              <div></div> 
              <div className="text-center flex justify-center items-end">
                <span className={`transition-all duration-500 bg-indigo-100/80 text-indigo-800 font-black text-[10px] px-3 py-1.5 rounded-md uppercase tracking-[0.2em] shadow-sm border border-indigo-200/50 ${hasRightBoxes ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                  Dãy Bên Phải
                </span>
              </div>
            </div>

            <div className="flex-1 grid grid-cols-[1fr_120px_1fr] gap-4 min-h-0">
              <div className="grid grid-rows-5 gap-3">
                {[0, 1, 2, 3, 4].map(colIndex => {
                  const botPos = colIndex * 2;
                  const topPos = colIndex * 2 + 1;
                  const hasBoxInCol = activePositions.some(pos => Math.floor(pos / 2) === colIndex);

                  return (
                    <div key={colIndex} className="flex gap-2 p-2 border-2 border-slate-200 bg-slate-100 rounded-xl shadow-sm relative">
                      <div className={`absolute -left-7 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400 rotate-[-90deg] transition-all duration-500 ${hasBoxInCol ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                        Cột {colIndex + 1}
                      </div>
                      <Slot pos={topPos} label="Tầng Trên" />
                      <Slot pos={botPos} label="Tầng Dưới" />
                    </div>
                  );
                })}
              </div>

              <div className="bg-slate-200/60 border-x-4 border-dashed border-slate-300 rounded-xl flex items-center justify-center relative shadow-inner">
                <span className="rotate-90 tracking-[0.4em] font-black text-slate-500 whitespace-nowrap text-2xl opacity-50">LỐI ĐI</span>
              </div>

              <div className="grid grid-rows-5 gap-3">
                {[5, 6, 7, 8, 9].map(colIndex => {
                  const botPos = colIndex * 2;
                  const topPos = colIndex * 2 + 1;
                  const hasBoxInCol = activePositions.some(pos => Math.floor(pos / 2) === colIndex);

                  return (
                    <div key={colIndex} className="flex gap-2 p-2 border-2 border-slate-200 bg-slate-100 rounded-xl shadow-sm relative">
                      <Slot pos={topPos} label="Tầng Trên" />
                      <Slot pos={botPos} label="Tầng Dưới" />
                      <div className={`absolute -right-7 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400 rotate-90 transition-all duration-500 ${hasBoxInCol ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                        Cột {colIndex + 1}
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}