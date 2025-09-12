// Image used within Gallery client component
import Link from "next/link";
import CTAs from "../CTAs";
import Gallery from "../Gallery";

type Project = {
  slug: string;
  title: string;
  subtitle: string;
  kpis: { label: string; value: string }[];
  hero: string;
  gallery: string[];
  video?: string;
  stack: { name: string; icon: string }[];
  problem: string;
  solution: string;
  results: string[];
  responsibilities: string[];
  highlights: string[];
  links: { label: string; href: string }[];
};

const DATA: Record<string, Project> = {
  "content-platform": {
    slug: "content-platform",
    title: "Content Platform",
    subtitle: "Static content engine with MDX, blazing SEO and authoring UX",
    kpis: [
      { label: "LCP mobile", value: "1.9s" },
      { label: "SEO score", value: "98" },
      { label: "Velocity", value: "+30%" },
    ],
    hero: "/theoremz-preview.png",
    gallery: ["/theoremz-preview.png", "/wave_apple.png", "/logo.png"],
    video: "https://www.youtube.com/embed/ysz5S6PUM-U?rel=0",
    stack: [
      { name: "Next.js", icon: "/next.svg" },
      { name: "TypeScript", icon: "/typescript.svg" },
      { name: "React", icon: "/react.svg" },
      { name: "Tailwind", icon: "/tailwind.svg" },
    ],
    problem:
      "Authors struggle to publish SEO‑ready content fast and consistently.",
    solution:
      "Built an MDX platform with a design system, editor workflow, instant previews and automated SEO hygiene.",
    results: [
      "LCP 1.9s on 4G devices",
      "+30% content velocity",
      "Accessibility AA across pages",
    ],
    responsibilities: [
      "Architecture, DX and performance budget",
      "Design system + content components",
      "Authoring tools and preview pipeline",
    ],
    highlights: [
      "Edge‑rendered MDX + image optimization",
      "Composable SEO + rich snippets",
      "Site‑wide a11y audits and fixes",
    ],
    links: [
      { label: "Live", href: "https://example.com" },
      { label: "Case study (PDF)", href: "/resume.pdf" },
      {
        label: "Contact",
        href: "mailto:work@example.com?subject=Content%20Platform",
      },
    ],
  },
  "realtime-chat": {
    slug: "realtime-chat",
    title: "Realtime Chat",
    subtitle: "Fast, resilient messaging with streaming and optimistic UI",
    kpis: [
      { label: "TBT", value: "≈ 0" },
      { label: "CLS", value: "≈ 0" },
      { label: "NPS", value: "↑" },
    ],
    hero: "/logo.png",
    gallery: ["/logo.png", "/wave_apple.png", "/avatar.png"],
    video: "https://www.youtube.com/embed/1La4QzGeaaQ?rel=0",
    stack: [
      { name: "React", icon: "/react.svg" },
      { name: "Next.js", icon: "/next.svg" },
      { name: "WebSockets", icon: "/globe.svg" },
      { name: "Vercel", icon: "/vercel.svg" },
    ],
    problem: "Laggy chat, poor reliability and inconsistent UX.",
    solution:
      "Edge streaming with WebSockets, presence, optimistic updates and robust error handling.",
    results: ["TBT ~ 0", "CLS ~ 0", "Perceived latency ↓"],
    responsibilities: [
      "Client state + optimistic reconciliation",
      "Presence and typing indicators",
      "Resilience, retries and backoff",
    ],
    highlights: [
      "Streaming UI with Suspense boundaries",
      "Granular suspense + skeleton states",
      "Instrumented with Web Vitals",
    ],
    links: [
      { label: "Live", href: "#" },
      { label: "Demo video", href: "#" },
      {
        label: "Contact",
        href: "mailto:work@example.com?subject=Realtime%20Chat",
      },
    ],
  },
  leadlift: {
    slug: "leadlift",
    title: "LeadLift",
    subtitle: "Lightweight outbound micro‑CRM for prospecting and nurturing",
    kpis: [
      { label: "Reply rate", value: "+12%" },
      { label: "Conversion", value: "+6%" },
      { label: "Deploy", value: "Vercel" },
    ],
    hero: "/logo.png",
    gallery: ["/leadlift1.webp", "/leadlift2.webp", "/leadlift3.webp"],
    video: "https://www.youtube.com/embed/ysz5S6PUM-U?rel=0",
    stack: [
      { name: "Next.js", icon: "/next.svg" },
      { name: "TypeScript", icon: "/typescript.svg" },
      { name: "PostgreSQL", icon: "/postgresql.svg" },
      { name: "Prisma", icon: "/prisma.svg" },
      { name: "Auth.js", icon: "/authjs.svg" },
      { name: "Stripe", icon: "/stripe.svg" },
      { name: "Vercel", icon: "/vercel.svg" },
    ],
    problem: "Fragmented tools and no measurable feedback for messaging.",
    solution:
      "Centralize pipeline, follow‑ups and analytics with CSV import, sequences, signed links + 1×1 pixel tracking, and campaign KPIs.",
    results: [
      "Prod‑ready MVP",
      "Multi‑tenant base",
      "Clear KPIs for iteration",
    ],
    responsibilities: [
      "Multi‑tenant MVP design (Next.js 14 + Prisma/Postgres)",
      "Core CRM: CSV import, pipeline, outreach sequences, email editor",
      "Tracking: signed links + 1×1 pixel, campaign event store, KPI dashboards",
      "Stripe billing (checkout/webhooks), pricing models",
      "Security/data: model design, basic rate‑limit, endpoint protection, audit logs",
      "Ops: Vercel deploy, env config, Prisma migrations, demo seed",
      "Docs: onboarding and public demo",
    ],
    highlights: [
      "Signed links + pixel tracking",
      "CSV import with validation",
      "KPI dashboard (reply, conversions, revenue)",
    ],
    links: [
      { label: "Live", href: "#" },
      { label: "Case study (PDF)", href: "/resume.pdf" },
      { label: "Contact", href: "mailto:work@example.com?subject=LeadLift" },
    ],
  },
  theoremz: {
    slug: "theoremz",
    title: "Theoremz",
    subtitle:
      "Learning platform for math and physics with clear lessons, interactive exercises, and AI tutor",
    kpis: [
      { label: "Lighthouse", value: "95+" },
      { label: "LCP mobile", value: "< 2s" },
      { label: "Lessons", value: "1k+" },
    ],
    hero: "/theoremz-preview.png",
    gallery: ["/theoremz1.webp", "/theoremz2.webp", "/theoremz3.webp"],
    video: "https://www.youtube.com/embed/ysz5S6PUM-U?rel=0",
    stack: [
      { name: "Next.js", icon: "/next.svg" },
      { name: "TypeScript", icon: "/typescript.svg" },
      { name: "Tailwind", icon: "/tailwind.svg" },
      { name: "Sanity CMS", icon: "/sanity.svg" },
      { name: "KaTeX", icon: "/katex.svg" },
      { name: "Firestore", icon: "/firebase.svg" },
      { name: "Firebase Auth", icon: "/firebase.svg" },
      { name: "Stripe", icon: "/stripe.svg" },
      { name: "GA4", icon: "/googleanalytics.svg" },
      { name: "Vercel", icon: "/vercel.svg" },
    ],
    problem:
      "Fragmented resources and little actionable guidance — students lack a single place for theory, exercises, and progress.",
    solution:
      "SEO‑indexed lessons (SSG/ISR), dynamic routing at scale, Portable Text + KaTeX content from Sanity, notes + quizzes with step‑by‑step correction, and an AI tutor with contextual memory.",
    results: [
      "LCP < 2s on mobile",
      "95+ Lighthouse across pages",
      "Scalable content and community",
    ],
    responsibilities: [
      "Product strategy & roadmap, UX and AI tutor",
      "App Router architecture and performance budget",
      "Sanity schema, Portable Text + KaTeX components, asset pipeline",
      "Auth & billing: Firebase Auth, Stripe subscriptions",
      "SEO & performance: SSG/ISR, Core Web Vitals (LCP < 2s, Lighthouse >95)",
      "Analytics & experimentation: GA4 schema, KPI dashboards, A/B testing",
      "CI/CD & reliability: Vercel, versioning, error monitoring/logging",
      "Docs & contributor guide; content quality & media pipeline",
    ],
    highlights: [
      "Dynamic lesson routing (thousands of pages)",
      "AI tutor with contextual chat",
      "Campaign‑level analytics (GA4)",
    ],
    links: [
      { label: "Live", href: "https://theoremz.com" },
      { label: "Case study (PDF)", href: "/resume.pdf" },
      { label: "Contact", href: "mailto:work@example.com?subject=Theoremz" },
    ],
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ProjectPage({ params }: any) {
  const p = DATA[params.slug];
  // gallery kept in data for future use; video is primary media
  if (!p) {
    return (
      <main className="mx-4 my-10 xl:mx-auto max-w-screen-xl">
        <h1 className="text-2xl font-bold">Project not found</h1>
        <p className="mt-2 text-neutral-600">
          This project page does not exist. Go back to the homepage.
        </p>
        <Link className="btn-primary mt-4 inline-flex" href="/">
          Back home
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-4 my-8 xl:mx-auto max-w-screen-xl">
      <nav className="mb-4 text-sm text-neutral-600">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <span className="mx-1">/</span>
        <Link href="/#roadmap" className="hover:underline">
          Projects
        </Link>
        <span className="mx-1">/</span>
        <span className="text-neutral-900 font-semibold">{p.title}</span>
      </nav>

      <header className="glass-box mb-5 px-4 py-4 sm:px-6 sm:py-5">
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight bg-gradient-to-r from-cyan-600 to-sky-500 bg-clip-text text-transparent">
          {p.title}
        </h1>
        <p className="mt-1 text-neutral-700">{p.subtitle}</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {p.kpis.map((k) => (
            <li
              key={k.label}
              className="inline-flex items-center gap-2 rounded-full bg-white/85 px-3 py-1 text-sm shadow-sm"
            >
              <b className="text-neutral-900">{k.value}</b>
              <span className="text-neutral-600">{k.label}</span>
            </li>
          ))}
        </ul>
      </header>

      {/* Gallery (same images as on homepage) */}
      <section className="glass-box mb-6 px-4 py-4">
        <div className="img-frame relative mx-auto w-[92%] sm:w-[86%] md:w-[72%] overflow-hidden rounded-2xl bg-white">
          <Gallery images={p.gallery} />
        </div>
      </section>

      {/* Problem → Project → Results */}
      <section className="glass-box mb-6 px-4 py-6">
        <h2 className="text-lg font-semibold text-neutral-900">
          Case overview
        </h2>
        <div className="mt-1 stepper stepper-lg">
          <span className="stepper-line" aria-hidden />
          <span className="stepper-runner" aria-hidden />
          <div className="stepper-item">
            <div className="step-text mt-6 text-center sm:text-center">
              <div className="text-sm mt-4 font-bold text-cyan-700">
                Problem
              </div>
              <div className="text-[13px] text-neutral-700">{p.problem}</div>
            </div>
          </div>
          <div className="stepper-item">
            <div className="step-text mt-6 text-center sm:text-center">
              <div className="text-sm mt-4 font-bold text-cyan-700">
                Project
              </div>
              <div className="text-[13px] text-neutral-700">{p.solution}</div>
            </div>
          </div>
          <div className="stepper-item">
            <div className="step-text mt-6 text-center sm:text-center">
              <div className="text-sm mt-4 font-bold text-cyan-700">
                Results
              </div>
              <div className="text-[13px] text-neutral-700">
                {p.results.join(" • ")}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Details in a single, clean box (no borders/shadows) */}
      <section className="rounded-2xl bg-white/90 px-4 py-4 sm:px-6 sm:py-5">
        <div>
          <h3 className="text-sm font-semibold text-neutral-800">Stack</h3>
          <ul className="mt-2 flex flex-wrap gap-2">
            {p.stack.map((t) => (
              <li
                key={t.name}
                className="inline-flex items-center gap-2 rounded-full bg-white/85 px-2 py-1 text-xs"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={t.icon} alt={t.name} width={18} height={18} />
                <span className="text-neutral-700">{t.name}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4">
          <h3 className="text-sm font-semibold text-neutral-800">
            Responsibilities
          </h3>
          <ul className="mt-2 check-list text-sm text-neutral-800">
            {p.responsibilities.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>

        <div className="mt-4">
          <h3 className="text-sm font-semibold text-neutral-800">Highlights</h3>
          <ul className="mt-2 check-list text-sm text-neutral-800">
            {p.highlights.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTAs */}
      <footer className="glass-box mt-6 flex flex-wrap items-center gap-3 px-4 py-4">
        <CTAs links={p.links} />
        <Link
          href="#"
          className="text-sm font-semibold text-cyan-700 hover:underline"
        >
          Request a walkthrough →
        </Link>
      </footer>
    </main>
  );
}
