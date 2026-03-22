/**
 * Mock đăng nhập — bật bằng VITE_MOCK_AUTH=true (.env.development)
 *
 * Tài khoản thử:
 * - guest@boxhub.local / Guest@123     → guest
 * - host@boxhub.local / Host@123       → host
 * - staff@boxhub.local / Staff@123     → staff (portal Staff)
 * - mod@boxhub.local / Mod@123         → moderator
 * - admin@boxhub.local / Admin@123     → admin
 */

function b64urlSegment(obj) {
  const json = typeof obj === "string" ? obj : JSON.stringify(obj);
  return btoa(unescape(encodeURIComponent(json)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

/** JWT không ký — jwt-decode đọc được; payload có role, email, userId cho AuthContext */
export function createMockAccessToken({ userId, email, role }) {
  const header = b64urlSegment({ alg: "none", typ: "JWT" });
  const payload = b64urlSegment({
    sub: String(userId),
    userId,
    email,
    role,
    iat: Math.floor(Date.now() / 1000),
  });
  return `${header}.${payload}.x`;
}

const ACCOUNTS = [
  { email: "guest@boxhub.local", password: "Guest@123", role: "guest", userId: "mock-guest-1" },
  { email: "host@boxhub.local", password: "Host@123", role: "host", userId: "mock-host-1" },
  { email: "staff@boxhub.local", password: "Staff@123", role: "staff", userId: "mock-staff-1" },
  { email: "mod@boxhub.local", password: "Mod@123", role: "moderator", userId: "mock-mod-1" },
  { email: "admin@boxhub.local", password: "Admin@123", role: "admin", userId: "mock-admin-1" },
];

function findAccount(email, password) {
  const e = email.trim().toLowerCase();
  return ACCOUNTS.find((a) => a.email === e && a.password === password);
}

/**
 * Giống response API thật: { accessToken, userId, email, role }
 */
export function mockLogin(email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const acc = findAccount(email, password);
      if (!acc) {
        reject("Sai email hoặc mật khẩu.");
        return;
      }
      resolve({
        accessToken: createMockAccessToken({
          userId: acc.userId,
          email: acc.email,
          role: acc.role,
        }),
        userId: acc.userId,
        email: acc.email,
        role: acc.role,
      });
    }, 400);
  });
}

export function isMockAuthEnabled() {
  return import.meta.env.VITE_MOCK_AUTH === "true";
}
