"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type EnterPhoneProps = {
    value: string;
    onChange: (v: string) => void;
    error?: string;
    onSend: () => void;
};

export default function EnterPhone({
    value,
    onChange,
    error,
    onSend,
}: EnterPhoneProps) {
    return (
        <div className="w-full space-y-4">
            <label className="block text-sm text-white/70">
                Enter your verified phone number
            </label>

            <div
                className={cn(
                    "flex items-center gap-3 rounded-md border bg-transparent p-3",
                    error ? "border-red-500" : "border-white/20"
                )}
            >
                {/* Country icon (static for now) */}
                <span className="text-lg">🇺🇸</span>

                <input
                    type="tel"
                    inputMode="tel"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="+1265349813"
                    className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/40"
                />
            </div>

            {error && (
                <p className="text-xs text-red-400">
                    {error}
                </p>
            )}

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                    type="button"
                    className="h-10 rounded-md border border-white/10 px-6 text-sm text-white/60 hover:bg-white/5"
                >
                    Skip
                </button>

                <Button
                    type="button"
                    onClick={onSend}
                    className="h-10 px-8 text-sm font-semibold"
                >
                    Send Verification Code →
                </Button>
            </div>
        </div>
    );
}
