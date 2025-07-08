import Header from "@/components/header";
import Footer from "@/components/footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function OmOssPage() {
    const teamMembers = [
        {
            name: "Gunder Rollufson",
            role: "Grunnlegger & Utvikler",
            bio: "Gunder er grunnleggeren av byrået. Som elektroingeniørstudent har han en fot i både den tekniske og den strategiske verden. Han brenner for å finne smarte løsninger der teknologi og forretning møtes, og er involvert i alle ledd av prosjektene.",
            avatar: "/avatars/placeholder.svg",
        },
        {
            name: "Rasul Uzdijev",
            role: "Partner & Utvikler",
            bio: "Rasul er dataingeniørstudent og en kjernekomponent i teamet. Sammen med Gunder jobber han for å omsette ideer til robust og effektiv kode, og er dypt involvert i både den tekniske arkitekturen og den strategiske retningen.",
            avatar: "/avatars/placeholder.svg",
        }
    ];

    const values = [
      {
        title: "Partnerskap",
        description: "Vi er din strategiske partner. Vi forstår dine mål og leverer løsninger som gir varig verdi for din bedrift, ikke bare som en leverandør, men som en del av teamet ditt."
      },
      {
        title: "Kvalitet",
        description: "Vi bygger pålitelige, effektive og skalerbare løsninger. Dette betyr at koden vår er ren, yter optimalt, og er enkel å vedlikeholde for fremtidig vekst."
      },
      {
        title: "Teknologi",
        description: "Vi holder oss oppdatert på den nyeste teknologien, inkludert AI, for å sikre at du alltid har et konkurransefortrinn i den digitale verden."
      }
    ]

    return (
        <>
            <Header />
            <main className="flex flex-col">
                {/* Hero Seksjon */}
                <section className="bg-muted/30 py-20 sm:py-28">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl sm:text-6xl font-bold font-headline">Vi er din digitale vekstpartner</h1>
                        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                            Vi er et team av strateger, utviklere og designere som brenner for å bygge ekstraordinære digitale opplevelser.
                        </p>
                    </div>
                </section>

                {/* Team Seksjon */}
                <section className="py-20 sm:py-28">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl sm:text-4xl font-bold font-headline text-center mb-16">Møt Teamet</h2>
                        <div className="grid md:grid-cols-2 gap-10 md:gap-16 max-w-4xl mx-auto">
                            {teamMembers.map((member) => (
                                <div key={member.name} className="flex flex-col items-center text-center">
                                    <Avatar className="w-32 h-32 mb-4 border-4 border-primary/10">
                                        <AvatarImage src={member.avatar} alt={member.name} />
                                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <h3 className="text-2xl font-bold font-headline">{member.name}</h3>
                                    <p className="text-primary font-semibold mb-3">{member.role}</p>
                                    <p className="text-muted-foreground mb-4">{member.bio}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Verdier/Tilnærming Seksjon */}
                <section className="py-20 sm:py-28 bg-muted/30">
                  <div className="container mx-auto px-4">
                    <h2 className="text-3xl sm:text-4xl font-bold font-headline text-center mb-16">Vår Tilnærming</h2>
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                      {values.map(value => (
                        <Card key={value.title} className="bg-background/50 border-2 border-primary/5 hover:border-primary/20 transition-colors">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                              <CheckCircle className="text-primary w-6 h-6" />
                              <span>{value.title}</span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground">{value.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </section>

                {/* "Vårt Løfte" Seksjon */}
                <section className="py-20 sm:py-28">
                    <div className="container mx-auto px-4">
                      <div className="bg-primary text-primary-foreground rounded-lg p-12 text-center">
                          <h2 className="text-3xl font-bold font-headline mb-4">Vårt Løfte til Deg</h2>
                          <p className="text-xl max-w-4xl mx-auto text-primary-foreground/80">
                          Vi gjør din digitale reise trygg og vellykket. Sammen gjør vi ideer til virkelighet og skaper resultater du kan være stolt av, bygget på et fundament av tillit og kvalitet.
                          </p>
                      </div>
                    </div>
                </section>
                
                {/* CTA Seksjon */}
                <section className="text-center py-20">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold font-headline">Klar for å ta neste steg?</h2>
                        <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">La oss ta en prat om hvordan vi kan hjelpe deg med å nå dine mål.</p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/#proposal">Start et Prosjekt</Link>
                        </Button>
                    </div>
                </section>

            </main>
            <Footer />
        </>
    );
}