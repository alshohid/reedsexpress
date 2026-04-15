"use client";


import TopTabs, { TabItem } from "../common/TopTabs";
import { useTabsQueryState } from "@/src/lib/helper/useTabsQueryState";
import AllApplicationTable from "../tables/AllApplicationTable";
import VerifiedApplicationTable from "../tables/VerifiedApplicationTable";
type TabKey = "All-Application" | "Verified-Application";
const tabs: TabItem<TabKey>[] = [
    { key: "All-Application", label: "All Application" },
    { key: "Verified-Application", label: "Verified Application" },
];
const UndertakerVerification = () => {
    const [tab, setTab] = useTabsQueryState<TabKey>("tab", "All-Application");

    return <div className="w-full space-y-4">
        <div>
            <TopTabs tabs={tabs} activeKey={tab} onChange={setTab} />
        </div>
        {tab === "All-Application" && (
            <AllApplicationTable />

        )}
        {tab === "Verified-Application" && (
            <VerifiedApplicationTable />
        )}
    </div>;
};

export default UndertakerVerification;