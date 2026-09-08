'use client';

import Image from 'next/image';
import {useId, useState} from 'react';
import {ArrowUpRight, Crop} from 'lucide-react';
import {Link} from '@/i18n/navigation';
import {getProject, localText} from '@/lib/house-content';
import './work.css';

type CompositionFormat = 'portrait' | 'square' | 'wide';

function FormatComposition({locale}: {locale: string}) {
  const no = locale === 'no';
  const id = useId();
  const [format, setFormat] = useState<CompositionFormat>('wide');
  const formats: {id: CompositionFormat; label: string}[] = [
    {id: 'portrait', label: no ? 'Portrett' : 'Portrait'},
    {id: 'square', label: no ? 'Kvadrat' : 'Square'},
    {id: 'wide', label: no ? 'Bredformat' : 'Wide'},
  ];

  return (
    <section className="c-work__format-study" aria-labelledby={`${id}-title`}>
      <div className="c-work__format-heading">
        <h2 id={`${id}-title`}>{no ? <>Rammen<br /><span>endrer alt.</span></> : <>The frame changes<br /><span>everything.</span></>}</h2>
        <div className="c-work__format-controls" role="group" aria-label={no ? 'Velg komposisjonens format' : 'Choose the composition format'}>
          {formats.map((option) => (
            <button key={option.id} type="button" aria-pressed={format === option.id} aria-controls={`${id}-composition`} onClick={() => setFormat(option.id)}>
              {option.label}
            </button>
          ))}
        </div>
      </div>
      <figure className="c-work__format-figure" data-format={format}>
        <div className="c-work__format-stage">
          <div className="c-work__format-canvas" id={`${id}-composition`}>
            <div className="c-work__format-photo">
              <Image src="/burger/prophoto_vertical.webp" alt={no ? 'En burger settes sammen med stekespader og en hånd i svart hanske.' : 'A burger being assembled with spatulas and a black-gloved hand.'} fill sizes="(max-width: 700px) 100vw, 70vw" />
            </div>
            <div className="c-work__format-print">
              <Image src="/burger/p1_5.webp" alt={no ? 'Den ferdige grønne kampanjeplakaten med burger, pommes frites, drikke og teksten Lunsj deal.' : 'The complete green campaign poster with a burger, fries, drink and the headline Lunsj deal.'} fill sizes="(max-width: 700px) 50vw, 30vw" />
            </div>
            <p className="c-work__format-type" lang="en"><span>Image</span><span>into impact.</span></p>
          </div>
        </div>
        <figcaption><span>{no ? 'Syntax komposisjonsstudium / Eksisterende kampanjemateriell' : 'Syntax composition study / Existing campaign assets'}</span><span aria-live="polite">{formats.find((option) => option.id === format)?.label}</span></figcaption>
      </figure>
    </section>
  );
}

