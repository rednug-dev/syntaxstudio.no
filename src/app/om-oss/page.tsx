
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function OmOssPage() {
    const teamMembers = [
        {
            name: "Gunder Rollufson",
            role: "Grunnlegger & Utvikler",
            bio: "Gunder er grunnleggeren av byrået. Som elektroingeniørstudent har han en fot i både den tekniske og den strategiske verden. Han brenner for å finne smarte løsninger der teknologi og forretning møtes, og er involvert i alle ledd av prosjektene.",
            avatar: "/avatars/placeholder.svg"
        },
        {
            name: "Rasul Uzdijev",
            role: "Partner & Utvikler",
            bio: "Rasul er dataingeniørstudent og en kjernekomponent i teamet. Sammen med Gunder jobber han for å omsette ideer til robust og effektiv kode, og er dypt involvert i både den tekniske arkitekturen og den strategiske retningen.",
            avatar: "/avatars/placeholder.svg"
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
                            Vi er strateger, utviklere og designere som elsker å skape fete digitale opplevelser.
                        </p>
                    </div>

                    <div className="bg-muted rounded-lg p-12 mb-20">
                        <h2 className="text-3xl font-bold font-headline mb-4 text-center">Vårt Løfte</h2>
                        <p className="text-xl text-center max-w-4xl mx-auto text-muted-foreground">
                            Vi hjelper bedrifter å vinne digitalt. Med teknologi og design gjør vi ideer til virkelighet. Vi bygger partnerskap på tillit, åpenhet og felles suksess.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-3xl sm:text-4xl font-bold font-headline text-center mb-12">Møt Teamet</h2>
                        <div className="grid md:grid-cols-2 gap-12">
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
