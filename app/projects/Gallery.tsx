"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

export default function Gallery({ images }: { images: string[] }) {
  const safe = useMemo(() => (images && images.length ? images : ["/logo.png"]), [images]);
  const [idx, setIdx] = useState(0);
  const img = safe[idx % safe.length];
  const next = () => setIdx((i) => (i + 1) % safe.length);
  const prev = () => setIdx((i) => (i - 1 + safe.length) % safe.length);
  return (
    <div className="relative">
      <Image src={img} alt="preview" width={1600} height={900} className="h-full w-full object-cover" />
      <button
        aria-label="Prev"
        onClick={prev}
        className="btn-soft absolute left-1.5 sm:left-2 top-1/2 -translate-y-1/2 rounded-full px-1.5 py-1.5 sm:px-2 sm:py-2"
      >
        <svg className="w-3.5 h-3.5 sm:w-[18px] sm:h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
      </button>
      <button
        aria-label="Next"
        onClick={next}
        className="btn-soft absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 rounded-full px-1.5 py-1.5 sm:px-2 sm:py-2"
      >
        <svg className="w-3.5 h-3.5 sm:w-[18px] sm:h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
      </button>
      <div className="pointer-events-none absolute bottom-1.5 sm:bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-white/90 px-1.5 py-[1px] sm:px-2 sm:py-0.5 text-[10px] sm:text-[11px] text-neutral-700">
        {idx + 1}/{safe.length}
      </div>
    </div>
  );
}
