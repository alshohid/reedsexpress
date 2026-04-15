"use client";

import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import OtpInput from "../../admin/settings/email/OtpInput";
import ResendTimer from "../../admin/settings/email/ResendTimer";

type OtpStatus = "idle" | "error" | "success";

type Props = {
    title?: string;
    maskedEmail: string;
    otp: string[];
    setOtp: (v: string[]) => void;
    status: OtpStatus;
    errorMsg: string;
    onResend: () => void;
    onCancel: () => void;
    onVerifyDelete: () => void;
    onClose?: () => void;
};

export default function DeleteOtpVerifyCard({
    title = "Verify your identity",
    maskedEmail,
    otp,
    setOtp,
    status,
    errorMsg,
    onResend,
    onCancel,
    onVerifyDelete,
 
}: Props) {
    const canSubmit = useMemo(() => otp.join("").length === 6, [otp]);

    return (
        <section className="w-full  rounded-xl border border-[#26344B] bg-[#111B23] overflow-hidden">
            {/* Header */}
            <div className="w-full">
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                    <p className="text-[#EE162A] text-sm font-semibold">Delete Account</p>

                </div>

                {/* Body */}
                <div className="px-4 py-4 sm:px-6 sm:py-5 flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <h3 className="text-white text-base font-semibold">{title}</h3>
                        <p className="text-sm text-white/50 leading-relaxed">
                            To permanently delete your account, please enter the 6-digit code we just sent to your registered email address{" "}
                            <span className="text-[#5B5CFF]">{maskedEmail}</span>.
                        </p>
                    </div>

                    {/* OTP */}
                    <div className="flex flex-col justify-center items-center gap-2">
                        <OtpInput value={otp} onChange={(v) => setOtp(v)} hasError={status === "error"} />

                        {status === "error" && errorMsg ? <p className="text-xs text-red-400">{errorMsg}</p> : null}

                        {/* Resend row */}
                        <div className="text-xs text-white/40 flex items-center justify-center gap-1">
                            <span>Didn’t receive the code?</span>
                            <ResendTimer onResend={onResend} />
                        </div>
                    </div>
                </div>

                {/* Footer buttons */}
                <div className="px-4 pb-4 sm:px-6 sm:pb-5 flex flex-col justify-end sm:flex-row items-center gap-3">
                    <Button type="button" variant="secondary" onClick={onCancel} className=" h-10 bg-white/10 hover:bg-white/15 text-white/80 rounded-lg">
                        Cancel
                    </Button>

                    <Button type="button" onClick={onVerifyDelete} disabled={!canSubmit} className={cn(" h-10 rounded-lg bg-[#EE162A] hover:brightness-110 text-white disabled:opacity-40 disabled:cursor-not-allowed")}>
                        Verify & Delete Account
                    </Button>
                </div>
        </div>
        </section>
    );
}
