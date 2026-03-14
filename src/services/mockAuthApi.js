/**
 * Mock API cho đăng nhập Host (dùng khi chưa có backend).
 * Chấp nhận bất kỳ email/password nào, trả về token và user role "host".
 */

const MOCK_DELAY_MS = 800;

/** Tạo JWT payload dạng base64 để AuthContext jwtDecode đọc được khi reload */
function createMockToken(payload) {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payloadStr = btoa(JSON.stringify(payload));
  return `${header}.${payloadStr}.mock-signature`;
}

/**
 * Mock đăng nhập Host.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{ accessToken: string, user: { email: string, role: string } }>}
 */
export async function mockHostLogin(email, password) {
  await new Promise((r) => setTimeout(r, MOCK_DELAY_MS));

  // Chấp nhận mọi email/password; có thể giới hạn vài tài khoản mẫu nếu cần
  const user = {
    email: email.trim(),
    role: "host",
    name: email.split("@")[0] || "Host",
  };

  const accessToken = createMockToken({
    role: "host",
    email: user.email,
    name: user.name,
  });

  return {
    accessToken,
    user,
  };
}
