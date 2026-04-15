"use client";

import Image from "next/image";
import { Modal } from "../../ui/modal";

interface ViewMessageModalProps {
    isOpen: boolean;
    onClose: () => void;

    message: string;
    userName?: string;
    avatarUrl?: string;
}

export default function ViewMessageModal({
    isOpen,
    onClose,
    message,
    userName = "Jenny Wilson",
    avatarUrl = "/images/user/user-01.jpg",
}: ViewMessageModalProps) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            className="
        w-[min(560px,calc(100vw-24px))]
        rounded-[18px]
        bg-white
        p-6 sm:p-8
        shadow-[0_20px_60px_rgba(0,0,0,0.35)]
      "
        >
            <div className="flex items-start gap-4">
                {/* Avatar */}
                <Image
                    src={avatarUrl}
                    alt={userName}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-cover border border-black/10"
                />

                <div className="min-w-0 flex-1">
                    {/* Name */}
                    <h3 className="text-[18px] sm:text-[20px] font-semibold text-[#111827]">
                        {userName}
                    </h3>

                    {/* Message */}
                    <p className="mt-4 text-[14px] sm:text-[15px] leading-7 text-[#374151] whitespace-pre-line">
                        {`"${message}"`}
                    </p>
                </div>
            </div>
        </Modal>
    );
}