import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// Custom domain is brianssennoga.ca via the public/CNAME file.
// No basePath needed when serving from the apex domain on GitHub Pages.
export default defineConfig({
  site: 'https://brianssennoga.ca',
  integrations: [mdx()],
  build: {
    format: 'directory',
  },
});
