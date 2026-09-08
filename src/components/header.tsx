'use client';

import {Suspense, useEffect, useRef, useState} from 'react';
import {useLocale} from 'next-intl';
import {useSearchParams} from 'next/navigation';
import Image from 'next/image';
import {ArrowUpRight, Menu, X} from 'lucide-react';
import {Link, usePathname} from '@/i18n/navigation';

function LanguageLinks({href, no}: {href: string; no: boolean}) {
  return <><Link href={href} locale="no" lang="no" aria-label="Norsk" aria-current={no?'true':undefined}>NO</Link><span aria-hidden="true">/</span><Link href={href} locale="en" lang="en" aria-label="English" aria-current={!no?'true':undefined}>EN</Link></>;
}

function QueryLanguageLinks({pathname, no}: {pathname: string; no: boolean}) {
  const query = useSearchParams().toString();
  return <LanguageLinks href={query ? `${pathname}?${query}` : pathname} no={no}/>;
}

export default function Header({homeHref = '/', workHref = '/work', practicesHref = '/#practices'}: {homeHref?: string; workHref?: string; practicesHref?: string} = {}) {
  const locale = useLocale(), no = locale === 'no', pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => {if (event.key === 'Escape') {setOpen(false); toggle.current?.focus();}};
    window.addEventListener('keydown', escape);
    return () => window.removeEventListener('keydown', escape);
  }, [open]);
  const links = [{href:workHref,label:no?'Arbeid':'Work'},{href:practicesHref,label:no?'Praksiser':'Practices'},{href:'/studio',label:'Studio'}];
  return <>
    <a className="house-skip" href="#main-content">{no?'Hopp til innhold':'Skip to content'}</a>
    <header className="house-header" data-home={pathname === '/'}>
      <div className="house-wrap house-header-row">
        <Link href={homeHref} aria-label="Syntax Studio" onClick={()=>setOpen(false)} className="house-logo"><Image src="/logos/syntaxnylogoutenundertekst.svg" alt="Syntax Studio" width={663} height={138} priority /><span className="house-home-description">{no ? <>Et uavhengig<br/>kreativt hus.</> : <>Independent<br/>creative house.</>}</span></Link>
        <nav className="house-desktop-nav" aria-label={no?'Hovedmeny':'Main navigation'}>{links.map(link=><Link key={link.href} href={link.href} aria-current={pathname===link.href?'page':undefined}>{link.label}</Link>)}</nav>
        <div className="house-header-end">
          <div className="house-languages" aria-label={no?'Språk':'Language'}><Suspense fallback={<LanguageLinks href={pathname} no={no}/>}><QueryLanguageLinks pathname={pathname} no={no}/></Suspense></div>
          <Link href="/contact" className="house-contact-nav" onClick={()=>setOpen(false)}>{no?'Kontakt':'Contact'}<ArrowUpRight size={17} aria-hidden="true" /></Link>
          <button ref={toggle} className="house-menu-button" aria-expanded={open} aria-controls="house-mobile-nav" aria-label={open?(no?'Lukk meny':'Close menu'):(no?'Åpne meny':'Open menu')} onClick={()=>setOpen(!open)}>{open?<X size={23}/>:<Menu size={23}/>}</button>
        </div>
      </div>
      <nav id="house-mobile-nav" className="house-mobile-nav house-wrap" hidden={!open} aria-label={no?'Mobilmeny':'Mobile navigation'}>
        {links.map(link=><Link key={link.href} href={link.href} onClick={()=>setOpen(false)}>{link.label}<ArrowUpRight aria-hidden="true"/></Link>)}
        <Link href="/contact" onClick={()=>setOpen(false)}>{no?'Start et prosjekt':'Start a project'}<ArrowUpRight aria-hidden="true"/></Link>
      </nav>
    </header>
  </>;
}
