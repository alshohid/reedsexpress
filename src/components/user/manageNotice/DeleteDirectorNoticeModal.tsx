"use client";

import { Modal } from "../../ui/modal";
import StatusNotice from "../../ui/StatusNotice";
import type { INotice } from "@/src/types/noticeType";

type DeleteDirectorNoticeModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void> | void;
    notice: INotice | null;
    isDeleting?: boolean;
    errorMessage?: string;
};

const getNoticeDisplayName = (notice: INotice | null) => {
    if (!notice) {
        return "this notice";
    }

    return [notice.first_name, notice.surname]
        .map((value) => value?.trim())
        .filter(Boolean)
        .join(" ")
        || "this notice";
};

export default function DeleteDirectorNoticeModal({
    isOpen,
    onClose,
    onConfirm,
    notice,
    isDeleting = false,
    errorMessage = "",
}: DeleteDirectorNoticeModalProps) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            className="w-[calc(100%-24px)] max-w-[480px] rounded-[28px] border border-[#F0D7D7] bg-[#FFFDFC] p-6 sm:p-7"
        >
            <div className="space-y-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFECEC] text-xl text-[#B53636]">
                    !
                </div>

                <div>
                    <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-[#B45E5E]">
                        Delete Notice
                    </p>
                    <h3 className="mt-2 text-[1.25rem] font-semibold text-[#161721]">
                        Remove this notice permanently?
                    </h3>
                    <p className="mt-2 text-[14px] leading-6 text-[#667164]">
                        This will remove{" "}
                        <span className="font-semibold text-[#161721]">
                            {getNoticeDisplayName(notice)}
                        </span>{" "}
                        from your notices list. This action cannot be undone.
                    </p>
                </div>

                {errorMessage ? (
                    <StatusNotice
                        variant="error"
                        title="Delete Failed"
                        message={errorMessage}
                    />
                ) : null}

                <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex h-11 items-center justify-center rounded-[12px] border border-[#D7E3CC] bg-white px-5 text-sm font-medium text-[#3F4A3B] transition hover:bg-[#F6F9F2]"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={() => void onConfirm()}
                        disabled={isDeleting}
                        className="inline-flex h-11 items-center justify-center rounded-[12px] bg-[#B53636] px-5 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {isDeleting ? "Deleting..." : "Delete Notice"}
                    </button>
                </div>
            </div>
        </Modal>
    );
}
