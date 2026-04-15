
"use client"

import { useTabsQueryState } from "@/src/lib/helper/useTabsQueryState";
import TopTabs, { TabItem } from "../../common/TopTabs";
import { useQueryState } from "@/src/lib/helper/useQueryState";
import AddDeathNoticeWizard from "./AddDeathNoticeWizard";
import ViewAllNoticeContainer from "./ViewAllNoticeContainer";
type TabKey = "add-death-notice" | "view-all-notices";
const tabs: TabItem<TabKey>[] = [
    { key: "add-death-notice", label: "Add Death Notice" },
    { key: "view-all-notices", label: "View All Notices" },

];
export default function ManageNoticeContainer() {

    const [tab, setTab] = useTabsQueryState<TabKey>("tab", "add-death-notice");
    const [view] = useQueryState("view", "list");
    return (
        <div className="w-full space-y-6">
            <div className="w-full">
                <TopTabs tabs={tabs} activeKey={tab} onChange={setTab} />

                <div className="px-3 sm:px-4 py-4">
                    {tab === "add-death-notice" && (
                        <div>
                            <AddDeathNoticeWizard />

                        </div>
                    )}

                    {tab === "view-all-notices" && (
                        <ViewAllNoticeContainer
                            view={view}
                            onAddNotice={() => setTab("add-death-notice")}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}
