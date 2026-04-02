import React from "react";
import {
  adminCard,
  adminCardPad,
  adminDesc,
  adminError,
  adminPageInnerNarrow,
  adminPageInnerWide,
  adminPageMain,
  adminTitle,
} from "./adminUi";

/**
 * @param {{ children: React.ReactNode, narrow?: boolean }} props
 */
export function AdminPage({ children, narrow = false }) {
  return (
    <main className={adminPageMain}>
      <div className={narrow ? adminPageInnerNarrow : adminPageInnerWide}>{children}</div>
    </main>
  );
}

/**
 * @param {{ title: string, description?: string, actions?: React.ReactNode }} props
 */
export function AdminPageHeader({ title, description, actions }) {
  return (
    <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        <h1 className={adminTitle}>{title}</h1>
        {description ? <p className={adminDesc}>{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-shrink-0 flex-wrap gap-2">{actions}</div> : null}
    </header>
  );
}

/**
 * @param {{ children?: React.ReactNode }} props
 */
export function AdminErrorAlert({ children }) {
  if (!children) return null;
  return <div className={adminError} role="alert">{children}</div>;
}

/**
 * @param {{ title?: string, children: React.ReactNode, className?: string }} props
 */
export function AdminSection({ title, children, className = "" }) {
  return (
    <section className={`${adminCard} ${adminCardPad} ${className}`.trim()}>
      {title ? <h2 className="mb-4 text-base font-bold text-slate-900">{title}</h2> : null}
      {children}
    </section>
  );
}
