"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const ITEM_KEYS = ["revenue", "views", "inhouse", "projects"] as const;

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function StatsStrip() {
  const t = useTranslations("Stats");

  return (
    <section className="py-16 border-t border-border/40">
      <div className="container mx-auto max-w-6xl px-4">
        <h3 className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-12">
          {t("eyebrow")}
        </h3>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-y-10 md:gap-y-0 divide-y divide-border/40 md:divide-y-0 md:divide-x"
        >
          {ITEM_KEYS.map((key) => {
            const value = t(`items.${key}.value`);
            const label = t(`items.${key}.label`);
            const hasSuffix = key === "revenue";

            return (
              <motion.div
                key={key}
                variants={item}
                className="px-4 md:px-6 text-center"
              >
                <div className="inline-flex items-center justify-center gap-1.5 text-4xl sm:text-5xl font-bold tracking-tight tabular-nums leading-none">
                  <span>{value}</span>
                  {hasSuffix && (
                    <span className="text-lg sm:text-xl text-muted-foreground font-semibold">
                      {t("items.revenue.suffix")}
                    </span>
                  )}
                </div>
                <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-snug max-w-[18ch] mx-auto">
                  {label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
