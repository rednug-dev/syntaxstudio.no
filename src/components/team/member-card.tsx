"use client";

import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, Twitter, Github, Linkedin } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import type { Member } from "./types";
import { useTranslations } from "next-intl";

function Skill({ children }: { children: React.ReactNode }) {
  return (
    <Badge
      variant="secondary"
      className="rounded-full px-3 py-1 text-xs font-medium"
    >
      {children}
    </Badge>
  );
}

function Socials({ socials }: { socials?: Member["socials"] }) {
  if (!socials) return null;
  return (
    <div className="flex items-center justify-center gap-3 text-muted-foreground">
      {socials.twitter && (
        <Button
          asChild
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          aria-label="Twitter"
        >
          <a href={socials.twitter} target="_blank" rel="noreferrer noopener">
            <Twitter className="h-4 w-4" />
          </a>
        </Button>
      )}
      {socials.github && (
        <Button
          asChild
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          aria-label="GitHub"
        >
          <a href={socials.github} target="_blank" rel="noreferrer noopener">
            <Github className="h-4 w-4" />
          </a>
        </Button>
      )}
      {socials.linkedin && (
        <Button
          asChild
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          aria-label="LinkedIn"
        >
          <a href={socials.linkedin} target="_blank" rel="noreferrer noopener">
            <Linkedin className="h-4 w-4" />
          </a>
        </Button>
      )}
    </div>
  );
}

export default function MemberCard({
  m,
  status,
  activity
}: {
  m: Member;
  status?: "online" | "idle" | "dnd" | "offline" | "unknown";
  activity?: string;
}) {
  const t = useTranslations("Team.status");
  const s = status ?? "unknown";

  const statusColor: Record<string, string> = {
    online: "bg-green-500",
    idle: "bg-amber-400",
    dnd: "bg-red-500",
    offline: "bg-zinc-400",
    unknown: "bg-zinc-400"
  };

  const [isHovered, setIsHovered] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);

  const isMobile = React.useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches,
    []
  );

  const handleActivate = () => {
    if (isMobile) {
      setIsActive(true);
      window.setTimeout(() => setIsActive(false), 1500); // 1,5 sek
    }
  };

  const active = isHovered || isActive;

  return (
    <TooltipProvider>
      <Tooltip open={active}>
        <TooltipTrigger asChild>
          <Card
            onClick={handleActivate}
            onMouseEnter={() => !isMobile && setIsHovered(true)}
            onMouseLeave={() => !isMobile && setIsHovered(false)}
            className="group w-full h-full flex flex-col items-center transition-all duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
          >
            <CardHeader className="items-center">
              <div className="relative">
                <div className="absolute inset-0 -z-10 rounded-full bg-muted/60 p-3" />
                <div className="relative rounded-full ring-8 ring-background">
                  <Avatar className="h-28 w-28 ring-4 ring-muted">
                    <AvatarImage src={m.avatarSrc} alt={m.name} />
                    <AvatarFallback>
                      {m.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <motion.span
                    className={`absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full ring-2 ring-background ${statusColor[s]}`}
                    animate={
                      active
                        ? { scale: 1.3, boxShadow: "0 0 6px rgba(0,0,0,0.15)" }
                        : { scale: 1, boxShadow: "0 0 0px rgba(0,0,0,0)" }
                    }
                    transition={{ type: "spring", stiffness: 300, damping: 16 }}
                  />
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0 text-center">
              <CardTitle className="text-xl font-semibold">{m.name}</CardTitle>
              <CardDescription className="mt-1">{m.role}</CardDescription>
              <p className="mt-3 text-sm text-muted-foreground">{m.bio}</p>
              {activity && (
                <p className="mt-2 text-xs text-muted-foreground">{activity}</p>
              )}
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
                    <a
                      href={`mailto:${m.email}`}
                      className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
                    >
                      <Mail className="h-4 w-4" />
                      {m.email}
                    </a>
                  )}
                  {m.phone && (
                    <a
                      href={`tel:${m.phone}`}
                      className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
                    >
                      <Phone className="h-4 w-4" />
                      {m.phone}
                    </a>
                  )}
                </div>
              )}
              <Socials socials={m.socials} />
            </CardFooter>
          </Card>
        </TooltipTrigger>

        <TooltipContent side="top" className="max-w-xs text-sm">
          {t(s)}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
