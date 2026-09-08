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

type WorkTranslator = ((key: string) => string) & {
  raw: (key: string) => unknown;
};

function stringList(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

/* Prosjekt-meta: bilder/urls/stack (språk-uavhengig) */
const CASE_META = {
  burger: {
    heroImage: "/showcase/bigpic.webp",
    // De-identified case: the card draws <BurgerMark /> instead of a wordmark.
    logo: "",
    url: "/work/burger",
    isExternal: false,
  },
  snatched: {
    heroImage: "/showcase/bigpic.webp",
    logo: "/logos/Snatched.svg",
    url: "/work/snatched",
    isExternal: false,
  },
  tokyo: {
    heroImage: "/showcase/bigpic.webp",
    logo: "東京",
    url: "/work/tokyo",
    isExternal: false,
  },
} as const;

/* ===================== Intro + projects (intl) ===================== */
export default async function WorkIntroSection(props: WorkIntroProps) {
  // Prøv å hente oversettelser
  let t: WorkTranslator;
  let processT: (key: string) => string;
  try {
    t = await getTranslations("About.WorkIntro");
    processT = await getTranslations("ServicesPage.process");
  } catch {
    // Fallback hvis WorkIntro mangler
    const fallbackTranslator = (key: string) => {
      const FALLBACKS: Record<string, string> = {
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
    t = Object.assign(fallbackTranslator, {
      raw: (key: string): string[] => key === "checklist" ? props.checklist ?? [] : [],
    });
    processT = (key: string) => key;
  }

  const title = props.title ?? t("title");
  const seeLive = t("seeLive");

  // Prosjektene
  const projOrder = ["burger", "snatched", "tokyo"] as const;
  const projectsIntl = projOrder.map<ProjectCase>((key) => {
    const heading = t(`projects.${key}.heading`) || "";
    const rawParagraphs = t.raw(`projects.${key}.paragraphs`);
    const paragraphs = stringList(rawParagraphs);
    
    const rawStack = t.raw(`projects.${key}.stack`);
    const stack = stringList(rawStack);

    const rawFlairs = t.raw(`projects.${key}.flairs`);
    const flairs = stringList(rawFlairs);

    const meta = CASE_META[key];
    // Tokyo's card copy is authored separately from its case-study intro.
    const isTokyo = key === "tokyo";
    return {
      heading: isTokyo ? t(`projects.${key}.card.title`) : heading,
      logo: meta.logo,
      heroImage: meta.heroImage,
      heroAlt: heading,
      url: meta.url,
      isExternal: meta.isExternal,
      paragraphs: isTokyo ? [t(`projects.${key}.card.body`)] : paragraphs,
      stack: isTokyo ? stringList(t.raw(`projects.${key}.card.tags`)) : stack,
      flairs,
      slug: key,
      badge: isTokyo ? t(`projects.${key}.card.new`) : undefined,
    };
  });

  const projects = Array.isArray(props.projects) ? props.projects : projectsIntl;

  return (
    <section id="case-studies" className="container mx-auto max-w-6xl px-4 py-16 scroll-mt-24">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">{title}</h2>
      </div>

      {/* Process Steps */}
      <div className="mx-auto mt-12 max-w-4xl">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: MessageSquare, titleKey: "chat" },
            { icon: FileText, titleKey: "proposal" },
            { icon: Code2, titleKey: "build" },
            { icon: Rocket, titleKey: "launch" },
          ].map(({ icon: Icon, titleKey }) => (
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
