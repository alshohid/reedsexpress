"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Skeleton } from "@/src/components/ui/skeleton";
import StatusNotice from "@/src/components/ui/StatusNotice";
import TextInputField from "@/src/components/ui/input/TextInputField";
import SelectField, { type SelectOption } from "@/src/components/ui/input/searchInput/SelectField";
import { getErrorMessage } from "@/src/lib/getErrorMessage";
import { useQueryState } from "@/src/lib/helper/useQueryState";
import {
    useGetDirectorNoticeCharityListQuery,
    useGetSingleDirectorNoticeByIdQuery,
    useUpdateDirectorNoticeByIdMutation,
} from "@/src/redux/features/undertaker/directorNotice";
import type {
    ICreateDirectorNoticePayload,
    ISingleDirectorNoticeData,
} from "@/src/types/undertaker/directorNoticeTypes";
import {
    DIRECTOR_NOTICE_STATE_OPTIONS,
    DIRECTOR_NOTICE_TOWN_LIST,
    type DirectorNoticeStateKey,
} from "./locationOptions";

type DirectorNoticeDetailsPageProps = {
    noticeId: string;
    onBack: () => void;
};

type ServiceTypeValue = "reposing" | "funeral" | "both";

type NoticeEditForm = {
    firstName: string;
    surname: string;
    nee: string;
    title: string;
    biography: string;
    formDate: string;
    toDate: string;
    country: string;
    city: string;
    town: string;
    serviceType: ServiceTypeValue;
    reposingLocation: string;
    reposingAddress: string;
    reposingDate: string;
    reposingStartTime: string;
    reposingEndTime: string;
    funeralLocation: string;
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

const FORM_ID = "director-notice-edit-form";

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
});

const timeFormatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
});

const toInputDate = (value?: string | null) => {
    if (!value) {
        return "";
    }

    const parsedDate = new Date(value);

    if (Number.isNaN(parsedDate.getTime())) {
        return "";
    }

    return parsedDate.toISOString().slice(0, 10);
};

