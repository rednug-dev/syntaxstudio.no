import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { BurgerMark } from "@/components/work/burger-mark";
import { Link } from "@/i18n/navigation";

type WorkLink = { slug: string; name: string; logo?: string; kanji?: string; mark?: boolean };

/** The burger case is shown de-identified, so it carries our own mark and a
 *  descriptive label instead of a client wordmark. */
const projectsFor = (locale: string): WorkLink[] => [
  { slug: "burger", name: locale === "no" ? "Burgerkampanje" : "Burger campaign", mark: true },
  { slug: "snatched", logo: "/logos/Snatched.svg", name: "Snatched" },
  { slug: "tokyo", name: "Tokyo", kanji: "東京" },
];

/**
 * "More work" strip shown near the bottom of each case study so engaged
 * prospects can jump to a sibling project instead of dead-ending at /services.
 */
export default function MoreWork({
  current,
  locale,
}: {
  current: string;
  locale: string;
}) {
  const others = projectsFor(locale).filter((p) => p.slug !== current);

  return (
    <section className="container mx-auto px-4 pb-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-primary mb-8 text-center">
          {locale === "no" ? "Mer arbeid" : "More work"}
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {others.map((p) => (
            <Link
              key={p.slug}
              href={`/work/${p.slug}`}
              className="group flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-card/30 p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
            >
              {p.logo ? (
                <Image
                  src={p.logo}
                  alt={p.name}
                  width={120}
                  height={40}
                  className="h-8 w-auto brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity"
                />
              ) : p.mark ? (
                <span className="flex items-center gap-2.5 opacity-80 group-hover:opacity-100 transition-opacity">
                  <BurgerMark className="h-6 w-auto text-primary" />
                  <span className="text-sm font-semibold tracking-tight text-foreground">
                    {p.name}
                  </span>
                </span>
              ) : p.kanji ? (
                <span className="flex items-baseline gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                  <span
                    className="text-2xl leading-none text-[#e0483d]"
                    style={{ fontFamily: '"Yu Mincho","Hiragino Mincho ProN","Noto Serif JP",serif' }}
                  >
                    {p.kanji}
                  </span>
                  <span className="text-sm font-semibold tracking-tight text-foreground">
                    {p.name}
                  </span>
                </span>
              ) : (
                <span className="text-sm font-semibold tracking-tight text-foreground opacity-80 group-hover:opacity-100 transition-opacity">
                  {p.name}
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:gap-2.5 transition-all">
                {locale === "no" ? "Se prosjekt" : "See project"}
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
