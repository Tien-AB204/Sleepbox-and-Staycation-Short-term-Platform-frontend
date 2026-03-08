import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { LogOut, User, Home, BookOpen } from "lucide-react";

const GuestLayout = () => {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow p-4 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-xl">
          <img
            src="/assets/images/logo.png"
            alt="BoxHub"
            className="h-8 w-8 object-contain"
          />
          BoxHub
        </div>
        <nav>
          <ul className="flex gap-6 text-gray-700 font-medium">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 flex items-center gap-1"
                    : "flex items-center gap-1 hover:text-blue-500"
                }
                end
              >
                <Home size={18} /> Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/search"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 flex items-center gap-1"
                    : "flex items-center gap-1 hover:text-blue-500"
                }
              >
                <BookOpen size={18} /> My Bookings
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 flex items-center gap-1"
                    : "flex items-center gap-1 hover:text-blue-500"
                }
              >
                <User size={18} /> Profile
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          {user && (
            <>
              <span className="font-semibold text-gray-800">
                {user.name || user.email}
              </span>
              <button
                onClick={handleLogout}
                className="ml-2 flex items-center gap-1 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm text-gray-700"
              >
                <LogOut size={16} /> Đăng xuất
              </button>
            </>
          )}
        </div>
      </header>
      <main className="flex-1 bg-gray-50 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default GuestLayout;
