/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Skeleton } from "@/src/components/ui/skeleton";
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    Line,
} from "recharts";

type TrendPoint = {
    day: string; // Sat, Sun...
    thisWeek: number;
    lastWeek: number;
};

type DeathNoticeTrendsChartProps = {
    title?: string;
    data: TrendPoint[];
    className?: string;
    currentSeriesLabel?: string;
    previousSeriesLabel?: string;
    isLoading?: boolean;
};

function DotLegend({ label, color, dashed }: { label: string; color: string; dashed?: boolean }) {
    return (
        <div className="flex items-center gap-2 text-[12px] text-gray-500">
            <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: color }}
                aria-hidden
            />
            <span>{label}</span>
            {dashed ? <span className="sr-only">(dashed)</span> : null}
        </div>
    );
}

function CustomTooltip({
    active,
    payload,
    label,
    currentSeriesLabel,
    previousSeriesLabel,
}: {
    active?: boolean;
    payload?: any[];
    label?: string;
    currentSeriesLabel: string;
    previousSeriesLabel: string;
}) {
    if (!active || !payload?.length) return null;

    const thisW = payload.find((p) => p.dataKey === "thisWeek");
    const lastW = payload.find((p) => p.dataKey === "lastWeek");

    return (
        <div className="rounded-lg border border-[#E9E9EA] bg-white px-3 py-2 shadow-[0_10px_24px_rgba(0,0,0,0.10)]">
            <div className="text-[12px] font-medium text-gray-700">{label}</div>
            <div className="mt-1 space-y-1">
                {thisW && (
                    <div className="flex items-center justify-between gap-4 text-[12px] text-gray-600">
                        <span className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-[#5B6A52]" />
                            {currentSeriesLabel}
                        </span>
                        <span className="font-medium text-gray-900">{thisW.value}</span>
                    </div>
                )}
                {lastW && (
                    <div className="flex items-center justify-between gap-4 text-[12px] text-gray-600">
                        <span className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-[#9BAA8F]" />
                            {previousSeriesLabel}
                        </span>
                        <span className="font-medium text-gray-900">{lastW.value}</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function DeathNoticeTrendsChart({
    title = "Death Notice Post Trends",
    data,
    className = "",
    currentSeriesLabel = "This week",
    previousSeriesLabel = "Last week",
    isLoading = false,
}: DeathNoticeTrendsChartProps) {
    // Colors chosen to match screenshot vibe (green solid + green dashed)
    const thisWeekColor = "#5B6A52"; // solid
    const lastWeekColor = "#9BAA8F"; // dashed

    return (
        <section
            className={[
                "w-full rounded-[0.75rem] bg-[#F8F7F8] p-6",
                "flex flex-col gap-4",
                className,
            ].join(" ")}
        >
            {/* Header row */}
            <div className="flex items-center justify-between gap-3">
                <h3 className="text-[1rem] sm:text-[1.125rem] font-medium text-[#161721]">
                    {title}
                </h3>

                <div className="flex items-center gap-6">
                    <DotLegend label={currentSeriesLabel} color={thisWeekColor} />
                    <DotLegend label={previousSeriesLabel} color={lastWeekColor} dashed />
                </div>
            </div>

            {isLoading ? (
                <div className="flex h-[220px] sm:h-[260px] md:h-[300px] items-end gap-3">
                    {Array.from({ length: 7 }).map((_, index) => (
                        <div key={index} className="flex flex-1 flex-col items-center justify-end gap-3">
                            <Skeleton
                                className="w-full rounded-t-[14px] bg-[#E8EDE2]"
                                style={{ height: `${96 + (index % 4) * 28}px` }}
                            />
                            <Skeleton className="h-3 w-8 bg-[#E1E7DA]" />
                        </div>
                    ))}
                </div>
            ) : data.length === 0 ? (
                <div className="flex h-[220px] sm:h-[260px] md:h-[300px] items-center justify-center rounded-[0.75rem] border border-dashed border-[#D8DBD4] bg-white/50 px-6 text-center text-sm text-gray-500">
                    No death notice graph data available for this period.
                </div>
            ) : (
                <div className="w-full h-[220px] sm:h-[260px] md:h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data} margin={{ top: 8, right: 10, left: 0, bottom: 0 }}>
                            <defs>
                                {/* subtle area fade like screenshot */}
                                <linearGradient id="thisWeekFill" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor={thisWeekColor} stopOpacity={0.18} />
                                    <stop offset="100%" stopColor={thisWeekColor} stopOpacity={0} />
                                </linearGradient>
                            </defs>

                            <CartesianGrid stroke="rgba(0,0,0,0.05)" vertical={false} />

                            <XAxis
                                dataKey="day"
                                tick={{ fill: "rgba(0,0,0,0.45)", fontSize: 12 }}
                                axisLine={false}
                                tickLine={false}
                            />

                            <YAxis
                                tick={{ fill: "rgba(0,0,0,0.35)", fontSize: 12 }}
                                axisLine={false}
                                tickLine={false}
                                width={28}
                                domain={[0, "dataMax + 2"]}
                            />

                            <Tooltip
                                content={
                                    <CustomTooltip
                                        currentSeriesLabel={currentSeriesLabel}
                                        previousSeriesLabel={previousSeriesLabel}
                                    />
                                }
                                cursor={{ stroke: "rgba(0,0,0,0.08)" }}
                            />

                            {/* Fill under THIS week (subtle) */}
                            <Area
                                type="monotone"
                                dataKey="thisWeek"
                                stroke={thisWeekColor}
                                strokeWidth={2}
                                fill="url(#thisWeekFill)"
                                fillOpacity={1}
                                dot={false}
                                activeDot={{ r: 4 }}
                            />

                            {/* LAST week as dashed line */}
                            <Line
                                type="monotone"
                                dataKey="lastWeek"
                                stroke={lastWeekColor}
                                strokeWidth={2}
                                strokeDasharray="4 4"
                                dot={false}
                                activeDot={{ r: 4 }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            )}
        </section>
    );
}
