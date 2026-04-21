import { LoadFormData } from "@/src/app/(protected)/(dispatcher)/dispatcher/dashboard/loads/[loadId]/page";
import SectionTitle from "../SectionTitle";
import { Download, FileText } from "lucide-react";
import { Field } from "./Field";

import { DateIcon } from "@/src/icons";

export function DetailsTab({
  formData,
  isEditing,
  onChange,
  onCancel,
  onSave,
}: {
  formData: LoadFormData;
  isEditing: boolean;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  onCancel: () => void;
  onSave: () => void;
}) {
  return (
    <div className="space-y-6 px-4">
      <div className="rounded-2xl border border-[#EAECEF] bg-white">
        <div className="grid grid-cols-1 gap-6 p-4 sm:p-6 md:grid-cols-2">
          <Field
            label="Carrier *"
            name="carrier"
            value={formData.carrier}
            isEditing={isEditing}
            onChange={onChange}
            type="select"
            options={['Moon Delta LTD', 'RF Logistics', 'Prime Carrier']}
          />
          <Field
            label="Load Number"
            name="loadNumber"
            value={formData.loadNumber}
            hint="auto generated if empty"
            isEditing={isEditing}
            onChange={onChange}
          />
        </div>

        <SectionTitle title="Broker Information"/>

        <div className="grid grid-cols-1 gap-6 p-4 pt-0 sm:p-6 sm:pt-0 md:grid-cols-2">
          <Field
            label="Broker Name"
            name="brokerName"
            value={formData.brokerName}
            isEditing={isEditing}
            onChange={onChange}
          />
          <Field
            label="Broker Reference Number"
            name="brokerReferenceNumber"
            value={formData.brokerReferenceNumber}
            isEditing={isEditing}
            onChange={onChange}
          />
          <Field
            label="Broker Email"
            name="brokerEmail"
            value={formData.brokerEmail}
            isEditing={isEditing}
            onChange={onChange}
          />
          <Field
            label="Broker Phone"
            name="brokerPhone"
            value={formData.brokerPhone}
            isEditing={isEditing}
            onChange={onChange}
          />
        </div>

        <SectionTitle title="Pickup" />

        <div className="grid grid-cols-1 gap-6 p-4 pt-0 sm:p-6 sm:pt-0 md:grid-cols-2">
          <Field
            label="Company Name"
            name="pickupCompanyName"
            value={formData.pickupCompanyName}
            isEditing={isEditing}
            onChange={onChange}
          />
          <Field
            label="Date & Time"
            name="pickupDate"
            value={formData.pickupDate}
            isEditing={isEditing}
            onChange={onChange}
            rightIcon={<DateIcon size={16} />}
          />
          <div className="md:col-span-2">
            <Field
              label="Address"
              name="pickupAddress"
              value={formData.pickupAddress}
              isEditing={isEditing}
              onChange={onChange}
            />
          </div>
        </div>

        <SectionTitle title="Delivery" />

        <div className="grid grid-cols-1 gap-6 p-4 pt-0 sm:p-6 sm:pt-0 md:grid-cols-2">
          <Field
            label="Company Name"
            name="deliveryCompanyName"
            value={formData.deliveryCompanyName}
            isEditing={isEditing}
            onChange={onChange}
          />
          <Field
            label="Date"
            name="deliveryDate"
            value={formData.deliveryDate}
            isEditing={isEditing}
            onChange={onChange}
            rightIcon={<DateIcon size={16} />}
          />

          <div className="grid grid-cols-1 gap-6 md:col-span-2 md:grid-cols-[1fr_100px_1fr]">
            <Field
              label="Time"
              name="deliveryTime"
              value={formData.deliveryTime}
              isEditing={isEditing}
              onChange={onChange}
            />
            <Field
              label="&nbsp;"
              name="deliveryTimeType"
              value={formData.deliveryTimeType}
              isEditing={isEditing}
              onChange={onChange}
              type="select"
              options={['AM', 'PM']}
            />
            <Field
              label="Address"
              name="deliveryAddress"
              value={formData.deliveryAddress}
              isEditing={isEditing}
              onChange={onChange}
            />
          </div>
        </div>

        <SectionTitle title="Assign a Driver for This Load" />

        <div className="grid grid-cols-1 gap-6 p-4 pt-0 sm:p-6 sm:pt-0 md:grid-cols-3">
          <Field
            label="Driver"
            name="driver"
            value={formData.driver}
            isEditing={isEditing}
            onChange={onChange}
            type="select"
            options={['John Doe', 'James Mad', 'Jane Smith']}
          />
          <Field
            label="Truck"
            name="truck"
            value={formData.truck}
            isEditing={isEditing}
            onChange={onChange}
            type="select"
            options={['RF-345', 'RX-2847', 'TX-120']}
          />
          <Field
            label="Trailer"
            name="trailer"
            value={formData.trailer}
            isEditing={isEditing}
            onChange={onChange}
            type="select"
            options={['RF-345', 'TR-102', 'TR-900']}
          />
        </div>

        <SectionTitle title="Set Rate & Miles for This Load" />

        <div className="grid grid-cols-1 gap-6 p-4 pt-0 sm:p-6 sm:pt-0 md:grid-cols-2">
          <Field
            label="Rate/mile ($)"
            name="ratePerMile"
            value={formData.ratePerMile}
            isEditing={isEditing}
            onChange={onChange}
          />
          <Field
            label="Total Miles"
            name="totalMiles"
            value={formData.totalMiles}
            isEditing={isEditing}
            onChange={onChange}
          />
          <Field
            label="Deadhead Miles (empty miles)"
            name="deadheadMiles"
            value={formData.deadheadMiles}
            isEditing={isEditing}
            onChange={onChange}
          />
          <Field
            label="Loaded Miles (with freight)"
            name="loadedMiles"
            value={formData.loadedMiles}
            isEditing={isEditing}
            onChange={onChange}
          />
        </div>

        <SectionTitle title="Rate Confirmation" />

        <div className="p-4 pt-0 sm:p-6 sm:pt-0">
          <div className="flex items-center justify-between rounded-xl border border-[#ECEEF3] px-4 py-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 text-[#98A2B3]">
                <FileText size={18} />
              </div>
              <div>
                <p className="text-sm font-medium text-[#111827]">
                  Rate Confirmation.pdf
                </p>
                <p className="mt-1 text-xs text-[#98A2B3]">
                  0.7 MB • Mar 23, 2026, 09:06 PM
                </p>
                <span className="mt-2 inline-flex rounded-full bg-[#FFF3CD] px-2.5 py-1 text-[10px] font-semibold text-[#B07A00]">
                  Rate Confirmation
                </span>
              </div>
            </div>

            <button
              type="button"
              className="rounded-lg p-2 text-[#98A2B3] transition hover:bg-[#F8FAFC]"
            >
              <Download size={16} />
            </button>
          </div>
        </div>

        <SectionTitle title="Additional Notes" />

        <div className="p-4 pt-0 sm:p-6 sm:pt-0">
          {isEditing ? (
            <textarea
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={onChange}
              rows={4}
              className="w-full rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] px-4 py-3 text-sm text-[#111827] outline-none transition focus:border-[#2E3A83]"
            />
          ) : (
            <div className="rounded-xl border border-[#E5E7EB] bg-[#F3F4F6] px-4 py-3 text-sm leading-6 text-[#6B7280]">
              {formData.additionalNotes}
            </div>
          )}
        </div>
      </div>

      {isEditing && (
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-[#E5E7EB] bg-white px-6 py-2.5 text-sm font-semibold text-[#6B7280] transition hover:bg-[#F9FAFB]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSave}
            className="rounded-xl bg-[#2E3A83] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#26306d]"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
}
