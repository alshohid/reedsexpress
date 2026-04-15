import React from "react";
import RoleDashboardShell from "@/src/sharedComponents/layouts/RoleDashboardShell";

export default function DispatcherDashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <RoleDashboardShell
      role="dispatcher"
      dashboardHref="/dispatcher/dashboard"
      placeholderTitle="Dispatcher Workspace Placeholder"
    >
      {children}
    </RoleDashboardShell>
  );
}
