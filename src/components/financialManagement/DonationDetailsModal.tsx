"use client";

import React from "react";
import { Modal } from "../ui/modal";
import { CharityIcon } from "@/src/icons";

interface DonationDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const DonationDetailsModal: React.FC<DonationDetailsModalProps> = ({
    isOpen,
    onClose,
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            className="max-w-[404px] p-3 lg:p-6 bg-[#F9F9F9] rounded-lg"
        >
            <div className="text-center mb-4">
                <div className="bg-green-100 p-4 rounded-full inline-block">
                    <CharityIcon />
                </div>
                <h3 className="text-lg font-semibold text-[#161721] mt-2">Donation Details</h3>
            </div>

            <div className="text-left space-y-4">
                <div className="flex justify-between">
                    <span className="font-medium text-[#4A4A4A]">Donor Name:</span>
                    <span className="text-[#161721]">John Ryan</span>
                </div>

                <div className="flex justify-between">
                    <span className="font-medium text-[#4A4A4A]">Donation Amount:</span>
                    <span className="text-[#161721]">€500</span>
                </div>

                <div className="flex justify-between">
                    <span className="font-medium text-[#4A4A4A]">Date:</span>
                    <span className="text-[#161721]">6 Jan, 2026</span>
                </div>

                <div className="flex justify-between">
                    <span className="font-medium text-[#4A4A4A]">Funeral House:</span>
                    <span className="text-[#161721]">John Ryan’s Funeral Home</span>
                </div>

                <div className="flex justify-between">
                    <span className="font-medium text-[#4A4A4A]">Charity To:</span>
                    <span className="text-[#161721]">British Heart Foundation</span>
                </div>

                <div className="flex justify-between">
                    <span className="font-medium text-[#4A4A4A]">Donation To:</span>
                    <span className="text-[#161721]">Isabel Pérez</span>
                </div>

                <div className="flex justify-between">
                    <span className="font-medium text-[#4A4A4A]">Location of the Descendent:</span>
                    <span className="text-[#161721]">United Kingdom</span>
                </div>
            </div>

            {/* Close button */}
            <div className="mt-6 flex justify-end">
                <button
                    onClick={onClose}
                    className="text-sm font-medium text-[#4CAF50] hover:text-[#388E3C] bg-transparent border-2 border-[#4CAF50] py-2 px-6 rounded-lg"
                >
                    Close
                </button>
            </div>
        </Modal>
    );
};

export default DonationDetailsModal;