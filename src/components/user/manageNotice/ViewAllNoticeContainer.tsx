"use client";

import { useEffect, useMemo, useState } from "react";
import { getErrorMessage } from "@/src/lib/getErrorMessage";
import { useQueryState } from "@/src/lib/helper/useQueryState";
import { useModal } from "@/src/hooks/useModal";
import {
    useDeleteDirectorNoticeByIdMutation,
    useGetDirectorAllNoticeQuery,
} from "@/src/redux/features/undertaker/directorNotice";
import type { IDirectorNoticeListMeta, IAllNoticeData } from "@/src/types/undertaker/directorNoticeTypes";
import AllNoticesGrid from "../../admin/allNotice/AllNoticesGrid";
import AllNoticesListTable from "../../admin/allNotice/AllNoticesListTable";
import NoticesToolbar from "../../admin/allNotice/NoticesToolbar";
import { NOTICE_PAGE_SIZE } from "../../admin/allNotice/noticeUtils";
import type { INotice, IPaginationMeta } from "@/src/types/noticeType";
import StatusNotice from "../../ui/StatusNotice";
import DeleteDirectorNoticeModal from "./DeleteDirectorNoticeModal";

const DETAIL_HREF_BASE = "/user/dashboard/manage-notices";

const mapDirectorNoticeToNotice = (notice: IAllNoticeData): INotice => ({
    id: notice.id,
    first_name: notice.first_name,
    surname: notice.surname,
    nee: "",
    city: notice.city,
    town: notice.town,
    country: "",
    form: notice.created_at,
    to: notice.updated_at || notice.created_at,
    status: notice.status,
    image: notice.image || null,
    title: null,
    biography: null,
    service_type: "",
    reposing_location: "",
    reposing_address: "",
    reposing_date: "",
    reposing_start_time: "",
    reposing_end_time: "",
    funeral_location: "",
    funeral_address: "",
    funeral_date: "",
    funeral_start_time: "",
    funeral_end_time: "",
    charity_id: null,
    charity: null,
    condolance: null,
    created_at: notice.created_at,
    updated_at: notice.updated_at,
    total_donations: null,
});

const buildFallbackMeta = (
    meta: IDirectorNoticeListMeta | undefined,
    currentPage: number,
    noticesLength: number,
    total?: number,
    page?: number,
    limit?: number,
    lastPage?: number,
): IPaginationMeta => {
    if (meta) {
        return meta;
    }

    const resolvedLimit = limit ?? NOTICE_PAGE_SIZE;
    const resolvedTotal = total ?? noticesLength;
    const derivedLastPage = lastPage ?? Math.max(Math.ceil(resolvedTotal / resolvedLimit), 1);

    return {
        total: resolvedTotal,
        page: page ?? currentPage,
        last_page: derivedLastPage,
        limit: resolvedLimit,
    };
};

export default function ViewAllNoticeContainer({
    view,
    onAddNotice,
}: {
    view: string;
    onAddNotice?: () => void;
}) {
    const [pageParam, setPageParam] = useQueryState("page", "1");
    const { isOpen: isDeleteModalOpen, openModal: openDeleteModal, closeModal: closeDeleteModal } = useModal();
    const [selectedNotice, setSelectedNotice] = useState<INotice | null>(null);
    const [feedback, setFeedback] = useState<{
        variant: "success" | "error";
        title: string;
        message: string;
    } | null>(null);
    const parsedPage = Number(pageParam);
    const currentPage = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;

    const {
        data: noticesResponse,
        error,
        isError,
        isFetching,
        isLoading,
    } = useGetDirectorAllNoticeQuery({
        page: currentPage,
        limit: NOTICE_PAGE_SIZE,
    });
    const [deleteDirectorNoticeById, { isLoading: isDeleteLoading }] = useDeleteDirectorNoticeByIdMutation();

    const notices = useMemo(
        () => (noticesResponse?.data ?? []).map(mapDirectorNoticeToNotice),
        [noticesResponse?.data],
    );

    const meta = useMemo(
        () =>
            buildFallbackMeta(
                noticesResponse?.meta,
                currentPage,
                notices.length,
                noticesResponse?.total,
                noticesResponse?.page,
                noticesResponse?.limit,
                noticesResponse?.lastPage,
            ),
        [currentPage, notices.length, noticesResponse],
    );

    useEffect(() => {
        if (pageParam !== String(currentPage)) {
            setPageParam(String(currentPage));
        }
    }, [currentPage, pageParam, setPageParam]);

    useEffect(() => {
        if (meta.last_page > 0 && currentPage > meta.last_page) {
            setPageParam(String(meta.last_page));
        }
    }, [currentPage, meta.last_page, setPageParam]);

    const handlePageChange = (page: number) => {
        if (page < 1 || page === currentPage || page > meta.last_page) {
            return;
        }

        setPageParam(String(page));
    };

    const errorMessage = isError
        ? getErrorMessage(error, "Unable to load your notices right now. Please try again.")
        : null;

    const getDetailHref = (notice: INotice) => `/user/dashboard/manage-notices/${notice.id}?mode=view`;
    const getEditHref = (notice: INotice) => `/user/dashboard/manage-notices/${notice.id}?mode=edit`;

    const handleOpenDelete = (notice: INotice) => {
        setFeedback(null);
        setSelectedNotice(notice);
        openDeleteModal();
    };

    const handleDeleteNotice = async () => {
        if (!selectedNotice) {
            return;
        }

        try {
            const response = await deleteDirectorNoticeById({ id: selectedNotice.id }).unwrap();
            setFeedback({
                variant: "success",
                title: "Notice Deleted",
                message: response.message || "The notice has been deleted successfully.",
            });
            setSelectedNotice(null);
            closeDeleteModal();
        } catch (deleteError) {
            setFeedback({
                variant: "error",
                title: "Delete Failed",
                message: getErrorMessage(deleteError, "Failed to delete this notice. Please try again."),
            });
        }
    };

    return (
        <div className="space-y-4">
            {feedback ? (
                <StatusNotice
                    variant={feedback.variant}
                    title={feedback.title}
                    message={feedback.message}
                />
            ) : null}

            <NoticesToolbar
                type="undertaker"
                primaryLabel="Add Death Notice"
                onPrimaryClick={onAddNotice}
                title="View All Notices Posted By Funeral Houses"
            />

            {view === "grid" ? (
                <AllNoticesGrid
                    notices={notices}
                    meta={meta}
                    currentPage={currentPage}
                    isLoading={isLoading}
                    isFetching={isFetching}
                    errorMessage={errorMessage}
                    onPageChange={handlePageChange}
                    detailHrefBase={DETAIL_HREF_BASE}
                    getDetailHref={getDetailHref}
                    getEditHref={getEditHref}
                    onDeleteNotice={handleOpenDelete}
                />
            ) : (
                <AllNoticesListTable
                    notices={notices}
                    meta={meta}
                    currentPage={currentPage}
                    isLoading={isLoading}
                    isFetching={isFetching}
                    errorMessage={errorMessage}
                    onPageChange={handlePageChange}
                    detailHrefBase={DETAIL_HREF_BASE}
                    getDetailHref={getDetailHref}
                    getEditHref={getEditHref}
                    onDeleteNotice={handleOpenDelete}
                />
            )}

            <DeleteDirectorNoticeModal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    setSelectedNotice(null);
                    closeDeleteModal();
                }}
                notice={selectedNotice}
                isDeleting={isDeleteLoading}
                errorMessage={feedback?.variant === "error" ? feedback.message : ""}
                onConfirm={handleDeleteNotice}
            />
        </div>
    );
}
