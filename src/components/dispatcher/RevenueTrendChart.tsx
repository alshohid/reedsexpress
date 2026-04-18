'use client';

import { DateRangeType } from '@/src/types/dispatcher/type';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  type ChartData,
  type ChartOptions,
  type TooltipItem,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
);

interface RevenueTrendChartProps {
  dateRange: DateRangeType;
}

const chartMap: Record<
  DateRangeType,
  {
    labels: string[];
    values: number[];
  }
> = {
  '7d': {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    values: [12000, 18000, 15000, 22000, 21000, 26000, 28000],
  },
  '30d': {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    values: [45000, 52000, 48000, 61000, 56000, 68000],
  },
  '60d': {
    labels: [
      'Week 1',
      'Week 2',
      'Week 3',
      'Week 4',
      'Week 5',
      'Week 6',
      'Week 7',
      'Week 8',
    ],
    values: [22000, 26000, 24000, 30000, 34000, 32000, 36000, 39000],
  },
};

export default function RevenueTrendChart({
  dateRange,
}: RevenueTrendChartProps) {
  const selected = chartMap[dateRange];

  const data: ChartData<'line', number[], string> = {
    labels: selected.labels,
    datasets: [
      {
        label: 'Revenue',
        data: selected.values,
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.12)',
        fill: true,
        tension: 0.45,
        pointRadius: 3,
        pointHoverRadius: 5,
        pointBackgroundColor: '#3B82F6',
        pointBorderWidth: 0,
      },
    ],
  };

  const maxValue = Math.max(...selected.values);
  const yMax = Math.ceil(maxValue / 10000) * 10000;

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#2F3441',
        padding: 10,
        displayColors: false,
        callbacks: {
          label: (context: TooltipItem<'line'>) => {
            const y = context.parsed.y ?? 0;
            return `Revenue  $${y.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: '#E8ECF4',
        },
        ticks: {
          color: '#8A94A6',
          font: {
            size: 11,
          },
        },
      },
      y: {
        min: 0,
        max: yMax,
        ticks: {
          stepSize: yMax / 4,
          color: '#8A94A6',
          font: {
            size: 11,
          },
          callback: (tickValue: string | number) => {
            return Number(tickValue).toLocaleString();
          },
        },
        grid: {
          color: '#E8ECF4',
        },
      },
    },
    elements: {
      line: {
        borderWidth: 1.5,
      },
    },
  };

  return (
    <div className="rounded-2xl border border-[#E6EAF2] bg-white p-5">
      <h3 className="mb-4 text-sm font-medium text-[#1F2430]">Revenue Trend</h3>
      <div className="h-80">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
