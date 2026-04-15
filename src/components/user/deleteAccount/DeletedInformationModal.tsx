"use client";

import { Modal } from "../../ui/modal";
import { useRouter } from "next/navigation";
import { CheckCircle2, Clock3, Trash2, UserRound } from "lucide-react";

interface DeleteAccountInfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    redirectTo?: string; // default: "/auth/login"
}

export default function DeleteAccountInformationModal({
    isOpen,
    onClose,
    redirectTo = "/",
}: DeleteAccountInfoModalProps) {
    const router = useRouter();

    const goToRedirect = () => {
        onClose?.();
        router.push(redirectTo);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={goToRedirect}
            className="w-full max-w-[584px] rounded-xl border border-[#26344B] bg-[#111B23] overflow-hidden"
        >
            <section className="w-full p-5 sm:p-6 lg:p-8 flex flex-col gap-5">
                {/* Top icon */}
                <div className="w-full flex justify-center">
                    <div className="h-16 w-16 rounded-full bg-[#5B5CFF] flex items-center justify-center shadow-[0_8px_30px_rgba(91,92,255,0.25)]">
                        <UserRound className="h-8 w-8 text-white" />
                    </div>
                </div>

                {/* Title + description */}
                <div className="w-full text-center flex flex-col gap-2">
                    <h2 className="text-white text-xl sm:text-2xl font-semibold">Account Deleted</h2>
                    <p className="text-sm sm:text-[0.95rem] text-white/45 leading-relaxed">
                        Your account has been scheduled for deletion. You have <span className="text-white font-semibold">30 days</span> to recover your account
                        before all data is permanently removed from our servers.
                    </p>
                </div>

                {/* Timeline box */}
                <div className="w-full rounded-xl border border-[#26344B] bg-[#0B111B]/70 p-4 sm:p-5">
                    <div className="relative flex flex-col gap-4 pl-10">
                        {/* dotted line */}
                        <div className="absolute left-[14px] top-[14px] bottom-[14px] w-px border-l border-dashed border-white/15" />

                        {/* Item 1 */}
                        <div className="relative">
                            <div className="absolute -left-10 top-0 h-7 w-7 rounded-full bg-[#5B5CFF]/20 border border-[#5B5CFF]/45 flex items-center justify-center">
                                <CheckCircle2 className="h-4 w-4 text-[#5B5CFF]" />
                            </div>

                            <div className="flex flex-col gap-1">
                                <p className="text-white/90 font-semibold">Request Processed</p>
                                <p className="text-sm text-white/45">Account is now deactivated and hidden from public view</p>
                                <p className="text-xs text-white/35">Today</p>
                            </div>
                        </div>

                        {/* Item 2 */}
                        <div className="relative">
                            <div className="absolute -left-10 top-0 h-7 w-7 rounded-full bg-white/5 border border-white/15 flex items-center justify-center">
                                <Clock3 className="h-4 w-4 text-white/65" />
                            </div>

                            <div className="flex flex-col gap-1">
                                <p className="text-white/85 font-semibold">Grace Period Ends</p>
                                <p className="text-sm text-white/45">Final window to cancel the deletion request by logging back in.</p>
                                <p className="text-xs text-white/35">In 30 days</p>
                            </div>
                        </div>

                        {/* Item 3 */}
                        <div className="relative">
                            <div className="absolute -left-10 top-0 h-7 w-7 rounded-full bg-white/5 border border-white/15 flex items-center justify-center">
                                <Trash2 className="h-4 w-4 text-white/60" />
                            </div>

                            <div className="flex flex-col gap-1">
                                <p className="text-white/85 font-semibold">Permanent Removal</p>
                                <p className="text-sm text-white/45">All match history, ranks, and personal data will be deleted.</p>
                                <p className="text-xs text-white/35">Final deletion</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer note */}
                <p className="text-center text-sm text-white/45">
                    Changed your mind? Simply <span className="text-[#5B5CFF] font-semibold">log in</span> within 30 days to restore everything.
                </p>

                {/* CTA */}
                <button
                    type="button"
                    onClick={goToRedirect}
                    className="w-full rounded-lg bg-[#5B5CFF] hover:bg-[#4a4bff] transition text-white font-semibold py-2.5 text-sm"
                >
                    Cancel Deletion (Log in)
                </button>
            </section>
        </Modal>
    );
}
