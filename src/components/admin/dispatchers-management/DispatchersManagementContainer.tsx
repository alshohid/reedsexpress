import PendingInvitation from "./PendingInvitation";
import DispatchersTableSection from "./DispatchersTableSection";

export default function DispatchersManagementContainer() {
    return (
        <div className="flex flex-col gap-6">
            <PendingInvitation />
            <DispatchersTableSection />
        </div>
    )
}