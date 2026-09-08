import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import WorkIndex from "@/components/house/work-index";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const no = locale !== "en";
  const title = no ? "Utvalgte arbeider — Syntax Studio" : "Selected work — Syntax Studio";
  const description = no
    ? "Utvalgte arbeider fra Syntax Studio. Fotografi, film, grafisk design og motion, samlet i ett kreativt hus i Oslo."
    : "Selected work from Syntax Studio. Photography, film, graphic design and motion, brought together in an independent creative house in Oslo.";
  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: no ? "/work" : "/en/work",
      languages: { no: "/work", en: "/en/work", "x-default": "/work" },
    },
    openGraph: {
      title,
      description,
      url: no ? "/work" : "/en/work",
      images: [{ url: "/webmat/burgercrop.webp" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/webmat/burgercrop.webp"],
    },
  };
}

export default async function WorkPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ practice?: string | string[] }>;
}) {
  const [{ locale }, query] = await Promise.all([params, searchParams]);
  const initialPractice = typeof query.practice === "string" ? query.practice : undefined;
  return (
    <>
      <Header />
      <main id="main-content" className="house-page house-work-page">
        <WorkIndex
          key={locale}
          locale={locale}
          initialPractice={initialPractice}
        />
      </main>
      <Footer />
    </>
  );
}
