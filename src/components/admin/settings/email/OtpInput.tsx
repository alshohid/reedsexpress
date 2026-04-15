"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
    value: string[];
    onChange: (val: string[]) => void;
    length?: number;
    hasError?: boolean;
};

export default function OtpInput({
    value,
    onChange,
    length = 6,
    hasError = false,
}: Props) {
    const inputs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (index: number, v: string) => {
        if (!/^\d?$/.test(v)) return;

        const next = [...value];
        next[index] = v;
        onChange(next);

        if (v && inputs.current[index + 1]) {
            inputs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !value[index] && inputs.current[index - 1]) {
            inputs.current[index - 1]?.focus();
        }
    };

    return (
        <div
            className="
            flex
            w-full
            max-w-xs
            justify-center
            gap-2
            sm:gap-3
        "
        >
            {Array.from({ length }).map((_, i) => (
                <input
                    key={i}
                    ref={(el:any) => (inputs.current[i] = el)}
                    value={value[i] || ""}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    maxLength={1}
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    className={cn(
                        `
                    aspect-square
                    w-9
                    sm:w-12
                    md:w-14
                    rounded-md
                    border
                    bg-transparent
                    text-center
                    text-base
                    sm:text-lg
                    font-semibold
                    text-white
                    outline-none
                    transition
                    `,
                        hasError
                            ? "border-red-500"
                            : "border-[#3A3A40] focus:border-[#5B5BFF] focus:ring-2 focus:ring-[#5B5BFF]/20"
                    )}
                />
            ))}
        </div>
    );
}
