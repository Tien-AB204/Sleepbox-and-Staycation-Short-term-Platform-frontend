import axios from "axios";

const instance = axios.create({
  baseURL: "https://boxhub-sleepbox-platform-backend.onrender.com",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add interceptors for auth, error handling, etc.
// instance.interceptors.request.use(...)
// instance.interceptors.response.use(...)

export default instance;
