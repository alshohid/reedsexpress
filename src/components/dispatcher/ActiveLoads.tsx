'use client';
import { useState, useMemo } from 'react';
import {
  Search,
  ChevronLeft,
  ChevronRight,
 
} from 'lucide-react';
import { DownCaretIcon, PickUpIcon } from '@/src/icons';

type LoadStatus = 'Pickup' | 'Delivered';

type Load = {
  id: string;
  date: string;
  pickupAddr: string;
  delivAddr: string;
  miles: number;
  pay: number;
  status: LoadStatus;
};

const loadsData: Load[] = [
  {
    id: 'RX-2847',
    date: '07/25/2025 at 3:20 PM',
    pickupAddr: '2201 Airway Blvd, TN 3398',
    delivAddr: '3900 rd, Atlanta, GA 30380',
    miles: 247,
    pay: 880,
    status: 'Pickup',
  },
  {
    id: 'RX-2847',
    date: '07/28/2025 at 3:20 PM',
    pickupAddr: '2201 Airway Blvd, TN 3398',
    delivAddr: '3900 rd, Atlanta, GA 30380',
    miles: 247,
    pay: 880,
    status: 'Pickup',
  },
  {
    id: 'RX-2847',
    date: '07/31/2026 at 3:20 PM',
    pickupAddr: '2201 Airway Blvd, TN 3398',
    delivAddr: '3900 rd, Atlanta, GA 30380',
    miles: 247,
    pay: 880,
    status: 'Delivered',
  },
  {
    id: 'RX-1920',
    date: '08/02/2026 at 1:00 PM',
    pickupAddr: '500 Commerce St, Dallas TX',
    delivAddr: '1200 Peach St, Atlanta GA',
    miles: 920,
    pay: 1250,
    status: 'Pickup',
  },
  {
    id: 'RX-3301',
    date: '08/05/2026 at 9:00 AM',
    pickupAddr: '77 Freight Ave, Memphis TN',
    delivAddr: '88 Harbor Dr, Savannah GA',
    miles: 512,
    pay: 760,
    status: 'Delivered',
  },
];

const PAGE_SIZE = 3;

const badgeClass: Record<LoadStatus, string> = {
  Delivered: 'border-green-200 bg-green-50 text-green-700',
  Pickup: 'border-orange-200 bg-orange-50 text-orange-600',
};

export function ActiveLoads() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'All' | LoadStatus>('All');
  const [sort, setSort] = useState<'Newest' | 'Oldest'>('Newest');
  const [page, setPage] = useState(1);

  const [openSort, setOpenSort] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);

  const filtered = useMemo(() => {
    let d = [...loadsData];

    if (query.trim()) {
      d = d.filter(l => l.id.toLowerCase().includes(query.toLowerCase()));
    }

    if (filter !== 'All') {
      d = d.filter(l => l.status === filter);
    }

    d.sort((a, b) =>
      sort === 'Newest'
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

    return d;
  }, [query, filter, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const cp = Math.min(page, totalPages);
  const items = filtered.slice((cp - 1) * PAGE_SIZE, cp * PAGE_SIZE);

  const start = filtered.length === 0 ? 0 : (cp - 1) * PAGE_SIZE + 1;
  const end = Math.min(cp * PAGE_SIZE, filtered.length);

  return (
    <>
      <h3 className="mb-1 text-[24px] font-semibold text-[#101828]">
        Active Loads
      </h3>

      <div className="overflow-hidden rounded-2xl border border-[#e8ecf4] bg-white">
        {/* header */}
        <div className=" border-[#f1f3f9] p-5">
          <div className="flex flex-wrap items-center gap-2">
            {/* search */}
            <label className="relative flex-1 basis-48 rounded-lg">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]"
              />

              <input
                value={query}
                onChange={e => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="Search by Id"
                className="h-9 w-full rounded-lg border border-[#dde0ea] bg-[#fafbff] pl-8 pr-3 text-sm outline-none focus:border-[#2E3A83]"
              />
            </label>

            {/* sort dropdown */}
            <div className="relative">
              <button
                onClick={() => setOpenSort(s => !s)}
                className="flex h-9 items-center gap-2 rounded-lg border border-[#dde0ea] px-3 text-sm hover:bg-[#f8faff]"
              >
                Sort
                <DownCaretIcon />
              </button>

              {openSort && (
                <div className="absolute right-0 mt-1 w-32 rounded-lg border bg-white shadow-md z-10">
                  {['Newest', 'Oldest'].map(s => (
                    <button
                      key={s}
                      onClick={() => {
                        setSort(s as 'Newest' | 'Oldest');
                        setOpenSort(false);
                      }}
                      className="block w-full px-3 py-2 text-left text-sm hover:bg-gray-50"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* filter dropdown */}
            <div className="relative">
              <button
                onClick={() => setOpenFilter(s => !s)}
                className="flex h-9 items-center gap-2 rounded-lg border border-[#dde0ea] px-3 text-sm hover:bg-[#f8faff]"
              >
                {filter}
                <DownCaretIcon />
              </button>

              {openFilter && (
                <div className="absolute right-0 mt-1 w-36 rounded-lg border bg-white shadow-md z-10">
                  {['All', 'Pickup', 'Delivered'].map(f => (
                    <button
                      key={f}
                      onClick={() => {
                        setFilter(f as 'All' | 'Pickup' | 'Delivered');
                        setPage(1);
                        setOpenFilter(false);
                      }}
                      className="block w-full px-3 py-2 text-left text-sm hover:bg-gray-50"
                    >
                      {f}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* list */}
        {items.map((load, i) => (
          <div
            key={i}
            className="rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-4 mx-4 mb-3 "
          >
            {/* top */}
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold text-[#111827] text-sm">
                  {load.id}
                </h4>
                <p className="text-xs text-[#9CA3AF]">Date: {load.date}</p>
              </div>

              <span
                className={`rounded-full border px-2.5 py-[2px] text-xs font-medium ${badgeClass[load.status]}`}
              >
                {load.status}
              </span>
            </div>

            {/* route section */}
            <div className="mt-4 flex items-center">
              {/* icon */}
              <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-white border">
                <PickUpIcon />
              </div>

              {/* pickup */}
              <div className="flex gap-4 justify-start mb-4">
                <div className="flex-1 border-r pr-4">
                  <p className="text-sm font-medium text-[#111827]">Pickup</p>
                  <p className="text-xs text-[#6B7280]">{load.pickupAddr}</p>
                </div>

                {/* delivery */}
                <div className="flex-1 pl-4 px-4">
                  <p className="text-sm font-medium text-[#111827]">Delivery</p>
                  <p className="text-xs text-[#6B7280] flex-1">{load.delivAddr}</p>
                </div>
              </div>
            </div>
            <hr />

            {/* bottom */}
            <div className="mt-4 flex items-center gap-2 text-xs text-[#374151] font-medium">
              <span>{load.miles} Miles</span>
              <span className="h-1 w-1 rounded-full bg-gray-300"></span>
              <span>${load.pay} Pay</span>
            </div>
          </div>
        ))}

        {/* pagination */}
        <div className="flex items-center justify-between border-t px-5 py-3">
          <p className="text-xs text-[#6b7280]">
            Showing {start} to {end} of {filtered.length} results
          </p>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              className="flex h-8 w-8 items-center justify-center rounded-lg border"
            >
              <ChevronLeft size={14} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`h-8 min-w-[32px] rounded-lg border ${
                  n === cp ? 'bg-[#2E3A83] text-white' : ''
                }`}
              >
                {n}
              </button>
            ))}

            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              className="flex h-8 w-8 items-center justify-center rounded-lg border"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
