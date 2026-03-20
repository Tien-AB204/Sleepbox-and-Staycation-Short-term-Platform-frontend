import axios from "../config/axios";

export const login = async (email, password) => {
  try {
    const res = await axios.post("/api/auth/login", { email, password });
    return res.data; // { accessToken, user: { ... } }
  } catch (err) {
    throw err.response?.data?.message || "Đăng nhập thất bại";
  }
};

export const register = async ({ email, password, confirmPassword }) => {
  try {
    const res = await axios.post("/api/auth/guest/register", {
      email,
      password,
      confirmPassword,
    });
    return res.data; // { message: 'Đăng ký thành công', ... }
  } catch (err) {
    throw err.response?.data?.message || "Đăng ký thất bại";
  }
};
