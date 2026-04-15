"use client";

import SelectField from "../../ui/input/searchInput/SelectField";



type Option = { label: string; value: string };

type ActivityTrendsHeaderProps = {
    title?: string;
    options?: Option[];
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    primaryLabel?: string;
    onPrimaryClick?: () => void;
};

export default function ActivityTrendsHeader({
    title = "Activity Trends",
    options,
    value,
    onChange,
    placeholder = "This Week",
    primaryLabel = "Transfer Fund to Charity",
    onPrimaryClick,
}: ActivityTrendsHeaderProps) {
    return (
        <div className="w-full flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Left */}
            <h2 className="text-[1.625rem] sm:text-[1.25rem] font-medium text-[#161721]">
                {title}
            </h2>

            {/* Right */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                {/* ✅ Your reusable SelectField */}
                <div className="w-full sm:w-[160px]">
                    <SelectField
                        options={options}
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                    />
                </div>

                {/* Primary button */}
                <button
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
                </button>
            </div>
        </div>
    );
}