'use client';

import * as React from "react";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";

import {
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Loader2 } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

import {
  Dialog, DialogTrigger, DialogContent, DialogHeader,
  DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { handlePricingOrder, type FormState } from "@/actions";

type Currency = "USD" | "NOK";

type PricingProps = {
  conversionRate?: 10.0;
  initialCurrency?: Currency;
  onCurrencyChange?: (c: Currency) => void;
};

type Addon = { id: string; key: string; value: string; priceUSD: number };

const BASIC_BASE_USD = 300;
const STANDARD_BASE_USD = 500;

const ADDONS: Addon[] = [
  { id: "addon-page",    key: "extraPage",     value: "extra_page",     priceUSD: 120 },
  { id: "addon-hosting", key: "hosting",       value: "hosting",        priceUSD: 200 },
  { id: "addon-content", key: "contentAssist", value: "content_assist", priceUSD: 150 },
  { id: "addon-seo",     key: "seoBoost",      value: "seo_boost",      priceUSD: 150 },
];

function Feature({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full ring-1 ring-foreground/20">
        <Check className="h-3.5 w-3.5" aria-hidden />
      </span>
      <span className="text-sm">{children}</span>
    </li>
  );
}

function SubmitButton({ labelSend, labelSending }: { labelSend: string; labelSending: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />{labelSending}</>) : labelSend}
    </Button>
  );
}

