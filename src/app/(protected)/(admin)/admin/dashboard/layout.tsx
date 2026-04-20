import React from "react";
import RoleDashboardShell from "@/src/sharedComponents/layouts/RoleDashboardShell";

export default function AdminDashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <RoleDashboardShell
      role="admin"
      dashboardHref="/admin/dashboard"
      placeholderTitle="Admin Workspace Placeholder"
      implementedPaths={[
        "/admin/dashboard/user-management",
        "/admin/dashboard/dispatchers",
        "/admin/dashboard/support",
        "/admin/dashboard/performance",
        "/admin/dashboard/settings",
        "/admin/dashboard/documents",
        "/admin/dashboard/invoices",
        "/admin/dashboard/statements",
      ]}
    >
      {children}
    </RoleDashboardShell>
  );
}
