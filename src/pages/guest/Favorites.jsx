import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Favorites = () => {
  const navigate = useNavigate();
  // Giả sử mảng này lấy từ ROOM_DATA, trong thực tế bạn nên export ROOM_DATA ra file riêng
  const [favoriteIds, setFavoriteIds] = useState(() => {
    const saved = localStorage.getItem("boxhub_favorites");
    return saved ? JSON.parse(saved) : [];
  });

  // Ở đây tôi mock lại ROOM_DATA để ví dụ hiển thị
  const ALL_ROOMS = [
    { id: 1, title: "CyberBox Quận 1 - Premium Pod", image: "https://images.unsplash.com/photo-1596120236172-231999844ade?w=500", price: "85.000", location: "Quận 1" },
    { id: 2, title: "EcoBox Bình Thạnh - Cozy Corner", image: "https://images.unsplash.com/photo-1555854817-5b2260d538bb?w=500", price: "70.000", location: "Bình Thạnh" },
    { id: 3, title: "ZenBox Quận 3 - Quiet Zone", image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=500", price: "65.000", location: "Quận 3" }
  ];

  const favoriteRooms = ALL_ROOMS.filter(room => favoriteIds.includes(room.id));

  const removeFavorite = (id) => {
    const newFavs = favoriteIds.filter(favId => favId !== id);
    setFavoriteIds(newFavs);
    localStorage.setItem("boxhub_favorites", JSON.stringify(newFavs));
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 lg:px-0 py-8 min-h-screen">
      <h1 className="text-2xl font-black text-[#1e1b4b] mb-8 uppercase tracking-tight">Danh sách Yêu thích</h1>
      
      {favoriteRooms.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {favoriteRooms.map(room => (
            <div key={room.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all group">
              <div className="relative aspect-video">
                <img src={room.image} className="w-full h-full object-cover" />
                <button 
                  onClick={() => removeFavorite(room.id)}
                  className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full text-red-500 shadow-sm"
                >
                  <span className="material-symbols-outlined fill-1">favorite</span>
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-slate-800 line-clamp-1">{room.title}</h3>
                <p className="text-xs text-slate-500 mt-1">{room.location}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="font-black text-[#4059AD]">{room.price} VND</span>
                  <button onClick={() => navigate(`/room/${room.id}`)} className="text-[10px] font-bold uppercase text-[#4059AD] hover:underline">Chi tiết</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center shadow-sm">
          <span className="material-symbols-outlined text-6xl text-slate-200 mb-4">favorite</span>
          <h3 className="text-lg font-bold text-slate-700">Chưa có cơ sở nào được thích</h3>
          <p className="text-slate-400 mt-2 max-w-sm mx-auto font-medium">Bấm vào biểu tượng trái tim trên các chỗ nghỉ để lưu lại vào danh sách này.</p>
          <button onClick={() => navigate('/search')} className="mt-6 bg-[#4059AD] text-white px-6 py-2 rounded-xl font-bold text-sm">Tìm kiếm ngay</button>
        </div>
      )}
    </div>
  );
};

export default Favorites;