"use client";


type AddPlanCardProps = {
    title?: string;
    buttonLabel?: string;
    onSelect?: () => void;
};

export default function AddPlanCard({
    title = "Add New Plan Here",
    buttonLabel = "Select",
    onSelect,
}: AddPlanCardProps) {
    return (
        <div className="w-full rounded-[0.75rem] border border-[#D7E8C8] bg-[#F5FFEE] p-6">
            <div className="flex h-full flex-col items-center gap-6">
                <h3 className="text-[18px] font-medium text-[#161721] text-center">
                    {title}
                </h3>

                {/* Center plus */}
                <div onClick={onSelect} className="flex flex-1 items-center justify-center py-10 cursor-pointer">
                    <div className="h-[86px] w-[86px] rounded-full bg-[#BFD6AB] flex items-center justify-center">
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M12 5v14M5 12h14" stroke="#4B5A42" strokeWidth="2.4" strokeLinecap="round" />
                        </svg>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={onSelect}
                    className="
            h-12 w-full rounded-[10px]
            bg-[linear-gradient(180deg,#394034_0%,#4F5747_100%)]
            text-white text-[14px] font-medium
            hover:opacity-90 transition
          "
                >
                    {buttonLabel}
                </button>
            </div>
        </div>
    );
}