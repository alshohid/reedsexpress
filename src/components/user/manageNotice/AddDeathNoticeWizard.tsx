/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm, type FieldPath } from "react-hook-form";
import { getErrorMessage } from "@/src/lib/getErrorMessage";
import { useQueryState } from "@/src/lib/helper/useQueryState";
import {
    useCreateDirectorNoticeMutation,
    useGetDirectorNoticeCharityListQuery,
} from "@/src/redux/features/undertaker/directorNotice";
import StatusNotice from "../../ui/StatusNotice";
import Step1Basic from "./steps/Step1Basic";
import Step2Tribute from "./steps/Step2Tribute";
import Step3Services from "./steps/Step3Services";
import Step4Charity from "./steps/Step4Charity";
import {
    DIRECTOR_NOTICE_STATE_OPTIONS,
    DIRECTOR_NOTICE_TOWN_LIST,
    type DirectorNoticeStateKey,
} from "./locationOptions";

export type ServiceType = "reposing" | "funeral" | "both";

export type DeathNoticeForm = {
    imageFile: File | null;
    state: string;
    town: string;
    city: string;
    firstName: string;
    surname: string;
    nee: string;
    fromDate: string;
    toDate: string;
    tributeTitle: string;
    biography: string;
    serviceType: ServiceType;
    reposingLocationName: string;
    reposingAddress: string;
    reposingDate: string;
    reposingStartTime: string;
    reposingEndTime: string;
    funeralLocationName: string;
    funeralAddress: string;
    funeralDate: string;
    funeralStartTime: string;
    funeralEndTime: string;
    charityId: string;
};

type FeedbackState = {
    variant: "success" | "error";
    title: string;
    message: string;
};

const STORAGE_KEY = "add_death_notice_draft";
const FIXED_COUNTRY = "United Kingdom";

const clampStep = (value: number) => Math.min(4, Math.max(1, value));

const WIZARD_STEPS = [
    { number: 1, title: "Basic Details", subtitle: "Who the notice is for" },
    { number: 2, title: "Tribute", subtitle: "Story and posting details" },
    { number: 3, title: "Services", subtitle: "Reposing and funeral timings" },
    { number: 4, title: "Charity", subtitle: "Link the notice to a cause" },
];

const getFinalValidationFields = (serviceType: ServiceType): FieldPath<DeathNoticeForm>[] => {
    const fields: FieldPath<DeathNoticeForm>[] = [
        "state",
        "town",
        "city",
        "firstName",
        "surname",
        "nee",
        "fromDate",
        "toDate",
        "tributeTitle",
        "biography",
        "serviceType",
        "charityId",
    ];

    if (serviceType === "reposing" || serviceType === "both") {
        fields.push(
            "reposingLocationName",
            "reposingAddress",
            "reposingDate",
            "reposingStartTime",
            "reposingEndTime",
        );
    }

    if (serviceType === "funeral" || serviceType === "both") {
        fields.push(
            "funeralLocationName",
            "funeralAddress",
            "funeralDate",
            "funeralStartTime",
            "funeralEndTime",
        );
    }

    return fields;
};

const mapServiceType = (serviceType: ServiceType) => {
    if (serviceType === "reposing") {
        return "Reposing" as const;
    }

    if (serviceType === "funeral") {
        return "Funeral" as const;
    }

    return "Both" as const;
};

const toIsoDateString = (dateValue: string, endOfDay = false) => {
    if (!dateValue) {
        return "";
    }

    return `${dateValue}T${endOfDay ? "23:59:59" : "00:00:00"}.000Z`;
};

const toIsoDateTimeString = (dateValue: string, timeValue: string) => {
    if (!dateValue || !timeValue) {
        return "";
    }

    const normalizedTime = /^\d{2}:\d{2}$/.test(timeValue) ? `${timeValue}:00` : timeValue;
    return `${dateValue}T${normalizedTime}.000Z`;
};

