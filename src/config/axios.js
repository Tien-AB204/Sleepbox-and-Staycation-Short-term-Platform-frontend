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
    // Nhận diện xem API đang gọi có thuộc luồng OTP / Đăng ký Host không
    const isAuthOrRegisterAPI = config.url && (
      config.url.includes('/otp/') || 
      config.url.includes('/host/register/')
    );

    // NẾU KHÔNG PHẢI ĐĂNG KÝ HOST -> Mới được phép nhét Token mặc định vào
    if (!isAuthOrRegisterAPI) {
      const token = localStorage.getItem("accessToken"); 
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    // NẾU LÀ ĐĂNG KÝ HOST -> Để nguyên hiện trạng, không được đụng vào!
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
    const originalRequest = error.config;
    
    // FIX TỘI ÁC 2: Kiểm tra xem API đang gọi có phải là API đăng ký / OTP không
    const isAuthOrRegisterAPI = originalRequest && (
      originalRequest.url.includes('/otp/') || 
      originalRequest.url.includes('/host/register/')
    );

    // Nếu Backend báo 401 và KHÔNG PHẢI là luồng đăng ký thì mới đá văng ra Login
    if (error.response && error.response.status === 401 && !isAuthOrRegisterAPI) {
      console.warn("Token hết hạn hoặc không hợp lệ.");
      localStorage.removeItem("accessToken");
      window.location.href = "/internal/login";
    }
    return Promise.reject(error);
  }
);

export default instance;