"use client";

import { useEffect, useRef } from "react";

export default function EmojiAvatar() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current as HTMLElement | null;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rx = ((y - rect.height / 2) / rect.height) * -10;
      const ry = ((x - rect.width / 2) / rect.width) * 10;
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    };
    const onLeave = () => {
      el.style.transform = `perspective(900px) rotateX(0deg) rotateY(0deg)`;
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const emoji = "🧑‍💻";
  const label = "Developer avatar";

  return (
    // single semantic container, no extra wrappers
    <figure
      ref={ref}
      className="avatar-frame floaty"
      aria-label={label}
    >
      <span className="select-none text-7xl sm:text-8xl">{emoji}</span>
    </figure>
  );
}
