"use client";

import { UploadIcon } from "@/src/icons";
import React, { useRef, useState } from "react";

type UploadDropzoneFieldProps = {
    label?: string;
    hint?: string; // e.g. "JPG or PNG (max 3MB)"
    accept?: string; // "image/png,image/jpeg"
    maxSizeMb?: number;
    required?: boolean;
    error?: string;
    onFileChange?: (file: File | null) => void;
};

function ImageIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M4 16l4-4 3 3 4-5 5 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M20 5H4v14h16V5Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
            />
            <path
                d="M9 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
                fill="currentColor"
            />
        </svg>
    );
}

export default function UploadDropzoneField({
  label = 'Upload Logo',
  hint = 'PNG, JPG up to 5Mb (Will appear on invoice)',
  accept = 'image/png,image/jpeg',
  maxSizeMb = 3,
  required = false,
  error,
  onFileChange,
}: UploadDropzoneFieldProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string>('');

  const validateAndSet = (file: File | null) => {
    if (!file) {
      setFileName('');
      onFileChange?.(null);
      return;
    }

    const maxBytes = maxSizeMb * 1024 * 1024;
    if (file.size > maxBytes) {
      setFileName('');
      onFileChange?.(null);
      alert(`File too large. Max ${maxSizeMb}MB`);
      return;
    }

    setFileName(file.name);
    onFileChange?.(file);
  };

  const onPick = () => inputRef.current?.click();

  const onDrop: React.DragEventHandler<HTMLDivElement> = e => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0] ?? null;
    validateAndSet(file);
  };

  return (
    <div className="w-full">
      {/* <label className="text-[1rem] font-medium text-[#161721]">
          {label} {required ? <span className="text-red-500">*</span> : null}
        </label> */}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={e => {
          const file = e.target.files?.[0] ?? null;
          validateAndSet(file);
          e.currentTarget.value = '';
        }}
      />

      <div
        onClick={onPick}
        onDragOver={e => e.preventDefault()}
        onDrop={onDrop}
        className={[
          'mt-2 w-full cursor-pointer rounded-[10px]',
          'border border-dashed border-gray-200',
          'px-4 py-8 sm:py-10',
          'flex flex-col items-center justify-center gap-2 text-center',
          'hover:opacity-95 transition',
        ].join(' ')}
      >
        <div className="h-10 w-10 rounded-full bg-[#f1f5f9] flex items-center justify-center text-[#3F4A3B]">
          <UploadIcon />
        </div>

        <div className="text-[12px] text-[#161721]">
          <span className="text-[16px] text-[#111827]">
            {' '}
            Click to upload or drag and drop
          </span>{' '}
        </div>

        <div className="mt-1 text-[14px] text-[#98A2B3]">{hint}</div>

        {fileName ? (
          <div className="mt-2 text-[12px] font-medium text-[#3F4A3B]">
            Selected: {fileName}
          </div>
        ) : null}
      </div>

      {error ? <p className="mt-2 text-[12px] text-red-600">{error}</p> : null}
    </div>
  );
}