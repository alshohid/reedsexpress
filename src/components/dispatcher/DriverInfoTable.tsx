import { MoreHorizontal, Plus, Search } from 'lucide-react';
import { useState } from 'react';
import TablePagination from './TablePagination';

export default function DriverInfoTable() {
  const driverRows = [
    {
      name: 'James Clark',
      carrier: 'Truck Inc',
      truckNo: '30',
      trailerNo: '124',
      contact: '+32 23234',
      status: 'Active',
    },
    {
      name: 'Rodrigue',
      carrier: 'J Travel LLC',
      truckNo: '18',
      trailerNo: '214',
      contact: '+32 23234',
      status: 'Active',
    },
    {
      name: 'Carlos',
      carrier: 'Logic LTD',
      truckNo: '15',
      trailerNo: '435',
      contact: '+32 23234',
      status: 'Active',
    },
    {
      name: 'Ronaldo',
      carrier: 'Logic LTD',
      truckNo: '-',
      trailerNo: '-',
      contact: '+32 23234',
      status: 'Active',
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
      const itemsPerPage = 5;
    
      const totalPages = Math.ceil(driverRows.length / itemsPerPage);
    
      const startIndex = (currentPage - 1) * itemsPerPage;
      const currentData = driverRows.slice(
        startIndex,
        startIndex + itemsPerPage,
      );

  return (
    <>
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h2 className="text-[20px] font-semibold text-[#111827]">
          All Drivers
        </h2>

        <button className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#2F3E9E] px-4 text-sm font-medium text-white transition hover:opacity-95">
          <Plus className="h-4 w-4" />
          Add Driver
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
              <th className="border-b border-[#EEF0F5] px-4 py-3">Name</th>
              <th className="border-b border-[#EEF0F5] px-4 py-3">Carrier</th>
              <th className="border-b border-[#EEF0F5] px-4 py-3">Truck No.</th>
              <th className="border-b border-[#EEF0F5] px-4 py-3">
                Trailer No.
              </th>
              <th className="border-b border-[#EEF0F5] px-4 py-3">Contact</th>
              <th className="border-b border-[#EEF0F5] px-4 py-3">Status</th>
              <th className="border-b border-[#EEF0F5] px-4 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {currentData.map((row, index) => (
              <tr key={index} className="text-[13px] text-[#111827]">
                <td className="border-b border-[#F3F4F6] px-4 py-4 font-medium text-[#1F2937]">
                  {row.name}
                </td>

                <td className="border-b border-[#F3F4F6] px-4 py-4 text-[#4B5563]">
                  {row.carrier}
                </td>

                <td className="border-b border-[#F3F4F6] px-4 py-4 text-[#4B5563]">
                  {row.truckNo}
                </td>

                <td className="border-b border-[#F3F4F6] px-4 py-4 text-[#4B5563]">
                  {row.trailerNo}
                </td>

                <td className="border-b border-[#F3F4F6] px-4 py-4 text-[#4B5563]">
                  {row.contact}
                </td>

                <td className="border-b border-[#F3F4F6] px-4 py-4">
                  <span className="inline-flex rounded-full border border-[#7AD389] bg-[#EAFBF0] px-2 py-[2px] text-[11px] font-medium text-[#22A447]">
                    {row.status}
                  </span>
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
            {Math.min(startIndex + itemsPerPage, driverRows.length)} of{' '}
            {driverRows.length} results
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
