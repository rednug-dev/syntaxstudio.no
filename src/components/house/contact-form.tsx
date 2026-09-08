'use client';

import * as React from 'react';
import {useFormState, useFormStatus} from 'react-dom';
import {handleContactInquiry, type FormState} from '@/actions';
import './studio-contact.css';

const initialState: FormState = {message: '', errors: null, success: false};
const {useEffect, useRef} = React;
// Next's App Router bundles React 19; retain compatibility with the declared React 18 types/runtime.
const useInquiryState = (React as typeof React & {useActionState?: typeof useFormState}).useActionState ?? useFormState;

function SendButton({no}: {no: boolean}) {
  const {pending} = useFormStatus();
  return <button className="house-contact-form__submit" type="submit" disabled={pending}>{pending ? (no ? 'Sender …' : 'Sending …') : (no ? 'Send melding' : 'Send message')}</button>;
}

export function ContactForm({locale, practice = ''}: {locale: string; practice?: string}) {
  const no = locale === 'no';
  const [state, formAction] = useInquiryState(handleContactInquiry, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const selectedPractice = ['iso400', '35mm', 'nyfane'].includes(practice) ? practice : '';

  useEffect(() => {
    if (!state.message) return;
    const firstInvalid = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]');
    if (firstInvalid) firstInvalid.focus();
    else statusRef.current?.focus();
  }, [state]);

  const fieldError = (field: string) => state.errors?.[field]?.[0];
  const errorMessage = (field: string) => fieldError(field) ? <span className="house-contact-form__error" id={`contact-${field}-error`}>{fieldError(field)}</span> : null;

  if (state.success) {
    return (
      <div className="house-contact-form__success" ref={statusRef} tabIndex={-1} role="status">
        <h2>{no ? 'Vi har fått meldingen din.' : 'Your message is with us.'}</h2>
        <p>{state.message}</p>
        <a href="mailto:info@syntaxstudio.no">info@syntaxstudio.no</a>
      </div>
    );
  }

  return (
    <form action={formAction} ref={formRef} className="house-contact-form" aria-labelledby="contact-form-title">
      <h2 id="contact-form-title">{no ? 'Fortell oss litt.' : 'Tell us a little.'}</h2>
      <p className="house-contact-form__intro">{no ? 'En idé, et spørsmål eller et prosjekt som trenger flere blikk. Vi tar samtalen derfra.' : 'An idea, a question or a project that needs another perspective. We can take it from there.'}</p>
      <input type="hidden" name="locale" value={no ? 'no' : 'en'} />
      <div className="house-contact-form__trap" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" type="text" autoComplete="off" tabIndex={-1} />
      </div>
      <div className="house-contact-form__field">
        <label htmlFor="contact-practice">{no ? 'Fagretning' : 'Practice'} <span>{no ? '(valgfritt)' : '(optional)'}</span></label>
        <select id="contact-practice" name="practice" defaultValue={selectedPractice} aria-invalid={Boolean(fieldError('practice'))} aria-describedby={fieldError('practice') ? 'contact-practice-error' : undefined}>
          <option value="">{no ? 'Syntax / Finn riktig kombinasjon' : 'Syntax / Find the right combination'}</option>
          <option value="iso400">ISO400 / {no ? 'Bilde & design' : 'Image & Design'}</option>
          <option value="35mm">35mm / Film &amp; VFX</option>
          <option value="nyfane">Nyfane / {no ? 'Teknologi' : 'Technology'}</option>
        </select>
        {errorMessage('practice')}
      </div>
      <div className="house-contact-form__pair">
        <div className="house-contact-form__field">
          <label htmlFor="contact-name">{no ? 'Navn' : 'Name'}</label>
          <input id="contact-name" name="name" autoComplete="name" required minLength={2} maxLength={100} aria-invalid={Boolean(fieldError('name'))} aria-describedby={fieldError('name') ? 'contact-name-error' : undefined} />
          {errorMessage('name')}
        </div>
        <div className="house-contact-form__field">
          <label htmlFor="contact-email">{no ? 'E-post' : 'Email'}</label>
          <input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} aria-invalid={Boolean(fieldError('email'))} aria-describedby={fieldError('email') ? 'contact-email-error' : undefined} />
          {errorMessage('email')}
        </div>
      </div>
      <div className="house-contact-form__field">
        <label htmlFor="contact-message">{no ? 'Hva har du i tankene?' : 'What do you have in mind?'}</label>
        <textarea id="contact-message" name="message" rows={5} required minLength={3} maxLength={5000} aria-invalid={Boolean(fieldError('message'))} aria-describedby={`contact-message-hint${fieldError('message') ? ' contact-message-error' : ''}`} />
        <span className="house-contact-form__hint" id="contact-message-hint">{no ? 'Maks 5000 tegn.' : 'Up to 5,000 characters.'}</span>
        {errorMessage('message')}
      </div>
      {state.message && (
        <div className="house-contact-form__notice" role="alert" tabIndex={-1} ref={statusRef}>
          <p>{state.message}</p>
          {!state.errors && <a href="mailto:info@syntaxstudio.no">{no ? 'Send e-post direkte' : 'Email us directly'}</a>}
        </div>
      )}
      <div className="house-contact-form__bottom">
        <p>{no ? 'Vi bruker opplysningene til å svare på henvendelsen din.' : 'We use these details to reply to your enquiry.'}</p>
        <SendButton no={no} />
      </div>
    </form>
  );
}
