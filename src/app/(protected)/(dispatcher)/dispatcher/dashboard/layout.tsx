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
      implementedPaths={[
        '/dispatcher/dashboard/reports',
        '/dispatcher/dashboard/loads',
        '/dispatcher/dashboard/communications',
        '/dispatcher/dashboard/carriers',
        '/dispatcher/dashboard/settings',
        '/dispatcher/dashboard/documents',
        '/dispatcher/dashboard/invoices',
        '/dispatcher/dashboard/statements',
        '/dispatcher/dashboard/supports',
      ]}
    >
      {children}
     
    </RoleDashboardShell>
  );
}
