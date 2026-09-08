import Image from "next/image";
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Film from "@/components/house/film";
import {
  getPractice,
  getProject,
  getMediaPreview,
  getProjectCreator,
  getProjectDisplayName,
  getProjectKindLabel,
  localText,
  type HouseProject,
  type ProjectMedia,
  type ProjectSource,
} from "@/lib/house-content";
import "./work.css";

const SITE_URL = "https://syntaxstudio.no";

export function projectMetadata(project: HouseProject, locale: string): Metadata {
  const prefix = locale === "en" ? "/en" : "";
  const path = `${prefix}/work/${project.slug}`;
  const title = localText(project.seo.title, locale);
  const description = localText(project.seo.description, locale);
  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        no: `/work/${project.slug}`,
        en: `/en/work/${project.slug}`,
        "x-default": `/work/${project.slug}`,
      },
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: path,
      siteName: "Syntax Studio",
      locale: locale === "en" ? "en_GB" : "nb_NO",
      images: [
        {
          url: project.seo.image,
          alt: project.hero.kind === "logo" ? "Syntax Studio" : localText(project.hero.alt, locale),
        },
      ],
    },
    twitter: { card: "summary_large_image", title, description, images: [project.seo.image] },
  };
}

function SourceReference({source, locale}: {source: ProjectSource; locale: string}) {
  return source.href?.startsWith("https://") ? (
    <a href={source.href} className="house-work-text-link" target="_blank" rel="noopener noreferrer">
      {localText(source.label, locale)}<ArrowUpRight size={16} aria-hidden="true" />
    </a>
  ) : <span>{localText(source.label, locale)}</span>;
}

function ProjectVisual({
  media,
  locale,
  priority = false,
  paired = false,
}: {
  media: ProjectMedia;
  locale: string;
  priority?: boolean;
  paired?: boolean;
}) {
  if (media.kind === "film") {
    return (
      <div
        className="house-story-film-frame"
        style={{ "--story-media-ratio": `${media.width} / ${media.height}` } as CSSProperties}
      >
        <Film
          src={media.src}
          poster={media.poster}
          label={localText(media.alt, locale)}
          className="house-story-film"
        />
      </div>
    );
  }
  return (
    <div className={`house-story-visual house-story-visual--${media.kind}`}>
      <Image
        src={media.src}
        alt={localText(media.alt, locale)}
        width={media.width}
        height={media.height}
        sizes={paired ? "(max-width: 700px) 80vw, 40vw" : "(max-width: 700px) 86vw, 70vw"}
        priority={priority}
      />
      {media.kind === "capture" && media.destination && (
        <p className="house-story-capture-link"><SourceReference source={media.destination} locale={locale} /></p>
      )}
    </div>
  );
}

