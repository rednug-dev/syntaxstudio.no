import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { POSTS, getPostBySlug, type Block } from "@/lib/blog-data";

const SITE_URL = "https://syntaxstudio.no";

export function generateStaticParams() {
  return POSTS.map((p) => ({ locale: "no", slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (locale !== "no") return {};
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} — Syntax Studio`,
    description: post.excerpt,
    alternates: {
      canonical: `/no/blog/${slug}`,
      languages: { no: `/no/blog/${slug}`, "x-default": `/no/blog/${slug}` },
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${SITE_URL}/no/blog/${slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
    },
  };
}

function renderBlock(block: Block, idx: number) {
  switch (block.type) {
    case "p":
      return (
        <p key={idx} className="text-lg text-foreground/90 leading-relaxed mb-5">
          {block.text}
        </p>
      );
    case "pRich":
      return (
        <p key={idx} className="text-lg text-foreground/90 leading-relaxed mb-5">
          {block.segments.map((seg, i) =>
            typeof seg === "string" ? (
              <span key={i}>{seg}</span>
            ) : (
              <a
                key={i}
                href={seg.href}
                {...(seg.external
                  ? { target: "_blank", rel: "noreferrer noopener" }
                  : {})}
                className="text-primary underline underline-offset-4 hover:opacity-80"
              >
                {seg.text}
              </a>
            )
          )}
        </p>
      );
    case "image": {
      const wrapperStyle = block.aspectRatio
        ? { aspectRatio: block.aspectRatio }
        : undefined;
      const imgStyle = block.objectPosition
        ? { objectPosition: block.objectPosition }
        : undefined;
      return (
        <figure key={idx} className="my-10">
          <div
            className="relative rounded-2xl overflow-hidden border border-white/10 bg-card/30"
            style={wrapperStyle}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={block.src}
              alt={block.alt}
              className={
                block.aspectRatio
                  ? "w-full h-full object-cover"
                  : "w-full h-auto object-cover"
              }
              style={imgStyle}
              loading="lazy"
            />
          </div>
          {block.caption && (
            <figcaption className="mt-3 text-sm text-muted-foreground text-center">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    }
    case "h2":
      return (
        <h2
          key={idx}
          id={block.id}
          className="text-3xl sm:text-4xl font-bold tracking-tight mt-16 mb-6"
        >
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 key={idx} className="text-xl sm:text-2xl font-semibold mt-10 mb-4">
          {block.text}
        </h3>
      );
    case "ul":
      return (
        <ul key={idx} className="space-y-3 mb-6 pl-1">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-lg text-foreground/85 leading-relaxed"
            >
              <span className="mt-3 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol
          key={idx}
          className="space-y-4 mb-6 list-decimal pl-6 marker:text-primary marker:font-semibold"
        >
          {block.items.map((item, i) => (
            <li
              key={i}
              className="text-lg text-foreground/85 leading-relaxed pl-2"
            >
              {item}
            </li>
          ))}
        </ol>
      );
    case "callout":
      return (
        <div
          key={idx}
          className="my-8 rounded-2xl border border-primary/20 bg-primary/5 p-6"
        >
          {block.title && (
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-2">
              {block.title}
            </h4>
          )}
          <p className="text-base text-foreground/90 leading-relaxed">
            {block.body}
          </p>
        </div>
      );
    case "table":
      return (
        <div key={idx} className="my-8 overflow-x-auto">
          <table className="w-full text-sm border border-white/10 rounded-xl overflow-hidden">
            <thead className="bg-card/40">
              <tr>
                {block.headers.map((h, i) => (
                  <th
                    key={i}
                    className="text-left p-3 font-semibold border-b border-white/10"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className="border-b border-white/5 last:border-0">
                  {row.map((cell, j) => (
                    <td key={j} className="p-3 text-muted-foreground">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return null;
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (locale !== "no") notFound();
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url: `${SITE_URL}/no/blog/${slug}`,
    inLanguage: "no",
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Organization",
      name: "Syntax Studio",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Syntax Studio",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logos/syntax-i.webp`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/no/blog/${slug}`,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Hjem",
        item: `${SITE_URL}/no`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blogg",
        item: `${SITE_URL}/no/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${SITE_URL}/no/blog/${slug}`,
      },
    ],
  };

  return (
    <>
      <Header />
      <Script
        id={`ld-blog-article-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Script
        id={`ld-blog-breadcrumb-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main
        id="main-content"
        className="container mx-auto max-w-3xl px-4 py-20 sm:py-28"
      >
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
          <ol className="flex items-center gap-2 flex-wrap">
            <li>
              <Link href="/" className="hover:text-foreground">
                Hjem
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/blog" className="hover:text-foreground">
                Blogg
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground">{post.title}</li>
          </ol>
        </nav>

        <header className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-4">
            Blogg
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            {post.title}
          </h1>
          <p className="mt-6 text-xl text-muted-foreground leading-relaxed">
            {post.lead}
          </p>
          <p className="mt-6 text-sm text-muted-foreground">
            Publisert:{" "}
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString("nb-NO", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </p>
        </header>

        <article className="prose-lg">
          {post.blocks.map((block, idx) => renderBlock(block, idx))}
        </article>

        <section className="mt-20 rounded-2xl border border-white/10 bg-card/30 p-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            Har du et prosjekt på gang?
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-xl mx-auto">
            Ta en uforpliktende prat med oss om hva vi kan bygge sammen.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Button size="lg" asChild>
              <Link href="/book">
                Book et møte
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/blog">Tilbake til bloggen</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
