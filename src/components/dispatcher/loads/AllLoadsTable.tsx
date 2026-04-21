'use client';
import React, { useState } from 'react';
import {
  Search,
  ChevronDown,
  MoreHorizontal,
 
} from 'lucide-react';
import { DownCaretIcon } from '@/src/icons';
import TablePagination from '../TablePagination';
import { useRouter } from 'next/navigation';


const LOADS_DATA = [
  {
    id: '20241215-5-001',
    assignedTo: 'James Mad',
    rate: '$2,500',
    address: 'Los Angeles, CA',
    date: '2024-03-29',
    status: 'Delivered',
  },
  {
    id: '20241215-5-002',
    assignedTo: 'James Mad',
    rate: '$2,500',
    address: 'Seattle, WA',
    date: '2024-03-29',
    status: 'Assigned',
  },
  {
    id: '20241215-5-093',
    assignedTo: 'James Mad',
    rate: '$2,500',
    address: 'Miami, FL',
    date: '2024-03-29',
    status: 'Completed',
  },
  {
    id: '20241215-5-084',
    assignedTo: 'James Mad',
    rate: '$2,500',
    address: 'Portland, OR',
    date: '2024-03-29',
    status: 'Completed',
  },
  {
    id: '20241215-5-075',
    assignedTo: 'James Mad',
    rate: '$2,500',
    address: 'Charlotte, NC',
    date: '2024-03-29',
    status: 'Pickup',
  },
  {
    id: '20241215-5-073',
    assignedTo: 'James Mad',
    rate: '$2,500',
    address: 'Miami, FL',
    date: '2024-03-29',
    status: 'Completed',
  },
  {
    id: '20241215-5-064',
    assignedTo: 'James Mad',
    rate: '$2,500',
    address: 'Portland, OR',
    date: '2024-03-29',
    status: 'Completed',
  },
  {
    id: '20241215-5-065',
    assignedTo: 'James Mad',
    rate: '$2,500',
    address: 'Charlotte, NC',
    date: '2024-03-29',
    status: 'Pickup',
  },
  {
    id: '20241215-5-063',
    assignedTo: 'James Mad',
    rate: '$2,500',
    address: 'Miami, FL',
    date: '2024-03-29',
    status: 'Completed',
  },
  {
    id: '20241215-5-054',
    assignedTo: 'James Mad',
    rate: '$2,500',
    address: 'Portland, OR',
    date: '2024-03-29',
    status: 'Completed',
  },
  {
    id: '20241215-5-055',
    assignedTo: 'James Mad',
    rate: '$2,500',
    address: 'Charlotte, NC',
    date: '2024-03-29',
    status: 'Pickup',
  },
  {
    id: '20241215-5-033',
    assignedTo: 'James Mad',
    rate: '$2,500',
    address: 'Miami, FL',
    date: '2024-03-29',
    status: 'Completed',
  },
  {
    id: '20241215-5-034',
    assignedTo: 'James Mad',
    rate: '$2,500',
    address: 'Portland, OR',
    date: '2024-03-29',
    status: 'Completed',
  },
  {
    id: '20241215-5-035',
    assignedTo: 'James Mad',
    rate: '$2,500',
    address: 'Charlotte, NC',
    date: '2024-03-29',
    status: 'Pickup',
  },
  {
    id: '20241215-5-013',
    assignedTo: 'James Mad',
    rate: '$2,500',
    address: 'Miami, FL',
    date: '2024-03-29',
    status: 'Completed',
  },
  {
    id: '20241215-5-014',
    assignedTo: 'James Mad',
    rate: '$2,500',
    address: 'Portland, OR',
    date: '2024-03-29',
    status: 'Completed',
  },
  {
    id: '20241215-5-015',
    assignedTo: 'James Mad',
    rate: '$2,500',
    address: 'Charlotte, NC',
    date: '2024-03-29',
    status: 'Pickup',
  },
  {
    id: '20241215-5-023',
    assignedTo: 'James Mad',
    rate: '$2,500',
    address: 'Miami, FL',
    date: '2024-03-29',
    status: 'Completed',
  },
  {
    id: '20241215-5-024',
    assignedTo: 'James Mad',
    rate: '$2,500',
    address: 'Portland, OR',
    date: '2024-03-29',
    status: 'Completed',
  },
  {
    id: '20241215-5-025',
    assignedTo: 'James Mad',
    rate: '$2,500',
    address: 'Charlotte, NC',
    date: '2024-03-29',
    status: 'Pickup',
  },
];