export default function ProjectStory({
  project,
  locale,
}: {
  project: HouseProject;
  locale: string;
}) {
  const no = locale !== "en";
  const prefix = no ? "" : "/en";
  const title = localText(project.title, locale);
  const displayName = getProjectDisplayName(project, locale);
  const creator = getProjectCreator(project);
  const relatedProjects = [...new Set(project.related)]
    .filter((slug) => slug !== project.slug)
    .map(getProject)
    .filter((entry): entry is HouseProject => Boolean(entry));
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        name: displayName === title ? title : `${displayName} — ${title}`,
        description: localText(project.summary, locale),
        image: new URL(project.seo.image, SITE_URL).href,
        url: `${SITE_URL}${prefix}/work/${project.slug}`,
        inLanguage: no ? "nb" : "en",
        creator: {
          "@type": "Organization",
          name: creator.name,
          ...(project.creatorPractice === "syntax" ? { url: SITE_URL } : creator.website ? { url: creator.website } : {}),
        },
        genre: getProjectKindLabel(project, locale),
        ...(project.status === "in-development" ? { creativeWorkStatus: "In development" } : {}),
        ...(project.year ? { copyrightYear: project.year } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Syntax Studio",
            item: `${SITE_URL}${prefix || "/"}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: no ? "Arbeider" : "Work",
            item: `${SITE_URL}${prefix}/work`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: displayName,
            item: `${SITE_URL}${prefix}/work/${project.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <main
      id="main-content"
      className={`house-page house-project-page house-project-page--${project.slug} house-project-page--${project.kind}`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <article>
        <header className="house-story-header house-wrap">
          <Link href="/work" className="house-story-back">
            <ArrowLeft aria-hidden="true" />
            {no ? "Alle arbeider" : "All work"}
          </Link>
          <p className="house-story-category">
            {getProjectKindLabel(project, locale)}
            {project.status === "in-development" && <> · {no ? "Under utvikling" : "In development"}</>}
          </p>
          <div className="house-story-title-row">
            <h1>{title}</h1>
            <p>{localText(project.summary, locale)}</p>
          </div>
        </header>
        <div className={`house-story-exhibit house-story-exhibit--${project.hero.kind} house-wrap`}>
          <figure className="house-story-hero">
            <ProjectVisual media={project.hero} locale={locale} priority />
            <figcaption>
              {project.hero.kind === "capture"
                ? project.status === "in-development"
                  ? (no ? "Skjermbilde fra nettsiden under utvikling." : "Capture of the website in development.")
                  : (no ? "Skjermbilde av grensesnittet." : "Capture of the interface.")
                : project.disciplines.map((item) => localText(item, locale)).join(" / ")}
            </figcaption>
          </figure>
          <dl className="house-story-metadata">
            {project.client && <div>
              <dt>{no ? "Kunde" : "Client"}</dt>
              <dd>{localText(project.client, locale)}</dd>
            </div>}
            <div>
              <dt>{project.kind === "portfolio-selection" ? (no ? "Fotografi" : "Photography") : (no ? "Laget av" : "Created by")}</dt>
              <dd>{creator.name}</dd>
            </div>
            <div>
              <dt>{no ? "Fagfelt" : "Disciplines"}</dt>
              <dd>{project.disciplines.map((item) => localText(item, locale)).join(" / ")}</dd>
            </div>
            {project.location && <div>
              <dt>{no ? "Sted" : "Location"}</dt>
              <dd>{localText(project.location, locale)}</dd>
            </div>}
            {project.year && (
              <div>
                <dt>{no ? "År" : "Year"}</dt>
                <dd>{project.year}</dd>
              </div>
            )}
          </dl>
        </div>
        <div className="house-story-content">
          <section className="house-story-intro house-wrap">
            <h2>{project.kind === "commission" ? (no ? "Oppgaven." : "The brief.") : project.kind === "portfolio-selection" ? (no ? "I bildet." : "In the image.") : (no ? "Studiet." : "The study.")}</h2>
            <p>{localText(project.description, locale)}</p>
          </section>
          <div className="house-story-blocks house-wrap">
            {project.mediaBlocks.map((block, index) => {
              if (block.kind === "quote")
                return (
                  <figure className="house-story-quote" key={`quote-${index}`}>
                    <blockquote><p>{localText(block.quote, locale)}</p></blockquote>
                    <figcaption>{localText(block.attribution, locale)} · <SourceReference source={block.source} locale={locale} /></figcaption>
                  </figure>
                );
              if (block.kind === "text")
                return (
                  <section className="house-story-text" key={`text-${index}`}>
                    <h2>{localText(block.heading, locale)}</h2>
                    <p>{localText(block.body, locale)}</p>
                  </section>
                );
              if (block.kind === "pair")
                return (
                  <figure
                    className={`house-story-media-block ${block.media.some((media) => media.kind === "film") ? "house-story-media-block--screening" : "house-story-media-block--prints"}`}
                    key={`pair-${index}`}
                  >
                    <div className="house-story-pair">
                      {block.media.map((media) => (
                        <ProjectVisual key={media.src} media={media} locale={locale} paired />
                      ))}
                    </div>
                    {block.caption && <figcaption>{localText(block.caption, locale)}</figcaption>}
                  </figure>
                );
              return (
                <figure className={`house-story-media-block house-story-media-block--${block.media.kind}`} key={`media-${index}`}>
                  <ProjectVisual media={block.media} locale={locale} />
                  {block.caption && <figcaption>{localText(block.caption, locale)}</figcaption>}
                </figure>
              );
            })}
          </div>
          {project.results && project.results.length > 0 && (
            <section className="house-story-results house-wrap" aria-labelledby="project-results-title">
              <h2 id="project-results-title">{no ? "Resultater." : "Outcomes."}</h2>
              <ul>{project.results.map((result, index) => <li key={index}>
                <p>{localText(result.statement, locale)}</p>
                <p>{no ? "Kilde: " : "Source: "}<SourceReference source={result.source} locale={locale} /></p>
              </li>)}</ul>
            </section>
          )}
          <footer className="house-story-credits house-wrap">
            <div>
              <h2>{no ? "Om arbeidet." : "About the work."}</h2>
              <dl>
                {project.credits.map((credit) => (
                  <div key={`${credit.name}-${credit.role.en}`}>
                    <dt>{localText(credit.role, locale)}</dt>
                    <dd>{credit.name}</dd>
                  </div>
                ))}
              </dl>
              <p className="house-story-note">{localText(project.provenance, locale)}</p>
            </div>
            <div className="house-story-practices">
              <h3>
                {no ? "Vil du lage noe i samme fagfelt?" : "Have a project in these disciplines?"}
              </h3>
              {project.practices.map((id) => {
                const practice = getPractice(id);
                if (id === "syntax") return <Link key={id} href="/contact" className="house-work-text-link">
                  Syntax Studio<span>{no ? "Flere fag, én idé" : "Several disciplines, one idea"}</span><ArrowUpRight aria-hidden="true" />
                </Link>;
                return practice ? (
                  <Link key={id} href={practice.contactHref} className="house-work-text-link">
                    {practice.name}
                    <span>{localText(practice.discipline, locale)}</span>
                    <ArrowUpRight aria-hidden="true" />
                  </Link>
                ) : null;
              })}
            </div>
          </footer>
          {relatedProjects.length > 0 && (
            <nav
              className="house-story-next house-wrap"
              aria-label={no ? "Beslektede arbeider" : "Related work"}
            >
              {relatedProjects.map((nextProject) => <Link key={nextProject.slug} href={`/work/${nextProject.slug}`} aria-labelledby={`related-${nextProject.slug}`}>
                <div className={`house-story-next-image house-story-next-image--${nextProject.hero.kind}`}>
                  <Image
                    src={getMediaPreview(nextProject.hero)}
                    alt=""
                    width={nextProject.hero.width}
                    height={nextProject.hero.height}
                    sizes="(max-width: 700px) 28vw, 20vw"
                  />
                </div>
                <div className="house-story-next-title">
                  <span id={`related-${nextProject.slug}`}>{getProjectDisplayName(nextProject, locale)}</span>
                  <p>{getProjectKindLabel(nextProject, locale)} · {no ? "Se arbeidet" : "Explore the work"}</p>
                </div>
                <ArrowUpRight aria-hidden="true" />
              </Link>)}
            </nav>
          )}
        </div>
      </article>
    </main>
  );
}