function StepperHeader({ step }: { step: number }) {
    return (
        <div className="mb-8 grid gap-3 md:grid-cols-4">
            {WIZARD_STEPS.map((item) => {
                const isComplete = item.number < step;
                const isCurrent = item.number === step;

                return (
                    <div
                        key={item.number}
                        className={[
                            "rounded-[18px] border px-4 py-4 transition",
                            isCurrent
                                ? "border-[#D8E8C9] bg-[#F6FBF0]"
                                : isComplete
                                    ? "border-[#E4ECDC] bg-white"
                                    : "border-[#EEF2E8] bg-[#FBFCFA]",
                        ].join(" ")}
                    >
                        <div className="flex items-center gap-3">
                            <span
                                className={[
                                    "inline-flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-semibold",
                                    isCurrent
                                        ? "bg-[#3F4A3B] text-white"
                                        : isComplete
                                            ? "bg-[#DCE9D0] text-[#3F4A3B]"
                                            : "bg-[#EEF2E8] text-[#889380]",
                                ].join(" ")}
                            >
                                {item.number}
                            </span>
                            <div>
                                <p className="text-[14px] font-medium text-[#161721]">{item.title}</p>
                                <p className="mt-0.5 text-[12px] text-[#667164]">{item.subtitle}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default function AddDeathNoticeWizard() {
    const [stepStr, setStepStr] = useQueryState("step", "1");
    const step = clampStep(Number(stepStr || "1") || 1);
    const [feedback, setFeedback] = useState<FeedbackState | null>(null);

    const methods = useForm<DeathNoticeForm>({
        mode: "onChange",
        defaultValues: {
            imageFile: null,
            state: "",
            town: "",
            city: "",
            firstName: "",
            surname: "",
            nee: "",
            fromDate: "",
            toDate: "",
            tributeTitle: "",
            biography: "",
            serviceType: "both",
            reposingLocationName: "",
            reposingAddress: "",
            reposingDate: "",
            reposingStartTime: "",
            reposingEndTime: "",
            funeralLocationName: "",
            funeralAddress: "",
            funeralDate: "",
            funeralStartTime: "",
            funeralEndTime: "",
            charityId: "",
        },
    });

    const {
        watch,
        reset,
        handleSubmit,
        setValue,
        getValues,
        trigger,
    } = methods;

    const selectedState = watch("state");
    const serviceType = watch("serviceType");

    const {
        data: charityListResponse,
        error: charityListError,
        isLoading: isCharityListLoading,
    } = useGetDirectorNoticeCharityListQuery();
    const [createDirectorNotice, { isLoading: isCreateNoticeLoading }] = useCreateDirectorNoticeMutation();

    useEffect(() => {
        const rawDraft = localStorage.getItem(STORAGE_KEY);
        if (!rawDraft) {
            return;
        }

        try {
            const parsedDraft = JSON.parse(rawDraft);
            reset({ ...methods.getValues(), ...parsedDraft, imageFile: null });
        } catch {
            // ignore malformed draft
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const subscription = watch((values) => {
            const { imageFile, ...rest } = values as DeathNoticeForm;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(rest));
        });

        return () => subscription.unsubscribe();
    }, [watch]);

    useEffect(() => {
        const availableOptions =
            selectedState && selectedState in DIRECTOR_NOTICE_TOWN_LIST
                ? DIRECTOR_NOTICE_TOWN_LIST[selectedState as DirectorNoticeStateKey]
                : [];

        const selectedTown = getValues("town");
        const selectedCity = getValues("city");
        const hasTown = availableOptions.some((option) => option.value === selectedTown);
        const hasCity = availableOptions.some((option) => option.value === selectedCity);

        if (!hasTown) {
            setValue("town", "", { shouldValidate: false, shouldDirty: true });
        }

        if (!hasCity) {
            setValue("city", "", { shouldValidate: false, shouldDirty: true });
        }
    }, [getValues, selectedState, setValue]);

    const townOptions = useMemo(
        () =>
            selectedState && selectedState in DIRECTOR_NOTICE_TOWN_LIST
                ? DIRECTOR_NOTICE_TOWN_LIST[selectedState as DirectorNoticeStateKey]
                : [],
        [selectedState],
    );

    const cityOptions = townOptions;

    const charityOptions = useMemo(
        () =>
            (charityListResponse?.data ?? []).map((charity) => ({
                label: charity.charity_name,
                value: charity.id,
            })),
        [charityListResponse?.data],
    );

    const goTo = (targetStep: number) => setStepStr(String(clampStep(targetStep)));
    const next = () => goTo(step + 1);
    const back = () => goTo(step - 1);

    const resetWizard = () => {
        localStorage.removeItem(STORAGE_KEY);
        reset({
            imageFile: null,
            state: "",
            town: "",
            city: "",
            firstName: "",
            surname: "",
            nee: "",
            fromDate: "",
            toDate: "",
            tributeTitle: "",
            biography: "",
            serviceType: "both",
            reposingLocationName: "",
            reposingAddress: "",
            reposingDate: "",
            reposingStartTime: "",
            reposingEndTime: "",
            funeralLocationName: "",
            funeralAddress: "",
            funeralDate: "",
            funeralStartTime: "",
            funeralEndTime: "",
            charityId: "",
        });
        goTo(1);
    };

    const onSubmit = async (data: DeathNoticeForm) => {
        try {
            const includeReposing = data.serviceType === "reposing" || data.serviceType === "both";
            const includeFuneral = data.serviceType === "funeral" || data.serviceType === "both";
            const formDate = toIsoDateString(data.fromDate);
            const endDate = toIsoDateString(data.toDate, true);

            const payload = {
                first_name: data.firstName.trim(),
                surname: data.surname.trim(),
                city: data.city,
                town: data.town,
                title: data.tributeTitle.trim(),
                nee: data.nee.trim(),
                form: formDate,
                to: endDate,
                country: data.state,
                biography: data.biography.trim(),
                service_type: mapServiceType(data.serviceType),
                reposing_location: data.reposingLocationName.trim(),
                reposing_address: data.reposingAddress.trim(),
                reposing_date: includeReposing ? toIsoDateString(data.reposingDate) : "",
                reposing_start_time: includeReposing
                    ? toIsoDateTimeString(data.reposingDate, data.reposingStartTime)
                    : "",
                reposing_end_time: includeReposing
                    ? toIsoDateTimeString(data.reposingDate, data.reposingEndTime)
                    : "",
                funeral_location: data.funeralLocationName.trim(),
                funeral_address: data.funeralAddress.trim(),
                funeral_date: includeFuneral ? toIsoDateString(data.funeralDate) : "",
                funeral_start_time: includeFuneral
                    ? toIsoDateTimeString(data.funeralDate, data.funeralStartTime)
                    : "",
                funeral_end_time: includeFuneral
                    ? toIsoDateTimeString(data.funeralDate, data.funeralEndTime)
                    : "",
                charity_id: data.charityId,
            };

            const response = await createDirectorNotice(payload).unwrap();

            setFeedback({
                variant: "success",
                title: "Death Notice Created",
                message: response.message || "The death notice has been created successfully.",
            });
            resetWizard();
        } catch (submitError) {
            setFeedback({
                variant: "error",
                title: "Unable To Create Notice",
                message: getErrorMessage(submitError, "Failed to create the death notice. Please try again."),
            });
        }
    };

    const submitFromFinalStep = async () => {
        const valid = await trigger(getFinalValidationFields(serviceType), {
            shouldFocus: true,
        });

        if (!valid) {
            setFeedback({
                variant: "error",
                title: "Please Complete The Required Details",
                message: "Some required information is still missing. Review the highlighted fields before creating the notice.",
            });
            return;
        }

        setFeedback(null);
        await handleSubmit(onSubmit)();
    };

    const charityErrorMessage = charityListError
        ? getErrorMessage(charityListError, "Failed to load charities for this notice.")
        : "";

    return (
        <FormProvider {...methods}>
            <form className="w-full rounded-[12px] border border-[#E9E9EA] bg-white p-4 sm:p-6">
                <div className="mb-5 flex flex-col gap-2 border-b border-[#EEF1EB] pb-5 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#708161]">
                            Director Notice Wizard
                        </p>
                        <h2 className="mt-2 text-[1.625rem] font-medium text-[#161721]">
                            Create a death notice in four clear steps
                        </h2>
                        <p className="mt-2 text-[14px] leading-6 text-[#667164]">
                            The notice country stays {FIXED_COUNTRY}, while the selected state is mapped to the API location field for accurate notice placement.
                        </p>
                    </div>

                    <div className="rounded-full border border-[#D8E8C9] bg-[#F6FBF0] px-4 py-2 text-[13px] font-medium text-[#506347]">
                        Step {step} of {WIZARD_STEPS.length}
                    </div>
                </div>

                <StepperHeader step={step} />

                {feedback ? (
                    <StatusNotice
                        variant={feedback.variant}
                        title={feedback.title}
                        message={feedback.message}
                        className="mb-6"
                    />
                ) : null}

                {charityErrorMessage ? (
                    <StatusNotice
                        variant="error"
                        title="Unable To Load Charity List"
                        message={charityErrorMessage}
                        className="mb-6"
                    />
                ) : null}

                {step === 1 ? (
                    <Step1Basic
                        stateOptions={DIRECTOR_NOTICE_STATE_OPTIONS}
                        townOptions={townOptions}
                        cityOptions={cityOptions}
                        fixedCountryLabel={FIXED_COUNTRY}
                        onNext={next}
                    />
                ) : null}

                {step === 2 ? <Step2Tribute onBack={back} onNext={next} /> : null}

                {step === 3 ? <Step3Services onBack={back} onNext={next} /> : null}

                {step === 4 ? (
                    <Step4Charity
                        charityOptions={charityOptions}
                        isLoading={isCharityListLoading}
                        isSubmitting={isCreateNoticeLoading}
                        onBack={back}
                        onSubmitNotice={submitFromFinalStep}
                    />
                ) : null}
            </form>
        </FormProvider>
    );
}
