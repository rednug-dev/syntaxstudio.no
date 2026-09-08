'use client';

import {useState, type CSSProperties} from 'react';
import Image from 'next/image';
import {ArrowDown, ArrowUpRight, Pause, Play} from 'lucide-react';
import {Link} from '@/i18n/navigation';
import {practices, localText} from '@/lib/house-content';
import Film from '../film';
import {useFrameMotion} from './motion';

export function FrameOpening({locale}: {locale: string}) {
  const no = locale === 'no';
  const {motionEnabled, reducedMotion, toggleMotion} = useFrameMotion();
  return <section className="frame-opening" data-frame-scene data-frame-pointer aria-labelledby="frame-title">
    <div className="frame-opening-image">
      <Image src="/webmat/burgercrop.webp" alt={no ? 'Kampanjefotografi av en burger, produsert av Syntax Studio.' : 'A burger campaign photograph produced by Syntax Studio.'} fill priority sizes="100vw" quality={90}/>
      <div className="frame-register" aria-hidden="true">{[0, 1, 2, 3].map(index => <div key={index} className="frame-register-slice" style={{'--slice': index} as CSSProperties}><Image src="/webmat/burgercrop.webp" alt="" fill sizes="100vw" quality={90}/></div>)}</div>
    </div>
    <div className="frame-opening-shade" aria-hidden="true"/>
    <div className="frame-opening-note"><span>{no ? 'Et uavhengig kreativt hus.' : 'An independent creative house.'}</span><span>{no ? 'Bilde. Bevegelse. Teknologi.' : 'Image. Motion. Technology.'}</span></div>
    <div className="frame-opening-brand"><h1 id="frame-title"><Image src="/logos/syntaxnylogoutenundertekst.svg" alt="Syntax Studio" width={663} height={138} priority/><span className="sr-only">{no ? 'Bilde, film og teknologi. Et uavhengig kreativt hus i Oslo.' : 'Image, film and technology. An independent creative house in Oslo.'}</span></h1></div>
    <div className="frame-opening-bottom"><p>{no ? 'Et norsk burgermerke' : 'A Norwegian burger brand'}<span>{no ? 'Fotografi av Syntax Studio' : 'Photography by Syntax Studio'}</span></p><a href="#c-sequence" className="frame-enter"><span>{no ? 'Inn i arbeidet' : 'Into the work'}</span><ArrowDown size={23} strokeWidth={1.4}/></a></div>
    <button className="frame-motion-toggle" type="button" onClick={toggleMotion} disabled={reducedMotion} aria-pressed={motionEnabled} aria-label={reducedMotion ? (no ? 'Redusert bevegelse følger systeminnstillingen' : 'Reduced motion follows your system setting') : no ? (motionEnabled ? 'Slå av animasjoner' : 'Slå på animasjoner') : (motionEnabled ? 'Turn animations off' : 'Turn animations on')}>{motionEnabled ? <Pause size={13}/> : <Play size={13}/>}<span>{reducedMotion ? (no ? 'Redusert bevegelse' : 'Reduced motion') : <>{no ? 'Animasjon' : 'Motion'} {motionEnabled ? (no ? 'på' : 'on') : (no ? 'av' : 'off')}</>}</span></button>
  </section>;
}

