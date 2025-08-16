'use client';

import { useEffect, useMemo, useState } from "react";
import MemberCard from "@/components/team/member-card"; // client-komponenten vi lagde
import type { Member } from "@/components/team/types"; // type-definisjon for medlemmer

type Presence = {
  id: string;
  username: string;
  status: "online" | "idle" | "dnd" | "offline" | "unknown";
  activities: { name: string; type: string }[];
  avatarUrl?: string;
};
type PresenceResp = { updatedAt: string; team: Presence[] };

export default function TeamPresenceGrid({ members }: { members: Member[] }) {
  const [data, setData] = useState<PresenceResp | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const r = await fetch("/api/presence-proxy", { cache: "no-store" });
        if (r.ok) setData(await r.json());
      } catch {}
    };
    load();
    const t = setInterval(load, 30000);
    return () => clearInterval(t);
  }, []);

  const presenceById = useMemo(() => {
    const map = new Map<string, Presence>();
    data?.team.forEach((p) => map.set(p.id, p));
    return map;
  }, [data]);

  return (
    <div className="mt-12 grid gap-6 md:grid-cols-2 justify-items-center">
      {members.map((m) => {
        const p = m.discordId ? presenceById.get(m.discordId) : undefined;
        return (
          <MemberCard
            key={m.name}
            m={m}
            status={p?.status}
            activity={p?.activities?.[0]?.name}
          />
        );
      })}
    </div>
  );
}
