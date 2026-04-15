"use client";

import { Modal } from "../../ui/modal";

interface CondolenceModalProps {
    isOpen: boolean;
    onClose: () => void;
    deceasedName?: string;
    onConfirm?: () => void;
    onPreview?: () => void;
    confirmLabel?: string;
    previewLabel?: string;
    isLoading?: boolean;
}

export default function CondolenceModal({
    isOpen,
    onClose,
    deceasedName = "Isabel Pérez",
    onConfirm,
    onPreview,
    confirmLabel = "Confirm",
    previewLabel = "Preview",
    isLoading = false,
}: CondolenceModalProps) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            className="
        w-[min(584px,calc(100vw-24px))]
        rounded-[12px]
        bg-white
        p-6 sm:p-8
        shadow-[0_20px_60px_rgba(0,0,0,0.25)]
      "
        >
            <div className="relative">
                <div className="flex flex-col items-center text-center">
                    <h2
                        className="text-[#708161] font-medium leading-[1.1]"
                        style={{ fontFamily: "var(--font-domine)", fontSize: "2.25rem" }}
                    >
                        Condolence Created <br className="hidden sm:block" />
                        Successfully
                    </h2>

                    <p className="mt-4 max-w-[460px] text-[14px] sm:text-[15px] leading-6 text-[#777980]">
                        A condolence book will be now published after your confirmation{" "}
                        <span className="font-semibold text-[#6A6A72]">{deceasedName}</span>
                    </p>

                    {/* Actions */}
                    <div className="mt-7 flex w-full flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5">
                        <button
                            type="button"
                            onClick={onConfirm}
                            disabled={isLoading}
                            className="
                h-11 w-full sm:w-[220px]
                rounded-[10px]
                bg-[linear-gradient(180deg,#394034_0%,#4F5747_100%)]
                text-white text-[14px] font-medium
                hover:opacity-90 transition
                disabled:opacity-60 disabled:cursor-not-allowed
              "
                        >
                            {isLoading ? "Please wait..." : confirmLabel}
                        </button>

                        <button
                            type="button"
                            onClick={onPreview}
                            className="
                h-11 w-full sm:w-[220px]
                rounded-[10px]
                bg-[linear-gradient(180deg,#394034_0%,#4F5747_100%)]
                text-white text-[14px] font-medium
                hover:opacity-90 transition
              "
                        >
                            {previewLabel}
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}