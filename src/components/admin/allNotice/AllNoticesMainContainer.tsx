"use client";

import { useEffect } from "react";
import { getErrorMessage } from "@/src/lib/getErrorMessage";
import { useQueryState } from "@/src/lib/helper/useQueryState";
import { useGetAdminNoticesQuery } from "@/src/redux/features/admin/notice/noticeManagement";
import AllNoticesGrid from "./AllNoticesGrid";
import NoticesAndCondolenceShell from "./NoticesAndCondolenceShell";
import ViewCondolenceBook from "./ViewCondolenceBook";
import { NOTICE_PAGE_SIZE } from "./noticeUtils";
import AllNoticesListTable from "./AllNoticesListTable";
import { useSearchParams } from "next/navigation";

export default function AllNoticesMainContainer() {
    const [pageParam, setPageParam] = useQueryState("page", "1");
    const searchParams = useSearchParams()
    const parsedPage = Number(pageParam);
    const currentPage = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
    const condolenceId = searchParams.get('condolence_id');

    const {
        data: noticesResponse,
        error,
        isError,
        isFetching,
        isLoading,
    } = useGetAdminNoticesQuery({
        page: currentPage,
        limit: NOTICE_PAGE_SIZE,
    });

    const notices = noticesResponse?.data ?? [];
    const meta = noticesResponse?.meta ?? {
        total: 0,
        page: currentPage,
        last_page: Math.max(currentPage, 1),
        limit: NOTICE_PAGE_SIZE,
    };

    useEffect(() => {
        if (pageParam !== String(currentPage)) {
            setPageParam(String(currentPage));
        }
    }, [currentPage, pageParam, setPageParam]);

    useEffect(() => {
        if (noticesResponse?.meta.last_page && currentPage > noticesResponse.meta.last_page) {
            setPageParam(String(noticesResponse.meta.last_page));
        }
    }, [currentPage, noticesResponse, setPageParam]);

    const handlePageChange = (page: number) => {
        if (page < 1 || page === currentPage || page > meta.last_page) {
            return;
        }

        setPageParam(String(page));
    };

    const errorMessage = isError
        ? getErrorMessage(error, "Unable to load notices right now. Please try again.")
        : null;

    return (
        <div className="w-full space-y-6">
            <NoticesAndCondolenceShell
                noticesList={
                    <AllNoticesListTable
                        notices={notices}
                        meta={meta}
                        currentPage={currentPage}
                        isLoading={isLoading}
                        isFetching={isFetching}
                        errorMessage={errorMessage}
                        onPageChange={handlePageChange}
                    />
                }
                noticesGrid={
                    <AllNoticesGrid
                        notices={notices}
                        meta={meta}
                        currentPage={currentPage}
                        isLoading={isLoading}
                        isFetching={isFetching}
                        errorMessage={errorMessage}
                        onPageChange={handlePageChange}
                    />
                }
                condolencePage={<ViewCondolenceBook condolenceId={condolenceId} />}
            />
        </div>
    );
}
