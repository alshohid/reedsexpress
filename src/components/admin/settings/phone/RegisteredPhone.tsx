"use client";

import { Button } from "@/components/ui/button";

type RegisteredPhoneProps = {
    phone: string;
    onContinue: () => void;
};

export default function RegisteredPhone({
    phone,
    onContinue,
}: RegisteredPhoneProps) {
    return (
        <div className="w-full space-y-4">
            <p className="text-sm text-white/70">
                We will send a verification code to this registered phone number
            </p>

            <div className="flex items-center gap-3 rounded-md border border-white/10 bg-black/30 p-3 text-white">
                <span className="text-lg">📱</span>
                <span className="text-sm">{phone}</span>
            </div>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                    type="button"
                    className="h-10 rounded-md border border-white/10 px-6 text-sm text-white/60 hover:bg-white/5"
                >
                    Skip
                </button>

                <Button
                    type="button"
                    onClick={onContinue}
                    className="h-10 px-8 text-sm font-semibold"
                >
                    Continue →
                </Button>
            </div>
        </div>
    );
}
