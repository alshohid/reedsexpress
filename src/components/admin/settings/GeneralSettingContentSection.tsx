"use client";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import AdminInfoSection from "./AdminInfoSection";
import SiteIdentitySection from "./SiteIdentitySection";
import PreferenceSection from "./PreferenceSection";
import { Maintainance } from "./MaintainanceSection";

const GenereralSettingContentSection = () => {
    const [settings, setSettings] = useState({
        adminName: "",
        accountType: "Admin",
        email: "",
        phone: "",
        siteTitle: "",
        supportEmail: "",
        timezone: "UTC+7",
        dateFormat: "MM/DD/YYYY",
        maintenance: false,
    });


    const handleSubmit = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            console.log("Settings to save:", settings);
            // TODO: Add API call here to save settings
            // Example: await saveSettings(settings);
        },
        [settings]
    );

    const saving = false;
    return (
        <form onSubmit={handleSubmit} className="w-full space-y-6 pb-24">
            <AdminInfoSection settings={settings} setSettings={setSettings} />
            <SiteIdentitySection settings={settings} setSettings={setSettings} />
            <Maintainance settings={settings} setSettings={setSettings} />
            <PreferenceSection settings={settings} setSettings={setSettings} />

            <div className="flex justify-end items-center">
                <Button type="submit" className="px-8 h-11 text-sm font-semibold" disabled={saving}>
                    {saving ? "Saving..." : "Save Changes"}
                </Button>
            </div>
        </form>
    );
};

export default GenereralSettingContentSection;
