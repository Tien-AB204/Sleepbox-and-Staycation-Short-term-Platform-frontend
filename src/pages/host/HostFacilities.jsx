import React, { useState } from "react";
import { Link } from "react-router-dom";

const HostFacilities = () => {
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "Tất cả (12)" },
    { id: "active", label: "Đang hoạt động (10)" },
    { id: "maintenance", label: "Bảo trì (2)" },
  ];

  const facilities = [
    { name: "ZenPod - Terminal 3", location: "Sân bay Tân Sơn Nhất, TP.HCM", status: "active", rooms: 10, price: "250.000đ/giờ", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDCSdwrbTmcc84oQzRoKEvHKaxmmr9WDa2qDQY0AzSJiq5hPQ1sW7sX7M_gkktCRBr7gXAxMY6GHMckddBmfB8FOZ8cHO6wJMkWmS_omKTHYzwO5VQy1J66FlRUvhLz1L9FE5v3OVfwTbvceIOSv47rFKpBbiyLJo939K7buvYww3HkvsgzAEr27Q38e5tYJcVsmwBOCXfOq9UsG-PEsGxdqzW2dPxovEGBBUszaRJmLhz8zZiVF4AfW5ScaBhuIZwjG-MD48v5KIsE" },
    { name: "WorkBox - Bitexco", location: "Quận 1, TP. Hồ Chí Minh", status: "maintenance", rooms: 5, price: "180.000đ/giờ", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZSsOOBTID--thi2z2K0BDWiLNrj245lfWTP4eqzyBb0A3NN0e5io7pX8BXtVCJW95VXZ9LLUy-Q_X2IjvBalGdH8hx1LErdKK5nedJrKR9WII2uoo0pIQOJSaja5vf7mOzwZu0UteywrqoMr8o2khB15pM2uXOHj_7TzDc7SO_Ee19qF001xkUpf7NmmQMLEnCWhoDmliJq7Onp8my-cNfW4JqXpdjF1GNmIEyDVya8-_wJ_YuxzJ3z51DkhbkbdbyUe0hc-RKbE4" },
    { name: "SleepStation Đà Nẵng", location: "Hải Châu, Đà Nẵng", status: "active", rooms: 12, price: "200.000đ/giờ", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCcOBhItxKSk4jbANtVThiZlvyZWBFews7qlC4NNCs11Ex6XrCmNx-eM78gyoqBUsvF1DAxRzJNZU5sXXkloxXeix16w-2F5A_XL07wiPSNPcs9_qgA3k0bpnRAhlyzRxG9z6NXekJxLmiBJyD_jcuZDrrRGMcGCE9nVm4hKOTW14wN539rzirC7O10MD2IYDdOcj8RMAKQ6i39Jm63FzxjBI8rNwqQHaQVoqi5vYPHhv4BekjAa6DproE9kPcXIlWFMJJk-0FTIt_g" },
  ];

  return (
    <div className="p-6">
      <header className="sticky top-0 z-10 bg-[#f7f6f8]/80 backdrop-blur-md pb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Quản lý cơ sở</h2>
            <p className="text-slate-500 mt-1">Quản lý các điểm lưu trữ và không gian của bạn</p>
          </div>
          <button type="button" className="bg-[#351a5b] hover:bg-[#351a5b]/90 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#351a5b]/20">
            <span className="material-symbols-outlined">add_circle</span>
            Thêm cơ sở mới
          </button>
        </div>
        <div className="flex gap-8 mt-8 border-b border-[#351a5b]/10">
          {tabs.map(({ id, label }) => (
            <button key={id} type="button" onClick={() => setActiveTab(id)} className={`pb-4 text-sm font-medium transition-colors ${activeTab === id ? "text-[#351a5b] font-bold border-b-2 border-[#351a5b]" : "text-slate-500 hover:text-[#351a5b]"}`}>
              {label}
            </button>
          ))}
        </div>
      </header>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
        {facilities.map((f) => (
          <div key={f.name} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#351a5b]/5 hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-52 h-48 md:h-auto relative">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${f.img}')` }} />
                <div className={`absolute top-3 left-3 text-white text-[10px] font-bold uppercase px-2 py-1 rounded-full ${f.status === "active" ? "bg-green-500" : "bg-orange-500"}`}>
                  {f.status === "active" ? "Đang hoạt động" : "Bảo trì"}
                </div>
              </div>
              <div className="flex-1 p-5 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 leading-tight">{f.name}</h3>
                    <div className="flex items-center gap-1 text-slate-500 text-sm mt-1">
                      <span className="material-symbols-outlined text-sm">location_on</span>
                      {f.location}
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked={f.status === "active"} className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#351a5b]" />
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-4 my-4">
                  <div className="bg-[#351a5b]/5 p-2 rounded-lg">
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Số phòng</p>
                    <p className="font-bold text-[#351a5b]">{f.rooms} Phòng</p>
                  </div>
                  <div className="bg-[#351a5b]/5 p-2 rounded-lg">
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Giá thuê</p>
                    <p className="font-bold text-[#351a5b]">{f.price}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-auto">
                  <Link to="/host/sleepboxes" className="flex-1 bg-[#351a5b]/10 hover:bg-[#351a5b]/20 text-[#351a5b] py-2 rounded-lg font-bold text-sm transition-colors text-center">
                    Chi tiết
                  </Link>
                  <button type="button" className="flex-1 border border-slate-200 hover:bg-slate-50 text-slate-700 py-2 rounded-lg font-bold text-sm transition-colors flex items-center justify-center gap-1">
                    <span className="material-symbols-outlined text-sm">edit</span>
                    Chỉnh sửa
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="bg-[#351a5b]/5 rounded-2xl border-2 border-dashed border-[#351a5b]/20 flex flex-col items-center justify-center p-8 text-center cursor-pointer hover:bg-[#351a5b]/10 transition-colors min-h-[220px]">
          <div className="w-12 h-12 rounded-full bg-[#351a5b]/20 flex items-center justify-center mb-3">
            <span className="material-symbols-outlined text-[#351a5b] text-3xl">add</span>
          </div>
          <h3 className="font-bold text-[#351a5b]">Thêm cơ sở mới</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-[200px]">Mở rộng mạng lưới kinh doanh của bạn tại BoxHub</p>
        </div>
      </div>
      <div className="mt-6 p-6">
        <div className="bg-white p-6 rounded-2xl border border-[#351a5b]/5">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">Tổng quan hoạt động</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                <span className="material-symbols-outlined">hotel</span>
              </div>
              <div>
                <p className="text-2xl font-black">27</p>
                <p className="text-xs text-slate-500 font-medium">Tổng số đơn vị</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 text-green-600 rounded-xl">
                <span className="material-symbols-outlined">trending_up</span>
              </div>
              <div>
                <p className="text-2xl font-black">84%</p>
                <p className="text-xs text-slate-500 font-medium">Tỷ lệ lấp đầy</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#351a5b]/10 text-[#351a5b] rounded-xl">
                <span className="material-symbols-outlined">payments</span>
              </div>
              <div>
                <p className="text-2xl font-black">42.5M</p>
                <p className="text-xs text-slate-500 font-medium">Doanh thu tháng (VND)</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 text-yellow-600 rounded-xl">
                <span className="material-symbols-outlined">star</span>
              </div>
              <div>
                <p className="text-2xl font-black">4.8</p>
                <p className="text-xs text-slate-500 font-medium">Đánh giá trung bình</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostFacilities;
