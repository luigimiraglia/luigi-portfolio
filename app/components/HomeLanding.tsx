"use client";

import { useCallback, useEffect, useRef } from "react";
import Button from "./Button";
import { technologies } from "../data/Technogy";
import Counter from "./Counter";
import AvatarSelect from "./AvatarSelect";
import GameCharacter from "./GameCharacter";

export default function HomeLanding() {
  const wrapRef = useRef<HTMLElement | null>(null);
  // roadmap non richiede referenze speciali
  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const el = wrapRef.current as HTMLElement | null;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
  }, []);

  // (roadmap) nessuna animazione su scroll necessaria

  // Projects explorer replaced by journey timeline — no dynamic tags/filters

  // Smooth-scroll to #roadmap on initial mount when navigated from another page
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash === "#roadmap") {
      const el = document.getElementById("roadmap");
      if (el) {
        // wait one frame to ensure layout is ready
        requestAnimationFrame(() => el.scrollIntoView({ behavior: "smooth", block: "start" }));
      }
    }
  }, []);

  return (
    <section
      ref={wrapRef}
      onMouseMove={onMouseMove}
      className="aurora-wrap mx-0 my-0"
    >
      {/* Hero */}
      <header className="glass-box relative z-10 mx-4 my-8 grid max-w-screen-xl grid-cols-1 items-center gap-10 px-6 py-6 sm:grid-cols-[auto,1fr] sm:px-8 sm:py-8 xl:mx-auto">
        {/* Subtle ornament */}
        <span className="hero-ornament" aria-hidden />
        <aside className="grid place-items-center">
          <GameCharacter />
        </aside>
        <hgroup className="flex flex-col items-center gap-4 text-center">
          <span className="kicker">Available • Open to opportunities</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
            <span className="block text-neutral-900">Hi there,</span>
            <span className="block bg-gradient-to-r from-cyan-600 via-sky-500 to-cyan-600 bg-clip-text text-transparent">it&apos;s Luigi</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-700/90">
            Frontend Engineer crafting high‑performance, accessible apps with
            Next.js & TypeScript.
          </p>
          <p className="mt-3 flex flex-wrap justify-center gap-3">
            <Button className="btn-primary" path="/resume">
              View Resume
            </Button>
            <Button className="btn-soft" path="#roadmap">
              View Projects
            </Button>
          </p>
          <ul className="mt-4 flex flex-wrap items-center justify-center gap-3 text-sm text-neutral-700/90">
            <li className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 backdrop-blur">
              <b className="text-neutral-900">
                <Counter to={98} />+
              </b>
              <span className="text-neutral-500">Lighthouse</span>
            </li>
            <li className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 backdrop-blur">
              <b className="text-neutral-900">
                <Counter to={10} />+
              </b>
              <span className="text-neutral-500">Projects</span>
            </li>
            <li className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 backdrop-blur">
              <span className="text-neutral-900 font-semibold">Next.js</span>
              <span className="text-neutral-500">TypeScript</span>
            </li>
          </ul>
        </hgroup>
      </header>
      <p className="pointer-events-none mx-4 mt-2 flex items-center justify-center text-xs text-neutral-500 xl:mx-auto">
        <span className="flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 backdrop-blur">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-500" />
          <span>Press ⌘K / Ctrl+K for quick actions</span>
        </span>
      </p>
      {/* Highlights */}
      <ul className="mx-4 my-6 grid max-w-screen-xl grid-cols-1 gap-4 px-6 sm:grid-cols-3 xl:mx-auto">
        <li>
          <article className="rounded-3xl bg-white/80 p-5 shadow-xl backdrop-blur transition-transform duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.01]">
            <p className="text-4xl font-extrabold tracking-tight text-neutral-900">
              <Counter to={3} />
              <span className="text-neutral-700">M+</span>
            </p>
            <h3 className="mt-1 text-sm font-semibold text-neutral-700">
              Clicks generated
            </h3>
            <p className="mt-1 text-sm text-neutral-600">
              From shipped products and growth experiments
            </p>
          </article>
        </li>
        <li>
          <article className="rounded-3xl bg-white/80 p-5 shadow-xl backdrop-blur transition-transform duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.01]">
            <p className="text-4xl font-extrabold tracking-tight text-neutral-900">
              <Counter to={31} />
            </p>
            <h3 className="mt-1 text-sm font-semibold text-neutral-700">
              LeetCode problems solved
            </h3>
            <p className="mt-1 text-sm text-neutral-600">
              Daily practice to sharpen problem solving
            </p>
          </article>
        </li>
        <li>
          <article className="rounded-3xl bg-white/80 p-5 shadow-xl backdrop-blur transition-transform duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.01]">
            <p className="text-4xl font-extrabold tracking-tight text-neutral-900">
              <Counter to={40} />
              <span className="text-neutral-700">k+</span>
            </p>
            <h3 className="mt-1 text-sm font-semibold text-neutral-700">
              Active users
            </h3>
            <p className="mt-1 text-sm text-neutral-600">
              Across apps and experiments
            </p>
          </article>
        </li>
      </ul>

      {/* Choose your avatar (gamified) */}
      <section
        aria-labelledby="avatars"
        className="mx-4 my-8 max-w-screen-xl px-6 xl:mx-auto"
      >
        <header className="mb-4 text-center">
          <h2 id="avatars" className="text-lg font-semibold text-neutral-900">
            Choose your avatar
          </h2>
          <p className="text-sm text-neutral-600">
            Pick a role to see focused skills and mastery
          </p>
        </header>
        <AvatarSelect />
      </section>

      {/* Skills marquee */}
      <nav
        aria-label="Technologies marquee"
        className="marquee mx-4 my-6 max-w-screen-xl overflow-hidden rounded-2xl bg-white/70 py-4 backdrop-blur xl:mx-auto"
      >
        <ul className="marquee-track gap-8 px-6">
          {[...techRow(), ...techRow()].map((i, idx) => (
            <li
              key={`${i.name}-${idx}`}
              className="inline-flex items-center gap-3 rounded-full bg-white/80 px-3 py-1 backdrop-blur"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={i.icon} alt={i.name} width={28} height={28} />
              <span className="text-sm font-medium text-neutral-700">
                {i.name}
              </span>
            </li>
          ))}
        </ul>
      </nav>

      {/* Roadmap (from scratch): two project cards with title, one‑liner, top 3 wins, tech icons, CTAs */}
      <article
        id="roadmap"
        className="relative mx-4 my-12 max-w-screen-xl px-6 xl:mx-auto"
      >
        <header className="mb-6 text-center">
          <h2 className="bg-gradient-to-r from-cyan-600 to-sky-500 bg-clip-text text-[22px] font-bold font-stretch-115% text-transparent sm:text-3xl">
            Roadmap & Projects
          </h2>
        </header>
        <ol className="roadmap">
          <li className="roadmap-item">
            <article className="card-soft p-5">
              <header className="mb-2">
                <h3 className="text-xl font-bold tracking-tight text-neutral-900">
                  Content Platform
                </h3>
                <p className="text-sm text-neutral-700">
                  Static content engine with MDX, blazing SEO and authoring UX
                </p>
              </header>
              <ul className="check-list text-sm text-neutral-800">
                <li>SEO 98 • LCP 1.9s mobile</li>
                <li>Design system + MDX components</li>
                <li>Editor workflow for non‑tech authors</li>
              </ul>
              <ul className="tech-list mt-3">
                <li>
                  <img
                    className="tech-icon"
                    src="/next.svg"
                    alt="Next.js"
                    width="22"
                    height="22"
                  />
                </li>
                <li>
                  <img
                    className="tech-icon"
                    src="/typescript.svg"
                    alt="TypeScript"
                    width="22"
                    height="22"
                  />
                </li>
                <li>
                  <img
                    className="tech-icon"
                    src="/tailwind.svg"
                    alt="Tailwind"
                    width="22"
                    height="22"
                  />
                </li>
                <li>
                  <img
                    className="tech-icon"
                    src="/react.svg"
                    alt="React"
                    width="22"
                    height="22"
                  />
                </li>
              </ul>
              <footer className="mt-4 flex items-center gap-3">
                <a
                  className="btn-primary"
                  href="https://github.com/luigimiraglia/theoremz2.0"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    window.dispatchEvent(
                      new CustomEvent("gm:xp", { detail: { amount: 5 } })
                    )
                  }
                >
                  Apri progetto
                </a>
                <a
                  className="text-sm font-semibold text-cyan-700 hover:underline"
                  href="https://theoremz.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View live →
                </a>
              </footer>
            </article>
          </li>
          <li className="roadmap-item">
            <article className="card-soft p-5">
              <header className="mb-2">
                <h3 className="text-xl font-bold tracking-tight text-neutral-900">
                  Realtime Chat
                </h3>
                <p className="text-sm text-neutral-700">
                  Fast, resilient messaging with streaming and optimistic UI
                </p>
              </header>
              <ul className="check-list text-sm text-neutral-800">
                <li>TBT ≈ 0 • CLS ≈ 0</li>
                <li>Edge streaming + WebSockets</li>
                <li>Secure auth, roles, activity states</li>
              </ul>
              <ul className="tech-list mt-3">
                <li>
                  <img
                    className="tech-icon"
                    src="/react.svg"
                    alt="React"
                    width="22"
                    height="22"
                  />
                </li>
                <li>
                  <img
                    className="tech-icon"
                    src="/next.svg"
                    alt="Next.js"
                    width="22"
                    height="22"
                  />
                </li>
                <li>
                  <img
                    className="tech-icon"
                    src="/globe.svg"
                    alt="WebSockets"
                    width="22"
                    height="22"
                  />
                </li>
                <li>
                  <img
                    className="tech-icon"
                    src="/vercel.svg"
                    alt="Vercel"
                    width="22"
                    height="22"
                  />
                </li>
              </ul>
              <footer className="mt-4 flex items-center gap-3">
                <a
                  className="btn-primary"
                  href="#"
                  onClick={() =>
                    window.dispatchEvent(
                      new CustomEvent("gm:xp", { detail: { amount: 5 } })
                    )
                  }
                >
                  Apri progetto
                </a>
                <a
                  className="text-sm font-semibold text-cyan-700 hover:underline"
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View live →
                </a>
              </footer>
            </article>
          </li>
        </ol>
      </article>

      {/* Contact & links section removed as requested */}
    </section>
  );
}

function techRow() {
  return technologies.map((t) => ({ name: t.name, icon: t.icon }));
}
