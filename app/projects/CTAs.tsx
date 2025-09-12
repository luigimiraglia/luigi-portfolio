"use client";

import Link from "next/link";

export default function CTAs({ links }: { links: { label: string; href: string }[] }) {
  const filtered = links.filter((l) => !/case study/i.test(l.label));
  return (
    <>
      {filtered.map((l) => {
        const isInternal = l.href.startsWith("/");
        const className = l.label === "Live" ? "btn-primary px-4 py-2" : "btn-soft px-4 py-2";
        const onClick = () => {
          try { window.dispatchEvent(new CustomEvent("gm:xp", { detail: { amount: 5 } })); } catch {}
        };
        return isInternal ? (
          <Link key={l.label} href={l.href} className={className} onClick={onClick}>
            {l.label}
          </Link>
        ) : (
          <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className={className} onClick={onClick}>
            {l.label}
          </a>
        );
      })}
    </>
  );
}

