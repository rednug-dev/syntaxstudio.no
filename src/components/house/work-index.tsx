"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { getPractice, getProjectDisplayName, getProjectKindLabel, getProjectCreator, getMediaPreview, localText, practices, projects, type PracticeId } from "@/lib/house-content";
import "./work.css";

type Filter = PracticeId | "all";

export default function WorkIndex({
  locale,
  initialPractice,
}: {
  locale: string;
  initialPractice?: string;
}) {
  const no = locale !== "en";
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState<Filter>(getPractice(initialPractice ?? "")?.id ?? "all");
  useEffect(() => {
    // Back/forward and locale navigation restore the selection from the URL.
    setFilter(getPractice(initialPractice ?? "")?.id ?? "all");
  }, [initialPractice]);

  function selectFilter(nextFilter: Filter) {
    if (nextFilter === filter) return;
    setFilter(nextFilter);
    const query = new URLSearchParams(searchParams.toString());
    if (nextFilter === "all") query.delete("practice");
    else query.set("practice", nextFilter);
    const queryString = query.toString();
    // Keep the controls mounted, retain keyboard focus and avoid a scroll reset.
    router.push(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
  }
  const order = ['iso400-street-portraits', 'burger', 'nyfane-website-study', 'snatched'];
  const shown = [...projects].sort((a, b) => order.indexOf(a.slug) - order.indexOf(b.slug)).filter(
    (project) => filter === "all" || project.practices.includes(filter),
  );
  const selectedPractice = filter === "all" ? undefined : getPractice(filter);

  return (
    <>
      <section className="house-work-heading house-wrap">
        <h1>{no ? <>Arbeid,<br/><span>i samspill.</span></> : <>Work,<br/><span>in context.</span></>}</h1>
        <p>
          {no
            ? "Oppdrag, bildestudier og egne eksperimenter. Ulike fag, med Syntax som forbindelsen."
            : "Commissions, image studies and our own experiments. Different disciplines, connected through Syntax."}
        </p>
      </section>
      <section
        className="house-work-gallery"
        aria-label={no ? "Prosjektutvalg" : "Project selection"}
      >
        <div className="house-wrap">
          <div className="house-work-toolbar">
            <div
              className="house-work-filters"
              role="group"
              aria-label={no ? "Filtrer etter fagområde" : "Filter by discipline"}
            >
              <button
                type="button"
                aria-pressed={filter === "all"}
                aria-controls="work-results"
                onClick={() => selectFilter("all")}
              >
                {no ? "Alle" : "All work"}
              </button>
              {practices.map((practice) => (
                <button
                  key={practice.id}
                  type="button"
                  aria-pressed={filter === practice.id}
                  aria-controls="work-results"
                  onClick={() => selectFilter(practice.id)}
                >
                  {localText(practice.discipline, locale)}
                </button>
              ))}
            </div>
            <p className="house-work-count" aria-live="polite" aria-atomic="true">
              {shown.length}{" "}
              {no
                ? shown.length === 1
                  ? "prosjekt"
                  : "prosjekter"
                : shown.length === 1
                  ? "project"
                  : "projects"}
            </p>
          </div>
          <div id="work-results">
            {shown.length > 0 ? (
              <div className={`house-work-exhibition${shown.length === 1 ? " is-single" : ""}`}>
                {shown.map((project, index) => (
                  <article
                    className={`house-work-entry house-work-entry--${project.hero.kind} house-work-entry--${project.kind}`}
                    key={project.slug}
                  >
                    <Link href={`/work/${project.slug}`} className="house-work-entry-link" aria-labelledby={`work-${project.slug}-title`}>
                      <figure className="house-work-object">
                        <div className="house-work-preview">
                          <div className="house-work-print">
                            <Image
                              src={getMediaPreview(project.hero)}
                              alt={localText(project.hero.alt, locale)}
                              width={project.hero.width}
                              height={project.hero.height}
                              sizes="(max-width: 700px) 86vw, 52vw"
                              priority={index === 0 && project.hero.kind !== "logo"}
                              className="house-work-preview-image"
                            />
                          </div>
                        </div>
                        <figcaption className="house-work-caption">
                          <div className="house-work-entry-heading">
                            <h2 id={`work-${project.slug}-title`}>{getProjectDisplayName(project, locale)}</h2>
                            <ArrowUpRight aria-hidden="true" />
                          </div>
                          <p className="house-work-entry-summary">
                            {localText(project.summary, locale)}
                          </p>
                          <p className="house-work-disciplines">{getProjectCreator(project).name} / {getProjectKindLabel(project, locale)}{project.status === 'in-development' && (no ? ' / Under utvikling' : ' / In development')}</p>
                          <p className="house-work-attribution">{no ? 'Faglig relevans: ' : 'Relevant practices: '}{project.practices.map(id => id === 'syntax' ? 'Syntax' : getPractice(id)?.name).filter(Boolean).join(' + ')}</p>
                        </figcaption>
                      </figure>
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <div className="house-work-empty">
                <h2>{no ? "La oss snakke teknologi." : "Let’s talk technology."}</h2>
                <div>
                  <p>
                    {no
                      ? "Vi har ikke publisert et digitalt prosjekt i dette utvalget ennå. Nyfane lager nettsider, digitale produkter og interaktive opplevelser. Snakk med Rasul om det du vil lage."
                      : "We haven’t published a digital project in this selection yet. Nyfane makes websites, digital products and interactive experiences. Talk to Rasul about what you want to make."}
                  </p>
                  <Link
                    href={selectedPractice?.contactHref ?? "/contact?practice=nyfane"}
                    className="house-work-text-link"
                  >
                    {no ? "Kontakt Nyfane" : "Contact Nyfane"}
                    <ArrowUpRight aria-hidden="true" />
                  </Link>
                </div>
              </div>
            )}
          </div>
          <div className="house-work-closing">
            <p>{no ? "Hva vil du lage?" : "What do you want to make?"}</p>
            <Link
              href={selectedPractice?.contactHref ?? "/contact"}
              className="house-work-text-link"
            >
              {no ? "Fortell oss om prosjektet" : "Tell us about your project"}
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
