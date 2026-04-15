"use client";

import Pagination from "@/src/components/tables/Pagination";
import StatusNotice from "@/src/components/ui/StatusNotice";
import { Skeleton } from "@/src/components/ui/skeleton";
import { getErrorMessage } from "@/src/lib/getErrorMessage";
import {
    useBlockCondolenceMessageByUserIdMutation,
    useDeleteCondolenceMessageMutation,
    useGetAdminNoticeCondolenceByIdQuery,
    useGetAllCondolenceMessageByCondolenceIdQuery,
} from "@/src/redux/features/admin/notice/noticeManagement";
import { ICondolenceBook, ICondolenceMessage } from "@/src/types/noticeType";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type BannerState =
    | {
        type: "success" | "error";
        text: string;
    }
    | null;

const COMMENT_PAGE_SIZE = 10;

const commentDateFormatter = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
});

const yearFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
});

function DotsIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm7 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM5 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                fill="currentColor"
            />
        </svg>
    );
}

function PrintIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M7 8V5.5C7 4.67 7.67 4 8.5 4h7C16.33 4 17 4.67 17 5.5V8"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
            />
            <path
                d="M7 17h10v3H7v-3Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
            />
            <path
                d="M6.5 10H17.5C18.88 10 20 11.12 20 12.5V15c0 1.1-.9 2-2 2h-1"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
            />
            <path
                d="M7 17H6c-1.1 0-2-.9-2-2v-2.5C4 11.12 5.12 10 6.5 10"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
            />
        </svg>
    );
}

function ShareIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M14 5h5v5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M10 14L19 5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
            />
            <path
                d="M19 14v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
            />
        </svg>
    );
}

const formatCommentDate = (value?: string | null) => {
    if (!value) {
        return "Comment date unavailable";
    }

    const parsedValue = new Date(value);

    if (Number.isNaN(parsedValue.getTime())) {
        return "Comment date unavailable";
    }

    return `Commented ${commentDateFormatter.format(parsedValue)}`;
};

const getBookTitle = (condolenceBook: ICondolenceBook) => {
    const { first_name, surname, nee } = condolenceBook.notice;
    const fullName = [first_name, surname].filter(Boolean).join(" ").trim();

    if (nee?.trim()) {
        return `${fullName} (nee ${nee.trim()})`;
    }

    return fullName || "Unnamed notice";
};

const getBookYears = (condolenceBook: ICondolenceBook) => {
    const fromYear = formatYear(condolenceBook.notice.form);
    const toYear = formatYear(condolenceBook.notice.to);

    if (fromYear && toYear) {
        return fromYear === toYear ? fromYear : `${fromYear}-${toYear}`;
    }

    return fromYear || toYear || "Years unavailable";
};

const formatYear = (value?: string | null) => {
    if (!value) {
        return null;
    }

    const parsedValue = new Date(value);

    if (Number.isNaN(parsedValue.getTime())) {
        return null;
    }

    return yearFormatter.format(parsedValue);
};

const getBookImage = (condolenceBook: ICondolenceBook) =>
    condolenceBook.condolance_image || condolenceBook.notice.image || "/images/condolence_img.png";

const getMessageName = (message: ICondolenceMessage) =>
    message.name?.trim() || "Anonymous user";

