"use client";

import { Modal } from "../../ui/modal";
import { X, Mail, AlertTriangle } from "lucide-react";
import { useState } from "react";

interface DeleteAccountModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSendCode?: (email: string) => void;
}

export default function DeleteAccountModal({ isOpen, onClose, onSendCode }: DeleteAccountModalProps) {
    const [email, setEmail] = useState("");

    const handleSend = () => {
        onSendCode?.(email);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="w-full max-w-[584px] rounded-xl border border-[#26344B] bg-[#111B23] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
                <h3 className="text-[#EE162A] text-base sm:text-lg font-semibold">Delete Account</h3>
                {/* <button type="button" onClick={onClose} className="h-10 w-10 rounded-lg bg-white/5 border border-white/10 grid place-items-center hover:bg-white/10 transition" aria-label="Close">
                    <X className="h-5 w-5 text-white/80" />
                </button> */}
            </div>

            <div className="h-px w-full bg-white/10" />

            {/* Body */}
            <div className="px-4 py-4 sm:px-6 sm:py-6">
                <h2 className="text-white text-lg sm:text-xl font-semibold leading-snug">Before this action, you need to verify</h2>

                <div className="mt-5 flex flex-col gap-2">
                    <label className="text-sm text-white/60">Enter your email</label>

                    <div className="w-full flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 focus-within:border-[#5B5CFF]/60">
                        <Mail className="h-5 w-5 text-white/40" />
                        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email..." className="w-full bg-transparent text-sm text-white placeholder:text-white/30 outline-none" />
                    </div>

                    <div className="mt-2 flex items-start gap-2 text-white/40">
                        <AlertTriangle className="h-4 w-4 mt-0.5 text-white/30" />
                        <p className="text-xs sm:text-sm">We will send a 6-digit code to email.</p>
                    </div>
                </div>
            </div>

            <div className="h-px w-full bg-white/10" />

            {/* Footer */}
            <div className="px-4 py-4 sm:px-6 sm:py-5 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3">
                <button type="button" onClick={onClose} className="w-full sm:w-auto min-w-[140px] inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/80 hover:bg-white/10 transition">
                    Cancel
                </button>

                <button type="button" onClick={handleSend} disabled={!email.trim()} className="w-full sm:w-auto min-w-[140px] inline-flex items-center justify-center rounded-lg bg-[#5B5CFF] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#4a4bff] transition disabled:opacity-50 disabled:cursor-not-allowed">
                    Send Code
                </button>
            </div>
        </Modal>
    );
}
