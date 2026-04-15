"use client";


import { ArrowRightIcon } from "lucide-react";
import { CharityIcon } from "@/src/icons";

type FundraisingCardProps = {
    amountRaised: string;
    onTransferFunds?: () => void;
};

export default function FundraisingCard({
    amountRaised = "€90,000",
    onTransferFunds,
}: FundraisingCardProps) {
    return (
        <section className="w-full rounded-[12px] bg-[#F5FFEE] px-6 py-4 flex justify-between items-center">
            <div className="flex flex-col gap-2">
                <p className="text-lg font-medium text-[#1D1F2C]">
                    You’ve raised {amountRaised} So far!
                </p>
                <button
                    onClick={onTransferFunds}
                    className="flex items-center gap-2 text-sm font-medium text-[#3F4A3B] hover:underline"
                >
                    <span>Transfer Fund to Charity</span>
                    <ArrowRightIcon />
                </button>
            </div>

            <CharityIcon />
        </section>
    );
}