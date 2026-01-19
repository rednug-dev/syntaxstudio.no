// src/i18n/request.ts
import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

export default getRequestConfig(async ({requestLocale}) => {
  // Forhandl korrekt locale
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  // Last meldinger for denne requesten (legg filene i src/messages/)
  const messages = (await import(`../messages/${locale}.json`)).default;

  return {
    locale,
    messages,
    // valgfritt:
    // timeZone: 'Europe/Oslo'
  };
});
