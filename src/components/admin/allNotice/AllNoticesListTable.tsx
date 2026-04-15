/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import Pagination from "@/src/components/tables/Pagination";
import StatusNotice from "@/src/components/ui/StatusNotice";
import { INotice, IPaginationMeta } from "@/src/types/noticeType";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
    formatNoticeDate,
    getNoticeDisplayName,
    getNoticeRegion,
} from "./noticeUtils";

type AllNoticesListTableProps = {
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

function DotsIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
                d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm7 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM5 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                fill="currentColor"
            />
        </svg>
    );
}

export default function AllNoticesListTable({
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
}: AllNoticesListTableProps) {
    const [openId, setOpenId] = useState<string | null>(null);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter();

    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            if (!menuRef.current) return;
            if (!menuRef.current.contains(e.target as Node)) setOpenId(null);
        };
        document.addEventListener("mousedown", onClick);
        return () => document.removeEventListener("mousedown", onClick);
    }, []);

    useEffect(() => {
        setOpenId(null);
    }, [notices]);

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

            <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[820px] border-separate border-spacing-0">
                    <thead>
                        <tr className="bg-[#3F4A3B]">
                            {["Deceased Person", "Town", "Country / Region", "Date Published", "Action"].map((header) => (
                                <th
                                    key={header}
                                    className="px-4 py-3 text-left text-[1rem] font-medium text-white first:rounded-l-[6px] last:rounded-r-[6px]"
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {isLoading && notices.length === 0 ? (
                            <tr className="bg-white">
                                <td colSpan={5} className="px-4 py-10 text-center text-[0.95rem] text-[#6B7280]">
                                    Loading notices...
                                </td>
                            </tr>
                        ) : notices.length === 0 ? (
                            <tr className="bg-white">
                                <td colSpan={5} className="px-4 py-10 text-center text-[0.95rem] text-[#6B7280]">
                                    No notices found.
                                </td>
                            </tr>
                        ) : (
                            notices.map((notice, index) => {
                                const detailHref = getDetailHref
                                    ? getDetailHref(notice)
                                    : `${detailHrefBase}/${notice.id}`;
                                const editHref = getEditHref?.(notice);

                                return (
                                    <tr key={notice.id} className={index % 2 ? "bg-[#FAFAFA]" : "bg-white"}>
                                        <td className="px-4 py-4 text-[1rem] text-[#4A4C56]">
                                            {getNoticeDisplayName(notice)}
                                        </td>
                                        <td className="px-4 py-4 text-[1rem] text-[#4A4C56]">{notice.town || "-"}</td>
                                        <td className="px-4 py-4 text-[1rem] text-[#4A4C56]">
                                            {getNoticeRegion(notice)}
                                        </td>
                                        <td className="px-4 py-4 text-[1rem] text-[#4A4C56]">
                                            {formatNoticeDate(notice.created_at || notice.form || notice.to)}
                                        </td>

                                        <td className="relative px-4 py-4">
                                            <button
                                                type="button"
                                                onClick={() => setOpenId((value) => (value === notice.id ? null : notice.id))}
                                                className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-700 transition hover:bg-gray-100"
                                                aria-label="Actions"
                                            >
                                                <DotsIcon />
                                            </button>

                                            {openId === notice.id ? (
                                                <div
                                                    ref={menuRef}
                                                    className="absolute right-6 top-[52px] z-[50] w-[160px] rounded-lg border border-[#E9E9EA] bg-white shadow-[0_11px_30px_rgba(0,0,0,0.16)]"
                                                >
                                                    <button
                                                        onClick={() => router.push(detailHref)}
                                                        className="w-full px-4 py-2 text-left text-[12px] text-gray-700 hover:bg-gray-50"
                                                    >
                                                        View
                                                    </button>

                                                    {editHref ? (
                                                        <button
                                                            onClick={() => router.push(editHref)}
                                                            className="w-full px-4 py-2 text-left text-[12px] text-gray-700 hover:bg-gray-50"
                                                        >
                                                            Edit
                                                        </button>
                                                    ) : null}

                                                    {onDeleteNotice ? (
                                                        <button
                                                            onClick={() => {
                                                                setOpenId(null);
                                                                onDeleteNotice(notice);
                                                            }}
                                                            className="w-full px-4 py-2 text-left text-[12px] text-[#B53636] hover:bg-[#FFF5F5]"
                                                        >
                                                            Delete
                                                        </button>
                                                    ) : null}
                                                </div>
                                            ) : null}
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

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
