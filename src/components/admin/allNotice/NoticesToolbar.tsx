"use client";

import { useQueryState } from "@/src/lib/helper/useQueryState";



export default function NoticesToolbar({ type, title, onPrimaryClick, primaryLabel }: { type?: "admin" | "undertaker", title: string, onPrimaryClick?: () => void, primaryLabel?: string }) {
    const [view, setView] = useQueryState("view", "list"); // list | grid

    return (
        <div className="w-full flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-[1rem] text-[#161721] font-medium">{title}</div>

            <div className="flex flex-wrap items-center gap-2">
                {/* Filter (placeholder) */}
                <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-[0.875rem] text-gray-700 hover:bg-gray-50">
                    <span className="text-gray-500">☰</span>
                    Filter
                </button>

                {/* View toggles */}
                <button
                    onClick={() => setView("list")}
                    className={[
                        "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-[0.875rem] font-medium transition",
                        view === "list"
                            ? "bg-[#E7F2DD] text-[#3F4A3B]"
                            : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50",
                    ].join(" ")}
                >
                    ≡ List View
                </button>

                <button
                    onClick={() => setView("grid")}
                    className={[
                        "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-[0.875rem] font-medium transition",
                        view === "grid"
                            ? "bg-[#E7F2DD] text-[#3F4A3B]"
                            : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50",
                    ].join(" ")}
                >
                    ▦ Grid View
                </button>
                {type && <button
                    type="button"
                    onClick={onPrimaryClick}
                    className="
            h-10 w-full sm:w-auto
            inline-flex items-center justify-center gap-2
            rounded-lg bg-[#3F4A3B] px-4
            text-[1rem] font-medium text-white
            hover:opacity-90 transition
          "
                >
                    {primaryLabel}
                    <span aria-hidden className="text-white/90">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M7 17L17 7"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                            <path
                                d="M9 7H17V15"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </span>
                </button>}

            </div>
        </div>
    );
}