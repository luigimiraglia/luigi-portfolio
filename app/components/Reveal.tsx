"use client";

import { PropsWithChildren, useEffect, useRef } from "react";
import type { JSX as JSXInternal } from "react";

type Intrinsic = keyof JSXInternal.IntrinsicElements;

interface RevealProps extends PropsWithChildren {
  delay?: number;
  className?: string;
  as?: Intrinsic;
}

export default function Reveal({
  children,
  delay = 0,
  className = "",
  as: As = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current as HTMLElement | null;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = `${delay}ms`;
          el.classList.add("reveal-in");
          io.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    el.classList.add("reveal-hide");
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    // @ts-expect-error generic intrinsic element
    <As ref={ref} className={className}>
      {children}
    </As>
  );
}
