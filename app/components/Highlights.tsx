"use client";

import Counter from "./Counter";

const items = [
  {
    title: "Clicks generated",
    metric: 3,
    suffix: "M+",
    desc: "From shipped products and growth experiments",
  },
  {
    title: "LeetCode problems solved",
    metric: 31,
    suffix: "",
    desc: "Daily practice to sharpen problem solving",
  },
  {
    title: "Active users",
    metric: 40,
    suffix: "k+",
    desc: "Across apps and experiments",
  },
];

export default function Highlights() {
  return (
    <section className="mx-4 my-6 grid max-w-screen-xl grid-cols-1 gap-4 sm:grid-cols-3 xl:mx-auto">
      {items.map((it) => (
        <article
          key={it.title}
          className="rounded-3xl border border-neutral-200/70 bg-white/80 p-5 shadow-xl backdrop-blur transition-transform duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.01]"
        >
          <p className="text-4xl font-extrabold tracking-tight text-neutral-900">
            <Counter to={it.metric} />
            <span className="text-neutral-700">{it.suffix}</span>
          </p>
          <h3 className="mt-1 text-sm font-semibold text-neutral-700">{it.title}</h3>
          <p className="mt-1 text-sm text-neutral-600">{it.desc}</p>
        </article>
      ))}
    </section>
  );
}
