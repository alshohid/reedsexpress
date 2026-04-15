"use client";

import { useDeferredValue, useState } from "react";
import {
  BadgeCheck,
  ShieldAlert,
  Users,
  WalletCards,
} from "lucide-react";
import SearchInput from "@/src/components/ui/input/searchInput/SearchInput";
import SelectField, {
  type SelectOption,
} from "@/src/components/ui/input/searchInput/SelectField";
import ReusablePagination from "@/src/components/tables/ReusablePagination";
import UserManagementTable, {
  type UserRecord,
} from "@/src/components/admin/user-management/UserManagementTable";

type SummaryCard = {
  title: string;
  value: string;
  description: string;
  icon: typeof Users;
  iconClassName: string;
  cardClassName: string;
};

const PAGE_SIZE = 6;

const USER_RECORDS: UserRecord[] = [
  {
    id: "usr-01",
    name: "Olivia Bennett",
    email: "olivia.bennett@fleetos.com",
    role: "Admin",
    workspace: "North Atlantic Ops",
    workspaceMeta: "Primary admin control",
    phone: "+1 (202) 555-0139",
    joinedAt: "2024-01-12",
    status: "Active",
    lastSeen: "2 min ago",
  },
  {
    id: "usr-02",
    name: "Jackson Cole",
    email: "jackson.cole@fleetos.com",
    role: "Dispatcher",
    workspace: "Carrier Assignment Desk",
    workspaceMeta: "Load matching team",
    phone: "+1 (202) 555-0177",
    joinedAt: "2024-02-01",
    status: "Pending",
    lastSeen: "Waiting for approval",
  },
  {
    id: "usr-03",
    name: "Mia Hart",
    email: "mia.hart@fleetos.com",
    role: "Support",
    workspace: "Support Operations",
    workspaceMeta: "Customer help desk",
    phone: "+1 (202) 555-0188",
    joinedAt: "2024-02-11",
    status: "Active",
    lastSeen: "11 min ago",
  },
  {
    id: "usr-04",
    name: "Noah Ramirez",
    email: "noah.ramirez@fleetos.com",
    role: "Finance",
    workspace: "Billing Command",
    workspaceMeta: "Invoice reconciliation",
    phone: "+1 (202) 555-0191",
    joinedAt: "2024-02-23",
    status: "Suspended",
    lastSeen: "Access paused",
  },
  {
    id: "usr-05",
    name: "Sophia Turner",
    email: "sophia.turner@fleetos.com",
    role: "Dispatcher",
    workspace: "Live Dispatch Hub",
    workspaceMeta: "Regional route handling",
    phone: "+1 (202) 555-0148",
    joinedAt: "2024-03-03",
    status: "Active",
    lastSeen: "5 min ago",
  },
  {
    id: "usr-06",
    name: "Ethan Brooks",
    email: "ethan.brooks@fleetos.com",
    role: "Support",
    workspace: "Document Review Cell",
    workspaceMeta: "Onboarding verification",
    phone: "+1 (202) 555-0150",
    joinedAt: "2024-03-15",
    status: "Pending",
    lastSeen: "Pending workspace setup",
  },
  {
    id: "usr-07",
    name: "Amelia Reed",
    email: "amelia.reed@fleetos.com",
    role: "Admin",
    workspace: "Platform Access Board",
    workspaceMeta: "Role and permission control",
    phone: "+1 (202) 555-0161",
    joinedAt: "2024-03-18",
    status: "Active",
    lastSeen: "1 hour ago",
  },
  {
    id: "usr-08",
    name: "Liam Foster",
    email: "liam.foster@fleetos.com",
    role: "Finance",
    workspace: "Revenue Desk",
    workspaceMeta: "Payout monitoring",
    phone: "+1 (202) 555-0118",
    joinedAt: "2024-03-26",
    status: "Active",
    lastSeen: "32 min ago",
  },
  {
    id: "usr-09",
    name: "Charlotte Hayes",
    email: "charlotte.hayes@fleetos.com",
    role: "Dispatcher",
    workspace: "Carrier Assignment Desk",
    workspaceMeta: "Shift B",
    phone: "+1 (202) 555-0124",
    joinedAt: "2024-04-04",
    status: "Suspended",
    lastSeen: "Awaiting review",
  },
  {
    id: "usr-10",
    name: "Benjamin Lee",
    email: "benjamin.lee@fleetos.com",
    role: "Support",
    workspace: "Support Operations",
    workspaceMeta: "Night coverage",
    phone: "+1 (202) 555-0104",
    joinedAt: "2024-04-08",
    status: "Active",
    lastSeen: "14 min ago",
  },
  {
    id: "usr-11",
    name: "Harper Scott",
    email: "harper.scott@fleetos.com",
    role: "Finance",
    workspace: "Billing Command",
    workspaceMeta: "Collections follow-up",
    phone: "+1 (202) 555-0108",
    joinedAt: "2024-04-14",
    status: "Pending",
    lastSeen: "Workspace invitation sent",
  },
  {
    id: "usr-12",
    name: "Lucas Bennett",
    email: "lucas.bennett@fleetos.com",
    role: "Dispatcher",
    workspace: "Live Dispatch Hub",
    workspaceMeta: "Weekend response team",
    phone: "+1 (202) 555-0131",
    joinedAt: "2024-04-20",
    status: "Active",
    lastSeen: "7 min ago",
  },
];

