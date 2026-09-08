'use client';

import {useId, useState, type CSSProperties} from 'react';
import Image from 'next/image';
import {ArrowUpRight, MoveHorizontal, Plus, Minus} from 'lucide-react';
import {Link} from '@/i18n/navigation';
import {practices, localText} from '@/lib/house-content';
import Film from './film';

// x, y, width, height in shared coordinates. Mobile has its own spatial score.
const frames = {
  photo: [[0, 0, 66, 94], [0, 0, 62, 92], [0, 9, 48, 76], [0, 0, 43, 92]],
  film: [[57, 32, 31, 65], [50, 30, 34, 68], [38, 0, 37, 100], [69, 0, 25, 46]],
  web: [[73, 2, 27, 29], [72, 2, 28, 30], [70, 61, 30, 33], [24, 26, 76, 66]],
  'mobile-photo': [[0, 0, 77, 84], [0, 0, 76, 87], [0, 4, 54, 73], [0, 0, 71, 75]],
  'mobile-film': [[51, 45, 49, 54], [51, 46, 49, 53], [28, 0, 64, 100], [67, 0, 33, 45]],
  'mobile-web': [[69, 5, 31, 26], [69, 2, 31, 26], [62, 69, 38, 29], [8, 46, 92, 50]],
};
function compositionStyle(value: number): CSSProperties {
  const stops = [0, 20, 50, 100];
  const segment = value <= 20 ? 0 : value <= 50 ? 1 : 2;
  const progress = (value - stops[segment]) / (stops[segment + 1] - stops[segment]);
  const style: Record<string, string | number> = {'--web-layer': value > 70 ? 4 : 2};
  for (const [name, keyframes] of Object.entries(frames)) {
    ['x', 'y', 'w', 'h'].forEach((axis, index) => {
      const start = keyframes[segment][index];
      style[`--${name}-${axis}`] = `${start + (keyframes[segment + 1][index] - start) * progress}%`;
    });
  }
  return style as CSSProperties;
}
export function SyntaxComposition({locale}: {locale: string}) {
  const no = locale === 'no', id = useId();
  const [position, setPosition] = useState(20), [direct, setDirect] = useState(false);
  const lead = position === 20 ? (no ? 'Sammen' : 'Together') : position < 35 ? (no ? 'Bilde leder' : 'Image leads') : position < 72 ? (no ? 'Bevegelse leder' : 'Motion leads') : (no ? 'Teknologi leder' : 'Technology leads');
  const presets = [{value: 20, label: no ? 'Sammen' : 'Together'}, {value: 0, label: no ? 'Bilde' : 'Image'}, {value: 50, label: no ? 'Bevegelse' : 'Motion'}, {value: 100, label: no ? 'Teknologi' : 'Technology'}];
  return <div className="syntax-composition" id="composition">
    <div className="composition-stage" data-direct={direct} style={compositionStyle(position)} aria-label={no ? 'En komposisjon av fotografi, film og en nettsidestudie' : 'A composition of photography, film and a website study'}>
      <figure className="composition-artifact composition-photo"><Link href="/work/iso400-street-portraits" className="composition-media" aria-label={no ? 'Se Street portraits fra ISO400' : 'Explore Street portraits by ISO400'}><Image src="/work/iso400/street-portrait-01.webp" alt={no ? 'Portrett i naturlig lys, med runde solbriller og en olivengrønn jakke. Fra ISO400s Street portraits.' : 'Natural-light portrait with round sunglasses and an olive jacket, from ISO400’s Street portraits.'} fill priority sizes="(max-width: 760px) 75vw, 62vw" quality={85}/></Link><figcaption><Link href="/work/iso400-street-portraits">Street portraits <span>ISO400</span><ArrowUpRight size={14} aria-hidden="true"/></Link></figcaption></figure>
      <figure className="composition-artifact composition-film"><Film src="/burger/hero-build.mp4" poster="/burger/hero-build-poster.webp" label={no ? 'Spill kampanjefilm' : 'Play campaign film'}/><figcaption><Link href="/work/burger">{no ? 'Kampanjefilm' : 'Campaign film'}<span>Syntax Studio</span><ArrowUpRight size={14} aria-hidden="true"/></Link></figcaption></figure>
      <figure className="composition-artifact composition-web"><Link href="/work/nyfane-website-study" className="composition-media" aria-label={no ? 'Se Nyfanes nettsidestudie, under utvikling' : 'Explore Nyfane’s website study, in development'}><Image src="/work/nyfane/website-study.webp" alt={no ? 'Nyfanes faktiske nettside under utvikling, med plommefarget bakgrunn og korallfargede faner.' : 'Nyfane’s actual website in development, with a plum background and coral tabs.'} fill sizes="(max-width: 760px) 85vw, 70vw"/></Link><figcaption><Link href="/work/nyfane-website-study">Nyfane<span>{no ? 'Nettsidestudie' : 'Website study'}</span><ArrowUpRight size={14} aria-hidden="true"/></Link></figcaption></figure>
    </div>
    <div className="composition-tools"><div className="composition-instruction"><MoveHorizontal size={18} strokeWidth={1.3} aria-hidden="true"/><label htmlFor={id}>{no ? 'Endre samspillet' : 'Change the relationship'}</label></div><input id={id} type="range" min="0" max="100" step="1" value={position} aria-valuetext={lead} onChange={event => {setDirect(true); setPosition(Number(event.target.value));}}/><div className="composition-presets" role="group" aria-label={no ? 'Velg komposisjon' : 'Choose a composition'}>{presets.map(preset => <button type="button" key={preset.value} aria-pressed={position === preset.value} onClick={() => {setDirect(false); setPosition(preset.value);}}>{preset.label}</button>)}</div></div>
    <p className="composition-note">{no ? 'Ulike arbeider. Ett samspill.' : 'Different works. One composition.'}<span>{no ? 'Foto, film og en nettside under utvikling.' : 'Photography, film and a website in development.'}</span></p>
  </div>;
}
export function PracticeRelationships({locale}: {locale: string}) {
  const no = locale === 'no';
  const [active, setActive] = useState<string | null>('iso400');
  const terms = no ? ['Bilde', 'Bevegelse', 'Teknologi'] : ['Image', 'Motion', 'Technology'];
  return <section className="syntax-practices house-wrap" id="practices" aria-labelledby="practices-title"><div className="practice-prologue"><h2 id="practices-title">{no ? <>Tre spesialister.<br/>En felles retning.</> : <>Three specialists.<br/>A shared direction.</>}</h2><p>{no ? 'ISO400, 35mm og Nyfane. Du kan jobbe direkte med én praksis, eller samle flere fag rundt samme idé. Syntax er forbindelsen.' : 'ISO400, 35mm and Nyfane. Work directly with one practice, or bring several disciplines to the same idea. Syntax is the connection.'}</p></div><div className="practice-score">{practices.map((practice, index) => {
    const expanded = active === practice.id;
    return <article className="practice-line" key={practice.id} data-active={expanded}><h3><button type="button" aria-expanded={expanded} aria-controls={`practice-${practice.id}`} onClick={() => setActive(expanded ? null : practice.id)}><span className="practice-term">{terms[index]}</span><span className="practice-identity"><span>{practice.name}</span><span>{localText(practice.discipline, locale)}</span></span>{expanded ? <Minus size={23} strokeWidth={1.3} aria-hidden="true"/> : <Plus size={23} strokeWidth={1.3} aria-hidden="true"/>}</button></h3><div className="practice-detail" id={`practice-${practice.id}`} hidden={!expanded}><div className="practice-supplied-mark">{practice.id === 'iso400' ? <Image src="/brand/iso400.svg" width={362} height={328} alt="ISO400"/> : practice.id === 'nyfane' ? <Image src="/brand/nyfane-wordmark.svg" width={1000} height={334} alt="Nyfane"/> : <span>35mm</span>}</div><div><p>{localText(practice.description, locale)}</p><p className="practice-lead">{practice.founder}<span>{no ? 'Medgründer og faglig leder' : 'Co-founder and practice lead'}</span></p></div><Link href={practice.contactHref} className="house-text-link"><span>{no ? 'Kontakt' : 'Contact'} {practice.name}</span><ArrowUpRight size={18} aria-hidden="true"/></Link></div></article>;
  })}</div></section>;
}
