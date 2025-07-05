import { CodeXml, Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Footer() {
    return (
        <footer id="contact" className="bg-muted/50 border-t">
            <div className="container mx-auto px-4 py-12">
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 font-bold text-lg font-headline mb-4">
                            <CodeXml className="w-8 h-8 text-primary" />
                            Syntax Studio
                        </Link>
                        <p className="text-muted-foreground text-sm">Skaper skreddersydde digitale opplevelser som løfter merkevaren din og automatiserer din suksess.</p>
                    </div>
                    <div className="grid grid-cols-2 md:col-span-2 gap-8">
                        <div>
                            <h4 className="font-semibold mb-3 font-headline">Hurtiglenker</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="#portfolio" className="text-muted-foreground hover:text-primary">Portefølje</Link></li>
                                <li><Link href="#about" className="text-muted-foreground hover:text-primary">Om oss</Link></li>
                                <li><Link href="#proposal" className="text-muted-foreground hover:text-primary">Kontakt oss</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-3 font-headline">Kontakt</h4>
                            <p className="text-sm text-muted-foreground">inquiries@syntaxstudio.dev</p>
                             <div className="flex gap-2 mt-4">
                                <Button variant="ghost" size="icon" asChild>
                                    <a href="#" aria-label="GitHub"><Github className="w-5 h-5" /></a>
                                </Button>
                                <Button variant="ghost" size="icon" asChild>
                                    <a href="#" aria-label="Twitter"><Twitter className="w-5 h-5" /></a>
                                </Button>
                                <Button variant="ghost" size="icon" asChild>
                                    <a href="#" aria-label="LinkedIn"><Linkedin className="w-5 h-5" /></a>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} Syntax Studio. Alle rettigheter forbeholdt.</p>
                </div>
            </div>
        </footer>
    );
}
