import PerformanceSummaryCard from "@/src/components/admin/performance/PerformanceSummaryCard";
import { performanceData, revenuePlanDataMap, topRevenueCarriers } from "../../dispatcher/dummyData/data";
import RevenuePlanChart from "../../dispatcher/RevenuePlanChart";
import TopRevenueCarriers from "../../dispatcher/TopRevenueCarriers";
import RevenueTrendChart from "../../dispatcher/RevenueTrendChart";


export default function PerformanceContainer() {

    const revenuePlanItems = revenuePlanDataMap['30d'];
    return (
        <section className="space-y-6">
            <h2 className="text-[2rem] font-semibold text-[#111827]">Performance</h2>

            <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-3">
                {performanceData.map((item) => (
                    <PerformanceSummaryCard
                        key={item.title}
                        title={item.title}
                        value={item.value}
                        supportingText={item.supportingText}
                        isPositive={item.isPositive}
                    />
                ))}
            </div>
            <div>
                <RevenueTrendChart dateRange={'30d'} />
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[3fr_9fr]" >
                <RevenuePlanChart items={revenuePlanItems} />
                <TopRevenueCarriers carriers={topRevenueCarriers} />
            </div>

        </section>
    );
}
