"use client";

import { useCallback, useState } from "react";

export default function ResumePage() {
  const resumeUrl = "/resume.pdf";
  const [scale, setScale] = useState(1);

  const zoomIn = useCallback(() => setScale((s) => Math.min(2.2, +(s + 0.1).toFixed(2))), []);
  const zoomOut = useCallback(() => setScale((s) => Math.max(0.6, +(s - 0.1).toFixed(2))), []);
  const resetZoom = useCallback(() => setScale(1), []);

  const openNewTab = useCallback(() => {
    try {
      window.dispatchEvent(new CustomEvent("gm:unlock", { detail: { id: "cv" } }));
    } catch {}
    window.open(resumeUrl, "_blank", "noopener,noreferrer");
  }, []);
  const handleDownload = useCallback(() => {
    const a = document.createElement("a");
    a.href = resumeUrl;
    a.download = "Luigi-Miraglia-Resume.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
    try { window.dispatchEvent(new CustomEvent("gm:unlock", { detail: { id: "cv" } })); } catch {}
  }, []);

  const baseW = 900; // px (used as max-width)

  return (
    <main className="mx-4 my-8 xl:mx-auto max-w-screen-xl">
      <header className="glass-box mb-4 flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4">
        <h1 className="text-lg font-semibold tracking-tight">Resume</h1>
        <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap sm:overflow-visible">
          <button onClick={zoomOut} className="btn-soft" aria-label="Zoom out">−</button>
          <span className="w-14 text-center tabular-nums text-sm">{(scale * 100).toFixed(0)}%</span>
          <button onClick={zoomIn} className="btn-soft" aria-label="Zoom in">+</button>
          <button onClick={resetZoom} className="btn-soft" aria-label="Reset zoom">Reset</button>
          <div className="mx-2 h-5 w-px bg-black/10" />
          <button onClick={handleDownload} className="btn-primary flex-shrink-0">Download</button>
          <button onClick={openNewTab} className="btn-soft flex-shrink-0">Open in new tab</button>
        </div>
      </header>

      <section className="glass-box overflow-auto px-3 py-3 sm:px-4 sm:py-4">
        <div className="flex justify-center">
          <div
            className="rounded-xl bg-white shadow-[0_20px_50px_-25px_rgba(2,6,23,0.4)] w-full"
            style={{
              width: "100%",
              maxWidth: baseW,
              aspectRatio: "1 / 1.414",
              transform: `scale(${scale})`,
              transformOrigin: "top center",
            }}
          >
            <object data={resumeUrl} type="application/pdf" className="h-full w-full rounded-xl">
              <div className="p-6 text-center text-sm text-neutral-700">
                Cannot preview the PDF here.
                <button onClick={openNewTab} className="ml-1 underline">Open in a new tab</button>
                .
              </div>
            </object>
          </div>
        </div>
      </section>
    </main>
  );
}
