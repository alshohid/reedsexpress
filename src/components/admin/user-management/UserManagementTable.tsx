"use client";

import {
  BadgeCheck,
  Clock3,
  MoreHorizontal,
  ShieldAlert,
} from "lucide-react";
import ReusableTable from "@/src/components/tables/ReusableTable";

export type UserRole = "Admin" | "Dispatcher" | "Finance" | "Support";
export type UserStatus = "Active" | "Pending" | "Suspended";

export type UserRecord = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  workspace: string;
  workspaceMeta: string;
  phone: string;
  joinedAt: string;
  status: UserStatus;
  lastSeen: string;
};

type UserManagementTableProps = {
  items: UserRecord[];
  emptyText?: string;
};

const tableHeader = ["User", "Role", "Workspace", "Contact", "Joined", "Status", ""];

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "2-digit",
  year: "numeric",
});

const roleBadgeClasses: Record<UserRole, string> = {
  Admin: "border-[#D7DDF2] bg-[#F8FAFF] text-[#2E3A83]",
  Dispatcher: "border-[#D8E5FF] bg-[#EEF4FF] text-[#3157B7]",
  Finance: "border-[#F5DDB2] bg-[#FFF7E8] text-[#B36B00]",
  Support: "border-[#D8F1EB] bg-[#EEFBF7] text-[#0F8A6C]",
};

const statusBadgeClasses: Record<UserStatus, string> = {
  Active: "border-[#B8E7C1] bg-[#ECFDF3] text-[#16A34A]",
  Pending: "border-[#F9D59A] bg-[#FFF7E8] text-[#D97706]",
  Suspended: "border-[#F2B7B7] bg-[#FFF1F1] text-[#DC2626]",
};

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function formatJoinedDate(value: string) {
  return dateFormatter.format(new Date(value));
}

function StatusBadge({ status }: { status: UserStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${statusBadgeClasses[status]}`}
    >
      {status === "Active" && <BadgeCheck size={14} />}
      {status === "Pending" && <Clock3 size={14} />}
      {status === "Suspended" && <ShieldAlert size={14} />}
      {status}
    </span>
  );
}

export default function UserManagementTable({
  items,
  emptyText = "No users matched the current filters.",
}: UserManagementTableProps) {
  return (
    <ReusableTable<UserRecord>
      tableHeader={tableHeader}
      items={items}
      getRowKey={(user) => user.id}
      minTableWidthPx={980}
      wrapperClassName="rounded-none border-0 bg-transparent shadow-none"
      tableClassName="w-full border-separate border-spacing-0"
      tableBodyClassName="divide-y-0"
      rowClassName="bg-white transition hover:bg-[#FBFCFF]"
      headerCellClassName="border-b border-[#E5EAF7] bg-[#F8FAFF] px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.14em] text-[#667085]"
      bodyCellClassName="border-b border-[#EEF1F7] px-5 py-4 align-middle"
      emptyText={emptyText}
      emptyCellClassName="block px-5 py-16 text-center text-sm text-[#667085]"
      rowRenderers={[
        (user) => (
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#EEF2FF] text-sm font-semibold text-[#2E3A83]">
              {getInitials(user.name)}
            </div>
            <div>
              <p className="text-sm font-semibold text-[#101828]">{user.name}</p>
              <p className="mt-1 text-xs text-[#667085]">{user.email}</p>
            </div>
          </div>
        ),
        (user) => (
          <span
            className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${roleBadgeClasses[user.role]}`}
          >
            {user.role}
          </span>
        ),
        (user) => (
          <div>
            <p className="text-sm font-medium text-[#101828]">{user.workspace}</p>
            <p className="mt-1 text-xs text-[#98A2B3]">{user.workspaceMeta}</p>
          </div>
        ),
        (user) => (
          <div>
            <p className="text-sm text-[#475467]">{user.phone}</p>
            <p className="mt-1 text-xs text-[#98A2B3]">{user.lastSeen}</p>
          </div>
        ),
        (user) => (
          <span className="text-sm text-[#475467]">
            {formatJoinedDate(user.joinedAt)}
          </span>
        ),
        (user) => <StatusBadge status={user.status} />,
        (user) => (
          <div className="flex justify-end">
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[#E1E7F5] text-[#667085] transition hover:bg-[#F7F8FE] hover:text-[#2E3A83]"
              aria-label={`Open ${user.name}`}
            >
              <MoreHorizontal size={16} />
            </button>
          </div>
        ),
      ]}
    />
  );
}
