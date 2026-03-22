import React from "react";

const IMG = {
  listing1:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAnDfbIPkFXEu2IOdNcqn6n-yiPAyclvahzGf7Uot9_A8rmevLGadhgO7hDJgztgo6rDT8vuXiRGw6cmQHoDfg2kQauzIpN75J3utHjk_gMsr2i5Q16GBiyhKgT0AqZ-c_jzUlqk5knyHwQVMox0usqZt1T9zmIEfDewhaaYin5fC7OMYC-ND7RX4pHIAR4IRRKJU5VBUHWSjdVGqkOiTIFhrSxfWMPbj-FGOeU80GQEbSuW8rB3elCx12vtVt2dtduZZL6Hd3czKuQ",
  listing2:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDjiZ_lG0cIfbipwJO2gqsyhm8OUmviX7xg2vV8L-OV3hHjqHtHw6DnOSVx4i-vVAHugL_XWPY13fh2NpE3wR1vFPD0kmH5pugN_pGIih_N2XJGIJ587dbIzg7zGxZYb6NSaZylJ0QDYJHZ7ayDjhOYhSFxk9MF7UmdxElk5poZ9dzeAoEaSu_aMA-oBzNj9w4nDtxTvKGp-s1luWHpOMSR_CkJhHxEj3P2FgPqp2_pnQgMAWqZD06_h8UQ7r-dmE5PTOVxOtOggiVv",
  listing3:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAckDZE3ZvoXQ9E-kh0pFVgXS158NgIUlOaZFl4lU9MJTV6UWPbp8VnZLQ-wyYGIjUcJZ6z4cDqQwem4b9-k2I_xO4uSvo8Y2B8j7O6b0ibtz748vyJ6h7Xq88Jtrh9XY32OBbIaJo_qzALKCVPpXK628zi_hMv2ZrzFtY9PmbImUV_pfuhfYKomBrIrS9QDrCVGuagKFB6fZ4mKi5JtUMLfZec0yG-qo-AdYDUsJAUvF3EUkHdDW9q57cqScmIzu52H6cN7e5D-xOW",
  g1: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9ZhkDhn9gRUdAVXG5vlYsb5k2uq7nzzRWoW0Q0X6ljhpo501XvdsuYUHE-iX3Q_oDBNRhrACKGV7dfkmN9W6WKHT7ZQmCpU86DDNTNjcIPyiGikBeupOGTDFSeg5bBSBUUV7O4GLFu6SO4wmZbmYKr0x6NMV_os1o9tpGG40mT1BofDUrroT1qW4TCGb_1JdfHciyuO0clhq0juutDnKNUNeBTyMblTGGLN0h-M5Rfp_Qj0-WAnsJcokqM8S9Pg5Vtb771wbjU_Xn",
  g2: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzDpg63uKc4ctzKkqFyZQlqcGJVodgMroRAQBWpaKY6O6NIyW5PLgPhXcDZCicbAu50SR0IG3yzwXYxOcQJWdTIox3SSeLArHKCfDuW8-6ebSdZcuucBQLC03iwMJdIDEQ4nCI88Zd0xS3G8-CDLNTXjzo-AyycbD1bkySbbvd1jo1OjXHzEIoXySD7bKjHHvSCHUKxOf8qxduyi_2NLW605VWpibHTPW5ac-eIvx1L5VLgCjFGI2mTtBc7Yc33Gfgz4tTaqkVAK_2",
  g3: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPnaLsXijQlbWum5Z-_0yRwtgfHxFcoCQsjoklBornhMubfH7k0jBUrDy1vKYZeg3tvKYhND-plM_OB3JkV_jj2ka8q8NVQJXcb0fn0zFhTYXD7F6q8GyWVpzD7_fC7rj3OlJXXYsGS-GOLytcfJY1gnHWNFWRGkC-NSW7yD3WhxgM4VW9eSfTdaoqey_-pEOXxxe2jB679H4QUqE-6rxgJD3aXidNBcT9Sq_pn-yHvRxz0yup0rg0v2sR77913wUFBiv-EKZAivTI",
};

