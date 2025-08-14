import * as React from "react";
import { motion, Variants } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Check } from "lucide-react";

// ---------- Types ----------
export type Project = {
  title: string;
  domain: string;
  url?: string;
  summary: string;
  services: string[]; // high-level services
  deliverables?: string[]; // bullets
  outcomes?: string[]; // qualitative results
  image?: string; // optional cover
};

// ---------- Copy (tailored to Syntax Studio) ----------
const PROJECTS: Project[] = [
  {
    title: "Giroo",
    domain: "giroo.no",
    url: "https://giroo.no",
    summary:
      "A subscription manager built from scratch: brand, marketing site, and a full web app that helps users track recurring costs.",
    services: [
      "Branding",
      "Product Design",
      "Web App",
      "Marketing",
      "Full‑stack",
    ],
    deliverables: [
      "Name & visual identity",
      "Design system & UI kit",
      "Next.js app with auth & DB",
      "Email parsing prototype",
      "Marketing landing page",
    ],
    outcomes: [
      "Demo‑ready MVP for early testers",
      "Clear product story and positioning",
    ],
  },
  {
    title: "RiseUp",
    domain: "riseup.no",
    url: "https://riseup.no",
    summary:
      "Brand overhaul and a trustworthy website that helped the client win new partnerships.",
    services: ["Branding", "Website", "Copy", "CMS"],
    deliverables: [
      "Logo refresh & brand guidelines",
      "Messaging & copy framework",
      "Fast, accessible website (Next.js)",
      "CMS for easy updates",
    ],
    outcomes: ["Improved partner trust & conversions", "Streamlined content updates"],
  },
  {
    title: "Bites",
    domain: "bites.no",
    url: "https://bites.no",
    summary:
      "Early‑stage support for a pop‑up burger concept: brand and a festival‑ready site that made it easy to find where they’d be next.",
    services: ["Branding", "Website", "SEO", "CMS"],
    deliverables: [
      "Identity & visual system",
      "Event schedule component",
      "Mobile‑first marketing site",
      "Basic SEO & analytics",
    ],
    outcomes: ["More pop‑up bookings", "Clear visibility for event organizers"],
  },
  {
    title: "DataSec",
    domain: "datasec.no",
    url: "https://datasec.no",
    summary:
      "Custom tech products integrated into the client’s site—giving customers deeper insight and stronger security.",
    services: ["Custom Dev", "Integrations", "Website", "Dashboards"],
    deliverables: [
      "Internal tools & dashboards",
      "API integrations",
      "Website integration & UX",
    ],
    outcomes: ["Richer client reporting", "Tangible security improvements"],
  },
];

const SERVICE_FILTERS = [
  "All",
  "Branding",
  "Website",
  "Web App",
  "Marketing",
  "Integrations",
  "Custom Dev",
  "CMS",
  "SEO",
];

// ---------- Animations ----------
const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

// ---------- UI Helpers ----------
function Tag({ children }: { children: React.ReactNode }) {
  return (
    <Badge variant="secondary" className="rounded-full px-2.5 py-0.5 text-[11px]">
      {children}
    </Badge>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2 text-sm text-muted-foreground">
      <Check className="mt-0.5 h-4 w-4 shrink-0" />
      <span>{children}</span>
    </li>
  );
}

function ProjectCard({ p }: { p: Project }) {
  return (
    <motion.div variants={item} whileHover={{ y: -4 }}>
      <Card className="relative h-full rounded-2xl border bg-card/80 shadow-sm transition-shadow hover:shadow-md">
        <CardHeader>
          <div className="flex items-start justify-between gap-6">
            <div>
              <CardTitle className="text-xl">{p.title}</CardTitle>
              <CardDescription className="mt-1">
                <a
                  href={p.url ?? "#"}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 hover:underline"
                >
                  {p.domain}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </CardDescription>
            </div>
            <div className="hidden sm:flex flex-wrap justify-end gap-2">
              {p.services.slice(0, 3).map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground">{p.summary}</p>

          {p.deliverables && p.deliverables.length > 0 && (
            <div className="mt-5">
              <h5 className="text-xs font-semibold uppercase tracking-wide text-foreground/70">
                What we delivered
              </h5>
              <ul className="mt-2 space-y-1.5">
                {p.deliverables.map((d) => (
                  <Bullet key={d}>{d}</Bullet>
                ))}
              </ul>
            </div>
          )}

          {p.outcomes && p.outcomes.length > 0 && (
            <div className="mt-5">
              <h5 className="text-xs font-semibold uppercase tracking-wide text-foreground/70">
                Outcomes
              </h5>
              <ul className="mt-2 space-y-1.5">
                {p.outcomes.map((o) => (
                  <Bullet key={o}>{o}</Bullet>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
        {p.url && (
          <CardFooter>
            <Button asChild variant="outline" className="gap-2">
              <a href={p.url} target="_blank" rel="noreferrer noopener">
                View project <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
}

// ---------- Main Component ----------
export default function ProjectsShowcase({
  items = PROJECTS,
}: {
  items?: Project[];
}) {
  const [active, setActive] = React.useState<string>("All");

  const visible = React.useMemo(() => {
    if (active === "All") return items;
    return items.filter((p) => p.services.some((s) => s.toLowerCase() === active.toLowerCase()));
  }, [active, items]);

  return (
    <section className="container mx-auto max-w-6xl px-4 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          viewport={{ once: true, amount: 0.6 }}
          className="text-4xl font-bold tracking-tight sm:text-5xl"
        >
          Selected work
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          viewport={{ once: true, amount: 0.6 }}
          className="mt-3 text-base text-muted-foreground"
        >
          A few projects where we owned branding, code and outcomes.
        </motion.p>
      </div>

      {/* Filters */}
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {SERVICE_FILTERS.map((f) => (
          <Button
            key={f}
            variant={active === f ? "default" : "outline"}
            size="sm"
            onClick={() => setActive(f)}
            className="rounded-full"
          >
            {f}
          </Button>
        ))}
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {visible.map((p) => (
          <ProjectCard key={p.title} p={p} />
        ))}
      </motion.div>
    </section>
  );
}
