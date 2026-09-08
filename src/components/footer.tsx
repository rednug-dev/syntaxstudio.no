'use client';
import {useLocale} from 'next-intl';
import Image from 'next/image';
import {ArrowUpRight} from 'lucide-react';
import {Link} from '@/i18n/navigation';

export default function Footer() {
  const no = useLocale() === 'no';
  return <footer className="house-footer"><div className="house-wrap">
    <div className="house-footer-invitation"><Link href="/contact" className="house-footer-title">{no ? <>Har du noe<br/>i tankene?</> : <>Have something<br/>in mind?</>}<ArrowUpRight aria-hidden="true"/></Link><div className="house-footer-contact"><a href="mailto:info@syntaxstudio.no">info@syntaxstudio.no</a><p>Heimdalsgata 34B<br/>0561 Oslo, {no ? 'Norge' : 'Norway'}</p></div></div>
    <div className="house-footer-practices"><Link href="/contact?practice=iso400">ISO400 <span>{no ? 'Bilde & design' : 'Image & Design'}</span><ArrowUpRight size={16} aria-hidden="true"/></Link><Link href="/contact?practice=35mm">35mm <span>Film & VFX</span><ArrowUpRight size={16} aria-hidden="true"/></Link><Link href="/contact?practice=nyfane">Nyfane <span>{no ? 'Teknologi' : 'Technology'}</span><ArrowUpRight size={16} aria-hidden="true"/></Link></div>
    <div className="house-footer-bottom"><Link href="/" aria-label="Syntax Studio"><Image className="house-footer-wordmark" src="/logos/syntaxnylogoutenundertekst.svg" alt="Syntax Studio" width={663} height={138} sizes="150px"/></Link><span>© {new Date().getFullYear()} Syntax Studio</span><a href="https://www.instagram.com/syntaxstudio.no/" target="_blank" rel="noreferrer">Instagram<ArrowUpRight size={14} aria-hidden="true"/></a></div>
  </div></footer>;
}
