import * as React from "react";
import { CheckCircle2, ExternalLink, Code2 } from "lucide-react";

/* ===================== Types ===================== */

export type WorkIntroProps = {
  title?: string;
  heroImage?: string;
  heroAlt?: string;
  overview?: string;
  background?: string;
  checklist?: string[]; // 6–8 items recommended
  projects?: ProjectCase[];   // sections rendered below the intro
};

export type ProjectCase = {
  heading: string;            // e.g. "Creating Giroo’s dashboard"
  url?: string;               // "See the live website"
  heroImage: string;          // big 16:9 image
  heroAlt?: string;
  paragraphs: string[];       // 1–3 short paragraphs
  stack?: string[];           // e.g. ["React","Next.js","Tailwind","PostgreSQL"]
};

/* ===================== Defaults ===================== */

const DEFAULT_ITEMS = [
  "Brand identity & design system",
  "UX/UI design",
  "Front-end development",
  "Full-stack (Next.js, Node, Prisma)",
  "Content & copywriting",
  "SEO & performance",
  "Analytics & tracking",
  "Integrations & automations",
];

// map stack label -> logo path (fallback handled below)
const STACK_LOGO: Record<string, string> = {
  React: "/logos/reactlogo.webp",
  "Next.js": "/logos/nextjs.webp",
  Node: "/logos/nodejslogo.webp",
  Tailwind: "/logos/tailwindlogo.webp",
  Prisma: "/logos/prismalogo.webp",
  PostgreSQL: "/logos/postgresql.webp",
  Vercel: "/logos/vercellogo.png",
  Stripe: "/logos/stripelogo.webp",
  Auth: "/logos/nextauthjslogo.webp",
  "NextAuth.js": "/logos/nextauthjslogo.webp",
};

const DEFAULT_PROJECTS: ProjectCase[] = [
  {
    heading: "Creating Giroo’s subscription dashboard",
    url: "https://giroo-no.vercel.app",
    heroImage: "/showcase/giroodesktop.webp",
    heroAlt: "Giroo dashboard",
    paragraphs: [
      "From name to MVP: we built the brand, marketing site and a full web app that helps people track and reduce recurring subscriptions.",
      "We started with discovery and flows, then shipped a clean Next.js app with auth, database and an email-parsing foundation for extracting subscription data.",
    ],
    stack: ["React", "Next.js", "Tailwind", "Node", "Prisma", "PostgreSQL", "Vercel"],
  },
  {
    heading: "Rebuilding RiseUp’s brand and website",
    url: "https://riseup-seven.vercel.app",
    heroImage: "/showcase/riseupdesktop.webp",
    heroAlt: "RiseUp website",
    paragraphs: [
      "A full brand overhaul and a trustworthy website that positioned RiseUp to win new partnerships.",
      "We rebuilt the message architecture and shipped a fast, accessible site with a simple CMS for content updates and better credibility.",
    ],
    stack: ["React", "Next.js", "Tailwind", "Vercel"],
  },
  {
    heading: "Launching Bites’ festival-ready presence",
    url: "https://bites-lac.vercel.app",
    heroImage: "/showcase/bitesdesktop.webp",
    heroAlt: "Bites website",
    paragraphs: [
      "Early-stage support for a pop-up burger concept: brand identity and a site that helped them stand out when applying to festivals.",
      "We created a clear visual identity and a mobile-first site with an event schedule so organizers and customers could easily see where they’d pop up next.",
    ],
    stack: ["React", "Next.js", "Tailwind", "Vercel"],
  },
  {
    heading: "DataSec integrations & live dashboards",
    heroImage: "/showcase/datasecw2.webp",
    heroAlt: "DataSec dashboards",
    paragraphs: [
      "Custom tech products integrated into their site—giving clients deeper insight into their assets and stronger security.",
      "We built internal tools and dashboards and integrated vendor APIs, surfacing clear, real-time insights directly in the website.",
    ],
    stack: ["React", "Next.js", "Tailwind", "Node", "PostgreSQL"],
  },
];

/* ===================== Case block (project section) ===================== */

