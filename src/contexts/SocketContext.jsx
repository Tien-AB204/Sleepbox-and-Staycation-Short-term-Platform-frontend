import React, { createContext } from "react";

// Dummy context, real logic sẽ bổ sung sau khi có API socket
const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  // const socket = ... (kết nối socket.io ở đây nếu có)
  return <SocketContext.Provider value={{}}>{children}</SocketContext.Provider>;
};

export default SocketContext;
