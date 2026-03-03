import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { rooms, amenitiesIconMap } from "../../utils/mockData";
import { Star, ArrowLeft } from "lucide-react";
import * as LucideIcons from "lucide-react";

const RoomDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const room = rooms.find((r) => r.id === Number(id));

  if (!room)
    return (
      <div className="text-center text-gray-500">Không tìm thấy phòng.</div>
    );

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">
      <button
        className="mb-4 flex items-center gap-1 text-blue-600 hover:underline"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={18} /> Quay lại
      </button>
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={room.image}
          alt={room.name}
          className="w-full md:w-2/5 h-64 object-cover rounded-lg"
        />
        <div className="flex-1 flex flex-col">
          <h2 className="text-2xl font-bold mb-2">{room.name}</h2>
          <div className="flex items-center gap-2 mb-2">
            <span className="flex items-center gap-1 text-yellow-500 font-medium">
              <Star size={18} fill="#facc15" className="inline" />
              {room.rating}
            </span>
            <span className="text-gray-500">| {room.location}</span>
          </div>
          <div className="font-bold text-blue-700 text-xl mb-2">
            {room.price.toLocaleString()}đ / đêm
          </div>
          <div className="mb-3 text-gray-700">{room.description}</div>
          <div className="mb-4">
            <div className="font-semibold mb-1">Tiện ích:</div>
            <div className="flex flex-wrap gap-3">
              {room.amenities.map((a) => {
                const Icon =
                  LucideIcons[amenitiesIconMap[a]] || LucideIcons["Check"];
                return (
                  <span
                    key={a}
                    className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium"
                  >
                    <Icon size={16} /> {a}
                  </span>
                );
              })}
            </div>
          </div>
          <button className="mt-auto bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;
