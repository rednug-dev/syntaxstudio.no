'use client';

import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

type Currency = "USD" | "NOK";

type PricingProps = {
  /** NOK per 1 USD. */
  conversionRate?: number; // default 11.0
  /** Start-valuta. */
  initialCurrency?: Currency; // default 'USD'
  /** Callback ved bytte av valuta. */
  onCurrencyChange?: (c: Currency) => void;
};

function Feature({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full ring-1 ring-foreground/20 transition-colors group-hover:ring-primary/40">
        <Check className="h-3.5 w-3.5" aria-hidden />
      </span>
      <span className="text-sm">{children}</span>
    </li>
  );
}

export default function Pricing({
  conversionRate = 11.0,
  initialCurrency = "USD",
  onCurrencyChange,
}: PricingProps) {
  const t = useTranslations("Pricing");
  const locale = useLocale();

  const [currency, setCurrency] = React.useState<Currency>(initialCurrency);

  // Husk brukerens valg av valuta i localStorage
  React.useEffect(() => {
    const saved =
      typeof window !== "undefined" ? (window.localStorage.getItem("currency") as Currency | null) : null;
    if (saved === "USD" || saved === "NOK") setCurrency(saved);
  }, []);
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("currency", currency);
    }
    onCurrencyChange?.(currency);
  }, [currency, onCurrencyChange]);

  // Formatter basert på aktiv locale + valgt valuta
  const nf = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  });

  // USD basepriser → konverter hvis NOK
  const price = (usd: number) => (currency === "USD" ? usd : Math.round(usd * conversionRate));

  // Hent features-lister som arrays fra messages
  const basicFeatures = t.raw("plans.basic.features") as string[];
  const standardFeatures = t.raw("plans.standard.features") as string[];
  const premiumFeatures = t.raw("plans.premium.features") as string[];

  return (
    <section className="container mx-auto max-w-6xl px-4 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">{t("title")}</h2>
        <p className="mt-3 text-base text-muted-foreground">{t("subtitle")}</p>

        {/* Currency toggle */}
        <div className="mt-5 flex justify-center">
          <div className="inline-flex items-center gap-1 rounded-full border bg-muted/50 p-1">
            <Button
              size="sm"
              variant={currency === "USD" ? "default" : "ghost"}
              className="rounded-full"
              onClick={() => setCurrency("USD")}
              aria-pressed={currency === "USD"}
            >
              {t("toggle.usd")}
            </Button>
            <Button
              size="sm"
              variant={currency === "NOK" ? "default" : "ghost"}
              className="rounded-full"
              onClick={() => setCurrency("NOK")}
              aria-pressed={currency === "NOK"}
            >
              {t("toggle.nok")}
            </Button>
          </div>
        </div>

        {/* Kurs-note */}
        <p className="mt-2 text-xs text-muted-foreground">
          {currency === "NOK"
            ? t("note.nok", { rate: conversionRate.toFixed(2) })
            : t("note.usd")}
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {/* Basic */}
        <Card className="group flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
          <CardHeader>
            <CardTitle>{t("plans.basic.name")}</CardTitle>
            <CardDescription>{t("plans.basic.desc")}</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="mb-6 flex items-baseline gap-2">
              <span className="text-4xl font-bold sm:text-5xl">{nf.format(price(300))}</span>
            </div>
            <ul className="space-y-3">
              {basicFeatures.map((f) => (
                <Feature key={f}>{f}</Feature>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="mt-auto">
            <Button className="w-full" size="lg">
              {t("cta.getStarted")}
            </Button>
          </CardFooter>
        </Card>

        {/* Standard (Most Popular) */}
        <Card className="relative group flex flex-col border-primary/50 shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
          <Badge className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[11px] uppercase tracking-wide">
            {t("badgeMostPopular")}
          </Badge>
          <CardHeader>
            <CardTitle>{t("plans.standard.name")}</CardTitle>
            <CardDescription>{t("plans.standard.desc")}</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="mb-6 flex items-baseline gap-2">
              <span className="text-4xl font-bold sm:text-5xl">{nf.format(price(500))}</span>
            </div>
            <ul className="space-y-3">
              {standardFeatures.map((f) => (
                <Feature key={f}>{f}</Feature>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="mt-auto">
            <Button className="w-full" size="lg">
              {t("cta.getStarted")}
            </Button>
          </CardFooter>
        </Card>

        {/* Premium */}
        <Card className="group flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
          <CardHeader>
            <CardTitle>{t("plans.premium.name")}</CardTitle>
            <CardDescription>{t("plans.premium.desc")}</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="mb-6 flex items-baseline gap-2">
              <span className="text-4xl font-bold sm:text-5xl">{nf.format(price(800))}</span>
            </div>
            <ul className="space-y-3">
              {premiumFeatures.map((f) => (
                <Feature key={f}>{f}</Feature>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="mt-auto">
            <Button variant="outline" className="w-full" size="lg">
              {t("cta.contactSales")}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}