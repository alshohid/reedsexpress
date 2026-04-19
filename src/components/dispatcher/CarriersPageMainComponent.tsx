'use client';

import { useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  Search,
  Plus,
} from 'lucide-react';
import TopTabs, { TabItem } from '@/src/components/common/TopTabs';
import CarrierInfoTable from './CarrierInfoTable';
import DriverInfoTable from './DriverInfoTable';
import TruckInfoTable from './TruckInfoTable';
import TrailerInfoTable from './TrailerInfoTable';

type CarrierTabType = 'carrier-info' | 'drivers' | 'trucks' | 'trailers';

const CARRIER_TABS: TabItem<CarrierTabType>[] = [
  { key: 'carrier-info', label: 'Carrier Info' },
  { key: 'drivers', label: 'Drivers' },
  { key: 'trucks', label: 'Trucks' },
  { key: 'trailers', label: 'Trailers' },
];

export default function CarriersPageMainComponent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeTab =
    (searchParams.get('tab') as CarrierTabType) || 'carrier-info';

  const handleTabChange = (key: CarrierTabType) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', key);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

   const handleAddCarrier = () => {
     router.push('/dispatcher/dashboard/carriers/add-carrier');
   };

  return (
    <main className="min-h-screen">
      <section className="space-y-4">
        <TopTabs
          tabs={CARRIER_TABS}
          activeKey={activeTab}
          onChange={handleTabChange}
        />

        <div className="rounded-2xl border border-[#E9EDF5] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)] md:p-5">
          {activeTab === 'carrier-info' && (
            <>
              <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <h2 className="text-[20px] font-semibold text-[#111827]">
                  All Carrier
                </h2>

                <button
                  onClick={handleAddCarrier}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#2F3E9E] px-4 text-sm font-medium text-white transition hover:opacity-95"
                >
                  <Plus className="h-4 w-4" />
                  Add Carrier
                </button>
              </div>

              <div className="mb-4">
                <div className="relative w-full">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
                  <input
                    type="text"
                    placeholder="Search by name / MC No."
                    className="h-11 w-full rounded-xl border border-[#E5E7EB] bg-white pl-11 pr-4 text-sm text-[#111827] outline-none placeholder:text-[#9CA3AF] focus:border-[#C7D2FE]"
                  />
                </div>
              </div>

              <div className="rounded-xl border border-[#EEF0F5]">
                <CarrierInfoTable />
              </div>
            </>
          )}

          {activeTab === 'drivers' && <DriverInfoTable />}
          {activeTab === 'trucks' && <TruckInfoTable />}
          {activeTab === 'trailers' && <TrailerInfoTable />}
        </div>
      </section>
    </main>
  );
}
