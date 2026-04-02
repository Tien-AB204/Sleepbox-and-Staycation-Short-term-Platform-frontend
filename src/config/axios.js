import axios from "axios";

// =========================================================================
// CẤU HÌNH BASE URL (ĐANG ACTIVE: THUẦN RENDER)
// Ưu tiên bắn thẳng lên server thật để test dữ liệu chuẩn.
// =========================================================================
const baseURL = "https://boxhub-sleepbox-platform-backend.onrender.com/api";

/* // =========================================================================
// ĐOẠN CODE BACKUP DÀNH CHO TEAM (LOCAL + RENDER)
// Mở comment đoạn này (và comment dòng baseURL ở trên) nếu muốn chạy dev qua Proxy của Vite để né CORS khi code local.
// =========================================================================
// const API_ORIGIN = import.meta.env.VITE_API_ORIGIN != null && String(import.meta.env.VITE_API_ORIGIN).trim() !== ""
//   ? String(import.meta.env.VITE_API_ORIGIN).replace(/\/$/, "")
//   : import.meta.env.DEV
//     ? "" // Nếu là môi trường Dev, để chuỗi rỗng để Vite Proxy (trong vite.config.js) tự động mồi URL
//     : "https://boxhub-sleepbox-platform-backend.onrender.com";
//
// const baseURL = `${API_ORIGIN}/api`;
*/

const instance = axios.create({
  baseURL: baseURL,
  timeout: 15000,
});

// =========================================================================
// 1. REQUEST INTERCEPTOR: Tự động đính kèm Token
// =========================================================================
instance.interceptors.request.use(
  (config) => {
    // Đọc token từ localStorage
    const token = localStorage.getItem("accessToken"); 
    
    // Nếu có token, tự động nhét vào Header Authorization
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// =========================================================================
// 2. RESPONSE INTERCEPTOR: Xử lý lỗi từ Backend trả về
// =========================================================================
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Nếu Backend báo 401 Unauthorized (Token hết hạn hoặc bị sai)
    if (error.response && error.response.status === 401) {
      console.warn("Token hết hạn hoặc không hợp lệ.");
      // Mở khóa 2 dòng dưới nếu muốn tự động đá user về trang đăng nhập khi token chết:
      localStorage.removeItem("accessToken");
      window.location.href = "/internal/login";
    }
    return Promise.reject(error);
  }
);

export default instance;