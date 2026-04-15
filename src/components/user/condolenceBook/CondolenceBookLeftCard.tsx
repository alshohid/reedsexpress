"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";

function PrintIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M7 8V5.5C7 4.67 7.67 4 8.5 4h7C16.33 4 17 4.67 17 5.5V8"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
            />
            <path
                d="M7 17h10v3H7v-3Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
            />
            <path
                d="M6.5 10H17.5C18.88 10 20 11.12 20 12.5V15c0 1.1-.9 2-2 2h-1"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
            />
            <path
                d="M7 17H6c-1.1 0-2-.9-2-2v-2.5C4 11.12 5.12 10 6.5 10"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
            />
        </svg>
    );
}

function ShareIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M14 5h5v5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M10 14L19 5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
            />
            <path
                d="M19 14v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
            />
        </svg>
    );
}

export default function CondolenceBookLeftCard() {
    const router = useRouter();
    const printAreaRef = useRef<HTMLDivElement | null>(null);

    const handlePrint = () => {
        if (!printAreaRef.current) return;

        const printContents = printAreaRef.current.innerHTML;
        const w = window.open("", "", "height=800,width=1000");
        if (!w) return;

        w.document.write(`
      <html>
        <head>
          <title>Print</title>
          <style>
            * { box-sizing: border-box; }
            body { margin: 0; padding: 24px; font-family: ui-sans-serif, system-ui; }
            img { max-width: 100%; }
          </style>
        </head>
        <body>
          ${printContents}
        </body>
      </html>
    `);
        w.document.close();
        w.focus();
        w.print();
        w.close();
    };

    return (
        <div className="w-full lg:flex-1">
            {/* OUTER WHITE CARD like screenshot */}
            <div className="w-full rounded-[12px] border border-[#E9E9EA] bg-white p-4 sm:p-5">
                {/* BOOK COVER */}
                <div
                    className="
            relative w-full overflow-hidden
            rounded-[12px]
            border border-[#C3D4B3]
            border-b-[10px]
            bg-[#F4F6F3]
          "
                >
                    {/* subtle texture bg */}
                    <div className="absolute inset-0 opacity-25">
                        <Image
                            src="/images/condolence_bg.jpg"
                            alt="Background"
                            fill
                            className="object-cover"
                            priority={false}
                        />
                    </div>

                    {/* top right icons */}
                    <div className="absolute right-4 top-4 z-10 flex items-center gap-2 text-[#6D7A66] print:hidden">
                        <button
                            onClick={handlePrint}
                            className="grid h-9 w-9 place-items-center rounded-lg hover:bg-black/5"
                            aria-label="Print"
                            type="button"
                        >
                            <PrintIcon />
                        </button>
                        <button
                            className="grid h-9 w-9 place-items-center rounded-lg hover:bg-black/5"
                            aria-label="Share"
                            type="button"
                        >
                            <ShareIcon />
                        </button>
                    </div>

                    {/* PRINT AREA (only this block prints) */}
                    <div ref={printAreaRef} className="relative">
                        <div className="flex flex-col items-center gap-5 px-6 py-8 sm:py-10">
                            {/* image block (square) */}
                            <div className="w-full max-w-[520px]">
                                <div className="relative w-full aspect-[1/1] overflow-hidden rounded-[14px]">
                                    <Image
                                        src="/images/condolence_img.png"
                                        alt="Condolence Art"
                                        fill
                                        className="object-contain"
                                        priority={false}
                                    />
                                </div>
                            </div>

                            {/* text */}
                            <div className="text-center">
                                <p className="text-[12px] text-gray-600">Condolence Book for</p>

                                <h2
                                    className="mt-2 text-[#708161] font-medium leading-tight"
                                    style={{ fontFamily: "var(--font-domine)", fontSize: "2rem" }}
                                >
                                    Isabel Pérez (née Blanco)
                                </h2>

                                <p className="mt-2 text-[14px] font-semibold text-[#1D1F2C]">
                                    1978-2025
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* BOTTOM BUTTONS like screenshot */}
                <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 print:hidden">
                    <button
                        type="button"
                        className="
              h-12 w-full sm:w-[220px]
              rounded-[10px]
              bg-[linear-gradient(180deg,#394034_0%,#4F5747_100%)]
              text-white text-[14px] font-medium
              hover:opacity-90 transition
            "
                    >
                        Edit the Book
                    </button>

                    <button
                        onClick={() => router.push('/user/dashboard/condolence-book')}
                        type="button"
                        className="
              h-12 w-full sm:w-[220px]
              rounded-[10px]
              bg-[linear-gradient(180deg,#394034_0%,#4F5747_100%)]
              text-white text-[14px] font-medium
              hover:opacity-90 transition
            "
                    >
                        Back to Condolense
                    </button>
                </div>
            </div>
        </div>
    );
}