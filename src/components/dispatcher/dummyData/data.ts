import { DateRangeType } from "@/src/types/dispatcher/type";
import { TopRevenueCarrierItem } from "../TopRevenueCarriers";
import { RevenuePlanChartItem } from "../RevenuePlanChart";

export const revenuePlanDataMap: Record<DateRangeType, RevenuePlanChartItem[]> =
  {
    "7d": [
      { label: "Basic", value: 35, color: "#ffa4a6" },
      { label: "Pro", value: 45, color: "#7eceff" },
      { label: "Enterprise", value: 20, color: "#f29eff" },
    ],
    "30d": [
      { label: "Basic", value: 43, color: "#ffa4a6" },
      { label: "Pro", value: 42, color: "#7eceff" },
      { label: "Enterprise", value: 15, color: "#f29eff" },
    ],
    "60d": [
      { label: "Basic", value: 40, color: "#ffa4a6" },
      { label: "Pro", value: 38, color: "#7eceff" },
      { label: "Enterprise", value: 22, color: "#f29eff" },
    ],
  };

export const topRevenueCarriers: TopRevenueCarrierItem[] = [
  {
    id: "express-cargo-services-1",
    rank: "#1",
    name: "Express Cargo Services",
    plan: "Basic",
    amount: "$599",
    amountSuffix: "month",
    metricLabel: "89 loads",
  },
  {
    id: "global-dispatch-solutions",
    rank: "#2",
    name: "Global Dispatch Solutions",
    plan: "Pro",
    amount: "$590",
    amountSuffix: "month",
    metricLabel: "89 loads",
  },
  {
    id: "swift-freight-solutions",
    rank: "#3",
    name: "Swift Freight Solutions",
    plan: "Basic",
    amount: "$499",
    amountSuffix: "month",
    metricLabel: "89 loads",
  },
  {
    id: "metro-dispatch-services",
    rank: "#4",
    name: "Metro Dispatch Services",
    plan: "Enterprise",
    amount: "$456",
    amountSuffix: "month",
    metricLabel: "89 loads",
  },
  {
    id: "express-cargo-services-2",
    rank: "#5",
    name: "Express Cargo Services",
    plan: "Basic",
    amount: "$400",
    amountSuffix: "month",
    metricLabel: "89 loads",
  },
];
export const cardData = [
  {
    title: "Total Carriers",
    value: "32",
    supportingText: "Avg 5 new carriers/month",
  },
  {
    title: "Total Dispatchers",
    value: "28",
    supportingText: "Avg 4 active shifts/day",
  },
  {
    title: "Monthly Revenue",
    value: "$48,000",
    supportingText: "Avg $8000/month",
  },
];
export const performanceData = [
  {
    title: "My Total Revenue (6 months)",
    value: "$48,000",
    supportingText: "Avg $8000/month",
  },
  {
    title: "Total Loads",
    value: "8,00",
    supportingText: "21.0% from last month",
    isPositive: true,
  },
  {
    title: "Carrier Revenue",
    value: "$3,100",
    supportingText: "This month",
  },
];
