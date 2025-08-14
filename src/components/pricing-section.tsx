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

export default function Pricing() {
  return (
    <section className="container mx-auto max-w-6xl px-4 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Simple, transparent pricing</h2>
        <p className="mt-3 text-base text-muted-foreground">
          Choose the plan that works best for you and your team.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {/* Basic */}
        <Card className="group flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
          <CardHeader>
            <CardTitle>Basic</CardTitle>
            <CardDescription>Custom‑coded starter site for portfolios or landing pages</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="mb-6 flex items-baseline gap-2">
              <span className="text-4xl font-bold sm:text-5xl">$300</span>
            </div>
            <ul className="space-y-3">
              <Feature>Up to 3 pages</Feature>
              <Feature>100% custom‑coded (Next.js + Tailwind)</Feature>
              <Feature>Responsive & fast</Feature>
              <Feature>Contact form + basic SEO</Feature>
              <Feature>1 integration (e.g., analytics)</Feature>
              <Feature>1 revision round</Feature>
            </ul>
          </CardContent>
          <CardFooter className="mt-auto">
            <Button className="w-full" size="lg">Get Started</Button>
          </CardFooter>
        </Card>

        {/* Pro (Most Popular) */}
        <Card className="relative group flex flex-col border-primary/50 shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
          <Badge className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[11px] uppercase tracking-wide">
            Most Popular
          </Badge>
          <CardHeader>
            <CardTitle>Standard</CardTitle>
            <CardDescription>Business website with booking or a simple store</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="mb-6 flex items-baseline gap-2">
              <span className="text-4xl font-bold sm:text-5xl">$500</span>
            </div>
            <ul className="space-y-3">
              <Feature>Up to 6 pages</Feature>
              <Feature>Custom‑coded (no templates)</Feature>
              <Feature>Booking <span className="hidden sm:inline">or</span> basic e‑commerce (≤10 products)</Feature>
              <Feature>Secure payments integration</Feature>
              <Feature>Performance & on‑page SEO</Feature>
              <Feature>2 integrations (forms, analytics, etc.)</Feature>
              <Feature>2 revision rounds</Feature>
              <Feature>Priority support</Feature>
            </ul>
          </CardContent>
          <CardFooter className="mt-auto">
            <Button className="w-full" size="lg">Get Started</Button>
          </CardFooter>
        </Card>

        {/* Team */}
        <Card className="group flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
          <CardHeader>
            <CardTitle>Premium</CardTitle>
            <CardDescription>Advanced e‑commerce & pro‑grade booking</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="mb-6 flex items-baseline gap-2">
              <span className="text-4xl font-bold sm:text-5xl">$800</span>
            </div>
            <ul className="space-y-3">
              <Feature>Up to 10 pages</Feature>
              <Feature>Full e‑commerce + real‑time booking</Feature>
              <Feature>Secure checkout + taxes/shipping setup</Feature>
              <Feature>CMS for content & products</Feature>
              <Feature>Custom integrations & automations</Feature>
              <Feature>Launch support & training</Feature>
              <Feature>5 revision rounds</Feature>
              <Feature>Priority support</Feature>
            </ul>
          </CardContent>
          <CardFooter className="mt-auto">
            <Button variant="outline" className="w-full" size="lg">
              Contact Sales
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