function CaseBlock({ c }: { c: ProjectCase }) {
  return (
    <article className="mx-auto max-w-6xl py-12">
      {/* Hero image */}
      <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border shadow-lg">
        <img
          src={c.heroImage}
          alt={c.heroAlt ?? `${c.heading} cover`}
          className="aspect-[16/9] w-full object-cover"
        />
      </div>

      {/* Heading + link */}
      <div className="mx-auto mt-8 max-w-5xl">
        <h3 className="text-3xl font-bold tracking-tight sm:text-4xl">{c.heading}</h3>
        {c.url && (
          <div className="mt-2">
            <a
              href={c.url}
              target="_blank"
              rel="noreferrer noopener"
              className="text-primary inline-flex items-center gap-1 font-medium hover:underline"
            >
              See the live website <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        )}

        {/* Body copy */}
        <div className="prose prose-neutral dark:prose-invert mt-5 max-w-none">
          {c.paragraphs.map((p, i) => (
            <p key={i} className="text-muted-foreground leading-7">
              {p}
            </p>
          ))}
        </div>

        {/* Tech stack logos */}
        {c.stack && c.stack.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {c.stack.map((label) => {
              const src = STACK_LOGO[label];
              return src ? (
                <div
                  key={label}
                  className="grid h-14 w-14 place-items-center rounded-md bg-transparent ring-1 ring-black/5 dark:bg-transparent"
                  title={label}
                >
                  <img
                    src={src}
                    alt={label}
                    className="h-12 w-auto object-contain"
                  />
                </div>
              ) : (
                // Fallback (e.g. Node) — small neutral chip
                  <Code2 className="h-4 w-4" />

              );
            })}
          </div>
        )}
      </div>

      <div className="mt-10 h-px w-full bg-border" />
    </article>
  );
}

/* ===================== Intro + projects ===================== */

export default function WorkIntroSection({
  title = "How we work",
  heroImage = "/showcase/fiverr2-big.webp",
  heroAlt = "Syntax Studio workflow",
  overview =
    "We partner with founders and teams to hand-code fast, accessible websites and apps. We own the stack from brand to launch with short feedback loops and measurable outcomes.",
  background =
    "Many clients arrive with scattered branding, template sites or manual workflows. We align on goals, refine the brand, and ship a clean architecture with a maintainable CMS and practical automations.",
  checklist = DEFAULT_ITEMS,
  projects = DEFAULT_PROJECTS, // <— use your cases by default
}: WorkIntroProps) {
  // split checklist into two columns of ~equal length
  const mid = Math.ceil(checklist.length / 2);
  const colA = checklist.slice(0, mid);
  const colB = checklist.slice(mid);

  return (
    <section className="container mx-auto max-w-6xl px-4 py-16">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">{title}</h2>
      </div>

      {/* Hero image */}
      <div className="mt-8 mx-auto max-w-5xl overflow-hidden rounded-2xl border shadow-lg">
        <img src={heroImage} alt={heroAlt} className="aspect-[16/9] w-full object-cover" />
      </div>

      {/* Overview / Background */}
      <div className="mx-auto mt-10 grid max-w-5xl gap-10 md:grid-cols-2">
        <div>
          <h3 className="text-xl font-semibold">Overview</h3>
          <p className="mt-3 text-muted-foreground leading-7">{overview}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Our Workflow</h3>
          <p className="mt-3 text-muted-foreground leading-7">{background}</p>
        </div>
      </div>

      {/* Checklist */}
      <div className="mx-auto mt-8 grid max-w-5xl gap-8 sm:grid-cols-2">
        {[colA, colB].map((col, i) => (
          <ul key={i} className="space-y-4">
            {col.map((item) => (
              <li key={item} className="flex items-start gap-3 text-muted-foreground">
                <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600/90">
                  <CheckCircle2 className="h-4 w-4 text-white" />
                </span>
                <span className="text-lg">{item}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>

      {/* ===== Projects rendered below ===== */}
      {projects.length > 0 && (
        <div className="mt-6">
          {projects.map((c) => (
            <CaseBlock key={c.heading} c={c} />
          ))}
        </div>
      )}
    </section>
  );
}
