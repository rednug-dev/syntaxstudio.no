import Header from "@/components/header";
import Footer from "@/components/footer";
import TeamSection, { Member } from "@/components/team-section";
import AboutSection from "@/components/about-section";

export default function AboutUsPage() {
  const teamMembers: Member[] = [
    {
      name: "Gunder Rollufson",
      role: "Founder & CEO",
      bio: "Founder bridging strategy and engineering; hands-on across every build.",
      avatarSrc: "/avatars/placeholder.svg",
      skills: ["React", "Next.js", "Node.js", "Strategy"],
      email: "gunder@syntaxstudio.no",
      phone: "+47 9444 3355",
      socials: {},
    },
    {
      name: "Rasul Uzdijev",
      role: "Partner & Cheif Architect",
      bio: "Partner who turns ideas into robust, scalable systems.",
      avatarSrc: "/avatars/placeholder.svg",
      skills: ["Python", "AI", "Systems Architecture", "Database"],
      email: "rasul@syntaxstudio.no",
      phone: "+47 4639 6797",
      socials: {},
    },
  ];

  return (
    <>
      <Header />
      <main className="flex flex-col">
        <AboutSection />
        <TeamSection list={teamMembers} />
      </main>
      <Footer />
    </>
  );
}
