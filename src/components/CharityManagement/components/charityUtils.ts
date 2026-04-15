"use client";

import type { SelectOption } from "../../ui/input/searchInput/SelectField";

export type CharityFilterValue = "" | "today" | "7days" | "1month" | "1year";

export const DEFAULT_CHARITY_FILTER: CharityFilterValue = "";

export const CHARITY_FILTER_OPTIONS: SelectOption[] = [
  { label: "All", value: "" },
  { label: "Today", value: "today" },
  { label: "Last 7 Days", value: "7days" },
  { label: "Last 1 Month", value: "1month" },
  { label: "Last 1 Year", value: "1year" },
];

export const BASE_COUNTRY_OPTIONS: SelectOption[] = [
  { label: "United Kingdom", value: "united-kingdom" },
  // { label: "Ireland", value: "ireland" },
  // { label: "France", value: "france" },
  // { label: "Spain", value: "spain" },
  // { label: "Germany", value: "germany" },
  // { label: "United States", value: "united-states" },
];

export const validateCharityUrl = (value: string) => {
  try {
    const parsedUrl = new URL(value);
    return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
  } catch {
    return false;
  }
};

export const formatCountryLabel = (value: string) =>
  value
    .split("-")
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");

export const getCountryOptions = (selectedCountry?: string): SelectOption[] => {
  if (
    !selectedCountry ||
    BASE_COUNTRY_OPTIONS.some((option) => option.value === selectedCountry)
  ) {
    return BASE_COUNTRY_OPTIONS;
  }

  return [
    ...BASE_COUNTRY_OPTIONS,
    {
      label: formatCountryLabel(selectedCountry),
      value: selectedCountry,
    },
  ];
};

export const formatCharityDate = (value?: string) => {
  if (!value) {
    return "N/A";
  }

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return "N/A";
  }

  return parsedDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const formatCharityDateTime = (value?: string) => {
  if (!value) {
    return "N/A";
  }

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return "N/A";
  }

  return parsedDate.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

export const getCharityInitials = (value: string) =>
  value
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((segment) => segment.charAt(0).toUpperCase())
    .join("");
