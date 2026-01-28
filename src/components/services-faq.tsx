'use client';

import * as React from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations } from "next-intl";

const FAQ_ITEMS = ["timeline", "cost", "changes", "support", "tech"];

export default function ServicesFaq() {
  const t = useTranslations("ServicesPage.faq");

  return (
    <section className="container mx-auto max-w-4xl px-4 py-6">
      <div className="mx-auto max-w-3xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.6 }}
          className="text-4xl font-bold tracking-tight sm:text-5xl"
        >
          {t("title")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut", delay: 0.05 }}
          viewport={{ once: true, amount: 0.6 }}
          className="mt-3 text-base text-muted-foreground"
        >
          {t("subtitle")}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        className="mt-10"
      >
        <Accordion type="single" collapsible className="w-full">
          {FAQ_ITEMS.map((id) => (
            <AccordionItem key={id} value={id}>
              <AccordionTrigger className="text-left text-base font-medium">
                {t(`items.${id}.q`)}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {t(`items.${id}.a`)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </section>
  );
}
