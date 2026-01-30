import Header from "@/components/header";
import Footer from "@/components/footer";
import PromoBanner from "@/components/promo-banner";
import TeamSection from "@/components/team-section";
import AboutSection from "@/components/about-section";
import { Member } from "@/components/team/types";

export default function AboutUsPage() {
  const teamMembers: Member[] = [
    {
      i18nKey: "gunder",
      name: "Gunder Rollufson",
      role: "Founder & CEO", // fallback
      bio: "Founder bridging strategy and engineering; hands-on across every build.", // fallback
      avatarSrc: "/avatars/placeholder.svg",
      skills: ["React", "Next.js", "Node.js", "Strategy"],
      email: "gunder@syntaxstudio.no",
      phone: "+47 9444 3355",
      socials: {},
      discordId: "795681296658989056"
    },
    {
      i18nKey: "rasul",
      name: "Rasul Uzdijev",
      role: "Partner & Chief Architect",
      bio: "Partner who turns ideas into robust, scalable systems.",
      avatarSrc: "/avatars/placeholder.svg",
      skills: ["Python", "AI", "Systems Architecture", "Database"],
      email: "rasul@syntaxstudio.no",
      phone: "+47 4639 6797",
      socials: {},
      discordId: "414385859845160970"
    },
    {
      i18nKey: "khamzat",
      name: "Khamzat Dudaev",
      role: "Partner & CMO",
      bio: "Partner who captures moments and creates content that engages.",
      avatarSrc: "/avatars/placeholder.svg",
      skills: ["Filming", "Editing", "Marketing", "Content Creation"],
      email: "khamzat@syntaxstudio.no",
      phone: "+47 4626 4815",
      socials: {}
    }
  ];

  return (
    <>
      <PromoBanner />
      <Header />
      <main className="flex flex-col">
        <AboutSection />
        <TeamSection list={teamMembers} />
      </main>
      <Footer />
    </>
  );
}
