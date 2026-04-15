"use client"
import { useTabsQueryState } from "@/src/lib/helper/useTabsQueryState";
import TopTabs, { TabItem } from "../common/TopTabs";
import AllFundingTableContainer from "./AllFundingTableContainer";
import AllDonationTable from "./AllDonationTable";
import { useModal } from "@/src/hooks/useModal";
import DonationDetailsModal from "./DonationDetailsModal";
import SubscriptionSection from "./SubscriptionSection";



type TabKey = "all-donation" | "see-all-donation" | "subscription";
const tabs: TabItem<TabKey>[] = [
    { key: "all-donation", label: "All Donation" },
    { key: "see-all-donation", label: "See All Donation" },
    { key: "subscription", label: "Subscription" }

];

export default function FinancialManagementContainer() {
    const [tab, setTab] = useTabsQueryState<TabKey>("tab", "all-donation");
    const { isOpen: isDonationDetailsModalOpen, openModal: openDonationDetailsModal, closeModal: closeDonationDetailsModal } = useModal()

    return (
        <div className="w-full space-y-4">
            <div>
                <TopTabs tabs={tabs} activeKey={tab} onChange={setTab} />

            </div>
            {tab === "all-donation" && (
                <AllFundingTableContainer />

            )}
            {tab === "see-all-donation" && (
                <AllDonationTable openViewModal={() => openDonationDetailsModal()} />
            )}
            {tab === "subscription" && (
                <SubscriptionSection />
            )}
            <DonationDetailsModal isOpen={isDonationDetailsModalOpen} onClose={closeDonationDetailsModal} />
        </div>
    )
}