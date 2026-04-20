"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import TopTabs, { TabItem } from "../../common/TopTabs";
import ReusablePagination from "../../tables/ReusablePagination";
import ReusableTable from "../../tables/ReusableTable";
import SearchInput from "../../ui/input/searchInput/SearchInput";
import SelectField, { SelectOption } from "../../ui/input/searchInput/SelectField";
import { useModal } from "@/src/hooks/useModal";
import { useTabsQueryState } from "@/src/lib/helper/useTabsQueryState";
import DocumentNameCell from "./components/DocumentNameCell";
import DocumentStatusBadge from "./components/DocumentStatusBadge";
import DocumentsActionMenu from "./components/DocumentsActionMenu";
import {
    getDocumentsByTab,
    PAGE_SIZE,
} from "./documentMockData";
import {
    DocumentRecord,
    SortValue,
    StatusFilterValue,
    TabKey,
} from "./documentTypes";
import OnboardingDocumentsModal from "./OnboardingDocumentsModal";

const tabs: TabItem<TabKey>[] = [
    { key: "carrier-documents", label: "Carrier Documents" },
    { key: "driver-onboarding", label: "Driver Onboarding" },
];

const tableHeader = ["Carrier", "Dispatcher", "Type", "Document", "Date", "Status", ""];

const statusFilterOptions: SelectOption[] = [
    { value: "all", label: "Status" },
    { value: "approved", label: "Approved" },
    { value: "pending", label: "Pending" },
    { value: "signed", label: "Signed" },
    { value: "pending_signature", label: "Pending Signature" },
    { value: "rejected", label: "Rejected" },
];

const sortOptions: SelectOption[] = [
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
];

