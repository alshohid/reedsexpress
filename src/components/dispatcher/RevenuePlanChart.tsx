'use client';

import { DateRangeType } from '@/src/types/dispatcher/type';
import { Chart as ChartJS, ArcElement, Tooltip, ChartOptions } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';


ChartJS.register(ArcElement, Tooltip);

interface RevenuePlanChartProps {
  dateRange: DateRangeType;
}

const planDataMap: Record<
  DateRangeType,
  { basic: number; pro: number; enterprise: number }
> = {
  '7d': { basic: 35, pro: 45, enterprise: 20 },
  '30d': { basic: 43, pro: 42, enterprise: 15 },
  '60d': { basic: 40, pro: 38, enterprise: 22 },
};

export default function RevenuePlanChart({ dateRange }: RevenuePlanChartProps) {
  const planData = planDataMap[dateRange];

  const data = {
    labels: ['Basic', 'Pro', 'Enterprise'],
    datasets: [
      {
        data: [planData.basic, planData.pro, planData.enterprise],
        backgroundColor: ['#ffa4a6', '#7eceff', '#f29eff'],
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  const options: ChartOptions<'doughnut'> = {
    cutout: '62%',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#2F3441',
      },
    },
  };

  const legendItems = [
    { name: 'Basic', value: `${planData.basic}%`, color: '#ffa4a6' },
    { name: 'Pro', value: `${planData.pro}%`, color: '#7eceff' },
    { name: 'Enterprise', value: `${planData.enterprise}%`, color: '#f29eff' },
  ];

  return (
    <div className="rounded-2xl border border-[#E6EAF2] bg-white p-5">
      <h3 className="mb-5 mt-5 text-center text-[1rem] font-medium text-[#1F2430]">
        Revenue by Plan
      </h3>

      <div className="mx-auto h-auto w-[180px]">
        <Doughnut data={data} options={options} />
      </div>

      <div className="mt-6 space-y-3 w-[180px] flex flex-col justify-center  mx-auto" >
        {legendItems.map(item => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-[#5C6578]">
              <span
                className="h-2.5 w-3.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              {item.name}
            </div>
            <span className="text-sm font-semibold text-[#1F2430]">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
