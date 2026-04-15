"use client"
import PlanCard from "../../financialManagement/PlanCard";
export default function SubscriptionPlans() {

    return (
        <section className="w-full space-y-4">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 items-stretch">
                <PlanCard
                    title="Pay-As-You-Go"
                    price="£35.00"
                    periodLabel="/post"
                    features={[
                        "One Official Memorial Notice",
                        "Charity Integration",
                        "Verified Professional Seal",
                        "Tribute Book Generation",
                        "Stripe Secure Processing",
                    ]}
                    editLabel="Select"
                    onEdit={() => {
                        console.log("select")
                    }}
                />

                <PlanCard
                    title="Monthly Professional"
                    price="£135.00"
                    periodLabel="/month"
                    isPopular
                    features={[
                        "Unlimited Notices",
                        "Priority Verification",
                        "Advanced Analytics",
                        "Multi-User Access",
                        "Premium Priority on Notice",
                    ]}
                    editLabel="Select"


                />

            </div>
        </section>
    );
}