type DocumentsTableProps = {
    items: DocumentRecord[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
    onPageChange: (page: number) => void;
    onViewDocument: (document: DocumentRecord) => void;
};

function DocumentsTable({
    items,
    currentPage,
    totalPages,
    totalItems,
    onPageChange,
    onViewDocument,
}: DocumentsTableProps) {
    return (
        <div className="overflow-hidden rounded-[12px] border border-[#E4E7EC] bg-white">
            <ReusableTable<DocumentRecord>
                tableHeader={tableHeader}
                items={items}
                getRowKey={(document) => document.id}
                minTableWidthPx={980}
                wrapperClassName="rounded-none border-0 bg-transparent shadow-none"
                tableClassName="w-full border-separate border-spacing-0"
                tableBodyClassName="divide-y-0"
                rowClassName="bg-white transition hover:bg-[#FCFCFD]"
                headerCellClassName="border-b border-[#EAECF0] bg-[#F8FAFC] px-4 py-3 text-left text-[13px] font-medium text-[#667085] last:text-right"
                bodyCellClassName="border-b border-[#EAECF0] px-4 py-4 align-middle text-[1rem] leading-5 text-[#101828] last:text-right"
                emptyText="No documents matched the current filters."
                emptyCellClassName="block px-5 py-16 text-center text-sm text-[#667085]"
                rowRenderers={[
                    (document) => (
                        <span className="block max-w-[150px] whitespace-normal font-medium">
                            {document.carrier}
                        </span>
                    ),
                    (document) => <span className="text-[#344054]">{document.dispatcher}</span>,
                    (document) => (
                        <span className="block max-w-[180px] whitespace-normal text-[#101828]">
                            {document.type}
                        </span>
                    ),
                    (document) => <DocumentNameCell name={document.document} />,
                    (document) => <span className="whitespace-nowrap text-[#344054]">{document.date}</span>,
                    (document) => <DocumentStatusBadge status={document.status} />,
                    (document) => (
                        <div className="flex justify-end">
                            <DocumentsActionMenu
                                document={document}
                                onView={onViewDocument}
                            />
                        </div>
                    ),
                ]}
            />

            <ReusablePagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                pageSize={PAGE_SIZE}
                onPageChange={onPageChange}
                itemLabel="results"
            />
        </div>
    );
}

export default function AdminDocumentsContainer() {
    const [tab, setTab] = useTabsQueryState<TabKey>("tab", "carrier-documents");
    const [query, setQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<StatusFilterValue>("all");
    const [sortOrder, setSortOrder] = useState<SortValue>("newest");
    const [page, setPage] = useState(1);
    const [selectedDocument, setSelectedDocument] = useState<DocumentRecord | null>(null);
    const { isOpen, openModal, closeModal } = useModal(false);
    const sourceDocuments = useMemo(() => getDocumentsByTab(tab), [tab]);

    const filteredDocuments = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();

        return sourceDocuments
            .filter((document) => {
                if (statusFilter === "all") {
                    return true;
                }

                return document.status.toLowerCase() === statusFilter;
            })
            .filter((document) => {
                if (!normalizedQuery) {
                    return true;
                }

                return [
                    document.carrier,
                    document.dispatcher,
                    document.type,
                    document.document,
                    document.date,
                    document.status,
                ]
                    .join(" ")
                    .toLowerCase()
                    .includes(normalizedQuery);
            })
            .sort((firstDocument, secondDocument) => {
                const firstDate = new Date(firstDocument.date).getTime();
                const secondDate = new Date(secondDocument.date).getTime();

                return sortOrder === "newest" ? secondDate - firstDate : firstDate - secondDate;
            });
    }, [query, sortOrder, sourceDocuments, statusFilter]);

    const totalPages = Math.max(Math.ceil(filteredDocuments.length / PAGE_SIZE), 1);
    const currentPage = Math.min(page, totalPages);
    const paginatedDocuments = filteredDocuments.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE,
    );

    const selectedUploadedDocuments = useMemo(() => {
        if (!selectedDocument) {
            return [];
        }

        const relatedDocuments = sourceDocuments.filter(
            (document) => document.carrier === selectedDocument.carrier,
        );

        return relatedDocuments.length > 0 ? relatedDocuments : [selectedDocument];
    }, [selectedDocument, sourceDocuments]);

    const handleTabChange = (nextTab: TabKey) => {
        setTab(nextTab);
        setPage(1);
    };

    const handleViewDocument = (document: DocumentRecord) => {
        setSelectedDocument(document);
        openModal();
    };

    const handleCloseModal = () => {
        closeModal();
        setSelectedDocument(null);
    };

    return (
        <>
            <section className="rounded-3xl border border-[#E4E7EC] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)] sm:p-5">
                <div className="space-y-4">
                    <div>
                        <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[#101828] sm:text-[1.75rem]">
                            All Documents
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_180px_160px]">
                        <SearchInput
                            value={query}
                            onChange={(event) => {
                                setQuery(event.target.value);
                                setPage(1);
                            }}
                            placeholder="Search..."
                            containerClassName="w-full"
                            inputClassName="h-12 rounded-xl border-[#D7DDE8] bg-[#F8FAFB] pl-11 pr-4 text-sm text-[#101828] shadow-none placeholder:text-[#98A2B3] focus:border-[#C9D3E0] focus:bg-white focus:ring-0"
                        />

                        <SelectField
                            options={statusFilterOptions}
                            value={statusFilter}
                            onChange={(value) => {
                                setStatusFilter(value as StatusFilterValue);
                                setPage(1);
                            }}
                            wrapperClassName="w-full"
                            selectClassName="h-12 rounded-xl border-[#D7DDE8] bg-[#F8FAFB] pl-4 pr-10 text-sm text-[#101828] shadow-none focus:border-[#C9D3E0] focus:bg-white focus:ring-0"
                        />

                        <SelectField
                            options={sortOptions}
                            value={sortOrder}
                            onChange={(value) => {
                                setSortOrder(value as SortValue);
                                setPage(1);
                            }}
                            wrapperClassName="w-full"
                            selectClassName="h-12 rounded-xl border-[#D7DDE8] bg-[#F8FAFB] pl-4 pr-10 text-sm text-[#101828] shadow-none focus:border-[#C9D3E0] focus:bg-white focus:ring-0"
                        />
                    </div>

                    <hr className="border-[#E4E7EC]" />

                    <div className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
                        <TopTabs
                            tabs={tabs}
                            activeKey={tab}
                            onChange={handleTabChange}
                            className="rounded-xl p-1 [&_button]:!rounded-lg [&_button]:!py-2.5 [&_button]:!text-xs sm:[&_button]:!text-sm"
                        />

                        <button
                            type="button"
                            onClick={() => console.log("Add Document")}
                            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-[0.9rem] bg-[#2E3A83] px-5 text-sm font-semibold text-white transition hover:bg-[#25306F] lg:w-auto"
                        >
                            <Plus className="h-5 w-5" />
                            Add New
                        </button>
                    </div>

                    <DocumentsTable
                        items={paginatedDocuments}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalItems={filteredDocuments.length}
                        onPageChange={setPage}
                        onViewDocument={handleViewDocument}
                    />
                </div>
            </section>

            <OnboardingDocumentsModal
                isOpen={isOpen}
                onClose={handleCloseModal}
                document={selectedDocument}
                uploadedDocuments={selectedUploadedDocuments}
                userType={tab === "driver-onboarding" ? "Driver" : "Dispatcher"}
            />
        </>
    );
}