export function FrameSequence({locale}: {locale: string}) {
  const no = locale === 'no';
  const [playing, setPlaying] = useState(false);
  return <section id="c-sequence" className="frame-sequence" data-frame-sticky aria-labelledby="frame-sequence-title">
    <div className="frame-sequence-stage" data-playing={playing}>
      <h2 id="frame-sequence-title" className="frame-sequence-title"><span>{no ? 'Først et bilde.' : 'First, an image.'}</span><span>{no ? 'Så bevegelse.' : 'Then, a feeling.'}</span></h2>
      <div className="frame-sequence-still"><Image src="/burger/prophoto_vertical.webp" alt={no ? 'Burgerens lag holdes fra hverandre med stekespader i et kampanjefotografi.' : 'A campaign photograph of burger layers held apart with spatulas.'} fill sizes="(max-width: 760px) 65vw, 40vw"/><span>{no ? 'Fotografi' : 'Photography'}</span></div>
      <div className="frame-sequence-screen" onClickCapture={event => {if ((event.target as HTMLElement).closest('.house-film-play')) setPlaying(true);}}>
        <Film src="/burger/hero-build.mp4" poster="/burger/hero-build-poster.webp" label={no ? 'Spill kampanjefilmen' : 'Play the campaign film'}/>
        <p>{no ? 'Film / Syntax Studio' : 'Film / Syntax Studio'}</p>
      </div>
      <div className="frame-sequence-art"><Image src="/burger/p1_5.webp" alt={no ? 'Ferdig lunsjplakat fra den samme kampanjen.' : 'Finished lunch poster from the same campaign.'} width={4128} height={6192} sizes="(max-width: 760px) 26vw, 20vw"/><span>{no ? 'Grafisk design' : 'Graphic design'}</span></div>
      <div className="frame-sequence-caption"><p>{no ? 'Ett uttrykk. Fra fotografiet til filmen, helt ut i kampanjen.' : 'One direction. Through the photograph, into the film, out into the campaign.'}</p><Link href="/work/burger">{no ? 'Se hele prosjektet' : 'Explore the project'}<ArrowUpRight size={20}/></Link><span>{no ? 'Produksjon: Syntax Studio' : 'Production: Syntax Studio'}</span></div>
      <div className="frame-sequence-line" aria-hidden="true"><span/></div>
    </div>
  </section>;
}

export function FramePractices({locale}: {locale: string}) {
  const no = locale === 'no';
  const [active, setActive] = useState(0);
  const practice = practices[active];
  const media = ['/work/iso400/street-portrait-02.webp', '/burger/kitchen-film-poster.webp', '/work/nyfane/website-study.webp'];
  const labels = no ? ['Bilde', 'Bevegelse', 'Teknologi'] : ['Image', 'Motion', 'Technology'];
  const credits = no ? ['Street portraits / ISO400', 'Kampanjefilm / Syntax Studio', 'Nyfane / Nettside under utvikling'] : ['Street portraits / ISO400', 'Campaign film / Syntax Studio', 'Nyfane / Website in development'];
  return <section className="frame-practices" id="c-practices" aria-labelledby="frame-practices-title" data-frame-scene>
    <div className="frame-practices-intro"><h2 id="frame-practices-title">{no ? <>Ulike instinkter.<br/>Samme retning.</> : <>Different instincts.<br/>Shared direction.</>}</h2><p>{no ? 'ISO400, 35mm og Nyfane. Tre spesialistpraksiser som jobber selvstendig, og sammen gjennom Syntax.' : 'ISO400, 35mm and Nyfane. Three specialist practices working independently, and together through Syntax.'}</p></div>
    <div className="frame-practices-mix"><div className="frame-practices-choices" role="group" aria-label={no ? 'Utforsk praksisene' : 'Explore the practices'}>{practices.map((item, index) => <button key={item.id} type="button" onClick={() => setActive(index)} aria-pressed={active === index} aria-controls="frame-practice-detail"><span>{labels[index]}</span><span>{item.name}</span><ArrowUpRight size={26} strokeWidth={1.2}/></button>)}</div>
      <div className="frame-practice-detail" id="frame-practice-detail"><figure className={`frame-practice-visual frame-practice-visual--${practice.id}`}><div key={practice.id} className="frame-practice-exposure"><Image src={media[active]} alt={credits[active]} fill sizes="(max-width:760px) 75vw, 36vw"/></div><figcaption>{credits[active]}</figcaption></figure><div aria-live="polite" className="frame-practice-copy"><h3>{practice.name}<span>{localText(practice.discipline, locale)}</span></h3><p>{localText(practice.description, locale)}</p><p className="frame-practice-founder">{practice.founder}<span>{no ? 'Medgründer og faglig leder' : 'Co-founder and practice lead'}</span></p><Link href={practice.contactHref}>{no ? `Kontakt ${practice.name}` : `Contact ${practice.name}`}<ArrowUpRight size={19}/></Link></div></div>
    </div>
  </section>;
}
