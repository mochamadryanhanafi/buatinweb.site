import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://buatinweb.site',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [
    preact(),
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en', id: 'id' } },
      filter: (page) => !page.includes('/404'),
    }),
  ],
  i18n: { defaultLocale: 'en', locales: ['id', 'en'], routing: { prefixDefaultLocale: true } },
});
