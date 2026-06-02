import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  build: {
    format: 'directory',   // /privacy → /privacy/index.html
  },
  devToolbar: {
    enabled: false,
  },
});
