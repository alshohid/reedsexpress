"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { IllustrationIcon } from "@/src/icons";
import OtpVerifyCard from "../OtpVerifyCard";

type OtpStatus = "idle" | "error" | "success";
const OTP_CONFIG = {
    email: {
        title: "Verify Email Address",
        icon: "✉️",
        maskedValue: "user***@example.com",
        resendLabel: "resend email otp",
    },
    phone: {
        title: "Verify Phone Number",
        icon: "📱",
        maskedValue: "+1******9813",
        resendLabel: "resend sms otp",
    },
};
type Props = {
    type: "email" | "phone";
    userType:"user" | "admin"
};


export default function OtpVerifySection({ type, userType }: Props) {
    const router = useRouter();
    const config = OTP_CONFIG[type];

    const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
    const [status, setStatus] = useState<OtpStatus>("idle");
    const [errorMsg, setErrorMsg] = useState("");

    const handleVerify = async () => {
        const code = otp.join("");

        if (code.length !== 6) {
            setStatus("error");
            setErrorMsg("Please enter the complete 6-digit code.");
            return;
        }

        // 🔜 API CALL
        // const res = await verifyOtp(code)

    
        if (code !== "123456") {
            setStatus("error");
            setErrorMsg("That code didn’t work. Check the code and try again.");
            return;
        }

        // ✅ success
        setStatus("success");
    };

    if (status === "success") {
        return (
            <section
                className="
                        w-full
                        flex
                        flex-col
                        justify-center
                        items-center
                        gap-4
                        rounded-xl
                        border border-[#26344B]
                        bg-[#18222A]
                        px-6 py-8
                        sm:px-10 sm:py-10
                    "
            >
                {/* Inner Card */}
                <div
                    className="
                        w-full
                        flex
                        flex-col
                        items-center
                        justify-center
                        gap-6
                        rounded-lg
                        border border-[#252528]
                        bg-[rgba(8,14,30,0.60)]
                        px-6 py-8
                        sm:px-10 sm:py-12
                        "
                >
                    {/* Content wrapper (controls max width only) */}
                    <div className="w-full max-w-md flex flex-col items-center gap-6 text-center">
                        {/* Illustration */}
                        <IllustrationIcon  />

                        {/* Text */}
                        <div className="flex flex-col gap-2">
                            <h3 className="text-base sm:text-xl font-semibold text-white">
                                Two-Factor Authentication Enabled Successfully!
                            </h3>

                            <p className="text-sm text-white/50 leading-relaxed">
                                Your account is now protected. You’ll be asked for a verification
                                code when logging in from new devices.
                            </p>
                        </div>

                        {/* CTA */}
                        <Button
                            onClick={() =>
                                router.push(`/${userType}/dashboard/settings`)
                            }
                            className="h-11 w-full max-w-xs"
                        >
                            Go to Security Settings
                        </Button>
                    </div>
                </div>
            </section>

        );
    }

    /* ---------------- OTP UI (idle + error) ---------------- */
    return (
        <OtpVerifyCard
            title={config.title}
            highlightedValue={config.maskedValue}
            icon={config.icon}
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
            onVerify={handleVerify}
            onResend={() => console.log(config.resendLabel)}
            onSkip={() =>
                router.push(`/${userType}/dashboard/settings`)
            }
        />

    );
}
