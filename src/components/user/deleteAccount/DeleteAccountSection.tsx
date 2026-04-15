"use client";

import { Trash2, AlertTriangle } from "lucide-react";

type Props = {
    onDelete?: () => void;
};

export default function DeleteAccountSection({ onDelete }: Props) {
    return (
        <section className="w-full rounded-xl border border-[#26344B] bg-[#18222A] px-6 py-6 sm:px-10 sm:py-10 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <h2 className="text-[#EE162A] text-[1.125rem] sm:text-[1.25rem] font-semibold leading-[150%] tracking-[-0.025rem]">Permanently Delete Account</h2>
                <p className="text-sm text-white/40">This action cannot be undone.</p>
            </div>

            <div className="h-px w-full bg-white/10" />

            <div className="flex flex-col gap-2 text-sm text-white/70">
                <p className="text-white/70">You are about to delete your Game Arena account. By continuing, you will permanently lose:</p>
                <ul className="list-disc pl-5 space-y-1 text-white/60">
                    <li>All profile data and settings</li>
                    <li>Transaction history</li>
                    <li>Match history</li>
                    <li>Access to any purchased games</li>
                </ul>
            </div>

            <div className="w-full rounded-xl border border-[#26344B] bg-[#0B111B]/60 px-4 py-4 sm:px-6 sm:py-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-1">
                    <p className="text-[#EE162A] text-sm font-semibold">Danger Zone</p>
                    <p className="text-sm text-white/60">Permanently delete account</p>
                </div>

                <button type="button" onClick={onDelete} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-[#FF4935] bg-[#EE162A] px-6 py-2.5 text-xs font-semibold text-white shadow-[inset_0_0_0_1.8px_rgba(255,255,255,0.25)] hover:brightness-110 transition">
                    <Trash2 className="h-4 w-4" />
                    Delete Account
                </button>
            </div>

            <div className="w-full rounded-xl border border-[#F9C80E]/40 bg-[#FDC7001A] px-4 py-4 sm:px-6 sm:py-5 flex items-start gap-3">
                <div className="mt-0.5 grid place-items-center h-8 w-8 rounded-lg bg-[#FDC7001A] border border-[#F9C80E]/30">
                    <AlertTriangle className="h-4 w-4 text-[#F9C80E]" />
                </div>

                <p className="text-sm text-[#F9C80E]/90 leading-relaxed">
                    <span className="font-medium">Note:</span> You have a 30-day grace period from the date of deletion to recover your account. If you change your mind within this time, you can log in to restore all your data, including wallet and match history.
                </p>
            </div>
        </section>
    );
}
