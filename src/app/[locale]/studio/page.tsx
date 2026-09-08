import type {Metadata} from 'next';
import {ArrowUpRight} from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import {Founders} from '@/components/house/founders';
import {Link} from '@/i18n/navigation';
import '@/components/house/studio-contact.css';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const no = locale === 'no';
  const title = no ? 'Studioet' : 'The studio';
  const description = no
    ? 'Syntax samler ISO400, 35mm og Nyfane. Møt Gunder, Khamzat og Rasul, tre medgründere innen fotografi, film, design og teknologi.'
    : 'Syntax brings together ISO400, 35mm and Nyfane. Meet Gunder, Khamzat and Rasul, three co-founders working in photography, film, design and technology.';
  const path = no ? '/studio' : '/en/studio';
  const image = {url: `${no ? '' : '/en'}/opengraph-image`, width: 1200, height: 630, alt: 'Syntax Studio — ISO400, 35mm, Nyfane'};
  return {title, description, alternates: {canonical: path, languages: {no: '/studio', en: '/en/studio', 'x-default': '/studio'}}, openGraph: {title, description, url: path, type: 'website', siteName: 'Syntax Studio', locale: no ? 'nb_NO' : 'en_GB', images: [image]}, twitter: {card: 'summary_large_image', title, description, images: [image]}};
}

export default async function StudioPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const no = locale === 'no';
  return (
    <div className="house-page house-studio">
      <Header />
      <main id="main-content">
        <section className="house-studio__intro">
          <div className="house-wrap house-studio__intro-grid">
            <h1><span>{no ? 'Menneskene' : 'The people'}</span><span>{no ? 'gjør huset.' : 'make the house.'}</span></h1>
            <div className="house-studio__intro-copy">
              <p>{no ? 'Syntax er et kreativt hus i Oslo. Her møtes fotografi, film, design og teknologi gjennom tre selvstendige fagretninger: ISO400, 35mm og Nyfane.' : 'Syntax is a creative house in Oslo. Photography, film, design and technology meet through three independent practices: ISO400, 35mm and Nyfane.'}</p>
              <p>{no ? 'Hver av oss har sitt fag. En felles nysgjerrighet gir ideene rom til å bevege seg mellom dem.' : 'Each of us has a craft. A shared curiosity gives ideas room to move between them.'}</p>
            </div>
          </div>
        </section>
        <Founders locale={locale} />
        <section className="house-studio__approach">
          <div className="house-wrap house-studio__approach-grid">
            <div className="house-studio__approach-title">
              <h2>{no ? <>Kom med en idé.<br />Vi finner formen.</> : <>Bring an idea.<br />We’ll find its form.</>}</h2>
              <Link href="/contact" locale={locale} className="house-studio__invitation">{no ? 'Snakk med oss' : 'Talk to us'}<ArrowUpRight size={20} aria-hidden="true" /></Link>
            </div>
            <div className="house-studio__approach-copy">
              <p>{no ? 'Du kan jobbe direkte med ISO400, 35mm eller Nyfane. Når ideen trenger flere fag, setter vi sammen prosjektet gjennom Syntax.' : 'You can work directly with ISO400, 35mm or Nyfane. When an idea calls for more than one discipline, we bring the project together through Syntax.'}</p>
              <p>{no ? 'Fra første samtale har du kontakt med menneskene som lager arbeidet.' : 'From the first conversation, you are in touch with the people making the work.'}</p>
              <div className="house-studio__links">
                <Link href="/work" locale={locale}>{no ? 'Se arbeidet vårt' : 'See our work'}<ArrowUpRight size={19} aria-hidden="true" /></Link>
              </div>
            </div>
            <p className="house-studio__aside">{no ? 'Ulike rom. Åpne dører.' : 'Different rooms. Open doors.'}</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
