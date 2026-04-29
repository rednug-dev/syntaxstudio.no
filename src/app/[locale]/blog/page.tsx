import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Link } from "@/i18n/navigation";
import { POSTS } from "@/lib/blog-data";

const SITE_URL = "https://syntaxstudio.no";

export function generateStaticParams() {
  return [{ locale: "no" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "no") return {};
  return {
    title: "Blogg — Syntax Studio",
    description:
      "Tanker om webdesign, utvikling og det å drive byrå i Norge, fra teamet i Syntax Studio.",
    alternates: {
      canonical: `/blog`,
      languages: { no: `/blog`, "x-default": `/blog` },
    },
    openGraph: {
      title: "Blogg — Syntax Studio",
      description:
        "Tanker om webdesign, utvikling og det å drive byrå i Norge.",
      url: `${SITE_URL}/blog`,
      type: "website",
    },
  };
}

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== "no") notFound();

  const posts = [...POSTS].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt)
  );

  return (
    <>
      <Header />
      <main
        id="main-content"
        className="container mx-auto max-w-3xl px-4 py-20 sm:py-28"
      >
        <header className="mb-16">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-4">
            Blogg
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Notater fra studio
          </h1>
          <p className="mt-6 text-xl text-muted-foreground leading-relaxed">
            Tanker om webdesign, utvikling, og det å drive byrå i Norge.
          </p>
        </header>

        <ul className="space-y-10">
          {posts.map((post) => (
            <li
              key={post.slug}
              className="border-b border-white/10 pb-10 last:border-0"
            >
              <Link href={`/blog/${post.slug}`} className="group block">
                <time
                  dateTime={post.publishedAt}
                  className="text-sm text-muted-foreground"
                >
                  {new Date(post.publishedAt).toLocaleDateString("nb-NO", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  {post.excerpt}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}
