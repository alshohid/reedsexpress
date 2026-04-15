"use client";


import StatsCard from "../card/StatsCard";
import RecentApplicationsTable from "../tables/PendingWithdrawalTable";
import RecentDonations from "../card/RecentActivity";
import CondolenceBooksCard from "../card/CondolenceBooksCard";

import ActivityTrendsHeader from "../CharityManagement/components/ActivityTrendsHeader";
import { useState } from "react";
import DeathNoticeTrendsChart from "../CharityManagement/components/DeathNoticeTrendsChart";
import { useAdminGetNoticeGraphQuery, useGetAdminDashboardStatesDataQuery, useGetRecentApplicationQuery, useGetRecentCondolenceQuery, useGetRecentDonationQuery } from "@/src/redux/features/admin/dashboard/dashboardManagement";


const DashBoardContainer = () => {
    const [sorted, setSorted] = useState<string>("week");

    const { data: adminNoticeGraphData, isLoading: isAdminNoticeGraphDataLoading } = useAdminGetNoticeGraphQuery({ filter: sorted });
    const { data: adminDashboardStatesData, isLoading: isAdminDashboardStatesDataLoading } = useGetAdminDashboardStatesDataQuery();
    const { data: recentApplicationData, isLoading: isRecentApplicationLoading } = useGetRecentApplicationQuery({ limit: 10, page: 1 });
    const { data: recentCondolenceData, isLoading: isRecentCondolenceLoading } = useGetRecentCondolenceQuery({ limit: 10, page: 1 });
    const { data: recentDonationData, isLoading: isRecentDonationLoading } = useGetRecentDonationQuery({ limit: 10, page: 1 });
    const options = [
        { label: "This Week", value: "week" },
        { label: "This Month", value: "month" },
        { label: "This Year", value: "year" },
    ];
    const dashboardStats = adminDashboardStatesData?.data;
    const recentApplications = recentApplicationData?.data ?? [];
    const recentApplicationMeta = recentApplicationData?.meta;
    const recentCondolences = recentCondolenceData?.data ?? [];
    const recentDonations = recentDonationData?.data ?? [];
    const noticeGraph = adminNoticeGraphData?.data;
    const noticeGraphSeries = noticeGraph?.series ?? [];

    const chartData = (noticeGraph?.categories ?? []).map((category, index) => ({
        day: category,
        thisWeek: noticeGraphSeries[0]?.data[index] ?? 0,
        lastWeek: noticeGraphSeries[1]?.data[index] ?? 0,
    }));

    const currentSeriesLabel = noticeGraphSeries[0]?.name ?? "This week";
    const previousSeriesLabel = noticeGraphSeries[1]?.name ?? "Last week";

    const formatCurrency = (amount: number) =>
        new Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: "GBP",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(amount);

    const formatCount = (count: number) =>
        new Intl.NumberFormat("en-GB").format(count);

    const dashboardStatCards = [
        {
            title: "Total Donation",
            value: formatCurrency(dashboardStats?.total_completed_donations ?? 0),
        },
        {
            title: "Pending Director Applications",
            value: formatCount(dashboardStats?.pending_director_applications ?? 0),
        },
        {
            title: "Earned From Subscription",
            value: formatCurrency(dashboardStats?.total_completed_subscriptions ?? 0),
        },
    ];

    return (
        <div className="w-full min-w-0 max-w-[1920px] mx-auto space-y-4 sm:space-y-6 px-2 sm:px-4 md:px-3 lg:px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {dashboardStatCards.map((card) => (
                    <StatsCard
                        key={card.title}
                        topLabel="Overview"
                        value={card.value}
                        title={card.title}
                        isLoading={isAdminDashboardStatesDataLoading}
                    />
                ))}
            </div>
            <div className="w-full">
                <ActivityTrendsHeader
                    options={options}
                    value={sorted}
                    onChange={setSorted}
                    placeholder="This Week"
                    onPrimaryClick={() => console.log("transfer")}
                />

            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px] 2xl:grid-cols-[1fr_380px] gap-4 lg:gap-6 min-w-0">
                <div className="min-w-0 flex flex-col gap-4">
                    <div className="rounded-2xl border border-white/10  min-w-0">

                        <div className="w-full min-w-0 overflow-hidden">
                            <DeathNoticeTrendsChart
                                data={chartData}
                                currentSeriesLabel={currentSeriesLabel}
                                previousSeriesLabel={previousSeriesLabel}
                                isLoading={isAdminNoticeGraphDataLoading}
                            />
                        </div>
                    </div>
                    <div className="min-w-0 overflow-x-auto">
                        <RecentApplicationsTable
                            applications={recentApplications}
                            meta={recentApplicationMeta}
                            isLoading={isRecentApplicationLoading}

                        />
                    </div>

                </div>

                <div className="w-full min-w-0 lg:min-w-[320px] xl:min-w-[360px] 2xl:min-w-[380px]">
                    <div className="flex flex-col gap-3 sm:gap-4">
                        <CondolenceBooksCard
                            items={recentCondolences}
                            isLoading={isRecentCondolenceLoading}
                        />
                        <RecentDonations
                            items={recentDonations}
                            isLoading={isRecentDonationLoading}
                        />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default DashBoardContainer;
