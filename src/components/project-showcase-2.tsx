// src/components/project-showcase-2.tsx
import * as React from "react";
import { Code2, MessageSquare, FileText, Rocket } from "lucide-react";
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
  jonk: {
    heroImage: "/showcase/bigpic.webp",
    logo: "/logos/Jønksvg.svg",
    url: "/work/jonk",
    isExternal: false,
  },
  fcr: {
    heroImage: "/showcase/bigpic.webp",
    logo: "/logos/FCRNM.svg",
    url: "/work/fcr",
    isExternal: false,
  },
  snatched: {
    heroImage: "/showcase/bigpic.webp",
    logo: "/logos/Snatched.svg",
    url: "/work/snatched",
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

  const title = props.title ?? t("title");
  const seeLive = t("seeLive");

  // Prosjektene
  const projOrder = ["jonk", "fcr", "snatched"] as const;
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

      {/* Process Steps */}
      <div className="mx-auto mt-12 max-w-4xl">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { num: 1, icon: MessageSquare, titleKey: "chat" },
            { num: 2, icon: FileText, titleKey: "proposal" },
            { num: 3, icon: Code2, titleKey: "build" },
            { num: 4, icon: Rocket, titleKey: "launch" },
          ].map(({ num, icon: Icon, titleKey }) => (
            <div key={titleKey} className="flex items-center gap-3 lg:flex-col lg:text-center">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/5 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold">{processT(`steps.${titleKey}.title`)}</h4>
                <p className="text-xs text-muted-foreground">{processT(`steps.${titleKey}.desc`)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Projects Carousel */}
      {projects.length > 0 && (
        <ProjectCarousel projects={projects} seeLive={seeLive} />
      )}
    </section>
  );
}
