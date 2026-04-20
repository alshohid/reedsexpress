export type TabKey = "carrier-documents" | "driver-onboarding";
export type DocumentStatus = "Approved" | "Pending" | "Rejected";
export type StatusFilterValue = "all" | "approved" | "pending" | "rejected";
export type SortValue = "newest" | "oldest";

export type DocumentRecord = {
    id: string;
    carrier: string;
    dispatcher: string;
    type: string;
    document: string;
    date: string;
    status: DocumentStatus;
};

export type UserInformationItem = {
    label: string;
    value: string;
};

export type RequestDocumentItem = {
    id: string;
    label: string;
    required?: boolean;
    selected?: boolean;
};
