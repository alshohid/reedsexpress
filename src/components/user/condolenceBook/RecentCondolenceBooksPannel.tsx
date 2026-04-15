"use client";

import React from "react";

type RecentBook = {
    id: number;
    name: string;
    years: string;
};

const RECENT: RecentBook[] = [
    { id: 1, name: "Isabel Pérez", years: "1978-2025" },
    { id: 2, name: "Demy Campbell", years: "1978-2025" },
    { id: 3, name: "Jody Albo", years: "1978-2025" },
    { id: 4, name: "Boris Johnson", years: "1978-2025" },
    { id: 5, name: "Natalia Ame", years: "1978-2025" },
];

type Props = {
    items?: RecentBook[];
    onEdit?: (item: RecentBook) => void;
    onViewAll?: () => void;
};

export default function RecentCondolenceBooksPanel({
    items = RECENT,
    onEdit,
    onViewAll,
}: Props) {
    return (
        <aside className="w-full lg:w-[420px] xl:w-[460px]">
            <div className="w-full">
                <h3 className="text-[22px] font-medium text-[#161721]">
                    Recent Condolence Books
                </h3>

                <div className="mt-4 divide-y divide-black/5">
                    {items.map((b) => (
                        <div key={b.id} className="flex items-center justify-between gap-4 py-4">
                            <div className="min-w-0">
                                <p className="text-[16px] font-semibold text-[#161721] truncate">
                                    {b.name}
                                </p>
                                <p className="mt-1 text-[13px] text-[#777980]">{b.years}</p>
                            </div>

                            <button
                                type="button"
                                onClick={() => onEdit?.(b)}
                                className="shrink-0 text-[14px] font-medium text-[#777980] hover:text-[#161721] transition"
                            >
                                Edit
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mt-6 flex justify-center">
                    <button
                        type="button"
                        onClick={onViewAll}
                        className="text-[14px] font-medium text-[#708161] underline underline-offset-4 hover:opacity-80 transition"
                    >
                        View All
                    </button>
                </div>
            </div>
        </aside>
    );
}