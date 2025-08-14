import * as React from "react";

export default function AboutSection() {
  return (
    <section className="container mx-auto max-w-6xl px-4">
      {/* Mission + Metrics */}
      <div className="relative grid gap-10 py-16 md:grid-cols-2 md:gap-14 md:py-24">
        {/* Left: Mission copy */}
        <div>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Our mission</h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Syntax Studio hand-codes fast, accessible websites and apps—no templates, no bloat.
            We join your team to design, build, and ship products that feel simple and perform
            brilliantly.
          </p>
          <p className="mt-6 text-base leading-7 text-muted-foreground">
            We combine engineering rigor with clean design. Expect clear communication, short
            feedback loops, and launches that move the needle for your business.
          </p>
        </div>

        {/* Right: Metrics */}
        <div className="relative">
          {/* Subtle grid background with radial fade */}
          <div
            aria-hidden
            className="
              pointer-events-none absolute inset-0 -z-10
              bg-[linear-gradient(to_right,hsl(var(--border))/50_1px,transparent_1px),
                  linear-gradient(to_bottom,hsl(var(--border))/50_1px,transparent_1px)]
              bg-[size:22px_22px]
              [mask-image:radial-gradient(360px_360px_at_85%_20%,black,transparent)]
              opacity-60
            "
          />
          <ul className="space-y-12">
            <li>
              <div className="text-5xl font-semibold tracking-tight">90+</div>
              <div className="mt-2 text-sm text-muted-foreground">
                Average Lighthouse scores (Performance/SEO/Best Practices)
              </div>
            </li>
            <li>
              <div className="text-5xl font-semibold tracking-tight">Under 24h</div>
              <div className="mt-2 text-sm text-muted-foreground">Typical weekday response time</div>
            </li>
            <li>
              <div className="text-5xl font-semibold tracking-tight">2–4 weeks</div>
              <div className="mt-2 text-sm text-muted-foreground">
                From kickoff to first live version (standard site)
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Values */}
      <div className="py-12 md:py-20">
        <div className="grid items-start gap-10 md:grid-cols-3">
          {/* Left column: title + subtitle — aligned with grid */}
          <div>
            <h3 className="text-4xl font-bold tracking-tight sm:text-5xl">Our values</h3>
            <p className="mt-4 text-lg text-muted-foreground">
              Principles that shape every project at Syntax Studio.
            </p>
          </div>

          {/* Right columns: value items */}
          <div className="md:col-span-2">
            <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
              <div>
                <h4 className="text-base font-semibold">Build with craft</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  We hand-code for speed, accessibility, and maintainability. Clean code, clean UI.
                </p>
              </div>
              <div>
                <h4 className="text-base font-semibold">Share openly</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  Transparent roadmaps, regular demos, and async updates keep everyone aligned.
                </p>
              </div>
              <div>
                <h4 className="text-base font-semibold">Learn fast</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  Short feedback loops and quick iterations—ship, measure, improve.
                </p>
              </div>
              <div>
                <h4 className="text-base font-semibold">Partner mindset</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  We act like an in-house team, aligning design and engineering with your goals.
                </p>
              </div>
              <div>
                <h4 className="text-base font-semibold">Ownership</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  We stand by what we ship—reliable releases and clear accountability.
                </p>
              </div>
              <div>
                <h4 className="text-base font-semibold">Keep it simple</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  Clarity over complexity. The simplest solution that solves the real problem wins.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
