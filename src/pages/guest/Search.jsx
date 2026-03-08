import React, { useState } from "react";
import { rooms } from "../../utils/mockData";
import { Search, MapPin, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const navigate = useNavigate();

  // Lọc dữ liệu giả
  const filteredRooms = rooms.filter((room) => {
    const matchName = room.name.toLowerCase().includes(query.toLowerCase());
    const matchLocation = location
      ? room.location.toLowerCase().includes(location.toLowerCase())
      : true;
    const matchMin = minPrice ? room.price >= Number(minPrice) : true;
    const matchMax = maxPrice ? room.price <= Number(maxPrice) : true;
    return matchName && matchLocation && matchMin && matchMax;
  });

  return (
    <div>
      <div className="bg-white rounded-xl shadow p-4 mb-6 flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-1 flex gap-2 items-center">
          <Search size={20} className="text-gray-400" />
          <input
            type="text"
            placeholder="Tìm tên phòng, tiện ích..."
            className="flex-1 border-none outline-none bg-transparent text-base"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 items-center">
          <MapPin size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Khu vực (Quận, TP)"
            className="border rounded px-2 py-1 text-sm"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="flex gap-2 items-center">
          <Filter size={18} className="text-gray-400" />
          <input
            type="number"
            placeholder="Giá từ"
            className="border rounded px-2 py-1 w-20 text-sm"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            min={0}
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Giá đến"
            className="border rounded px-2 py-1 w-20 text-sm"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            min={0}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredRooms.length === 0 && (
          <div className="col-span-full text-center text-gray-500">
            Không tìm thấy phòng phù hợp.
          </div>
        )}
        {filteredRooms.map((room) => (
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
                <span className="text-blue-700 font-bold">
                  {room.price.toLocaleString()}đ
                </span>
              </div>
              <div className="text-gray-500 text-sm mb-2">{room.location}</div>
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

export default SearchPage;
