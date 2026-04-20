'use client';

import React, { useState } from 'react';
import { X, Plus, MessageSquare } from 'lucide-react';
import { Modal } from '../ui/modal';
import SmartField from './reusable-component/SmartField';
import AssignTruckDropdown from './reusable-component/AssignTruckDropdown';
import AssignTrailerDropdown from './reusable-component/AssignTrailerDropdown';
import { EditIcon, EditOptionIcon, MessageChatIcon } from '@/src/icons';
import { Input } from '../ui/input';

const TRUCK_OPTIONS = [
  { label: 'Unit 101 - Kenworth T680', value: 'truck_101' },
  { label: 'Unit 205 - Freightliner Cascadia', value: 'truck_205' },
];

const TRAILER_OPTIONS = [
  { label: 'TL-50 - Reefer', value: 'trailer_tl_50' },
  { label: 'TL-72 - Dry Van', value: 'trailer_tl_72' },
];

export default function DriverDetailModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [showAddTruckForm, setShowAddTruckForm] = useState(false);

  const [driverData, setDriverData] = useState({
    name: 'Ronaldo',
    carrier: 'Logic LTD',
    assignedTruck: 'N/A',
    assignedTrailer: 'N/A',
    state: 'Truck Inc.',
    contact: '+32 23234',
    cdlNumber: 'James Clark',
    regExpDate: '1/1/25',
    cdlExpDate: '1/1/25',
    medCardExpDate: '12/12/28',
    status: 'Active',
    assignedTruckId: '',
    assignedTrailerId: '',
  });

  const handleInputChange = (field: string, value: string | number) => {
    setDriverData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      className="max-w-[850px] p-0"
      contentBgClassName="bg-white"
      showCloseButton={false}
    >
      <div className="relative w-full rounded-3xl p-8 max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-[#111827]">Driver Details</h2>
          <button
            onClick={onClose}
            className="p-1.5 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
          >
            <X size={18} className="text-gray-500" />
          </button>
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-[#3E4EDD] p-1"
          >
            {isEditing ? 'Save' : <EditOptionIcon />}
          </button>
        </div>
        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-1">
          {/* Driver Information */}
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-[#111827] mb-4">
              Driver Information
            </h3>
            <SmartField
              label="Name"
              value={driverData.name}
              isEditing={isEditing}
              onChange={v => handleInputChange('name', v)}
              border
            />
            <SmartField
              label="Carrier"
              value={driverData.carrier}
              isEditing={isEditing}
              onChange={v => handleInputChange('carrier', v)}
              border
            />
            <SmartField
              label="Assigned Truck"
              value={driverData.assignedTruck}
              isEditing={isEditing}
              onChange={v => handleInputChange('assignedTruck', v)}
              border
            />
            <SmartField
              label="Assigned Trailer"
              value={driverData.assignedTrailer}
              isEditing={isEditing}
              onChange={v => handleInputChange('assignedTrailer', v)}
              border
            />
            <SmartField
              label="State"
              value={driverData.state}
              isEditing={isEditing}
              onChange={v => handleInputChange('state', v)}
              border
            />
            <SmartField
              label="Contact"
              value={driverData.contact}
              isEditing={isEditing}
              onChange={v => handleInputChange('contact', v)}
              border
            />
          </div>

          {/* Compliance Column */}
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-[#111827] mb-4">
              Driver Fitness / Compliance
            </h3>
            <SmartField
              label="CDL Number"
              value={driverData.cdlNumber}
              isEditing={isEditing}
              onChange={v => handleInputChange('cdlNumber', v)}
              border
            />
            <SmartField
              label="Registration Expiration Date"
              value={driverData.regExpDate}
              isEditing={isEditing}
              onChange={v => handleInputChange('regExpDate', v)}
              border
            />
            <SmartField
              label="CDL Expiration Date"
              value={driverData.cdlExpDate}
              isEditing={isEditing}
              onChange={v => handleInputChange('cdlExpDate', v)}
              border
            />
            <SmartField
              label="Medical Card Expiration Date"
              value={driverData.medCardExpDate}
              isEditing={isEditing}
              onChange={v => handleInputChange('medCardExpDate', v)}
              border
            />

            {/* Status Field */}
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div className="flex-1">
                <p className="text-sm font-bold text-[#111827]">Status</p>
                <div className="mt-1">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#ECFDF5] text-[#10B981] border border-[#A7F3D0]">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Optional Add Truck Section */}
        <div className="mt-8">
          {!showAddTruckForm ? (
            <div className="flex flex-col sm:flex-row items-center justify-between p-6 rounded-2xl bg-[#F9FAFB] border border-gray-100">
              <div className="text-center sm:text-left">
                <h4 className="font-bold text-[#111827]">
                  Add Truck & Trailer (Optional)
                </h4>
                <p className="text-sm text-gray-500 mt-1">
                  You have not selected any truck for this driver. Click on Add
                  truck button to assign.
                </p>
              </div>
              <button
                onClick={() => setShowAddTruckForm(true)}
                className="mt-4 sm:mt-0 flex items-center gap-2 px-5 py-2.5 bg-[#2B3674] text-white rounded-xl text-sm font-bold hover:bg-[#1e2756] transition-all"
              >
                <Plus size={18} /> Add Now
              </button>
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Assign Truck */}
                <div className="space-y-4">
                  <label className="text-[15px] font-bold text-[#111827] ">
                    Assign Truck
                  </label>
                  <Input
                    placeholder="Enter unit no."
                    className="px-3 py-2 rounded-[10px] border-[#dfe1e7]"
                  />
                </div>

                {/* Assign Trailer */}
                <div className="space-y-4">
                  <label className="text-[15px] font-bold text-[#111827] border-[#dfe1e7]">
                    Assign Trailer
                  </label>
                  <Input
                    placeholder="Enter last name"
                    className="px-3 py-2 rounded-[10px]"
                  />
                </div>
              </div>
              <div className="flex  gap-3 pt-2">
                <button
                  onClick={() => setShowAddTruckForm(false)}
                  className="px-6 py-2.5 w-full border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button className="px-6 py-2.5 w-full bg-[#2B3674] text-white rounded-xl text-sm font-bold hover:bg-[#1e2756]">
                  Assign Truck
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <button className="px-8 py-3 border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all">
            Delete Driver
          </button>

          <div className="flex items-center gap-3">
            <button className="px-6 py-3 bg-[#2B3674] text-white font-bold rounded-xl hover:bg-[#1e2756] transition-all">
              View Available Slots
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-[#2B3674] text-white font-bold rounded-xl hover:bg-[#1e2756] transition-all">
              <MessageChatIcon/> Contact Driver
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
