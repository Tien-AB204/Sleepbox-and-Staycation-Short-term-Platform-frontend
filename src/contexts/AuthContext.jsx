import React, { createContext, useState, useEffect, useContext } from "react";
// Không cần dùng jwt-decode ở đây nữa để tránh rắc rối với định dạng claim của Backend

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lúc F5, lấy cả token và thông tin user đã lưu ra
    const token = localStorage.getItem("accessToken");
    const savedUser = localStorage.getItem("loggedInUser");

    if (token && savedUser) {
      try {
        // Phục hồi lại state user hệt như lúc mới login
        setUser(JSON.parse(savedUser));
      } catch (e) {
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    // Chuẩn hóa data để lưu
    const fullUserData = { ...userData, token };
    
    // Lưu vào ổ cứng để chống F5
    localStorage.setItem("accessToken", token);
    localStorage.setItem("loggedInUser", JSON.stringify(fullUserData));
    
    // Lưu vào RAM (State) để UI cập nhật ngay lập tức
    setUser(fullUserData);
  };

  const logout = () => {
    // Dọn dẹp sạch sẽ khi đăng xuất
    localStorage.removeItem("accessToken");
    localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);