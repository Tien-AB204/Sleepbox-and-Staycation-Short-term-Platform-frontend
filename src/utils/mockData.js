import q1 from "../assets/images/quan-1.png"; 
import q3 from "../assets/images/quan-3.png"; 
import q5 from "../assets/images/quan-5.png"; 
import q7 from "../assets/images/quan-7.png"; 
import thuDuc from "../assets/images/thu-duc.png"; 
import binhThanh from "../assets/images/binh-thanh.png";

export const DESTINATIONS = [
  { id: "q1", name: "Quận 1", image: q1, count: 120 },
  { id: "q3", name: "Quận 3", image: q3, count: 85 },
  { id: "q5", name: "Quận 5", image: q5, count: 42 },
  { id: "q7", name: "Quận 7", image: q7, count: 64 },
  { id: "thuduc", name: "Thành phố Thủ Đức", image: thuDuc, count: 92 },
  { id: "binhthanh", name: "Quận Bình Thạnh", image: binhThanh, count: 78 },
];

export const rooms = [
  {
    id: 1,
    name: "Sleepbox Premium 1",
    price: 350000,
    image: "/assets/images/room1.jpg",
    rating: 4.8,
    location: "Quận 1, TP.HCM",
    amenities: ["Wifi", "Điều hòa", "Bàn làm việc", "Tủ đồ", "Khóa vân tay"],
    description:
      "Phòng sleepbox cao cấp, yên tĩnh, đầy đủ tiện nghi, phù hợp nghỉ ngắn hạn.",
    featured: true,
  },
  {
    id: 2,
    name: "Sleepbox Cozy 2",
    price: 280000,
    image: "/assets/images/room2.jpg",
    rating: 4.5,
    location: "Quận 3, TP.HCM",
    amenities: ["Wifi", "Điều hòa", "Tủ đồ"],
    description: "Không gian ấm cúng, riêng tư, giá hợp lý cho khách du lịch.",
    featured: true,
  },
  {
    id: 3,
    name: "Sleepbox Budget",
    price: 190000,
    image: "/assets/images/room3.jpg",
    rating: 4.2,
    location: "Bình Thạnh, TP.HCM",
    amenities: ["Wifi", "Bàn làm việc"],
    description:
      "Phòng nhỏ gọn, tiết kiệm, phù hợp sinh viên hoặc khách công tác.",
    featured: false,
  },
  {
    id: 4,
    name: "Sleepbox Family",
    price: 500000,
    image: "/assets/images/room4.jpg",
    rating: 4.9,
    location: "Phú Nhuận, TP.HCM",
    amenities: [
      "Wifi",
      "Điều hòa",
      "Bàn làm việc",
      "Tủ đồ",
      "Khóa vân tay",
      "Giường đôi",
    ],
    description: "Phòng rộng rãi cho gia đình, tiện nghi hiện đại.",
    featured: true,
  },
  {
    id: 5,
    name: "Sleepbox View City",
    price: 420000,
    image: "/assets/images/room5.jpg",
    rating: 4.7,
    location: "Quận 7, TP.HCM",
    amenities: ["Wifi", "Điều hòa", "View đẹp"],
    description: "View thành phố tuyệt đẹp, không gian mở, ánh sáng tự nhiên.",
    featured: false,
  },
  {
    id: 6,
    name: "Sleepbox Capsule",
    price: 150000,
    image: "/assets/images/room6.jpg",
    rating: 4.0,
    location: "Tân Bình, TP.HCM",
    amenities: ["Wifi"],
    description:
      "Giải pháp tiết kiệm, tiện lợi cho khách đi công tác ngắn ngày.",
    featured: false,
  },
];

export const amenitiesIconMap = {
  Wifi: "Wifi",
  "Điều hòa": "Snowflake",
  "Bàn làm việc": "Briefcase",
  "Tủ đồ": "Archive",
  "Khóa vân tay": "Fingerprint",
  "Giường đôi": "BedDouble",
  "View đẹp": "Eye",
};
