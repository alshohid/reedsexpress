"use client";

import { Controller, useFormContext } from "react-hook-form";
import type { SelectOption } from "@/src/components/ui/input/searchInput/SelectField";
import TextInputField from "@/src/components/ui/input/TextInputField";
import UploadDropzoneField from "@/src/components/ui/input/UploadDropzoneField";
import SelectField from "@/src/components/ui/input/searchInput/SelectField";
import type { DeathNoticeForm } from "../AddDeathNoticeWizard";

type Step1BasicProps = {
    stateOptions: SelectOption[];
    townOptions: SelectOption[];
    cityOptions: SelectOption[];
    fixedCountryLabel: string;
    onNext: () => void;
};

export default function Step1Basic({
    stateOptions,
    townOptions,
    cityOptions,
    fixedCountryLabel,
    onNext,
}: Step1BasicProps) {
    const {
        register,
        control,
        setValue,
        formState: { errors },
        trigger,
    } = useFormContext<DeathNoticeForm>();

    const goNext = async () => {
        const isValid = await trigger([
            "firstName",
            "surname",
            "nee",
            "fromDate",
            "toDate",
            "state",
            "town",
            "city",
        ]);

        if (isValid) {
            onNext();
        }
    };

    return (
        <div className="w-full">
            <div className="grid gap-4 lg:grid-cols-2">
                <div className="space-y-4">
                    <UploadDropzoneField
                        label="Upload Image of the Descendent"
                        hint="JPG or PNG (max 3MB)"
                        maxSizeMb={3}
                        onFileChange={(file) => setValue("imageFile", file, { shouldDirty: true })}
                    />

                    <TextInputField
                        label="First Name"
                        required
                        placeholder="e.g. John"
                        {...register("firstName", { required: "First name is required" })}
                        error={errors.firstName?.message as string}
                        inputClassName="h-12 bg-white border-[#CFCFD6] text-[#161721] focus:border-[#8FA17E]"
                    />

                    <TextInputField
                        label="Surname"
                        required
                        placeholder="e.g. Doe"
                        {...register("surname", { required: "Surname is required" })}
                        error={errors.surname?.message as string}
                        inputClassName="h-12 bg-white border-[#CFCFD6] text-[#161721] focus:border-[#8FA17E]"
                    />

                    <TextInputField
                        label="Nee"
                        required
                        placeholder="e.g. Smith"
                        {...register("nee", { required: "Nee is required" })}
                        error={errors.nee?.message as string}
                        inputClassName="h-12 bg-white border-[#CFCFD6] text-[#161721] focus:border-[#8FA17E]"
                    />

                    <div className="grid gap-4 sm:grid-cols-2">
                        <TextInputField
                            label="From"
                            required
                            type="date"
                            {...register("fromDate", { required: "From date is required" })}
                            error={errors.fromDate?.message as string}
                            inputClassName="h-12 bg-white border-[#CFCFD6] text-[#161721] focus:border-[#8FA17E]"
                        />
                        <TextInputField
                            label="To"
                            required
                            type="date"
                            {...register("toDate", { required: "To date is required" })}
                            error={errors.toDate?.message as string}
                            inputClassName="h-12 bg-white border-[#CFCFD6] text-[#161721] focus:border-[#8FA17E]"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="rounded-[12px] border border-[#E9E9EA] bg-[#F8FBF5] px-4 py-3">
                        <p className="text-[13px] font-medium text-[#161721]">Country</p>
                        <p className="mt-1 text-[14px] text-[#667164]">{fixedCountryLabel}</p>
                    </div>

                    <Controller
                        name="state"
                        control={control}
                        rules={{ required: "State is required" }}
                        render={({ field }) => (
                            <SelectField
                                label="State"
                                required
                                options={stateOptions}
                                placeholder="Select State"
                                value={field.value}
                                onChange={(value) => {
                                    field.onChange(value);
                                    setValue("town", "", { shouldValidate: false, shouldDirty: true });
                                    setValue("city", "", { shouldValidate: false, shouldDirty: true });
                                }}
                                selectClassName="h-12 bg-white border-[#CFCFD6] text-[#161721] focus:border-[#8FA17E]"
                            />
                        )}
                    />
                    {errors.state?.message ? (
                        <p className="-mt-2 text-[12px] text-red-500">{String(errors.state.message)}</p>
                    ) : null}

                    <Controller
                        name="town"
                        control={control}
                        rules={{ required: "Town is required" }}
                        render={({ field }) => (
                            <SelectField
                                label="Town"
                                required
                                options={townOptions}
                                placeholder={townOptions.length > 0 ? "Select Town" : "Select state first"}
                                value={field.value}
                                onChange={field.onChange}
                                disabled={townOptions.length === 0}
                                selectClassName="h-12 bg-white border-[#CFCFD6] text-[#161721] focus:border-[#8FA17E]"
                            />
                        )}
                    />
                    {errors.town?.message ? (
                        <p className="-mt-2 text-[12px] text-red-500">{String(errors.town.message)}</p>
                    ) : null}

                    <Controller
                        name="city"
                        control={control}
                        rules={{ required: "City is required" }}
                        render={({ field }) => (
                            <SelectField
                                label="City"
                                required
                                options={cityOptions}
                                placeholder={cityOptions.length > 0 ? "Select City" : "Select state first"}
                                value={field.value}
                                onChange={field.onChange}
                                disabled={cityOptions.length === 0}
                                selectClassName="h-12 bg-white border-[#CFCFD6] text-[#161721] focus:border-[#8FA17E]"
                            />
                        )}
                    />
                    {errors.city?.message ? (
                        <p className="-mt-2 text-[12px] text-red-500">{String(errors.city.message)}</p>
                    ) : null}
                </div>
            </div>

            <div className="mt-6 flex justify-end">
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
