import { getTranslations } from "next-intl/server";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Video, ArrowLeft, Swords, Flame } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import Image from "next/image";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function FCRWorkPage() {
  const t = await getTranslations("About.WorkIntro.projects.fcr.page");

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1 pb-24">
        {/* Top Navigation */}
        <div className="container mx-auto px-4 pt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            {t("back")}
          </Link>
        </div>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 lg:py-24">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-white/5 border border-white/10 p-2 flex items-center justify-center relative">
                <Image
                  src="/logos/FCRNM.svg"
                  alt="FCR"
                  fill
                  className="object-contain p-2 brightness-0 invert"
                />
              </div>
              <Badge
                variant="outline"
                className="uppercase tracking-[0.2em] text-[10px] py-1 px-3 border-primary/20 text-primary"
              >
                {t("badge")}
              </Badge>
            </div>

            <h1 className="text-6xl lg:text-8xl font-bold tracking-tighter leading-[0.9] italic font-headline">
              {t("title")}
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
              {t("description")}
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary/80">
                <Swords className="h-4 w-4" /> MMA
              </div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary/80">
                <Video className="h-4 w-4" /> Promo
              </div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary/80">
                <Flame className="h-4 w-4" /> Tamerlan Akhmadov
              </div>
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="py-24 bg-muted/30 border-y border-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold tracking-tighter mb-4 italic uppercase">
                {t("videoTitle")}
              </h2>
              <p className="text-muted-foreground text-lg mb-12 max-w-xl">
                {t("videoDesc")}
              </p>

              {/* Video placeholder — replace src when video is added */}
              <div className="aspect-video rounded-[2rem] bg-card/40 border border-white/5 shadow-xl overflow-hidden flex items-center justify-center">
                <div className="text-center space-y-4 p-8">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <Video className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground uppercase tracking-widest font-semibold">
                    Video kommer snart
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Strategy Section */}
        <section className="container mx-auto px-4 pt-12 pb-24">
          <div className="rounded-[3rem] bg-card/40 border border-white/5 p-12 pr-16 lg:p-20 lg:pr-32 shadow-2xl relative overflow-hidden">
            <div className="absolute top-8 right-8 p-8 opacity-5 pointer-events-none h-64 w-64">
              <Image
                src="/logos/FCRNM.svg"
                alt=""
                fill
                className="object-contain brightness-0 invert"
              />
            </div>

            <div className="grid lg:grid-cols-3 gap-16 relative z-10">
              <div className="space-y-6">
                <h4 className="text-xs font-bold uppercase tracking-[0.4em] text-primary">
                  {t("strategy")}
                </h4>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {t("strategyDesc")}
                </p>
              </div>

              <div className="space-y-6">
                <h4 className="text-xs font-bold uppercase tracking-[0.4em] text-primary">
                  {t("work")}
                </h4>
                <ul className="space-y-4">
                  {t.raw("workItems").map((item: string, idx: number) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 text-lg font-medium text-foreground/90"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6">
                <h4 className="text-xs font-bold uppercase tracking-[0.4em] text-primary">
                  {t("deliverables")}
                </h4>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {t("deliverablesDesc")}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
