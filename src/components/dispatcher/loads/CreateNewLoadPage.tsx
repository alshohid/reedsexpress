

'use client';

import React, { useState, ChangeEvent } from 'react';
import { ChevronDown } from 'lucide-react';
import SubmissionDoneModal from '../SubmissionDoneModal';

import { InputField } from '../reusable-component/InputField';
import { SelectField } from '../reusable-component/SelectField';
import UploadDropzoneField from '../../ui/input/UploadDropzoneField';

export default function CreateNewLoadPage() {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [uploadResetSignal, setUploadResetSignal] = useState(0);

  const [formData, setFormData] = useState({
    carrier: '',
    loadNumber: '',
    brokerName: '',
    brokerRef: '',
    brokerEmail: '',
    brokerPhone: '',
    pickupCompany: '',
    pickupDate: '',
    pickupTime: '',
    pickupTimeType: 'AM',
    pickupAddress: '',
    deliveryCompany: '',
    deliveryDate: '',
    deliveryTime: '',
    deliveryTimeType: 'PM',
    deliveryAddress: '',
    assignDriver: '',
    assignTruck: '',
    assignTrailer: '',
    ratePerMile: '',
    totalMiles: '',
    deadheadMiles: '',
    loadedMiles: '',
    notes: '',
  });

  // Dynamic Change Handler
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting Data: ', formData);
    setIsSuccessModalOpen(true);
  };

  return (
    <div className="">
      <div className="">
        <h1 className="text-2xl font-bold text-[#111827] mb-8">
          Create New Load
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Rate Confirmation */}
          <section className="p-6 bg-[#F9FAFB] rounded-2xl border border-gray-100">
            <h3 className="text-sm font-bold text-[#111827] mb-4">
              Rate Confirmation
            </h3>
            <UploadDropzoneField
              className="my-6"
              hint="PNG, JPG up to 5Mb"
              description="Click to upload or drag and drop"
              onFileChange={setLogoFile}
              resetSignal={uploadResetSignal}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <SelectField
                label="Carrier"
                name="carrier"
                placeholder="Select Carrier"
                value={formData.carrier}
                onChange={handleChange}
                options={[
                  { value: 'carrier_1', label: 'Swift Logistics' },
                  { value: 'carrier_2', label: 'Prime Inc' },
                ]}
                required
              />
              <InputField
                label="Load Number"
                name="loadNumber"
                placeholder="Enter load number"
                value={formData.loadNumber}
                onChange={handleChange}
              />
            </div>
          </section>

          {/* Broker Information */}
          <section className="p-6 bg-[#F9FAFB] rounded-2xl border border-gray-100">
            <h3 className="text-sm font-bold text-[#111827] mb-4">
              Broker Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Broker Name"
                name="brokerName"
                placeholder="Enter Name"
                onChange={handleChange}
              />
              <InputField
                label="Broker Reference"
                name="brokerRef"
                placeholder="Enter Reference"
                onChange={handleChange}
              />
              <InputField
                label="Broker Email"
                name="brokerEmail"
                type="email"
                placeholder="Enter Email"
                onChange={handleChange}
              />
              <InputField
                label="Broker Phone"
                name="brokerPhone"
                placeholder="Enter Phone"
                onChange={handleChange}
              />
            </div>
          </section>

          {/* Pickup & Delivery */}
          <div className="grid grid-cols-1 gap-8">
            {/* Pickup */}
            <section className="p-6 bg-[#F9FAFB] rounded-2xl border border-gray-100">
              <h3 className="text-sm font-bold text-[#111827] mb-4">Pickup</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <InputField
                    label="Company Name"
                    name="pickupCompany"
                    placeholder="Enter Company"
                    onChange={handleChange}
                  />
                  {/* Functional Calendar Input */}
                  <InputField
                    label="Date"
                    name="pickupDate"
                    type="date"
                    onChange={handleChange}
                    className="block w-full"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex gap-2  w-full">
                    <div className="w-full">
                      <InputField
                        label="Time"
                        name="pickupTime"
                        type="time"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="w-28 mt-5">
                      <SelectField
                        label=""
                        name="pickupTimeType"
                        value={formData.pickupTimeType}
                        onChange={handleChange}
                        options={[
                          { value: 'AM', label: 'AM' },
                          { value: 'PM', label: 'PM' },
                        ]}
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <InputField
                      label="Address"
                      name="pickupAddress"
                      placeholder="Enter Address"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Delivery */}
            <section className="p-6 bg-[#F9FAFB] rounded-2xl border border-gray-100">
              <h3 className="text-sm font-bold text-[#111827] mb-4">
                Delivery
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <InputField
                    label="Company Name"
                    name="deliveryCompany"
                    placeholder="Enter Company"
                    onChange={handleChange}
                  />
                  <InputField
                    label="Date"
                    name="deliveryDate"
                    type="date"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex gap-4 items-center">
                  <div className="flex items-center gap-2 w-full" >
                    <div className="flex-1">
                      <InputField
                        label="Time"
                        name="deliveryTime"
                        type="time"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="w-28 mt-5">
                      <SelectField
                        label=""
                        name="deliveryTimeType"
                        value={formData.deliveryTimeType}
                        onChange={handleChange}
                        options={[
                          { value: 'AM', label: 'AM' },
                          { value: 'PM', label: 'PM' },
                        ]}
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <InputField
                      label="Address"
                      name="deliveryAddress"
                      placeholder="Enter Address"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Assign Driver Section */}
          <section className="p-6 bg-[#F9FAFB] rounded-2xl border border-gray-100">
            <h3 className="text-sm font-bold text-[#111827] mb-4">
              Assign a Driver for This Load
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <SelectField
                label="Assign Driver"
                name="assignDriver"
                placeholder="Select Driver"
                onChange={handleChange}
                options={[
                  { value: 'd1', label: 'John Doe' },
                  { value: 'd2', label: 'Jane Smith' },
                ]}
              />
              <SelectField
                label="Assign Truck"
                name="assignTruck"
                placeholder="Select Truck"
                onChange={handleChange}
                options={[
                  { value: 't1', label: 'Truck #204' },
                  { value: 't2', label: 'Truck #501' },
                ]}
              />
              <SelectField
                label="Assign Trailer"
                name="assignTrailer"
                placeholder="Select Trailer"
                onChange={handleChange}
                options={[
                  { value: 'tr1', label: 'Flatbed #1' },
                  { value: 'tr2', label: 'Reefer #5' },
                ]}
              />
            </div>

            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <h4 className="text-sm font-bold text-[#111827] mb-4">
                Set Rate & Miles
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Rate/mile ($)"
                  name="ratePerMile"
                  placeholder="0.00"
                  onChange={handleChange}
                />
                <InputField
                  label="Total Miles"
                  name="totalMiles"
                  placeholder="0"
                  onChange={handleChange}
                />
                <InputField
                  label="Deadhead Miles"
                  name="deadheadMiles"
                  placeholder="0"
                  onChange={handleChange}
                />
                <InputField
                  label="Loaded Miles"
                  name="loadedMiles"
                  placeholder="0"
                  onChange={handleChange}
                />
              </div>
            </div>
          </section>

          {/* Notes */}
          <section>
            <label className="text-sm font-bold text-[#111827] mb-2 block">
              Additional Notes
            </label>
            <textarea
              name="notes"
              placeholder="Enter additional notes..."
              onChange={handleChange}
              className="w-full h-32 p-4 bg-[#F9FAFB] border border-gray-100 rounded-2xl outline-none focus:border-[#2B3674] text-sm text-gray-600 transition-all resize-none"
            />
          </section>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              className="px-10 py-3 rounded-xl font-bold text-gray-500 border border-gray-100 hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-10 py-3 rounded-xl font-bold text-white bg-[#2B3674] hover:bg-[#1e2756] transition-all"
            >
              Create Load
            </button>
          </div>
        </form>
      </div>

      <SubmissionDoneModal
        open={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      />
    </div>
  );
}