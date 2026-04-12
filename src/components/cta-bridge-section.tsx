"use client";

import { motion } from "framer-motion";
import { Calendar, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function CtaBridgeSection() {
  const t = useTranslations("CtaBridge");

  return (
    <section className="container mx-auto max-w-3xl px-4 py-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="space-y-6"
      >
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
          {t("title")}
        </h2>
        <p className="text-muted-foreground text-lg">
          {t("subtitle")}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
          <Button size="lg" className="gap-2" asChild>
            <Link href="/book">
              <Calendar className="h-4 w-4" />
              {t("bookCta")}
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="gap-2" asChild>
            <a href="#proposal">
              <Mail className="h-4 w-4" />
              {t("messageCta")}
            </a>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
