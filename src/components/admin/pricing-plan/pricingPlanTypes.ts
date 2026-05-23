export type BillingFrequency = "weekly" | "bi-weekly" | "monthly";

export type BillingDay =
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday";

export type FreeTrialPeriod = "7 Days" | "14 Days" | "30 Days";

export type BillingFrequencyOption = {
    value: BillingFrequency;
    label: string;
    description: string;
};

export type PricingBillingSettings = {
    frequency: BillingFrequency;
    dispatchFeePercentage: string;
    billingDay: BillingDay;
    freeTrial?: FreeTrialPeriod;
};

export type PricingPlanStatus = "active" | "inactive";

export type PricingPlanFeatureOption = {
    id: string;
    label: string;
    description: string;
};

export type PricingPlanFormValues = {
    name: string;
    description: string;
    dispatchFeePercentage: string;
    billingDay: BillingDay;
    billingCycle: BillingFrequency;
    featureIds: string[];
};

export type PricingPlanRecord = {
    id: string;
    name: string;
    status: PricingPlanStatus;
    description: string;
    dispatchFeePercentage: string;
    billingDay: BillingDay;
    billingCycle: BillingFrequency;
    featureIds: string[];
    features: string[];
};
