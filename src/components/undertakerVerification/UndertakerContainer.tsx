"use client";

import { useState } from "react";
import { getErrorMessage } from "@/src/lib/getErrorMessage";
import { useModal } from "@/src/hooks/useModal";
import {
    useGetSingleUndertakerForAdminVerificationQuery,
    useUndertakerApproveByAdminMutation,
    useUndertakerRejectByAdminMutation,
} from "@/src/redux/features/admin/udertakerVerification/undertakerVerification";
import StatusNotice from "../ui/StatusNotice";
import UndertakerVerificationDetails from "./UndertakerVerificationDetails";
import VerificationActionModal from "./ApprovedVerificationModal";

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
});

const formatDate = (value?: string | null) => {
    if (!value) {
        return "-";
    }

    const parsedDate = new Date(value);

    if (Number.isNaN(parsedDate.getTime())) {
        return "-";
    }

    return dateFormatter.format(parsedDate);
};

const splitName = (value?: string | null) => {
    const parts = (value || "").trim().split(/\s+/).filter(Boolean);

    if (parts.length === 0) {
        return { firstName: "-", lastName: "-" };
    }

    if (parts.length === 1) {
        return { firstName: parts[0], lastName: "-" };
    }

    return {
        firstName: parts[0],
        lastName: parts.slice(1).join(" "),
    };
};

type ActionNotice = {
    variant: "success" | "error";
    title: string;
    message: string;
};

