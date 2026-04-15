"use client";

import React from "react";

type PlanCardProps = {
    title: string;              // "Pay-As-You-Go"
    price: string;              // "£35.00"
    periodLabel: string;        // "/post" or "/month"
    features: string[];
    isPopular?: boolean;
    onEdit?: () => void;
    editLabel?: string;         // default "Edit Plan"
    onDelete?: () => void;
    deleteLabel?: string;
    isDeleteLoading?: boolean;
};

function CheckIcon() {
    return (
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#6E7D62] text-white shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                    d="M20 6L9 17l-5-5"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </span>
    );
}

export default function PlanCard({
    title,
    price,
    periodLabel,
    features,
    isPopular = false,
    onEdit,
    editLabel = "Edit Plan",
    onDelete,
    deleteLabel = "Delete Plan",
    isDeleteLoading = false,
}: PlanCardProps) {
    return (
        <div className="relative w-full rounded-[0.75rem] border border-[#E9E9EA] bg-white p-6">
            {/* Popular pill */}
            {isPopular && (
                <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                    <span className="inline-flex items-center justify-center rounded-full bg-[#B58A00] px-5 py-1 text-[12px] font-medium text-white">
                        Popular Plan
                    </span>
                </div>
            )}

            <div className="flex flex-col items-center gap-6">
                {/* Title */}
                <h3 className="text-[18px] font-medium text-[#161721] text-center">
                    {title}
                </h3>

                {/* Price */}
                <div className="flex items-end justify-center gap-2">
                    <span className="text-[52px] leading-none font-semibold text-black">
                        {price}
                    </span>
                    <span className="pb-2 text-[14px] text-[#777980]">{periodLabel}</span>
                </div>

                <p className="text-[16px] font-medium text-[#161721]">Core includes</p>

                {/* Features */}
                <ul className="w-full max-w-[360px] space-y-4">
                    {features.map((f) => (
                        <li
                            key={f}
                            className="flex items-center gap-3 text-center"
                        >
                            <CheckIcon />
                            <span className="text-[#777980] text-[1.25rem] leading-[150%]">
                                {f}
                            </span>
                        </li>
                    ))}
                </ul>

                {/* Button */}
                <div className={`mt-2 grid w-full gap-3 ${onDelete ? "sm:grid-cols-2" : "grid-cols-1"}`}>
                    <button
                        type="button"
                        onClick={onEdit}
                        disabled={!onEdit}
                        className="
              h-12 w-full rounded-[10px]
              bg-[linear-gradient(180deg,#394034_0%,#4F5747_100%)]
              text-white text-[14px] font-medium
              transition hover:opacity-90
              disabled:cursor-not-allowed disabled:opacity-60
            "
                    >
                        {editLabel}
                    </button>

                    {onDelete ? (
                        <button
                            type="button"
                            onClick={onDelete}
                            disabled={isDeleteLoading}
                            className="
              h-12 w-full rounded-[10px]
              border border-[#F2D1D1]
              bg-[#FFF7F7]
              text-[14px] font-medium text-[#B42318]
              transition hover:bg-[#FFF0F0]
              disabled:cursor-not-allowed disabled:opacity-60
            "
                        >
                            {isDeleteLoading ? "Deleting..." : deleteLabel}
                        </button>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
