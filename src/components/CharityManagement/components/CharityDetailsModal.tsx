"use client";

import { Modal } from "../../ui/modal";
import type { CharityData } from "@/src/types/adminCharityTypes";
import {
  formatCharityDateTime,
  formatCountryLabel,
  getCharityInitials,
} from "./charityUtils";
import Image from "next/image";

type CharityDetailsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  charity: CharityData | null;
  isLoading?: boolean;
};

const detailRowClassName =
  "flex items-start justify-between gap-4 rounded-[14px] border border-[#E9EEE4] bg-[#F8FBF4] px-4 py-3";

export default function CharityDetailsModal({
  isOpen,
  onClose,
  charity,
  isLoading = false,
}: CharityDetailsModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="w-[calc(100%-24px)] max-w-[560px] rounded-[28px] border border-[#E4EBDD] bg-[#FCFDFB] p-6 sm:p-7"
    >
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          {charity?.logo_url ? (
            <Image
              src={charity.logo_url}
              alt={charity.charity_name}
              width={64}
              height={64}
              unoptimized
              crossOrigin="anonymous"
              className="h-16 w-16 rounded-[18px] border border-[#DCE7D1] object-cover"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-[18px] bg-[#EAF3E0] text-lg font-semibold text-[#3F4A3B]">
              {getCharityInitials(charity?.charity_name || "CH")}
            </div>
          )}

          <div className="min-w-0 flex-1">
            <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-[#7C8A72]">
              Charity Profile
            </p>
            <h3 className="mt-2 text-[1.25rem] font-semibold text-[#161721]">
              {charity?.charity_name || "Charity details"}
            </h3>
            <p className="mt-1 text-[13px] text-[#667164]">
              Review the currently saved charity information.
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="rounded-[18px] border border-[#E9EEE4] bg-white px-4 py-8 text-center text-sm text-[#667164]">
            Loading charity details...
          </div>
        ) : charity ? (
          <div className="space-y-3">
            <div className={detailRowClassName}>
              <span className="text-sm font-medium text-[#60705A]">Country</span>
              <span className="text-right text-sm text-[#161721]">
                {formatCountryLabel(charity.country)}
              </span>
            </div>

            <div className={detailRowClassName}>
              <span className="text-sm font-medium text-[#60705A]">Website</span>
              <a
                href={charity.url}
                target="_blank"
                rel="noreferrer"
                className="max-w-[60%] truncate text-right text-sm font-medium text-[#2F64FF] hover:underline"
              >
                {charity.url}
              </a>
            </div>

            <div className={detailRowClassName}>
              <span className="text-sm font-medium text-[#60705A]">Created</span>
              <span className="text-right text-sm text-[#161721]">
                {formatCharityDateTime(charity.created_at)}
              </span>
            </div>

            <div className={detailRowClassName}>
              <span className="text-sm font-medium text-[#60705A]">Last Updated</span>
              <span className="text-right text-sm text-[#161721]">
                {formatCharityDateTime(charity.updated_at)}
              </span>
            </div>

            <div className={detailRowClassName}>
              <span className="text-sm font-medium text-[#60705A]">Charity ID</span>
              <span className="max-w-[60%] truncate text-right font-mono text-sm text-[#161721]">
                {charity.id}
              </span>
            </div>
          </div>
        ) : (
          <div className="rounded-[18px] border border-[#F1D2D2] bg-[#FFF8F8] px-4 py-6 text-center text-sm text-[#B53636]">
            Charity details could not be loaded.
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 items-center justify-center rounded-[12px] border border-[#D7E3CC] bg-white px-5 text-sm font-medium text-[#3F4A3B] transition hover:bg-[#F6F9F2]"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}
