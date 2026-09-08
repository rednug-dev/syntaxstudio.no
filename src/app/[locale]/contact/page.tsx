import type {Metadata} from 'next';
import {ArrowUpRight} from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import {ContactForm} from '@/components/house/contact-form';
import '@/components/house/studio-contact.css';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const no = locale === 'no';
  const title = no ? 'Kontakt' : 'Contact';
  const description = no
    ? 'En idé, et spørsmål eller et nytt prosjekt? Kontakt Syntax, ISO400, 35mm eller Nyfane. info@syntaxstudio.no / +47 94 44 33 55.'
    : 'An idea, a question or a new project? Get in touch with Syntax, ISO400, 35mm or Nyfane. info@syntaxstudio.no / +47 94 44 33 55.';
  const path = no ? '/contact' : '/en/contact';
  const image = {url: `${no ? '' : '/en'}/opengraph-image`, width: 1200, height: 630, alt: 'Syntax Studio — ISO400, 35mm, Nyfane'};
  return {title, description, alternates: {canonical: path, languages: {no: '/contact', en: '/en/contact', 'x-default': '/contact'}}, openGraph: {title, description, url: path, type: 'website', siteName: 'Syntax Studio', locale: no ? 'nb_NO' : 'en_GB', images: [image]}, twitter: {card: 'summary_large_image', title, description, images: [image]}};
}

export default async function ContactPage({params, searchParams}: {
  params: Promise<{locale: string}>;
  searchParams: Promise<{practice?: string | string[]}>;
}) {
  const [{locale}, query] = await Promise.all([params, searchParams]);
  const no = locale === 'no';
  const practice = typeof query.practice === 'string' ? query.practice.toLowerCase() : '';
  return (
    <div className="house-page house-contact">
      <Header />
      <main id="main-content">
        <div className="house-wrap">
          <div className="house-contact__intro">
            <h1><span>{no ? 'Det er plass' : 'There’s room'}</span><span>{no ? 'til ideen din.' : 'for your idea.'}</span></h1>
            <p>{no ? 'Ett fag eller flere. Ta kontakt med oss i Syntax, så finner vi riktig sted å begynne.' : 'One practice or several. Get in touch with us at Syntax and we’ll find the right place to begin.'}</p>
          </div>
          <div className="house-contact__layout">
            <section className="house-contact__direct" aria-label={no ? 'Kontaktinformasjon' : 'Contact details'}>
              <h2>{no ? 'Si hei.' : 'Say hello.'}</h2>
              <a className="house-contact__email" href="mailto:info@syntaxstudio.no">info@syntaxstudio.no</a>
              <a className="house-contact__phone" href="tel:+4794443355">+47 94 44 33 55</a>
              <div className="house-contact__details">
                <div className="house-contact__visit">
                  <h3>{no ? 'Du finner oss i Oslo.' : 'Find us in Oslo.'}</h3>
                  <address>Heimdalsgata 34B<br />0561 Oslo, {no ? 'Norge' : 'Norway'}</address>
                </div>
                <div className="house-contact__meeting">
                  <p>{no ? 'Foretrekker du en samtale?' : 'Prefer a conversation?'}</p>
                  <a href="https://cal.com/syntaxstudio" target="_blank" rel="noopener noreferrer">{no ? 'Finn et tidspunkt' : 'Find a time'}<ArrowUpRight size={19} aria-hidden="true" /><span className="house-contact__external-note">{no ? ' (åpnes i ny fane)' : ' (opens in a new tab)'}</span></a>
                </div>
              </div>
            </section>
            <ContactForm key={`${locale}-${practice}`} locale={locale} practice={practice} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
