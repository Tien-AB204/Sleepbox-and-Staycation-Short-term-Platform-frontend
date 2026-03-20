import axios from "../config/axios";

// --- Mock guest login (khi chưa có backend) ---
function createMockToken(payload) {
  // JWT payload dạng base64 để jwtDecode của AuthContext đọc được
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payloadStr = btoa(JSON.stringify(payload));
  return `${header}.${payloadStr}.mock-signature`;
}

function isMockGuestCredentials(email, password) {
  if (!password || password.toString() !== "1") return false;
  const e = (email || "").trim().toLowerCase();
  if (!e) return false;

  const localPart = e.split("@")[0];
  return e === "trungkien" || localPart === "trungkien" || e.includes("trungkien");
}

export const login = async (email, password) => {
  try {
    const res = await axios.post("/api/auth/guest/login", { email, password });
    return res.data; // { accessToken, user: { ... } }
  } catch (err) {
    // Fallback mock cho guest
    if (isMockGuestCredentials(email, password)) {
      const e = (email || "").trim().toLowerCase();
      const localPart = e.split("@")[0] || "guest";
      const name =
        localPart.length > 0
          ? localPart.charAt(0).toUpperCase() + localPart.slice(1)
          : "Guest";

      return {
        accessToken: createMockToken({ role: "guest", email: e, name }),
        user: { role: "guest", email: e, name },
      };
    }

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
