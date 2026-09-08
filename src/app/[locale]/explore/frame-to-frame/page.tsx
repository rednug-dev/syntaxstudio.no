import type {Metadata} from 'next';
import Header from '@/components/header';
import Footer from '@/components/footer';
import {Link} from '@/i18n/navigation';
import {ArrowUpRight} from 'lucide-react';
import {Founders} from '@/components/house/founders';
import {FrameMotion} from '@/components/house/frame/motion';
import {FrameOpening, FrameSequence, FramePractices} from '@/components/house/frame/experience';
import {FrameWork} from '@/components/house/frame/work';
import '@/components/house/frame/frame.css';

export function generateStaticParams() { return [{locale: 'no'}, {locale: 'en'}]; }
export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const no = locale === 'no';
  return {title: {absolute: 'Syntax — From frame to frame'}, description: no ? 'En filmatisk utforskning av Syntax. Bilde, film og teknologi, gjennom selve arbeidet.' : 'A cinematic exploration of Syntax. Image, film and technology, through the work itself.', robots: {index: false, follow: true}, alternates: {canonical: no ? '/' : '/en'}, openGraph: {title: 'Syntax — From frame to frame', images: [{url: '/webmat/burgercrop.webp'}]}};
}

export default async function FrameToFramePage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const no = locale === 'no';
  return <FrameMotion><div className="house-page frame-home"><Header homeHref="/explore/frame-to-frame" workHref="/explore/frame-to-frame#c-work" practicesHref="/explore/frame-to-frame#c-practices"/><main id="main-content">
    <FrameOpening locale={locale}/>
    <FrameSequence locale={locale}/>
    <div className="frame-thesis" data-frame-scene><p>{no ? 'Vi tenker gjennom det vi lager.' : 'We think through making.'}</p><h2><span>{no ? 'Arbeidet' : 'The work'}</span><span>{no ? 'sier mer.' : 'says more.'}</span></h2><div><p>{no ? 'Bilder som setter retning. Film som får deg til å føle. Teknologi som lar deg ta del. Dette er Syntax.' : 'Images that set a direction. Films that make you feel. Technology that lets you take part. This is Syntax.'}</p><a href="#c-work">{no ? 'Fortsett inn i arbeidet' : 'Keep exploring'}<ArrowUpRight size={21}/></a></div></div>
    <FrameWork locale={locale}/>
    <FramePractices locale={locale}/>
    <section className="frame-people" data-frame-scene><div className="frame-people-heading"><h2>{no ? <>Arbeidet vårt.<br/>Oss tre.</> : <>Our work.<br/>The three of us.</>}</h2><p>{no ? 'Gunder, Khamzat og Rasul. Du jobber direkte med menneskene som setter retningen og lager arbeidet.' : 'Gunder, Khamzat and Rasul. You work directly with the people who shape the direction and make the work.'}</p><Link href="/studio">{no ? 'Bli kjent med oss' : 'Meet the studio'}<ArrowUpRight size={21}/></Link></div><Founders locale={locale} compact/></section>
    <div className="frame-compare"><span>{no ? 'Utforskning C / From frame to frame' : 'Exploration C / From frame to frame'}</span><Link href="/">{no ? 'Se In relation' : 'Compare with In relation'}<ArrowUpRight size={16}/></Link></div>
  </main><Footer/></div></FrameMotion>;
}
