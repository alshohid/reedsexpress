import { useMemo, useState } from "react";
import NotificationPreferences, { PrefItem, PrefKey } from "../../admin/settings/NotificationPreference";

export default function EmailPreference() {
    const items: PrefItem[] = useMemo(
        () => [
            { key: "newDonationAlerts", title: "New Donation Alerts", desc: "Email me every time a donation is processed." },
            { key: "condolenceMessageAlerts", title: "Condolence Message Alerts", desc: "Receive notification on flagged message" },
            { key: "planExpiration", title: "Plan Expiration", desc: "Get notified before plan expires." },
            { key: "deathNoticePostAlert", title: "Death Notice Post Alert", desc: "Get notified instantly whenever a Notice is posted." },
            { key: "undertakerApplicationAlert", title: "Undertaker Application Alert", desc: "Receive notification on basis of per Application Submitted to register." },
            { key: "fundraiseExpirationAlert", title: "Fundraise expiration Alert", desc: "Get notified instantly whenever a Notice is posted." },
            { key: "charitySetting", title: "Charity Setting", desc: "Get notified whenever an undertaker selecting any charity." },
        ],
        []
    );
    const [prefs, setPrefs] = useState<Record<PrefKey, boolean>>({
        newDonationAlerts: false,
        condolenceMessageAlerts: false,
        planExpiration: true,
        deathNoticePostAlert: true,
        undertakerApplicationAlert: false,
        fundraiseExpirationAlert: false,
        charitySetting: true,
    });
    const handleSubmit = () => {
        console.log("submit");
    }
    const handleChange = (key: PrefKey, value: boolean) => {
        setPrefs(prev => ({ ...prev, [key]: value }))
    }
    return (
        <div>
            <NotificationPreferences
                items={items}
                value={prefs}
                onChange={handleChange}
                onSubmit={handleSubmit}
                submitLabel="Update"
            />
        </div>
    );
}