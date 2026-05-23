'use client';

import { CheckIcon, EditIconNew, UploadIcon } from '@/src/icons';
import { ArrowRightIcon, CloudUpload } from 'lucide-react';
import { useState } from 'react';
import UploadDropzoneField from '../ui/input/UploadDropzoneField';
import EditSquareIcon from '@/src/icons/EditSquareIcon';

interface CarrierInformationFormProps {
  onNext: () => void;
  onCancel: () => void;
}

const plans = [
  {
    id: 'basic',
    name: 'Basic Plan',
    percent: '10%',
    description: 'Great for everyday usage and long term benefits',
    features: [
      'Driver Recruiting',
      'Permits & IFTA Filing',
      'Financial Metrics',
      'Driver Recruiting',
    ],
  },
  {
    id: 'pro',
    name: 'Pro Plan',
    percent: '12%',
    description: 'Great for everyday usage and long term benefits',
    features: [
      'Driver Recruiting',
      'Permits & IFTA Filing',
      'Financial Metrics',
      'Driver Recruiting',
    ],
  },
  {
    id: 'advance',
    name: 'Advance Plan',
    percent: '15%',
    description: 'Great for everyday usage and long term benefits',
    features: [
      'Driver Recruiting',
      'Permits & IFTA Filing',
      'Financial Metrics',
      'Driver Recruiting',
    ],
  },
];

