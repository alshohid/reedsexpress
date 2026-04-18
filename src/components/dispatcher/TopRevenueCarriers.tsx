'use client';

const carriers = [
  {
    rank: '#1',
    name: 'Express Cargo Services',
    plan: 'Basic',
    amount: '$599',
    loads: 89,
  },
  {
    rank: '#2',
    name: 'Global Dispatch Solutions',
    plan: 'Pro',
    amount: '$590',
    loads: 89,
  },
  {
    rank: '#3',
    name: 'Swift Freight Solutions',
    plan: 'Basic',
    amount: '$499',
    loads: 89,
  },
  {
    rank: '#4',
    name: 'Metro Dispatch Services',
    plan: 'Enterprise',
    amount: '$456',
    loads: 89,
  },
  {
    rank: '#5',
    name: 'Express Cargo Services',
    plan: 'Basic',
    amount: '$400',
    loads: 89,
  },
];

export default function TopRevenueCarriers() {
  return (
    <div className="rounded-2xl border border-[#E6EAF2] bg-white p-5">
      <h3 className="text-[24px] font-semibold text-[#1F2430] mb-4">
        Top Revenue Carriers
      </h3>

      <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
        {carriers.map(carrier => (
          <div
            key={carrier.rank}
            className="flex items-center justify-between rounded-xl bg-[#F5F6FA] px-4 py-3"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8ECF5] text-xs font-semibold text-[#2e3a83]">
                {carrier.rank}
              </div>

              <div>
                <p className="text-sm font-medium text-[#1F2430]">
                  {carrier.name}
                </p>
                <p className="text-xs text-[#8A94A6]">{carrier.plan}</p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-[15px] font-semibold text-[#1F2430]">
                {carrier.amount}{' '}
                <span className="text-xs font-normal text-[#8A94A6]">
                  /month
                </span>
              </p>
              <p className="text-xs text-[#8A94A6]">{carrier.loads} loads</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
