'use client';

import { ThumbsUp, X } from 'lucide-react';

interface SubmissionDoneModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SubmissionDoneModal({
  open,
  onClose,
}: SubmissionDoneModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <div className="relative w-full max-w-[360px] rounded-2xl bg-white p-6 shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 inline-flex h-7 w-7 items-center justify-center rounded-full text-[#111827]"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#E9EEFF] text-[#2F3E9E]">
            <ThumbsUp className="h-7 w-7 fill-current" />
          </div>

          <h3 className="mb-4 text-xl font-semibold text-[#111827]">
            Submission Done!
          </h3>

          <button
            onClick={onClose}
            className="inline-flex h-10 w-full items-center justify-center rounded-xl bg-[#2F3E9E] text-sm font-medium text-white"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
