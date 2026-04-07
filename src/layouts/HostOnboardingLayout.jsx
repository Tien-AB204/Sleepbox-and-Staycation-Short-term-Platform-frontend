import React, { useRef } from "react";
import { Link, Outlet, useParams, useNavigate } from "react-router-dom";
import { HOST_STEPS } from "../pages/host/onboarding/hostOnboardingSteps";
import boxhubLogo from "../assets/images/BOXHUB.png";

export default function HostOnboardingLayout() {
  const { step } = useParams();
  const navigate = useNavigate();
  const current = Math.min(7, Math.max(1, parseInt(step, 10) || 1));
  const prevStepRef = useRef(null);
  let slideClass = "animate-host-onboarding-next";
  const prev = prevStepRef.current;
  if (prev !== null && prev !== current) {
    slideClass = current > prev ? "animate-host-onboarding-next" : "animate-host-onboarding-prev";
  }
  prevStepRef.current = current;
  const pct = Math.round((current / 7) * 100);
  const stepLabel = HOST_STEPS.find((s) => s.n === current)?.label ?? "";

  const handleBack = () => {
    if (current <= 1) {
      navigate("/");
      return;
    }
    navigate(`/host/register/${current - 1}`);
  };

  return (
    <div className="min-h-screen bg-background-light font-display text-slate-900">
      <header className="fixed left-0 top-0 z-50 flex h-16 w-full items-center justify-between border-b border-primary/10 bg-white/85 px-4 backdrop-blur-md sm:px-6">
        <Link to="/" className="shrink-0 transition-opacity hover:opacity-90">
          <img src={boxhubLogo} alt="BoxHub" className="h-7 w-auto object-contain" />
        </Link>
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            className="rounded-full p-2 text-slate-600 transition-colors hover:bg-primary/5"
            aria-label="Trợ giúp"
          >
            <span className="material-symbols-outlined text-[26px]">help_outline</span>
          </button>
          <Link
            to="/internal/login"
            className="rounded-full p-2 text-slate-600 transition-colors hover:bg-primary/5"
            aria-label="Tài khoản"
          >
            <span className="material-symbols-outlined text-[26px]">account_circle</span>
          </Link>
        </div>
      </header>

      <div className="pt-16">
        {/* Thanh điều hướng: Quay lại + tiến độ + Lưu & Thoát — không còn sidebar */}
        <div className="sticky top-16 z-40 border-b border-primary/10 bg-white/90 px-4 py-3 backdrop-blur-md sm:px-6">
          <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleBack}
              className="order-1 inline-flex shrink-0 items-center gap-1.5 rounded-full border border-primary/20 bg-white px-3 py-2 text-sm font-semibold text-primary shadow-sm transition-colors hover:bg-primary/5 active:scale-[0.99]"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
              <span className="hidden sm:inline">Quay lại</span>
            </button>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="order-2 ml-auto inline-flex shrink-0 items-center justify-center rounded-xl border-2 border-primary/20 px-3 py-2 text-sm font-bold text-primary transition-colors hover:bg-primary/5 active:scale-[0.99] sm:order-3 sm:ml-0 sm:px-4 sm:py-2.5"
            >
              Lưu &amp; Thoát
            </button>

            <div className="order-3 min-w-0 w-full basis-full sm:order-2 sm:w-auto sm:flex-1 sm:basis-auto">
              <div className="mb-1.5 flex items-end justify-between gap-2">
                <span className="truncate text-sm font-bold text-primary sm:text-base">{stepLabel}</span>
                <span className="shrink-0 text-xs font-semibold uppercase tracking-wider text-slate-500 sm:text-sm">
                  Bước {current} / 7
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-300"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <main className="mx-auto max-w-5xl overflow-x-hidden px-4 py-6 sm:px-8 sm:py-10">
          {/* Không dùng key={step} ở đây: mỗi bước đổi key sẽ remount <Outlet /> → HostOnboardingPage mất hết state (file upload chỉ nằm trong RAM). */}
          <div className={slideClass}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
