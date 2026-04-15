import CaseDetailsCard from "../card/CaseDetailsCard";
import AlertBanner from "../ui/AlertBanner";

export default function CommunityModerationContent() {
    return (
        <div className="space-y-4">
            <AlertBanner message="You have 2 case to resolve. Please take action" />
            <div className="grid  grid-cols-1 md:grid-cols-[6fr_6fr] lg:grid-cols-[4fr_4fr_4fr] gap-4 lg:gap-3">
                <CaseDetailsCard />
                <CaseDetailsCard />
                <CaseDetailsCard />
            </div>

        </div>
    );
}