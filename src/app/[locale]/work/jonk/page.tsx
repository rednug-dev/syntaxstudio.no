import { getTranslations } from "next-intl/server";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Camera, Video, ArrowLeft, Play, Instagram, Award } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { VideoCard } from "@/components/work/video-card";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function JonkWorkPage() {
  const t = await getTranslations("About.WorkIntro.projects.jonk.page");

  const socialAds = [
    { src: "/jønk/ad1_vertical.mp4", label: t("socialCampaign1") },
    { src: "/jønk/ad2_vertical.mp4", label: t("socialCampaign2") },
    { src: "/jønk/ad3_vertical.mp4", label: t("socialCampaign3") },
  ];

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
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-white/5 border border-white/10 p-2 flex items-center justify-center">
                    <img src="/logos/jønk.png" alt="Jønk" className="h-full w-auto brightness-0 invert" />
                </div>
                <Badge variant="outline" className="uppercase tracking-[0.2em] text-[10px] py-1 px-3 border-primary/20 text-primary">
                  {t("badge")}
                </Badge>
              </div>
              
              <h1 className="text-6xl lg:text-8xl font-bold tracking-tighter leading-[0.9] italic font-headline">
                {t("title")}
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                {t("description")}
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                 <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary/80">
                    <Video className="h-4 w-4" /> {t("socialAdsCount")}
                 </div>
                 <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary/80">
                    <Camera className="h-4 w-4" /> {t("productPhotosCount")}
                 </div>
                 <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary/80">
                    <Award className="h-4 w-4" /> {t("professionalGrade")}
                 </div>
              </div>
            </div>

            {/* Hero Video - Always playing, no hover required */}
            <VideoCard 
                src="/jønk/burgers_vertical.mp4"
                aspectRatio="vertical"
                objectPosition="bottom"
                alwaysPlay
                className="aspect-[4/5] lg:aspect-square"
                overlay={
                    <div className="absolute bottom-10 left-10">
                        <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/50 mb-2">{t("mainFeature")}</p>
                        <h3 className="text-2xl font-bold text-white">{t("cinematicTextures")}</h3>
                    </div>
                }
            />
          </div>
        </section>

        {/* Social Ads Section */}
        <section className="py-24 bg-muted/30 border-y border-white/5">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                <div className="max-w-xl">
                    <h2 className="text-4xl font-bold tracking-tighter mb-4 italic uppercase">{t("commercial")}</h2>
                    <p className="text-muted-foreground text-lg">{t("spiritDesc")}</p>
                </div>
                <div className="flex items-center gap-2 text-primary">
                    <Instagram className="h-5 w-5" />
                    <span className="text-sm font-bold uppercase tracking-widest">{t("optimizedForReels")}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                {socialAds.map((ad, idx) => (
                    <VideoCard 
                        key={idx}
                        src={ad.src}
                        aspectRatio="vertical"
                    />
                ))}
            </div>
          </div>
        </section>

        {/* Photo & Production Gallery - Optimized Grid Layout */}
        <section className="container mx-auto px-4 py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {/* Text Card - Double width, single height */}
                <div className="lg:col-span-2 rounded-[2rem] bg-primary p-10 flex flex-col justify-center text-primary-foreground border border-white/5 shadow-xl aspect-square md:aspect-auto lg:aspect-[2/1]">
                    <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                        <Camera className="h-6 w-6" />
                    </div>
                    <h3 className="text-3xl font-bold tracking-tight mb-3 uppercase italic leading-none">{t("photoTitle")}</h3>
                    <p className="text-primary-foreground/80 text-base leading-relaxed max-w-md">
                        {t("photoDesc")}
                    </p>
                </div>

                {/* Poster 1 - Square */}
                <div className="rounded-[2rem] overflow-hidden border border-white/5 shadow-xl group aspect-square">
                    <img src="/jønk/poster1.png" alt="Product shot 1" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                </div>

                {/* Pro Photo Vertical - Far right, spanning 2 rows */}
                <div className="lg:row-span-2 rounded-[2rem] overflow-hidden border border-white/5 shadow-xl group aspect-[9/16] lg:aspect-auto">
                    <img src="/jønk/prophoto_vertical.png" alt="Main product photo" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                </div>

                {/* Poster 2 - Square */}
                <div className="rounded-[2rem] overflow-hidden border border-white/5 shadow-xl group aspect-square">
                    <img src="/jønk/poster2.png" alt="Product shot 2" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                </div>

                {/* Poster 3 - Square */}
                <div className="rounded-[2rem] overflow-hidden border border-white/5 shadow-xl group aspect-square">
                    <img src="/jønk/poster3.png" alt="Product shot 3" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                </div>

                {/* Square Video (Fries) - Square */}
                <div className="rounded-[2rem] overflow-hidden border border-white/5 bg-black shadow-xl group aspect-square relative">
                    <VideoCard 
                        src="/jønk/jønkfries_square.mp4" 
                        aspectRatio="square"
                        alwaysPlay
                        className="w-full h-full rounded-none border-none shadow-none"
                        videoClassName="object-cover"
                    />
                </div>
            </div>
        </section>

        {/* Strategy Section */}
        <section className="container mx-auto px-4 pt-12 pb-24">
          <div className="rounded-[3rem] bg-card/40 border border-white/5 p-12 lg:p-20 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <img src="/logos/jønk.png" alt="" className="h-64 w-auto brightness-0 invert" />
            </div>
            
            <div className="grid lg:grid-cols-3 gap-16 relative z-10">
                <div className="space-y-6">
                    <h4 className="text-xs font-bold uppercase tracking-[0.4em] text-primary">{t("strategy")}</h4>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        {t("strategyDesc")}
                    </p>
                </div>
                
                <div className="space-y-6">
                    <h4 className="text-xs font-bold uppercase tracking-[0.4em] text-primary">{t("work")}</h4>
                    <ul className="space-y-4">
                        {t.raw("workItems").map((item: string, idx: number) => (
                        <li key={idx} className="flex items-center gap-3 text-lg font-medium text-foreground/90">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            {item}
                        </li>
                        ))}
                    </ul>
                </div>
                
                <div className="space-y-6">
                    <h4 className="text-xs font-bold uppercase tracking-[0.4em] text-primary">{t("deliverables")}</h4>
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
