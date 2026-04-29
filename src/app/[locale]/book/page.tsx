import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Calendar, Mail, Clock, Check } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";

const CAL_URL = "https://cal.com/syntaxstudio";
const SITE_URL = "https://syntaxstudio.no";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "BookPage" });

  const path = locale === "no" ? "/book" : "/en/book";
  return {
    metadataBase: new URL(SITE_URL),
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: path,
      languages: {
        no: "/book",
        en: "/en/book",
        "x-default": "/book",
      },
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      type: "website",
      url: `${SITE_URL}${path}`,
      siteName: "Syntax Studio",
    },
    twitter: {
      card: "summary_large_image",
      title: t("metaTitle"),
      description: t("metaDescription"),
    },
  };
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "BookPage" });

  const expect = [
    t("expect.duration"),
    t("expect.format"),
    t("expect.outcome"),
    t("expect.noCommitment"),
  ];

  return (
    <>
      <Header />
      <main id="main-content" className="container mx-auto max-w-3xl px-4 py-20 sm:py-28">
        <section className="text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            {t("title")}
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {t("subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
            <Button size="lg" className="gap-2" asChild>
              <a href={CAL_URL} target="_blank" rel="noopener noreferrer">
                <Calendar className="h-4 w-4" />
                {t("bookCta")}
              </a>
            </Button>
            <Button size="lg" variant="outline" className="gap-2" asChild>
              <a href="mailto:gunder@syntaxstudio.no">
                <Mail className="h-4 w-4" />
                {t("emailCta")}
              </a>
            </Button>
          </div>
        </section>

        <section className="mt-16 rounded-2xl border border-white/10 bg-card/30 p-8">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            {t("expect.title")}
          </h2>
          <ul className="space-y-3">
            {expect.map((line, i) => (
              <li key={i} className="flex items-start gap-3 text-muted-foreground">
                <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
