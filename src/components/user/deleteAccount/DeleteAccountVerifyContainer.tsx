"use client";

import { useMemo, useState } from "react";
import { AlertTriangle } from "lucide-react";
import DeleteOtpVerifyCard from "./DeleteOtpVerifyCard";
import { useModal } from "@/src/hooks/useModal";
import DeleteAccountInformationModal from "./DeletedInformationModal";

type OtpStatus = "idle" | "error" | "success";

export default function DeleteAccountVerifyContainer() {
    const {isOpen:isDeletedinfoModal ,openModal:openDeletedInfoModal,closeModal:closeDeletedInfoModal }=useModal()
    const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
    const [status, setStatus] = useState<OtpStatus>("idle");
    const [errorMsg, setErrorMsg] = useState("");

    const maskedEmail = useMemo(() => "jannatul***@gmail.com", []);

    const handleVerifyDelete = async () => {
        const code = otp.join("");

        if (code.length !== 6) {
            setStatus("error");
            setErrorMsg("Please enter the complete 6-digit code.");
            return;
        }

        if (code !== "123456") {
            setStatus("error");
            setErrorMsg("That code didn’t work. Check the code and try again.");
            return;
        }
        openDeletedInfoModal()
        setStatus("success");
    };

    return (
        <div className="w-full">
            <section className="w-full rounded-xl border border-[#26344B] bg-[#18222A] px-6 py-6 sm:px-10 sm:py-10 flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <h2 className="text-[#EE162A] text-[1.125rem] sm:text-[1.25rem] font-semibold leading-[150%] tracking-[-0.025rem]">
                        Permanently Delete Account
                    </h2>
                    <p className="text-sm text-white/40">This action cannot be undone.</p>
                </div>

                <div className="h-px w-full bg-white/10" />

                {/* OTP Card wrapper (responsive) */}
                <div className="w-full flex justify-center">
                    <div className="w-full">
                        <DeleteOtpVerifyCard
                            maskedEmail={maskedEmail}
                            otp={otp}
                            setOtp={(v) => {
                                setOtp(v);
                                if (status === "error") {
                                    setStatus("idle");
                                    setErrorMsg("");
                                }
                            }}
                            status={status}
                            errorMsg={errorMsg}
                            onResend={() => console.log("resend delete otp")}
                            onCancel={() => console.log("cancel delete flow")}
                            onVerifyDelete={handleVerifyDelete}
                            onClose={() => console.log("close modal")}
                        />
                    </div>
                </div>

                {/* Outer NOTE (only once) */}
                <div className="w-full rounded-xl border border-[#F9C80E]/40 bg-[#FDC7001A] px-4 py-4 sm:px-6 sm:py-5 flex items-start gap-3">
                    <div className="mt-0.5 grid place-items-center h-8 w-8 rounded-lg bg-[#FDC7001A] border border-[#F9C80E]/30 shrink-0">
                        <AlertTriangle className="h-4 w-4 text-[#F9C80E]" />
                    </div>

                    <p className="text-sm text-[#F9C80E]/90 leading-relaxed">
                        <span className="font-medium">Note:</span> You have a 30-day grace period from the date of deletion to recover your account. If you change your mind within this time, you can log in to restore all your data, including wallet and match history.
                    </p>
                </div>
            </section>
            <DeleteAccountInformationModal
                isOpen={isDeletedinfoModal}
                onClose={closeDeletedInfoModal}
                redirectTo="/"
            
            />
        </div>
    );
}
