import React from "react";
import { Link } from "react-router-dom";
import { AdminPage, AdminPageHeader } from "../../components/admin/AdminPageChrome";
import { adminCard } from "../../components/admin/adminUi";

export default function AdminTransactions() {
  return (
    <AdminPage>
      <AdminPageHeader
        title="Transactions"
        description="Payments, payouts, and reconciliation will appear here when the reporting workspace is ready."
      />

      <div className={`${adminCard} border-amber-200/80 bg-amber-50/50 px-5 py-4 text-sm text-amber-950`}>
        For now, use{" "}
        <Link className="font-bold text-primary underline" to="/admin/users">
          user management
        </Link>{" "}
        and{" "}
        <Link className="font-bold text-primary underline" to="/admin/pricing/platform-fee">
          platform fee
        </Link>{" "}
        for the tools that already exist today.
      </div>
    </AdminPage>
  );
}
