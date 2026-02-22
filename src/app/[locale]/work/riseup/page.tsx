import { getTranslations } from "next-intl/server";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Palette, Layout, CheckCircle2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RiseUpWorkPage() {
  const t = await getTranslations("About.WorkIntro.projects.riseup.page");

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
        <section className="container mx-auto px-4 py-16 lg:py-24 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="flex justify-center items-center gap-4">
              <Badge variant="outline" className="uppercase tracking-[0.2em] text-[10px] py-1 px-3 border-primary/20 text-primary">
                {t("badge")}
              </Badge>
            </div>
            
            <h1 className="text-6xl lg:text-8xl font-bold tracking-tighter leading-[0.9] italic font-headline">
              {t("title")}
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t("description")}
            </p>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-24 bg-muted/30 border-y border-white/5">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold tracking-tighter mb-16 text-center italic uppercase">{t("comparison")}</h2>
            
            <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center max-w-5xl mx-auto">
                {/* Before */}
                <div className="space-y-6 text-center">
                    <div className="aspect-square rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center p-12 grayscale opacity-80">
                        <img src="/riseup/riseupbefore.png" alt="Old RiseUp Logo" className="w-full h-auto opacity-40" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold uppercase tracking-widest text-muted-foreground">{t("before")}</h3>
                    </div>
                </div>

                {/* After */}
                <div className="space-y-6 text-center">
                    <div className="aspect-square rounded-[2rem] bg-white/10 border border-primary/20 flex items-center justify-center p-12 shadow-[0_0_50px_-12px_rgba(var(--primary),0.3)] overflow-hidden">
                        <img src="/riseup/riseup-logo-sq.jpg" alt="New RiseUp Logo" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold uppercase tracking-widest text-primary">{t("after")}</h3>
                    </div>
                </div>
            </div>
          </div>
        </section>

        {/* Philosophy & Strategy Section */}
        <section className="container mx-auto px-4 py-24">
          <div className="max-w-5xl mx-auto space-y-24">
            {/* Philosophy Text */}
            <div className="text-center max-w-3xl mx-auto space-y-6">
                <h4 className="text-sm font-bold uppercase tracking-[0.4em] text-primary">{t("philosophy")}</h4>
                <p className="text-3xl font-medium leading-tight">
                    {t("philosophyDesc")}
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center border-t border-white/5 pt-24">
                <div className="space-y-6">
                    <h4 className="text-sm font-bold uppercase tracking-[0.4em] text-primary">{t("strategy")}</h4>
                    <p className="text-2xl text-muted-foreground leading-relaxed font-medium">
                        {t("strategyDesc")}
                    </p>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Palette className="h-5 w-5 text-primary" />
                        </div>
                        <h5 className="font-bold uppercase tracking-widest text-sm">{t("visualModernization")}</h5>
                        <p className="text-sm text-muted-foreground">{t("visualModernizationDesc")}</p>
                    </div>
                    <div className="space-y-4">
                        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Layout className="h-5 w-5 text-primary" />
                        </div>
                        <h5 className="font-bold uppercase tracking-widest text-sm">{t("multiPlatform")}</h5>
                        <p className="text-sm text-muted-foreground">{t("multiPlatformDesc")}</p>
                    </div>
                </div>
            </div>
          </div>
        </section>

        {/* Deliverables Section */}
        <section className="container mx-auto px-4 pb-24">
          <div className="rounded-[3rem] bg-card/40 border border-white/5 p-12 lg:p-20 shadow-2xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                    <h4 className="text-xs font-bold uppercase tracking-[0.4em] text-primary mb-8">{t("deliverables")}</h4>
                    <p className="text-2xl font-bold mb-8 italic">{t("deliverablesDesc")}</p>
                    <div className="flex flex-wrap gap-4">
                        <Badge className="bg-white/10 hover:bg-white/20 text-white border-none py-2 px-4">SVG / Vector</Badge>
                        <Badge className="bg-white/10 hover:bg-white/20 text-white border-none py-2 px-4">PNG / Transparent</Badge>
                        <Badge className="bg-white/10 hover:bg-white/20 text-white border-none py-2 px-4">Brand Styleguide</Badge>
                    </div>
                </div>
                <div className="space-y-4">
                    {[
                        t("primaryLogo"),
                        t("secondaryWordmark"),
                        t("faviconIconography"),
                        t("typographySelection"),
                        t("colorPalette")
                    ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                            <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                            <span className="font-medium text-foreground/90">{item}</span>
                        </div>
                    ))}
                </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
