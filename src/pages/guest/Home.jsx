import React from "react";
import { rooms } from "../../utils/mockData";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const featuredRooms = rooms.filter((r) => r.featured);

  return (
    <div>
      {/* Hero section */}
      <div className="relative bg-gradient-to-br from-blue-500 to-indigo-700 rounded-2xl p-8 mb-10 flex flex-col md:flex-row items-center justify-between overflow-hidden">
        <div className="text-white max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Khám phá Sleepbox & Staycation hiện đại
          </h1>
          <p className="mb-6 text-lg">
            Đặt phòng nhanh chóng, tiện nghi, giá tốt. Trải nghiệm không gian
            nghỉ ngơi đẳng cấp tại BoxHub!
          </p>
          <button
            className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-100 transition"
            onClick={() => navigate("/search")}
          >
            Tìm phòng ngay
          </button>
        </div>
        <img
          src="/assets/images/hero-sleepbox.png"
          alt="Sleepbox Hero"
          className="w-72 md:w-96 drop-shadow-2xl hidden md:block"
        />
      </div>
      {/* Danh sách phòng nổi bật */}
      <h2 className="text-2xl font-bold mb-4">Phòng nổi bật</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {featuredRooms.map((room) => (
          <div
            key={room.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer overflow-hidden flex flex-col"
            onClick={() => navigate(`/room/${room.id}`)}
          >
            <img
              src={room.image}
              alt={room.name}
              className="h-48 w-full object-cover"
            />
            <div className="p-4 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-lg truncate">{room.name}</h3>
                <span className="flex items-center gap-1 text-yellow-500 font-medium">
                  <Star size={16} fill="#facc15" className="inline" />
                  {room.rating}
                </span>
              </div>
              <div className="text-gray-500 text-sm mb-2">{room.location}</div>
              <div className="font-bold text-blue-700 text-lg mb-2">
                {room.price.toLocaleString()}đ / đêm
              </div>
              <div className="flex flex-wrap gap-2 mt-auto">
                {room.amenities.slice(0, 3).map((a) => (
                  <span
                    key={a}
                    className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium"
                  >
                    {a}
                  </span>
                ))}
                {room.amenities.length > 3 && (
                  <span className="text-xs text-gray-400">
                    +{room.amenities.length - 3} tiện ích
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
