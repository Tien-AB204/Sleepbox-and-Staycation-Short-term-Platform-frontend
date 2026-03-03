import React from "react";
import { Outlet } from "react-router-dom";

const HostLayout = () => (
  <div className="min-h-screen flex">
    <aside className="w-56 bg-indigo-700 text-white p-4 min-h-screen">
      <div className="font-bold text-2xl mb-6">Host Panel</div>
      <ul className="space-y-2">
        <li>Dashboard</li>
        <li>Quản lý cơ sở</li>
        <li>Quản lý phòng</li>
      </ul>
    </aside>
    <div className="flex-1 bg-gray-50">
      <header className="bg-white shadow p-4">Host Header</header>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  </div>
);

export default HostLayout;
