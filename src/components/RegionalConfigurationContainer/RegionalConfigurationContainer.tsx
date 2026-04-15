"use client";

import { useTabsQueryState } from "@/src/lib/helper/useTabsQueryState";
import TopTabs, { TabItem } from "../common/TopTabs";
import AllFuneralHouseTable from "../tables/AllFuneralHouseTable";
import AllDeathsTable from "../tables/AllDeathsTable";
type TabKey = "All-Deaths" | "All-Funeral-House";
const tabs: TabItem<TabKey>[] = [
    { key: "All-Deaths", label: "All Deaths" },
    { key: "All-Funeral-House", label: "All Funeral House" },
];


const RegionalConfigurationContainer = () => {
    const [tab, setTab] = useTabsQueryState<TabKey>("tab", "All-Deaths");

    return <div className="w-full space-y-4">
        <div>
            <TopTabs tabs={tabs} activeKey={tab} onChange={setTab} />

        </div>
        {tab === "All-Deaths" && (
            <AllDeathsTable />

        )}
        {tab === "All-Funeral-House" && (
            <AllFuneralHouseTable />
        )}


    </div>;
};

export default RegionalConfigurationContainer;