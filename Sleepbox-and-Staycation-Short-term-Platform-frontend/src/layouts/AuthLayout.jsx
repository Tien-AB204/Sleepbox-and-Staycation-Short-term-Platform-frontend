import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left: Background image */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-500 to-indigo-700 items-center justify-center">
        {/* Replace with your image or logo */}
        <img
          src="/assets/images/auth-bg.jpg"
          alt="Auth Background"
          className="w-3/4 rounded-xl shadow-2xl"
        />
      </div>
      {/* Right: Form */}
      <div className="flex flex-1 items-center justify-center bg-white">
        <div className="w-full max-w-md p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
