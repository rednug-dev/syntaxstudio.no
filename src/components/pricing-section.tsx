'use client';

import * as React from "react";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";

import {
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
} from "@/components/ui/card";
  import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Loader2 } from "lucide-react";

import {
  Dialog, DialogTrigger, DialogContent, DialogHeader,
  DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

import { handlePricingOrder, type FormState } from "@/actions";

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

function SubmitButton({
  labelSend,
  labelSending,
}: {
  labelSend: string;
  labelSending: string;
}) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {labelSending}
        </>
      ) : (
        labelSend
      )}
    </Button>
  );
}

export default function Pricing() {
  const t = useTranslations("Pricing");
  const locale = useLocale();

  // Dialog open
  const [openKickstart, setOpenKickstart] = React.useState(false);
  const [openGrowth, setOpenGrowth] = React.useState(false);
  const [openScale, setOpenScale] = React.useState(false);

  // Server action state (en per dialog)
  const initialState: FormState = { message: "", errors: null, success: false };
  const [kickstartState, kickstartAction] = useActionState(handlePricingOrder, initialState);
  const [growthState, growthAction] = useActionState(handlePricingOrder, initialState);
  const [scaleState, scaleAction] = useActionState(handlePricingOrder, initialState);

  // Close dialog on success
  useEffect(() => { if (kickstartState.success) setOpenKickstart(false); }, [kickstartState.success]);
  useEffect(() => { if (growthState.success) setOpenGrowth(false); }, [growthState.success]);
  useEffect(() => { if (scaleState.success) setOpenScale(false); }, [scaleState.success]);

  // Helper for rich paragraphs + strong
  const richCost = (key: string) =>
    t.rich(key, {
      p: (chunks) => <p className="mt-2 first:mt-0">{chunks}</p>,
      strong: (chunks) => <span className="font-medium text-foreground">{chunks}</span>
    });

  return (
    <section className="container mx-auto max-w-6xl px-8 py-16 overflow-x-hidden">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {t("title")}
        </h2>
        <p className="mt-3 text-base text-muted-foreground">
          {t("subtitle")}
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3 items-start">
        <Card className="group flex flex-col transition-all hover:-translate-y-1 hover:shadow-lg md:min-h-[580px]">
          <CardHeader>
            <CardTitle>{t("plans.kickstart.name")}</CardTitle>
            <div className="text-2xl font-bold text-foreground mt-1">{t("plans.kickstart.price")}</div>
            <CardDescription>{t("plans.kickstart.desc")}</CardDescription>
          </CardHeader>
          <CardContent className="pt-0 flex-1 flex flex-col">
            <ul className="space-y-3 flex-1">
              {(t.raw("plans.kickstart.features") as string[]).map((f) => (
                <Feature key={f}>{f}</Feature>
              ))}
            </ul>

            <Accordion type="single" collapsible className="mt-6">
              <AccordionItem value="cost">
                <AccordionTrigger>{t("faq.cost.question")}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  {richCost("plans.kickstart.costHint")}
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="mt-4">
              <Dialog open={openKickstart} onOpenChange={setOpenKickstart}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full" size="lg">{t("cta.contactSales")}</Button>
                </DialogTrigger>
                <DialogContent className="w-[95vw] sm:max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>{t("dialogs.kickstart.title")}</DialogTitle>
                    <DialogDescription>{t("dialogs.kickstart.desc")}</DialogDescription>
                </DialogHeader>

                <form action={kickstartAction} className="grid gap-5 sm:grid-cols-2">
                  <input type="hidden" name="plan" value="custom" />
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" />

                  {/* Left */}
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="kick-project" className="text-sm font-medium">
                        {t("forms.labels.project")}
                      </Label>
                      <Textarea id="kick-project" name="project" placeholder={t("forms.placeholders.custom")} required rows={6} />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="kick-email" className="text-sm font-medium">
                        {t("forms.labels.email")}
                      </Label>
                      <Input id="kick-email" name="email" type="email" placeholder="you@company.com" required />
                    </div>
                  </div>

                  {/* Right */}
                  <div className="sm:pl-4">
                    <div className="mb-2 text-sm font-medium">{t("forms.summary.title")}</div>
                    <div className="rounded-lg border p-4 text-sm">
                      <p className="text-muted-foreground">{t("forms.summary.custom")}</p>
                    </div>
                  </div>

                  <DialogFooter className="sm:col-span-2">
                    <SubmitButton labelSend={t("forms.actions.submit")} labelSending={t("forms.actions.sending")} />
                  </DialogFooter>

                  {kickstartState.errors && (
                    <p className="sm:col-span-2 text-sm text-red-600">
                      {Object.values(kickstartState.errors).flat().join(" ")}
                    </p>
                  )}
                  {kickstartState.success && (
                    <p className="sm:col-span-2 text-sm">{kickstartState.message}</p>
                  )}
                </form>
              </DialogContent>
            </Dialog>
            </div>
          </CardContent>        </Card>

        {/* Tier 2 – Kickstart (Most Popular) */}
        <Card className="relative group flex flex-col border-primary/50 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl md:scale-105 md:-my-4 z-10 md:min-h-[550px]">
          <Badge className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[11px] uppercase tracking-wide">
            {t("badgeMostPopular")}
          </Badge>
          <Image
            src={locale === "no" ? "/campaign-sticker-no.png" : "/campaign-sticker-en.png"}
            alt={t("badgeCampaign")}
            width={80}
            height={80}
            className="absolute -top-6 -right-6 rotate-12 drop-shadow-lg z-20"
          />
          <CardHeader>
            <CardTitle>{t("plans.growth.name")}</CardTitle>
            <div className="text-2xl font-bold text-foreground mt-1">{t("plans.growth.price")}</div>
            <CardDescription>{t("plans.growth.desc")}</CardDescription>
          </CardHeader>
          <CardContent className="pt-0 flex-1 flex flex-col">
            <ul className="space-y-3 flex-1">
              {(t.raw("plans.growth.features") as string[]).map((f) => (
                <Feature key={f}>{f}</Feature>
              ))}
            </ul>

            <Accordion type="single" collapsible className="mt-6">
              <AccordionItem value="cost">
                <AccordionTrigger>{t("faq.cost.question")}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  {richCost("plans.growth.costHint")}
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="mt-4">
              <Dialog open={openGrowth} onOpenChange={setOpenGrowth}>
                <DialogTrigger asChild>
                  <Button className="w-full" size="lg">{t("cta.getStarted")}</Button>
                </DialogTrigger>
                <DialogContent className="w-[95vw] sm:max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>{t("dialogs.growth.title")}</DialogTitle>
                    <DialogDescription>{t("dialogs.growth.desc")}</DialogDescription>
                  </DialogHeader>

                  <form action={growthAction} className="grid gap-5 sm:grid-cols-2">
                    <input type="hidden" name="plan" value="kickstart" />
                    <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" />

                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="growth-project" className="text-sm font-medium">
                          {t("forms.labels.project")}
                        </Label>
                        <Textarea id="growth-project" name="project" placeholder={t("forms.placeholders.kickstart")} required rows={6} />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="growth-email" className="text-sm font-medium">
                          {t("forms.labels.email")}
                        </Label>
                        <Input id="growth-email" name="email" type="email" placeholder="you@company.com" required />
                      </div>
                    </div>

                    <div className="sm:pl-4">
                      <div className="mb-2 text-sm font-medium">{t("forms.summary.title")}</div>
                      <div className="rounded-lg border p-4 text-sm">
                        <p className="text-muted-foreground">{t("forms.summary.kickstart")}</p>
                      </div>
                    </div>

                    <DialogFooter className="sm:col-span-2">
                      <SubmitButton labelSend={t("forms.actions.submit")} labelSending={t("forms.actions.sending")} />
                    </DialogFooter>

                    {growthState.errors && (
                      <p className="sm:col-span-2 text-sm text-red-600">
                        {Object.values(growthState.errors).flat().join(" ")}
                      </p>
                    )}
                    {growthState.success && (
                      <p className="sm:col-span-2 text-sm">{growthState.message}</p>
                    )}
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Tier 3 – Business Package */}
        <Card className="group flex flex-col transition-all hover:-translate-y-1 hover:shadow-lg md:min-h-[580px]">
          <CardHeader>
            <CardTitle>{t("plans.scale.name")}</CardTitle>
            <div className="text-2xl font-bold text-foreground mt-1">{t("plans.scale.price")}</div>
            <CardDescription>{t("plans.scale.desc")}</CardDescription>
          </CardHeader>
          <CardContent className="pt-0 flex-1 flex flex-col">
            <ul className="space-y-3 flex-1">
              {(t.raw("plans.scale.features") as string[]).map((f) => (
                <Feature key={f}>{f}</Feature>
              ))}
            </ul>

            <Accordion type="single" collapsible className="mt-6">
              <AccordionItem value="cost">
                <AccordionTrigger>{t("faq.cost.question")}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  {richCost("plans.scale.costHint")}
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="mt-4">
              <Dialog open={openScale} onOpenChange={setOpenScale}>
                <DialogTrigger asChild>
                  <Button className="w-full" size="lg">
                    {t("cta.contactSales")}
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[95vw] sm:max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>{t("dialogs.scale.title")}</DialogTitle>
                    <DialogDescription>{t("dialogs.scale.desc")}</DialogDescription>
                  </DialogHeader>

                  <form action={scaleAction} className="grid gap-5 sm:grid-cols-2">
                    <input type="hidden" name="plan" value="business" />
                    <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" />

                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="scale-project" className="text-sm font-medium">
                          {t("forms.labels.project")}
                        </Label>
                        <Textarea id="scale-project" name="project" placeholder={t("forms.placeholders.business")} required rows={6} />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="scale-email" className="text-sm font-medium">
                          {t("forms.labels.email")}
                        </Label>
                        <Input id="scale-email" name="email" type="email" placeholder="you@company.com" required />
                      </div>
                    </div>

                    <div className="sm:pl-4">
                      <div className="mb-2 text-sm font-medium">{t("forms.summary.title")}</div>
                      <div className="rounded-lg border p-4 text-sm">
                        <p className="text-muted-foreground">{t("forms.summary.business")}</p>
                      </div>
                    </div>

                    <DialogFooter className="sm:col-span-2">
                      <SubmitButton labelSend={t("forms.actions.submit")} labelSending={t("forms.actions.sending")} />
                    </DialogFooter>

                    {scaleState.errors && (
                      <p className="sm:col-span-2 text-sm text-red-600">
                        {Object.values(scaleState.errors).flat().join(" ")}
                      </p>
                    )}
                    {scaleState.success && (
                      <p className="sm:col-span-2 text-sm">{scaleState.message}</p>
                    )}
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