export default function Pricing({
  conversionRate = 10,
  initialCurrency = "USD",
  onCurrencyChange,
}: PricingProps) {
  const t = useTranslations("Pricing");
  const locale = useLocale();
  const [currency, setCurrency] = React.useState<Currency>(initialCurrency);

  // Dialog open
  const [openBasic, setOpenBasic] = React.useState(false);
  const [openStandard, setOpenStandard] = React.useState(false);
  const [openPremium, setOpenPremium] = React.useState(false);

  // Selections
  const [basicSelected, setBasicSelected] = React.useState<Set<string>>(new Set());
  const [standardSelected, setStandardSelected] = React.useState<Set<string>>(new Set());
  const [stdIncluded, setStdIncluded] = React.useState<"booking" | "ecommerce">("booking");

  // Server action state (en per dialog)
  const initialState: FormState = { message: "", errors: null, success: false };
  const [basicState, basicAction] = useActionState(handlePricingOrder, initialState);
  const [standardState, standardAction] = useActionState(handlePricingOrder, initialState);
  const [premiumState, premiumAction] = useActionState(handlePricingOrder, initialState);

  // Persist currency
  React.useEffect(() => {
    const saved = typeof window !== "undefined" ? (window.localStorage.getItem("currency") as Currency | null) : null;
    if (saved === "USD" || saved === "NOK") setCurrency(saved);
  }, []);
  React.useEffect(() => {
    if (typeof window !== "undefined") window.localStorage.setItem("currency", currency);
    onCurrencyChange?.(currency);
  }, [currency, onCurrencyChange]);

  // Close dialog on success + reset selections
  useEffect(() => {
    if (basicState.success) { setOpenBasic(false); setBasicSelected(new Set()); }
  }, [basicState.success]);
  useEffect(() => {
    if (standardState.success) { setOpenStandard(false); setStandardSelected(new Set()); setStdIncluded("booking"); }
  }, [standardState.success]);
  useEffect(() => {
    if (premiumState.success) setOpenPremium(false);
  }, [premiumState.success]);

  // Formatters
  const nfUSD = new Intl.NumberFormat(locale, { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  const formatPrice = (usd: number) => {
    if (currency === "USD") return nfUSD.format(usd);
    const nok = Math.round(usd * conversionRate);
    const nb = new Intl.NumberFormat("nb-NO", { maximumFractionDigits: 0 }).format(nok);
    return `${nb} kr`;
  };

  // Sums
  const sumAddonsUSD = (sel: Set<string>) => ADDONS.filter(a => sel.has(a.value)).reduce((s, a) => s + a.priceUSD, 0);
  const basicTotalUSD = BASIC_BASE_USD + sumAddonsUSD(basicSelected);
  const standardTotalUSD = STANDARD_BASE_USD + sumAddonsUSD(standardSelected);

  // Toggle addon
  const toggleAddon = (plan: "basic" | "standard", value: string, checked: boolean) => {
    const update = (prev: Set<string>) => { const next = new Set(prev); checked ? next.add(value) : next.delete(value); return next; };
    if (plan === "basic") setBasicSelected(update); else setStandardSelected(update);
  };

  // i18n arrays
  const basicFeatures = t.raw("plans.basic.features") as string[];
  const standardFeatures = t.raw("plans.standard.features") as string[];
  const premiumFeatures = t.raw("plans.premium.features") as string[];

  // Addon row w/ hidden input (for FormData)
  const AddonRow = ({ plan, a, checked }: { plan: "basic" | "standard"; a: Addon; checked: boolean }) => (
    <label htmlFor={`${plan}-${a.id}`} className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <Checkbox
          id={`${plan}-${a.id}`}
          checked={checked}
          onCheckedChange={(c) => toggleAddon(plan, a.value, Boolean(c))}
        />
        <span className="text-sm">{t(`addons.${a.key}`)}</span>
      </div>
      <span className="text-sm tabular-nums">{formatPrice(a.priceUSD)}</span>

      {/* Skjulte felt så server action får data */}
      <input type="hidden" name="addons" value={a.value} disabled={!checked} />
      <input type="hidden" name="addonsLabel" value={t(`addons.${a.key}`)} disabled={!checked} />
      <input type="hidden" name="addonsUSD" value={String(a.priceUSD)} disabled={!checked} />
    </label>
  );

  const Summary = ({ baseUSD, selected, title }: { baseUSD: number; selected: Set<string>; title: string }) => {
    const addons = ADDONS.filter(a => selected.has(a.value));
    const totalUSD = baseUSD + addons.reduce((s, a) => s + a.priceUSD, 0);
    return (
      <div className="rounded-lg border p-4">
        <div className="mb-2 text-sm font-medium">{title}</div>
        <div className="flex items-center justify-between text-sm">
          <span>{t("forms.summary.base")}</span>
          <span className="tabular-nums">{formatPrice(baseUSD)}</span>
        </div>
        {addons.length > 0 && (
          <div className="mt-2 space-y-1">
            <div className="text-xs text-muted-foreground">{t("forms.summary.addons")}</div>
            {addons.map((a) => (
              <div key={a.value} className="flex items-center justify-between text-sm">
                <span>{t(`addons.${a.key}`)}</span>
                <span className="tabular-nums">{formatPrice(a.priceUSD)}</span>
              </div>
            ))}
          </div>
        )}
        <div className="mt-3 border-t pt-3 flex items-center justify-between font-semibold">
          <span>{t("forms.summary.total")}</span>
          <span className="tabular-nums">{formatPrice(totalUSD)}</span>
        </div>

        {/* Verdier som sendes med skjemaet */}
        <input type="hidden" name="baseUSD" value={String(baseUSD)} />
        <input type="hidden" name="totalUSD" value={String(totalUSD)} />
      </div>
    );
  };

  return (
    <section className="container mx-auto max-w-6xl px-4 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">{t("title")}</h2>
        <p className="mt-3 text-base text-muted-foreground">{t("subtitle")}</p>

        {/* Currency toggle */}
        <div className="mt-5 flex justify-center">
          <div className="inline-flex items-center gap-1 rounded-full border bg-muted/50 p-1">
            <Button size="sm" variant={currency === "USD" ? "default" : "ghost"} className="rounded-full"
              onClick={() => setCurrency("USD")} aria-pressed={currency === "USD"}>{t("toggle.usd")}
            </Button>
            <Button size="sm" variant={currency === "NOK" ? "default" : "ghost"} className="rounded-full"
              onClick={() => setCurrency("NOK")} aria-pressed={currency === "NOK"}>{t("toggle.nok")}
            </Button>
          </div>
        </div>

        {/* Note */}
        <p className="mt-2 text-xs text-muted-foreground">
          {currency === "NOK" ? t("note.nok", { rate: conversionRate.toFixed(2) }) : t("note.usd")}
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {/* Basic */}
        <Card className="group flex flex-col transition-all hover:-translate-y-1 hover:shadow-lg">
          <CardHeader>
            <CardTitle>{t("plans.basic.name")}</CardTitle>
            <CardDescription>{t("plans.basic.desc")}</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="mb-2 flex items-baseline gap-2">
              <span className="text-4xl font-bold sm:text-5xl">{formatPrice(BASIC_BASE_USD)}</span>
            </div>
            {basicTotalUSD > BASIC_BASE_USD && (
              <div className="mb-6 text-sm text-muted-foreground">
                {t("estimatedTotal", { amount: formatPrice(basicTotalUSD) })}
              </div>
            )}
            <ul className="space-y-3">
              {basicFeatures.map((f) => (<Feature key={f}>{f}</Feature>))}
            </ul>
          </CardContent>
          <CardFooter className="mt-auto">
            <Dialog open={openBasic} onOpenChange={setOpenBasic}>
              <DialogTrigger asChild>
                <Button className="w-full" size="lg">{t("cta.getStarted")}</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-3xl">
                <DialogHeader>
                  <DialogTitle>{t("dialogs.basic.title")}</DialogTitle>
                  <DialogDescription>{t("dialogs.basic.desc")}</DialogDescription>
                </DialogHeader>

                <form action={basicAction} className="grid gap-5 sm:grid-cols-2">
                  {/* Hidden shared fields */}
                  <input type="hidden" name="plan" value="basic" />
                  <input type="hidden" name="currency" value={currency} />
                  <input type="hidden" name="conversionRate" value={String(conversionRate)} />
                  <input type="hidden" name="locale" value={locale} />
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" />

                  {/* Left */}
                  <div className="grid gap-5">
                    <fieldset className="grid gap-3">
                      <legend className="text-sm font-medium">{t("forms.labels.addons")}</legend>
                      <div className="grid gap-2">
                        {ADDONS.map((a) => (
                          <AddonRow key={`basic-${a.id}`} plan="basic" a={a} checked={basicSelected.has(a.value)} />
                        ))}
                      </div>
                    </fieldset>

                    <div className="grid gap-2">
                      <Label htmlFor="basic-project">{t("forms.labels.project")}</Label>
                      <Textarea id="basic-project" name="project" placeholder={t("forms.placeholders.project")} required rows={5} />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="basic-email">{t("forms.labels.email")}</Label>
                      <Input id="basic-email" name="email" type="email" placeholder="you@company.com" required />
                    </div>
                  </div>

                  {/* Right: summary (includes hidden baseUSD/totalUSD) */}
                  <div className="sm:pl-4">
                    <Summary baseUSD={BASIC_BASE_USD} selected={basicSelected} title={t("forms.summary.title")} />
                  </div>

                  <DialogFooter className="sm:col-span-2">
                    <SubmitButton labelSend={t("forms.actions.submit")} labelSending={t("forms.actions.sending")} />
                  </DialogFooter>

                  {/* Vis feilmelding (enkelt) */}
                  {basicState.errors && (
                    <p className="sm:col-span-2 text-sm text-red-600">{Object.values(basicState.errors).flat().join(" ")}</p>
                  )}
                  {basicState.success && <p className="sm:col-span-2 text-sm">{basicState.message}</p>}
                </form>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>

        {/* Standard */}
        <Card className="relative group flex flex-col border-primary/50 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl">
          <Badge className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[11px] uppercase tracking-wide">
            {t("badgeMostPopular")}
          </Badge>
          <CardHeader>
            <CardTitle>{t("plans.standard.name")}</CardTitle>
            <CardDescription>{t("plans.standard.desc")}</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="mb-2 flex items-baseline gap-2">
              <span className="text-4xl font-bold sm:text-5xl">{formatPrice(STANDARD_BASE_USD)}</span>
            </div>
            {standardTotalUSD > STANDARD_BASE_USD && (
              <div className="mb-6 text-sm text-muted-foreground">
                {t("estimatedTotal", { amount: formatPrice(standardTotalUSD) })}
              </div>
            )}
            <ul className="space-y-3">
              {standardFeatures.map((f) => (<Feature key={f}>{f}</Feature>))}
            </ul>
          </CardContent>
          <CardFooter className="mt-auto">
            <Dialog open={openStandard} onOpenChange={setOpenStandard}>
              <DialogTrigger asChild>
                <Button className="w-full" size="lg">{t("cta.getStarted")}</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-3xl">
                <DialogHeader>
                  <DialogTitle>{t("dialogs.standard.title")}</DialogTitle>
                  <DialogDescription>{t("dialogs.standard.desc")}</DialogDescription>
                </DialogHeader>

                <form action={standardAction} className="grid gap-5 sm:grid-cols-2">
                  {/* Hidden shared fields */}
                  <input type="hidden" name="plan" value="standard" />
                  <input type="hidden" name="currency" value={currency} />
                  <input type="hidden" name="conversionRate" value={String(conversionRate)} />
                  <input type="hidden" name="locale" value={locale} />
                  <input type="hidden" name="included" value={stdIncluded} />
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" />

                  {/* Left */}
                  <div className="grid gap-5">
                    <fieldset className="grid gap-3">
                      <legend className="text-sm font-medium">{t("forms.standard.included.title")}</legend>
                      <RadioGroup
                        value={stdIncluded}
                        onValueChange={(v) => setStdIncluded(v as "booking" | "ecommerce")}
                        className="grid gap-2"
                      >
                        <label htmlFor="std-booking" className="flex items-center gap-3">
                          <RadioGroupItem id="std-booking" value="booking" />
                          <span className="text-sm">{t("forms.standard.included.booking")}</span>
                        </label>
                        <label htmlFor="std-ecom" className="flex items-center gap-3">
                          <RadioGroupItem id="std-ecom" value="ecommerce" />
                          <span className="text-sm">{t("forms.standard.included.ecommerce")}</span>
                        </label>
                      </RadioGroup>
                    </fieldset>

                    <fieldset className="grid gap-3">
                      <legend className="text-sm font-medium">{t("forms.labels.addons")}</legend>
                      <div className="grid gap-2">
                        {ADDONS.map((a) => (
                          <AddonRow key={`std-${a.id}`} plan="standard" a={a} checked={standardSelected.has(a.value)} />
                        ))}
                      </div>
                    </fieldset>

                    <div className="grid gap-2">
                      <Label htmlFor="std-project">{t("forms.labels.project")}</Label>
                      <Textarea id="std-project" name="project" placeholder={t("forms.placeholders.project")} required rows={5} />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="std-email">{t("forms.labels.email")}</Label>
                      <Input id="std-email" name="email" type="email" placeholder="you@company.com" required />
                    </div>
                  </div>

                  {/* Right: summary */}
                  <div className="sm:pl-4">
                    <Summary baseUSD={STANDARD_BASE_USD} selected={standardSelected} title={t("forms.summary.title")} />
                  </div>

                  <DialogFooter className="sm:col-span-2">
                    <SubmitButton labelSend={t("forms.actions.submit")} labelSending={t("forms.actions.sending")} />
                  </DialogFooter>

                  {standardState.errors && (
                    <p className="sm:col-span-2 text-sm text-red-600">{Object.values(standardState.errors).flat().join(" ")}</p>
                  )}
                  {standardState.success && <p className="sm:col-span-2 text-sm">{standardState.message}</p>}
                </form>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>

        {/* Premium (no price) */}
        <Card className="group flex flex-col transition-all hover:-translate-y-1 hover:shadow-lg">
          <CardHeader>
            <CardTitle>{t("plans.premium.name")}</CardTitle>
            <CardDescription>{t("plans.premium.desc")}</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="space-y-3">
              {premiumFeatures.map((f) => (<Feature key={f}>{f}</Feature>))}
            </ul>
          </CardContent>
          <CardFooter className="mt-auto">
            <Dialog open={openPremium} onOpenChange={setOpenPremium}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full" size="lg">{t("cta.contactSales")}</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>{t("dialogs.premium.title")}</DialogTitle>
                  <DialogDescription>{t("dialogs.premium.desc")}</DialogDescription>
                </DialogHeader>

                <form action={premiumAction} className="grid gap-5">
                  <input type="hidden" name="plan" value="premium" />
                  <input type="hidden" name="currency" value={currency} />
                  <input type="hidden" name="conversionRate" value={String(conversionRate)} />
                  <input type="hidden" name="locale" value={locale} />
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" />

                  <div className="grid gap-2">
                    <Label htmlFor="prem-project">{t("forms.labels.project")}</Label>
                    <Textarea id="prem-project" name="project" placeholder={t("forms.placeholders.project")} required rows={6} />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="prem-email">{t("forms.labels.email")}</Label>
                    <Input id="prem-email" name="email" type="email" placeholder="you@company.com" required />
                  </div>

                  <DialogFooter>
                    <SubmitButton labelSend={t("forms.actions.submit")} labelSending={t("forms.actions.sending")} />
                  </DialogFooter>

                  {premiumState.errors && (
                    <p className="text-sm text-red-600">{Object.values(premiumState.errors).flat().join(" ")}</p>
                  )}
                  {premiumState.success && <p className="text-sm">{premiumState.message}</p>}
                </form>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