export function AllLoadsTable() {
 
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
 const handleViewLoad = (id: string) => {
   router.push(`/dispatcher/dashboard/loads/${id}?tab=details`);
 };

 const handleEditLoad = (id: string) => {
   router.push(`/dispatcher/dashboard/loads/${id}?tab=details&edit=true`);
 };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-50 text-green-600 border-green-200';
      case 'Assigned':
        return 'bg-orange-50 text-orange-400 border-orange-200';
      case 'Completed':
        return 'bg-green-50 text-green-500 border-green-100';
      case 'Pickup':
        return 'bg-yellow-50 text-yellow-600 border-yellow-200';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const totalPages = Math.ceil(LOADS_DATA.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = LOADS_DATA.slice(startIndex, startIndex + itemsPerPage);
    const router = useRouter();

    const handleNavigation = () => {
      // Navigates to your "Create New Load" page
      router.push('/dispatcher/dashboard/loads/new-loads');
    };
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[24px] font-bold text-gray-900">All Loads</h2>
        <button
          onClick={handleNavigation}
          className="bg-[#2B3674] text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-[#1e2756] transition-all"
        >
          + Add New Load
        </button>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search by name / category / Id"
            className="w-full h-12 pl-11 pr-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-indigo-500 text-sm"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-100 rounded-xl text-sm font-semibold text-gray-600 bg-white">
          Status <DownCaretIcon />
        </button>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-100 rounded-xl text-sm font-semibold text-gray-600 bg-white">
          Newest <DownCaretIcon />
        </button>
      </div>

      <div className="overflow-x-auto border rounded-2xl">
        <table className="w-full text-[1rem] text-left ">
          <thead className="text-gray-400 font-medium border-b border-gray-200">
            <tr>
              <th className="px-4 py-3">Load Number</th>
              <th className="px-4 py-3">Assigned To</th>
              <th className="px-4 py-3">Rate/Mile ($)</th>
              <th className="px-4 py-3">Delivery Address</th>
              <th className="px-4 py-3">Pickup Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((load, index) => (
              <tr
                key={load.id}
                className="border-b border-gray-200 hover:bg-gray-50/50"
              >
                <td className="px-4 py-4 font-medium text-gray-600">
                  {load.id}
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500">
                      JM
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">
                        {load.assignedTo}
                      </p>
                      <p className="text-[10px] text-gray-400">RX-2847</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 font-semibold text-gray-900">
                  {load.rate}
                </td>
                <td className="px-4 py-4 text-gray-600">{load.address}</td>
                <td className="px-4 py-4 text-gray-600">{load.date}</td>
                <td className="px-4 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-[11px] font-bold border ${getStatusStyle(load.status)}`}
                  >
                    {load.status}
                  </span>
                </td>
                <td className="px-4 py-4 relative">
                  <button
                    onClick={() =>
                      setActiveDropdown(activeDropdown === index ? null : index)
                    }
                    className="p-1"
                  >
                    <MoreHorizontal className="h-5 w-5 text-gray-400" />
                  </button>
                  {activeDropdown === index && (
                    <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-100 shadow-xl rounded-xl z-10 py-2">
                      <button
                        onClick={() => handleViewLoad(load.id)}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm"
                      >
                        View Load
                      </button>

                      <button
                        onClick={() => handleEditLoad(load.id)}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm"
                      >
                        Edit Load
                      </button>
                      <button className="w-full px-4 py-2 text-left hover:bg-red-50 text-red-500 text-sm">
                        Delete Load
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col gap-4 bg-white px-4 py-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-[#2C3342]">
          Showing {startIndex + 1} to{' '}
          {Math.min(startIndex + itemsPerPage, LOADS_DATA.length)} of{' '}
          {LOADS_DATA.length} results
        </p>
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