const roleOptions: SelectOption[] = [
  { value: "all", label: "All Roles" },
  { value: "Admin", label: "Admin" },
  { value: "Dispatcher", label: "Dispatcher" },
  { value: "Finance", label: "Finance" },
  { value: "Support", label: "Support" },
];

const statusOptions: SelectOption[] = [
  { value: "all", label: "All Status" },
  { value: "Active", label: "Active" },
  { value: "Pending", label: "Pending" },
  { value: "Suspended", label: "Suspended" },
];

const sortOptions: SelectOption[] = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "az", label: "A - Z" },
];



export default function UserManagementContainer() {
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);
  const deferredQuery = useDeferredValue(query);

  const normalizedQuery = deferredQuery.trim().toLowerCase();

  const filteredUsers = USER_RECORDS.filter((user) => {
    const matchesQuery =
      normalizedQuery.length === 0 ||
      user.name.toLowerCase().includes(normalizedQuery) ||
      user.email.toLowerCase().includes(normalizedQuery) ||
      user.workspace.toLowerCase().includes(normalizedQuery);

    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;

    return matchesQuery && matchesRole && matchesStatus;
  }).sort((left, right) => {
    if (sortBy === "az") {
      return left.name.localeCompare(right.name);
    }

    const leftDate = new Date(left.joinedAt).getTime();
    const rightDate = new Date(right.joinedAt).getTime();

    return sortBy === "oldest" ? leftDate - rightDate : rightDate - leftDate;
  });

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-[#E7EBF7] p-5 shadow-[0_18px_45px_rgba(46,58,131,0.06)] sm:p-6">
        <div className="flex flex-col gap-5">
          <div>
            <h2 className="text-[1.75rem] font-semibold tracking-[-0.03em] text-[#101828]">
              User Management
            </h2>
          </div>

          <div className="flex w-full flex-col gap-3 xl:flex-row xl:items-center xl:justify-end">
            <SearchInput
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
              placeholder="Search by name, email, or workspace"
              containerClassName="w-full xl:max-w-[360px]"
              inputClassName="h-12 rounded-2xl border-[#D7DDF2] bg-[#FBFCFF] pl-12 text-sm text-[#101828] shadow-none placeholder:text-[#98A2B3] focus:border-[#2E3A83] focus:bg-white"
            />

            <SelectField
              value={roleFilter}
              onChange={(value) => {
                setRoleFilter(value);
                setPage(1);
              }}
              options={roleOptions}
              placeholder="All Roles"
              wrapperClassName="w-full sm:min-w-[180px] xl:w-[180px]"
              selectClassName="h-12 rounded-2xl border-[#D7DDF2] bg-[#FBFCFF] pr-10 text-sm font-medium text-[#344054] shadow-none focus:border-[#2E3A83] focus:bg-white"
            />

            <SelectField
              value={statusFilter}
              onChange={(value) => {
                setStatusFilter(value);
                setPage(1);
              }}
              options={statusOptions}
              placeholder="All Status"
              wrapperClassName="w-full sm:min-w-[180px] xl:w-[180px]"
              selectClassName="h-12 rounded-2xl border-[#D7DDF2] bg-[#FBFCFF] pr-10 text-sm font-medium text-[#344054] shadow-none focus:border-[#2E3A83] focus:bg-white"
            />

            <SelectField
              value={sortBy}
              onChange={(value) => {
                setSortBy(value);
                setPage(1);
              }}
              options={sortOptions}
              placeholder="Newest"
              wrapperClassName="w-full sm:min-w-[160px] xl:w-[160px]"
              selectClassName="h-12 rounded-2xl border-[#D7DDF2] bg-[#FBFCFF] pr-10 text-sm font-medium text-[#344054] shadow-none focus:border-[#2E3A83] focus:bg-white"
            />
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-[22px] border border-[#E5EAF7]">
          <UserManagementTable items={paginatedUsers} />

          <ReusablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredUsers.length}
            pageSize={PAGE_SIZE}
            itemLabel="results"
            onPageChange={setPage}
          />
        </div>
      </section>

    </div>
  );
}
