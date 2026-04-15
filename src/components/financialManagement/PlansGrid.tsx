"use client";

import { Skeleton } from "@/src/components/ui/skeleton";
import PlanCard from "./PlanCard";
import AddPlanCard from "./AddPlanCard";

export type SubscriptionPlanCardItem = {
    id: string;
    title: string;
    price: string;
    periodLabel: string;
    features: string[];
    isPopular?: boolean;
    onEdit?: () => void;
    onDelete?: () => void;
    isDeleteLoading?: boolean;
};

type PlansGridProps = {
    plans?: SubscriptionPlanCardItem[];
    isLoading?: boolean;
    onAddPlan?: () => void;
};

function PlanCardSkeleton() {
    return (
        <div className="w-full rounded-[0.75rem] border border-[#E9E9EA] bg-white p-6">
            <div className="flex flex-col items-center gap-6">
                <Skeleton className="h-6 w-40 bg-[#EEF3E8]" />
                <Skeleton className="h-14 w-44 bg-[#EEF3E8]" />
                <Skeleton className="h-5 w-28 bg-[#EEF3E8]" />
                <div className="w-full space-y-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <Skeleton key={`plan-feature-skeleton-${index}`} className="h-6 w-full bg-[#F5F8F1]" />
                    ))}
                </div>
                <Skeleton className="h-12 w-full rounded-[10px] bg-[#EEF3E8]" />
            </div>
        </div>
    );
}

export default function PlansGrid({
    plans = [],
    isLoading = false,
    onAddPlan,
}: PlansGridProps) {
    return (
        <section className="w-full space-y-4">
            <div className="grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">
                {isLoading
                    ? Array.from({ length: 3 }).map((_, index) => (
                        <PlanCardSkeleton key={`subscription-plan-skeleton-${index}`} />
                    ))
                    : plans.map((plan) => (
                        <PlanCard
                            key={plan.id}
                            title={plan.title}
                            price={plan.price}
                            periodLabel={plan.periodLabel}
                            features={plan.features}
                            isPopular={plan.isPopular}
                            onEdit={plan.onEdit}
                            onDelete={plan.onDelete}
                            isDeleteLoading={plan.isDeleteLoading}
                        />
                    ))}

                <AddPlanCard
                    title="Add New Plan Here"
                    buttonLabel="Create Plan"
                    onSelect={onAddPlan}
                />
            </div>

            {!isLoading && plans.length === 0 ? (
                <div className="rounded-[18px] border border-dashed border-[#D9DADC] bg-white px-5 py-6 text-center text-[14px] text-[#667164]">
                    No subscription plans found yet. Create your first plan to get started.
                </div>
            ) : null}
        </section>
    );
}
