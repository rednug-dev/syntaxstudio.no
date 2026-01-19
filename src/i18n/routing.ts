import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'no'],
  defaultLocale: 'en'
  // (optional) pathnames: { '/about-us': {en: '/about-us', no: '/om-oss'} }
});
