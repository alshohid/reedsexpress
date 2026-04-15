"use client";

import TopTabs, { TabItem } from "@/src/components/common/TopTabs";
import { useTabsQueryState } from "@/src/lib/helper/useTabsQueryState";
import { useQueryState } from "@/src/lib/helper/useQueryState";
import NoticesToolbar from "./NoticesToolbar";

type TabKey = "notices" | "condolence";

const tabs: TabItem<TabKey>[] = [
    { key: "notices", label: "All Notices" },
    { key: "condolence", label: "View Condolence Book" },
];

export default function NoticesAndCondolenceShell({
    noticesList,
    noticesGrid,
    condolencePage,
}: {
    noticesList: React.ReactNode;
    noticesGrid: React.ReactNode;
    condolencePage?: React.ReactNode;
}) {
    const [tab, setTab] = useTabsQueryState<TabKey>("tab", "notices");
    const [view] = useQueryState("view", "list");

    return (
        <div className="w-full">
            <TopTabs tabs={tabs} activeKey={tab} onChange={setTab} />

            <div className="px-3 sm:px-4 py-4">
                {tab === "notices" ? (
                    <div className="space-y-4">
                        <NoticesToolbar title="View All Notices Posted By Funeral Houses" />
                        {view === "grid" ? noticesGrid : noticesList}
                    </div>
                ) : (
                    <div>{condolencePage}</div>
                )}
            </div>
        </div>
    );
}