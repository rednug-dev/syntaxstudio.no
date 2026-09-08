import {writeFile} from 'node:fs/promises';

const base = process.env.VERIFY_BASE_URL || 'http://localhost:3020';
const checks = [];
const check = (name, pass) => checks.push({name, pass: Boolean(pass)});
const paths = ['/explore/frame-to-frame', '/en/explore/frame-to-frame'];
const assets = new Set();
for (const path of paths) {
  const response = await fetch(base + path, {headers: {'Accept-Language': path.startsWith('/en/') ? 'en' : 'no'}});
  const html = await response.text();
  const no = !path.startsWith('/en/');
  check(`${path} responds`, response.status === 200);
  check(`${path} locale`, html.includes(`<html lang="${no ? 'no' : 'en'}"`));
  check(`${path} single heading`, (html.match(/<h1\b/g) || []).length === 1);
  check(`${path} preview is noindex`, /<meta name="robots" content="noindex, follow"/.test(html));
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  check(`${path} canonical retains public home`, canonical && new URL(canonical).href === `https://syntaxstudio.no${no ? '/' : '/en'}`);
  check(`${path} no initial film element`, !/<video\b/.test(html));
  check(`${path} complete static fallback`, html.includes('data-motion="off"'));
  check(`${path} hero work present`, html.includes('burgercrop.webp'));
  check(`${path} original whole mark`, html.includes('syntaxnylogoutenundertekst.svg'));
  check(`${path} study disclosure`, html.includes(no ? 'Under utvikling' : 'In development'));
  check(`${path} actual film credit`, html.includes('Film / Syntax Studio'));
  check(`${path} own work navigation`, html.includes(`href="${no ? '' : '/en'}/explore/frame-to-frame#c-work"`));
  check(`${path} own practices navigation`, html.includes(`href="${no ? '' : '/en'}/explore/frame-to-frame#c-practices"`));
  check(`${path} native format controls`, html.includes(`aria-label="${no ? 'Velg komposisjonens format' : 'Choose the composition format'}"`) && /<button[^>]+aria-pressed="true"/.test(html));
  check(`${path} composition is explicitly a study`, html.includes(no ? 'Syntax komposisjonsstudium / Eksisterende kampanjemateriell' : 'Syntax composition study / Existing campaign assets'));
  for (const match of html.matchAll(/<img[^>]+src="([^"]+)"/g)) assets.add(match[1].replaceAll('&amp;', '&'));
}
const results = await Promise.all([...assets].map(async src => ({src, response: await fetch(new URL(src, base))})));
for (const {src, response} of results) {
  check(`image ${src}`, response.ok && (response.headers.get('content-type') || '').startsWith('image/'));
  await response.arrayBuffer();
}
const sitemap = await (await fetch(base + '/sitemap.xml')).text();
check('C remains excluded from public sitemap', !sitemap.includes('/explore/'));
const homepage = await (await fetch(base + '/en')).text();
check('A retains its composition', homepage.includes('composition-stage'));
check('A retains normal Work navigation', homepage.includes('href="/en/work"'));
check('A does not inherit C markup', !homepage.includes('frame-opening'));
const report = {checkedAt: new Date().toISOString(), base, method: 'Native HTTP only; no mail or browser input', passed: checks.filter(c => c.pass).length, total: checks.length, failures: checks.filter(c => !c.pass), checks};
await writeFile('docs/rebrand/option-c-http.json', JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({...report, checks: undefined}, null, 2));
if (report.failures.length) process.exitCode = 1;
