
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function OmOssPage() {
    const teamMembers = [
        {
            name: "Navn Navnesen",
            role: "Daglig Leder & Grunnlegger",
            bio: "Med en brennende lidenskap for teknologi og innovasjon, startet Navn dette byrået for å hjelpe bedrifter med å realisere sitt digitale potensial. Han er ekspert på strategi og forretningsutvikling.",
            avatar: "/avatars/03.png"
        },
        {
            name: "Et Annet Navn",
            role: "Leder for Utvikling",
            bio: "En mester i koding og systemarkitektur. Et Annet Navn leder vårt tekniske team og sørger for at vi alltid leverer robuste og skalerbare løsninger av høyeste kvalitet.",
            avatar: "/avatars/04.png"
        },
        {
            name: "Tredje Medlem",
            role: "Kreativ Leder",
            bio: "Hjernen bak våre prisvinnende design. Tredje Medlem kombinerer kunstnerisk teft med en dyp forståelse for brukeropplevelser for å skape visuelt slående og intuitive grensesnitt.",
            avatar: "/avatars/05.png"
        }
    ];

    return (
        <>
            <Header />
            <main>
                <div className="container mx-auto px-4 py-20 sm:py-28">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl sm:text-5xl font-bold font-headline">Om Oss</h1>
                        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                            Vi er et team av lidenskapelige strateger, utviklere og designere som brenner for å skape fantastiske digitale opplevelser.
                        </p>
                    </div>

                    <div className="bg-muted rounded-lg p-12 mb-20">
                        <h2 className="text-3xl font-bold font-headline mb-4 text-center">Vår Misjon</h2>
                        <p className="text-xl text-center max-w-4xl mx-auto text-muted-foreground">
                            Vår misjon er å gi bedrifter av alle størrelser muligheten til å lykkes i den digitale verden. Vi tror på kraften av teknologi og design for å transformere ideer til virkelighet, og vi er dedikert til å bygge langsiktige partnerskap med våre kunder basert på tillit, åpenhet og felles suksess.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-3xl sm:text-4xl font-bold font-headline text-center mb-12">Møt Teamet</h2>
                        <div className="grid md:grid-cols-3 gap-12">
                            {teamMembers.map((member, index) => (
                                <div key={index} className="text-center">
                                    <Avatar className="w-32 h-32 mx-auto mb-4">
                                        <AvatarImage src={member.avatar} alt={member.name} />
                                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <h3 className="text-xl font-bold font-headline">{member.name}</h3>
                                    <p className="text-primary font-semibold mb-2">{member.role}</p>
                                    <p className="text-muted-foreground">{member.bio}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
