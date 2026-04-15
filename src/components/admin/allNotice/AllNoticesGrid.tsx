"use client";

import Pagination from "@/src/components/tables/Pagination";
import StatusNotice from "@/src/components/ui/StatusNotice";
import { INotice, IPaginationMeta } from "@/src/types/noticeType";
import Image from "next/image";
import Link from "next/link";
import {
    getNoticeDisplayName,
    getNoticeInitials,
    getNoticeLocation,
    getNoticePublishedLabel,
} from "./noticeUtils";

type AllNoticesGridProps = {
    notices: INotice[];
    meta: IPaginationMeta;
    currentPage: number;
    isLoading: boolean;
    isFetching: boolean;
    errorMessage?: string | null;
    onPageChange: (page: number) => void;
    detailHrefBase?: string;
    getDetailHref?: (notice: INotice) => string;
    getEditHref?: (notice: INotice) => string;
    onDeleteNotice?: (notice: INotice) => void;
};

export default function AllNoticesGrid({
    notices,
    meta,
    currentPage,
    isLoading,
    isFetching,
    errorMessage,
    onPageChange,
    detailHrefBase = "/admin/dashboard/all-notices",
    getDetailHref,
    getEditHref,
    onDeleteNotice,
}: AllNoticesGridProps) {
    return (
        <div className="w-full">
            {errorMessage ? (
                <StatusNotice
                    variant="error"
                    title="Unable To Load Notices"
                    message={errorMessage}
                    className="mb-4"
                />
            ) : null}

            {isLoading && notices.length === 0 ? (
                <div className="rounded-[14px] border border-dashed border-[#D9E3D1] bg-[#F8FBF5] px-6 py-10 text-center text-[0.95rem] text-[#6B7280]">
                    Loading notices...
                </div>
            ) : notices.length === 0 ? (
                <div className="rounded-[14px] border border-dashed border-[#D9E3D1] bg-[#F8FBF5] px-6 py-10 text-center text-[0.95rem] text-[#6B7280]">
                    No notices found.
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5">
                    {notices.map((notice) => {
                        const detailHref = getDetailHref
                            ? getDetailHref(notice)
                            : `${detailHrefBase}/${notice.id}`;
                        const editHref = getEditHref?.(notice);
                        const showActions = Boolean(editHref || onDeleteNotice);

                        return (
                            <div key={notice.id}>
                                <Link href={detailHref}>
                                    <NoticeCard notice={notice} />
                                </Link>

                                {showActions ? (
                                    <div className="mt-3 grid grid-cols-3 gap-2">
                                        <Link
                                            href={detailHref}
                                            className="inline-flex h-10 items-center justify-center rounded-[10px] border border-[#D9E3D1] bg-white px-3 text-[12px] font-medium text-[#3F4A3B] transition hover:bg-[#F8FBF5]"
                                        >
                                            View
                                        </Link>

                                        {editHref ? (
                                            <Link
                                                href={editHref}
                                                className="inline-flex h-10 items-center justify-center rounded-[10px] border border-[#D9E3D1] bg-[#EEF5E7] px-3 text-[12px] font-medium text-[#3F4A3B] transition hover:opacity-90"
                                            >
                                                Edit
                                            </Link>
                                        ) : (
                                            <span />
                                        )}

                                        {onDeleteNotice ? (
                                            <button
                                                type="button"
                                                onClick={() => onDeleteNotice(notice)}
                                                className="inline-flex h-10 items-center justify-center rounded-[10px] border border-[#F2D4D4] bg-[#FFF6F6] px-3 text-[12px] font-medium text-[#B53636] transition hover:opacity-90"
                                            >
                                                Delete
                                            </button>
                                        ) : (
                                            <span />
                                        )}
                                    </div>
                                ) : null}
                            </div>
                        );
                    })}
                </div>
            )}

            <Pagination
                currentPage={currentPage}
                totalPages={meta.last_page}
                totalItems={meta.total}
                pageSize={meta.limit}
                itemLabel="notices"
                disabled={isFetching}
                onPageChange={onPageChange}
            />
        </div>
    );
}

function NoticeCard({ notice }: { notice: INotice }) {
    const imageAlt = getNoticeDisplayName(notice);

    return (
        <div className="w-full rounded-[14px] border border-[#ECF0E6] bg-white p-3 shadow-[0_12px_28px_rgba(29,31,44,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(29,31,44,0.08)] sm:p-3.5">
            <div className="relative aspect-square w-full overflow-hidden rounded-[18px] bg-[#EEF5E7]">
                {notice.image ? (
                    <Image
                        src={notice.image}
                        alt={imageAlt}
                        fill
                        crossOrigin="anonymous"
                        unoptimized
                        className="object-cover"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_top,_#F8FBF5,_#E4EDDB)]">
                        <span className="text-[1.75rem] font-semibold tracking-[0.12em] text-[#4B5A42]">
                            {getNoticeInitials(notice)}
                        </span>
                    </div>
                )}
            </div>

            <div className="mt-3 flex flex-col items-center gap-1 text-center">
                <p
                    className="text-[16px] font-semibold leading-[160%] text-[#1D1F2C] sm:text-[18px]"
                    title={imageAlt}
                >
                    {imageAlt}
                </p>
                <p
                    className="text-[12px] leading-[160%] text-[#777980]"
                    style={{ fontFamily: "var(--font-schibsted)" }}
                    title={getNoticeLocation(notice)}
                >
                    {getNoticeLocation(notice)}
                </p>
                <p
                    className="text-[12px] leading-[160%] text-[#1D1F2C]"
                    style={{ fontFamily: "var(--font-schibsted)" }}
                >
                    {getNoticePublishedLabel(notice)}
                </p>
            </div>
        </div>
    );
}
