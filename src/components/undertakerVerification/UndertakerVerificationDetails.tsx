"use client";

import { Skeleton } from "@/src/components/ui/skeleton";
import ProfileAvatar from "../users/ProfileAvatar";

type Attachment = {
    id: string;
    title: string;
    href?: string | null;
};

type DetailItem = {
    label: string;
    value: string;
};

type DetailsProps = {
    title?: string;
    avatar?: string | null;
    firstName?: string;
    lastName?: string;
    email?: string;
    attachments?: Attachment[];
    details?: DetailItem[];
    isLoading?: boolean;
    isActionLoading?: boolean;
    approveLabel?: string;
    rejectLabel?: string;
    actionStateMessage?: string;
    actionStateTone?: "success" | "error" | "neutral";
    onApprove?: () => void;
    onReject?: () => void;
    onRequestInfo?: () => void;
    onViewAttachment?: (href?: string | null) => void;
};

function PdfBadge() {
    return (
        <span className="inline-flex items-center justify-center rounded bg-[#E9EEF5] px-2 py-1 text-[10px] font-semibold text-red-500">
            PDF
        </span>
    );
}

function InfoRow({ label, value }: DetailItem) {
    return (
        <div className="border-b border-black/5 py-4 last:border-b-0">
            <div className="text-[1.25rem] font-semibold text-[#161721]">{label}</div>
            <div className="mt-1 text-[1rem] text-[#777980]">{value}</div>
        </div>
    );
}

function AttachmentRow({
    title,
    href,
    onView,
}: {
    title: string;
    href?: string | null;
    onView?: () => void;
}) {
    return (
        <div className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3">
            <div className="flex min-w-0 items-center gap-3">
                <PdfBadge />
                <span className="truncate text-[12px] text-gray-600">{title}</span>
            </div>
            <button
                type="button"
                onClick={onView}
                disabled={!href}
                className="text-[12px] font-medium text-gray-500 transition hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
                View
            </button>
        </div>
    );
}

