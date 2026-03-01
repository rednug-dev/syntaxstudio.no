// src/components/project-showcase-2.tsx
import * as React from "react";
import { CheckCircle2, ExternalLink, Code2, MessageSquare, FileText, Rocket, Megaphone, Video, Camera, Palette } from "lucide-react";
import { getTranslations } from "next-intl/server";
import ProjectCarousel from "./project-carousel";

/* ===================== Types ===================== */
export type ProjectCase = {
  heading: string;
  url?: string;
  isExternal?: boolean;
  logo: string;
  heroImage: string;
  heroAlt?: string;
  paragraphs: ReadonlyArray<string>;
  stack?: ReadonlyArray<string>;
  flairs?: ReadonlyArray<string>;
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
  riseup: {
    heroImage: "/showcase/riseupdesktop.webp",
    logo: "/logos/riseuplogo.svg",
    url: "/work/riseup",
    isExternal: false,
  },
  renovera: {
    heroImage: "/showcase/datasecw2.webp",
    logo: "/logos/renoveras.svg",
    url: "https://renovera-as.no",
    isExternal: true,
  },
  jonk: {
    heroImage: "/showcase/bigpic.webp",
    logo: "/logos/jønk.png",
    url: "/work/jonk",
    isExternal: false,
  },
} as const;

/* ===================== Intro + projects (intl) ===================== */
export default async function WorkIntroSection(props: WorkIntroProps) {
  // Prøv å hente oversettelser
  let t: any;
  let processT: any;
  try {
    t = await getTranslations("About.WorkIntro");
    processT = await getTranslations("ServicesPage.process");
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
    t.logo = (key: string) => "";
    t.flairs = (key: string) => [];
    processT = (key: string) => key;
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
  const projOrder = ["jonk", "riseup", "renovera"] as const;
  const projectsIntl = projOrder.map<ProjectCase>((key) => {
    const heading = t(`projects.${key}.heading`) || "";
    const rawParagraphs = t.raw(`projects.${key}.paragraphs`);
    const paragraphs = Array.isArray(rawParagraphs) ? rawParagraphs : [];
    
    const rawStack = t.raw(`projects.${key}.stack`);
    const stack = Array.isArray(rawStack) ? rawStack : [];

    const rawFlairs = t.raw(`projects.${key}.flairs`);
    const flairs = Array.isArray(rawFlairs) ? rawFlairs : [];

    const meta = CASE_META[key];
    return {
      heading,
      logo: meta.logo,
      heroImage: meta.heroImage,
      heroAlt: heading,
      url: meta.url,
      isExternal: meta.isExternal,
      paragraphs,
      stack,
      flairs,
    };
  });

  const projects = Array.isArray(props.projects) ? props.projects : projectsIntl;

  return (
    <section className="container mx-auto max-w-6xl px-4 py-16">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">{title}</h2>
      </div>

      {/* Process Timeline */}
      <div className="mx-auto mt-12 max-w-5xl">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { num: 1, icon: MessageSquare, titleKey: "chat" },
            { num: 2, icon: FileText, titleKey: "proposal" },
            { num: 3, icon: Code2, titleKey: "build" },
            { num: 4, icon: Rocket, titleKey: "launch" },
          ].map(({ num, icon: Icon, titleKey }) => (
            <div key={titleKey} className="relative text-center">
              {/* Connector line - desktop only */}
              {num < 4 && (
                <div className="absolute top-8 left-1/2 hidden h-0.5 w-full bg-border lg:block" />
              )}
              <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-background text-xs font-bold text-foreground ring-2 ring-primary">
                  {num}
                </span>
                <Icon className="h-7 w-7" />
              </div>
              <h4 className="text-base font-semibold">{processT(`steps.${titleKey}.title`)}</h4>
              <p className="mt-2 text-sm text-muted-foreground">{processT(`steps.${titleKey}.desc`)}</p>
            </div>
          ))}
        </div>
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

      {/* Projects Carousel */}
      {projects.length > 0 && (
        <ProjectCarousel projects={projects} seeLive={seeLive} />
      )}
    </section>
  );
}
