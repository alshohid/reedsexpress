import type { TabItem } from "@/src/components/common/TopTabs";
import AdminDocumentsContainer from "@/src/components/admin/documents/AdminDocumentsContainer";
import {
  dispatcherDocumentColumns,
  dispatcherDocumentsByTab,
} from "@/src/components/admin/documents/documentMockData";
import type { TabKey } from "@/src/components/admin/documents/documentTypes";

const dispatcherDocumentTabs: TabItem<TabKey>[] = [
  { key: "load-documents", label: "Load Documents" },
  { key: "carrier-documents", label: "Carrier Documents" },
];

export default function DispatcherDocumentsPage() {
  return (
    <AdminDocumentsContainer
      tabs={dispatcherDocumentTabs}
      defaultTab="load-documents"
      documentsByTab={dispatcherDocumentsByTab}
      columns={dispatcherDocumentColumns}
      minTableWidthPx={860}
    />
  );
}
