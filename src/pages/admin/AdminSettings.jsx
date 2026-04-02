import React from "react";
import { Link } from "react-router-dom";
import { AdminPage, AdminPageHeader } from "../../components/admin/AdminPageChrome";
import { adminCard } from "../../components/admin/adminUi";

const links = [
  { to: "/admin/pricing/platform-fee", label: "Platform fee", desc: "Adjust commission and fee rules over time." },
  { to: "/admin/pricing/system-rules", label: "System price rules", desc: "Hourly and overnight pricing guardrails." },
  { to: "/admin/pricing/box-limits", label: "Box type price limits", desc: "Min and max price by box size and tier." },
  { to: "/admin/pricing/addons", label: "Add-on services", desc: "Extras guests can add to a stay." },
  { to: "/admin/admins/new", label: "Create admin account", desc: "Onboard another administrator." },
  { to: "/admin/users", label: "Users", desc: "Search accounts and restrict access when needed." },
  { to: "/admin/moderators", label: "Moderators", desc: "Manage people who moderate the marketplace." },
];

export default function AdminSettings() {
  return (
    <AdminPage narrow>
      <AdminPageHeader
        title="Settings & configuration"
        description="Shortcuts to pricing, fees, and team tools. Open a section to make changes."
      />

      <ul className="space-y-3">
        {links.map(({ to, label, desc }) => (
          <li key={to}>
            <Link
              to={to}
              className={`${adminCard} flex flex-col px-5 py-4 transition-colors hover:border-primary/25 hover:bg-primary/[0.03]`}
            >
              <span className="font-bold text-primary">{label}</span>
              <span className="mt-1 text-sm text-slate-500">{desc}</span>
            </Link>
          </li>
        ))}
      </ul>
    </AdminPage>
  );
}
