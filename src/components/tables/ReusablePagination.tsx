"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

type ReusablePaginationProps = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  itemLabel?: string;
  className?: string;
};

function getVisiblePages(totalPages: number, currentPage: number) {
  if (totalPages <= 3) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 2) {
    return [1, 2, 3];
  }

  if (currentPage >= totalPages - 1) {
    return [totalPages - 2, totalPages - 1, totalPages];
  }

  return [currentPage - 1, currentPage, currentPage + 1];
}

export default function ReusablePagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  itemLabel = "results",
  className = "",
}: ReusablePaginationProps) {
  const safeTotalPages = Math.max(totalPages, 1);
  const safeCurrentPage = Math.min(Math.max(currentPage, 1), safeTotalPages);
  const startIndex = totalItems === 0 ? 0 : (safeCurrentPage - 1) * pageSize + 1;
  const endIndex = Math.min(safeCurrentPage * pageSize, totalItems);
  const visiblePages = getVisiblePages(safeTotalPages, safeCurrentPage);

  return (
    <div
      className={`flex flex-col gap-4 border-t border-[#E5EAF7] bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between ${className}`}
    >
      <p className="text-sm text-[#667085]">
        Showing {startIndex} to {endIndex} of {totalItems} {itemLabel}
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, safeCurrentPage - 1))}
          className="inline-flex h-9 min-w-9 items-center justify-center rounded-xl border border-[#D7DDF2] px-3 text-sm font-medium text-[#344054] transition hover:bg-[#F7F8FE] disabled:cursor-not-allowed disabled:opacity-50"
          disabled={safeCurrentPage === 1}
        >
          <ChevronLeft size={16} />
        </button>

        {visiblePages.map((pageNumber) => (
          <button
            key={pageNumber}
            type="button"
            onClick={() => onPageChange(pageNumber)}
            className={[
              "inline-flex h-9 min-w-9 items-center justify-center rounded-xl border px-3 text-sm font-medium transition",
              pageNumber === safeCurrentPage
                ? "border-[#2E3A83] bg-[#2E3A83] text-white"
                : "border-[#D7DDF2] text-[#344054] hover:bg-[#F7F8FE]",
            ].join(" ")}
          >
            {pageNumber}
          </button>
        ))}

        <button
          type="button"
          onClick={() => onPageChange(Math.min(safeTotalPages, safeCurrentPage + 1))}
          className="inline-flex h-9 min-w-9 items-center justify-center rounded-xl border border-[#D7DDF2] px-3 text-sm font-medium text-[#344054] transition hover:bg-[#F7F8FE] disabled:cursor-not-allowed disabled:opacity-50"
          disabled={safeCurrentPage === safeTotalPages}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
