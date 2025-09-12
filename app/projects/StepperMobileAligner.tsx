"use client";

import { useEffect } from "react";

export default function StepperMobileAligner({
  targetId = "case-stepper",
  interval = 2600,
}: {
  targetId?: string;
  interval?: number;
}) {
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    let timer: number | null = null;
    let idx = 0;

    const measureAndAnimate = () => {
      const root = document.getElementById(targetId);
      if (!root) return;
      const runner = root.querySelector<HTMLElement>(".stepper-runner");
      const items = Array.from(
        root.querySelectorAll<HTMLElement>(".stepper-item")
      );
      if (!runner || items.length === 0) return;

      const rootRectTop =
        root.getBoundingClientRect().top + window.scrollY;
      const centers = items.map((n) => {
        const r = n.getBoundingClientRect();
        return r.top + window.scrollY - rootRectTop + r.height / 2;
      });

      const apply = () => {
        const c = centers[idx % centers.length];
        runner.style.top = `${c}px`;
      };
      apply();

      if (timer) window.clearInterval(timer);
      timer = window.setInterval(() => {
        idx = (idx + 1) % centers.length;
        apply();
      }, interval);
    };

    const onResize = () => {
      if (!mq.matches) return;
      // throttle with rAF
      window.requestAnimationFrame(measureAndAnimate);
    };

    const start = () => {
      stop();
      if (!mq.matches) return;
      measureAndAnimate();
      window.addEventListener("resize", onResize);
      window.addEventListener("orientationchange", onResize);
      // re-measure after fonts/layout settle
      setTimeout(measureAndAnimate, 80);
    };

    const stop = () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    };

    start();
    mq.addEventListener("change", start);
    return () => {
      stop();
      mq.removeEventListener("change", start);
    };
  }, [targetId, interval]);

  return null;
}

