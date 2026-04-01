import axios from "axios";

/** Dev: cùng origin + proxy Vite → tránh CORS. Prod: gọi thẳng Render (backend cần bật CORS cho domain FE). */
const API_ORIGIN =
  import.meta.env.VITE_API_ORIGIN != null && String(import.meta.env.VITE_API_ORIGIN).trim() !== ""
    ? String(import.meta.env.VITE_API_ORIGIN).replace(/\/$/, "")
    : import.meta.env.DEV
      ? ""
      : "https://boxhub-sleepbox-platform-backend.onrender.com";

const baseURL = `${API_ORIGIN}/api`;

const instance = axios.create({
  baseURL,
  timeout: 15000,
});

// Optional: Add interceptors for auth, error handling, etc.
// instance.interceptors.request.use(...)
// instance.interceptors.response.use(...)

export default instance;
