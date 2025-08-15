import * as React from "react";
import {
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Twitter, Github, Linkedin, Mail, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";

export type Member = {
  /** Use this to look up translations: Team.members.[i18nKey].role / .bio */
  i18nKey?: string;
  name: string;
  role: string;
  bio: string;
  skills: string[];
  email?: string;
  phone?: string;
  avatarSrc?: string;
  socials?: Partial<{ twitter: string; github: string; linkedin: string }>;
};

const members: Member[] = [];

function Skill({ children }: { children: React.ReactNode }) {
  return (
    <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs font-medium">
      {children}
    </Badge>
  );
}

function Socials({ socials }: { socials?: Member["socials"] }) {
  if (!socials) return null;
  return (
    <div className="flex items-center justify-center gap-3 text-muted-foreground">
      {socials.twitter && (
        <Button asChild variant="ghost" size="icon" className="h-8 w-8" aria-label="Twitter">
          <a href={socials.twitter} target="_blank" rel="noreferrer noopener">
            <Twitter className="h-4 w-4" />
          </a>
        </Button>
      )}
      {socials.github && (
        <Button asChild variant="ghost" size="icon" className="h-8 w-8" aria-label="GitHub">
          <a href={socials.github} target="_blank" rel="noreferrer noopener">
            <Github className="h-4 w-4" />
          </a>
        </Button>
      )}
      {socials.linkedin && (
        <Button asChild variant="ghost" size="icon" className="h-8 w-8" aria-label="LinkedIn">
          <a href={socials.linkedin} target="_blank" rel="noreferrer noopener">
            <Linkedin className="h-4 w-4" />
          </a>
        </Button>
      )}
    </div>
  );
}

function MemberCard({ m }: { m: Member }) {
  return (
    <Card className="group mx-auto w-full max-w-md flex flex-col items-center transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <CardHeader className="items-center">
        <div className="relative">
          <div className="absolute inset-0 -z-10 rounded-full bg-muted/60 p-3" />
          <div className="rounded-full ring-8 ring-background">
            <Avatar className="h-28 w-28 ring-4 ring-muted">
              <AvatarImage src={m.avatarSrc} alt={m.name} />
              <AvatarFallback>{m.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0 text-center">
        <CardTitle className="text-xl font-semibold">{m.name}</CardTitle>
        <CardDescription className="mt-1">{m.role}</CardDescription>
        <p className="mt-3 text-sm text-muted-foreground">{m.bio}</p>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {m.skills.map((s) => (
            <Skill key={s}>{s}</Skill>
          ))}
        </div>
      </CardContent>
      <CardFooter className="w-full flex-col items-center gap-3 pb-6">
        {(m.email || m.phone) && (
          <div className="flex flex-col items-center gap-1 text-sm">
            {m.email && (
              <a href={`mailto:${m.email}`} className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <Mail className="h-4 w-4" />
                {m.email}
              </a>
            )}
            {m.phone && (
              <a href={`tel:${m.phone}`} className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <Phone className="h-4 w-4" />
                {m.phone}
              </a>
            )}
          </div>
        )}
        <Socials socials={m.socials} />
      </CardFooter>
    </Card>
  );
}

export default async function TeamSection({ list = members }: { list?: Member[] }) {
  const t = await getTranslations("Team");

  // Resolve localized role/bio when i18nKey is provided. Falls back to member strings.
  const resolved = list.map((m) => {
    const key = m.i18nKey;
    const role = key ? t(`members.${key}.role`) : m.role;
    const bio = key ? t(`members.${key}.bio`) : m.bio;
    return { ...m, role, bio };
  });

  return (
    <section className="container mx-auto max-w-6xl px-4 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">{t("title")}</h2>
        <p className="mt-3 text-base text-muted-foreground">{t("subtitle")}</p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 justify-items-center">
        {resolved.map((m) => (
          <MemberCard key={m.name} m={m} />
        ))}
      </div>
    </section>
  );
}