const toInputTime = (value?: string | null) => {
    if (!value) {
        return "";
    }

    const parsedDate = new Date(value);

    if (Number.isNaN(parsedDate.getTime())) {
        return "";
    }

    const hours = String(parsedDate.getUTCHours()).padStart(2, "0");
    const minutes = String(parsedDate.getUTCMinutes()).padStart(2, "0");

    return `${hours}:${minutes}`;
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

const formatDate = (value?: string | null) => {
    if (!value) {
        return null;
    }

    const parsedValue = new Date(value);

    if (Number.isNaN(parsedValue.getTime())) {
        return null;
    }

    return dateFormatter.format(parsedValue);
};

const formatTime = (value?: string | null) => {
    if (!value) {
        return null;
    }

    const parsedValue = new Date(value);

    if (Number.isNaN(parsedValue.getTime())) {
        return null;
    }

    return timeFormatter.format(parsedValue);
};

const mapServiceTypeFromApi = (serviceType?: string | null): ServiceTypeValue => {
    const normalizedValue = serviceType?.toLowerCase();

    if (normalizedValue === "reposing") {
        return "reposing";
    }

    if (normalizedValue === "funeral") {
        return "funeral";
    }

    return "both";
};

const mapServiceTypeToApi = (serviceType: ServiceTypeValue) => {
    if (serviceType === "reposing") {
        return "Reposing" as const;
    }

    if (serviceType === "funeral") {
        return "Funeral" as const;
    }

    return "Both" as const;
};

const toReadableLabel = (value: string) =>
    value
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");

const ensureOption = (options: SelectOption[], value?: string) => {
    if (!value) {
        return options;
    }

    if (options.some((option) => option.value === value)) {
        return options;
    }

    return [
        {
            value,
            label: toReadableLabel(value),
        },
        ...options,
    ];
};

const getOptionLabel = (options: SelectOption[], value?: string) =>
    options.find((option) => option.value === value)?.label || value || "";

const getLocationOptionsForState = (stateValue?: string) =>
    stateValue && stateValue in DIRECTOR_NOTICE_TOWN_LIST
        ? DIRECTOR_NOTICE_TOWN_LIST[stateValue as DirectorNoticeStateKey]
        : [];

const getDisplayName = ({
    firstName,
    surname,
    nee,
}: {
    firstName: string;
    surname: string;
    nee?: string;
}) => {
    const name = [firstName, surname]
        .map((value) => value?.trim())
        .filter(Boolean)
        .join(" ");

    if (nee?.trim()) {
        return `${name} (nee ${nee.trim()})`;
    }

    return name || "Unnamed notice";
};

const getTimelineLabel = (from?: string | null, to?: string | null) => {
    const formattedFrom = formatDate(from);
    const formattedTo = formatDate(to);

    if (formattedFrom && formattedTo) {
        return formattedFrom === formattedTo
            ? formattedFrom
            : `${formattedFrom} - ${formattedTo}`;
    }

    return formattedFrom || formattedTo || "Date not available";
};

const buildObituaryText = (title: string, biography: string, displayName: string, location: string) => {
    const summaryText = biography.trim()
        || `${displayName} of ${location}. Further obituary details have not been added yet.`;

    return {
        title: title.trim() || `The death has occurred of ${displayName}`,
        text: summaryText,
    };
};

const buildScheduleText = ({
    intro,
    locationName,
    address,
    date,
    startTime,
    endTime,
    emptyText,
}: {
    intro: string;
    locationName: string;
    address: string;
    date: string;
    startTime: string;
    endTime: string;
    emptyText: string;
}) => {
    const formattedDate = formatDate(toIsoDateString(date));
    const formattedStart = formatTime(toIsoDateTimeString(date, startTime));
    const formattedEnd = formatTime(toIsoDateTimeString(date, endTime));
    const schedule = [
        formattedDate,
        formattedStart && formattedEnd ? `${formattedStart} to ${formattedEnd}` : formattedStart || formattedEnd,
    ]
        .filter(Boolean)
        .join(", ");
    const location = [locationName, address].filter(Boolean).join(", ");

    if (!location && !schedule) {
        return emptyText;
    }

    return `${intro}${location ? ` at ${location}` : ""}${schedule ? ` on ${schedule}` : ""}.`;
};

const mapNoticeToFormValues = (notice: ISingleDirectorNoticeData): NoticeEditForm => ({
    firstName: notice.first_name || "",
    surname: notice.surname || "",
    nee: notice.nee || "",
    title: notice.title || "",
    biography: notice.biography || "",
    formDate: toInputDate(notice.form),
    toDate: toInputDate(notice.to),
    country: notice.country || "",
    city: notice.city || "",
    town: notice.town || "",
    serviceType: mapServiceTypeFromApi(notice.service_type),
    reposingLocation: notice.reposing_location || "",
    reposingAddress: notice.reposing_address || "",
    reposingDate: toInputDate(notice.reposing_date),
    reposingStartTime: toInputTime(notice.reposing_start_time),
    reposingEndTime: toInputTime(notice.reposing_end_time),
    funeralLocation: notice.funeral_location || "",
    funeralAddress: notice.funeral_address || "",
    funeralDate: toInputDate(notice.funeral_date),
    funeralStartTime: toInputTime(notice.funeral_start_time),
    funeralEndTime: toInputTime(notice.funeral_end_time),
    charityId: notice.charity_id || "",
});

const buildUpdatePayload = (data: NoticeEditForm): ICreateDirectorNoticePayload => {
    const includeReposing = data.serviceType === "reposing" || data.serviceType === "both";
    const includeFuneral = data.serviceType === "funeral" || data.serviceType === "both";

    return {
        first_name: data.firstName.trim(),
        surname: data.surname.trim(),
        city: data.city.trim(),
        town: data.town.trim(),
        title: data.title.trim(),
        nee: data.nee.trim(),
        form: toIsoDateString(data.formDate),
        to: toIsoDateString(data.toDate, true),
        country: data.country.trim(),
        biography: data.biography.trim(),
        service_type: mapServiceTypeToApi(data.serviceType),
        reposing_location: includeReposing ? data.reposingLocation.trim() : "",
        reposing_address: includeReposing ? data.reposingAddress.trim() : "",
        reposing_date: includeReposing ? toIsoDateString(data.reposingDate) : "",
        reposing_start_time: includeReposing
            ? toIsoDateTimeString(data.reposingDate, data.reposingStartTime)
            : "",
        reposing_end_time: includeReposing
            ? toIsoDateTimeString(data.reposingDate, data.reposingEndTime)
            : "",
        funeral_location: includeFuneral ? data.funeralLocation.trim() : "",
        funeral_address: includeFuneral ? data.funeralAddress.trim() : "",
        funeral_date: includeFuneral ? toIsoDateString(data.funeralDate) : "",
        funeral_start_time: includeFuneral
            ? toIsoDateTimeString(data.funeralDate, data.funeralStartTime)
            : "",
        funeral_end_time: includeFuneral
            ? toIsoDateTimeString(data.funeralDate, data.funeralEndTime)
            : "",
        charity_id: data.charityId,
    };
};

export default function DirectorNoticeDetailsPage({
    noticeId,
    onBack,
}: DirectorNoticeDetailsPageProps) {
    const [mode, setMode] = useQueryState("mode", "view");
    const isEditing = mode === "edit";
    const [feedback, setFeedback] = useState<FeedbackState | null>(null);

    const {
        data: noticeResponse,
        error,
        isError,
        isLoading,
        isFetching,
    } = useGetSingleDirectorNoticeByIdQuery(
        { id: noticeId },
        { skip: !noticeId },
    );
    const {
        data: charityListResponse,
        error: charityError,
    } = useGetDirectorNoticeCharityListQuery();
    const [updateDirectorNoticeById, { isLoading: isUpdating }] = useUpdateDirectorNoticeByIdMutation();

    const {
        register,
        control,
        handleSubmit,
        reset,
        setValue,
        getValues,
        watch,
        formState: { errors },
    } = useForm<NoticeEditForm>({
        defaultValues: {
            firstName: "",
            surname: "",
            nee: "",
            title: "",
            biography: "",
            formDate: "",
            toDate: "",
            country: "",
            city: "",
            town: "",
            serviceType: "both",
            reposingLocation: "",
            reposingAddress: "",
            reposingDate: "",
            reposingStartTime: "",
            reposingEndTime: "",
            funeralLocation: "",
            funeralAddress: "",
            funeralDate: "",
            funeralStartTime: "",
            funeralEndTime: "",
            charityId: "",
        },
    });

    const notice = noticeResponse?.data;

    useEffect(() => {
        if (notice) {
            reset(mapNoticeToFormValues(notice));
        }
    }, [notice, reset]);

    const values = watch();
    const selectedCountry = values.country;
    const selectedCity = values.city;
    const selectedTown = values.town;
    const serviceType = values.serviceType;
    const showReposing = serviceType === "reposing" || serviceType === "both";
    const showFuneral = serviceType === "funeral" || serviceType === "both";

    const countryOptions = useMemo(
        () => ensureOption(DIRECTOR_NOTICE_STATE_OPTIONS, selectedCountry),
        [selectedCountry],
    );

    const baseCityOptions = useMemo(
        () => getLocationOptionsForState(selectedCountry),
        [selectedCountry],
    );

    const cityOptions = useMemo(
        () => ensureOption(baseCityOptions, selectedCity),
        [baseCityOptions, selectedCity],
    );

    const townOptions = useMemo(
        () => {
            if (!selectedCity) {
                return [];
            }

            return ensureOption(baseCityOptions, selectedTown);
        },
        [baseCityOptions, selectedCity, selectedTown],
    );

    const charityOptions = useMemo(
        () =>
            (charityListResponse?.data ?? []).map((charity) => ({
                label: charity.charity_name,
                value: charity.id,
            })),
        [charityListResponse?.data],
    );

    useEffect(() => {
        const selectedCityValue = getValues("city");
        const availableOptions = getLocationOptionsForState(selectedCountry);

        if (
            selectedCountry &&
            selectedCountry in DIRECTOR_NOTICE_TOWN_LIST &&
            selectedCityValue &&
            !availableOptions.some((option) => option.value === selectedCityValue)
        ) {
            setValue("city", "", { shouldValidate: false, shouldDirty: true });
            setValue("town", "", { shouldValidate: false, shouldDirty: true });
        }
    }, [getValues, selectedCountry, setValue]);

    useEffect(() => {
        const selectedTownValue = getValues("town");

        if (!selectedCity && selectedTownValue) {
            setValue("town", "", { shouldValidate: false, shouldDirty: true });
            return;
        }

        if (
            selectedCountry &&
            selectedCountry in DIRECTOR_NOTICE_TOWN_LIST &&
            selectedCity &&
            selectedTownValue &&
            !baseCityOptions.some((option) => option.value === selectedTownValue)
        ) {
            setValue("town", "", { shouldValidate: false, shouldDirty: true });
        }
    }, [baseCityOptions, getValues, selectedCity, selectedCountry, setValue]);

    const detailErrorMessage = isError
        ? getErrorMessage(error, "Unable to load the notice details. Please try again.")
        : null;
    const charityErrorMessage = charityError
        ? getErrorMessage(charityError, "Unable to load charities right now.")
        : null;

    const displayName = getDisplayName({
        firstName: values.firstName,
        surname: values.surname,
        nee: values.nee,
    });
    const location = [
        getOptionLabel(townOptions, values.town) || values.town,
        getOptionLabel(cityOptions, values.city) || values.city,
        getOptionLabel(countryOptions, values.country) || values.country,
    ]
        .filter(Boolean)
        .join(", ") || "Location unavailable";
    const obituary = buildObituaryText(values.title, values.biography, displayName, location);
    const reposingText = buildScheduleText({
        intro: `${displayName} will repose`,
        locationName: values.reposingLocation,
        address: values.reposingAddress,
        date: values.reposingDate,
        startTime: values.reposingStartTime,
        endTime: values.reposingEndTime,
        emptyText: "Reposing details are not available yet.",
    });
    const funeralText = buildScheduleText({
        intro: "The Funeral Mass will take place",
        locationName: values.funeralLocation,
        address: values.funeralAddress,
        date: values.funeralDate,
        startTime: values.funeralStartTime,
        endTime: values.funeralEndTime,
        emptyText: "Funeral Mass details are not available yet.",
    });
    const selectedCharityLabel = charityOptions.find((option) => option.value === values.charityId)?.label
        || notice?.charity?.charity_name
        || "No charity linked";

    const onSubmit = async (data: NoticeEditForm) => {
        try {
            const payload = buildUpdatePayload(data);
            const response = await updateDirectorNoticeById({
                id: noticeId,
                data: payload,
            }).unwrap();

            setFeedback({
                variant: "success",
                title: "Notice Updated",
                message: response.message || "The notice has been updated successfully.",
            });
            setMode("view");
        } catch (submitError) {
            setFeedback({
                variant: "error",
                title: "Unable To Update Notice",
                message: getErrorMessage(submitError, "Failed to update this notice. Please try again."),
            });
        }
    };

    if (!noticeId) {
        return (
            <StatusNotice
                variant="error"
                title="Invalid Notice"
                message="A notice id is required to open this page."
            />
        );
    }

    if (isLoading) {
        return <NoticeDetailsSkeleton />;
    }

    if (detailErrorMessage) {
        return (
            <StatusNotice
                variant="error"
                title="Unable To Load Notice"
                message={detailErrorMessage}
            />
        );
    }

    if (!notice) {
        return (
            <StatusNotice
                variant="error"
                title="Notice Not Found"
                message="We could not find a notice for this id."
            />
        );
    }

    return (
        <div className="space-y-6">
            <div className="rounded-[24px] border border-[#E9E9EA] bg-white p-5 shadow-[0_18px_40px_rgba(31,41,55,0.05)] sm:p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="space-y-3">
                        <button
                            type="button"
                            onClick={onBack}
                            className="inline-flex items-center gap-2 rounded-full border border-[#D7E3CC] bg-[#F6FBF0] px-4 py-2 text-[13px] font-medium text-[#3F4A3B] transition hover:opacity-90"
                        >
                            <span aria-hidden>←</span>
                            Back to Notices
                        </button>

                        <div>
                            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#708161]">
                                Director Notice
                            </p>
                            <h1 className="mt-2 text-[1.875rem] font-semibold text-[#161721]">
                                {displayName}
                            </h1>
                            <p className="mt-2 text-[14px] leading-6 text-[#667164]">
                                Review the published notice and switch to edit mode whenever you need to update its details.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <span
                            className={[
                                "inline-flex items-center rounded-full px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.14em]",
                                notice.status === "published"
                                    ? "bg-[#EEF7E8] text-[#4F6B3F]"
                                    : "bg-[#F6F1E3] text-[#8A6A1F]",
                            ].join(" ")}
                        >
                            {notice.status}
                        </span>

                        {isEditing ? (
                            <>
                                <button
                                    type="button"
                                    onClick={() => {
                                        reset(mapNoticeToFormValues(notice));
                                        setMode("view");
                                        setFeedback(null);
                                    }}
                                    className="inline-flex h-11 items-center justify-center rounded-[12px] border border-[#D7E3CC] bg-white px-5 text-sm font-medium text-[#3F4A3B] transition hover:bg-[#F6F9F2]"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    form={FORM_ID}
                                    disabled={isUpdating}
                                    className="inline-flex h-11 items-center justify-center rounded-[12px] bg-[linear-gradient(180deg,#394034_0%,#4F5747_100%)] px-5 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    {isUpdating ? "Saving..." : "Save Changes"}
                                </button>
                            </>
                        ) : (
                            <button
                                type="button"
                                onClick={() => setMode("edit")}
                                className="inline-flex h-11 items-center justify-center rounded-[12px] bg-[linear-gradient(180deg,#394034_0%,#4F5747_100%)] px-5 text-sm font-medium text-white transition hover:opacity-90"
                            >
                                Edit Notice
                            </button>
                        )}
                    </div>
                </div>

                {feedback ? (
                    <StatusNotice
                        variant={feedback.variant}
                        title={feedback.title}
                        message={feedback.message}
                        className="mt-5"
                    />
                ) : null}

                {charityErrorMessage ? (
                    <StatusNotice
                        variant="error"
                        title="Unable To Load Charity List"
                        message={charityErrorMessage}
                        className="mt-5"
                    />
                ) : null}
            </div>

            <div className="grid gap-5 xl:grid-cols-[360px_minmax(0,1fr)]">
                <aside className="rounded-[24px] border border-[#E9E9EA] bg-white p-5 shadow-[0_18px_40px_rgba(31,41,55,0.04)] sm:p-6 xl:sticky xl:top-5 xl:self-start">
                    <div className="relative mx-auto aspect-[3/4] w-full max-w-[280px] overflow-hidden rounded-t-[999px] rounded-b-[18px] bg-[#F3F5EF]">
                        {notice.image ? (
                            <Image
                                src={notice.image}
                                alt={displayName}
                                fill
                                crossOrigin="anonymous"
                                unoptimized
                                className="object-cover object-center"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_top,_#F8FBF5,_#E4EDDB)] text-[2rem] font-semibold tracking-[0.14em] text-[#4B5A42]">
                                {displayName.slice(0, 2).toUpperCase()}
                            </div>
                        )}
                    </div>

                    <div className="mt-6 text-center">
                        <h2 className="text-[2rem] font-medium leading-tight text-[#708161]">
                            {displayName}
                        </h2>
                        <p className="mt-2 text-[1.1rem] text-[#708161]">
                            {getTimelineLabel(toIsoDateString(values.formDate), toIsoDateString(values.toDate, true))}
                        </p>
                        <div className="mt-3 flex items-center justify-center gap-2 text-[1rem] text-[#55614F]">
                            <span className="inline-flex h-3.5 w-3.5 rounded-full bg-[#708161]" />
                            <span className="italic">{location}</span>
                        </div>
                    </div>

                    <div className="mt-6 space-y-3 rounded-[18px] bg-[#F7FAF3] p-4">
                        <PreviewMeta label="Status" value={notice.status} />
                        <PreviewMeta label="Service Type" value={mapServiceTypeToApi(values.serviceType)} />
                        <PreviewMeta label="Charity" value={selectedCharityLabel} />
                        <PreviewMeta label="Updated" value={formatDate(notice.updated_at) || "N/A"} />
                    </div>
                </aside>

                <section className="rounded-[24px] border border-[#E9E9EA] bg-white p-5 shadow-[0_18px_40px_rgba(31,41,55,0.04)] sm:p-6">
                    {isEditing ? (
                        <form
                            id={FORM_ID}
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            <EditSection
                                title="Notice Essentials"
                                description="Update the core obituary details and where this notice belongs."
                            >
                                <div className="grid gap-4 md:grid-cols-2">
                                    <TextInputField
                                        label="First Name"
                                        required
                                        {...register("firstName", { required: "First name is required" })}
                                        error={errors.firstName?.message}
                                    />
                                    <TextInputField
                                        label="Surname"
                                        required
                                        {...register("surname", { required: "Surname is required" })}
                                        error={errors.surname?.message}
                                    />
                                    <TextInputField
                                        label="Nee"
                                        required
                                        {...register("nee", { required: "Nee is required" })}
                                        error={errors.nee?.message}
                                    />
                                    <TextInputField
                                        label="Notice Title"
                                        required
                                        {...register("title", { required: "Notice title is required" })}
                                        error={errors.title?.message}
                                    />
                                    <TextInputField
                                        label="From"
                                        required
                                        type="date"
                                        {...register("formDate", { required: "From date is required" })}
                                        error={errors.formDate?.message}
                                    />
                                    <TextInputField
                                        label="To"
                                        required
                                        type="date"
                                        {...register("toDate", { required: "To date is required" })}
                                        error={errors.toDate?.message}
                                    />
                                    <div>
                                        <Controller
                                            name="country"
                                            control={control}
                                            rules={{ required: "Country is required" }}
                                            render={({ field }) => (
                                                <SelectField
                                                    label="Country"
                                                    required
                                                    options={countryOptions}
                                                    placeholder="Select Country / State"
                                                    value={field.value}
                                                    onChange={(value) => {
                                                        field.onChange(value);
                                                        setValue("city", "", { shouldValidate: false, shouldDirty: true });
                                                        setValue("town", "", { shouldValidate: false, shouldDirty: true });
                                                    }}
                                                    selectClassName="h-12"
                                                />
                                            )}
                                        />
                                        {errors.country?.message ? (
                                            <p className="mt-1 text-[12px] text-red-500">{errors.country.message}</p>
                                        ) : null}
                                    </div>
                                    <div>
                                        <Controller
                                            name="city"
                                            control={control}
                                            rules={{ required: "City is required" }}
                                            render={({ field }) => (
                                                <SelectField
                                                    label="City"
                                                    required
                                                    options={cityOptions}
                                                    placeholder={cityOptions.length > 0 ? "Select City" : "Select country first"}
                                                    value={field.value}
                                                    onChange={(value) => {
                                                        field.onChange(value);
                                                        setValue("town", "", { shouldValidate: false, shouldDirty: true });
                                                    }}
                                                    disabled={cityOptions.length === 0}
                                                    selectClassName="h-12"
                                                />
                                            )}
                                        />
                                        {errors.city?.message ? (
                                            <p className="mt-1 text-[12px] text-red-500">{errors.city.message}</p>
                                        ) : null}
                                    </div>
                                    <div>
                                        <Controller
                                            name="town"
                                            control={control}
                                            rules={{ required: "Town is required" }}
                                            render={({ field }) => (
                                                <SelectField
                                                    label="Town"
                                                    required
                                                    options={townOptions}
                                                    placeholder={selectedCity ? "Select Town" : "Select city first"}
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    disabled={!selectedCity || townOptions.length === 0}
                                                    selectClassName="h-12"
                                                />
                                            )}
                                        />
                                        {errors.town?.message ? (
                                            <p className="mt-1 text-[12px] text-red-500">{errors.town.message}</p>
                                        ) : null}
                                    </div>
                                    <Controller
                                        name="serviceType"
                                        control={control}
                                        rules={{ required: "Service type is required" }}
                                        render={({ field }) => (
                                            <SelectField
                                                label="Service Type"
                                                required
                                                options={[
                                                    { label: "Reposing", value: "reposing" },
                                                    { label: "Funeral", value: "funeral" },
                                                    { label: "Both", value: "both" },
                                                ]}
                                                placeholder="Select service type"
                                                value={field.value}
                                                onChange={field.onChange}
                                                selectClassName="h-12"
                                            />
                                        )}
                                    />
                                </div>

                                <div>
                                    <label className="block text-[14px] font-medium text-[#161721]">
                                        Biography <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        className="mt-2 min-h-[190px] w-full rounded-[14px] border border-[#CFCFD6] bg-white px-4 py-3 text-[14px] text-[#161721] outline-none focus:border-[#8FA17E] focus:ring-2 focus:ring-[#8FA17E]/15"
                                        placeholder="Write the obituary and memory text..."
                                        {...register("biography", { required: "Biography is required" })}
                                    />
                                    {errors.biography?.message ? (
                                        <p className="mt-1 text-[12px] text-red-500">{errors.biography.message}</p>
                                    ) : null}
                                </div>
                            </EditSection>

                            {showReposing ? (
                                <EditSection
                                    title="Reposing"
                                    description="Adjust the reposing place and schedule that visitors will see."
                                >
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <TextInputField
                                            label="Reposing Location"
                                            required
                                            {...register("reposingLocation", {
                                                required: showReposing ? "Reposing location is required" : false,
                                            })}
                                            error={errors.reposingLocation?.message}
                                        />
                                        <TextInputField
                                            label="Reposing Address"
                                            required
                                            {...register("reposingAddress", {
                                                required: showReposing ? "Reposing address is required" : false,
                                            })}
                                            error={errors.reposingAddress?.message}
                                        />
                                        <TextInputField
                                            label="Reposing Date"
                                            required
                                            type="date"
                                            {...register("reposingDate", {
                                                required: showReposing ? "Reposing date is required" : false,
                                            })}
                                            error={errors.reposingDate?.message}
                                        />
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            <TextInputField
                                                label="Start Time"
                                                required
                                                type="time"
                                                {...register("reposingStartTime", {
                                                    required: showReposing ? "Start time is required" : false,
                                                })}
                                                error={errors.reposingStartTime?.message}
                                            />
                                            <TextInputField
                                                label="End Time"
                                                required
                                                type="time"
                                                {...register("reposingEndTime", {
                                                    required: showReposing ? "End time is required" : false,
                                                })}
                                                error={errors.reposingEndTime?.message}
                                            />
                                        </div>
                                    </div>
                                </EditSection>
                            ) : null}

                            {showFuneral ? (
                                <EditSection
                                    title="Funeral Mass"
                                    description="Keep the final service details accurate and easy to follow."
                                >
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <TextInputField
                                            label="Funeral Location"
                                            required
                                            {...register("funeralLocation", {
                                                required: showFuneral ? "Funeral location is required" : false,
                                            })}
                                            error={errors.funeralLocation?.message}
                                        />
                                        <TextInputField
                                            label="Funeral Address"
                                            required
                                            {...register("funeralAddress", {
                                                required: showFuneral ? "Funeral address is required" : false,
                                            })}
                                            error={errors.funeralAddress?.message}
                                        />
                                        <TextInputField
                                            label="Funeral Date"
                                            required
                                            type="date"
                                            {...register("funeralDate", {
                                                required: showFuneral ? "Funeral date is required" : false,
                                            })}
                                            error={errors.funeralDate?.message}
                                        />
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            <TextInputField
                                                label="Start Time"
                                                required
                                                type="time"
                                                {...register("funeralStartTime", {
                                                    required: showFuneral ? "Start time is required" : false,
                                                })}
                                                error={errors.funeralStartTime?.message}
                                            />
                                            <TextInputField
                                                label="End Time"
                                                required
                                                type="time"
                                                {...register("funeralEndTime", {
                                                    required: showFuneral ? "End time is required" : false,
                                                })}
                                                error={errors.funeralEndTime?.message}
                                            />
                                        </div>
                                    </div>
                                </EditSection>
                            ) : null}

                            <EditSection
                                title="Charity Link"
                                description="Attach the correct charity that should appear with this notice."
                            >
                                <Controller
                                    name="charityId"
                                    control={control}
                                    rules={{ required: "Please select a charity" }}
                                    render={({ field }) => (
                                        <SelectField
                                            label="Select Charity"
                                            required
                                            options={charityOptions}
                                            placeholder={charityOptions.length > 0 ? "Choose charity" : "No charity available"}
                                            value={field.value}
                                            onChange={field.onChange}
                                            disabled={charityOptions.length === 0 || isFetching}
                                            selectClassName="h-12"
                                        />
                                    )}
                                />
                                {errors.charityId?.message ? (
                                    <p className="mt-1 text-[12px] text-red-500">{errors.charityId.message}</p>
                                ) : null}
                            </EditSection>

                            <div className="flex flex-col-reverse justify-end gap-3 border-t border-[#EEF2E8] pt-4 sm:flex-row">
                                <button
                                    type="button"
                                    onClick={() => {
                                        reset(mapNoticeToFormValues(notice));
                                        setMode("view");
                                        setFeedback(null);
                                    }}
                                    className="inline-flex h-11 items-center justify-center rounded-[12px] border border-[#D7E3CC] bg-white px-5 text-sm font-medium text-[#3F4A3B] transition hover:bg-[#F6F9F2]"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isUpdating}
                                    className="inline-flex h-11 items-center justify-center rounded-[12px] bg-[linear-gradient(180deg,#394034_0%,#4F5747_100%)] px-5 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    {isUpdating ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="space-y-6">
                            <div className="rounded-[20px] border border-[#E9E9EA] bg-[#FCFDFB] p-5">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="min-w-0">
                                        <p className="text-[1.05rem] font-medium leading-8 text-[#777980]">
                                            {obituary.title}
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setMode("edit")}
                                        className="shrink-0 text-[12px] font-medium text-[#708161] transition hover:text-[#4F6B3F]"
                                    >
                                        Edit
                                    </button>
                                </div>
                                <p className="mt-3 whitespace-pre-line text-[1rem] leading-8 text-[#777980]">
                                    {obituary.text}
                                </p>
                            </div>

                            <div className="text-center text-[1.75rem] font-semibold text-[#708161]">
                                May Their Gentle Soul Rest In Peace
                            </div>

                            <div className="grid gap-4 md:grid-cols-3">
                                <SummaryCard label="Service Type" value={mapServiceTypeToApi(values.serviceType)} />
                                <SummaryCard label="Charity" value={selectedCharityLabel} />
                                <SummaryCard
                                    label="Notice Window"
                                    value={getTimelineLabel(toIsoDateString(values.formDate), toIsoDateString(values.toDate, true))}
                                />
                            </div>

                            <div className="space-y-5 border-t border-[#E9E9EA] pt-5">
                                <InfoBlock
                                    title="Reposing"
                                    text={reposingText}
                                    onEdit={() => setMode("edit")}
                                />
                                <InfoBlock
                                    title="Funeral Mass"
                                    text={funeralText}
                                    onEdit={() => setMode("edit")}
                                />
                            </div>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}

function PreviewMeta({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-[14px] border border-white/70 bg-white px-4 py-3">
            <p className="text-[12px] uppercase tracking-[0.16em] text-[#8A9583]">{label}</p>
            <p className="mt-1 text-[14px] font-medium text-[#2C3428]">{value}</p>
        </div>
    );
}

function EditSection({
    title,
    description,
    children,
}: {
    title: string;
    description: string;
    children: React.ReactNode;
}) {
    return (
        <section className="rounded-[20px] border border-[#E9E9EA] bg-[#FCFDFB] p-5">
            <div className="mb-4">
                <h2 className="text-[1.1rem] font-semibold text-[#161721]">{title}</h2>
                <p className="mt-1 text-[14px] leading-6 text-[#667164]">{description}</p>
            </div>
            <div className="space-y-4">{children}</div>
        </section>
    );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-[18px] border border-[#E9E9EA] bg-[#FCFDFB] px-4 py-4">
            <p className="text-[12px] uppercase tracking-[0.16em] text-[#8A9583]">{label}</p>
            <p className="mt-2 text-[14px] font-medium leading-6 text-[#2C3428]">{value}</p>
        </div>
    );
}

function InfoBlock({
    title,
    text,
    onEdit,
}: {
    title: string;
    text: string;
    onEdit: () => void;
}) {
    return (
        <div className="rounded-[18px] border border-[#E9E9EA] bg-[#FCFDFB] p-5">
            <div className="flex items-center justify-between gap-3">
                <h3 className="text-[1.3rem] font-medium text-[#708161]">{title}</h3>
                <button
                    type="button"
                    onClick={onEdit}
                    className="text-[12px] font-medium text-[#708161] transition hover:text-[#4F6B3F]"
                >
                    Edit
                </button>
            </div>
            <p className="mt-3 text-[1rem] leading-8 text-[#777980]">{text}</p>
        </div>
    );
}

function NoticeDetailsSkeleton() {
    return (
        <section className="space-y-6">
            <div className="rounded-[24px] border border-[#E9E9EA] bg-white p-6">
                <Skeleton className="h-10 w-40 bg-[#E5EBDE]" />
                <Skeleton className="mt-5 h-10 w-72 bg-[#EEF2E8]" />
                <Skeleton className="mt-3 h-5 w-[28rem] max-w-full bg-[#EEF2E8]" />
            </div>

            <div className="grid gap-5 xl:grid-cols-[360px_minmax(0,1fr)]">
                <div className="rounded-[24px] border border-[#E9E9EA] bg-white p-6">
                    <Skeleton className="mx-auto aspect-[3/4] w-full max-w-[280px] rounded-t-[999px] rounded-b-[18px] bg-[#EEF2E8]" />
                    <Skeleton className="mx-auto mt-6 h-10 w-52 bg-[#E5EBDE]" />
                    <Skeleton className="mx-auto mt-3 h-6 w-40 bg-[#EEF2E8]" />
                </div>

                <div className="rounded-[24px] border border-[#E9E9EA] bg-white p-6">
                    <Skeleton className="h-8 w-64 bg-[#E5EBDE]" />
                    <Skeleton className="mt-4 h-5 w-full bg-[#F0F3EC]" />
                    <Skeleton className="mt-3 h-5 w-full bg-[#F0F3EC]" />
                    <Skeleton className="mt-3 h-5 w-[88%] bg-[#F0F3EC]" />
                    <Skeleton className="mt-8 h-6 w-48 bg-[#E5EBDE]" />
                    <Skeleton className="mt-5 h-5 w-full bg-[#F0F3EC]" />
                    <Skeleton className="mt-3 h-5 w-[84%] bg-[#F0F3EC]" />
                </div>
            </div>
        </section>
    );
}
