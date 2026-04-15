"use client";

import React from "react";
import { Modal } from "../ui/modal";

type Variant = "approve" | "reject" | "request";

interface VerificationActionModalProps {
    isOpen: boolean;
    onClose: () => void;

    businessName?: string;

    // content
    title?: string;
    description?: string;

    // buttons
    primaryLabel?: string;
    secondaryLabel?: string; // default "Cancel"
    onPrimaryAction?: () => void;

    // behavior
    isLoading?: boolean;
    variant?: Variant;
}

const variantStyles: Record<Variant, { primaryClass: string; titleColor: string }> = {
    approve: {
        titleColor: "text-[#708161]",
        primaryClass: "bg-[linear-gradient(180deg,#394034_0%,#4F5747_100%)] text-white",
    },
    reject: {
        titleColor: "text-[#B91C1C]",
        primaryClass: "bg-[#B91C1C] text-white hover:opacity-90",
    },
    request: {
        titleColor: "text-[#3F4A3B]",
        primaryClass: "bg-[linear-gradient(180deg,#394034_0%,#4F5747_100%)] text-white",
    },
};

export default function VerificationActionModal({
    isOpen,
    onClose,
    businessName = "Municipal Chapel of Downtown",

    title,
    description,

    primaryLabel = "Approve",
    secondaryLabel = "Cancel",
    onPrimaryAction,

    isLoading = false,
    variant = "approve",
}: VerificationActionModalProps) {
    const v = variantStyles[variant];

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            className="
        w-[min(680px,calc(100vw-24px))]
        rounded-[10px]
        bg-white
        px-5 py-6 sm:px-8 sm:py-7
        shadow-[0_20px_60px_rgba(0,0,0,0.25)]
      "
        >
            <div className="relative">
                <div className="flex flex-col items-center text-center">
                    <h2 className={`${v.titleColor} text-[2.25rem] font-medium leading-none`}>
                        {title ?? defaultTitle(variant)}
                    </h2>

                    <p className="mt-3 text-[14px] text-gray-500 leading-6 max-w-[460px]">
                        {description ?? defaultDescription(variant, businessName)}
                    </p>

                    {/* Buttons */}
                    <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
                        <button
                            type="button"
                            onClick={onClose}
                            className="
                h-11 w-full sm:w-[180px]
                rounded-[8px]
                border border-[#E9E9EA]
                bg-white
                px-6
                text-[13px] font-medium text-gray-700
                hover:bg-gray-50 transition
              "
                        >
                            {secondaryLabel}
                        </button>

                        <button
                            type="button"
                            onClick={onPrimaryAction}
                            disabled={isLoading}
                            className={[
                                "h-11 w-full sm:w-[220px]",
                                "rounded-[8px] px-6 text-[13px] font-medium transition",
                                "disabled:opacity-60 disabled:cursor-not-allowed",
                                v.primaryClass,
                            ].join(" ")}
                        >
                            {isLoading ? "Please wait..." : primaryLabel}
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

function defaultTitle(variant: Variant) {
    if (variant === "approve") return "Approve Application?";
    if (variant === "reject") return "Reject Application?";
    return "Request More Info?";
}

function defaultDescription(variant: Variant, businessName: string) {
    if (variant === "approve")
        return `You are about to approve ${businessName}. This action will mark the application as verified.`;
    if (variant === "reject")
        return `You are about to reject ${businessName}. This action can be reversed only by submitting again.`;
    return `Request additional information from ${businessName} before approving.`;
}