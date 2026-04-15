export default function EnterEmail({
    value,
    onChange,
    onSend,
    error,
}: {
    value: string;
    onChange: (v: string) => void;
    onSend: () => void;
    error?: string;
}) {
    return (
        <div className="w-full space-y-4">
            <label className="text-sm text-white/70">
                Enter your verified email
            </label>

            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`w-full rounded-md border bg-transparent p-3 text-white outline-none ${error
                        ? "border-red-500"
                        : "border-white/20"
                    }`}
                placeholder="example@mail.com"
            />

            {error && (
                <p className="text-xs text-red-400">
                    {error}
                </p>
            )}

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button className="h-10 rounded-md border border-white/10 px-6 text-sm text-white/60">
                    Skip
                </button>
                <button
                    onClick={onSend}
                    className="h-10 rounded-md bg-[#5B5BFF] px-8 text-sm font-semibold text-white"
                >
                    Send Verification Code →
                </button>
            </div>
        </div>
    );
}
