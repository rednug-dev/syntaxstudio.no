import { Instagram, Linkedin } from "lucide-react";
import {Link} from '@/i18n/navigation';
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer id="contact" className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Logo & Slogan */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg font-headline mb-4">
              <Image src="/logosyntax-nbnm.png" alt="Syntax Studio logo" width={150} height={40} />
            </Link>
            <p className="text-muted-foreground text-base">{t('tagline')}</p>
          </div>

          {/* Links & Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:col-span-2 gap-8 sm:gap-16">
            <div className="mx-auto w-full sm:w-fit text-center sm:text-left">
              <h4 className="font-semibold mb-3 font-headline">{t('links')}</h4>
              <ul className="space-y-2 text-base">
                <li><Link href="/services#case-studies" className="text-muted-foreground hover:text-primary">{t('examples')}</Link></li>
                <li><Link href="/about-us" className="text-muted-foreground hover:text-primary">{t('about')}</Link></li>
                <li><Link href="/pricing" className="text-muted-foreground hover:text-primary">{t('pricing')}</Link></li>
                <li><Link href="/#proposal" className="text-muted-foreground hover:text-primary">{t('contact')}</Link></li>
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <h4 className="font-semibold mb-3 font-headline">{t('question')}</h4>
              <p className="text-base text-muted-foreground break-words">info@syntaxstudio.no</p>
              <div className="flex justify-center sm:justify-start mt-4 gap-4">
                <a href="https://www.instagram.com/syntaxstudio.no/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-primary">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/company/syntax-studio-no/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary">
                  <Linkedin className="w-5 h-5" />
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
