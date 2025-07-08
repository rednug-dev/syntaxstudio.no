import { Instagram } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer id="contact" className="bg-muted/50 border-t">
            <div className="container mx-auto px-4 py-12">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Logo and Slogan */}
                    <div className="md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 font-bold text-lg font-headline mb-4">
                            <Image src="/logosyntax-nbnm.png" alt="Syntax Studio logo" width={150} height={40} />
                        </Link>
                        <p className="text-muted-foreground text-base">Fra visjon til virkelighet</p>
                    </div>

                    {/* Links and Contact Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:col-span-2 gap-8 sm:gap-16">
                        {/* Snarveier */}
                        <div className="mx-auto w-full sm:w-fit text-center sm:text-left">
                            <h4 className="font-semibold mb-3 font-headline">Snarveier</h4>
                            <ul className="space-y-2 text-base">
                                <li><Link href="/tjenester#case-studies" className="text-muted-foreground hover:text-primary">Caser</Link></li>
                                <li><Link href="/om-oss" className="text-muted-foreground hover:text-primary">Om oss</Link></li>
                                <li><Link href="/#proposal" className="text-muted-foreground hover:text-primary">Kontakt</Link></li>
                            </ul>
                        </div>
                        {/* Henvendelser */}
                        <div className="text-center sm:text-left">
                            <h4 className="font-semibold mb-3 font-headline">Generelle henvendelser</h4>
                            <p className="text-base text-muted-foreground break-words">info@syntaxstudio.no</p>
                            <h4 className="font-semibold mb-3 font-headline mt-4">Salg</h4>
                            <p className="text-base text-muted-foreground break-words">sales@syntaxstudio.no</p>
                            <div className="flex justify-center sm:justify-start mt-4">
                                <a href="https://www.instagram.com/syntaxstudio.no/" aria-label="Instagram" className="text-muted-foreground hover:text-primary">
                                    <Instagram className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} Syntax Studio.</p>
                </div>
            </div>
        </footer>
    );
}