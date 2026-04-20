import React from "react";
import RoleDashboardShell from "@/src/sharedComponents/layouts/RoleDashboardShell";

export default function SuperAdminDashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <RoleDashboardShell
      role="super-admin"
      dashboardHref="/super-admin/dashboard"
      placeholderTitle="Super Admin Workspace Placeholder"
      implementedPaths={[
        "/super-admin/dashboard/performance",
        "/super-admin/dashboard/documents",
        "/super-admin/dashboard/user-management",
        "/super-admin/dashboard/support",
        "/super-admin/dashboard/settings",
      ]}
    >
      {children}
    </RoleDashboardShell>
  );
}
