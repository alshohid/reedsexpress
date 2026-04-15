"use client";

import React from "react";
import Switch from "@/src/components/ui/switch/Switch";

export type PrefKey =
    | "newDonationAlerts"
    | "condolenceMessageAlerts"
    | "planExpiration"
    | "deathNoticePostAlert"
    | "undertakerApplicationAlert"
    | "fundraiseExpirationAlert"
    | "charitySetting";

export type PrefItem<K extends string = PrefKey> = {
    key: K;
    title: string;
    desc: string;
};

type NotificationPreferencesProps<K extends string = PrefKey> = {
    title?: string;
    items: PrefItem<K>[];
    value: Record<K, boolean>;
    onChange: (key: K, value: boolean) => void;

    onSubmit?: () => void;
    submitLabel?: string;
    className?: string;
    maxWidthClassName?: string; // default: max-w-[860px]
};

export default function NotificationPreferences<K extends string = PrefKey>({
    title = "Notification Preferences",
    items,
    value,
    onChange,
    onSubmit,
    submitLabel = "Update",
    className = "",
    maxWidthClassName = "max-w-[860px]",
}: NotificationPreferencesProps<K>) {
    return (
        <section className={["w-full space-y-4 p-4", className].join(" ")}>
            <h2 className="text-[28px] font-medium text-[#161721]">{title}</h2>

            <div className={["mt-6 w-full", maxWidthClassName].join(" ")}>
                <div className="divide-y divide-black/5">
                    {items.map((item) => (
                        <div
                            key={item.key}
                            className="flex items-center justify-between gap-4 py-5"
                        >
                            <div className="min-w-0">
                                <p className="text-[18px] font-semibold text-[#161721]">
                                    {item.title}
                                </p>
                                <p className="mt-1 text-[14px] text-[#777980]">{item.desc}</p>
                            </div>

                            <div className="shrink-0">
                                <Switch
                                    checked={Boolean(value[item.key])}
                                    onCheckedChange={(v: boolean) => onChange(item.key, v)}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {onSubmit ? (
                    <button
                        type="button"
                        onClick={onSubmit}
                        className="
              mt-10
              h-12 w-full sm:w-[320px]
              rounded-[10px]
              bg-[linear-gradient(180deg,#394034_0%,#4F5747_100%)]
              text-white text-[14px] font-medium
              hover:opacity-90 transition
            "
                    >
                        {submitLabel}
                    </button>
                ) : null}
            </div>
        </section>
    );
}