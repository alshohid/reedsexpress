"use client";

import { useSearchParams } from "next/navigation";
import OtpVerifySection from "@/src/components/admin/settings/email/OtpVerifySection";

export default function OTPVerifyClient({userType}:any) {
    const searchParams = useSearchParams();

    const type = searchParams.get("type") as "email" | "phone" | null;
    const otpType = type === "phone" ? "phone" : "email";

    return (
        <OtpVerifySection
            type={otpType}
            userType={userType}
        />
    );
}
