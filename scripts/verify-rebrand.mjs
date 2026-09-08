#!/usr/bin/env node
// Read-only HTTP checks. Requires a running production server and Node 20+.
// No browser automation, SMTP submissions, external-site requests, or dependencies.
import { writeFile } from 'node:fs/promises';

const args = process.argv.slice(2);
function option(name, fallback) {
  const index = args.indexOf(name);
  return index === -1 ? fallback : args[index + 1];
}
const base = new URL(option('--base-url', process.env.VERIFY_BASE_URL || 'http://localhost:3016'));
const production = new URL('https://syntaxstudio.no');
const reportPath = option('--report', null);
const checks = [];
const corePaths = ['', '/work', '/studio', '/contact', '/work/burger', '/work/snatched', '/work/iso400-street-portraits', '/work/nyfane-website-study']
  .flatMap((path) => [path || '/', `/en${path}`]);
const assets = new Set(['/burger/hero-build.mp4', '/burger/kitchen-film.mp4']);
const internalLinks = new Set();
const pageCache = new Map();

function check(group, subject, test, pass, detail = '') {
  checks.push({ group, subject, test, pass: Boolean(pass), ...(detail ? { detail } : {}) });
}
function decode(value = '') {
  return value.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
}
function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)]
    .map((match) => [match[1].toLowerCase(), decode(match[2] ?? match[3])]));
}
function tags(html, name) {
  return [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'gi'))].map((match) => attributes(match[0]));
}
function schemaObjects(value) {
  if (Array.isArray(value)) return value.flatMap(schemaObjects);
  if (value && typeof value === 'object') return [value, ...schemaObjects(value['@graph'])];
  return [];
}
function localPath(value) {
  if (!value || /^(?:#|mailto:|tel:|data:|javascript:)/i.test(value)) return null;
  const url = new URL(value, base);
  if (![base.origin, production.origin].includes(url.origin)) return null;
  return `${url.pathname}${url.search}`;
}
function publicUrl(path) {
  const url = new URL(path, production);
  return url.href.replace(/\/$/, '');
}
async function request(path, options = {}) {
  try {
    return await fetch(new URL(path, base), { signal: AbortSignal.timeout(30000), ...options });
  } catch (error) {
    check('network', path, 'request completed', false, error.message);
    return null;
  }
}
async function page(path) {
  if (!pageCache.has(path)) {
    pageCache.set(path, (async () => {
      const response = await request(path);
      return response ? { response, html: await response.text() } : null;
    })());
  }
  return pageCache.get(path);
}
async function concurrent(values, run, limit = 6) {
  let next = 0;
  await Promise.all(Array.from({ length: Math.min(limit, values.length) }, async () => {
    while (next < values.length) await run(values[next++]);
  }));
}

await concurrent(corePaths, async (path) => {
  const result = await page(path);
  if (!result) return;
  const { response, html } = result;
  const staticHtml = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
  const links = tags(staticHtml, 'link');
  const meta = tags(staticHtml, 'meta');
  const canonical = links.find((link) => link.rel === 'canonical')?.href;
  const prefix = path === '/en' || path.startsWith('/en/') ? '/en' : '';
  const unprefixed = prefix ? path.slice(3) || '/' : path;
  const title = /<title>([^<]+)<\/title>/i.exec(staticHtml)?.[1];
  check('core', path, 'HTTP 200', response.status === 200, `HTTP ${response.status}`);
  check('core', path, 'exactly one H1', tags(staticHtml, 'h1').length === 1);
  check('core', path, 'one main landmark with skip-link target', tags(staticHtml, 'main').length === 1 && tags(staticHtml, 'main')[0]?.id === 'main-content');
  check('seo', path, 'document language', tags(staticHtml, 'html')[0]?.lang === (prefix ? 'en' : 'no'));
  check('seo', path, 'title and description', Boolean(title) && Boolean(meta.find((item) => item.name === 'description')?.content));
  check('seo', path, 'self canonical', canonical?.replace(/\/$/, '') === publicUrl(path), canonical ?? 'missing');
  for (const [lang, expected] of [['no', unprefixed], ['en', `/en${unprefixed === '/' ? '' : unprefixed}`], ['x-default', unprefixed]]) {
    check('seo', path, `hreflang ${lang}`, links.some((link) => link.rel === 'alternate' && link.hreflang === lang && link.href?.replace(/\/$/, '') === publicUrl(expected)));
  }
  for (const property of ['og:title', 'og:description', 'og:url', 'og:image']) {
    check('seo', path, property, Boolean(meta.find((item) => item.property === property)?.content));
  }
  check('seo', path, 'large Twitter card', meta.some((item) => item.name === 'twitter:card' && item.content === 'summary_large_image'));
  const schemas = [];
  let parseError = '';
  for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    if (attributes(match[1]).type !== 'application/ld+json') continue;
    try { schemas.push(...schemaObjects(JSON.parse(match[2]))); }
    catch (error) { parseError = error.message; }
  }
  check('seo', path, 'valid initial JSON-LD', schemas.length > 0 && !parseError, parseError || `${schemas.length} schema objects`);
  for (const type of ['Organization', 'ProfessionalService']) {
    check('seo', path, `${type} in initial HTML`, schemas.some((item) => item['@type'] === type));
  }
  if (path.includes('/work/')) {
    for (const type of ['CreativeWork', 'BreadcrumbList']) {
      check('seo', path, `${type} in initial HTML`, schemas.some((item) => item['@type'] === type));
    }
    const creativeWork = schemas.find((item) => item['@type'] === 'CreativeWork');
    const creatorName = path.endsWith('/iso400-street-portraits') ? 'ISO400' : path.endsWith('/nyfane-website-study') ? 'Nyfane' : 'Syntax Studio';
    check('content trust', path, 'actual creator attribution', creativeWork?.creator?.name === creatorName);
    if (['ISO400', 'Nyfane'].includes(creatorName)) {
      check('content trust', path, 'no invented publication date or copyright year', creativeWork && !creativeWork.datePublished && !creativeWork.copyrightYear);
      check('content trust', path, 'study distinction in structured data', /study|studium|studioprosjekt|studio project/i.test(creativeWork?.genre || ''));
    }
    if (creatorName === 'Nyfane') check('content trust', path, 'website remains in development', creativeWork?.creativeWorkStatus === 'In development');
  }
  check('media', path, 'no video/source elements before play', tags(staticHtml, 'video').length === 0 && tags(staticHtml, 'source').length === 0);
  check('media', path, 'no video preload before play', !links.some((link) => link.rel === 'preload' && (link.as === 'video' || /\.(mp4|webm)(\?|$)/i.test(link.href || ''))));
  check('media', path, 'all initial images have alt attributes', tags(staticHtml, 'img').every((img) => Object.hasOwn(img, 'alt')));
  check('scripts', path, 'removed placeholder integrations absent', !/googletagmanager\.com|cdn\.iubenda\.com|cs\.iubenda\.com/.test(html));
  for (const tag of [...tags(staticHtml, 'img'), ...tags(html, 'script'), ...links.filter((link) => ['stylesheet', 'icon', 'shortcut icon', 'apple-touch-icon', 'preload'].includes(link.rel))]) {
    const asset = localPath(tag.src || tag.href);
    if (!asset) continue;
    assets.add(asset);
    const original = new URL(asset, base).searchParams.get('url');
    if (original) {
      const originalPath = localPath(original);
      if (originalPath) assets.add(originalPath);
    }
  }
  for (const item of meta.filter((item) => item.property === 'og:image')) {
    const asset = localPath(item.content);
    if (asset) assets.add(asset);
  }
  for (const link of tags(staticHtml, 'a')) {
    const path = localPath(link.href);
    if (path) internalLinks.add(path);
  }
});

const redirects = [
  ['/about-us', '/studio'], ['/en/about-us', '/en/studio'],
  ['/book', '/contact'], ['/en/book', '/en/contact'],
  ['/services', '/work'], ['/en/services', '/en/work'],
  ['/pricing', '/contact'], ['/en/pricing', '/en/contact'],
  ['/work/fcr', '/work'], ['/en/work/fcr', '/en/work'],
  ['/work/jonk', '/work/burger'], ['/en/work/jonk', '/en/work/burger'],
  ['/en/blog', '/blog'], ['/en/blog/seo-grunnleggende-2026', '/blog/seo-grunnleggende-2026'],
  ['/blog/ostbanehallen-westerlin-bjorndalen', '/blog/eventproduksjon-ostbanehallen'],
  ['/blog/samarbeid-med-jonk', '/blog'], ['/en/blog/samarbeid-med-jonk', '/blog/samarbeid-med-jonk'],
  ['/no', '/'], ['/no/work', '/work'], ['/about-us?from=http-qa', '/studio?from=http-qa'],
];
await concurrent(redirects, async ([path, expected]) => {
  const response = await request(path, { redirect: 'manual' });
  if (!response) return;
  check('redirects', path, 'permanent redirect', [301, 308].includes(response.status), `HTTP ${response.status}`);
  const destination = localPath(response.headers.get('location'));
  check('redirects', path, 'expected destination', destination === expected, destination ?? 'missing Location');
  const final = await page(path);
  if (final) check('redirects', path, 'destination resolves to HTTP 200', final.response.status === 200, final.response.url);
});

for (const path of ['/http-qa-deliberately-unknown-route', '/en/http-qa-deliberately-unknown-route']) {
  const result = await page(path);
  if (result) check('fallback', path, 'HTTP 404', result.response.status === 404, `HTTP ${result.response.status}`);
}
for (const path of ['/work/tokyo', '/en/work/tokyo']) {
  const result = await page(path);
  if (!result) continue;
  check('fallback', path, 'holding page HTTP 200', result.response.status === 200);
  check('fallback', path, 'noindex metadata', tags(result.html, 'meta').some((item) => item.name === 'robots' && /\bnoindex\b/.test(item.content)));
}

const sitemap = await page('/sitemap.xml');
let sitemapPaths = [];
if (sitemap) {
  check('discovery', '/sitemap.xml', 'HTTP 200 XML', sitemap.response.status === 200 && /xml/.test(sitemap.response.headers.get('content-type')));
  sitemapPaths = [...sitemap.html.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => localPath(decode(match[1]))).filter(Boolean);
  check('discovery', '/sitemap.xml', 'core routes included', corePaths.every((path) => sitemapPaths.includes(path)));
  check('discovery', '/sitemap.xml', 'Tokyo and obsolete top-level URLs excluded', !sitemapPaths.some((path) => /\/work\/(tokyo|fcr|jonk)$|\/(about-us|book|pricing|services)$|^\/en\/blog/.test(path)));
  await concurrent(sitemapPaths, async (path) => {
    const result = await page(path);
    if (result) check('sitemap routes', path, 'HTTP 200', result.response.status === 200, `HTTP ${result.response.status}`);
  });
}
const robots = await page('/robots.txt');
if (robots) {
  check('discovery', '/robots.txt', 'HTTP 200', robots.response.status === 200);
  check('discovery', '/robots.txt', 'production sitemap declared', robots.html.includes('Sitemap: https://syntaxstudio.no/sitemap.xml'));
  check('discovery', '/robots.txt', 'API excluded for general crawler', /Disallow: \/api\//.test(robots.html));
}

await concurrent([...internalLinks], async (path) => {
  const result = await page(path);
  if (result) check('core internal links', path, 'resolves to HTTP 200', result.response.status === 200, `HTTP ${result.response.status}`);
});
await concurrent([...assets], async (path) => {
  const generatedSocialImage = new URL(path, base).pathname.endsWith('/opengraph-image');
  const response = await request(path, { method: generatedSocialImage ? 'GET' : 'HEAD' });
  if (!response) return;
  check('assets', path, 'HTTP 200 asset', response.status === 200 && !/text\/html/.test(response.headers.get('content-type') || ''), `HTTP ${response.status}; ${response.headers.get('content-type')}`);
  if (generatedSocialImage) {
    try {
      const bytes = new Uint8Array(await response.arrayBuffer());
      const pngSignature = [137, 80, 78, 71, 13, 10, 26, 10];
      const validPng = bytes.length >= 24 && pngSignature.every((value, index) => bytes[index] === value);
      check('social image bodies', path, 'complete PNG response', validPng && response.headers.get('content-type') === 'image/png', `${bytes.length} bytes`);
      const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
      const width = validPng ? view.getUint32(16) : 0;
      const height = validPng ? view.getUint32(20) : 0;
      check('social image bodies', path, '1200x630 dimensions', width === 1200 && height === 630, `${width}x${height}`);
    } catch (error) {
      check('social image bodies', path, 'response body completed', false, error.message);
    }
  }
});

const failed = checks.filter((item) => !item.pass);
const groups = Object.fromEntries([...new Set(checks.map((item) => item.group))].map((group) => {
  const items = checks.filter((item) => item.group === group);
  return [group, { passed: items.filter((item) => item.pass).length, total: items.length }];
}));
const report = {
  checkedAt: new Date().toISOString(), baseUrl: base.href,
  method: 'Node native fetch against initial HTML and HTTP resources; no browser or real email submission',
  counts: { coreRoutes: corePaths.length, sitemapRoutes: sitemapPaths.length, redirects: redirects.length, internalLinks: internalLinks.size, assets: assets.size, passed: checks.length - failed.length, failed: failed.length, total: checks.length },
  groups, failures: failed, checks,
};
console.log(JSON.stringify({ ...report, checks: undefined }, null, 2));
if (reportPath) await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`);
process.exitCode = failed.length ? 1 : 0;
