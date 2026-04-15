/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import {
    CHARITY_FILTER_OPTIONS,
    DEFAULT_CHARITY_FILTER,
    type CharityFilterValue,
} from "@/src/components/CharityManagement/components/charityUtils";
import { getErrorMessage } from "@/src/lib/getErrorMessage";
import { useGetAllAdminRegionalDeathNoticeQuery } from "@/src/redux/features/admin/rigionalConfiguration/regionalConfiguration";
import { IRegionalConfigurationData } from "@/src/types/regionalConfigurationTypes";
import { ReactNode, useEffect, useState } from "react";
import Pagination from "./Pagination";
import ReusableTable from "./ReusableTable";
import SelectField from "../ui/input/searchInput/SelectField";
import StatusNotice from "../ui/StatusNotice";

const PAGE_SIZE = 10;
const tableHeader = ["Region", "Town", "Total Death"];

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

export default function AllDeathsTable() {
    const [range, setRange] = useState<CharityFilterValue>(DEFAULT_CHARITY_FILTER);
    const [currentPage, setCurrentPage] = useState(1);

    const {
        data: regionalResponse,
        error,
        isLoading,
        isFetching,
    } = useGetAllAdminRegionalDeathNoticeQuery({
        page: currentPage,
        limit: PAGE_SIZE,
        filter: range,
    });

    const deaths = regionalResponse?.success ? regionalResponse.data : [];
    const listErrorMessage =
        regionalResponse && !regionalResponse.success
            ? regionalResponse.message || "Failed to load regional deaths."
            : error
                ? getErrorMessage(error, "Failed to load regional deaths.")
                : "";

    useEffect(() => {
        setCurrentPage(1);
    }, [range]);

    useEffect(() => {
        if (regionalResponse?.lastPage && currentPage > regionalResponse.lastPage) {
            setCurrentPage(regionalResponse.lastPage);
        }
    }, [currentPage, regionalResponse?.lastPage]);

    const rowRenderers: ((item: IRegionalConfigurationData, index: number) => ReactNode)[] = [
        (item) => <span className="text-[1rem] text-gray-700">{item.country || "-"}</span>,
        (item) => <span className="text-[1rem] text-gray-700">{item.town || "-"}</span>,
        (item) => <span className="text-[1rem] text-gray-700">{item._count?._all ?? 0}</span>,
    ];

    const handlePageChange = (page: number) => {
        if (!regionalResponse?.lastPage) {
            setCurrentPage(page);
            return;
        }

        setCurrentPage(Math.min(Math.max(page, 1), regionalResponse.lastPage));
    };

    return (
        <section className="w-full">
            <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-[1rem] font-medium text-[#161721]">All the Deaths</h3>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                    <button
                        type="button"
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-[12px] font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                        <span className="text-gray-600">
                            <FilterIcon />
                        </span>
                        Filter
                    </button>

                    <div className="w-full sm:w-[170px]">
                        <SelectField
                            options={CHARITY_FILTER_OPTIONS}
                            placeholder="All"
                            value={range}
                            onChange={(value) => setRange((value || DEFAULT_CHARITY_FILTER) as CharityFilterValue)}
                            selectClassName="
                h-10 !py-2
                bg-[#E7F2DD] border-[#E7F2DD]
                text-[#3F4A3B]
                focus:border-[#C3D4B3]
              "
                        />
                    </div>
                </div>
            </div>

            {listErrorMessage ? (
                <StatusNotice
                    variant="error"
                    title="Unable To Load Death Notices"
                    message={listErrorMessage}
                    className="mb-4"
                />
            ) : null}

            <div className="w-full overflow-x-auto">
                <ReusableTable<IRegionalConfigurationData>
                    tableHeader={tableHeader}
                    items={deaths}
                    rowRenderers={rowRenderers}
                    getRowKey={(row, index) => `${row.country}-${row.town}-${index}`}
                    minTableWidthPx={920}
                    isLoading={isLoading && !regionalResponse}
                    emptyText="No regional death notices found."
                    wrapperClassName="
    rounded-none border-0 bg-transparent shadow-none
    [&_tbody_tr:nth-child(even)]:bg-[#FAFAFA]
    [&_tbody_tr:nth-child(odd)]:bg-white
  "
                    headerCellClassName="
    bg-[#3F4A3B]
    px-5 py-4
    text-left
    text-[14px] font-medium text-white/90
    first:rounded-l-[6px] last:rounded-r-[6px]
  "
                    bodyCellClassName="
    px-5 py-6
    text-left
    text-[14px] text-gray-600
    border-b border-black/5
  "
                />
            </div>

            <Pagination
                currentPage={regionalResponse?.page ?? currentPage}
                totalPages={regionalResponse?.lastPage ?? 1}
                totalItems={regionalResponse?.total ?? deaths.length}
                pageSize={regionalResponse?.limit ?? PAGE_SIZE}
                itemLabel="death notices"
                disabled={isFetching}
                onPageChange={handlePageChange}
            />
        </section>
    );
}
