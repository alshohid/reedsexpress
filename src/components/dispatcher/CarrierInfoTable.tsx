

'use client';

import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';

import TablePagination from './TablePagination';
import CarrierDetailModal from './CarrierDetailModal';
import ReusableTable from '../tables/ReusableTable';
import { useRouter } from 'next/navigation';

type CarrierRow = {
  id: string;
  initials: string;
  company: string;
  dba: string;
  mc: string;
  plan: string;
  contact: string;
};

const carrierRows: CarrierRow[] = [
  {
    id: '02',
    initials: 'JM',
    company: 'Mason Delta LTD',
    dba: 'Mason Delta LTD',
    mc: '24234',
    plan: 'Basic Plan',
    contact: '+32 123423',
  },
  {
    id: '03',
    initials: 'JM',
    company: 'Truck inc',
    dba: 'Truck inc',
    mc: '24234',
    plan: 'Basic Plan',
    contact: '+32 123423',
  },
  {
    id: '04',
    initials: 'JM',
    company: 'Alpha LTD',
    dba: 'Alpha LTD',
    mc: '24234',
    plan: 'Basic Plan',
    contact: '+32 123423',
  },
  {
    id: '05',
    initials: 'JM',
    company: 'Truck inc',
    dba: 'Truck inc',
    mc: '24234',
    plan: 'Basic Plan',
    contact: '+32 123423',
  },
  {
    id: '06',
    initials: 'JM',
    company: 'Truck inc',
    dba: 'Truck inc',
    mc: '24234',
    plan: 'Basic Plan',
    contact: '+32 123423',
  },
  {
    id: '07',
    initials: 'JM',
    company: 'Truck inc',
    dba: 'Truck inc',
    mc: '24234',
    plan: 'Basic Plan',
    contact: '+32 123423',
  },
  {
    id: '08',
    initials: 'JM',
    company: 'Truck inc',
    dba: 'Truck inc',
    mc: '24234',
    plan: 'Basic Plan',
    contact: '+32 123423',
  },
];

const TABLE_HEADERS = [
  'ID',
  'Carriers',
  'DBA Name',
  'MC No.',
  'Pricing Plan',
  'Contact',
  '',
];

const ITEMS_PER_PAGE = 5;

export default function CarrierInfoTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<CarrierRow | null>(null);
   const router = useRouter();

   const handleViewCarrier = (carrierId: string) => {
     router.push(`/dispatcher/dashboard/carriers/${carrierId}?tab=overview`);
   };
  const totalPages = Math.ceil(carrierRows.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = carrierRows.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const rowRenderers = [
    // ID
    (row: CarrierRow) => (
      <span className="font-medium text-[#5B6170]">{row.id}</span>
    ),

    // Carriers (avatar + name)
    (row: CarrierRow) => (
      <div className="flex items-center gap-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F2F4F7] text-[10px] font-semibold text-[#6B7280]">
          {row.initials}
        </div>
        <span className="font-medium text-[#1F2937]">{row.company}</span>
      </div>
    ),

    // DBA Name
    (row: CarrierRow) => <span className="text-[#4B5563]">{row.dba}</span>,

    // MC No.
    (row: CarrierRow) => <span className="text-[#4B5563]">{row.mc}</span>,

    // Pricing Plan
    (row: CarrierRow) => (
      <span className="font-medium text-[#374151]">{row.plan}</span>
    ),

    // Contact
    (row: CarrierRow) => <span className="text-[#4B5563]">{row.contact}</span>,

    // Actions (⋯ button)
    (row: CarrierRow) => (
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => handleViewCarrier(row.id)}
          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[#6B7280] transition hover:bg-[#F8FAFC]"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>
    ),
  ];

  return (
    <>
      <ReusableTable<CarrierRow>
        tableHeader={TABLE_HEADERS}
        items={currentData}
        rowRenderers={rowRenderers}
        getRowKey={row => row.id}
        minTableWidthPx={800}
        emptyText="No carriers found"
      />

      {/* Pagination footer */}
      <div className="flex flex-col gap-4  px-4 py-4 md:flex-row md:items-center md:justify-between bg-white rounded-b-xl border-t border-[#EEF0F5]">
        <p className="text-sm text-[#2C3342]">
          Showing {startIndex + 1} to{' '}
          {Math.min(startIndex + ITEMS_PER_PAGE, carrierRows.length)} of{' '}
          {carrierRows.length} results
        </p>
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      <CarrierDetailModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}