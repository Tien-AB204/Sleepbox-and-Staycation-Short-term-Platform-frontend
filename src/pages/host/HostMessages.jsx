import React from "react";

const U = {
  a1: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNmlYVEU5xxXUOC1GREaqXVj8tQQoI1JCURho7y1JEt6VCIp3e09nb5d_MqmaWCNlLChRb8eByH2aCAQl9SmNSm3Y5ZAoHa3GFIcYci6rjT0zGbbBpJHlsH3B_aj1Rft5hUtV3xfHWiOkeNpnoWX3bskvlhqcLrITD9TZpMH_j7gn6XBq07cHXHG37iRH924HhRrM9HJ2mCLtbM8ftp8vx5oYUdndOVsUOe_dvMfHzAdMx31LLJehVGT6pXPWryjLwFxp3Ju2S2y2i",
  a2: "https://lh3.googleusercontent.com/aida-public/AB6AXuDAHlkvIQTdGNjWXlr1buF_3xv1xNu9mz1GXki1Satoh-CkCUZw7lFL2SgIC0Qz0zWFoaf8PfIEo4iEz0NSk8aIxT1nP9IL5EKwzJzb80g_ww64AsMDSmtaCJO0aRd4kKjh35MOBQqBoXBHXcmG7eOJRvjuMEsSju56NZWMRKwTKk10meE3aHr26mYCJyWO2yd49FURsMvReM0Ve33tGFakTuAzrDGI3R9ETGa58-GpfWx2znVIt7Sih8OOnXJyOaDaQwp3uzmsSIpV",
  a3: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8hk3rCRTJ5C7Aq2tJTca2Bg1yQ3FZg7PEmbrw8CgDLVWhKnueMkPukvynpiq8vyBmZLSLDdLEBypQETTVGRFEPMVpRACcRplUInJA9V5hXnTYjuOCvdrBZoceXYrRiaFa9TF4SOQ920QTxbpJLO7saIv1s2LZCC3KLJD5pOrOIifvVmzcNr6BHnXplS4IanV1qCvL6QoJeQyD8gLsSShIRC-BlTdbOCcSkK_ljxRM76pHn492DAUT7CDvCXefJrHrHo70cs-LaXbq",
  h1: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8ErJQpFyWrClrNUqaMSZkYYkbOM09kurrw09I0NTeBpKeYO-s0d7-VXUCnhNJTC3BsK5XFlCA-y50U-wn4EBoYqzlZU6ps46YSV-7OOaepz-zxOyl7LEOxbQpIItZ-ZTlcx5mW2lbDUB_WY0t5iobHc9dPNt-X2a22j8Dx4OEHzYUnmQ_dhHmoV3YaGsgvOW7S0nTae5uJZVcZMAyUTA9s64K7j0Z2bHk30JYOyMVlL5orb1YIFC_7PYIewUe-GWqdhxIMnALGI81",
  m1: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSkywHUfSjhnJJs7eZRG9_MmaGGmNZnNvGuZN8TcnaOwpXxubAlq_vuaPrnYJBHlxaC-bWv2Wy24FUZxmzo6rujWIK5GSEVajeJNOnefQZbiWNG1m-qhCF4Fopvfa_d9HJASghSHgFHLUCfwQwERgaN7x-JYQCB1x_HD_GBWc_rHDXFDw2_JWvLWAIktYvQ_A1JmGI48mq_GO0nmHO8fSVZARq6kc7srFArhzS4R3Y8RfkC_PWD6Y0xseVzs_Aseb4e5dAYjX19Ty2",
  m2: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpCNI9GAGBEgHF4cYNAO3-tEdjM7vzO_v72429wX-0g10Nm7Xz-Xh20LMspxqbqHOM2UjrFgSGT6Levd_a1xBS6IKjhIrelhYcQZMidzN-mGlEGOt-muT9paF5Pip85J6hyVCvbLbfUK9azmLhWffDsp4LjEiDBd0HsDXHw64W-pxtf8A9Y8NV-yL4n-eZruwGoulQLlHIbBZluVJSTwj9RWliuHcOnZjOxz2qE80GO3052PrvVmt-FoVV0wzpOExLS4cvTzlxmHi7",
  m3: "https://lh3.googleusercontent.com/aida-public/AB6AXuD0e5utD8KGupv2uyaCPY78Aum1qGQE33o_svnC8cImX0NCxvuEkMOQv2_yRxKKzwPNspHGv_qQaMbKRuogklr1jFau0FDdt5zkFY61DeyDHoJTJ2ZgyY9-yR3Tq90APpu2kKLHl4z6IXCaBJo5O06QKiGQLbTyEkznjXTHmi60NEp2MqUNGcs_Ga1PjyYpsyeL_MDxBdDQvvUmGi765xYs_5yVbFCPwCcEC6NiGkeLHSP2T3Q9XDL0bAzMoGXQMauoijpGykx-KuUj",
};

