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
    >
      {children}
    </RoleDashboardShell>
  );
}
