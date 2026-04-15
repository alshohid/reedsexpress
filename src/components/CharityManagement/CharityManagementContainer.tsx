"use client";

import { useTabsQueryState } from "@/src/lib/helper/useTabsQueryState";
import TopTabs, { TabItem } from "../common/TopTabs";
import AddCharityForm from "./components/AddCharityForm";
import AllCharityOrganizationTable from "./components/AllCharityOrganizationTable";
import CharityConnectionTable from "./components/CharityConnectionTable";

type TabKey = "add-charityOrganization" | "all-charityOrganization" | "charity-connections";
const tabs: TabItem<TabKey>[] = [
    { key: "add-charityOrganization", label: "Add Charity Organization" },
    { key: "all-charityOrganization", label: "All Charity Organization" },
    { key: "charity-connections", label: "Charity Connections" },
];

const CharityManagementContainer = () => {

    const [tab, setTab] = useTabsQueryState<TabKey>("tab", "add-charityOrganization");

    return <div className="w-full space-y-4">
        <div>
            <TopTabs tabs={tabs} activeKey={tab} onChange={setTab} />

        </div>
        {tab === "add-charityOrganization" && (
            <AddCharityForm />

        )}
        {tab === "all-charityOrganization" && (
            <AllCharityOrganizationTable />
        )}
        {tab === "charity-connections" && (
            <CharityConnectionTable />
        )}

    </div>;
};

export default CharityManagementContainer;