export default function HostMessages() {
  return (
    <main className="flex min-h-screen min-w-0 flex-1 overflow-hidden bg-background-light">
      <div className="flex w-full flex-1 overflow-hidden">
        <div className="flex w-80 shrink-0 flex-col border-r border-slate-200 bg-white md:w-96">
          <div className="border-b border-slate-200 p-6">
            <h2 className="mb-4 text-2xl font-bold">Tin nhắn</h2>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
              <input
                className="w-full rounded-xl border-none bg-slate-100 py-2.5 pl-10 text-sm focus:ring-2 focus:ring-primary/20"
                placeholder="Tìm cuộc trò chuyện..."
                type="search"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="flex cursor-pointer gap-4 border-l-4 border-primary bg-primary/5 p-4">
              <div className="relative shrink-0">
                <div
                  className="size-12 rounded-full bg-cover bg-center"
                  style={{ backgroundImage: `url('${U.a1}')` }}
                />
                <div className="absolute bottom-0 right-0 size-3 rounded-full border-2 border-white bg-green-500" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-0.5 flex flex-wrap justify-between gap-1">
                  <p className="truncate text-sm font-bold">Alex Chen</p>
                  <span className="text-[10px] font-medium text-slate-400">10:30 AM</span>
                </div>
                <p className="mb-1 truncate text-xs font-semibold text-primary">CyberBox District 1</p>
                <p className="truncate text-xs text-slate-500">Is the check-in time flexible for tomorrow?</p>
              </div>
            </div>
            <div className="flex cursor-pointer gap-4 border-l-4 border-transparent p-4 transition-colors hover:bg-slate-50">
              <div className="relative shrink-0">
                <div
                  className="size-12 rounded-full bg-cover bg-center"
                  style={{ backgroundImage: `url('${U.a2}')` }}
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-0.5 flex justify-between">
                  <p className="truncate text-sm font-bold">Sarah Miller</p>
                  <span className="text-[10px] font-medium text-slate-400">Yesterday</span>
                </div>
                <p className="mb-1 truncate text-xs font-medium text-slate-600">ZenBox Midtown</p>
                <p className="truncate text-xs text-slate-500">Your booking is confirmed! See you then.</p>
              </div>
            </div>
            <div className="flex cursor-pointer gap-4 border-l-4 border-transparent p-4 transition-colors hover:bg-slate-50">
              <div className="relative shrink-0">
                <div
                  className="size-12 rounded-full bg-cover bg-center"
                  style={{ backgroundImage: `url('${U.a3}')` }}
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-0.5 flex justify-between">
                  <p className="truncate text-sm font-bold">David K.</p>
                  <span className="text-[10px] font-medium text-slate-400">Tue</span>
                </div>
                <p className="mb-1 truncate text-xs font-medium text-slate-600">NeonBox Shibuya</p>
                <p className="truncate text-xs text-slate-500">I&apos;ve added the door code to the booking details.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col bg-white">
          <header className="flex h-20 shrink-0 items-center justify-between border-b border-slate-200 px-6">
            <div className="flex items-center gap-4">
              <div
                className="size-10 rounded-full bg-cover bg-center"
                style={{ backgroundImage: `url('${U.h1}')` }}
              />
              <div>
                <h3 className="text-base font-bold leading-none">Alex Chen</h3>
                <div className="mt-1 flex items-center gap-1.5">
                  <div className="size-1.5 rounded-full bg-green-500" />
                  <span className="text-xs font-medium text-slate-500">Online</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button type="button" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100">
                <span className="material-symbols-outlined">call</span>
              </button>
              <button type="button" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100">
                <span className="material-symbols-outlined">info</span>
              </button>
            </div>
          </header>

          <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-6">
            <div className="flex justify-center">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                August 24, 2023
              </span>
            </div>
            <div className="flex max-w-[80%] gap-3">
              <div
                className="size-8 shrink-0 rounded-full bg-cover bg-center"
                style={{ backgroundImage: `url('${U.m1}')` }}
              />
              <div>
                <div className="rounded-2xl rounded-tl-none bg-slate-100 p-3">
                  <p className="text-sm leading-relaxed">
                    Hello! Thanks for booking CyberBox District 1. I wanted to confirm your arrival time for tomorrow?
                  </p>
                </div>
                <span className="mt-1 block px-1 text-[10px] text-slate-400">9:15 AM</span>
              </div>
            </div>
            <div className="ml-auto flex max-w-[80%] flex-col items-end gap-1">
              <div className="rounded-2xl rounded-tr-none bg-primary p-3 text-white shadow-sm">
                <p className="text-sm leading-relaxed">
                  Hi Alex! I should be arriving around 4 PM. Is it possible to check in a bit earlier if the box is ready?
                </p>
              </div>
              <div className="flex items-center gap-1 px-1">
                <span className="text-[10px] text-slate-400">9:45 AM</span>
                <span className="material-symbols-outlined text-xs text-primary">done_all</span>
              </div>
            </div>
            <div className="flex max-w-[80%] gap-3">
              <div
                className="size-8 shrink-0 rounded-full bg-cover bg-center"
                style={{ backgroundImage: `url('${U.m2}')` }}
              />
              <div>
                <div className="rounded-2xl rounded-tl-none bg-slate-100 p-3">
                  <p className="text-sm leading-relaxed">
                    Let me check the cleaning schedule. Usually we can accommodate early check-ins after 2 PM if the previous guest left early.
                  </p>
                </div>
                <span className="mt-1 block px-1 text-[10px] text-slate-400">10:02 AM</span>
              </div>
            </div>
            <div className="flex max-w-[80%] gap-3">
              <div
                className="size-8 shrink-0 rounded-full bg-cover bg-center"
                style={{ backgroundImage: `url('${U.m3}')` }}
              />
              <div>
                <div className="rounded-2xl rounded-tl-none bg-slate-100 p-3">
                  <p className="text-sm leading-relaxed">Is the check-in time flexible for tomorrow?</p>
                </div>
                <span className="mt-1 block px-1 text-[10px] text-slate-400">10:30 AM</span>
              </div>
            </div>
          </div>

          <div className="p-6 pt-0">
            <div className="flex flex-col rounded-2xl bg-slate-100 p-2">
              <textarea
                className="min-h-[40px] max-h-32 w-full resize-none border-none bg-transparent px-3 py-2 text-sm focus:ring-0"
                placeholder="Nhập tin nhắn..."
                rows={1}
              />
              <div className="mt-1 flex items-center justify-between px-1 pb-1">
                <div className="flex gap-1">
                  <button type="button" className="p-2 text-slate-500 transition-colors hover:text-primary">
                    <span className="material-symbols-outlined">attach_file</span>
                  </button>
                  <button type="button" className="p-2 text-slate-500 transition-colors hover:text-primary">
                    <span className="material-symbols-outlined">image</span>
                  </button>
                  <button type="button" className="p-2 text-slate-500 transition-colors hover:text-primary">
                    <span className="material-symbols-outlined">add_reaction</span>
                  </button>
                </div>
                <button
                  type="button"
                  className="flex size-10 items-center justify-center rounded-xl bg-primary text-white transition-opacity hover:opacity-90"
                >
                  <span className="material-symbols-outlined">send</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
