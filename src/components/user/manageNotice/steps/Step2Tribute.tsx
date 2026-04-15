"use client";

import { useFormContext } from "react-hook-form";
import TextInputField from "@/src/components/ui/input/TextInputField";
import type { DeathNoticeForm } from "../AddDeathNoticeWizard";

type Step2TributeProps = {
    onBack: () => void;
    onNext: () => void;
};

export default function Step2Tribute({ onBack, onNext }: Step2TributeProps) {
    const {
        register,
        setValue,
        watch,
        formState: { errors },
        trigger,
    } = useFormContext<DeathNoticeForm>();

    const serviceType = watch("serviceType");

    const goNext = async () => {
        const isValid = await trigger(["tributeTitle", "biography", "serviceType"]);

        if (isValid) {
            onNext();
        }
    };

    return (
        <div className="w-full space-y-6">
            <h3 className="text-[16px] font-medium text-[#161721]">The Tribute Posting</h3>

            <TextInputField
                label="Title"
                required
                placeholder="e.g. A Loving Tribute"
                {...register("tributeTitle", { required: "Title is required" })}
                error={errors.tributeTitle?.message as string}
                inputClassName="h-12 bg-white border-[#CFCFD6] text-[#161721] focus:border-[#8FA17E]"
            />

            <div>
                <label className="block text-[14px] font-medium text-[#161721]">
                    Biography of the Descendent <span className="text-red-500">*</span>
                </label>
                <textarea
                    className="mt-2 min-h-[160px] w-full rounded-[10px] border border-[#CFCFD6] p-4 text-[14px] text-black outline-none focus:border-[#8FA17E]"
                    placeholder="Write the life story, memories, and final tribute..."
                    {...register("biography", { required: "Biography is required" })}
                />
                {errors.biography?.message ? (
                    <p className="mt-1 text-[12px] text-red-500">{String(errors.biography.message)}</p>
                ) : null}
            </div>

            <div>
                <p className="mb-3 text-[14px] font-medium text-[#161721]">
                    Service Type <span className="text-red-500">*</span>
                </p>

                <div className="flex flex-wrap gap-8">
                    {(["reposing", "funeral", "both"] as const).map((type) => (
                        <label key={type} className="flex items-center gap-2 text-[14px] text-[#161721]">
                            <input
                                type="radio"
                                checked={serviceType === type}
                                onChange={() => setValue("serviceType", type, { shouldValidate: true })}
                                className="accent-[#708161]"
                            />
                            {type === "reposing" ? "Reposing" : type === "funeral" ? "Funeral" : "Both"}
                        </label>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-between">
                <button
                    type="button"
                    onClick={onBack}
                    className="h-11 rounded-[10px] border border-[#CFCFD6] bg-white px-6 text-black"
                >
                    Back
                </button>
                <button
                    type="button"
                    onClick={goNext}
                    className="h-11 rounded-[10px] bg-[linear-gradient(180deg,#394034_0%,#4F5747_100%)] px-8 text-white hover:opacity-90"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
