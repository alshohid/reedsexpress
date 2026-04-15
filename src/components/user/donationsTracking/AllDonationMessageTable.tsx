"use client";

import { useModal } from "@/src/hooks/useModal";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ViewMessageModal from "./ViewMessageModal";

type MessageRow = {
    id: number;
    userName: string;
    avatar: string;
    deceasedPerson: string;
    charityAssigned: string;
    date: string;
};

const MOCK: MessageRow[] = [
    {
        id: 1,
        userName: "Jenny Wilson",
        avatar: "/images/user/user_01.png",
        deceasedPerson: "Rodríguez, Elena",
        charityAssigned: "British Heart Foundation",
        date: "02/1/26",
    },
    {
        id: 2,
        userName: "Kurt Bates",
        avatar: "/images/user/user_02.png",
        deceasedPerson: "Rodríguez, Elena",
        charityAssigned: "RNLI - Royal National Lifeboat Institution",
        date: "02/1/26",
    },
    {
        id: 3,
        userName: "Rodger Struck",
        avatar: "/images/user/user_03.png",
        deceasedPerson: "Rodríguez, Elena",
        charityAssigned: "NSPCC",
        date: "02/1/26",
    },
    {
        id: 4,
        userName: "Kurt Bates",
        avatar: "/images/user/user_04.png",
        deceasedPerson: "Rodríguez, Elena",
        charityAssigned: "Global Green Hospice",
        date: "02/1/26",
    },
    {
        id: 5,
        userName: "John Dukes",
        avatar: "/images/user/user_05.png",
        deceasedPerson: "Rodríguez, Elena",
        charityAssigned: "Maritime Veterans Fund",
        date: "02/1/26",
    },
    {
        id: 6,
        userName: "Joshua Jones",
        avatar: "/images/user/user_01.png",
        deceasedPerson: "Rodríguez, Elena",
        charityAssigned: "Peace & Rest Foundation",
        date: "02/1/26",
    },
    {
        id: 7,
        userName: "Dennis Callis",
        avatar: "/images/user/user_02.png",
        deceasedPerson: "Rodríguez, Elena",
        charityAssigned: "Urban Wildlife Sanctuary",
        date: "02/1/26",
    },
    {
        id: 8,
        userName: "Kurt Bates",
        avatar: "/images/user/user_03.png",
        deceasedPerson: "Rodríguez, Elena",
        charityAssigned: "Cancer Research UK",
        date: "02/1/26",
    },
];

function DotsIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm7 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM5 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                fill="currentColor"
            />
        </svg>
    );
}

function FilterIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M4 5h16M7 12h10M10 19h4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
        </svg>
    );
}

function DownloadIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M12 3v10"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
            <path
                d="M8.5 10.5L12 13.9l3.5-3.4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M5 17.5c0 1.4 1.1 2.5 2.5 2.5h9c1.4 0 2.5-1.1 2.5-2.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
        </svg>
    );
}

