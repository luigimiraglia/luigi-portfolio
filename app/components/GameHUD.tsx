"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";

type AchId = "explorer" | "finisher" | "cmdk" | "cv" | "connect" | "dots2";
type QuestId = "avatar" | "projects" | "cmdkq";

type Ach = {
  id: AchId;
  title: string;
  desc: string;
  emoji: string;
  points: number;
};

const ACHIEVEMENTS: Record<AchId, Ach> = {
  explorer: {
    id: "explorer",
    title: "Explorer",
    desc: "Reached 50% of the journey",
    emoji: "🧭",
    points: 20,
  },
  finisher: {
    id: "finisher",
    title: "Finisher",
    desc: "Reached the end of the journey",
    emoji: "🏁",
    points: 30,
  },
  cmdk: {
    id: "cmdk",
    title: "Command Wizard",
    desc: "Used the Command Palette",
    emoji: "🪄",
    points: 10,
  },
  cv: {
    id: "cv",
    title: "CV Collector",
    desc: "Downloaded the CV",
    emoji: "📄",
    points: 25,
  },
  connect: {
    id: "connect",
    title: "Connector",
    desc: "Opened a contact link",
    emoji: "🤝",
    points: 10,
  },
  dots2: {
    id: "dots2",
    title: "Treasure Hunter",
    desc: "Discovered 2 milestones",
    emoji: "💎",
    points: 15,
  },
};

