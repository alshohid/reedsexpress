"use client"

import { useTabsQueryState } from "@/src/lib/helper/useTabsQueryState";
import TopTabs, { TabItem } from "../../common/TopTabs";
import AllDonationMessageTable from "./AllDonationMessageTable";

type TabKey = "all-donation-tracking";
const tabs: TabItem<TabKey>[] = [
    { key: "all-donation-tracking", label: "All Donation Tracking" },
];

export default function DonationsTrackingContainer() {
    const [tab, setTab] = useTabsQueryState<TabKey>("tab", "all-donation-tracking");
    return (
        <div className="w-full space-y-6">
            <div>
                <TopTabs tabs={tabs} activeKey={tab} onChange={setTab} />
            </div>
            <div className="px-3 sm:px-4 py-4">
                {tab === "all-donation-tracking" && (
                    <div>
                        <AllDonationMessageTable />
                    </div>
                )}
            </div>
        </div>
    );
}