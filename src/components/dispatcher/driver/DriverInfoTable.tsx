

'use client';
import React, { useState, useRef, useEffect } from 'react';
import { MoreHorizontal, Search, Edit2, Eye, Trash2 } from 'lucide-react';
import DriverDetailModal from './DriverDetailModal';
import { Driver } from '@/src/types/driver/type';
import TablePagination from '../TablePagination';
import { Modal } from '../../ui/modal';

const DRIVER_DATA: Driver[] = [
  {
    id: '02',
    name: 'James Clark',
    carrier: 'Truck Inc',
    truckNo: '30',
    trailerNo: '6700',
    contact: '+32 23234',
    status: 'Active',
  },
  {
    id: '03',
    name: 'Rodrique',
    carrier: 'J Travel LLC',
    truckNo: '18',
    trailerNo: '4380',
    contact: '+32 23234',
    status: 'Active',
  },
  {
    id: '04',
    name: 'Ronaldo',
    carrier: 'Logic LTD',
    truckNo: '15',
    trailerNo: '3250',
    contact: '+32 23234',
    status: 'Deleted',
  },
  {
    id: '03',
    name: 'Rodrique',
    carrier: 'J Travel LLC',
    truckNo: '18',
    trailerNo: '4380',
    contact: '+32 23234',
    status: 'Active',
  },
  {
    id: '04',
    name: 'Ronaldo',
    carrier: 'Logic LTD',
    truckNo: '15',
    trailerNo: '3250',
    contact: '+32 23234',
    status: 'Deleted',
  },
  {
    id: '03',
    name: 'Rodrique',
    carrier: 'J Travel LLC',
    truckNo: '18',
    trailerNo: '4380',
    contact: '+32 23234',
    status: 'Active',
  },
  {
    id: '04',
    name: 'Ronaldo',
    carrier: 'Logic LTD',
    truckNo: '15',
    trailerNo: '3250',
    contact: '+32 23234',
    status: 'Deleted',
  },
  {
    id: '03',
    name: 'Rodrique',
    carrier: 'J Travel LLC',
    truckNo: '18',
    trailerNo: '4380',
    contact: '+32 23234',
    status: 'Active',
  },
  {
    id: '17',
    name: 'Ronaldo',
    carrier: 'Logic LTD',
    truckNo: '15',
    trailerNo: '3250',
    contact: '+32 23234',
    status: 'Deleted',
  },
  {
    id: '11',
    name: 'Ronaldo',
    carrier: 'Logic LTD',
    truckNo: '15',
    trailerNo: '3250',
    contact: '+32 23234',
    status: 'Deleted',
  },
  {
    id: '16',
    name: 'Ronaldo',
    carrier: 'Logic LTD',
    truckNo: '15',
    trailerNo: '3250',
    contact: '+32 23234',
    status: 'Deleted',
  },
];

