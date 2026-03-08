import React from "react";
import { Outlet } from "react-router-dom";

const ModeratorLayout = () => (
  <div className="min-h-screen flex">
    <aside className="w-48 bg-yellow-600 text-white p-4 min-h-screen">
      <div className="font-bold text-xl mb-4">Moderator</div>
      <ul className="space-y-2">
        <li>User Management</li>
        <li>Facility Approval</li>
      </ul>
    </aside>
    <div className="flex-1 bg-gray-50">
      <header className="bg-white shadow p-4">Moderator Header</header>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  </div>
);

export default ModeratorLayout;
