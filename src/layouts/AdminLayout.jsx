import React from "react";
import { Outlet } from "react-router-dom";

const AdminLayout = () => (
  <div className="min-h-screen flex">
    <aside className="w-48 bg-red-700 text-white p-4 min-h-screen">
      <div className="font-bold text-xl mb-4">Admin</div>
      <ul className="space-y-2">
        <li>Dashboard</li>
        <li>System Config</li>
      </ul>
    </aside>
    <div className="flex-1 bg-gray-50">
      <header className="bg-white shadow p-4">Admin Header</header>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  </div>
);

export default AdminLayout;
