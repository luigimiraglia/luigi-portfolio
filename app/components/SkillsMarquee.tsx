"use client";

import Image from "next/image";

const icons = [
  { src: "/react.svg", alt: "React" },
  { src: "/next.svg", alt: "Next.js" },
  { src: "/typescript.svg", alt: "TypeScript" },
  { src: "/javascript.svg", alt: "JavaScript" },
  { src: "/tailwind.svg", alt: "Tailwind" },
  { src: "/node-js.svg", alt: "Node.js" },
  { src: "/python.svg", alt: "Python" },
  { src: "/css.svg", alt: "CSS" },
  { src: "/html.svg", alt: "HTML" },
];

export default function SkillsMarquee() {
  const row = [...icons, ...icons];
  return (
    <section className="marquee mx-4 my-6 max-w-screen-xl overflow-hidden rounded-2xl border border-neutral-200/70 bg-white/70 py-4 backdrop-blur xl:mx-auto">
      <ul className="marquee-track gap-8 px-6">
        {row.map((i, idx) => (
          <li key={`${i.alt}-${idx}`} className="inline-flex items-center gap-3 rounded-full border border-neutral-200 bg-white/80 px-3 py-1 backdrop-blur">
            <Image src={i.src} alt={i.alt} width={28} height={28} />
            <span className="text-sm font-medium text-neutral-700">{i.alt}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
