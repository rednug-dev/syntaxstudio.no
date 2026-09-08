/* eslint-disable @next/next/no-img-element -- Satori renders the supplied SVG as an image; next/image needs a browser. */
import {ImageResponse} from 'next/og';
import {readFile} from 'node:fs/promises';
import {join} from 'node:path';

export const alt = 'Syntax Studio — ISO400, 35mm, Nyfane';
export const size = {width: 1200, height: 630};
export const contentType = 'image/png';

export default async function OpengraphImage({params}: {params: Promise<{locale: string}>}) {
  const no = (await params).locale === 'no';
  const logo = await readFile(join(process.cwd(), 'public/logos/syntaxnylogoutenundertekst.svg'));
  return new ImageResponse(<div style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: '#e9e7e2', color: '#31291f', padding: '55px 65px 0', fontFamily: 'sans-serif'}}>
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}><img src={`data:image/svg+xml;base64,${logo.toString('base64')}`} width={210} height={44} alt="Syntax Studio"/><span style={{fontSize: 18}}>Oslo, {no ? 'Norge' : 'Norway'}</span></div>
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', padding: '48px 0 38px'}}><div style={{display: 'flex', flexDirection: 'column', fontSize: 78, lineHeight: 1.06, letterSpacing: '-.035em'}}><span>{no ? 'Ulike rom.' : 'Different rooms.'}</span><span>{no ? 'Åpne dører.' : 'Open doors.'}</span></div><div style={{display: 'flex', flexDirection: 'column', fontSize: 21, lineHeight: 1.5, marginBottom: 6}}><span>{no ? 'Tre spesialister.' : 'Three specialists.'}</span><span>{no ? 'Ett kreativt hus.' : 'One creative house.'}</span></div></div>
    <div style={{display: 'flex', flex: 1}}>{[{name: 'ISO400', label: no ? 'Bilde & design' : 'Image & Design', background: '#ded9d0', color: '#31291f', top: 28}, {name: '35mm', label: 'Film & VFX', background: '#382b23', color: '#f4ece3', top: 53}, {name: 'Nyfane', label: no ? 'Teknologi' : 'Technology', background: '#b5cddd', color: '#183c54', top: 78}].map(room => <div key={room.name} style={{display: 'flex', flexDirection: 'column', flex: 1, background: room.background, color: room.color, padding: `${room.top}px 30px 26px`}}><span style={{fontSize: 32}}>{room.name}</span><span style={{fontSize: 17, marginTop: 7}}>{room.label}</span></div>)}</div>
  </div>, size);
}
