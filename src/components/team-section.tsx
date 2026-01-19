import { getTranslations } from "next-intl/server";
import TeamPresenceGrid from "@/components/team-presence-grid";
import type { Member } from "@/components/team/types";

// Flytt members-listen hit eller importer fra en datafil
const members: Member[] = [
  // husk å fylle discordId for de som skal ha status
];

export default async function TeamSection({ list = members }: { list?: Member[] }) {
  const t = await getTranslations("Team");

  const resolved = list.map((m) => {
    const key = m.i18nKey;
    const role = key ? t(`members.${key}.role`) : m.role;
    const bio  = key ? t(`members.${key}.bio`)  : m.bio;
    return { ...m, role, bio };
  });

  return (
    <section className="container mx-auto max-w-6xl px-4 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">{t("title")}</h2>
        <p className="mt-3 text-base text-muted-foreground">{t("subtitle")}</p>
      </div>

      <TeamPresenceGrid members={resolved} />
    </section>
  );
}