export function FrameWork({locale}: {locale: string}) {
  const no = locale === 'no';
  const id = useId();
  const [closer, setCloser] = useState(false);
  const portraits = getProject('iso400-street-portraits');
  const website = getProject('nyfane-website-study');
  if (!portraits || !website) return null;

  const portraitCompanion = portraits.mediaBlocks.find((block) => block.kind === 'media');
  const cropName = closer ? (no ? 'Nærmere' : 'Closer') : (no ? 'Mer av bildet' : 'More context');

  return (
    <section className="c-work" id="c-work" aria-label={no ? 'Utvalgte arbeider' : 'Selected work'}>
      <article className="c-work__portraits" data-frame-scene data-frame-pointer aria-labelledby={`${id}-portraits-title`}>
        <div className="c-work__inner">
          <header className="c-work__portrait-heading">
            <h2 id={`${id}-portraits-title`} data-frame-reveal><span>Street</span><span>portraits</span></h2>
            <p className="c-work__credit"><strong>ISO400</strong><span>{no ? 'Fotografi / Bildestudium' : 'Photography / Image study'}</span></p>
          </header>

          <div className="c-work__diptych" id={`${id}-diptych`} data-crop={closer ? 'closer' : 'full'}>
            <figure className="c-work__portrait c-work__portrait--lead">
              <div className="c-work__portrait-viewport">
                <div className="c-work__portrait-crop">
                  <Image
                    src={portraits.hero.src}
                    alt={localText(portraits.hero.alt, locale)}
                    fill
                    sizes="(max-width: 700px) 88vw, (max-width: 1100px) 58vw, 56vw"
                  />
                </div>
              </div>
              <figcaption>{no ? 'Et blikk til siden.' : 'A glance to one side.'}</figcaption>
            </figure>

            <div className="c-work__portrait-side">
              <div className="c-work__portrait-note">
                <p>{localText(portraits.summary, locale)}</p>
                <div className="c-work__crop-control">
                  <button type="button" onClick={() => setCloser((value) => !value)} aria-pressed={closer} aria-controls={`${id}-diptych`} aria-describedby={`${id}-crop-state`}>
                    <Crop size={18} strokeWidth={1.5} aria-hidden="true" />
                    {no ? 'Endre utsnittet' : 'Change the crop'}
                  </button>
                  <span id={`${id}-crop-state`} role="status">{cropName}</span>
                </div>
              </div>

              {portraitCompanion?.kind === 'media' && (
                <figure className="c-work__portrait c-work__portrait--companion">
                  <div className="c-work__portrait-viewport">
                    <div className="c-work__portrait-crop">
                      <Image
                        src={portraitCompanion.media.src}
                        alt={localText(portraitCompanion.media.alt, locale)}
                        fill
                        sizes="(max-width: 700px) 69vw, (max-width: 1100px) 34vw, 32vw"
                      />
                    </div>
                  </div>
                  <figcaption>{no ? 'Et blikk tilbake.' : 'A glance back.'}</figcaption>
                </figure>
              )}
            </div>
          </div>

          <footer className="c-work__portrait-footer">
            <p>{localText(portraits.provenance, locale)}</p>
            <Link href={`/work/${portraits.slug}`} locale={locale} className="c-work__link">
              {no ? 'Se bildestudiet' : 'View the image study'}<ArrowUpRight size={22} strokeWidth={1.5} aria-hidden="true" />
            </Link>
          </footer>
        </div>
      </article>

      <div className="c-work__technology" data-frame-scene>
        <div className="c-work__inner">
          <FormatComposition locale={locale} />
          <article aria-labelledby={`${id}-website-title`}>
          <header className="c-work__technology-heading">
            <h2 id={`${id}-website-title`} data-frame-reveal>Nyfane</h2>
            <div className="c-work__technology-context">
              <p className="c-work__credit"><strong>{no ? 'Nettsidestudium' : 'Website study'}</strong><span>{no ? 'Egeninitiert / Under utvikling' : 'Self-initiated / In development'}</span></p>
              <p>{localText(website.summary, locale)}</p>
            </div>
          </header>

          <figure className="c-work__website">
            <div className="c-work__capture-stage">
              <div className="c-work__capture-window" id={`${id}-capture`}>
                <Image
                  src={website.hero.src}
                  alt={localText(website.hero.alt, locale)}
                  width={website.hero.width}
                  height={website.hero.height}
                  sizes="(max-width: 700px) 100vw, 94vw"
                />
              </div>
            </div>
            <figcaption>{no ? 'Skjermbilde av Nyfanes egen nettside under utvikling.' : 'A capture of Nyfane’s own website in development.'}</figcaption>
          </figure>

          <div className="c-work__technology-footer">
            <div className="c-work__technology-onward">
              <p>{no ? 'Design & utvikling: Nyfane' : 'Design & development: Nyfane'}</p>
              <Link href={`/work/${website.slug}`} locale={locale} className="c-work__link">
                {no ? 'Se nettsidestudiet' : 'View the website study'}<ArrowUpRight size={22} strokeWidth={1.5} aria-hidden="true" />
              </Link>
            </div>
          </div>
          </article>
        </div>
      </div>
    </section>
  );
}
