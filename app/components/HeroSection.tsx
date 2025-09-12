"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Button from "./Button";
import EmojiAvatar from "./EmojiAvatar";
import Counter from "./Counter";

export default function HeroSection() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [roleIdx, setRoleIdx] = useState(0);
  const roles = ["Frontend Engineer", "Full‑Stack Developer", "System Thinker", "DX Enthusiast"];

  useEffect(() => {
    const t = setInterval(() => setRoleIdx((i) => (i + 1) % roles.length), 2200);
    return () => clearInterval(t);
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
  }, []);

  return (
    <section
      ref={wrapRef}
      onMouseMove={onMouseMove}
      className="aurora-wrap neon-spotlight mx-4 my-6 max-w-screen-xl rounded-3xl border border-neutral-200/70 bg-white/70 px-6 py-10 shadow-[0_10px_50px_-20px_rgba(0,0,0,0.25)] backdrop-blur-xl xl:mx-auto"
    >
      <span className="aurora-bg neon-aurora-bg" aria-hidden />
      <header className="relative z-10 grid grid-cols-1 items-center gap-10 sm:grid-cols-[auto,1fr]">
        <aside className="grid place-items-center">
          <EmojiAvatar />
        </aside>
        <hgroup className="flex flex-col gap-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-violet-700 via-blue-600 to-violet-700 bg-clip-text text-transparent">Luigi Miraglia</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-700/90">
            {roles[roleIdx]} crafting high‑performance, accessible apps with Next.js & TypeScript.
          </p>
          <p className="mt-2 flex flex-wrap gap-3">
            <Button className="bg-gradient-to-tr from-violet-700 to-blue-600 text-white px-5 py-2.5 hover:from-blue-600 hover:to-violet-700 shadow-sm" path="/resume">
              View Resume
            </Button>
            <Button className="chip" path="#projects">
              View Projects
            </Button>
            <button
              className="chip"
              onClick={() => window.dispatchEvent(new Event("open-cmdk"))}
            >
              Press ⌘K / Ctrl+K
            </button>
          </p>
          <ul className="mt-4 flex flex-wrap items-center gap-3 text-sm text-neutral-700/90">
            <li className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/70 px-3 py-1 backdrop-blur">
              <b className="text-neutral-900"><Counter to={98} />+</b>
              <span className="text-neutral-500">Lighthouse</span>
            </li>
            <li className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/70 px-3 py-1 backdrop-blur">
              <b className="text-neutral-900"><Counter to={10} />+</b>
              <span className="text-neutral-500">Projects</span>
            </li>
            <li className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/70 px-3 py-1 backdrop-blur">
              <span className="text-neutral-900 font-semibold">Next.js</span>
              <span className="text-neutral-500">TypeScript</span>
            </li>
          </ul>
        </hgroup>
      </header>
      <p className="pointer-events-none mt-6 flex items-center justify-center text-xs text-neutral-500">
        <span className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white/70 px-3 py-1 backdrop-blur">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-500" />
          <span>Press ⌘K / Ctrl+K for quick actions</span>
        </span>
      </p>
    </section>
  );
}
