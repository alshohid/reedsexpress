"use client"

import { useTabsQueryState } from "@/src/lib/helper/useTabsQueryState";
import TopTabs, { TabItem } from "../common/TopTabs";
import CommunityModerationContent from "./CommunityModerationContent";

type TabKey = "community-moderation";
const tabs: TabItem<TabKey>[] = [
    { key: "community-moderation", label: "Community Moderation" },

];

export default function CommunityModerationContainer() {
    const [tab, setTab] = useTabsQueryState<TabKey>("tab", "community-moderation");
    return (
        <div className="w-full space-y-4">
            <div>
                <TopTabs tabs={tabs} activeKey={tab} onChange={setTab} />

            </div>
            {tab === "community-moderation" && (
                <CommunityModerationContent />

            )}


        </div>
    )
}