import React from "react";
import { Outlet } from "react-router-dom";

// Host pages nhúng trực tiếp UI từ stitch (đã có sidebar/header riêng),
// nên layout chỉ render Outlet để tránh bị "double sidebar".
const HostLayout = () => (
  <div className="min-h-screen bg-background-light">
    <Outlet />
  </div>
);

export default HostLayout;
