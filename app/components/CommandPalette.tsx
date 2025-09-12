"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Cmd = {
  id: string;
  label: string;
  run: () => void;
};

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const scrollTo = (sel: string) => {
    const el = document.querySelector(sel) as HTMLElement | null;
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const commands: Cmd[] = useMemo(
    () => [
      { id: "resume", label: "View Resume", run: () => router.push("/resume") },
      { id: "projects", label: "Go to Projects", run: () => scrollTo("#projects") },
      { id: "skills", label: "Go to Technologies", run: () => scrollTo("#skills") },
      { id: "download", label: "Download CV (PDF)", run: () => window.open("/resume.pdf", "_blank") },
      { id: "top", label: "Back to top", run: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
    ],
    [router]
  );

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return commands;
    return commands.filter((c) => c.label.toLowerCase().includes(q));
  }, [commands, query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "K") {
        e.preventDefault();
        setOpen(true);
        setTimeout(() => inputRef.current?.focus(), 0);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const onOpen = () => {
      setOpen(true);
      setTimeout(() => inputRef.current?.focus(), 0);
    };
    window.addEventListener("open-cmdk", onOpen as EventListener);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-cmdk", onOpen as EventListener);
    };
  }, []);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setCursor(0);
    }
  }, [open]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(c + 1, filtered.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(c - 1, 0));
    }
    if (e.key === "Enter") {
      filtered[cursor]?.run();
      setOpen(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <div className="relative mx-auto mt-24 w-full max-w-xl">
        <div className="rounded-2xl border border-neutral-800 bg-neutral-950/90 text-neutral-100 shadow-2xl">
          <div className="border-b border-neutral-800 p-3">
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Type a command or search…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-neutral-500"
            />
          </div>
          <ul className="max-h-64 overflow-auto py-1">
            {filtered.map((cmd, i) => (
              <li
                key={cmd.id}
                className={`cursor-pointer px-4 py-2 text-sm ${i === cursor ? "bg-neutral-800/70" : ""}`}
                onMouseEnter={() => setCursor(i)}
                onClick={() => {
                  cmd.run();
                  setOpen(false);
                }}
              >
                {cmd.label}
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="px-4 py-6 text-center text-sm text-neutral-500">No results</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
