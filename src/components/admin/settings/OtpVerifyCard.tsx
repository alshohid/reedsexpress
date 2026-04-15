"use client";

import { Button } from "@/components/ui/button";
import OtpInput from "./email/OtpInput";
import ResendTimer from "./email/ResendTimer";
import SecurityTip from "./email/SecurityTip";
 

type OtpVerifyCardProps = {
    title: string;
    highlightedValue: string; // email or phone
    otp: string[];
    setOtp: (v: string[]) => void;
    status: "idle" | "error";
    errorMsg?: string;
    onVerify: () => void;
    onResend: () => void;
    onSkip?: () => void;
    icon?: React.ReactNode;
};

export default function OtpVerifyCard({
    title,
    highlightedValue,
    otp,
    setOtp,
    status,
    errorMsg,
    onVerify,
    onResend,
    onSkip,
    icon,
}: OtpVerifyCardProps) {
    return (
        <section className="w-full rounded-xl border border-[#26344B] bg-[#18222A] px-6 py-6 sm:px-10">
            <div className="w-full rounded-lg border border-[#252528] bg-[rgba(8,14,30,0.60)] p-6 sm:p-10">
                <div className="mx-auto flex max-w-md flex-col items-center gap-6 text-center">
                    {/* Icon */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#5B5BFF]/20 text-[#5B5BFF]">
                        {icon ?? "🔐"}
                    </div>

                    {/* Title & description */}
                    <div className="space-y-1">
                        <h3 className="text-lg font-semibold text-white">
                            {title}
                        </h3>
                        <p className="text-sm text-white/50">
                            Enter the 6-digit code sent to{" "}
                            <span className="text-[#5B5BFF]">
                                {highlightedValue}
                            </span>.
                            The code is valid for 10 minutes.
                        </p>
                    </div>

                    {/* OTP input */}
                    <OtpInput
                        value={otp}
                        onChange={(v) => {
                            setOtp(v);
                        }}
                        hasError={status === "error"}
                    />

                    {/* Error */}
                    {status === "error" && errorMsg && (
                        <p className="text-sm text-red-400">
                            {errorMsg}
                        </p>
                    )}

                    {/* Verify button */}
                    <Button
                        onClick={onVerify}
                        disabled={otp.join("").length !== 6}
                        className="h-11 w-full max-w-xs"
                    >
                        Verify & Activate 2FA
                    </Button>

                    {/* Resend */}
                    <ResendTimer onResend={onResend} />

                    {/* Skip */}
                    {onSkip && (
                        <button
                            type="button"
                            onClick={onSkip}
                            className="text-sm text-white/50 hover:underline"
                        >
                            Skip
                        </button>
                    )}
                </div>
            </div>

            <SecurityTip />
        </section>
    );
}
