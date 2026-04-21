"use client"
import { DownCaretIcon } from '@/src/icons';
import { DocumentCard } from './DocumentCard';
import {
  DRIVER_DOCS,
  RATE_CONFIRMATION_DOC,
} from '@/src/app/(protected)/(dispatcher)/dispatcher/dashboard/loads/[loadId]/page';
import UploadDropzoneField from '../../ui/input/UploadDropzoneField';
import { useState } from 'react';

export function DocumentsTab({
  showUploadBox,
  onDownload,
  onDelete,
}: {
  showUploadBox: boolean;
  onDownload: (id: string) => void;
  onDelete: (id: string) => void;
  }) {
  
  const [logoFile, setLogoFile] = useState<File | null>(null);
    const [uploadResetSignal, setUploadResetSignal] = useState(0);
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-[#EAECEF] bg-white p-4 sm:p-6">
        <h3 className="mb-4 text-[18px] font-semibold text-[#111827]">
          Rate Confirmation
        </h3>

        <DocumentCard
          item={RATE_CONFIRMATION_DOC}
          onDownload={onDownload}
          onDelete={onDelete}
        />

        {showUploadBox && (
          <UploadDropzoneField
            className="my-6"
            hint="PNG, JPG up to 5Mb"
            description="Click to upload or drag and drop"
            onFileChange={setLogoFile}
            resetSignal={uploadResetSignal}
          />
        )}

        <h3 className="mb-4 mt-8 text-[18px] font-semibold text-[#111827]">
          Load Documents from Driver
        </h3>

        <div className="space-y-4">
          {DRIVER_DOCS.map(item => (
            <DocumentCard
              key={item.id}
              item={item}
              onDownload={onDownload}
              onDelete={onDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
