import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['no', 'en'],
  defaultLocale: 'no',
  localePrefix: 'as-needed'
  // (optional) pathnames: { '/about-us': {en: '/about-us', no: '/om-oss'} }
});