function LoadingState() {
    return (
        <section className="w-full rounded-[12px] border border-[#E9E9EA] bg-white p-2 sm:p-4">
            <Skeleton className="h-9 w-72 bg-[#EEF5E7]" />

            <div className="mt-4 grid gap-5 lg:grid-cols-2">
                <div className="rounded-[12px] p-4 sm:p-5">
                    <div className="flex flex-col items-start gap-4">
                        <Skeleton className="h-[6.85rem] w-[6.85rem] rounded-full bg-[#EEF5E7]" />

                        <div className="w-full space-y-4">
                            {Array.from({ length: 3 }).map((_, index) => (
                                <div key={`profile-skeleton-${index}`} className="space-y-2 border-b border-black/5 py-4">
                                    <Skeleton className="h-6 w-36 bg-[#EEF5E7]" />
                                    <Skeleton className="h-4 w-48 bg-[#F5F8F1]" />
                                </div>
                            ))}
                        </div>

                        <div className="w-full pt-2">
                            <Skeleton className="mb-3 h-6 w-32 bg-[#EEF5E7]" />
                            <div className="flex flex-col gap-3">
                                {Array.from({ length: 2 }).map((_, index) => (
                                    <Skeleton key={`attachment-skeleton-${index}`} className="h-14 w-full rounded-lg bg-[#F5F8F1]" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rounded-[12px] border border-[#E9E9EA] bg-white p-4 sm:p-5">
                    {Array.from({ length: 7 }).map((_, index) => (
                        <div key={`detail-skeleton-${index}`} className="space-y-2 border-b border-black/5 py-4 last:border-b-0">
                            <Skeleton className="h-6 w-40 bg-[#EEF5E7]" />
                            <Skeleton className="h-4 w-full bg-[#F5F8F1]" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Skeleton className="h-11 w-full rounded-lg bg-[#EEF5E7] sm:w-[220px]" />
                <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
                    <Skeleton className="h-11 w-full rounded-lg bg-[#F5F8F1] sm:w-[160px]" />
                    <Skeleton className="h-11 w-full rounded-lg bg-[#F5F8F1] sm:w-[180px]" />
                </div>
            </div>
        </section>
    );
}

function ActionStateBanner({
    message,
    tone = "neutral",
}: {
    message: string;
    tone?: "success" | "error" | "neutral";
}) {
    const className =
        tone === "success"
            ? "border-[#D5E8C7] bg-[#F7FCF1] text-[#4A6140]"
            : tone === "error"
                ? "border-[#F0D2D2] bg-[#FFF5F5] text-[#9F4C4C]"
                : "border-[#E2E8D8] bg-[#F7F9F3] text-[#667164]";

    return (
        <div className={`rounded-lg border px-4 py-3 text-[14px] ${className}`}>
            {message}
        </div>
    );
}

export default function UndertakerVerificationDetails({
    title = "Undertaker Verification",
    avatar,
    firstName = "-",
    lastName = "-",
    email = "-",
    attachments = [],
    details = [],
    isLoading = false,
    isActionLoading = false,
    approveLabel = "Approve Now",
    rejectLabel = "Reject",
    actionStateMessage,
    actionStateTone = "neutral",
    onApprove,
    onReject,
    onRequestInfo,
    onViewAttachment,
}: DetailsProps) {
    if (isLoading) {
        return <LoadingState />;
    }

    return (
        <section className="w-full rounded-[12px] border border-[#E9E9EA] bg-white p-2 sm:p-4">
            <h2 className="text-[1.626rem] font-medium text-[#161721]">{title}</h2>

            <div className="mt-4 grid gap-5 lg:grid-cols-2">
                <div className="rounded-[12px] p-4 sm:p-5">
                    <div className="flex flex-col items-start gap-4">
                        <div className="flex items-center gap-4">
                            <ProfileAvatar imageSrc={avatar || "/sidebar/profile_img.jpg"} isOnline={false} />
                        </div>

                        <div className="w-full">
                            <InfoRow label="First Name" value={firstName} />
                            <InfoRow label="Last Name" value={lastName} />
                            <InfoRow label="Email" value={email} />
                        </div>

                        <div className="w-full pt-2">
                            <div className="mb-3 text-[1.25rem] font-medium text-[#161721]">Attachments</div>
                            {attachments.length > 0 ? (
                                <div className="flex flex-col gap-3">
                                    {attachments.map((attachment) => (
                                        <AttachmentRow
                                            key={attachment.id}
                                            title={attachment.title}
                                            href={attachment.href}
                                            onView={() => onViewAttachment?.(attachment.href)}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="rounded-lg border border-dashed border-[#D9DADC] bg-[#FAFAFA] px-4 py-5 text-[14px] text-[#667164]">
                                    No attachments available.
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="rounded-[12px] border border-[#E9E9EA] bg-white p-4 sm:p-5">
                    <div className="space-y-0">
                        {details.length > 0 ? (
                            details.map((detail) => (
                                <InfoRow key={detail.label} label={detail.label} value={detail.value} />
                            ))
                        ) : (
                            <div className="rounded-lg border border-dashed border-[#D9DADC] bg-[#FAFAFA] px-4 py-5 text-[14px] text-[#667164]">
                                No business details available.
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                {actionStateMessage ? (
                    <div className="w-full sm:hidden">
                        <ActionStateBanner message={actionStateMessage} tone={actionStateTone} />
                    </div>
                ) : null}

                <button
                    type="button"
                    onClick={onApprove}
                    disabled={!onApprove || isActionLoading}
                    className="
            h-11 w-full sm:w-[220px]
            rounded-lg
            bg-[#3F4A3B]
            text-[1rem] font-medium text-white
            transition hover:opacity-90
            disabled:cursor-not-allowed disabled:opacity-50
          "
                >
                    {approveLabel}
                </button>

                <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:justify-end sm:gap-4">
                    <button
                        type="button"
                        onClick={onReject}
                        disabled={!onReject || isActionLoading}
                        className="
              h-11 w-full sm:w-[160px]
              rounded-lg
              border border-[#708161]
              bg-[#F5FFEE]
              text-[1rem] font-medium text-[#161721]
              transition hover:bg-[#ECF7DF]
              disabled:cursor-not-allowed disabled:opacity-50
            "
                    >
                        {rejectLabel}
                    </button>

                    <button
                        type="button"
                        onClick={onRequestInfo}
                        disabled={!onRequestInfo || isActionLoading}
                        className="
              h-11 w-full sm:w-[180px]
              rounded-lg
              border border-[#708161]
              bg-[#F5FFEE]
              text-[1rem] font-medium text-[#161721]
              transition hover:bg-[#ECF7DF]
              disabled:cursor-not-allowed disabled:opacity-50
            "
                    >
                        Request Info
                    </button>
                </div>
            </div>

            {actionStateMessage ? (
                <div className="mt-3 hidden sm:block">
                    <ActionStateBanner message={actionStateMessage} tone={actionStateTone} />
                </div>
            ) : null}
        </section>
    );
}
