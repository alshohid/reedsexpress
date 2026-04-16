import { ActiveLoads } from '@/src/components/dispatcher/ActiveLoads';
import { StatsCards } from '@/src/components/dispatcher/StatCards';
import React from 'react'

export default function DispatcherDashboardPage() {
  return (
    <div className="mx-auto flex  flex-col gap-5 p-4">
      <StatsCards />
      <ActiveLoads />
    </div>
  );
}
