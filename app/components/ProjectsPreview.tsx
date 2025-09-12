"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import { projects } from "../data/projects";
import Reveal from "./Reveal";

export default function ProjectsPreview() {
  const tags = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.stack.forEach((s) => set.add(s)));
    return ["All", ...Array.from(set)];
  }, []);
  const [active, setActive] = useState("All");
  const filtered = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.stack.includes(active))),
    [active]
  );

  return (
    <section id="projects">
      <Reveal as="header" className="mx-5 max-w-screen-xl xl:mx-auto">
        <h2 className="bg-gradient-to-r from-violet-700 to-blue-600 bg-clip-text text-[22px] font-bold font-stretch-115% text-transparent sm:text-3xl">
          Projects Explorer
        </h2>
      </Reveal>
      <Reveal as="nav" delay={60} className="mx-4 mt-3 max-w-screen-xl xl:mx-auto">
        <ul className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <li key={t}>
              <button
                onClick={() => setActive(t)}
                className={`chip ${active === t ? "chip-active" : ""}`}
              >
                {t}
              </button>
            </li>
          ))}
        </ul>
      </Reveal>
      <Reveal as="ul" delay={120} className="mx-4 my-4 grid max-w-screen-xl grid-cols-1 gap-4 rounded-2xl border border-neutral-200/70 bg-white/70 p-2 backdrop-blur sm:grid-cols-2 xl:mx-auto xl:grid-cols-3">
        {filtered.map((p) => (
          <li key={p.name} className="contents">
            <article className="grid rounded-2xl border border-neutral-200 bg-white p-3">
              <figure className="overflow-hidden rounded-xl">
                <Image
                  src={p.iconPath}
                  alt={p.name}
                  width={1200}
                  height={720}
                  className="w-full border border-neutral-200 object-cover"
                />
              </figure>
              <header className="mt-2">
                <h3 className="text-lg font-semibold font-stretch-105%">{p.name}</h3>
              </header>
              <details className="mt-1 text-sm text-neutral-700">
                <summary className="cursor-pointer select-none rounded-md bg-gray-100 px-2 py-1 text-xs text-neutral-700 hover:bg-gray-200">
                  {"Read more"}
                </summary>
                <p className="mt-2 leading-relaxed">{p.description}</p>
              </details>
              <ul aria-label="Tech stack" className="mt-2 flex flex-wrap gap-1">
                {p.stack.map((s) => (
                  <li key={s} className="chip text-xs">
                    {s}
                  </li>
                ))}
              </ul>
              <footer className="mt-3 inline-flex gap-2">
                {p.liveUrl && (
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="chip"
                  >
                    Live
                  </a>
                )}
                {p.repoUrl && (
                  <a
                    href={p.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="chip"
                  >
                    GitHub
                  </a>
                )}
              </footer>
            </article>
          </li>
        ))}
      </Reveal>
    </section>
  );
}
