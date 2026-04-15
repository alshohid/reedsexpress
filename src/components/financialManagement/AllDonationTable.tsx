"use client";

import { ReactNode, useMemo, useState } from "react";
import SelectField, { SelectOption } from "../ui/input/searchInput/SelectField";
import ReusableTable from "../tables/ReusableTable";


// Table row data type
type FundingRow = {
    id: number;
    charityName: string;
    donated_amount: string;
    deceased_person: string;
    date: string;
};

const tableHeader = [
    "User Name",
    "Donated Amount",
    "Deceased Person",
    "Date",
    "Action",
];

// Table data
const data: FundingRow[] = [
    {
        id: 1,
        charityName: "British Heart Foundation",
        donated_amount: "€20,000",
        deceased_person: "United Kingdom",
        date: "07/2/26",
    },
    {
        id: 2,
        charityName: "RNLI - Royal National Lifeboat Institution",
        donated_amount: "€10,000",
        deceased_person: "United Kingdom",
        date: "07/2/26",
    },
    {
        id: 3,
        charityName: "Global Green Hospice",
        donated_amount: "€20,000",
        deceased_person: "United Kingdom",
        date: "07/2/26",
    },
    {
        id: 4,
        charityName: "Peace & Rest Foundation",
        donated_amount: "€30,000",
        deceased_person: "United Kingdom",
        date: "07/2/26",
    },
    {
        id: 5,
        charityName: "Cancer Research UK",
        donated_amount: "€10,000",
        deceased_person: "United Kingdom",
        date: "07/2/26",
    },
];

// Filter Icon Component
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

// Dots Icon for actions
function DotsIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm7 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM5 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                fill="currentColor"
            />
        </svg>
    );
}


export default function AllDonationTable({
    openViewModal,
}: {
    openViewModal: () => void;
}) {
    const [range, setRange] = useState<string>("last-month");


    const options: SelectOption[] = useMemo(
        () => [
            { label: "Last Month", value: "last-month" },
            { label: "This Month", value: "this-month" },
            { label: "This Week", value: "this-week" },
        ],
        []
    );

    // Row renderers for the table
    const rowRenderers: ((item: FundingRow, index: number) => ReactNode)[] = [
        // Charity Name
        (item) => <span className="text-[1rem] text-gray-700">{item.charityName}</span>,
        (item) => <span className="text-[1rem] text-gray-700">{item.donated_amount}</span>,

        // Funeral Home Name
        (item) => <span className="text-[1rem] text-gray-700">{item.deceased_person}</span>,

        // Country/Region


        (item) => <span className="text-[1rem] text-gray-700">{item.date}</span>,

        // Action (dots icon for options)
        () => (
            <div className="flex justify-center">
                <button
                    onClick={() => openViewModal()}
                    type="button"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-700 hover:bg-gray-100 transition"
                    aria-label="Row actions"
                >
                    View
                </button>
            </div>
        ),
    ];

    return (
        <section className="w-full">
            {/* Top bar */}
            <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-[1rem] font-medium text-[#161721]">See All Funding</h3>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                    <button
                        type="button"
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-[12px] font-medium text-gray-700 hover:bg-gray-50 transition"
                    >
                        <span className="text-gray-600">
                            <FilterIcon />
                        </span>
                        Filter
                    </button>

                    <div className="w-full sm:w-[170px]">
                        <SelectField
                            options={options}
                            placeholder="Last Month"
                            value={range}
                            onChange={setRange}
                            wrapperClassName=""
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

            {/* Table */}
            <div className="w-full overflow-x-auto">
                <ReusableTable<FundingRow>
                    tableHeader={tableHeader}
                    items={data}
                    rowRenderers={rowRenderers}
                    getRowKey={(row) => row.id}
                    minTableWidthPx={1100}
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

            {/* Pagination (same) */}
            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
                <button className="inline-flex items-center gap-2 rounded-lg bg-[#E7F2DD] px-4 py-2 text-[12px] font-medium text-[#3F4A3B] hover:opacity-90">
                    ← Next
                </button>

                <div className="flex items-center gap-2">
                    {[1, 2, 3].map((n) => (
                        <button
                            key={n}
                            className={[
                                "h-9 w-9 rounded-lg text-[12px] font-medium",
                                n === 1 ? "bg-[#E7F2DD] text-[#3F4A3B]" : "text-gray-600 hover:bg-gray-100",
                            ].join(" ")}
                        >
                            {n}
                        </button>
                    ))}
                    <span className="px-2 text-gray-400">...</span>
                    {[8, 9, 10].map((n) => (
                        <button
                            key={n}
                            className="h-9 w-9 rounded-lg text-[12px] font-medium text-gray-600 hover:bg-gray-100"
                        >
                            {n}
                        </button>
                    ))}
                </div>

                <button className="inline-flex items-center gap-2 rounded-lg bg-[#3F4A3B] px-4 py-2 text-[12px] font-medium text-white hover:opacity-90">
                    Next →
                </button>
            </div>

        </section>
    );
}