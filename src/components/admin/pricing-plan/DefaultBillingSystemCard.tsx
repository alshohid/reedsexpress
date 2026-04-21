import BillingFrequencyCard from "./BillingFrequencyCard";
import {
    billingDayOptions,
    billingFrequencyOptions,
} from "./pricingPlanMockData";
import type {
    BillingDay,
    BillingFrequency,
    PricingBillingSettings,
} from "./pricingPlanTypes";

type DefaultBillingSystemCardProps = {
    settings: PricingBillingSettings;
    onChange: (settings: PricingBillingSettings) => void;
    onSave?: (settings: PricingBillingSettings) => void;
};

export default function DefaultBillingSystemCard({
    settings,
    onChange,
    onSave,
}: DefaultBillingSystemCardProps) {
    const updateFrequency = (frequency: BillingFrequency) => {
        onChange({ ...settings, frequency });
    };

    const updateDispatchFee = (dispatchFeePercentage: string) => {
        onChange({ ...settings, dispatchFeePercentage });
    };

    const updateBillingDay = (billingDay: BillingDay) => {
        onChange({ ...settings, billingDay });
    };

    return (
        <section className="rounded-lg border border-[#DCE2EA] bg-[#F8FAFC] p-4 sm:p-6">
            <h1 className="text-xl font-semibold leading-7 text-[#161721] sm:text-2xl">
                Default Billing System
            </h1>

            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
                {billingFrequencyOptions.map((option) => (
                    <BillingFrequencyCard
                        key={option.value}
                        option={option}
                        isSelected={settings.frequency === option.value}
                        onSelect={updateFrequency}
                    />
                ))}
            </div>

            <div className="mt-5 max-w-[220px]">
                <label
                    htmlFor="dispatch-fee"
                    className="block text-base font-medium leading-6 text-[#161721]"
                >
                    Dispatch Fee Percentage (%)
                </label>
                <div className="mt-2 flex h-10 overflow-hidden rounded-md border border-[#E4E7EC] bg-white focus-within:border-[#2E3A83] focus-within:ring-2 focus-within:ring-[#2E3A83]/10">
                    <input
                        id="dispatch-fee"
                        type="text"
                        inputMode="decimal"
                        value={settings.dispatchFeePercentage}
                        onChange={(event) => updateDispatchFee(event.target.value)}
                        placeholder="e.g. 10"
                        className="min-w-0 flex-1 bg-transparent px-4 text-sm text-[#101828] outline-none placeholder:text-[#A0A7B3]"
                    />
                    <span className="flex w-10 items-center justify-center text-sm font-semibold text-[#101828]">
                        %
                    </span>
                </div>
                <p className="mt-3 text-sm leading-5 text-[#CD2D47]">
                    * Set a default dispatch fee rate
                </p>
            </div>

            <div className="mt-5 max-w-[220px]">
                <label
                    htmlFor="billing-day"
                    className="block text-base font-medium leading-6 text-[#161721]"
                >
                    Billing Day
                </label>
                <select
                    id="billing-day"
                    value={settings.billingDay}
                    onChange={(event) => updateBillingDay(event.target.value as BillingDay)}
                    className="mt-2 h-10 w-full rounded-md border border-[#E4E7EC] bg-white px-3 text-sm text-[#101828] outline-none focus:border-[#2E3A83] focus:ring-2 focus:ring-[#2E3A83]/10"
                >
                    {billingDayOptions.map((day) => (
                        <option key={day} value={day}>
                            {day}
                        </option>
                    ))}
                </select>
            </div>

            <button
                type="button"
                onClick={() => onSave?.(settings)}
                className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-lg bg-[#2E3A83] px-5 text-sm font-semibold text-white transition hover:bg-[#25306F] focus:outline-none focus:ring-2 focus:ring-[#2E3A83]/25 sm:w-auto"
            >
                Save Changes
            </button>
        </section>
    );
}
