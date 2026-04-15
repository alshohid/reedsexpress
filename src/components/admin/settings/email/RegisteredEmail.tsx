export default function RegisteredEmail({
    email,
    onContinue,
}: {
    email: string;
    onContinue: () => void;
}) {
    return (
        <div className="w-full space-y-4">
            <p className="text-sm text-white/70">
                We will send a 6-digit code to this registered email
            </p>

            <div className="flex items-center gap-3 rounded-md border border-white/10 bg-black/30 p-3 text-white">
                ✉️ {email}
            </div>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button className="h-10 rounded-md border border-white/10 px-6 text-sm text-white/60">
                    Skip
                </button>
                <button
                    onClick={onContinue}
                    className="h-10 rounded-md bg-[#5B5BFF] px-8 text-sm font-semibold text-white"
                >
                    Continue →
                </button>
            </div>
        </div>
    );
}
