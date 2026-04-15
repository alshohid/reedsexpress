"use client";

import { getErrorMessage } from "@/src/lib/getErrorMessage";
import { useGetCharityConnectionsWithNoticeQuery } from "@/src/redux/features/admin/charity/charityManagement";
import type { IDeathNotice } from "@/src/types/adminCharityTypes";
import { ReactNode, useState } from "react";
import SelectField from "../../ui/input/searchInput/SelectField";
import Pagination from "../../tables/Pagination";
import ReusableTable from "../../tables/ReusableTable";
import StatusNotice from "../../ui/StatusNotice";
import {
    CHARITY_FILTER_OPTIONS,
    DEFAULT_CHARITY_FILTER,
    type CharityFilterValue,
    formatCharityDate,
    formatCountryLabel,
    getCharityInitials,
} from "./charityUtils";

const PAGE_SIZE = 8;

const tableHeader = [
    "Charity Name",
    "User Name",
    "Country/Region",
    "Assigned On",
];

function FilterIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M4 5h16M7 12h10M10 19h4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
        </svg>
    );
}

export default function CharityConnectionTable() {
    const [range, setRange] = useState<CharityFilterValue>(DEFAULT_CHARITY_FILTER);
    const [currentPage, setCurrentPage] = useState(1);

    const {
        data: connectionResponse,
        isLoading,
        isFetching,
        error,
    } = useGetCharityConnectionsWithNoticeQuery({
        page: currentPage,
        limit: PAGE_SIZE,
        ...(range ? { filter: range } : {}),
    });

    const connections = connectionResponse?.success ? connectionResponse.data : [];
    const totalPages = Math.max(connectionResponse?.lastPage ?? 1, 1);
    const paginationPage = Math.min(
        connectionResponse?.page ?? currentPage,
        totalPages,
    );
    const listErrorMessage =
        connectionResponse && !connectionResponse.success
            ? connectionResponse.message || "Failed to load charity connections."
            : error
                ? getErrorMessage(error, "Failed to load charity connections.")
                : "";

    const handlePageChange = (page: number) => {
        setCurrentPage(Math.min(Math.max(page, 1), totalPages));
    };

    const rowRenderers: ((item: IDeathNotice, index: number) => ReactNode)[] = [
        (item) => (
            <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#EAF3E0] text-sm font-semibold text-[#3F4A3B]">
                    {getCharityInitials(item.charity.charity_name)}
                </div>

                <div className="min-w-0">
                    <p className="truncate text-[14px] font-medium text-[#161721]">
                        {item.charity.charity_name}
                    </p>
                    <p className="mt-1 text-[12px] text-[#7D8577]">
                        Ref: {item.charity.id.slice(-8)}
                    </p>
                </div>
            </div>
        ),
        (item) => (
            <div>
                <p className="text-[14px] text-[#161721]">
                    {item.user?.name || "Unknown User"}
                </p>
                <p className="mt-1 text-[12px] text-[#7D8577]">
                    {item.user?.id ? `User: ${item.user.id.slice(-6)}` : "No linked user"}
                </p>
            </div>
        ),
        (item) => (
            <span className="text-[14px] text-[#4F5949]">
                {formatCountryLabel(item.charity.country)}
            </span>
        ),
        (item) => (
            <div>
                <p className="text-[14px] text-[#161721]">
                    {formatCharityDate(item.created_at)}
                </p>
                <p className="mt-1 text-[12px] text-[#7D8577]">
                    Charity created {formatCharityDate(item.charity.created_at)}
                </p>
            </div>
        ),
    ];

    return (
        <section className="w-full">
            <div className="mb-4 rounded-[18px] border border-[#ECF0E6] bg-[linear-gradient(180deg,#FCFDFB_0%,#F7FAF3_100%)] px-4 py-4 sm:px-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h3 className="text-[1rem] font-medium text-[#161721]">
                            Charity Picked by Funeral Directors
                        </h3>
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-[#EAF3E0] px-3 py-1 text-[12px] font-medium text-[#3F4A3B]">
                                {connectionResponse?.total ?? 0} connections
                            </span>
                            {isFetching && connectionResponse ? (
                                <span className="rounded-full bg-white px-3 py-1 text-[12px] text-[#667164]">
                                    Refreshing list...
                                </span>
                            ) : null}
                        </div>
                    </div>

                    <div className="w-full max-w-[230px]">
                        <div className="mb-2 inline-flex items-center gap-2 text-[12px] font-medium text-[#5C6756]">
                            <FilterIcon />
                            Filter by timeline
                        </div>
                        <SelectField
                            options={CHARITY_FILTER_OPTIONS}
                            placeholder="All"
                            value={range}
                            onChange={(value) => {
                                setCurrentPage(1);
                                setRange(value as CharityFilterValue);
                            }}
                            selectClassName="
                h-11 !py-2 bg-[#E7F2DD] border-[#D7E7C8]
                text-[#3F4A3B] focus:border-[#C3D4B3]
              "
                        />
                    </div>
                </div>
            </div>

            {listErrorMessage ? (
                <StatusNotice
                    variant="error"
                    title="Unable To Load"
                    message={listErrorMessage}
                    className="mb-4"
                />
            ) : null}

            <div className="w-full overflow-x-auto">
                <ReusableTable<IDeathNotice>
                    tableHeader={tableHeader}
                    items={connections}
                    rowRenderers={rowRenderers}
                    getRowKey={(row) => row.id}
                    minTableWidthPx={980}
                    isLoading={isLoading && !connectionResponse}
                    emptyText="No charity connections found for the selected filter."
                    wrapperClassName="
            rounded-none border-0 bg-transparent shadow-none
            [&_tbody_tr:nth-child(even)]:bg-[#FAFBF8]
            [&_tbody_tr:nth-child(odd)]:bg-white
          "
                    headerCellClassName="
            bg-[#3F4A3B] px-5 py-4 text-left
            text-[14px] font-medium text-white/90
            first:rounded-l-[6px] last:rounded-r-[6px]
          "
                    bodyCellClassName="
            px-5 py-5 text-left text-[14px] text-gray-600
            border-b border-black/5 align-middle
          "
                />
            </div>

            <Pagination
                currentPage={paginationPage}
                totalPages={totalPages}
                totalItems={connectionResponse?.total ?? connections.length}
                pageSize={connectionResponse?.limit ?? PAGE_SIZE}
                itemLabel="connections"
                disabled={isFetching}
                onPageChange={handlePageChange}
            />
        </section>
    );
}
