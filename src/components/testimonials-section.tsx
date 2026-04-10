"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Card } from "@/components/ui/card";
import { testimonials } from "@/lib/case-studies";
import { useTranslations } from "next-intl";

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function TestimonialsSection() {
  const t = useTranslations("Testimonials");

  return (
    <section className="container mx-auto max-w-4xl px-4 py-20">
      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        className="text-4xl font-bold tracking-tight sm:text-5xl text-center mb-12"
      >
        {t("title")}
      </motion.h2>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.15 }}
        className="grid gap-6 md:grid-cols-2"
      >
        {testimonials.map((item_data) => (
          <motion.div key={item_data.name} variants={item}>
            <Card className="h-full p-8 bg-card/40 border-border/50">
              <Quote className="h-8 w-8 text-primary/20 mb-4" />
              <p className="text-lg leading-relaxed text-foreground/90 italic">
                &ldquo;{item_data.testimonial}&rdquo;
              </p>
              <div className="mt-6 pt-4 border-t border-border/30">
                <p className="font-semibold text-sm">{item_data.name}</p>
                <p className="text-sm text-muted-foreground">{item_data.title}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
