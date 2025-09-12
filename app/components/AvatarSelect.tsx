"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { technologies } from "../data/Technogy";

type Skill = { name: string; level: number };
type Avatar = {
  id: string;
  name: string;
  emoji: string;
  tag: string;
  top: string[];
  skills: Skill[];
  ability: string;
  weakness: string;
  superpower: string;
};

// Removed ring charts; now using icons + flavor text

const AVATARS: Avatar[] = [
  {
    id: "frontend",
    name: "Frontend Builder",
    emoji: "🧑‍💻",
    tag: "Ship beautiful, fast UIs",
    top: ["React", "Next.js", "Performance"],
    skills: [
      { name: "React", level: 90 },
      { name: "Next.js", level: 92 },
      { name: "TypeScript", level: 88 },
      { name: "Performance", level: 95 },
      { name: "Accessibility", level: 85 },
    ],
    ability: "Component wizardry, CSS sorcery, a11y sense",
    weakness: "Overpolishes pixels and micro‑interactions",
    superpower: "Ships high‑perf UIs overnight",
  },
  {
    id: "backend",
    name: "Backend Forger",
    emoji: "🛠️",
    tag: "Craft reliable APIs & systems",
    top: ["Node.js", "DB", "API"],
    skills: [
      { name: "Node.js", level: 85 },
      { name: "API Design", level: 90 },
      { name: "Databases", level: 82 },
      { name: "Scaling", level: 78 },
      { name: "Security", level: 74 },
    ],
    ability: "API forging, database shaping, reliability",
    weakness: "Falls into refactor rabbit holes",
    superpower: "Sees bottlenecks before they happen",
  },
  {
    id: "ai",
    name: "AI Wizard",
    emoji: "🧙‍♂️",
    tag: "Infuse products with AI",
    top: ["LLMs", "Python", "RAG"],
    skills: [
      { name: "Python", level: 88 },
      { name: "LLMs", level: 83 },
      { name: "Prompting", level: 85 },
      { name: "Vector DB", level: 72 },
      { name: "Evaluation", level: 70 },
    ],
    ability: "Prompt alchemy, tooling, rapid prototyping",
    weakness: "Spends too long evaluating models",
    superpower: "Makes AI feel like magic",
  },
];

export default function AvatarSelect() {
  const [started, setStarted] = useState(false);
  const [selected, setSelected] = useState<string>("frontend");

  // Focus the START button for immediate interaction
  const startBtnRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    startBtnRef.current?.focus();
  }, []);

  // Change avatar helper: centralize events + XP
  function selectByIndex(nextIdx: number) {
    const size = AVATARS.length;
    const idx = ((nextIdx % size) + size) % size;
    const a = AVATARS[idx];
    if (a.id === selected) return; // avoid duplicate events/xp
    setSelected(a.id);
    try {
      window.dispatchEvent(
        new CustomEvent("avatar:selected", { detail: { avatar: a } })
      );
      window.dispatchEvent(new CustomEvent("gm:xp", { detail: { amount: 5 } }));
    } catch {}
  }

  // One-at-a-time carousel view with arrows + 3D tilt
  const currentIndex = useMemo(
    () => Math.max(0, AVATARS.findIndex((x) => x.id === selected)),
    [selected]
  );

  const cardRef = useRef<HTMLDivElement | null>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = ((y - rect.height / 2) / rect.height) * -10;
    const ry = ((x - rect.width / 2) / rect.width) * 10;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  };
  const onLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = `perspective(900px) rotateX(0deg) rotateY(0deg)`;
  };

  const prev = () => selectByIndex(currentIndex - 1);
  const next = () => selectByIndex(currentIndex + 1);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
  };

  const a = AVATARS[currentIndex] || AVATARS[0];

  function iconFor(name: string) {
    const t = technologies.find(
      (x) => x.name.toLowerCase() === name.toLowerCase()
    );
    return t?.icon || "/file.svg";
  }

  if (!started) {
    return (
      <div className="card-soft p-6 sm:p-8 text-center flex flex-col items-center gap-4">
        <div className="text-sm text-neutral-600">Ready player?</div>
        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          <span className="text-shimmer">Press START</span>
          <span className="ml-2 text-neutral-800">to select your avatar</span>
        </h3>
        <button
          ref={startBtnRef}
          type="button"
          className="btn-primary px-6 py-2.5 animate-pulse"
          onClick={() => setStarted(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") setStarted(true);
          }}
          aria-label="Press start to choose your avatar"
        >
          START
        </button>
        <div className="flex items-center gap-2 text-xs text-neutral-500">
          <span className="pulse-dot" aria-hidden />
          <span>Tip: premi Invio o Spazio</span>
        </div>
      </div>
    );
  }

  return (
    <div
      role="group"
      aria-label="Avatar selector"
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="relative mx-auto grid max-w-xl items-center"
    >
      <button
        type="button"
        aria-label="Previous avatar"
        className="btn-soft absolute -left-3 top-1/2 -translate-y-1/2 rounded-full px-2 py-2"
        onClick={prev}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
      </button>

      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="avatar-card text-left mx-8"
        onClick={() => selectByIndex(currentIndex)}
      >
        <div className="flex items-center gap-3">
          <span className="avatar-emoji" aria-hidden>{a.emoji}</span>
          <div>
            <div className="avatar-title">{a.name}</div>
            <div className="avatar-tag">{a.tag}</div>
          </div>
        </div>
        {/* Skill icons */}
        <ul className="mt-3 tech-list">
          {a.top.map((t) => (
            <li key={t} className="inline-flex items-center gap-2 rounded-full bg-white/80 px-2 py-1 backdrop-blur">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={iconFor(t)} alt={t} width={22} height={22} className="tech-icon" />
              <span className="text-xs font-medium text-neutral-700">{t}</span>
            </li>
          ))}
        </ul>

        {/* Flavor panel */}
        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3" aria-label="Character traits">
          <article className="rounded-lg bg-white/85 p-3 shadow-sm">
            <div className="text-xs font-semibold text-neutral-700">Abilities</div>
            <div className="text-sm text-neutral-700">{a.ability}</div>
          </article>
          <article className="rounded-lg bg-white/85 p-3 shadow-sm">
            <div className="text-xs font-semibold text-neutral-700">Weakness</div>
            <div className="text-sm text-neutral-700">{a.weakness}</div>
          </article>
          <article className="rounded-lg bg-white/85 p-3 shadow-sm">
            <div className="text-xs font-semibold text-neutral-700">Superpower</div>
            <div className="text-sm text-neutral-700">{a.superpower}</div>
          </article>
        </div>
      </div>

      <button
        type="button"
        aria-label="Next avatar"
        className="btn-soft absolute -right-3 top-1/2 -translate-y-1/2 rounded-full px-2 py-2"
        onClick={next}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
      </button>

      <div className="mt-2 text-center text-xs text-neutral-600">
        Use ← → to switch avatar
      </div>
    </div>
  );
}
