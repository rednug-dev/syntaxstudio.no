import * as React from "react";
import {getTranslations} from "next-intl/server";

export default async function AboutSection() {
  const t = await getTranslations("About");

  return (
    <section className="container mx-auto max-w-6xl px-4">
      {/* Mission + Metrics */}
      <div className="relative grid gap-10 py-16 md:grid-cols-2 md:gap-14 md:py-24">
        {/* Left: Mission */}
        <div>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {t("missionTitle")}
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {t("missionP1")}
          </p>
          <p className="mt-6 text-base leading-7 text-muted-foreground">
            {t("missionP2")}
          </p>
        </div>

        {/* Right: Metrics (glow fjernet) */}
        <div className="relative">
          <ul className="space-y-12">
            <li>
              <div className="text-5xl font-semibold tracking-tight">
                {t("metrics.lighthouseValue")}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {t("metrics.lighthouseSubtitle")}
              </div>
            </li>
            <li>
              <div className="text-5xl font-semibold tracking-tight">
                {t("metrics.responseValue")}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {t("metrics.responseSubtitle")}
              </div>
            </li>
            <li>
              <div className="text-5xl font-semibold tracking-tight">
                {t("metrics.timeToLiveValue")}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {t("metrics.timeToLiveSubtitle")}
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Values */}
      <div className="py-12 md:py-20">
        {/* Samme grid-filosofi: venstre kolonne = heading/tekst, høyre = selve verdiene */}
        <div className="grid items-start gap-10 md:grid-cols-3">
          {/* Venstre kolonne (aligner med “Vårt oppdrag”) */}
          <div className="md:col-span-1">
            <h3 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {t("valuesTitle")}
            </h3>
            <p className="mt-4 text-lg text-muted-foreground">
              {t("valuesSubtitle")}
            </p>
          </div>

          {/* Høyre side: verdier i to kolonner */}
          <div className="md:col-span-2">
            <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
              <div>
                <h4 className="text-base font-semibold">{t("principles.craft.title")}</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t("principles.craft.desc")}
                </p>
              </div>
              <div>
                <h4 className="text-base font-semibold">{t("principles.share.title")}</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t("principles.share.desc")}
                </p>
              </div>
              <div>
                <h4 className="text-base font-semibold">{t("principles.learn.title")}</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t("principles.learn.desc")}
                </p>
              </div>
              <div>
                <h4 className="text-base font-semibold">{t("principles.partner.title")}</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t("principles.partner.desc")}
                </p>
              </div>
              <div>
                <h4 className="text-base font-semibold">{t("principles.ownership.title")}</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t("principles.ownership.desc")}
                </p>
              </div>
              <div>
                <h4 className="text-base font-semibold">{t("principles.simple.title")}</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t("principles.simple.desc")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
