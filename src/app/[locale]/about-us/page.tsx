import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Header from "@/components/header";
import Footer from "@/components/footer";
import TeamSection from "@/components/team-section";
import AboutSection from "@/components/about-section";
import { Member } from "@/components/team/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta.about" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/about-us`,
      languages: { en: "/en/about-us", no: "/no/about-us", "x-default": "/en/about-us" },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `/${locale}/about-us`,
    },
  };
}

export default function AboutUsPage() {
  const teamMembers: Member[] = [
    {
      i18nKey: "gunder",
      name: "Gunder Rollufson",
      role: "Founder & CEO", // fallback
      bio: "Founder bridging strategy and engineering; hands-on across every build.", // fallback
      avatarSrc: "/portraits/gunder.webp",
      avatarPosition: "center 30%",
      skills: ["React", "Next.js", "Node.js", "Strategy"],
      email: "gunder@syntaxstudio.no",
      phone: "+47 9444 3355",
      socials: undefined,
      discordId: "795681296658989056"
    },
    {
      i18nKey: "rasul",
      name: "Rasul Uzdijev",
      role: "Partner & Chief Architect",
      bio: "Partner who turns ideas into robust, scalable systems.",
      avatarSrc: "/portraits/rasul.webp",
      avatarPosition: "center 2%",
      avatarTransform: "scale(1.15) translate(6%, 2%)",
      skills: ["Python", "AI", "Systems Architecture", "Database"],
      email: "rasul@syntaxstudio.no",
      phone: "+47 4639 6797",
      socials: undefined,
      discordId: "414385859845160970"
    },
    {
      i18nKey: "khamzat",
      name: "Khamzat Dudaev",
      role: "Partner & CMO",
      bio: "Partner who captures moments and creates content that engages.",
      avatarSrc: "/portraits/khamzat.webp",
      avatarPosition: "center 30%",
      avatarTransform: "scale(1.10) translateX(4%)",
      skills: ["Filming", "Editing", "Marketing", "Content Creation"],
      email: "khamzat@syntaxstudio.no",
      phone: "+47 4626 4815",
      socials: undefined,
      discordId: "925851067235848192"
    }
  ];

  return (
    <>
      <Header />
      <main id="main-content" className="flex flex-col">
        <AboutSection />
        <TeamSection list={teamMembers} />
      </main>
      <Footer />
    </>
  );
}
