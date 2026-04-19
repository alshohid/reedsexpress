'use client';

import {
  ChevronDown,
  CloudUpload,
  FileText,
  Trash2,
  Download,
} from 'lucide-react';

interface CarrierDocumentsFormProps {
  onBack: () => void;
  onSubmit: () => void;
}

const pendingFiles = ['Carrier Contract.pdf', 'Limited-Power_of_Attorney.pdf'];

const uploadedGroups = [
  {
    date: 'Mar 23, 2026, 09:06 PM',
    files: [
      { name: 'MC Authority.pdf', tag: 'MC Authority' },
      { name: 'Void Check.pdf', tag: 'Void Check' },
      { name: 'Notice of Assignment.pdf', tag: 'Notice of Assignment' },
    ],
  },
  {
    date: 'Feb 15, 2026, 09:34 AM',
    files: [
      { name: 'Trucker Intake Survey.PDF', tag: 'Trucker Intake Survey' },
    ],
  },
];

export default function CarrierDocumentsForm({
  onBack,
  onSubmit,
}: CarrierDocumentsFormProps) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-[#E9EDF5] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)] md:p-5">
        <h2 className="mb-4 text-[20px] font-semibold text-[#111827]">
          Upload Documents Here
        </h2>

        <div>
          <label className="mb-2 block text-xs font-medium text-[#111827]">
            Select Document Type
          </label>

          <button className="inline-flex h-11 w-full items-center justify-between rounded-xl border border-[#E5E7EB] bg-white px-4 text-sm text-[#9CA3AF]">
            select type of document
            <ChevronDown className="h-4 w-4 text-[#98A2B3]" />
          </button>
        </div>

        <div className="mt-4 flex min-h-[124px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#D8DEE8] bg-white px-4 py-8 text-center">
          <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#EEF2FF] text-[#2F3E9E]">
            <CloudUpload className="h-4 w-4" />
          </div>
          <p className="text-xs text-[#111827]">
            Click to upload or drag and drop
          </p>
          <p className="mt-1 text-[11px] text-[#98A2B3]">
            PNG, JPG up to 5Mb (will appear on invoice)
          </p>
        </div>

        <div className="mt-4 space-y-3">
          {pendingFiles.map(file => (
            <div
              key={file}
              className="flex items-center justify-between rounded-xl border border-[#EEF0F5] bg-[#F9FAFB] px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <FileText className="h-4 w-4 text-[#6B7280]" />
                <div>
                  <p className="text-sm text-[#111827]">{file}</p>
                  <p className="text-[11px] text-[#98A2B3]">
                    0.87 MB • Mar 23, 2026, 09:06 PM
                  </p>
                </div>
              </div>

              <button className="text-[#FF5A5F]">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
          <button
            onClick={onBack}
            className="inline-flex h-10 items-center justify-center rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] px-6 text-sm font-medium text-[#344054]"
          >
            Cancel
          </button>

          <button
            onClick={onSubmit}
            className="inline-flex h-10 items-center justify-center rounded-xl bg-[#2F3E9E] px-6 text-sm font-medium text-white"
          >
            Submit
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-[#E9EDF5] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)] md:p-5">
        <h2 className="mb-4 text-[20px] font-semibold text-[#111827]">
          Uploaded Documents
        </h2>

        <div className="space-y-6">
          {uploadedGroups.map(group => (
            <div key={group.date}>
              <p className="mb-3 text-sm font-medium text-[#111827]">
                {group.date}
              </p>

              <div className="space-y-3">
                {group.files.map(file => (
                  <div
                    key={file.name}
                    className="flex items-center justify-between rounded-xl border border-[#EEF0F5] bg-white px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-[#6B7280]" />
                      <div>
                        <p className="text-sm text-[#111827]">{file.name}</p>
                        <p className="text-[11px] text-[#98A2B3]">
                          0.87 MB • Mar 23, 2026, 09:06 PM
                        </p>
                        <span className="mt-2 inline-flex rounded-full bg-[#FFF6E6] px-2 py-[2px] text-[10px] font-medium text-[#D68A00]">
                          {file.tag}
                        </span>
                      </div>
                    </div>

                    <button className="text-[#98A2B3]">
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
