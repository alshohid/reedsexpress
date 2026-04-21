import type {
    BillingFrequency,
    BillingFrequencyOption,
} from "./pricingPlanTypes";

type BillingFrequencyCardProps = {
    option: BillingFrequencyOption;
    isSelected: boolean;
    onSelect: (frequency: BillingFrequency) => void;
};

export default function BillingFrequencyCard({
    option,
    isSelected,
    onSelect,
}: BillingFrequencyCardProps) {
    return (
        <button
            type="button"
            aria-pressed={isSelected}
            onClick={() => onSelect(option.value)}
            className={[
                "min-h-[84px] rounded-lg border bg-white px-4 py-4 text-center transition",
                "focus:outline-none focus:ring-2 focus:ring-[#2E3A83]/25",
                isSelected
                    ? "border-[#2E3A83] shadow-[0_0_0_1px_#2E3A83]"
                    : "border-[#E4E7EC] hover:border-[#B8C0D6]",
            ].join(" ")}
        >
            <span className="block text-xl font-semibold leading-6 text-[#101828]">
                {option.label}
            </span>
            <span className="mt-1 block text-sm leading-5 text-[#8A92A6]">
                {option.description}
            </span>
        </button>
    );
}
