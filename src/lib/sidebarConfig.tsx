"use client";

import React from "react";
import {
  Activity,
  BarChart3,
  Briefcase,
  CreditCard,
  FolderOpen,
  LayoutDashboard,
  LifeBuoy,
  MonitorCog,
  Receipt,
  Settings,
  ShieldEllipsis,
  UserCog,
  Users,
} from "lucide-react";

export type DashboardRole = "dispatcher" | "admin" | "super-admin";

export type NavItem = {
  section: string;
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; icon: React.ReactNode }[];
};

export type QuickLink = {
  title: string;
  description: string;
  icon: React.ReactNode;
  path?: string;
  iconBgColor: string;
  iconColor: string;
  onClick?: () => void;
  href?: string;
  action?: "edit-profile" | "wallet-modal" | "download-app";
};

export type SidebarConfig = {
  subtitle: string;
  navItems: NavItem[];
  quickLinks: QuickLink[];
};

export const dispatcherSidebarConfig: SidebarConfig = {
  subtitle: "",
  navItems: [
    {
      section: "Overview",
      icon: <LayoutDashboard size={18} />,
      name: "Dashboard",
      path: "/dispatcher/dashboard",
    },
    {
      section: "Operations",
      icon: <Briefcase size={18} />,
      name: "Assigned Loads",
      path: "/dispatcher/dashboard/assigned-loads",
    },
    {
      section: "Operations",
      icon: <Activity size={18} />,
      name: "Live Tracking",
      path: "/dispatcher/dashboard/live-tracking",
    },
    {
      section: "Resources",
      icon: <FolderOpen size={18} />,
      name: "Documents",
      path: "/dispatcher/dashboard/documents",
    },
    {
      section: "Resources",
      icon: <LifeBuoy size={18} />,
      name: "Support",
      path: "/dispatcher/dashboard/support",
    },
    {
      section: "Settings",
      icon: <Settings size={18} />,
      name: "Settings",
      path: "/dispatcher/dashboard/settings",
    },
  ],
  quickLinks: [],
};

export const adminSidebarConfig: SidebarConfig = {
  subtitle: "",
  navItems: [
    {
      section: "Overview",
      icon: <LayoutDashboard size={18} />,
      name: "Dashboard",
      path: "/admin/dashboard",
    },
    {
      section: "Management",
      icon: <Users size={18} />,
      name: "User Management",
      path: "/admin/dashboard/user-management",
    },
    {
      section: "Management",
      icon: <UserCog size={18} />,
      name: "Dispatchers",
      path: "/admin/dashboard/dispatchers",
    },
    {
      section: "Management",
      icon: <UserCog size={18} />,
      name: "Performance ",
      path: "/admin/dashboard/performance",
    },
    {
      section: "Operations",
      icon: <FolderOpen size={18} />,
      name: "Documents",
      path: "/admin/dashboard/documents",
    },
    {
      section: "Operations",
      icon: <LifeBuoy size={18} />,
      name: "Support",
      path: "/admin/dashboard/support",
    },
    {
      section: "Finance",
      icon: <Receipt size={18} />,
      name: "Invoices",
      path: "/admin/dashboard/invoices",
    },
    {
      section: "Finance",
      icon: <Receipt size={18} />,
      name: "Statements",
      path: "/admin/dashboard/statements",
    },
    {
      section: "Finance",
      icon: <Receipt size={18} />,
      name: "Pricing & Plan",
      path: "/admin/dashboard/pricing-plan",
    },
    {
      section: "Settings",
      icon: <Settings size={18} />,
      name: "Settings",
      path: "/admin/dashboard/settings",
    },
  ],
  quickLinks: [],
};

export const superAdminSidebarConfig: SidebarConfig = {
  subtitle: "",
  navItems: [
    {
      section: "Overview",
      icon: <LayoutDashboard size={18} />,
      name: "Dashboard",
      path: "/super-admin/dashboard",
    },
    {
      section: "Management",
      icon: <ShieldEllipsis size={18} />,
      name: "Admin Management",
      path: "/super-admin/dashboard/admin-management",
    },
    {
      section: "Management",
      icon: <UserCog size={18} />,
      name: "Dispatcher Management",
      path: "/super-admin/dashboard/dispatcher-management",
    },
    {
      section: "Platform",
      icon: <MonitorCog size={18} />,
      name: "Platform Control",
      path: "/super-admin/dashboard/platform-control",
    },
    {
      section: "Platform",
      icon: <BarChart3 size={18} />,
      name: "Analytics",
      path: "/super-admin/dashboard/analytics",
    },
    {
      section: "Finance",
      icon: <CreditCard size={18} />,
      name: "Billing",
      path: "/super-admin/dashboard/billing",
    },
    {
      section: "Settings",
      icon: <Settings size={18} />,
      name: "Settings",
      path: "/super-admin/dashboard/settings",
    },
  ],
  quickLinks: [],
};

export const getSidebarConfig = (
  role: DashboardRole = "admin",
): SidebarConfig => {
  if (role === "dispatcher") {
    return dispatcherSidebarConfig;
  }

  if (role === "super-admin") {
    return superAdminSidebarConfig;
  }

  return adminSidebarConfig;
};