export default function HostDashboard() {
  return (
    <main className="flex min-w-0 flex-1 flex-col">
      <header className="sticky top-0 z-10 flex h-20 items-center justify-between border-b border-primary/5 bg-white/80 px-8 backdrop-blur-md">
        <div className="max-w-md flex-1">
          <div className="group relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-primary">
              search
            </span>
            <input
              className="w-full rounded-xl border-none bg-background-light py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20"
              placeholder="Tìm đặt chỗ, khách hoặc phòng..."
              type="search"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="relative flex size-10 items-center justify-center rounded-xl bg-background-light text-slate-600 transition-all hover:bg-primary/10 hover:text-primary"
          >
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute right-2 top-2 size-2 rounded-full border-2 border-white bg-red-500" />
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            <span className="material-symbols-outlined text-lg">add</span>
            Thêm phòng
          </button>
        </div>
      </header>

      <div className="space-y-8 p-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-primary/5 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-start justify-between">
              <p className="text-sm font-medium text-slate-500">Tổng doanh thu</p>
              <div className="rounded bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-500">+12.5%</div>
            </div>
            <h3 className="mb-4 text-2xl font-bold">$12,450.00</h3>
            <div className="h-10 w-full overflow-hidden">
              <svg className="h-full w-full" viewBox="0 0 100 40">
                <path
                  d="M0,35 Q10,32 20,28 T40,20 T60,25 T80,10 T100,5"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d="M0,35 Q10,32 20,28 T40,20 T60,25 T80,10 T100,5 V40 H0 Z"
                  fill="url(#hostDashGrad1)"
                  opacity="0.1"
                />
                <defs>
                  <linearGradient id="hostDashGrad1" x1="0%" x2="0%" y1="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: "#10b981", stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: "#10b981", stopOpacity: 0 }} />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          <div className="rounded-xl border border-primary/5 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-start justify-between">
              <p className="text-sm font-medium text-slate-500">Đặt chỗ đang hoạt động</p>
              <span className="material-symbols-outlined text-primary">bed</span>
            </div>
            <h3 className="mb-1 text-2xl font-bold">18</h3>
            <p className="text-xs text-slate-400">Khách đang lưu trú</p>
          </div>

          <div className="rounded-xl border border-primary/5 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-start justify-between">
              <p className="text-sm font-medium text-slate-500">Tỷ lệ lấp đầy</p>
              <span className="material-symbols-outlined text-primary">analytics</span>
            </div>
            <h3 className="mb-1 text-2xl font-bold">84%</h3>
            <div className="mt-2 h-1.5 w-full rounded-full bg-primary/10">
              <div className="h-full rounded-full bg-primary" style={{ width: "84%" }} />
            </div>
          </div>

          <div className="rounded-xl border border-primary/5 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-start justify-between">
              <p className="text-sm font-medium text-slate-500">Đánh giá mới</p>
              <span className="material-symbols-outlined text-primary">star</span>
            </div>
            <h3 className="mb-1 text-2xl font-bold">12</h3>
            <p className="text-xs text-slate-400">Chờ phản hồi</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="rounded-xl border border-primary/5 bg-white p-6 shadow-sm lg:col-span-2">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">Tổng quan doanh thu</h2>
                <p className="text-sm text-slate-500">Xu hướng doanh thu theo tháng</p>
              </div>
              <select className="rounded-lg border-none bg-background-light text-sm focus:ring-primary/20">
                <option>6 tháng gần nhất</option>
                <option>1 năm</option>
              </select>
            </div>
            <div className="relative h-64">
              <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                <polyline
                  fill="none"
                  points="0,80 20,70 40,75 60,40 80,45 100,20"
                  stroke="#351a5b"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d="M0,80 20,70 40,75 60,40 80,45 100,20 V100 H0 Z"
                  fill="url(#hostDashLineGrad)"
                  opacity="0.1"
                />
                <defs>
                  <linearGradient id="hostDashLineGrad" x1="0%" x2="0%" y1="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: "#351a5b", stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: "#351a5b", stopOpacity: 0 }} />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute bottom-0 flex w-full justify-between px-2 pt-4">
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((m) => (
                  <span key={m} className="text-[10px] font-bold text-slate-400">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-primary/5 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-lg font-bold">Top phòng</h2>
            <div className="space-y-5">
              {[
                { t: "Zen Pod - Terminal 3", s: "$3,450 tháng này", p: "↑ 8%", c: "text-emerald-500", img: IMG.listing1 },
                { t: "Neo-Cradle Hub", s: "$2,900 tháng này", p: "↑ 12%", c: "text-emerald-500", img: IMG.listing2 },
                { t: "Urban Restbox L2", s: "$2,100 tháng này", p: "~ 0%", c: "text-slate-400", img: IMG.listing3 },
              ].map((row) => (
                <div key={row.t} className="flex items-center gap-4">
                  <div
                    className="size-14 rounded-lg bg-cover bg-center"
                    style={{ backgroundImage: `url('${row.img}')` }}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-bold">{row.t}</p>
                    <p className="text-xs text-slate-500">{row.s}</p>
                  </div>
                  <div className={`text-xs font-bold ${row.c}`}>{row.p}</div>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="mt-6 w-full rounded-xl border border-primary/20 py-2.5 text-sm font-bold text-primary transition-colors hover:bg-primary/5"
            >
              Xem tất cả phòng
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-primary/5 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-primary/5 p-6">
            <h2 className="text-lg font-bold">Đặt chỗ gần đây</h2>
            <button type="button" className="text-sm font-bold text-primary hover:underline">
              Tải CSV
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-background-light">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Khách
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Phòng
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Check-in
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Check-out
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Trạng thái
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Số tiền
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/5">
                <tr className="transition-colors hover:bg-primary/5">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="size-8 rounded-full bg-cover bg-center"
                        style={{ backgroundImage: `url('${IMG.g1}')` }}
                      />
                      <span className="text-sm font-medium">Sarah Jenkins</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">Zen Pod - T3</td>
                  <td className="px-6 py-4 text-sm">Oct 12, 10:00 PM</td>
                  <td className="px-6 py-4 text-sm">Oct 13, 06:00 AM</td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold uppercase text-emerald-600">
                      Confirmed
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold">$45.00</td>
                </tr>
                <tr className="transition-colors hover:bg-primary/5">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="size-8 rounded-full bg-cover bg-center"
                        style={{ backgroundImage: `url('${IMG.g2}')` }}
                      />
                      <span className="text-sm font-medium">Marcus Chen</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">Neo-Cradle Hub</td>
                  <td className="px-6 py-4 text-sm">Oct 12, 02:00 PM</td>
                  <td className="px-6 py-4 text-sm">Oct 12, 06:00 PM</td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-amber-50 px-2 py-1 text-[10px] font-bold uppercase text-amber-600">
                      Pending
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold">$25.00</td>
                </tr>
                <tr className="transition-colors hover:bg-primary/5">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="size-8 rounded-full bg-cover bg-center"
                        style={{ backgroundImage: `url('${IMG.g3}')` }}
                      />
                      <span className="text-sm font-medium">David Miller</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">Urban Restbox L2</td>
                  <td className="px-6 py-4 text-sm">Oct 11, 11:30 PM</td>
                  <td className="px-6 py-4 text-sm">Oct 12, 07:00 AM</td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold uppercase text-emerald-600">
                      Confirmed
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold">$38.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