export default function DriverInfoTable() {
  const [drivers, setDrivers] = useState<Driver[]>(DRIVER_DATA); // ← moved to state
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(drivers.length / itemsPerPage);
  const safePage = Math.min(currentPage, Math.max(totalPages, 1)); 
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = drivers.slice(startIndex, startIndex + itemsPerPage);

  const [deleteTarget, setDeleteTarget] = useState<{
    driver: Driver;
    index: number;
  } | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const openDetails = (driver: Driver) => {
    setSelectedDriver(driver);
    setIsDetailOpen(true);
    setActiveDropdown(null);
  };

  // Delete handler
  const handleDelete = (index: number) => {
    const actualIndex = startIndex + index;
    setDrivers(prev => prev.filter((_, i) => i !== actualIndex));
    setActiveDropdown(null);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">All Driver</h2>

      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          type="text"
          placeholder="Search by name / MC No."
          className="w-full h-12 pl-11 pr-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-indigo-500 transition-all text-sm"
        />
      </div>

      <div className="overflow-x-auto border rounded-xl">
        <table className="w-full text-sm text-left">
          <thead className="text-gray-400 font-medium border-b border border-gray-200">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Carrier</th>
              <th className="px-4 py-3">Truck</th>
              <th className="px-4 py-3">Trailer</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-8 text-center text-sm text-gray-400"
                >
                  No drivers found
                </td>
              </tr>
            ) : (
              currentData.map((driver, index) => (
                <tr
                  key={`${driver.id}-${index}`}
                  className="border border-gray-200 hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-4 py-4 text-gray-500">{driver.id}</td>
                  <td className="px-4 py-4 font-semibold text-gray-900">
                    {driver.name}
                  </td>
                  <td className="px-4 py-4 text-gray-600">{driver.carrier}</td>
                  <td className="px-4 py-4 text-gray-600">{driver.truckNo}</td>
                  <td className="px-4 py-4 text-gray-600">
                    {driver.trailerNo}
                  </td>
                  <td className="px-4 py-4 text-gray-600">{driver.contact}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-bold border ${
                        driver.status === 'Active'
                          ? 'bg-green-50 text-green-600 border-green-200'
                          : 'bg-red-50 text-red-400 border-red-100'
                      }`}
                    >
                      {driver.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 relative">
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        setActiveDropdown(
                          activeDropdown === index ? null : index,
                        );
                      }}
                      className={`p-1 rounded-md transition-colors ${
                        activeDropdown === index
                          ? 'bg-gray-100'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <MoreHorizontal className="h-5 w-5 text-gray-400" />
                    </button>

                    {activeDropdown === index && (
                      <div
                        ref={dropdownRef}
                        className="absolute right-4 top-12 w-36 bg-white border border-gray-100 shadow-xl rounded-xl z-[60] py-2 animate-in fade-in zoom-in duration-100"
                      >
                        <button
                          onClick={() => openDetails(driver)}
                          className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-sm font-medium text-gray-700"
                        >
                          <Eye size={16} className="text-gray-400" /> View
                        </button>
                        <button
                          onClick={() => openDetails(driver)}
                          className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-sm font-medium text-gray-700"
                        >
                          <Edit2 size={16} className="text-gray-400" /> Edit
                        </button>
                        <div className="my-1 border-t border-gray-50" />
                        <button
                          onClick={() => {
                            setDeleteTarget({ driver, index });
                            setActiveDropdown(null);
                          }}
                          className="w-full px-4 py-2 text-left hover:bg-red-50 flex items-center gap-3 text-sm font-medium text-red-500"
                        >
                          <Trash2 size={16} /> Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-4 bg-white px-4 py-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-[#2C3342]">
          Showing {drivers.length === 0 ? 0 : startIndex + 1} to{' '}
          {Math.min(startIndex + itemsPerPage, drivers.length)} of{' '}
          {drivers.length} results
        </p>
        <TablePagination
          currentPage={safePage}
          totalPages={Math.max(totalPages, 1)}
          onPageChange={setCurrentPage}
        />
      </div>

      {selectedDriver && (
        <DriverDetailModal
          open={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          driver={selectedDriver}
        />
      )}
      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        showCloseButton={false}
        className="max-w-[420px]"
      >
        <div className="p-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
            <Trash2 className="h-6 w-6 text-red-500" />
          </div>

          <h3 className="mb-2 text-[18px] font-semibold text-gray-900">
            Delete Driver?
          </h3>
          <p className="mb-6 text-sm text-gray-500">
            Are you sure you want to delete{' '}
            <span className="font-semibold text-gray-900">
              {deleteTarget?.driver.name}
            </span>
            ? This action cannot be undone.
          </p>

          <div className="flex gap-3">
            <button
              onClick={() => setDeleteTarget(null)}
              className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (!deleteTarget) return;
                handleDelete(deleteTarget.index);
                setDeleteTarget(null);
              }}
              className="h-11 w-full rounded-xl bg-red-500 text-sm font-medium text-white transition hover:opacity-90"
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}