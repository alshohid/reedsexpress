"use client";

import React, { useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import TextInputField from "@/src/components/ui/input/TextInputField";
import SelectField from "@/src/components/ui/input/searchInput/SelectField";
import type { DeathNoticeForm } from "../AddDeathNoticeWizard";

function Card({
    title,
    disabled,
    children,
}: {
    title: string;
    disabled?: boolean;
    children: React.ReactNode;
}) {
    return (
        <div
            className={[
                "rounded-[12px] border border-[#E9E9EA] bg-white p-4 sm:p-6",
                disabled ? "pointer-events-none opacity-40" : "",
            ].join(" ")}
        >
            <h4 className="text-[16px] font-medium text-[#161721]">{title}</h4>
            <div className="mt-4 space-y-4">{children}</div>
        </div>
    );
}

export default function Step3Services({
    onBack,
    onNext,
}: {
    onBack: () => void;
    onNext: () => void;
}) {
    const {
        register,
        control,
        watch,
        trigger,
        formState: { errors },
    } = useFormContext<DeathNoticeForm>();

    const serviceType = watch("serviceType");
    const allowReposing = serviceType === "reposing" || serviceType === "both";
    const allowFuneral = serviceType === "funeral" || serviceType === "both";

    const timeOptions = useMemo(
        () => [
            { label: "9:00 a.m.", value: "09:00" },
            { label: "10:00 a.m.", value: "10:00" },
            { label: "11:00 a.m.", value: "11:00" },
            { label: "12:00 p.m.", value: "12:00" },
            { label: "1:00 p.m.", value: "13:00" },
            { label: "2:00 p.m.", value: "14:00" },
            { label: "3:00 p.m.", value: "15:00" },
            { label: "4:00 p.m.", value: "16:00" },
        ],
        [],
    );

    const goNext = async () => {
        const fields: Array<keyof DeathNoticeForm> = [];

        if (allowReposing) {
            fields.push(
                "reposingLocationName",
                "reposingAddress",
                "reposingDate",
                "reposingStartTime",
                "reposingEndTime",
            );
        }

        if (allowFuneral) {
            fields.push(
                "funeralLocationName",
                "funeralAddress",
                "funeralDate",
                "funeralStartTime",
                "funeralEndTime",
            );
        }

        const isValid = await trigger(fields as any);

        if (isValid) {
            onNext();
        }
    };

    return (
        <div className="w-full space-y-6">
            <div className="grid gap-5 lg:grid-cols-2">
                <Card title="The Reposing" disabled={!allowReposing}>
                    <TextInputField
                        label="Reposing Location Name"
                        required
                        placeholder="e.g. St. Mary's Funeral Home"
                        {...register("reposingLocationName", {
                            required: allowReposing ? "Reposing location is required" : false,
                        })}
                        error={errors.reposingLocationName?.message as string}
                        inputClassName="h-12 bg-white border-[#CFCFD6] text-[#161721] focus:border-[#8FA17E]"
                    />

                    <TextInputField
                        label="Reposing Address"
                        required
                        placeholder="e.g. 12 Main Street"
                        {...register("reposingAddress", {
                            required: allowReposing ? "Reposing address is required" : false,
                        })}
                        error={errors.reposingAddress?.message as string}
                        inputClassName="h-12 bg-white border-[#CFCFD6] text-[#161721] focus:border-[#8FA17E]"
                    />

                    <TextInputField
                        label="Reposing Date"
                        required
                        type="date"
                        {...register("reposingDate", {
                            required: allowReposing ? "Reposing date is required" : false,
                        })}
                        error={errors.reposingDate?.message as string}
                        inputClassName="h-12 bg-white border-[#CFCFD6] text-[#161721] focus:border-[#8FA17E]"
                    />

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <Controller
                                name="reposingStartTime"
                                control={control}
                                rules={{ required: allowReposing ? "Start time is required" : false }}
                                render={({ field }) => (
                                    <SelectField
                                        label="Start Time"
                                        required
                                        options={timeOptions}
                                        placeholder="Select"
                                        value={field.value}
                                        onChange={field.onChange}
                                        selectClassName="h-12 bg-white border-[#CFCFD6] text-[#161721] focus:border-[#8FA17E]"
                                    />
                                )}
                            />
                            {errors.reposingStartTime?.message ? (
                                <p className="mt-1 text-[12px] text-red-500">{String(errors.reposingStartTime.message)}</p>
                            ) : null}
                        </div>

                        <div>
                            <Controller
                                name="reposingEndTime"
                                control={control}
                                rules={{ required: allowReposing ? "End time is required" : false }}
                                render={({ field }) => (
                                    <SelectField
                                        label="End Time"
                                        required
                                        options={timeOptions}
                                        placeholder="Select"
                                        value={field.value}
                                        onChange={field.onChange}
                                        selectClassName="h-12 bg-white border-[#CFCFD6] text-[#161721] focus:border-[#8FA17E]"
                                    />
                                )}
                            />
                            {errors.reposingEndTime?.message ? (
                                <p className="mt-1 text-[12px] text-red-500">{String(errors.reposingEndTime.message)}</p>
                            ) : null}
                        </div>
                    </div>
                </Card>

                <Card title="The Funeral Mass" disabled={!allowFuneral}>
                    <TextInputField
                        label="Funeral Location Name"
                        required
                        placeholder="e.g. St. Peter's Church"
                        {...register("funeralLocationName", {
                            required: allowFuneral ? "Funeral location is required" : false,
                        })}
                        error={errors.funeralLocationName?.message as string}
                        inputClassName="h-12 bg-white border-[#CFCFD6] text-[#161721] focus:border-[#8FA17E]"
                    />

                    <TextInputField
                        label="Funeral Address"
                        required
                        placeholder="e.g. 24 Church Road"
                        {...register("funeralAddress", {
                            required: allowFuneral ? "Funeral address is required" : false,
                        })}
                        error={errors.funeralAddress?.message as string}
                        inputClassName="h-12 bg-white border-[#CFCFD6] text-[#161721] focus:border-[#8FA17E]"
                    />

                    <TextInputField
                        label="Funeral Date"
                        required
                        type="date"
                        {...register("funeralDate", {
                            required: allowFuneral ? "Funeral date is required" : false,
                        })}
                        error={errors.funeralDate?.message as string}
                        inputClassName="h-12 bg-white border-[#CFCFD6] text-[#161721] focus:border-[#8FA17E]"
                    />

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <Controller
                                name="funeralStartTime"
                                control={control}
                                rules={{ required: allowFuneral ? "Start time is required" : false }}
                                render={({ field }) => (
                                    <SelectField
                                        label="Start Time"
                                        required
                                        options={timeOptions}
                                        placeholder="Select"
                                        value={field.value}
                                        onChange={field.onChange}
                                        selectClassName="h-12 bg-white border-[#CFCFD6] text-[#161721] focus:border-[#8FA17E]"
                                    />
                                )}
                            />
                            {errors.funeralStartTime?.message ? (
                                <p className="mt-1 text-[12px] text-red-500">{String(errors.funeralStartTime.message)}</p>
                            ) : null}
                        </div>

                        <div>
                            <Controller
                                name="funeralEndTime"
                                control={control}
                                rules={{ required: allowFuneral ? "End time is required" : false }}
                                render={({ field }) => (
                                    <SelectField
                                        label="End Time"
                                        required
                                        options={timeOptions}
                                        placeholder="Select"
                                        value={field.value}
                                        onChange={field.onChange}
                                        selectClassName="h-12 bg-white border-[#CFCFD6] text-[#161721] focus:border-[#8FA17E]"
                                    />
                                )}
                            />
                            {errors.funeralEndTime?.message ? (
                                <p className="mt-1 text-[12px] text-red-500">{String(errors.funeralEndTime.message)}</p>
                            ) : null}
                        </div>
                    </div>
                </Card>
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
