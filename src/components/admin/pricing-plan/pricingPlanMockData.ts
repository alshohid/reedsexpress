import type {
    BillingDay,
    BillingFrequencyOption,
    FreeTrialPeriod,
    PricingBillingSettings,
    PricingPlanFeatureOption,
    PricingPlanRecord,
} from "./pricingPlanTypes";

export const billingFrequencyOptions: BillingFrequencyOption[] = [
    {
        value: "weekly",
        label: "Weekly",
        description: "Every 7 days",
    },
    {
        value: "bi-weekly",
        label: "Bi- Weekly",
        description: "Every 14 days",
    },
    {
        value: "monthly",
        label: "Monthly",
        description: "Every 30 days",
    },
];

export const billingDayOptions: BillingDay[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];

export const freeTrialOptions: FreeTrialPeriod[] = [
    "7 Days",
    "14 Days",
    "30 Days",
];

export const defaultBillingFeatureLabels = [
    "Driver Recruiting",
    "Permits & IFTA Filing",
    "Permits & IFTA Filing",
    "Permits & IFTA Filing",
    "Financial Metrics",
];

export const defaultPricingBillingSettings: PricingBillingSettings = {
    frequency: "weekly",
    dispatchFeePercentage: "",
    billingDay: "Monday",
    freeTrial: "14 Days",
};

export const pricingPlanFeatureOptions: PricingPlanFeatureOption[] = [
    {
        id: "load-dispatching",
        label: "Load Dispatching",
        description: "Full load management and dispatching services",
    },
    {
        id: "dedicated-dispatcher",
        label: "Dedicated Dispatcher",
        description: "Personal dispatcher assignment",
    },
    {
        id: "load-board-access",
        label: "Load Board Access",
        description: "Access to premium load boards",
    },
    {
        id: "document-tracking",
        label: "Document Tracking",
        description: "Track insurance, permits, and driver documents",
    },
    {
        id: "document-upload",
        label: "Document Upload",
        description: "Upload and store compliance documents",
    },
];

export const carrierPricingPlans: PricingPlanRecord[] = [
    {
        id: "basic-plan-1",
        name: "Basic Plan",
        status: "active",
        description: "Great for everyday usage and long term benefits",
        dispatchFeePercentage: "10",
        billingDay: "Monday",
        billingCycle: "weekly",
        featureIds: [
            "load-dispatching",
            "dedicated-dispatcher",
            "load-board-access",
            "document-tracking",
            "document-upload",
        ],
        features: [
            "Driver Recruiting",
            "Permits & IFTA Filing",
            "Permits & IFTA Filling",
            "Permits & FTA Filing",
            "Financial Metrics",
        ],
    },
    {
        id: "basic-plan-2",
        name: "Basic Plan",
        status: "active",
        description: "Great for everyday usage and long term benefits",
        dispatchFeePercentage: "10",
        billingDay: "Monday",
        billingCycle: "weekly",
        featureIds: [
            "load-dispatching",
            "dedicated-dispatcher",
            "load-board-access",
            "document-tracking",
            "document-upload",
        ],
        features: [
            "Driver Recruiting",
            "Permits & IFTA Filing",
            "Permits & IFTA Filling",
            "Permits & FTA Filing",
            "Financial Metrics",
        ],
    },
    {
        id: "basic-plan-3",
        name: "Basic Plan",
        status: "active",
        description: "Great for everyday usage and long term benefits",
        dispatchFeePercentage: "10",
        billingDay: "Monday",
        billingCycle: "weekly",
        featureIds: [
            "load-dispatching",
            "dedicated-dispatcher",
            "load-board-access",
            "document-tracking",
            "document-upload",
        ],
        features: [
            "Driver Recruiting",
            "Permits & IFTA Filing",
            "Permits & IFTA Filling",
            "Permits & FTA Filing",
            "Financial Metrics",
        ],
    },
];
