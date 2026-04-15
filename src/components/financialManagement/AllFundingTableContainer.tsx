import { useModal } from "@/src/hooks/useModal";
import AllFundingTable from "./AllFundingTable";
import FundraisingCard from "./FundraisingCard";

export default function AllFundingTableContainer() {
    const { isOpen: isViewModalOpen, openModal: openViewModal, closeModal: closeViewModal } = useModal()
    return (
        <div className="w-full space-y-6">
            <FundraisingCard
                amountRaised="€90,000"
                onTransferFunds={() => console.log("Transfer funds triggered")}
            />
            <AllFundingTable />


        </div>
    )
}