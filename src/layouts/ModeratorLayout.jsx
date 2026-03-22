import React from "react";
import { Outlet } from "react-router-dom";
import { useInternalLogout } from "../hooks/useInternalLogout";

const ModeratorLayout = () => {
  const signOutInternal = useInternalLogout();

  return (
    <div className="flex min-h-screen">
      <aside className="flex min-h-screen w-48 flex-col bg-yellow-600 p-4 text-white">
        <div className="mb-4 text-xl font-bold">Moderator</div>
        <ul className="space-y-2">
          <li>User Management</li>
          <li>Facility Approval</li>
        </ul>
        <div className="mt-auto border-t border-white/20 pt-4">
          <button
            type="button"
            onClick={signOutInternal}
            className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm font-semibold hover:bg-white/10"
          >
            <span className="material-symbols-outlined text-lg">logout</span>
            Sign out
          </button>
        </div>
      </aside>
      <div className="flex-1 bg-gray-50">
        <header className="bg-white p-4 shadow">Moderator Header</header>
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ModeratorLayout;