export default function AllDonationMessageTable() {
    const { isOpen: isMessageModalOpen, openModal: openMessageModal, closeModal: closeMessageModal } = useModal()
    const [openId, setOpenId] = useState<number | null>(null);
    const menuRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            if (!menuRef.current) return;
            if (!menuRef.current.contains(e.target as Node)) setOpenId(null);
        };
        document.addEventListener("mousedown", onClick);
        return () => document.removeEventListener("mousedown", onClick);
    }, []);

    return (
        <div className="w-full">
            <div className="mb-3 flex items-center justify-end gap-3">
                <button
                    type="button"
                    className="inline-flex items-center gap-2 text-[14px] text-gray-700 hover:text-gray-900"
                >
                    <FilterIcon />
                    Filters
                </button>

                <button
                    type="button"
                    className="
            inline-flex items-center gap-2
            rounded-lg border border-gray-200 bg-white
            px-3 py-2 text-[14px] text-gray-700
            hover:bg-gray-50 transition
          "
                >
                    <DownloadIcon />
                    Export
                </button>
            </div>

            {/* ✅ Table */}
            <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[980px] border-separate border-spacing-0">
                    <thead>
                        <tr className="bg-[#3F4A3B]">
                            {["User Name", "Deceased Person", "Charity Assigned", "Date", "See Message"].map((h) => (
                                <th
                                    key={h}
                                    className="px-4 py-3 text-left text-[14px] font-medium text-white/90 first:rounded-l-[6px] last:rounded-r-[6px]"
                                >
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {MOCK.map((row, idx) => (
                            <tr key={row.id} className={idx % 2 ? "bg-[#FAFAFA]" : "bg-white"}>
                                <td className="px-4 py-4">
                                    <div className="flex items-center gap-3">
                                        <Image
                                            src={row.avatar}
                                            alt={row.userName}
                                            width={40}
                                            height={40}
                                            className="rounded-full object-cover border border-black/10"
                                        />
                                        <span className="text-[14px] font-semibold text-[#111827]">
                                            {row.userName}
                                        </span>
                                    </div>
                                </td>

                                {/* Deceased */}
                                <td className="px-4 py-4 text-[14px] text-[#4A4C56]">
                                    {row.deceasedPerson}
                                </td>

                                {/* Charity */}
                                <td className="px-4 py-4 text-[14px] text-[#4A4C56]">
                                    {row.charityAssigned}
                                </td>

                                {/* Date */}
                                <td className="px-4 py-4 text-[14px] text-[#4A4C56]">
                                    {row.date}
                                </td>

                                {/* Action */}
                                <td className="px-4 py-4 relative">
                                    <button
                                        type="button"
                                        onClick={() => setOpenId((v) => (v === row.id ? null : row.id))}
                                        className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-700 hover:bg-gray-100 transition"
                                        aria-label="Actions"
                                    >
                                        <DotsIcon />
                                    </button>

                                    {openId === row.id && (
                                        <div
                                            ref={menuRef}
                                            className="
                                            absolute right-6 top-[52px] z-[50]
                                            w-[170px]
                                            rounded-lg border border-[#E9E9EA] bg-white
                                            shadow-[0_11px_30px_rgba(0,0,0,0.16)]
                                            overflow-hidden
                                        "
                                        >
                                            <button onClick={() => openMessageModal()} className="w-full text-left px-4 py-2 text-[12px] text-gray-700 hover:bg-gray-50">
                                                View Message
                                            </button>
                                            <button className="w-full text-left px-4 py-2 text-[12px] text-gray-700 hover:bg-gray-50">
                                                Take Action
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ✅ Pagination */}
            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
                <button className="inline-flex items-center gap-2 rounded-lg border border-[#708161] bg-[#E7F2DD] px-5 py-2 text-[12px] font-medium text-[#3F4A3B] hover:opacity-90">
                    ← Next
                </button>

                <div className="flex items-center gap-2">
                    {[1, 2, 3].map((n) => (
                        <button
                            key={n}
                            className={[
                                "h-9 w-9 rounded-lg text-[12px] font-medium",
                                n === 1 ? "bg-[#3F4A3B] text-white" : "text-gray-600 hover:bg-gray-100",
                            ].join(" ")}
                        >
                            {n}
                        </button>
                    ))}
                    <span className="px-2 text-gray-400">...</span>
                    {[8, 9, 10].map((n) => (
                        <button
                            key={n}
                            className="h-9 w-9 rounded-lg text-[12px] font-medium text-gray-600 hover:bg-gray-100"
                        >
                            {n}
                        </button>
                    ))}
                </div>

                <button className="inline-flex items-center gap-2 rounded-lg bg-[#3F4A3B] px-5 py-2 text-[12px] font-medium text-white hover:opacity-90">
                    Next →
                </button>
            </div>
            <ViewMessageModal
                isOpen={isMessageModalOpen}
                onClose={closeMessageModal}
                userName="Jenny Wilson"
                avatarUrl="/images/user/user_01.png"
                message="Elena was the heart of our street for over thirty years. I will never forget how she greeted every child by name and always had a kind word for everyone she met. Her garden was her pride, but her family was her joy. We are deeply saddened by this loss and hope this small contribution helps the cause she cared so much about. Rest in peace, dear friend."

            />
        </div>
    );
}