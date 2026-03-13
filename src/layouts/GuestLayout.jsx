import React from "react";
import { Outlet, Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

const GuestLayout = () => {
  const { user, logout } = useAuthContext();

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#f7f6f8] font-sans text-slate-900 transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-[#351a5b]/10 bg-[#f7f6f8]/80 backdrop-blur-md px-6 md:px-20 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[#351a5b]">
          <span className="material-symbols-outlined text-3xl font-bold">
            bedroom_child
          </span>
          <h2 className="text-xl font-extrabold tracking-tight">BoxHub</h2>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a
            className="text-sm font-semibold hover:text-[#351a5b] transition-colors"
            href="#"
          >
            Find a box
          </a>
          <a
            className="text-sm font-semibold hover:text-[#351a5b] transition-colors"
            href="#"
          >
            List your space
          </a>
          <a
            className="text-sm font-semibold hover:text-[#351a5b] transition-colors"
            href="#"
          >
            Help
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-[#351a5b]/10 rounded-full transition-colors">
            <span className="material-symbols-outlined text-2xl">language</span>
          </button>
          <button className="flex items-center gap-2 p-2 border border-[#351a5b]/20 rounded-full hover:shadow-md transition-all bg-white">
            <span className="material-symbols-outlined text-2xl">menu</span>
            <span className="material-symbols-outlined text-3xl text-slate-400">
              account_circle
            </span>
          </button>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-100 border-t border-slate-200 px-6 md:px-20 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="font-bold mb-4">Hỗ trợ</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <a className="hover:underline" href="#">
                  Trung tâm trợ giúp
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#">
                  AirCover
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#">
                  Chống phân biệt đối xử
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#">
                  Hỗ trợ người khuyết tật
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Đón tiếp khách</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <a className="hover:underline" href="#">
                  Cho thuê BoxHub
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#">
                  AirCover cho Chủ nhà
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#">
                  Tài nguyên về đón tiếp khách
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#">
                  Diễn đàn cộng đồng
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">BoxHub</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <a className="hover:underline" href="#">
                  Trang tin tức
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#">
                  Tìm hiểu các tính năng mới
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#">
                  Cơ hội nghề nghiệp
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#">
                  Nhà đầu tư
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Theo dõi chúng tôi</h4>
            <div className="flex gap-4">
              <span className="material-symbols-outlined cursor-pointer hover:text-[#351a5b]">
                social_leaderboard
              </span>
              <span className="material-symbols-outlined cursor-pointer hover:text-[#351a5b]">
                share
              </span>
              <span className="material-symbols-outlined cursor-pointer hover:text-[#351a5b]">
                alternate_email
              </span>
            </div>
            <div className="mt-6">
              <button className="flex items-center gap-2 text-sm font-bold border border-slate-300 px-4 py-2 rounded-lg">
                <span className="material-symbols-outlined text-sm">
                  language
                </span>{" "}
                Tiếng Việt (VN)
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>
            © 2024 BoxHub, Inc. · Quyền riêng tư · Điều khoản · Sơ đồ trang web
          </p>
          <div className="flex gap-4 font-bold">
            <a className="hover:underline" href="#">
              Hồ Chí Minh
            </a>
            <a className="hover:underline" href="#">
              Hà Nội
            </a>
            <a className="hover:underline" href="#">
              Đà Nẵng
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GuestLayout;
