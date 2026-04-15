import { INotice } from "@/src/types/noticeType";

export const NOTICE_PAGE_SIZE = 10;

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "2-digit",
  year: "2-digit",
});

export const formatNoticeDate = (value?: string | null) => {
  if (!value) {
    return "-";
  }

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return "-";
  }

  return dateFormatter.format(parsedDate);
};

export const getNoticeDisplayName = (notice: INotice) => {
  const primaryName = [notice.surname, notice.first_name]
    .map((value) => value?.trim())
    .filter(Boolean)
    .join(", ");

  if (notice.nee?.trim()) {
    return `${primaryName} (nee ${notice.nee.trim()})`;
  }

  return primaryName || "Unnamed notice";
};

export const getNoticeLocation = (notice: INotice) =>
  [notice.town, notice.country].filter(Boolean).join(", ") || "Location unavailable";

export const getNoticeRegion = (notice: INotice) =>
  [notice.country, notice.city].filter(Boolean).join(" / ") || "-";

export const getNoticePublishedLabel = (notice: INotice) => {
  const publishedDate = formatNoticeDate(notice.created_at || notice.form || notice.to);

  return publishedDate === "-"
    ? "Published date unavailable"
    : `Published ${publishedDate}`;
};

export const getNoticeInitials = (notice: INotice) => {
  const initials = [notice.first_name, notice.surname]
    .map((value) => value?.trim()?.charAt(0)?.toUpperCase())
    .filter(Boolean)
    .slice(0, 2)
    .join("");

  return initials || "NA";
};
