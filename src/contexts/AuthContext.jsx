import React, { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { role, token, ... }
  const [loading, setLoading] = useState(true);

  // Tạo token mock để jwtDecode đọc được payload role/email/name
  // (dùng cho bước "trở thành host" giả lập chuyển role)
  const createMockToken = (payload) => {
    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
    const payloadStr = btoa(JSON.stringify(payload));
    return `${header}.${payloadStr}.mock-signature`;
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ ...decoded, token });
      } catch (e) {
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("accessToken", token);
    setUser({ ...userData, token });
  };

  const switchRole = (nextRole) => {
    if (!user) return;

    const email = user.email || "";
    const name = user.name || (email ? email.split("@")[0] : nextRole);
    const token = createMockToken({ role: nextRole, email, name });

    localStorage.setItem("accessToken", token);
    setUser({ role: nextRole, email, name, token });
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
