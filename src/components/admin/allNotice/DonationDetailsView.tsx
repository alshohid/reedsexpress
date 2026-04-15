"use client";

import Image from "next/image";

type DonationDetailsViewProps = {
    sectionTitle?: string;
    funeralHomeLabel?: string;
    funeralHomeName?: string;
    deceasedNameLabel?: string;
    deceasedName?: string;
    amountLabel?: string;
    amount?: string;

    personName?: string;
    years?: string;
    location?: string;
    imageSrc?: string | null;

    obituaryTitle?: string;
    obituaryText?: string;

    reposingText?: string;
    funeralMassText?: string;

    onSeeCharity?: () => void;
    onViewCondolenceBook?: () => void;
    onEditReposing?: () => void;
    onEditFuneralMass?: () => void;
    isSeeCharityDisabled?: boolean;
    isViewCondolenceBookDisabled?: boolean;
};

export default function DonationDetailsView({
    sectionTitle = "Donation Details",
    funeralHomeLabel = "Funeral Home Name",
    funeralHomeName = "John Ryan’s Funeral Home",
    deceasedNameLabel = "Deceased Person’s Name",
    deceasedName = "Isabel Pérez (née Blanco)",
    amountLabel = "Donation Amount",
    amount = "€12,000",

    personName = "Isabel Pérez (née Blanco)",
    years = "1978-2025",
    location = "Norwich, Norfolk",
    imageSrc = "/images/profile_bw.jpg",

    obituaryTitle = "The death has occurred of Isabel Pérez (née Blanco)",
    obituaryText = `The death has occurred of Isabel Pérez (née Blanco) of Sabadell, Barcelona and formerly of Utrera, Seville. Isabel passed away peacefully on January 21st, 2026, surrounded by her loving family and under the exceptional care of the staff at Sabadell General Hospital.

Predeceased by her devoted husband Manuel, her beloved brothers Diego and Fernando, and her sister-in-law Elena. Isabel will be forever loved and deeply missed by her children Elena, Javier, and Alejandro; her cherished grandchildren Sofia, Mateo, and Lucas; and her daughter-in-law Carmen. She is further survived by her nieces, nephews, extended relatives, and a wide circle of friends and neighbours in both Sabadell and her native Utrera, where she was known for her kindness and dedication to her community.

May Her Gentle Soul Rest In Peace`,

    reposingText = `Isabel will be reposing at the Municipal Chapel of Sabadell on Friday, Jan 23rd, from 4:00PM to 8:00PM for those who wish to pay respects.`,
    funeralMassText = `The Funeral Mass will take place on Saturday, January 24th, at 11:00 AM in the Church of San Félix, Sabadell.`,

    onSeeCharity,
    onViewCondolenceBook,
    onEditReposing,
    onEditFuneralMass,
    isSeeCharityDisabled = false,
    isViewCondolenceBookDisabled = false,
}: DonationDetailsViewProps) {
    return (
        <section className="w-full space-y-5">

            <div className="w-full rounded-[0.75rem] ">
                <h3 className="text-[1.625rem] font-medium text-[#161721] mb-4">
                    {sectionTitle}
                </h3>

                <div className="grid gap-4 grid-cols-1 border border-[#E9E9EA] bg-white rounded-lg md:p-4 p-2">
                    <InfoRow label={funeralHomeLabel} value={funeralHomeName} />
                    <InfoRow label={deceasedNameLabel} value={deceasedName} />
                    <InfoRow label={amountLabel} value={amount} />
                </div>

                {/* Buttons row */}
                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <button
                        type="button"
                        onClick={onSeeCharity}
                        disabled={isSeeCharityDisabled}
                        className="
                        inline-flex items-center justify-center
                        rounded-[0.5rem]
                        px-6 py-3
                        text-[12px] font-medium text-white
                        bg-[linear-gradient(180deg,#394034_0%,#4F5747_100%)]
                        hover:opacity-90 transition
                        w-full sm:w-auto
                        sm:min-w-[12.6875rem]
                        disabled:cursor-not-allowed disabled:opacity-50
            "
                    >
                        See Charity
                    </button>

                    {/* Figma: width 12.6875rem, padding 1rem 1.5rem, radius 0.5, green grad */}
                    <button
                        type="button"
                        onClick={onViewCondolenceBook}
                        disabled={isViewCondolenceBookDisabled}
                        className="
              inline-flex items-center justify-center
              rounded-[0.5rem]
              px-6 py-3
              text-[12px] font-medium text-white
              bg-[linear-gradient(180deg,#394034_0%,#4F5747_100%)]
              hover:opacity-90 transition
              w-full sm:w-auto
              sm:min-w-[12.6875rem]
              disabled:cursor-not-allowed disabled:opacity-50
            "
                    >
                        View Condolence Book
                    </button>
                </div>
            </div>

            <div className="grid gap-5 md:grid-cols-[8fr_4fr] border border-[#E9E9EA] bg-white rounded-lg p-4">
                <div className="w-full flex flex-col items-center justify-center gap-6 p-6">
                    <div className="w-full max-w-[320px]">
                        <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#F8F7F8]
                    rounded-t-[999px] rounded-b-[14px]">
                            <Image
                                src={imageSrc || "/images/profile_bw.jpg"}
                                alt={personName}
                                fill
                                crossOrigin="anonymous"
                                unoptimized
                                className="object-cover object-center"
                                priority={false}
                            />
                        </div>
                    </div>

                    <div className="text-center">
                        <h4 className="text-[#708161] text-[2.25rem] font-medium">
                            {personName}
                        </h4>

                        <p className="mt-2 text-[1.25rem] text-[#708161]">{years}</p>

                        <div className="mt-2 flex items-center justify-center gap-2 text-[1.25rem] text-[#708161]">
                            <span className="inline-flex h-4 w-4 rounded-full bg-[#708161]" />
                            <span className="italic">{location}</span>
                        </div>
                    </div>
                </div>

                <div className="w-full rounded-[0.5rem] border border-[#E9E9EA] bg-white p-6 flex flex-col gap-6">
                    <div className=" text-[1rem] font-medium text-[#777980] whitespace-pre-line">
                        <span className="block  text-[1rem] font-medium text-[#777980] mb-2">
                            {obituaryTitle}
                        </span>
                        {obituaryText}
                    </div>

                    <div className="text-center text-[1.5rem] text-[#708161] font-semibold">
                        May Her Gentle Soul Rest In Peace
                    </div>

                    <div className="space-y-5 border-t border-[#E9E9EA] pt-5">
                        <InfoBlock
                            title="Reposing"
                            text={reposingText}
                            onEdit={onEditReposing}
                        />
                        <InfoBlock
                            title="Funeral Mass"
                            text={funeralMassText}
                            onEdit={onEditFuneralMass}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

function InfoRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-[10px] border-b border-[#F1F1F1] bg-white p-4">
            <div className="text-[1.125rem] text-[#1D1F2C]">{label}</div>
            <div className="mt-1 text-[1rem] font-medium text-[#777980]">{value}</div>
        </div>
    );
}

function InfoBlock({
    title,
    text,
    onEdit,
}: {
    title: string;
    text: string;
    onEdit?: () => void;
}) {
    return (
        <div>
            <div className="flex items-center justify-between gap-3">
                <h5 className="text-[1.5rem] font-medium text-[#708161]">{title}</h5>
                <button
                    type="button"
                    onClick={onEdit}
                    className="text-[11px] text-gray-400 hover:text-gray-700 transition"
                >
                    Edit
                </button>
            </div>
            <p className="mt-2 text-[1rem]  text-[#777980]">{text}</p>
        </div>
    );
}
