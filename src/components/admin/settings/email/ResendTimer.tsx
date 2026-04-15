"use client";

import { useEffect, useState } from "react";

export default function ResendTimer({ onResend,  }: { onResend: () => void }) {
    const [time, setTime] = useState(30);

    useEffect(() => {
        if (time === 0) return;
        const t = setTimeout(() => setTime((s) => s - 1), 1000);
        return () => clearTimeout(t);
    }, [time]);

    if (time === 0) {
        return (
            <button
                onClick={onResend}
                className="text-sm text-[#5B5BFF] hover:underline"
            >
                Resend Code
            </button>
        );
    }

    return (
        <p className="text-sm text-white/50">
            Didn’t receive the code?{" "}
            <span className="text-[#5B5BFF]">(00:{String(time).padStart(2, "0")})</span>
        </p>
    );
}
