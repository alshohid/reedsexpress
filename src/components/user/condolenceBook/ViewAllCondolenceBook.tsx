"use client";

import React, { useMemo } from "react";
import SelectField, { SelectOption } from "@/src/components/ui/input/searchInput/SelectField"; // যদি লাগবে পরে
import ReusableTable from "@/src/components/tables/ReusableTable";

type CondolenceRow = {
    id: number;
    name: string;
    years: string;
    created: string;
};

const tableHeader = ["Name", "Date", "Action"];

const data: CondolenceRow[] = [
    { id: 1, name: "Isabel Pérez", years: "1978-2025", created: "Created 02/1/26" },
    { id: 2, name: "Demy Campbell", years: "1978-2025", created: "Created 02/1/26" },
    { id: 3, name: "Jody Albo", years: "1978-2025", created: "Created 02/1/26" },
    { id: 4, name: "Isabel Pérez", years: "1978-2025", created: "Created 02/1/26" },
    { id: 5, name: "Boris Johnson", years: "1978-2025", created: "Created 02/1/26" },
    { id: 6, name: "Natalia Ame", years: "1978-2025", created: "Created 02/1/26" },
];

export default function ViewAllCondolenceBook() {
    const rowRenderers = useMemo(
        () => [
            // Name
            (item: CondolenceRow) => (
                <div className="min-w-0">
                    <p className="text-[14px] sm:text-[15px] font-semibold text-[#161721] truncate">
                        {item.name}
                    </p>
                    <p className="mt-1 text-[12px] text-[#777980]">{item.years}</p>
                </div>
            ),

            // Date
            (item: CondolenceRow) => (
                <span className="text-[13px] sm:text-[14px] text-[#777980]">
                    {item.created}
                </span>
            ),

            // Action
            (item: CondolenceRow) => (
                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={() => console.log("edit", item.id)}
                        className="text-[13px] sm:text-[14px] font-medium text-[#777980] hover:text-[#161721] transition"
                    >
                        Edit
                    </button>
                </div>
            ),
        ],
        []
    );

    return (
        <section className="w-full">
            {/* Table */}
            <div className="w-full overflow-x-auto">
                <ReusableTable<CondolenceRow>
                    tableHeader={tableHeader}
                    items={data}
                    rowRenderers={rowRenderers}
                    getRowKey={(row) => row.id}
                    minTableWidthPx={820}
                    wrapperClassName="
            rounded-none border-0 bg-transparent shadow-none
            [&_tbody_tr:nth-child(even)]:bg-[#FAFAFA]
            [&_tbody_tr:nth-child(odd)]:bg-white
          "
                    headerCellClassName="
            px-5 py-4 text-left
            text-[14px] font-semibold text-[#161721]
            bg-white
            border-b border-black/5
          "
                    bodyCellClassName="
            px-5 py-5
            text-left
            border-b border-black/5
            align-top
          "
                />
            </div>

            {/* Pagination (same style) */}
            <div className="mt-4 pt-4 border-t border-[#CFE3BE] flex flex-wrap items-center justify-between gap-3">
                <button className="inline-flex items-center gap-2 rounded-lg border border-[#8FA17E] bg-[#E7F2DD] px-4 py-2 text-[12px] font-medium text-[#3F4A3B] hover:opacity-90">
                    ← Next
                </button>

                <div className="flex items-center gap-2">
                    {[1, 2, 3].map((n) => (
                        <button
                            key={n}
                            className={[
                                "h-9 w-9 rounded-lg text-[12px] font-medium",
                                n === 1
                                    ? "bg-[#6B775B] text-white"
                                    : "text-gray-600 hover:bg-gray-100",
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

                <button className="inline-flex items-center gap-2 rounded-lg bg-[#3F4A3B] px-5 py-2 text-[12px] font-medium text-white hover:opacity-90">
                    Next →
                </button>
            </div>
        </section>
    );
}