export default function CarrierInformationForm({
  onNext,
  onCancel,
}: CarrierInformationFormProps) {

  

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [uploadResetSignal, setUploadResetSignal] = useState(0);
  const [selectedPlanId, setSelectedPlanId] = useState<string>('pro');

  const [customDispatchFee, setCustomDispatchFee] = useState<string>('2.5');
  const [isFactoringEnabled, setIsFactoringEnabled] = useState(false);
  const [isFreeTrialEnabled, setIsFreeTrialEnabled] = useState(false);
  return (
    <div className="rounded-2xl border border-[#E9EDF5] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)] md:p-5">
      <div className="mt-6">
        <span className="flex items-center gap-2 justify-between">
          <h3 className="mb-3 text-[24px] font-semibold text-[#111827]">
            Carrier Logo
          </h3>
          <EditIconNew className="cursor-pointer"/>
        </span>
        <UploadDropzoneField
          hint="PNG, JPG up to 5Mb (Will appear on invoice)"
          description="Click to upload or drag and drop"
          maxSizeMb={5}
          onFileChange={setLogoFile}
          dropzoneBackgroundClassName="bg-white"
          dropzoneHoverBackgroundClassName="hover:bg-[#F2F4F7]"
          resetSignal={uploadResetSignal}
        />
      </div>
      <div className="border rounded-[8px] border-[#E5E7EB] bg-[#F9FAFB] p-4 mt-6">
        <h2 className="mb-4 md:text-[24px] font-semibold text-[#111827] mt-6">
          Input Carrier’s Information
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-[16px] font-medium text-[#111827]">
              Legal Name <span className="font-bold">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Carrier Name"
              className="h-11 w-full rounded-[10px] border border-[#E5E7EB] px-4 text-sm outline-none placeholder:text-[#9CA3AF] focus:border-[#C7D2FE]"
            />
          </div>

          <div>
            <label className="mb-2 block text-[16px] font-medium text-[#111827]">
              DBA Name
            </label>
            <input
              type="text"
              placeholder="Enter DBA Name"
              className="h-11 w-full rounded-[10px] border border-[#E5E7EB] px-4 text-sm outline-none placeholder:text-[#9CA3AF] focus:border-[#C7D2FE]"
            />
          </div>

          <div>
            <label className="mb-2 block text-[16px] font-medium text-[#111827]">
              MC Number
            </label>
            <input
              type="number"
              placeholder="Enter MC Number"
              className="h-11 w-full rounded-[10px] border border-[#E5E7EB] px-4 text-sm outline-none placeholder:text-[#9CA3AF] focus:border-[#C7D2FE]"
            />
          </div>

          <div>
            <label className="mb-2 block text-[16px] font-medium text-[#111827]">
              DOT Number
            </label>
            <input
              type="number"
              placeholder="Enter DOT Number"
              className="h-11 w-full rounded-[10px] border border-[#E5E7EB] px-4 text-sm outline-none placeholder:text-[#9CA3AF] focus:border-[#C7D2FE]"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-[16px] font-medium text-[#111827]">
              Email
            </label>
            <input
              type="mail"
              placeholder="Enter Email"
              className="h-11 w-full rounded-[10px] border border-[#E5E7EB] px-4 text-sm outline-none placeholder:text-[#9CA3AF] focus:border-[#C7D2FE]"
            />
          </div>

          <div>
            <label className="mb-2 block text-[16px] font-medium text-[#111827]">
              Address
            </label>
            <input
              type="text"
              placeholder="Enter Address"
              className="h-11 w-full rounded-[10px] border border-[#E5E7EB] px-4 text-sm outline-none placeholder:text-[#9CA3AF] focus:border-[#C7D2FE]"
            />
          </div>

          <div>
            <label className="mb-2 block text-[16px] font-medium text-[#111827]">
              Contact
            </label>
            <input
              type="text"
              placeholder="Enter Contact"
              className="h-11 w-full rounded-[10px] border border-[#E5E7EB] px-4 text-sm outline-none placeholder:text-[#9CA3AF] focus:border-[#C7D2FE]"
            />
          </div>
        </div>
      </div>

      {/* new sections */}
      <div className="mt-6 rounded-[8px] border border-[#E5E7EB] bg-[#F9FAFB] p-4">
        <h2 className="text-[24px] font-semibold text-[#111827]">
          Set Dispatch Fee
        </h2>

        <div className="mt-4">
          <label className="mb-2 block text-[16px] font-medium text-[#111827]">
            Custom Dispatch Fee Percentage (%)
          </label>

          <input
            type="number"
            value={customDispatchFee}
            onChange={e => setCustomDispatchFee(e.target.value)}
            placeholder="2.5"
            className="h-11 w-[150px] rounded-[10px] border border-[#E5E7EB] bg-white px-4 text-sm outline-none placeholder:text-[#9CA3AF] focus:border-[#C7D2FE] cursor-pointer"
          />

          <p className="mt-2 text-[16px] leading-5 text-[#667085]">
            Set a custom dispatch fee for this carrier or leave blank to use
            your organization&apos;s default rate.
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-[8px] border border-[#E5E7EB] bg-[#F9FAFB] p-4">
        <h2 className="text-[24px] font-semibold text-[#111827]">
          Factoring Service (Optional)
        </h2>

        <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-[8px]">
          <input
            type="checkbox"
            checked={isFactoringEnabled}
            onChange={e => setIsFactoringEnabled(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-[#D0D5DD] text-[#016822] focus:ring-[#117e00] "
          />

          <div>
            <p className="text-[16px] font-semibold text-[#111827]">
              Carrier Using Factoring Service (OCR Factoring)
            </p>
            <p className="mt-1 text-[16px] leading-5 text-[#667085]">
              Enable this to send invoice and document to the carrier&apos;s
              factoring company.
            </p>
          </div>
        </label>
      </div>

      <div className="mt-6 rounded-[8px] border border-[#E5E7EB] bg-[#F9FAFB] p-4">
        <h2 className="text-[24px] font-semibold text-[#111827]">
          Set Free Trial
        </h2>

        <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-[8px]">
          <input
            type="checkbox"
            checked={isFreeTrialEnabled}
            onChange={e => setIsFreeTrialEnabled(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-[#D0D5DD] text-[#0d8702] focus:ring-[#008314]"
          />

          <div>
            <p className="text-[16px] font-semibold text-[#111827]">
              Enable Free Trial
            </p>
            <p className="mt-1 text-[16px] leading-5 text-[#667085]">
              Enabling this free trial will let the carrier to use features
              until the day you set as free trial ending.
            </p>
          </div>
        </label>
      </div>
      {/*  */}
      <div className="mt-6">
        <h3 className="text-[24px] font-semibold text-[#111827]">
          Pricing Plan
        </h3>
        <p className="mt-1 text-[14px] text-[#344054]">
          Select a Plan for you Carrier
        </p>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          {plans.map(plan => {
            const isActive = selectedPlanId === plan.id;

            return (
              <button
                key={plan.id}
                type="button"
                onClick={() => setSelectedPlanId(plan.id)}
                className={`relative rounded-xl border p-4 text-left transition ${
                  isActive
                    ? 'border-[#2F3E9E] shadow-[0_0_0_1px_#2F3E9E]'
                    : 'border-[#DDE3ED] hover:border-[#C7D2FE]'
                }`}
              >
                {isActive && (
                  <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#2F3E9E] text-[10px] text-white">
                    ✓
                  </div>
                )}

                <h4 className="text-[18px] font-semibold text-[#111827]">
                  {plan.name}
                </h4>

                <p className="mt-1 text-[14px] text-[#6B7280]">
                  {plan.description}
                </p>

                <p className="mt-4 text-2xl font-semibold text-[#2563EB]">
                  {plan.percent}
                </p>
                <p className="mt-1 text-[12px] text-[#98A2B3]">Dispatch Fee</p>

                <div className="mt-4">
                  <p className="mb-2 text-[16px] font-semibold text-[#111827]">
                    Included Features:
                  </p>

                  <ul className="space-y-2 text-[16px] text-[#4B5563]">
                    {plan.features.map(feature => (
                      <li key={feature} className="flex items-center gap-1">
                        <CheckIcon />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center">
        <button
          onClick={onCancel}
          className="inline-flex h-13 items-center justify-center rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] px-6 text-sm font-medium text-[#344054]"
        >
          Cancel
        </button>

        <button
          onClick={onNext}
          className="inline-flex h-13 flex-1 items-center justify-center rounded-xl bg-[#2F3E9E] px-6 text-sm font-medium text-white"
        >
          Next <ArrowRightIcon />
        </button>
      </div>
    </div>
  );
}
