"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useSidebar } from "@/src/context/SidebarContext";
import { authRoutes } from "@/src/lib/auth/config";
import { env } from "@/src/lib/env";
import {
  getSidebarConfig,
  type DashboardRole,
} from "@/src/lib/sidebarConfig";
import { useAuth } from "@/src/redux/features/auth/hooks";

interface AppSidebarProps {
  role?: DashboardRole;
}

const AppSidebar = ({ role = "admin" }: AppSidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { isExpanded, isMobileOpen, toggleMobileSidebar, toggleSidebar } =
    useSidebar();
  const { logOut, isLogoutLoading } = useAuth();

  const config = getSidebarConfig(role);

  const groups = config.navItems.reduce<
    Array<{ section: string; items: typeof config.navItems }>
  >((collection, item) => {
    const existingGroup = collection.find((group) => group.section === item.section);

    if (existingGroup) {
      existingGroup.items.push(item);
      return collection;
    }

    collection.push({
      section: item.section,
      items: [item],
    });

    return collection;
  }, []);

  const handleLogout = async () => {
    await logOut();
    router.replace(authRoutes.login);
  };

  const handleItemClick = () => {
    if (isMobileOpen) {
      toggleMobileSidebar();
    }
  };

  const sidebarWidth = isMobileOpen
    ? "w-[min(18rem,calc(100vw-2rem))]"
    : isExpanded
      ? "w-[17.5rem]"
      : "w-[5.5rem]";

  const isActive = (path?: string) => {
    if (!path) {
      return false;
    }

    const isDashboardRoot =
      path === authRoutes.dispatcherDashboard ||
      path === authRoutes.adminDashboard ||
      path === authRoutes.superAdminDashboard;

    return pathname === path || (!isDashboardRoot && pathname.startsWith(`${path}/`));
  };

  return (
    <aside
      className={[
        "fixed left-0 top-0 z-[600] flex h-screen flex-col border-r border-[#E7EBF7] bg-white px-4 py-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)] transition-all duration-300 ease-in-out",
        sidebarWidth,
        isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
      ].join(" ")}
    >
      <div className="flex items-center justify-between gap-3 border-b border-[#EEF2FB] pb-5">
        <Link
          href={
            role === "dispatcher"
              ? authRoutes.dispatcherDashboard
              : role === "super-admin"
                ? authRoutes.superAdminDashboard
                : authRoutes.adminDashboard
          }
          className="flex min-w-0 items-center gap-3"
          onClick={handleItemClick}
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#EEF2FF] text-lg font-bold text-[#2E3A83]">
            RX
          </div>

          {isExpanded && (
            <div className="min-w-0">
              <p className="truncate text-base font-semibold text-[#111827]">
                ReedsExpress
              </p>
              <p className="truncate text-xs text-[#667085]">
                Logistics Control
              </p>
            </div>
          )}
        </Link>

        <button
          type="button"
          onClick={toggleSidebar}
          className="hidden h-10 w-10 items-center justify-center rounded-xl border border-[#E3E8F7] text-[#667085] transition hover:bg-[#F8FAFF] hover:text-[#2E3A83] lg:inline-flex"
          aria-label="Toggle sidebar"
        >
          {isExpanded ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
        </button>
      </div>

      <div className="mt-6 flex-1 overflow-y-auto pr-1">
        <div className="space-y-6">
          {groups.map((group) => (
            <section key={group.section}>
              {isExpanded && (
                <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#98A2B3]">
                  {group.section}
                </p>
              )}

              <div className="space-y-1">
                {group.items.map((item) => {
                  const active = isActive(item.path);

                  return (
                    <Link
                      key={item.name}
                      href={item.path ?? "#"}
                      onClick={handleItemClick}
                      className={[
                        "group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition",
                        isExpanded ? "justify-start" : "justify-center",
                        active
                          ? "bg-[#2E3A83] text-white shadow-[0_10px_26px_rgba(46,58,131,0.24)]"
                          : "text-[#344054] hover:bg-[#F7F8FE] hover:text-[#2E3A83]",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition",
                          active
                            ? "bg-white/14 text-white"
                            : "bg-[#F5F7FF] text-[#2E3A83] group-hover:bg-[#E8EEFF]",
                        ].join(" ")}
                      >
                        {item.icon}
                      </span>

                      {isExpanded && <span className="truncate">{item.name}</span>}
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>

      <div className="mt-6 border-t border-[#EEF2FB] pt-4">
        {isExpanded && env.designMode && (
          <div className="mb-4 rounded-2xl bg-[#F5F7FF] p-3">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2E3A83]">
              Design Mode
            </p>
            <p className="mt-1 text-xs leading-5 text-[#667085]">
              API requests are disabled while the new UI is being prepared.
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={handleLogout}
          className={[
            "flex w-full items-center rounded-2xl px-3 py-3 text-sm font-medium transition",
            isExpanded ? "justify-start gap-3" : "justify-center",
            "text-[#344054] hover:bg-[#F7F8FE] hover:text-[#2E3A83]",
          ].join(" ")}
        >
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F5F7FF] text-[#2E3A83]">
            <LogOut size={18} />
          </span>
          {isExpanded && (
            <span>{isLogoutLoading ? "Signing out..." : "Logout"}</span>
          )}
        </button>
      </div>
    </aside>
  );
};

export default AppSidebar;
