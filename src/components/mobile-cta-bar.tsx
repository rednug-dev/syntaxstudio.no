"use client";

import { Calendar, Phone } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";

/**
 * Always-visible booking CTA on phones/tablets. The header CTA is hidden below
 * `sm` and the header itself hides on scroll-down, so long pages otherwise leave
 * mobile visitors with no one-tap path to convert. Hidden on the /book page
 * (redundant there) and on large screens.
 */
export default function MobileCtaBar() {
  const pathname = usePathname();
  const t = useTranslations("Nav");
  const locale = useLocale();

  if (pathname === "/book") return null;

  return (
    <div className="lg:hidden fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-background/90 backdrop-blur-md pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-stretch gap-2 px-3 py-2.5">
        <Link
          href="/book"
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-transform active:scale-[0.98]"
        >
          <Calendar className="h-4 w-4" />
          {t("bookCall")}
        </Link>
        <a
          href="tel:+4794443355"
          aria-label={locale === "no" ? "Ring oss" : "Call us"}
          className="flex items-center justify-center gap-2 rounded-full border border-white/15 bg-card/70 px-5 py-3 text-sm font-semibold text-foreground transition-transform active:scale-[0.98]"
        >
          <Phone className="h-4 w-4" />
          {locale === "no" ? "Ring" : "Call"}
        </a>
      </div>
    </div>
  );
}
