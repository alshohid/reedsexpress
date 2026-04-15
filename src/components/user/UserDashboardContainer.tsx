/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useMemo, useState } from "react";
import { getErrorMessage } from "@/src/lib/getErrorMessage";
import {
    useDirectorDeathNoticeAreaGraphQuery,
    useDirectorNoticeViewsGraphQuery,
    useGetDirectorDashboardStatesDataQuery,
    useGetDirectorRecentCondolenceQuery,
    useGetDirectorRecentNoticeQuery,
} from "@/src/redux/features/undertaker/dashboard/dashboardManagement";
import StatusNotice from "../ui/StatusNotice";
import ActivityTrendsHeader from "../CharityManagement/components/ActivityTrendsHeader";
import StatsCard from "../card/StatsCard";
import NoticeViewsTrendsChart from "./NoticeViewsTrendsChart";
import AllArbutaryNoticeTable from "./AllArbutaryNoticeTable";
import RecentCondolence from "./RececntCondolence";
import DeathNoticesDonutChart, { DeathNoticeSlice } from "./DeathNoticeDonatChart";

const FILTER_OPTIONS = [
    { label: "This Week", value: "this-week" },
    { label: "Last Week", value: "last-week" },
    { label: "This Month", value: "this-month" },
];

const DONUT_COLORS = ["#6C7B5F", "#97A58A", "#B6C2A7", "#DDEACB", "#8A967E", "#C8D6B7"];
const NOTICE_PAGE_SIZE = 8;
const RECENT_CONDOLENCE_LIMIT = 5;

const toTitleCase = (value?: string | null) => {
    if (!value) {
        return "-";
    }

    return value
        .split("-")
        .flatMap((part) => part.split(" "))
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
        .join(" ");
};

const formatCount = (value: number) => new Intl.NumberFormat("en-GB").format(value);

