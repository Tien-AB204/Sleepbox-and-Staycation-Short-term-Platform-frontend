import React from 'react';

const Favorites = () => {
  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 lg:px-0 py-8">
      <h1 className="text-2xl font-bold text-[#1e1b4b] mb-6">Danh sách Yêu thích</h1>
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-sm">
        <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">favorite</span>
        <h3 className="text-lg font-bold text-slate-700">Lưu lại những chỗ nghỉ bạn thích</h3>
        <p className="text-slate-500 mt-2">Bấm vào biểu tượng trái tim trên các chỗ nghỉ để lưu lại vào danh sách này.</p>
      </div>
    </div>
  );
};

export default Favorites;