import axios from "axios";

const instance = axios.create({
  baseURL: "https://boxhub-sleepbox-platform-backend.onrender.com/api", 
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// =========================================================================
// 1. REQUEST INTERCEPTOR: Kẻ chặn đường trước khi gửi API
// =========================================================================
instance.interceptors.request.use(
  (config) => {
    // Moi token từ localStorage (Lưu ý: Check xem AuthContext của bạn đang lưu key là gì, thường là "accessToken")
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
// 2. RESPONSE INTERCEPTOR: Kẻ chặn đường khi Backend trả dữ liệu về
// =========================================================================
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Nếu Backend chửi 401 Unauthorized (do token hết hạn hoặc sai)
    if (error.response && error.response.status === 401) {
      console.warn("Token hết hạn hoặc không hợp lệ. Đang đá văng ra login...");
      // Mở khóa 2 dòng dưới nếu bạn muốn tự động đá user về trang đăng nhập khi token chết:
      // localStorage.removeItem("accessToken");
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default instance;