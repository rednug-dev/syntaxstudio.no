import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "404",
    robots: { index: false, follow: true },
  };
}

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <>
      <Header />
      <main id="main-content" className="container mx-auto max-w-2xl px-4 py-32 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-6">
          404
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          {t("title")}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">{t("subtitle")}</p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-3">
          <Button size="lg" asChild>
            <Link href="/">
              {t("home")} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/services">{t("services")}</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/book">{t("book")}</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
}
