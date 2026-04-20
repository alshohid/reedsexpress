import { DeleteIcon, Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';
import TablePagination from './TablePagination';
import { EditOptionIcon, TrashBinIcon } from '@/src/icons';
import TrailerDetailsModal from './carrier/TrailerDetailsModal';
import { AddTrailerFormData } from '@/src/types/dispatcher/type';
import AddTrailerModal from './carrier/AddTrailerModal';
import AddTrailerSuccessModal from './carrier/AddTrailerSuccessModal';

export default function TrailerInfoTable() {
  const trailerRows = [
    {
      unitNumber: '423',
      carrier: 'Truck Inc',
      type: 'Cargo',
      vin: '1312423413',
      status: 'Active',
    },
    {
      unitNumber: '235',
      carrier: 'J Travel LLC',
      type: 'Dry Van',
      vin: '124456345',
      status: 'Active',
    },
    {
      unitNumber: '234',
      carrier: 'Logic LTD',
      type: 'Flatbed',
      vin: '-',
      status: 'Active',
    },
    {
      unitNumber: '567',
      carrier: 'Freight Solutions',
      type: 'Reefer',
      vin: '987654321',
      status: 'Active',
    },
    {
      unitNumber: '890',
      carrier: 'Rapid Transport Co.',
      type: 'Intermodal',
      vin: '1122334455',
      status: 'Inactive',
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(trailerRows.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = trailerRows.slice(startIndex, startIndex + itemsPerPage);
  const [open, setOpen] = useState(false);
  
  const [isAddTrailerOpen, setIsAddTrailerOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const handleCreateTrailer = async (data: AddTrailerFormData) => {
    console.log('Trailer payload:', data);
  };

  return (
    <>
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h2 className="text-[20px] font-semibold text-[#111827]">
          All Trailer
        </h2>

        <button
          onClick={() => setIsAddTrailerOpen(true)}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#2F3E9E] px-4 text-sm font-medium text-white transition hover:opacity-95"
        >
          <Plus className="h-4 w-4" />
          Add Trailer
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
            <tr className="text-left text-[16px] font-medium text-[#8B8FA3]">
              <th className="border-b border-[#EEF0F5] px-4 py-3">
                Unit Number
              </th>
              <th className="border-b border-[#EEF0F5] px-4 py-3">Carrier</th>
              <th className="border-b border-[#EEF0F5] px-4 py-3">Type</th>
              <th className="border-b border-[#EEF0F5] px-4 py-3">VIN</th>
              <th className="border-b border-[#EEF0F5] px-4 py-3">Status</th>
              <th className="border-b border-[#EEF0F5] px-4 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {currentData.map((row, index) => (
              <tr key={index} className="text-[16px] text-[#111827]">
                <td className="border-b border-[#F3F4F6] px-4 py-4 font-medium text-[#4B5563]">
                  {row.unitNumber}
                </td>

                <td className="border-b border-[#F3F4F6] px-4 py-4 text-[#4B5563]">
                  {row.carrier}
                </td>

                <td className="border-b border-[#F3F4F6] px-4 py-4 text-[#4B5563]">
                  {row.type}
                </td>

                <td className="border-b border-[#F3F4F6] px-4 py-4 text-[#4B5563]">
                  {row.vin}
                </td>

                <td className="border-b border-[#F3F4F6] px-4 py-4">
                  <span
                    className={`inline-flex rounded-full px-2 py-[2px] text-[11px] font-medium ${
                      row.status === 'Active'
                        ? 'border border-[#7AD389] bg-[#EAFBF0] text-[#22A447]'
                        : 'border border-[#A7E3B4] bg-[#F1FFF5] text-[#4FAE68]'
                    }`}
                  >
                    {row.status}
                  </span>
                </td>

                <td className="border-b border-[#F3F4F6] px-4 py-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setOpen(true)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[#344054] transition hover:bg-[#F8FAFC]"
                    >
                      <EditOptionIcon />
                    </button>
                    <button className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[#FF5A5F] transition hover:bg-[#FFF5F5]">
                      <TrashBinIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex flex-col gap-4 bg-white px-4 py-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-[#2C3342]">
            Showing {startIndex + 1} to{' '}
            {Math.min(startIndex + itemsPerPage, trailerRows.length)} of{' '}
            {trailerRows.length} results
          </p>
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      <TrailerDetailsModal
        isOpen={open}
        onClose={() => setOpen(false)}
        data={{
          carrier: 'Ronaldo',
          unitNumber: 'T06-45',
          plateNumber: '',
          type: 'Logic LTD',
          plateState: '',
        }}
        onSave={updatedData => {
          console.log('Updated trailer data:', updatedData);
        }}
      />

      <AddTrailerModal
        isOpen={isAddTrailerOpen}
        onClose={() => setIsAddTrailerOpen(false)}
        onSuccess={() => setIsSuccessOpen(true)}
        onSubmit={handleCreateTrailer}
      />

      <AddTrailerSuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
      />
    </>
  );
}
