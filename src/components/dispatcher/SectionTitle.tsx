interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div>
      <h2 className="text-[18px] font-semibold text-[#1F2430] md:text-[20px]">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-1 text-sm text-[#8A94A6]">{subtitle}</p>
      ) : null}
    </div>
  );
}
