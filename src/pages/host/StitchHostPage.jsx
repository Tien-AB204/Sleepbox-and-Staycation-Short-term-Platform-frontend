import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import calendarBaseHtml from "./stitch/calendar.html?raw";

// Persist vị trí cuộn của sidebar giữa các lần chuyển trang host.
// (vì StitchHostPage có thể unmount/mount lại theo route)
let lastHostNavScrollTop = 0;

const stripDarkTokensFromDoc = (doc) => {
  if (!doc) return;
  Array.from(doc.querySelectorAll("*")).forEach((el) => {
    if (!el.classList) return;
    const next = Array.from(el.classList).filter((cls) => !cls.startsWith("dark:"));
    el.className = next.join(" ");
  });
};

const normalizeBodyClass = (className) => {
  const raw = className || "";
  return raw.replace(/\bbg-background-light\b/g, "bg-white").trim();
};

const getStyleText = (doc) =>
  Array.from(doc?.querySelectorAll("style") || [])
    .map((s) => s.textContent)
    .filter(Boolean)
    .join("\n");

const StitchHostPage = ({ html }) => {
  const [renderHtml, setRenderHtml] = useState("");
  const [pageClassName, setPageClassName] = useState("min-h-screen");
  const containerRef = useRef(null);
  const navigate = useNavigate();

  // Giảm ảnh hưởng theme dark của app (nếu có).
  useLayoutEffect(() => {
    const rootNode = document.getElementById("root");
    const targets = [document.documentElement, document.body, rootNode].filter(Boolean);
    const prev = new Map();
    targets.forEach((el) => {
      prev.set(el, el.className);
      el.classList.remove("dark");
    });
    document.documentElement?.classList.add("light");

    return () => {
      prev.forEach((className, el) => {
        el.className = className;
      });
    };
  }, []);

  useEffect(() => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const baseDoc = new DOMParser().parseFromString(calendarBaseHtml, "text/html");

    stripDarkTokensFromDoc(doc);
    stripDarkTokensFromDoc(baseDoc);

    // Lấy phần content từ page hiện tại: bỏ header (chrome) vì chrome sẽ lấy từ calendarBaseHtml
    const mainEl = doc.querySelector("main");
    let contentHtml = "";
    if (mainEl) {
      const clone = mainEl.cloneNode(true);
      clone.querySelectorAll("header").forEach((el) => el.remove());
      clone.querySelectorAll("aside").forEach((el) => el.remove());
      contentHtml = clone.innerHTML;
    } else {
      contentHtml = doc.body?.innerHTML || "";
    }

    // Lấy chrome (sidebar + header) từ calendarBaseHtml và nhét contentHtml vào giữa
    const baseMain = baseDoc.querySelector("main");
    if (baseMain) {
      const baseHeader = baseMain.querySelector("header");
      baseMain.innerHTML = `${baseHeader?.outerHTML || ""}${contentHtml}`;

      // Cho phép scroll phần dưới nội dung (tránh bị cắt do overflow-hidden).
      baseMain.classList.remove("overflow-hidden");
      baseMain.classList.add("overflow-y-auto");
    }

    // Đồng bộ menu bar đầy đủ
    const baseNav = baseDoc.querySelector("nav");
    if (baseNav) {
      // Cho phép cuộn sidebar để xem đủ các mục menu
      baseNav.classList.add("overflow-y-auto");
      // Nếu app có utility no-scrollbar thì dùng, không thì không sao
      baseNav.classList.add("no-scrollbar");
      baseNav.style.maxHeight = "100%";

      const baseAnchors = Array.from(baseNav.querySelectorAll("a"));
      const anchorTexts = baseAnchors.map((a) => (a.textContent || "").trim());
      const isVietnamese =
        anchorTexts.some((t) => /[À-ỹà-ỹĐđ]/.test(t)) ||
        /cài đặt|tin nhắn|đánh giá/i.test(anchorTexts.join(" "));

      const label = (vi, en) => (isVietnamese ? vi : en);

      const menuItems = [
        {
          label: label("Bảng điều khiển", "Dashboard"),
          icon: "dashboard",
          to: "/host/dashboard",
          match: /^\/host\/dashboard$/,
        },
        {
          label: label("Danh sách cơ sở", "Facilities"),
          icon: "domain",
          to: "/host/facilities",
          match: /^\/host\/facilities$/,
        },
        {
          label: label("Đặt chỗ", "Bookings"),
          icon: "book_online",
          to: "/host/booking-management",
          match: /^\/host\/booking-management$/,
        },
        { label: "Calendar", icon: "calendar_month", to: "/host/calendar", match: /^\/host\/calendar$/ },
        { label: "Revenue", icon: "payments", to: "/host/statistics", match: /^\/host\/statistics$/ },
        { label: "Pricing", icon: "sell", to: "/host/pricing", match: /^\/host\/pricing$/ },
        {
          label: label("Nhân viên", "Staff"),
          icon: "support_agent",
          to: "/host/staff-management",
          match: /^\/host\/staff-management$/,
        },
        { label: "Sleepboxes", icon: "bedroom_child", to: "/host/sleepboxes", match: /^\/host\/sleepboxes$/ },
        { label: label("Tranh chấp", "Disputes"), icon: "report_problem", to: "/host/disputes", match: /^\/host\/disputes$/ },
        { label: label("Đánh giá", "Reviews"), icon: "reviews", to: "/host/reviews", match: /^\/host\/reviews$/ },
        { label: label("Tin nhắn", "Messages"), icon: "chat_bubble", to: "/host/messages", match: /^\/host\/messages$/ },
        { label: label("Cài đặt", "Settings"), icon: "settings", to: "/host/settings", match: /^\/host\/settings$/ },
      ];

      const currentPath = window.location?.pathname || "";
      const inactiveAnchor = baseAnchors.find((a) => !(a.getAttribute("class") || "").includes("bg-primary")) || baseAnchors[0];
      const activeAnchor = baseAnchors.find((a) => (a.getAttribute("class") || "").includes("bg-primary")) || inactiveAnchor;

      const inactiveClass = (inactiveAnchor?.getAttribute("class") || "").trim();
      const activeClass = (activeAnchor?.getAttribute("class") || inactiveClass).trim();

      const iconTemplate = baseNav.querySelector("a span.material-symbols-outlined");
      const iconClass = iconTemplate?.getAttribute("class") || "material-symbols-outlined";

      const labelTemplate = baseNav.querySelector("a span.font-medium");
      const labelClass = labelTemplate?.getAttribute("class") || "font-medium";

      baseNav.innerHTML = "";
      menuItems.forEach((item) => {
        const a = baseDoc.createElement("a");
        a.setAttribute("href", "#");
        a.setAttribute("data-route", item.to);
        const isActive = item.match.test(currentPath);
        a.setAttribute("class", isActive ? activeClass : inactiveClass);

        const iconSpan = baseDoc.createElement("span");
        iconSpan.setAttribute("class", iconClass);
        iconSpan.textContent = item.icon;

        const textSpan = baseDoc.createElement("span");
        textSpan.setAttribute("class", labelClass);
        textSpan.textContent = item.label;

        a.appendChild(iconSpan);
        a.appendChild(textSpan);
        baseNav.appendChild(a);
      });
    }

    const stylesText = `${getStyleText(baseDoc)}\n${getStyleText(doc)}`.trim();
    const bodyHtml = baseDoc.body?.innerHTML || "";
    const pageClass = normalizeBodyClass(baseDoc.body?.getAttribute("class") || "");

    setPageClassName(pageClass || "min-h-screen");
    setRenderHtml(`${stylesText ? `<style>${stylesText}</style>` : ""}${bodyHtml}`);
  }, [html]);

  // Khôi phục sidebar scrollTop để menu bar "giữ im" khi chuyển trang.
  useEffect(() => {
    const nav = containerRef.current?.querySelector("nav");
    if (!nav) return;

    // Restore
    nav.scrollTop = lastHostNavScrollTop;

    return () => {
      // Save
      lastHostNavScrollTop = nav.scrollTop;
    };
  }, [renderHtml]);

  const handleContainerClick = (e) => {
    const target = e.target;
    if (!target) return;
    const anchor = target.closest?.('a[data-route]');
    if (!anchor) return;
    const to = anchor.getAttribute("data-route");
    if (!to) return;
    e.preventDefault();
    navigate(to);
  };

  return (
    <div
      ref={containerRef}
      className={pageClassName}
      onClick={handleContainerClick}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: renderHtml }}
    />
  );
};

export default StitchHostPage;