export default function ViewCondolenceBook({
    condolenceId,
}: {
    condolenceId: string | null;
}) {
    const [openId, setOpenId] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<BannerState>(null);
    const [actionMessageId, setActionMessageId] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const printAreaRef = useRef<HTMLDivElement | null>(null);

    const {
        data: condolenceResponse,
        error: condolenceError,
        isLoading: isCondolenceLoading,
    } = useGetAdminNoticeCondolenceByIdQuery(condolenceId || "", {
        skip: !condolenceId,
    });

    const {
        data: messagesResponse,
        error: messagesError,
        isLoading: isMessagesLoading,
        isFetching: isMessagesFetching,
    } = useGetAllCondolenceMessageByCondolenceIdQuery(
        condolenceId
            ? {
                id: condolenceId,
                page: currentPage,
                limit: COMMENT_PAGE_SIZE,
            }
            : "",
        {
            skip: !condolenceId,
        },
    );

    const [deleteCondolenceMessage, { isLoading: isDeleting }] =
        useDeleteCondolenceMessageMutation();
    const [blockCondolenceMessageByUserId, { isLoading: isBlocking }] =
        useBlockCondolenceMessageByUserIdMutation();

    const condolenceBook =
        condolenceResponse?.success === true ? condolenceResponse.data : null;
    const comments =
        messagesResponse?.success === true ? messagesResponse.data : [];
    const messageMeta = messagesResponse?.meta ?? {
        total: comments.length,
        page: currentPage,
        last_page: 1,
        limit: COMMENT_PAGE_SIZE,
    };

    const condolenceErrorMessage =
        condolenceResponse && condolenceResponse.success !== true
            ? condolenceResponse.message || "Failed to load the condolence book."
            : condolenceError
                ? getErrorMessage(
                    condolenceError,
                    "Failed to load the condolence book.",
                )
                : "";

    const commentsErrorMessage =
        messagesResponse && messagesResponse.success !== true
            ? messagesResponse.message || "Failed to load condolence messages."
            : messagesError
                ? getErrorMessage(
                    messagesError,
                    "Failed to load condolence messages.",
                )
                : "";

    useEffect(() => {
        const cleanup = () => document.body.classList.remove("print-mode");
        window.addEventListener("afterprint", cleanup);
        return () => window.removeEventListener("afterprint", cleanup);
    }, []);

    useEffect(() => {
        const onDown = (event: MouseEvent) => {
            if (!menuRef.current) return;
            if (!menuRef.current.contains(event.target as Node)) setOpenId(null);
        };

        document.addEventListener("mousedown", onDown);
        return () => document.removeEventListener("mousedown", onDown);
    }, []);

    useEffect(() => {
        setOpenId(null);
        setFeedback(null);
        setCurrentPage(1);
    }, [condolenceId]);

    useEffect(() => {
        if (
            messagesResponse?.meta.last_page &&
            currentPage > messagesResponse.meta.last_page
        ) {
            setCurrentPage(messagesResponse.meta.last_page);
        }
    }, [currentPage, messagesResponse]);

    const handlePrint = () => {
        if (!printAreaRef.current) return;

        document.body.classList.add("print-mode");
        window.print();
    };

    const handleShare = async () => {
        try {
            const shareUrl = window.location.href;

            if (navigator.share) {
                await navigator.share({
                    title: "Condolence Book",
                    url: shareUrl,
                });
            } else if (navigator.clipboard) {
                await navigator.clipboard.writeText(shareUrl);
            } else {
                throw new Error("Sharing is not supported on this browser.");
            }

            setFeedback({
                type: "success",
                text: "Condolence book link shared successfully.",
            });
        } catch (error) {
            if (error instanceof Error && error.name === "AbortError") {
                return;
            }

            setFeedback({
                type: "error",
                text: getErrorMessage(
                    error,
                    "Unable to share the condolence book link.",
                ),
            });
        }
    };

    const handleDeleteComment = async (comment: ICondolenceMessage) => {
        if (!window.confirm("Delete this condolence message?")) {
            return;
        }

        setActionMessageId(comment.id);
        setFeedback(null);

        try {
            const response = await deleteCondolenceMessage({
                message_id: comment.id,
            }).unwrap();

            if (response.success !== true) {
                throw new Error(
                    response.message || "Failed to delete the condolence message.",
                );
            }

            setOpenId(null);
            setFeedback({
                type: "success",
                text: response.message || "Condolence message deleted successfully.",
            });

            if (comments.length === 1 && currentPage > 1) {
                setCurrentPage((prev) => prev - 1);
            }
        } catch (error) {
            setFeedback({
                type: "error",
                text: getErrorMessage(
                    error,
                    "Failed to delete the condolence message. Please try again.",
                ),
            });
        } finally {
            setActionMessageId(null);
        }
    };

    const handleBlockUser = async (comment: ICondolenceMessage) => {
        if (
            !window.confirm(
                `Block ${getMessageName(comment)} from sending condolence messages?`,
            )
        ) {
            return;
        }

        setActionMessageId(comment.id);
        setFeedback(null);

        try {
            const response = await blockCondolenceMessageByUserId({
                user_id: comment.user_id,
            }).unwrap();

            if (response.success !== true) {
                throw new Error(response.message || "Failed to block this user.");
            }

            setOpenId(null);
            setFeedback({
                type: "success",
                text: response.message || "User blocked successfully.",
            });
        } catch (error) {
            setFeedback({
                type: "error",
                text: getErrorMessage(
                    error,
                    "Failed to block the user. Please try again.",
                ),
            });
        } finally {
            setActionMessageId(null);
        }
    };

    if (!condolenceId) {
        return (
            <StatusNotice
                variant="error"
                title="Select A Condolence Book"
                message="Open a notice and choose View Condolence Book to load a specific condolence book."
            />
        );
    }

    if (isCondolenceLoading && !condolenceBook) {
        return <CondolenceBookSkeleton />;
    }

    if (condolenceErrorMessage) {
        return (
            <StatusNotice
                variant="error"
                title="Unable To Load Condolence Book"
                message={condolenceErrorMessage}
            />
        );
    }

    if (!condolenceBook) {
        return (
            <StatusNotice
                variant="error"
                title="Condolence Book Not Found"
                message="We could not find a condolence book for this notice."
            />
        );
    }

    const bookTitle = getBookTitle(condolenceBook);
    const bookYears = getBookYears(condolenceBook);
    const isActionPending = isDeleting || isBlocking;
    const showPagination =
        !commentsErrorMessage &&
        !isMessagesLoading &&
        (messageMeta.total > 0 || messageMeta.last_page > 1);

    return (
        <div className="space-y-4">
            {feedback ? (
                <StatusNotice
                    variant={feedback.type}
                    title={feedback.type === "success" ? "Success" : "Action Failed"}
                    message={feedback.text}
                />
            ) : null}

            <section
                className="
        w-full
        flex flex-col lg:flex-row
        p-6
        gap-[1.375rem]
        rounded-[0.75rem]
        border border-[#E9E9EA]
        bg-white
      "
            >
                <div className="w-full lg:flex-1">
                    <div className="w-full ">
                        <div
                            className="
              relative
              w-full
              rounded-[0.75rem]
              border border-[#C3D4B3]
              border-b-[8px]
              overflow-hidden
              bg-[#F4F6F3]
            "
                        >
                            <div className="absolute inset-0 opacity-25">
                                <Image
                                    src="/images/condolence_bg.jpg"
                                    alt="Background"
                                    fill
                                    className="object-cover"
                                    priority={false}
                                />
                            </div>

                            <div className="absolute right-4 top-4 z-10 flex items-center gap-2 text-[#6D7A66]">
                                <button
                                    type="button"
                                    onClick={handlePrint}
                                    className="h-9 w-9 rounded-lg hover:bg-black/5 grid place-items-center"
                                    aria-label="Print"
                                >
                                    <PrintIcon />
                                </button>
                                <button
                                    type="button"
                                    onClick={handleShare}
                                    className="h-9 w-9 rounded-lg hover:bg-black/5 grid place-items-center"
                                    aria-label="Share"
                                >
                                    <ShareIcon />
                                </button>
                            </div>

                            <div
                                ref={printAreaRef}
                                className="relative flex flex-col items-center gap-5 px-6 py-8 sm:py-10"
                            >
                                <div className="w-full max-w-[420px]">
                                    <div className="relative w-full aspect-[1/1] rounded-[14px] overflow-hidden">
                                        <Image
                                            src={getBookImage(condolenceBook)}
                                            alt={bookTitle}
                                            fill
                                            crossOrigin="anonymous"
                                            unoptimized
                                            className="object-contain"
                                            priority={false}
                                        />
                                    </div>
                                </div>

                                <div className="text-center">
                                    <p className="text-[12px] text-gray-600">
                                        Condolence Book for
                                    </p>

                                    <h2
                                        className="mt-1 text-[#4B5A42] font-medium leading-tight"
                                        style={{ fontFamily: "var(--font-domine)", fontSize: "1.75rem" }}
                                    >
                                        {bookTitle}
                                    </h2>

                                    <p className="mt-2 text-[12px] text-gray-700">
                                        {bookYears}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <aside
                    className="
          w-full
          lg:flex-1
          flex flex-col
          p-6
          gap-6
          rounded-[0.75rem]
          border border-[#E9E9EA]
          bg-white
        "
                >
                    <div className="flex items-center justify-between gap-3">
                        <h3 className="text-[1.625rem] font-medium text-[#4B5A42]">
                            All Comments ({messageMeta.total})
                        </h3>
                    </div>

                    {commentsErrorMessage ? (
                        <StatusNotice
                            variant="error"
                            title="Unable To Load Comments"
                            message={commentsErrorMessage}
                        />
                    ) : null}

                    <div className="flex flex-col gap-5 overflow-y-auto pr-1 max-h-[min(520px,60vh)]">
                        {isMessagesLoading && comments.length === 0 ? (
                            <CommentListSkeleton />
                        ) : comments.length === 0 ? (
                            <div className="rounded-[12px] border border-dashed border-[#D9E3D1] bg-[#F8FBF5] px-5 py-8 text-center text-[0.95rem] text-[#6B7280]">
                                No condolence messages found.
                            </div>
                        ) : (
                            comments.map((comment) => {
                                const isDeletingCurrent =
                                    actionMessageId === comment.id && isDeleting;
                                const isBlockingCurrent =
                                    actionMessageId === comment.id && isBlocking;

                                return (
                                    <div
                                        key={comment.id}
                                        className="border-b border-black/5 pb-4 last:border-b-0 last:pb-0"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                <p className="text-[1.125rem] font-semibold text-[#1D1F2C]">
                                                    {getMessageName(comment)}
                                                </p>
                                                <p className="text-[11px] text-gray-400">
                                                    {formatCommentDate(comment.created_at)}
                                                </p>
                                            </div>

                                            <div className="relative" ref={openId === comment.id ? menuRef : null}>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setOpenId((value) =>
                                                            value === comment.id
                                                                ? null
                                                                : comment.id,
                                                        )
                                                    }
                                                    className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-700 hover:bg-gray-100"
                                                    aria-label="Comment actions"
                                                    disabled={isActionPending}
                                                >
                                                    <DotsIcon />
                                                </button>

                                                {openId === comment.id ? (
                                                    <div
                                                        className="
                        absolute right-0 top-9 z-[100]
                        w-[170px]
                        rounded-lg border border-[#E9E9EA] bg-white
                        shadow-[0_11px_30px_rgba(0,0,0,0.16)]
                        overflow-hidden
                      "
                                                    >
                                                        <button
                                                            type="button"
                                                            onClick={() => handleDeleteComment(comment)}
                                                            disabled={isActionPending}
                                                            className="w-full text-left px-4 py-2 text-[12px] text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                                                        >
                                                            {isDeletingCurrent ? "Deleting..." : "Delete Comment"}
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleBlockUser(comment)}
                                                            disabled={isActionPending}
                                                            className="w-full text-left px-4 py-2 text-[12px] text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                                                        >
                                                            {isBlockingCurrent ? "Blocking..." : "Block User"}
                                                        </button>
                                                    </div>
                                                ) : null}
                                            </div>
                                        </div>

                                        <p className="mt-2 text-[1rem] leading-5 text-[#777980]">
                                            {comment.message}
                                        </p>
                                        <p className="mt-3 text-[11px] text-gray-400">
                                            User Ref: {comment.user_id.slice(-8)}
                                        </p>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    {showPagination ? (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={messageMeta.last_page}
                            totalItems={messageMeta.total}
                            pageSize={messageMeta.limit}
                            itemLabel="comments"
                            disabled={isMessagesFetching || isActionPending}
                            onPageChange={setCurrentPage}
                            className="border-[#E9E9EA] pt-5"
                        />
                    ) : null}
                </aside>
            </section>
        </div>
    );
}

function CondolenceBookSkeleton() {
    return (
        <section className="w-full flex flex-col lg:flex-row p-6 gap-[1.375rem] rounded-[0.75rem] border border-[#E9E9EA] bg-white">
            <div className="w-full lg:flex-1">
                <div className="rounded-[0.75rem] border border-[#C3D4B3] border-b-[8px] bg-[#F4F6F3] px-6 py-8">
                    <div className="flex flex-col items-center gap-5">
                        <Skeleton className="h-[320px] w-full max-w-[420px] rounded-[14px] bg-[#E8EEE1]" />
                        <div className="flex w-full max-w-[280px] flex-col items-center gap-2">
                            <Skeleton className="h-4 w-28 bg-[#E1E8D8]" />
                            <Skeleton className="h-8 w-full bg-[#DCE5D1]" />
                            <Skeleton className="h-4 w-24 bg-[#E1E8D8]" />
                        </div>
                    </div>
                </div>
            </div>

            <aside className="w-full lg:flex-1 rounded-[0.75rem] border border-[#E9E9EA] bg-white p-6">
                <Skeleton className="h-8 w-40 bg-[#E1E8D8]" />
                <div className="mt-6 space-y-5">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="border-b border-black/5 pb-4">
                            <div className="flex items-start justify-between gap-3">
                                <div className="space-y-2">
                                    <Skeleton className="h-5 w-40 bg-[#E8EEE1]" />
                                    <Skeleton className="h-3 w-24 bg-[#F0F4EB]" />
                                </div>
                                <Skeleton className="h-8 w-8 rounded-md bg-[#F0F4EB]" />
                            </div>
                            <div className="mt-3 space-y-2">
                                <Skeleton className="h-4 w-full bg-[#F0F4EB]" />
                                <Skeleton className="h-4 w-[90%] bg-[#F0F4EB]" />
                            </div>
                        </div>
                    ))}
                </div>
            </aside>
        </section>
    );
}

function CommentListSkeleton() {
    return (
        <div className="space-y-5">
            {[1, 2, 3].map((item) => (
                <div key={item} className="border-b border-black/5 pb-4">
                    <div className="flex items-start justify-between gap-3">
                        <div className="space-y-2">
                            <Skeleton className="h-5 w-40 bg-[#E8EEE1]" />
                            <Skeleton className="h-3 w-24 bg-[#F0F4EB]" />
                        </div>
                        <Skeleton className="h-8 w-8 rounded-md bg-[#F0F4EB]" />
                    </div>
                    <div className="mt-3 space-y-2">
                        <Skeleton className="h-4 w-full bg-[#F0F4EB]" />
                        <Skeleton className="h-4 w-[92%] bg-[#F0F4EB]" />
                    </div>
                </div>
            ))}
        </div>
    );
}
