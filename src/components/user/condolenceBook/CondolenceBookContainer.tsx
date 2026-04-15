"use client"

import { useTabsQueryState } from "@/src/lib/helper/useTabsQueryState";
import TopTabs, { TabItem } from "../../common/TopTabs";
import CreateCondolenceBook from "./CreateCondolenceBook";
import ViewAllCondolenceBook from "./ViewAllCondolenceBook";
import AllCondolenceMessages from "./AllCondolenceMessages";


type TabKey = "create-condolence-book" | "view-all-condolence-book" | "all-condolence-messages";
const tabs: TabItem<TabKey>[] = [
    { key: "create-condolence-book", label: "Create Condolence Book" },
    { key: "view-all-condolence-book", label: "View All Condolence Book" },
    { key: "all-condolence-messages", label: "All Condolence Messages" },
];
export default function CondolenceBookContainer() {
    const [activeKey, setActiveKey] = useTabsQueryState<TabKey>("tab", "create-condolence-book");
    return (
        <div className="space-y-6 w-full">
            <div>
                <TopTabs tabs={tabs} activeKey={activeKey} onChange={setActiveKey} />
            </div>
            {activeKey === "create-condolence-book" && <CreateCondolenceBook />}
            {activeKey === "view-all-condolence-book" && <ViewAllCondolenceBook />}
            {activeKey === "all-condolence-messages" && <AllCondolenceMessages />}
        </div>
    );
}