export default function UndertakerContainer({ id }: { id: string }) {
    const { isOpen: isApproveModalOpen, openModal: openApproveModal, closeModal: closeApproveModal } = useModal();
    const { isOpen: isRejectModalOpen, openModal: openRejectModal, closeModal: closeRejectModal } = useModal();
    const { isOpen: isRequestModalOpen, openModal: openRequestModal, closeModal: closeRequestModal } = useModal();
    const [actionNotice, setActionNotice] = useState<ActionNotice | null>(null);

    const {
        data: undertakerResponse,
        error,
        isLoading,
    } = useGetSingleUndertakerForAdminVerificationQuery(id || "", {
        skip: !id,
    });
    const [approveUndertaker, { isLoading: isApproveLoading }] = useUndertakerApproveByAdminMutation();
    const [rejectUndertaker, { isLoading: isRejectLoading }] = useUndertakerRejectByAdminMutation();

    const undertaker = undertakerResponse?.data;
    const detailErrorMessage = error
        ? getErrorMessage(error, "Failed to load undertaker details.")
        : "";
    const isApproved = undertaker?.approval_status === "approved" && Boolean(undertaker?.approved_at);
    const isRejected = undertaker?.approval_status === "rejected" && !undertaker?.approved_at;
    const approvedOnLabel = formatDate(undertaker?.approved_at);
    const primaryIdentity = splitName(undertaker?.primary_contact || undertaker?.name);
    const attachments = (undertaker?.exercise_documents ?? []).map((title, index) => ({
        id: `${undertaker?.id || "undertaker"}-attachment-${index}`,
        title,
        href: undertaker?.exercise_documents_url?.[index] ?? null,
    }));
    const details = undertaker
        ? [
            { label: "Funeral Home Name", value: undertaker.name || "-" },
            { label: "Business Registration Number", value: undertaker.registration_number || "-" },
            { label: "Primary Contact Person", value: undertaker.primary_contact || "-" },
            { label: "Physical Address", value: undertaker.address || "-" },
            { label: "Business Phone", value: undertaker.business_phone || "-" },
            { label: "Email", value: undertaker.email || "-" },
            { label: "Account Type", value: undertaker.type || "-" },
            { label: "Application Status", value: undertaker.approval_status || "-" },
            { label: "Submitted On", value: formatDate(undertaker.created_at) },
            { label: "Approved On", value: formatDate(undertaker.approved_at) },
        ]
        : [];
    const approveLabel = isApproved
        ? approvedOnLabel !== "-"
            ? `Approved on ${approvedOnLabel}`
            : "Already Approved"
        : "Approve Now";
    const rejectLabel = isRejected ? "Already Rejected" : "Reject";
    const actionState = isApproved
        ? {
            message:
                approvedOnLabel !== "-"
                    ? `This application was already approved on ${approvedOnLabel}.`
                    : "This application has already been approved.",
            tone: "success" as const,
        }
        : isRejected
            ? {
                message: "This application is already rejected. You can approve it if the decision changes.",
                tone: "error" as const,
            }
            : null;

    const closeAllActionModals = () => {
        closeApproveModal();
        closeRejectModal();
        closeRequestModal();
    };

    const handleApprove = async () => {
        if (!undertaker) {
            return;
        }

        try {
            const response = await approveUndertaker(undertaker.id).unwrap();

            closeApproveModal();
            setActionNotice({
                variant: "success",
                title: "Application Approved",
                message: response.message || `${undertaker.name} has been approved successfully.`,
            });
        } catch (actionError) {
            setActionNotice({
                variant: "error",
                title: "Approve Failed",
                message: getErrorMessage(actionError, "Failed to approve this application."),
            });
        }
    };

    const handleReject = async () => {
        if (!undertaker) {
            return;
        }

        try {
            const response = await rejectUndertaker(undertaker.id).unwrap();

            closeRejectModal();
            setActionNotice({
                variant: "success",
                title: "Application Rejected",
                message: response.message || `${undertaker.name} has been rejected successfully.`,
            });
        } catch (actionError) {
            setActionNotice({
                variant: "error",
                title: "Reject Failed",
                message: getErrorMessage(actionError, "Failed to reject this application."),
            });
        }
    };

    const handleViewAttachment = (href?: string | null) => {
        if (!href) {
            return;
        }

        window.open(encodeURI(href), "_blank", "noopener,noreferrer");
    };

    return (
        <div className="space-y-4">
            {!id ? (
                <StatusNotice
                    variant="error"
                    title="Invalid Undertaker"
                    message="A valid undertaker id is required before loading details."
                />
            ) : null}

            {actionNotice ? (
                <StatusNotice
                    variant={actionNotice.variant}
                    title={actionNotice.title}
                    message={actionNotice.message}
                />
            ) : null}

            {detailErrorMessage ? (
                <StatusNotice
                    variant="error"
                    title="Unable To Load Undertaker"
                    message={detailErrorMessage}
                />
            ) : null}

            <UndertakerVerificationDetails
                title={undertaker?.name || "Undertaker Verification"}
                avatar={undertaker?.avatar}
                firstName={primaryIdentity.firstName}
                lastName={primaryIdentity.lastName}
                email={undertaker?.email || "-"}
                attachments={attachments}
                details={details}
                isLoading={isLoading && !undertaker}
                isActionLoading={isApproveLoading || isRejectLoading}
                approveLabel={approveLabel}
                rejectLabel={rejectLabel}
                actionStateMessage={actionState?.message}
                actionStateTone={actionState?.tone}
                onApprove={undertaker && !isApproved ? () => {
                    setActionNotice(null);
                    openApproveModal();
                } : undefined}
                onReject={undertaker && !isRejected ? () => {
                    setActionNotice(null);
                    openRejectModal();
                } : undefined}
                onRequestInfo={() => {
                    setActionNotice(null);
                    openRequestModal();
                }}
                onViewAttachment={handleViewAttachment}
            />

            <VerificationActionModal
                isOpen={isApproveModalOpen}
                onClose={closeApproveModal}
                businessName={undertaker?.name || "this application"}
                variant="approve"
                primaryLabel="Approve"
                onPrimaryAction={handleApprove}
                isLoading={isApproveLoading}
            />

            <VerificationActionModal
                isOpen={isRejectModalOpen}
                onClose={closeRejectModal}
                businessName={undertaker?.name || "this application"}
                variant="reject"
                primaryLabel="Reject"
                onPrimaryAction={handleReject}
                isLoading={isRejectLoading}
            />

            <VerificationActionModal
                isOpen={isRequestModalOpen}
                onClose={closeRequestModal}
                businessName={undertaker?.name || "this application"}
                variant="request"
                title="Request Info Unavailable"
                description="A request info endpoint is not available in the current API, so this action cannot be submitted yet."
                primaryLabel="Close"
                secondaryLabel="Back"
                onPrimaryAction={closeAllActionModals}
                isLoading={false}
            />
        </div>
    );
}