export default function GameHUD() {
  const [open, setOpen] = useState(false);
  const [xp, setXp] = useState(0);
  const [unlocked, setUnlocked] = useState<Set<AchId>>(new Set());
  const [dots, setDots] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState<string | null>(null);
  const [quests, setQuests] = useState<Record<QuestId, boolean>>({
    avatar: false,
    projects: false,
    cmdkq: false,
  });
  const [talentOpen, setTalentOpen] = useState(false);

  // Load persisted state
  useEffect(() => {
    try {
      const xp0 = Number(localStorage.getItem("gm-xp") || "0");
      const ach0 = JSON.parse(localStorage.getItem("gm-achievements") || "[]");
      const d0 = JSON.parse(localStorage.getItem("gm-dots") || "[]");
      const q0 = JSON.parse(localStorage.getItem("gm-quests") || "null");
      setXp(isFinite(xp0) ? xp0 : 0);
      setUnlocked(new Set(ach0));
      setDots(new Set(d0));
      if (q0 && typeof q0 === "object") setQuests(q0);
      // prime refs to avoid false level-up on hydration
      prevXpRef.current = isFinite(xp0) ? xp0 : 0;
      hydratedRef.current = true;
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("gm-xp", String(xp));
  }, [xp]);
  useEffect(() => {
    localStorage.setItem(
      "gm-achievements",
      JSON.stringify(Array.from(unlocked))
    );
  }, [unlocked]);
  useEffect(() => {
    localStorage.setItem("gm-dots", JSON.stringify(Array.from(dots)));
  }, [dots]);
  useEffect(() => {
    localStorage.setItem("gm-quests", JSON.stringify(quests));
  }, [quests]);

  const award = useCallback((id: AchId) => {
    if (unlocked.has(id)) return;
    const ach = ACHIEVEMENTS[id];
    setUnlocked((s) => new Set(s).add(id));
    setXp((v) => v + ach.points);
    setToast(`${ach.emoji} Achievement unlocked: ${ach.title}`);
    // auto hide toast (longer)
    setTimeout(() => setToast(null), 4500);
  }, [unlocked]);

  const addXp = useCallback((amount: number) => setXp((v) => Math.max(0, v + amount)), []);

  const completeQuest = useCallback((id: QuestId, reward: number) => {
    setQuests((q) => {
      if (q[id]) return q;
      const next = { ...q, [id]: true };
      setToast(`✅ Quest completed: ${questTitle(id)} (+${reward} XP)`);
      setTimeout(() => setToast(null), 4500);
      setXp((v) => v + reward);
      return next;
    });
  }, []);

  // Level calc (100 XP per level)
  const level = Math.floor(xp / 100) + 1;
  const levelProg = xp % 100;
  const prevXpRef = useRef(0);
  const hydratedRef = useRef(false);
  useEffect(() => {
    // avoid triggering on initial hydration load
    if (!hydratedRef.current) return;
    const prevLv = Math.floor((prevXpRef.current || 0) / 100) + 1;
    const curLv = Math.floor(xp / 100) + 1;
    if (curLv > prevLv) {
      setToast(`✨ Level Up! Lv ${curLv}`);
      setTimeout(() => setToast(null), 4800);
    }
    prevXpRef.current = xp;
  }, [xp]);

  // Event listeners
  useEffect(() => {
    const onUnlock = (e: Event) => {
      const det = (e as CustomEvent).detail as { id?: AchId };
      if (!det?.id) return;
      if (det.id in ACHIEVEMENTS) award(det.id as AchId);
      if (det.id === "cmdk") completeQuest("cmdkq", 5);
    };
    const onXp = (e: Event) => {
      const det = (e as CustomEvent).detail as { amount?: number };
      if (typeof det?.amount === "number") addXp(det.amount);
    };
    const onDot = (e: Event) => {
      const det = (e as CustomEvent).detail as { id?: string };
      if (!det?.id) return;
      setDots((s) => {
        const next = new Set(s);
        next.add(det.id!);
        if (next.size >= 2) award("dots2");
        return next;
      });
      addXp(5);
    };
    window.addEventListener("gm:unlock", onUnlock as EventListener);
    window.addEventListener("gm:xp", onXp as EventListener);
    window.addEventListener("gm:dot", onDot as EventListener);
    return () => {
      window.removeEventListener("gm:unlock", onUnlock as EventListener);
      window.removeEventListener("gm:xp", onXp as EventListener);
      window.removeEventListener("gm:dot", onDot as EventListener);
    };
  }, [award, completeQuest, addXp]);

  // Observe #roadmap for quest completion (robust attach)
  useEffect(() => {
    if (quests.projects) return;
    let io: IntersectionObserver | null = null;
    let mo: MutationObserver | null = null;
    const attach = () => {
      const el = document.getElementById("roadmap");
      if (!el) return false;
      io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            completeQuest("projects", 10);
            if (io) {
              io.disconnect();
              io = null;
            }
            if (mo) {
              mo.disconnect();
              mo = null;
            }
          }
        },
        { threshold: 0.4 }
      );
      io.observe(el);
      return true;
    };
    if (!attach()) {
      mo = new MutationObserver(() => attach());
      mo.observe(document.body, { childList: true, subtree: true });
      const onHash = () => attach();
      window.addEventListener("hashchange", onHash);
      return () => {
        if (io) io.disconnect();
        if (mo) mo.disconnect();
        window.removeEventListener("hashchange", onHash);
      };
    }
  }, [quests.projects, completeQuest]);

  // Listen for avatar selection
  useEffect(() => {
    if (quests.avatar) return;
    const onSel = () => {
      completeQuest("avatar", 10);
    };
    window.addEventListener("avatar:selected", onSel as EventListener);
    return () =>
      window.removeEventListener("avatar:selected", onSel as EventListener);
  }, [quests.avatar, completeQuest]);

  // Global scroll achievements (Explorer/Finisher by site scroll depth)
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const doc = document.documentElement;
        const max = Math.max(1, doc.scrollHeight - doc.clientHeight);
        const p = Math.max(0, Math.min(1, window.scrollY / max));
        if (p >= 0.5) award("explorer");
        if (p >= 0.95) award("finisher");
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    // initial check
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [award]);

  

  function questTitle(id: QuestId) {
    switch (id) {
      case "avatar":
        return "Choose an avatar";
      case "projects":
        return "Explore Projects";
      case "cmdkq":
        return "Open Command Palette";
    }
  }

  const progressLabel = useMemo(() => `${levelProg}%`, [levelProg]);

  return (
    <div className="game-hud">
      {/* Talent CTA */}
      <button
        className="talent-btn text-sm"
        onClick={() => setTalentOpen(true)}
      >
        <span className="pulse-dot mr-1" aria-hidden />
        Looking for a young talent?
      </button>

      {/* Modal */}
      {talentOpen && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          onClick={() => setTalentOpen(false)}
        >
          <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
            <header className="modal-head">
              <div className="flex items-center gap-3">
                <span className="avatar-emoji" aria-hidden>
                  🧑‍💻
                </span>
                <div>
                  <h3 className="text-lg font-bold text-neutral-900">
                    Luigi Miraglia
                  </h3>
                  <div className="text-sm text-neutral-700">
                    <span aria-hidden>🟢</span>
                    <span className="ml-2">Open to internship and early career opportunities</span>
                  </div>
                </div>
              </div>
              <button
                className="btn-soft px-3 py-1"
                onClick={() => setTalentOpen(false)}
              >
                Close
              </button>
            </header>

            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <div className="text-sm font-semibold text-neutral-800">
                  📅 Duration
                </div>
                <div className="text-sm text-neutral-600">
                  Summer 2026 internship • 3–4 months • Full-time
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold text-neutral-800">
                  🌍 Location
                </div>
                <div className="text-sm text-neutral-600">
                  San Francisco Bay Area • Open to Europe (Berlin, London, Nordics)
                </div>
              </div>
            </section>

            <section className="mt-2">
              <div className="text-sm font-semibold text-neutral-800">
                🛠 Tech stack
              </div>
              <div className="grid grid-cols-1 gap-1 text-sm text-neutral-700 sm:grid-cols-2">
                <ul className="list-disc pl-5 space-y-1">
                  <li><span className="font-semibold text-neutral-800">Frontend:</span> Next.js, React, TypeScript, Tailwind, CSS, UI/UX design</li>
                  <li><span className="font-semibold text-neutral-800">Backend:</span> Node.js, Express, REST APIs, WebSockets</li>
                  <li><span className="font-semibold text-neutral-800">Databases:</span> PostgreSQL, Prisma ORM, MongoDB, SQL basics</li>
                </ul>
                <ul className="list-disc pl-5 space-y-1">
                  <li><span className="font-semibold text-neutral-800">DevOps & Cloud:</span> Vercel, Docker (basics), Git/GitHub CI</li>
                  <li><span className="font-semibold text-neutral-800">AI/ML:</span> LLM integration, RAG pipelines, embeddings, prompt engineering</li>
                  <li><span className="font-semibold text-neutral-800">Other:</span> Performance optimization, accessibility (a11y), SEO</li>
                </ul>
              </div>
            </section>

            <section className="mt-3">
              <div className="text-sm font-semibold text-neutral-800">
                💡 What I bring
              </div>
              <p className="text-sm text-neutral-700">
                Relentless work ethic, energy, and adaptability. I thrive in fast-paced teams, push myself to go the extra mile, and stay focused on collective success. Always ready to learn quickly and contribute wherever needed.
              </p>
            </section>

            <footer className="mt-4 flex flex-wrap gap-2">
              <a className="btn-primary" href="/resume.pdf" download>
                Download CV
              </a>
              <a
                className="inline-flex items-center gap-2 rounded-xl bg-neutral-900/90 text-white px-4 py-2 transition-colors hover:bg-neutral-900"
                href="https://github.com/luigimiraglia"
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/github-white.svg" alt="GitHub" width={18} height={18} />
                <span>GitHub</span>
              </a>
              <a className="btn-soft" href="/resume">
                View Resume
              </a>
              <a
                className="btn-soft"
                href="mailto:work@example.com?subject=Opportunities%20with%20Luigi"
              >
                Email
              </a>
            </footer>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && <div className="hud-toast">{toast}</div>}
      {/* Toggle */}
      <button
        className="hud-toggle"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="hud-xp-label">Lv {level}</span>
        <span
          className="hud-xp-track"
          aria-label={`Level progress ${progressLabel}`}
        >
          <span className="hud-xp-fill" style={{ width: `${levelProg}%` }} />
        </span>
        <span className="hud-count">{unlocked.size}/6</span>
      </button>
      {/* Panel */}
      {open && (
        <div className="hud-panel">
          <header className="hud-panel-head">
            <strong>Achievements</strong>
            <span className="hud-small">Earn XP by exploring</span>
          </header>
          <ul className="hud-list">
            {Object.values(ACHIEVEMENTS).map((a) => {
              const isOn = unlocked.has(a.id);
              return (
                <li key={a.id} className={`hud-item ${isOn ? "on" : "off"}`}>
                  <span className="hud-emoji" aria-hidden>
                    {a.emoji}
                  </span>
                  <div>
                    <div className="hud-title">{a.title}</div>
                    <div className="hud-desc">{a.desc}</div>
                  </div>
                  <span className="hud-points">+{a.points}</span>
                </li>
              );
            })}
          </ul>
          <header className="hud-panel-head mt-2">
            <strong>Quests</strong>
            <span className="hud-small">Mini goals for extra XP</span>
          </header>
          <ul className="hud-list">
            {(["avatar", "projects", "cmdkq"] as QuestId[]).map((qid) => {
              const done = quests[qid];
              return (
                <li
                  key={qid}
                  className={`quest-item ${done ? "done" : "todo"}`}
                >
                  <span className="quest-check" aria-hidden>
                    {done ? "✔" : "○"}
                  </span>
                  <div className="quest-title">{questTitle(qid)}</div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
