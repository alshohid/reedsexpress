"use client";

import { Modal } from "../../ui/modal";
import type { CharityData } from "@/src/types/adminCharityTypes";
import StatusNotice from "../../ui/StatusNotice";

type DeleteCharityModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
  charity: CharityData | null;
  isDeleting?: boolean;
  errorMessage?: string;
};

export default function DeleteCharityModal({
  isOpen,
  onClose,
  onConfirm,
  charity,
  isDeleting = false,
  errorMessage = "",
}: DeleteCharityModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="w-[calc(100%-24px)] max-w-[460px] rounded-[28px] border border-[#F0D7D7] bg-[#FFFDFC] p-6 sm:p-7"
    >
      <div className="space-y-5">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFECEC] text-xl text-[#B53636]">
          !
        </div>

        <div>
          <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-[#B45E5E]">
            Delete Charity
          </p>
          <h3 className="mt-2 text-[1.25rem] font-semibold text-[#161721]">
            Remove this charity from the list?
          </h3>
          <p className="mt-2 text-[14px] leading-6 text-[#667164]">
            This action will remove{" "}
            <span className="font-semibold text-[#161721]">
              {charity?.charity_name || "this charity"}
            </span>{" "}
            from the charity management list.
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
            {isDeleting ? "Deleting..." : "Delete Charity"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
