import Image from 'next/image';
import {Link} from '@/i18n/navigation';
import './studio-contact.css';

const founders = [
  {name: 'Gunder Rollufson', practice: 'ISO400', slug: 'iso400', image: '/portraits/gunder.webp', position: 'center 30%', email: 'gunder@syntaxstudio.no', no: 'Bilde & design', en: 'Image & Design'},
  {name: 'Khamzat Dudaev', practice: '35mm', slug: '35mm', image: '/portraits/khamzat-v2.webp', position: 'center 15%', email: 'khamzat@syntaxstudio.no', no: 'Film & VFX', en: 'Film & VFX'},
  {name: 'Rasul Uzdijev', practice: 'Nyfane', slug: 'nyfane', image: '/portraits/rasul.webp', position: 'center 12%', email: 'rasul@syntaxstudio.no', no: 'Teknologi', en: 'Technology'},
];

export function Founders({locale, compact = false}: {locale: string; compact?: boolean}) {
  const no = locale === 'no';
  return (
    <section className={`house-founders ${compact ? 'house-founders--compact' : ''}`} aria-labelledby={compact ? undefined : 'house-founders-title'} aria-label={compact ? (no ? 'Medgründerne i Syntax' : 'The co-founders of Syntax') : undefined}>
      <div className="house-wrap">
        {!compact && <div className="house-founders__heading">
          <h2 id="house-founders-title">{no ? 'Hver vår fagretning.' : 'A practice of our own.'}</h2>
          <p>{no ? 'Vi er tre medgründere som leder hvert vårt fag. Du kan jobbe med oss hver for oss, eller samle flere blikk rundt samme idé.' : 'We are three co-founders, each leading a specialist practice. Work with us individually, or bring several perspectives to one idea.'}</p>
        </div>}
        <div className="house-founders__grid">
          {founders.map((founder) => (
            <article className="house-founder" key={founder.slug}>
              <div className="house-founder__portrait">
                <Image src={founder.image} alt={founder.name} fill sizes={compact ? '(max-width: 760px) 80vw, (max-width: 1100px) 30vw, 26vw' : '(max-width: 760px) 80vw, 30vw'} style={{objectPosition: founder.position}} />
              </div>
              <div className="house-founder__details">
                <h3>{founder.name}</h3>
                <p className="house-founder__practice"><span>{founder.practice}</span>{no ? founder.no : founder.en}</p>
                <p className="house-founder__role">{no ? 'Medgründer og faglig leder' : 'Co-founder and practice lead'}</p>
                {compact ? (
                  <Link href={{pathname: '/contact', query: {practice: founder.slug}}} locale={locale} className="house-founder__link">{no ? `Kontakt ${founder.practice}` : `Contact ${founder.practice}`}</Link>
                ) : (
                  <a className="house-founder__link" href={`mailto:${founder.email}`}>{founder.email}</a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
