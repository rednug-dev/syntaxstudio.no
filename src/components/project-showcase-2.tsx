// src/components/project-showcase-2.tsx
import * as React from "react";
import { CheckCircle2, ExternalLink, Code2 } from "lucide-react";
import { getTranslations } from "next-intl/server";

/* ===================== Types ===================== */
export type ProjectCase = {
  heading: string;
  url?: string;
  heroImage: string;
  heroAlt?: string;
  paragraphs: ReadonlyArray<string>;
  stack?: ReadonlyArray<string>;
};

export type WorkIntroProps = {
  title?: string;
  heroImage?: string;
  heroAlt?: string;
  overview?: string;
  background?: string;
  checklist?: string[];
  projects?: ProjectCase[];
};

/* ===================== Logos ===================== */
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

/* Prosjekt-meta: bilder/urls/stack (språk-uavhengig) */
const CASE_META = {
  giroo: {
    heroImage: "/showcase/giroodesktop.webp",
    url: "https://giroo-no.vercel.app",
    stack: ["React", "Next.js", "Tailwind", "Node", "Prisma", "PostgreSQL", "Vercel"],
  },
  riseup: {
    heroImage: "/showcase/riseupdesktop.webp",
    url: "https://riseup-seven.vercel.app",
    stack: ["React", "Next.js", "Tailwind", "Vercel"],
  },
  bites: {
    heroImage: "/showcase/bitesdesktop.webp",
    url: "https://bites-lac.vercel.app",
    stack: ["React", "Next.js", "Tailwind", "Vercel"],
  },
  datasec: {
    heroImage: "/showcase/datasecw2.webp",
    url: undefined, // ingen lenke
    stack: ["React", "Next.js", "Tailwind", "Node", "PostgreSQL"],
  },
} as const;

/* ===================== Case block ===================== */
function CaseBlock({ c, seeLiveLabel }: { c: ProjectCase; seeLiveLabel: string }) {
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
              {seeLiveLabel} <ExternalLink className="h-3.5 w-3.5" />
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
                  <img src={src} alt={label} className="h-12 w-auto object-contain" />
                </div>
              ) : (
                <div
                  key={label}
                  className="grid h-9 w-9 place-items-center rounded-md border bg-background/80"
                  title={label}
                >
                  <Code2 className="h-4 w-4" />
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="mt-10 h-px w-full bg-border" />
    </article>
  );
}

/* ===================== Intro + projects (intl) ===================== */
export default async function WorkIntroSection(props: WorkIntroProps) {
  // Prøv å hente oversettelser
  let t: any;
  try {
    t = await getTranslations("About.WorkIntro");
  } catch {
    // Fallback hvis WorkIntro mangler
    t = (key: string) => {
      const FALLBACKS: Record<string, any> = {
        title: props.title ?? "How we work",
        heroAlt: props.heroAlt ?? "Syntax Studio workflow",
        overviewTitle: "Overview",
        workflowTitle: "Our Workflow",
        defaultOverview: props.overview ?? "",
        defaultBackground: props.background ?? "",
        seeLive: "See the live website",
      };
      return FALLBACKS[key] ?? "";
    };
    t.raw = (key: string) => {
      if (key === "checklist") return Array.isArray(props.checklist) ? props.checklist : [];
      if (key.startsWith("projects.")) return [];
      return [];
    };
  }

  // Checklist – alltid array
  const rawChecklist = t.raw("checklist");
  const checklistFromIntl = Array.isArray(rawChecklist) ? rawChecklist : [];
  const checklist = Array.isArray(props.checklist) ? props.checklist : checklistFromIntl;

  // Overskrifter / beskrivelser
  const title = props.title ?? t("title");
  const heroImage = props.heroImage ?? "/showcase/bigpic.webp";
  const heroAlt = props.heroAlt ?? t("heroAlt");
  const overview = props.overview ?? t("defaultOverview");
  const background = props.background ?? t("defaultBackground");
  const overviewTitle = t("overviewTitle");
  const workflowTitle = t("workflowTitle");
  const seeLive = t("seeLive");

  // Prosjektene
  const projOrder = ["giroo", "riseup", "bites", "datasec"] as const;
  const projectsIntl = projOrder.map<ProjectCase>((key) => {
    const heading = t(`projects.${key}.heading`) || "";
    const raw = t.raw(`projects.${key}.paragraphs`);
    const paragraphs = Array.isArray(raw) ? raw : [];
    const meta = CASE_META[key];
    return {
      heading,
      heroImage: meta.heroImage,
      heroAlt: heading,
      url: meta.url,
      paragraphs,
      stack: meta.stack,
    };
  });

  const projects = Array.isArray(props.projects) ? props.projects : projectsIntl;

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
          <h3 className="text-xl font-semibold">{overviewTitle}</h3>
          <p className="mt-3 text-muted-foreground leading-7">{overview}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">{workflowTitle}</h3>
          <p className="mt-3 text-muted-foreground leading-7">{background}</p>
        </div>
      </div>

      {/* Checklist */}
      {checklist.length > 0 && (
        <div className="mx-auto mt-8 grid max-w-5xl gap-8 sm:grid-cols-2">
          {[0, 1].map((colIdx) => {
            const mid = Math.ceil(checklist.length / 2);
            const col = colIdx === 0 ? checklist.slice(0, mid) : checklist.slice(mid);
            return (
              <ul key={colIdx} className="space-y-4">
                {col.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-muted-foreground">
                    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600/90">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </span>
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            );
          })}
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mt-6">
          {projects.map((c) => (
            <CaseBlock key={c.heading} c={c} seeLiveLabel={seeLive} />
          ))}
        </div>
      )}
    </section>
  );
}
