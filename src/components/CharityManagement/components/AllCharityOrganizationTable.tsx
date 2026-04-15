/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { getErrorMessage } from "@/src/lib/getErrorMessage";
import {
    useDeleteCharityMutation,
    useGetAllCharityQuery,
    useGetSingleCharityQuery,
    useUpdateCharityMutation,
} from "@/src/redux/features/admin/charity/charityManagement";
import type {
    CharityData,
    ICharityDetailsResponse,
    IUpdateCharityPayload,
} from "@/src/types/adminCharityTypes";
import { skipToken } from "@reduxjs/toolkit/query";
import { ReactNode, useEffect, useMemo, useState } from "react";
import SelectField from "../../ui/input/searchInput/SelectField";
import Pagination from "../../tables/Pagination";
import ReusableTable from "../../tables/ReusableTable";
import StatusNotice from "../../ui/StatusNotice";
import CharityDetailsModal from "./CharityDetailsModal";
import DeleteCharityModal from "./DeleteCharityModal";
import EditCharityModal from "./EditCharityModal";
import {
    CHARITY_FILTER_OPTIONS,
    DEFAULT_CHARITY_FILTER,
    type CharityFilterValue,
    formatCharityDate,
    formatCountryLabel,
    getCharityInitials,
} from "./charityUtils";
import Image from "next/image";

type BannerState =
    | {
        type: "success" | "error";
        text: string;
    }
    | null;

const PAGE_SIZE = 8;

const tableHeader = [
    "Charity Name",
    "Country/Region",
    "Visit Website",
    "Approved",
    "Action",
];

function FilterIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M4 5h16M7 12h10M10 19h4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
        </svg>
    );
}

function ExternalLinkIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M14 5h5v5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M10 14L19 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <path
                d="M19 14v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
}

const assertSuccessfulResponse = <
    T extends { success?: boolean; message?: string },
>(
    response: T | null | undefined,
    fallbackMessage: string,
) => {
    if (!response || response.success !== true) {
        throw new Error(response?.message || fallbackMessage);
    }

    return response;
};

