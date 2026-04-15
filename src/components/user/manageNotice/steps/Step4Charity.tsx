"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Skeleton } from "@/src/components/ui/skeleton";
import SelectField from "@/src/components/ui/input/searchInput/SelectField";
import type { DeathNoticeForm } from "../AddDeathNoticeWizard";

type Step4CharityProps = {
    charityOptions: { label: string; value: string }[];
    isLoading?: boolean;
    isSubmitting?: boolean;
    onBack: () => void;
    onSubmitNotice: () => void;
};

export default function Step4Charity({
    charityOptions,
    isLoading = false,
    isSubmitting = false,
    onBack,
    onSubmitNotice,
}: Step4CharityProps) {
    const {
        control,
        formState: { errors },
    } = useFormContext<DeathNoticeForm>();

    return (
        <div className="w-full">
            <div className="mx-auto w-full max-w-[560px] rounded-[12px] border border-[#E9E9EA] bg-white p-4 sm:p-6">
                <h3 className="text-[16px] font-medium text-[#161721]">
                    Assign Charity Organization For This Notice
                </h3>
                <p className="mt-2 text-[14px] leading-6 text-[#667164]">
                    Pick one charity from your available list. This charity will be linked directly with the published notice.
                </p>

                <div className="mt-4">
                    {isLoading ? (
                        <div className="space-y-2">
                            <Skeleton className="h-5 w-32 bg-[#EEF3E8]" />
                            <Skeleton className="h-12 w-full rounded-[10px] bg-[#EEF3E8]" />
                        </div>
                    ) : (
                        <>
                            <Controller
                                name="charityId"
                                control={control}
                                rules={{ required: "Please select a charity" }}
                                render={({ field }) => (
                                    <SelectField
                                        label="Pick the Charity"
                                        required
                                        options={charityOptions}
                                        placeholder={charityOptions.length > 0 ? "Select Charity" : "No charity available"}
                                        value={field.value}
                                        onChange={field.onChange}
                                        disabled={charityOptions.length === 0}
                                        selectClassName="h-12 bg-white border-[#CFCFD6] text-[#161721] focus:border-[#8FA17E]"
                                    />
                                )}
                            />

                            {errors.charityId?.message ? (
                                <p className="mt-1 text-[12px] text-red-500">{String(errors.charityId.message)}</p>
                            ) : null}

                            {!errors.charityId && charityOptions.length === 0 ? (
                                <p className="mt-1 text-[12px] text-[#667164]">
                                    No charity record is available right now. Add one first to continue.
                                </p>
                            ) : null}
                        </>
                    )}
                </div>

                <button
                    type="button"
                    onClick={onSubmitNotice}
                    disabled={isLoading || isSubmitting || charityOptions.length === 0}
                    className="mt-5 h-11 w-full rounded-[10px] bg-[linear-gradient(180deg,#394034_0%,#4F5747_100%)] text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isSubmitting ? "Creating Notice..." : "Create Notice"}
                </button>
            </div>

            <div className="mt-6 flex justify-between">
                <button
                    type="button"
                    onClick={onBack}
                    className="h-11 rounded-[10px] border border-[#CFCFD6] bg-white px-6 text-black"
                >
                    Back
                </button>
            </div>
        </div>
    );
}
