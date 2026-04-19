import { MoreHorizontal, Plus, Search } from 'lucide-react';
import { useState } from 'react';
import TablePagination from './TablePagination';

export default function TruckInfoTable() {
  const truckRows = [
    {
      unitNumber: '32',
      carrier: 'Truck Inc',
      makeModel: 'Ford',
      vin: '1312423413',
      unitLabel: '101 or T-45',
    },
    {
      unitNumber: '33',
      carrier: 'J Travel LLC',
      makeModel: 'Volvo',
      vin: '124456345',
      unitLabel: '101 or T-46',
    },
    {
      unitNumber: '34',
      carrier: 'Logic LTD',
      makeModel: 'Scania',
      vin: '-',
      unitLabel: '101 or T-47',
    },
    {
      unitNumber: '35',
      carrier: 'Global Movers',
      makeModel: 'Mercedes',
      vin: '5678901234',
      unitLabel: '101 or T-48',
    },
    {
      unitNumber: '36',
      carrier: 'Eco Transport',
      makeModel: 'Iveco',
      vin: '7890123456',
      unitLabel: '101 or T-49',
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(truckRows.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = truckRows.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h2 className="text-[20px] font-semibold text-[#111827]">All Truck</h2>

        <button className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#2F3E9E] px-4 text-sm font-medium text-white transition hover:opacity-95">
          <Plus className="h-4 w-4" />
          Add Truck
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
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-0 text-sm">
          <thead>
            <tr className="text-left text-[11px] font-medium text-[#8B8FA3]">
              <th className="border-b border-[#EEF0F5] px-4 py-3">
                Unit Number
              </th>
              <th className="border-b border-[#EEF0F5] px-4 py-3">Carrier</th>
              <th className="border-b border-[#EEF0F5] px-4 py-3">
                Make/Model
              </th>
              <th className="border-b border-[#EEF0F5] px-4 py-3">VIN</th>
              <th className="border-b border-[#EEF0F5] px-4 py-3">
                Unit Number
              </th>
              <th className="border-b border-[#EEF0F5] px-4 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {currentData.map((row, index) => (
              <tr key={index} className="text-[13px] text-[#111827]">
                <td className="border-b border-[#F3F4F6] px-4 py-4 font-medium text-[#4B5563]">
                  {row.unitNumber}
                </td>

                <td className="border-b border-[#F3F4F6] px-4 py-4 text-[#4B5563]">
                  {row.carrier}
                </td>

                <td className="border-b border-[#F3F4F6] px-4 py-4 text-[#4B5563]">
                  {row.makeModel}
                </td>

                <td className="border-b border-[#F3F4F6] px-4 py-4 text-[#4B5563]">
                  {row.vin}
                </td>

                <td className="border-b border-[#F3F4F6] px-4 py-4 text-[#4B5563]">
                  {row.unitLabel}
                </td>

                <td className="border-b border-[#F3F4F6] px-4 py-4">
                  <button className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[#6B7280] transition hover:bg-[#F8FAFC]">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex flex-col gap-4 bg-white px-4 py-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-[#2C3342]">
            Showing {startIndex + 1} to{' '}
            {Math.min(startIndex + itemsPerPage, truckRows.length)} of{' '}
            {truckRows.length} results
          </p>
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </>
  );
}
