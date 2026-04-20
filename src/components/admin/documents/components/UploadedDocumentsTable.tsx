import { FileSearch } from "lucide-react";
import ReusableTable from "../../../tables/ReusableTable";
import { DocumentRecord } from "../documentTypes";
import DocumentStatusBadge from "./DocumentStatusBadge";

type UploadedDocumentsTableProps = {
    documents: DocumentRecord[];
    onOpenDocument?: (document: DocumentRecord) => void;
};

const tableHeader = ["Document", "Date", "Status", ""];

export default function UploadedDocumentsTable({
    documents,
    onOpenDocument,
}: UploadedDocumentsTableProps) {
    return (
        <section className="rounded-xl border border-[#E4E7EC] bg-white p-4">
            <div>
                <h3 className="text-base font-semibold text-[#101828]">
                    Uploaded Documents
                </h3>
                <p className="mt-1 text-xs text-[#101828]">
                    View full documents to approve or reject.
                </p>
            </div>

            <div className="mt-4 overflow-hidden rounded-lg border border-[#E4E7EC]">
                <ReusableTable<DocumentRecord>
                    tableHeader={tableHeader}
                    items={documents}
                    getRowKey={(document) => document.id}
                    minTableWidthPx={620}
                    wrapperClassName="rounded-none border-0 bg-transparent shadow-none"
                    tableClassName="w-full border-separate border-spacing-0"
                    tableBodyClassName="divide-y-0"
                    rowClassName="bg-white transition hover:bg-[#FCFCFD]"
                    headerCellClassName="border-b border-[#EAECF0] bg-[#F8FAFC] px-3 py-3 text-left text-xs font-medium text-[#667085] last:text-right"
                    bodyCellClassName="border-b border-[#EAECF0] px-3 py-4 align-middle text-sm text-[#101828] last:text-right"
                    emptyText="No uploaded documents found."
                    emptyCellClassName="block px-5 py-10 text-center text-sm text-[#667085]"
                    rowRenderers={[
                        (document) => (
                            <span className="block max-w-[260px] break-words">
                                {document.type}
                            </span>
                        ),
                        (document) => (
                            <span className="whitespace-nowrap text-[#344054]">
                                {document.date}
                            </span>
                        ),
                        (document) => <DocumentStatusBadge status={document.status} />,
                        (document) => (
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => onOpenDocument?.(document)}
                                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[#667085] transition hover:bg-[#F2F4F7] hover:text-[#344054]"
                                    aria-label={`View ${document.type}`}
                                >
                                    <FileSearch className="h-4 w-4" />
                                </button>
                            </div>
                        ),
                    ]}
                />
            </div>
        </section>
    );
}
