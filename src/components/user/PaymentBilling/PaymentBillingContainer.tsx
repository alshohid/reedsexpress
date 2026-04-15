"use client"

import { useTabsQueryState } from "@/src/lib/helper/useTabsQueryState";
import TopTabs, { TabItem } from "../../common/TopTabs";
import SubscriptionPlans from "./SubscriptionPlans";
import BillingHistory from "./BillingHistory";
import SelectCardForFuturePayment from "./SelectCardForFuturePayment";
type TabKey = "subscription-plans" | "billing-history" | "payment-methods";
const tabs: TabItem<TabKey>[] = [
    { key: "subscription-plans", label: "Subscription Plans" },
    { key: "payment-methods", label: "Payment Methods" },
    { key: "billing-history", label: "Billing History" },
];

export default function PaymentBillingContainer() {
    const [tab, setTab] = useTabsQueryState<TabKey>("tab", "subscription-plans");
    return (
        <div className="w-full space-y-6">
            <TopTabs tabs={tabs} activeKey={tab} onChange={setTab} />
            <div className="px-3 sm:px-4 py-4">
                {tab === "subscription-plans" && (
                    <div>
                        <SubscriptionPlans />
                    </div>
                )}
                {tab === "payment-methods" && (
                    <div>
                        <SelectCardForFuturePayment />
                    </div>
                )}
                {tab === "billing-history" && (
                    <div>
                        <BillingHistory />
                    </div>
                )}
            </div>
        </div>
    );
}