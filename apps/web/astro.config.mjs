import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';

export default defineConfig({
  site: 'https://buatinweb.site',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [preact()],
  i18n: { defaultLocale: 'id', locales: ['id', 'en'], routing: { prefixDefaultLocale: true } },
});