export default function AllCharityOrganizationTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const [range, setRange] = useState<CharityFilterValue>(DEFAULT_CHARITY_FILTER);
    const [selectedCharityId, setSelectedCharityId] = useState<string | null>(null);
    const [activeModal, setActiveModal] = useState<
        "view" | "edit" | "delete" | null
    >(null);
    const [feedback, setFeedback] = useState<BannerState>(null);
    const [actionError, setActionError] = useState("");

    const {
        data: charityResponse,
        isLoading,
        isFetching,
        error,
    } = useGetAllCharityQuery({
        page: currentPage,
        limit: PAGE_SIZE,
        filter: range,
    });

    const {
        data: selectedCharityResponse,
        isFetching: isSelectedCharityFetching,
    } = useGetSingleCharityQuery(selectedCharityId ?? skipToken);

    const [updateCharity, { isLoading: isUpdating }] = useUpdateCharityMutation();
    const [deleteCharity, { isLoading: isDeleting }] = useDeleteCharityMutation();

    const charities = charityResponse?.success ? charityResponse.data : [];
    const selectedCharityFromList = useMemo(
        () => charities.find((charity) => charity.id === selectedCharityId) || null,
        [charities, selectedCharityId],
    );
    const selectedCharity = selectedCharityResponse?.data || selectedCharityFromList;

    useEffect(() => {
        if (charityResponse?.lastPage && currentPage > charityResponse.lastPage) {
            setCurrentPage(charityResponse.lastPage);
        }
    }, [charityResponse?.lastPage, currentPage]);

    const listErrorMessage =
        charityResponse && !charityResponse.success
            ? charityResponse.message || "Failed to load charities."
            : error
                ? getErrorMessage(error, "Failed to load charities.")
                : "";

    const openModal = (
        modal: "view" | "edit" | "delete",
        charity: CharityData,
    ) => {
        setSelectedCharityId(charity.id);
        setActiveModal(modal);
        setActionError("");
        setFeedback(null);
    };

    const closeModal = () => {
        setActiveModal(null);
        setSelectedCharityId(null);
        setActionError("");
    };

    const handlePageChange = (page: number) => {
        if (!charityResponse?.lastPage) {
            setCurrentPage(page);
            return;
        }

        setCurrentPage(Math.min(Math.max(page, 1), charityResponse.lastPage));
    };

    const handleUpdateCharity = async (payload: IUpdateCharityPayload) => {
        if (!selectedCharityId) {
            return;
        }

        setActionError("");

        try {
            const response = assertSuccessfulResponse<ICharityDetailsResponse>(
                await updateCharity({
                    id: selectedCharityId,
                    payload,
                }).unwrap(),
                "Failed to update the charity. Please try again.",
            );

            closeModal();
            setFeedback({
                type: "success",
                text: response.message || "Charity updated successfully.",
            });
        } catch (action) {
            setActionError(
                getErrorMessage(action, "Failed to update the charity. Please try again."),
            );
        }
    };

    const handleDeleteCharity = async () => {
        if (!selectedCharityId) {
            return;
        }

        setActionError("");

        try {
            const response = assertSuccessfulResponse(
                await deleteCharity(selectedCharityId).unwrap(),
                "Failed to delete the charity. Please try again.",
            );

            closeModal();
            setFeedback({
                type: "success",
                text: response.message || "Charity deleted successfully.",
            });

            if (charities.length === 1 && currentPage > 1) {
                setCurrentPage((prev) => prev - 1);
            }
        } catch (action) {
            setActionError(
                getErrorMessage(action, "Failed to delete the charity. Please try again."),
            );
        }
    };

    const rowRenderers: ((item: CharityData, index: number) => ReactNode)[] = [
        (item) => (
            <div className="flex min-w-0 items-center gap-3">
                {item.logo_url ? (
                    <Image
                        src={item?.logo_url}
                        alt={item.charity_name}
                        width={48}
                        height={48}
                        unoptimized
                        crossOrigin="anonymous"
                        className="h-12 w-12 rounded-[14px] border border-[#DCE7D1] object-cover"
                    />
                ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#EAF3E0] text-sm font-semibold text-[#3F4A3B]">
                        {getCharityInitials(item.charity_name)}
                    </div>
                )}

                <div className="min-w-0">
                    <p className="truncate text-[14px] font-medium text-[#161721]">
                        {item.charity_name}
                    </p>
                    <p className="mt-1 text-[12px] text-[#7D8577]">
                        Ref: {item.id.slice(-8)}
                    </p>
                </div>
            </div>
        ),
        (item) => (
            <span className="text-[14px] text-[#4F5949]">
                {formatCountryLabel(item.country)}
            </span>
        ),
        (item) => (
            <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-[14px] font-medium text-[#2F64FF] hover:underline"
            >
                Visit link <ExternalLinkIcon />
            </a>
        ),
        (item) => (
            <div>
                <p className="text-[14px] text-[#161721]">
                    {formatCharityDate(item.created_at)}
                </p>
                <p className="mt-1 text-[12px] text-[#7D8577]">
                    Updated {formatCharityDate(item.updated_at)}
                </p>
            </div>
        ),
        (item) => (
            <div className="flex flex-wrap items-center gap-2">
                <button
                    type="button"
                    onClick={() => openModal("view", item)}
                    className="inline-flex h-9 items-center justify-center rounded-[10px] border border-[#DCE7D1] bg-white px-3 text-[12px] font-medium text-[#3F4A3B] transition hover:bg-[#F5F8F1]"
                >
                    View
                </button>
                <button
                    type="button"
                    onClick={() => openModal("edit", item)}
                    className="inline-flex h-9 items-center justify-center rounded-[10px] bg-[#EEF5E7] px-3 text-[12px] font-medium text-[#3F4A3B] transition hover:opacity-90"
                >
                    Edit
                </button>
                <button
                    type="button"
                    onClick={() => openModal("delete", item)}
                    className="inline-flex h-9 items-center justify-center rounded-[10px] border border-[#F0D4D4] bg-[#FFF5F5] px-3 text-[12px] font-medium text-[#B53636] transition hover:bg-[#FFF0F0]"
                >
                    Delete
                </button>
            </div>
        ),
    ];

    return (
        <>
            <section className="w-full">
                <div className="mb-4 rounded-[18px] border border-[#ECF0E6] bg-[linear-gradient(180deg,#FCFDFB_0%,#F7FAF3_100%)] px-4 py-4 sm:px-5">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h3 className="text-[1rem] font-medium text-[#161721]">
                                See All Charity Organizations Assigned By You
                            </h3>
                            <div className="mt-2 flex flex-wrap items-center gap-2">
                                <span className="rounded-full bg-[#EAF3E0] px-3 py-1 text-[12px] font-medium text-[#3F4A3B]">
                                    {charityResponse?.total ?? 0} charities
                                </span>
                                {isFetching && charityResponse ? (
                                    <span className="rounded-full bg-white px-3 py-1 text-[12px] text-[#667164]">
                                        Refreshing list...
                                    </span>
                                ) : null}
                            </div>
                        </div>

                        <div className="w-full max-w-[230px]">
                            <div className="mb-2 inline-flex items-center gap-2 text-[12px] font-medium text-[#5C6756]">
                                <FilterIcon />
                                Filter by timeline
                            </div>
                            <SelectField
                                options={CHARITY_FILTER_OPTIONS}
                                placeholder="Last 1 Month"
                                value={range}
                                onChange={(value) => {
                                    setCurrentPage(1);
                                    setRange(value as CharityFilterValue);
                                }}
                                selectClassName="
                  h-11 !py-2 bg-[#E7F2DD] border-[#D7E7C8]
                  text-[#3F4A3B] focus:border-[#C3D4B3]
                "
                            />
                        </div>
                    </div>
                </div>

                {feedback ? (
                    <StatusNotice
                        variant={feedback.type}
                        title={
                            feedback.type === "success"
                                ? "Action Completed"
                                : "Action Failed"
                        }
                        message={feedback.text}
                        className="mb-4"
                    />
                ) : null}

                {listErrorMessage ? (
                    <StatusNotice
                        variant="error"
                        title="Unable To Load"
                        message={listErrorMessage}
                        className="mb-4"
                    />
                ) : null}

                <div className="w-full overflow-x-auto">
                    <ReusableTable<CharityData>
                        tableHeader={tableHeader}
                        items={charities}
                        rowRenderers={rowRenderers}
                        getRowKey={(row) => row.id}
                        minTableWidthPx={1180}
                        isLoading={isLoading && !charityResponse}
                        emptyText="No charities found for the selected filter."
                        wrapperClassName="
              rounded-none border-0 bg-transparent shadow-none
              [&_tbody_tr:nth-child(even)]:bg-[#FAFBF8]
              [&_tbody_tr:nth-child(odd)]:bg-white
            "
                        headerCellClassName="
              bg-[#3F4A3B] px-5 py-4 text-left
              text-[14px] font-medium text-white/90
              first:rounded-l-[6px] last:rounded-r-[6px]
            "
                        bodyCellClassName="
              px-5 py-5 text-left text-[14px] text-gray-600
              border-b border-black/5 align-middle
            "
                    />
                </div>

                <Pagination
                    currentPage={charityResponse?.page ?? currentPage}
                    totalPages={charityResponse?.lastPage ?? 1}
                    totalItems={charityResponse?.total ?? charities.length}
                    pageSize={charityResponse?.limit ?? PAGE_SIZE}
                    itemLabel="charities"
                    disabled={isFetching}
                    onPageChange={handlePageChange}
                />
            </section>

            <CharityDetailsModal
                isOpen={activeModal === "view"}
                onClose={closeModal}
                charity={selectedCharity}
                isLoading={isSelectedCharityFetching && !selectedCharity}
            />

            <EditCharityModal
                isOpen={activeModal === "edit"}
                onClose={closeModal}
                charity={selectedCharity}
                isLoading={isSelectedCharityFetching && !selectedCharity}
                isSubmitting={isUpdating}
                errorMessage={actionError}
                onSubmit={handleUpdateCharity}
            />

            <DeleteCharityModal
                isOpen={activeModal === "delete"}
                onClose={closeModal}
                charity={selectedCharity}
                isDeleting={isDeleting}
                errorMessage={actionError}
                onConfirm={handleDeleteCharity}
            />
        </>
    );
}