export default function UserDashboardContainer() {
    const [sorted, setSorted] = useState<string>("this-week");
    const [noticePage, setNoticePage] = useState(1);

    const {
        data: dashboardStatsResponse,
        error: dashboardStatsError,
        isLoading: isDashboardStatsLoading,
    } = useGetDirectorDashboardStatesDataQuery();
    const {
        data: noticeViewsResponse,
        error: noticeViewsError,
        isLoading: isNoticeViewsLoading,
    } = useDirectorNoticeViewsGraphQuery({ filter: sorted });
    const {
        data: deathNoticeAreaResponse,
        error: deathNoticeAreaError,
        isLoading: isDeathNoticeAreaLoading,
    } = useDirectorDeathNoticeAreaGraphQuery({ filter: sorted });
    const {
        data: recentNoticeResponse,
        error: recentNoticeError,
        isLoading: isRecentNoticeLoading,
        isFetching: isRecentNoticeFetching,
    } = useGetDirectorRecentNoticeQuery({
        limit: NOTICE_PAGE_SIZE,
        page: noticePage,
    });
    const {
        data: recentCondolenceResponse,
        error: recentCondolenceError,
        isLoading: isRecentCondolenceLoading,
    } = useGetDirectorRecentCondolenceQuery({
        limit: RECENT_CONDOLENCE_LIMIT,
        page: 1,
    });

    useEffect(() => {
        if (recentNoticeResponse?.meta.last_page && noticePage > recentNoticeResponse.meta.last_page) {
            setNoticePage(recentNoticeResponse.meta.last_page);
        }
    }, [noticePage, recentNoticeResponse?.meta.last_page]);

    const dashboardStats = dashboardStatsResponse?.data;
    const noticeViewsData = noticeViewsResponse?.data;
    const deathNoticeAreaData = deathNoticeAreaResponse?.data;
    const recentNotices = recentNoticeResponse?.data ?? [];
    const recentNoticeMeta = recentNoticeResponse?.meta;
    const recentCondolences = recentCondolenceResponse?.data ?? [];

    const noticeViewsChartData = useMemo(
        () =>
            (noticeViewsData?.labels ?? []).map((label, index) => ({
                day: label,
                thisWeek: noticeViewsData?.this_week[index] ?? 0,
                lastWeek: noticeViewsData?.last_week[index] ?? 0,
            })),
        [noticeViewsData],
    );

    const deathNoticeAreaChartData = useMemo<DeathNoticeSlice[]>(
        () =>
            (deathNoticeAreaData?.labels ?? []).map((label, index) => ({
                name: toTitleCase(label),
                value: deathNoticeAreaData?.values[index] ?? 0,
                fill: DONUT_COLORS[index % DONUT_COLORS.length],
            })),
        [deathNoticeAreaData],
    );

    const dashboardStatCards = [
        {
            title: "Your Active Notices",
            value: formatCount(dashboardStats?.total_notices ?? 0),
        },
        {
            title: "Total Condolence Book Published",
            value: formatCount(dashboardStats?.total_condolances ?? 0),
        },
        {
            title: "Total People Donated",
            value: formatCount(dashboardStats?.total_donations ?? 0),
        },
    ];

    const errorNotices = [
        dashboardStatsError
            ? {
                title: "Unable To Load Dashboard Stats",
                message: getErrorMessage(dashboardStatsError, "Failed to load your dashboard statistics."),
            }
            : null,
        noticeViewsError
            ? {
                title: "Unable To Load Notice Views",
                message: getErrorMessage(noticeViewsError, "Failed to load the notice views chart."),
            }
            : null,
        deathNoticeAreaError
            ? {
                title: "Unable To Load Notice Areas",
                message: getErrorMessage(deathNoticeAreaError, "Failed to load the notice area chart."),
            }
            : null,
        recentNoticeError
            ? {
                title: "Unable To Load Recent Notices",
                message: getErrorMessage(recentNoticeError, "Failed to load recent obituary notices."),
            }
            : null,
        recentCondolenceError
            ? {
                title: "Unable To Load Recent Condolences",
                message: getErrorMessage(recentCondolenceError, "Failed to load recent condolences."),
            }
            : null,
    ].filter(Boolean) as Array<{ title: string; message: string }>;

    return (
        <div className="mx-auto w-full max-w-[1920px] min-w-0 space-y-4 px-2 sm:space-y-6 sm:px-4 md:px-3 lg:px-4">
            {errorNotices.map((notice) => (
                <StatusNotice
                    key={`${notice.title}-${notice.message}`}
                    variant="error"
                    title={notice.title}
                    message={notice.message}
                />
            ))}

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
                {dashboardStatCards.map((card) => (
                    <StatsCard
                        key={card.title}
                        topLabel="All Time"
                        value={card.value}
                        title={card.title}
                        isLoading={isDashboardStatsLoading}
                    />
                ))}
            </div>

            <div className="w-full">
                <ActivityTrendsHeader
                    options={FILTER_OPTIONS}
                    value={sorted}
                    primaryLabel="Add Death Notice"
                    onChange={setSorted}
                    placeholder="This Week"
                    onPrimaryClick={() => console.log("add death notice")}
                />
            </div>

            <div className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-[1fr_320px] lg:gap-6 xl:grid-cols-[1fr_360px] 2xl:grid-cols-[1fr_380px]">
                <div className="min-w-0 flex flex-col gap-4">
                    <div className="min-w-0 rounded-2xl border border-white/10">
                        <div className="w-full min-w-0 overflow-hidden">
                            <NoticeViewsTrendsChart
                                data={noticeViewsChartData}
                                totalViews={noticeViewsData?.total_views ?? 0}
                                isLoading={isNoticeViewsLoading}
                            />
                        </div>
                    </div>

                    <div className="min-w-0 overflow-x-auto">
                        <AllArbutaryNoticeTable
                            items={recentNotices}
                            meta={recentNoticeMeta}
                            isLoading={isRecentNoticeLoading}
                            isFetching={isRecentNoticeFetching}
                            onPageChange={setNoticePage}
                        />
                    </div>
                </div>

                <div className="w-full min-w-0 lg:min-w-[320px] xl:min-w-[360px] 2xl:min-w-[380px]">
                    <div className="flex flex-col gap-3 sm:gap-4">
                        <DeathNoticesDonutChart
                            title="Death Notices"
                            data={deathNoticeAreaChartData}
                            isLoading={isDeathNoticeAreaLoading}
                        />
                        <RecentCondolence
                            items={recentCondolences}
                            isLoading={isRecentCondolenceLoading}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
