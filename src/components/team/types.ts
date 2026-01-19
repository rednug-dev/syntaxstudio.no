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
    /** Discord user ID for presence */
    discordId?: string;
  };
  