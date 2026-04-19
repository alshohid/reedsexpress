
'use client';

export type TabItem<T extends string = string> = {
  key: T;
  label: string;
};

type TopTabsProps<T extends string> = {
  tabs: TabItem<T>[];
  activeKey: T;
  onChange: (key: T) => void;

  className?: string;
  activeColorClassName?: string;
  inactiveColorClassName?: string;
};

export default function TopTabs<T extends string>({
  tabs,
  activeKey,
  onChange,
  className = '',
  // Updated defaults to match your new design
  activeColorClassName = 'bg-[#313E8C] text-white',
  inactiveColorClassName = 'text-[#3C4353] hover:bg-white',
}: TopTabsProps<T>) {
  return (
    /* The outer container: light gray background, rounded corners, thin border */
    <div
      className={`flex w-full rounded-2xl border border-[#E6EAF2] bg-[#F7F8FC] p-1 ${className}`}
    >
      {tabs.map(t => {
        const active = activeKey === t.key;

        return (
          <button
            key={t.key}
            type="button"
            onClick={() => onChange(t.key)}
            className={[
              'flex-1 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200',
              active ? activeColorClassName : inactiveColorClassName,
            ].join(' ')}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}


