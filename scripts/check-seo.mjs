import { access, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = process.cwd();
const publicUrl = 'https://peterbfoo.github.io/pere-borras/';
const requiredAssets = [
  'public/robots.txt',
  'public/sitemap.xml',
  'public/site.webmanifest',
  'public/favicon.svg',
  'public/favicon.ico',
  'public/favicon-32x32.png',
  'public/apple-touch-icon.png',
  'public/icon-192.png',
  'public/icon-512.png',
  'public/og-image.png',
  'public/llms.txt',
  'public/googlee980e9f3aeb20a1d.html',
];

const index = await readFile(join(root, 'src/index.html'), 'utf8');
const robots = await readFile(join(root, 'public/robots.txt'), 'utf8');
const sitemap = await readFile(join(root, 'public/sitemap.xml'), 'utf8');

const expectations = [
  ['canonical URL', index.includes(`<link rel="canonical" href="${publicUrl}"`)],
  ['meta description', /<meta\s+name="description"/s.test(index)],
  ['robots directive', /<meta\s+name="robots"/s.test(index)],
  ['Open Graph image', index.includes(`${publicUrl}og-image.png`)],
  ['Twitter card', index.includes('name="twitter:card"')],
  ['sitemap declaration', robots.includes(`${publicUrl}sitemap.xml`)],
  ['canonical sitemap entry', sitemap.includes(`<loc>${publicUrl}</loc>`)],
];

const jsonLdMatch = index.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
if (!jsonLdMatch) {
  expectations.push(['ProfilePage JSON-LD', false]);
} else {
  const structuredData = JSON.parse(jsonLdMatch[1]);
  const dateModified = structuredData.dateModified;
  const isoDateTimeWithTimezone = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:Z|[+-]\d{2}:\d{2})$/;

  expectations.push(
    ['ProfilePage JSON-LD', structuredData['@type'] === 'ProfilePage'],
    ['Person entity', structuredData.mainEntity?.['@type'] === 'Person'],
    [
      'valid dateModified DateTime',
      typeof dateModified === 'string' &&
        isoDateTimeWithTimezone.test(dateModified) &&
        !Number.isNaN(Date.parse(dateModified)),
    ],
    [
      'LinkedIn identity',
      structuredData.mainEntity?.sameAs?.some((url) => url.includes('linkedin.com')),
    ],
    [
      'GitHub identity',
      structuredData.mainEntity?.sameAs?.some((url) => url.includes('github.com')),
    ],
  );
}

for (const asset of requiredAssets) {
  try {
    await access(join(root, asset));
    expectations.push([asset, true]);
  } catch {
    expectations.push([asset, false]);
  }
}

const failed = expectations.filter(([, valid]) => !valid);
if (failed.length) {
  console.error(`SEO validation failed: ${failed.map(([name]) => name).join(', ')}`);
  process.exit(1);
}

console.log(`SEO validation passed (${expectations.length} checks).`);
