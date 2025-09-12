"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Button from "./Button";
import Link from "next/link";
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
        requestAnimationFrame(() =>
          el.scrollIntoView({ behavior: "smooth", block: "start" })
        );
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
        <hgroup className="flex flex-col items-center gap-3 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
            <span className="block text-neutral-900">Hi there,</span>
            <span className="block bg-gradient-to-r from-cyan-600 via-sky-500 to-cyan-600 bg-clip-text text-transparent">
              it&apos;s Luigi
            </span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-700/90">
            Frontend Engineer crafting high‑performance, accessible apps with
            Next.js & TypeScript.
          </p>
          <span className="kicker kicker-white mt-2">
            <span className="pulse-dot mr-1" aria-hidden />
            Open for Summer 2026 Internships
          </span>
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
          <h2 className="bg-gradient-to-r from-cyan-600 to-sky-500 bg-clip-text text-3xl font-extrabold font-stretch-115% text-transparent sm:text-4xl">
            Roadmap & Projects
          </h2>
        </header>
        <ol className="roadmap">
          <li className="roadmap-item">
            <article className="card-soft p-5">
              <header className="mb-3">
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight bg-gradient-to-r from-cyan-600 to-sky-500 bg-clip-text text-transparent">
                  Content Platform
                </h3>
                <p className="text-sm text-neutral-700">
                  Static content engine with MDX, blazing SEO and authoring UX
                </p>
              </header>

              {/* Stack carousel */}
              <div className="mt-2 overflow-x-auto snap-x snap-mandatory">
                <ul className="flex min-w-max gap-2">
                  {[
                    { icon: "/next.svg", name: "Next.js" },
                    { icon: "/typescript.svg", name: "TypeScript" },
                    { icon: "/tailwind.svg", name: "Tailwind" },
                    { icon: "/react.svg", name: "React" },
                  ].map((t) => (
                    <li key={t.name} className="snap-start">
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/85 px-2 py-1 text-xs shadow-sm">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={t.icon} alt={t.name} width={18} height={18} />
                        <span className="font-medium text-neutral-700">
                          {t.name}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Images carousel with arrows */}
              <ImgCarousel
                images={[
                  "/theoremz-preview.png",
                  "/wave_apple.png",
                  "/logo.png",
                ]}
              />

              {/* Problem → Project → Results timeline */}
              <StepRoadmap
                steps={[
                  {
                    title: "Problem",
                    desc: "Authors struggle to publish SEO content fast",
                  },
                  {
                    title: "Project",
                    desc: "MDX platform + DS + editor workflow",
                  },
                  { title: "Results", desc: "LCP 1.9s, +30% velocity, SEO 98" },
                ]}
              />

              <footer className="mt-4 flex flex-wrap items-center gap-3 gap-y-2">
                <Link
                  className="btn-primary"
                  href="/projects/content-platform"
                  onClick={() =>
                    window.dispatchEvent(
                      new CustomEvent("gm:xp", { detail: { amount: 5 } })
                    )
                  }
                >
                  Apri progetto
                </Link>
                <a
                  className="text-sm font-semibold text-cyan-700 hover:underline whitespace-nowrap"
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
              <header className="mb-3">
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight bg-gradient-to-r from-cyan-600 to-sky-500 bg-clip-text text-transparent">
                  Realtime Chat
                </h3>
                <p className="text-sm text-neutral-700">
                  Fast, resilient messaging with streaming and optimistic UI
                </p>
              </header>

              {/* Stack carousel */}
              <div className="mt-2 overflow-x-auto snap-x snap-mandatory">
                <ul className="flex min-w-max gap-2">
                  {[
                    { icon: "/react.svg", name: "React" },
                    { icon: "/next.svg", name: "Next.js" },
                    { icon: "/globe.svg", name: "WebSockets" },
                    { icon: "/vercel.svg", name: "Vercel" },
                  ].map((t) => (
                    <li key={t.name} className="snap-start">
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/85 px-2 py-1 text-xs shadow-sm">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={t.icon} alt={t.name} width={18} height={18} />
                        <span className="font-medium text-neutral-700">
                          {t.name}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Images carousel with arrows */}
              <ImgCarousel
                images={["/logo.png", "/wave_apple.png", "/avatar.png"]}
              />

              {/* Problem → Project → Results timeline */}
              <StepRoadmap
                steps={[
                  {
                    title: "Problem",
                    desc: "Laggy chat and reliability issues",
                  },
                  {
                    title: "Project",
                    desc: "Edge streaming + WS + optimistic UI",
                  },
                  { title: "Results", desc: "TBT ≈ 0, CLS ≈ 0, ↑NPS" },
                ]}
              />

              <footer className="mt-4 flex flex-wrap items-center gap-3 gap-y-2">
                <Link
                  className="btn-primary"
                  href="/projects/realtime-chat"
                  onClick={() =>
                    window.dispatchEvent(
                      new CustomEvent("gm:xp", { detail: { amount: 5 } })
                    )
                  }
                >
                  Apri progetto
                </Link>
                <a
                  className="text-sm font-semibold text-cyan-700 hover:underline whitespace-nowrap"
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

function ImgCarousel({ images }: { images: string[] }) {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setIdx((i) => (i + 1) % images.length);
  if (!images.length) return null;
  const src = images[idx];
  return (
    <div className="relative mt-3">
      <div className="img-frame relative mx-auto w-[82%] sm:w-[68%] md:w-[54%] overflow-hidden rounded-2xl bg-white ring-1 ring-neutral-200/70 shadow-[0_24px_60px_-28px_rgba(2,6,23,0.35)]">
        <Image
          src={src}
          alt="preview"
          width={1024}
          height={640}
          className="h-full w-full object-cover"
        />
        <button
          type="button"
          aria-label="Previous image"
          className="btn-soft absolute left-2 top-1/2 -translate-y-1/2 rounded-full px-2 py-2"
          onClick={prev}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Next image"
          className="btn-soft absolute right-2 top-1/2 -translate-y-1/2 rounded-full px-2 py-2"
          onClick={next}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
        <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-white/90 px-2 py-0.5 text-[11px] text-neutral-700 shadow-sm">
          {idx + 1}/{images.length}
        </div>
      </div>
    </div>
  );
}

function StepRoadmap({ steps }: { steps: { title: string; desc: string }[] }) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [mobile, setMobile] = useState(false);
  const [positions, setPositions] = useState<number[]>([]);
  const [active, setActive] = useState(0);

  // Track viewport to switch to precise JS positioning on mobile
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const apply = () => setMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Measure step centers (only on mobile)
  useEffect(() => {
    if (!mobile) return;
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => {
      const rootTop = el.getBoundingClientRect().top + window.scrollY;
      const ys = itemRefs.current.map((n) => {
        if (!n) return 0;
        const r = n.getBoundingClientRect();
        const center = r.top + window.scrollY - rootTop + r.height / 2;
        return center;
      });
      setPositions(ys);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [mobile, steps.length]);

  // Auto-advance between steps
  useEffect(() => {
    if (!mobile) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % steps.length);
    }, 2600);
    return () => window.clearInterval(id);
  }, [mobile, steps.length]);

  // Current top for runner
  const topPx =
    mobile && positions.length === steps.length
      ? `${positions[active]}px`
      : undefined;

  return (
    <section className="mt-4">
      <div ref={wrapRef} className="stepper">
        <span className="stepper-line" aria-hidden />
        <span
          className="stepper-runner"
          aria-hidden
          style={
            mobile
              ? ({ top: topPx, animation: "none" } as React.CSSProperties)
              : undefined
          }
        />
        {steps.map((s, i) => (
          <div
            key={s.title + i}
            className="stepper-item"
            ref={(n) => {
              itemRefs.current[i] = n;
            }}
          >
            <div className="step-text mt-6 text-center sm:text-center">
              <div className="text-sm font-bold text-cyan-700">{s.title}</div>
              <div className="text-[13px] text-neutral-700">{s.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
