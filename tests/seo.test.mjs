import assert from 'node:assert/strict';
import { after, test } from 'node:test';
import { readFile, stat } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createServer } from 'vite';

const origin = 'https://airlockapp.org';
const pages = [
  ['/', 'index.html', ['Breathe before', 'App Blocking is optional:', 'The flower can change as the day goes.', 'Unlock for a few minutes.', 'Your breathing and blocking records stay on your iPhone.']],
  ['/privacy/', 'privacy/index.html', ['Data stored on your device', 'Optional developer tips', 'Optional Apple analytics and diagnostics', 'Retention and deletion', 'contact@airlockapp.org']],
  ['/support/', 'support/index.html', ['Tell us what happened.', 'Why does Airlock need Screen Time permission?', 'Where is my data?', 'How do I report a bug?', 'contact@airlockapp.org']]
];
const server = await createServer({ configLoader: 'runner', server: { middlewareMode: true, ws: false }, appType: 'custom' });
after(() => server.close());
const { render } = await server.ssrLoadModule('/src/entry-server.tsx');
const { appStoreUrlForSource } = await server.ssrLoadModule('/src/attribution.ts');
const manifest = JSON.parse(await readFile('dist/.vite/manifest.json', 'utf8'));
const decode = value => value.replaceAll('&amp;', '&');

for (const [route, file, content] of pages) {
  test(`${route} has complete static content, semantic landmarks and matching canonical`, async () => {
    const html = await readFile(`dist/${file}`, 'utf8');
    assert.equal((html.match(/rel="canonical"/g) ?? []).length, 1);
    assert.ok(html.includes(`<link rel="canonical" href="${origin}${route}"`));
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
    assert.ok(html.includes('<main id="main"'));
    assert.ok(html.includes('<nav aria-label="Primary navigation"'));
    assert.ok(html.includes('<footer'));
    for (const text of content) assert.ok(html.includes(text), `Missing pre-JS content: ${text}`);
    // Compare the complete React render, not only a short list of SEO keywords.
    const rendered = render(route).replace(/\b(src|poster|href)="(\/src\/assets\/[^"?]+)"/g, (_, attribute, source) => {
      assert.ok(manifest[source.slice(1)], `Missing manifest asset: ${source}`);
      return `${attribute}="/${manifest[source.slice(1)].file}"`;
    });
    assert.ok(html.includes(`<div id="root">${rendered}</div>`));
    assert.ok(!html.includes('/src/'), 'Production HTML must not request source assets');
  });

  test(`${route} links, images, posters, scripts and styles resolve before JavaScript`, async () => {
    const html = await readFile(`dist/${file}`, 'utf8');
    for (const [, raw] of html.matchAll(/\b(?:src|poster|href)="([^"]+)"/g)) {
      const url = new URL(decode(raw), `${origin}${route}`);
      if (url.origin !== origin) continue;
      const target = url.pathname.endsWith('/') ? `${url.pathname}index.html` : url.pathname;
      const path = resolve('dist', `.${target}`);
      assert.ok((await stat(path)).size > 0, `Missing or empty local resource: ${raw}`);
      if (url.hash) {
        const targetHtml = await readFile(path, 'utf8');
        assert.ok(targetHtml.includes(`id="${url.hash.slice(1)}"`), `Missing link anchor: ${raw}`);
      }
    }
    const cssUrls = [...html.matchAll(/<link[^>]+href="([^"]+\.css)"/g)];
    assert.ok(cssUrls.length > 0, 'Static page must load styles');
    for (const [, cssUrl] of cssUrls) {
      const css = await readFile(resolve('dist', `.${cssUrl}`), 'utf8');
      for (const [, raw] of css.matchAll(/url\(["']?([^\)"']+)["']?\)/g)) {
        if (raw.startsWith('data:')) continue;
        const asset = new URL(raw, origin + cssUrl);
        assert.ok((await stat(resolve('dist', `.${asset.pathname}`))).size > 0, `Missing CSS asset: ${raw}`);
      }
    }
  });
}

test('robots permits crawling and sitemap contains exactly the three canonical pages', async () => {
  const robots = await readFile('dist/robots.txt', 'utf8');
  assert.match(robots, /User-agent: \*\s+Allow: \/\s+Sitemap: https:\/\/airlockapp\.org\/sitemap\.xml/);
  assert.ok(!robots.includes('Disallow:'));
  const sitemap = await readFile('dist/sitemap.xml', 'utf8');
  assert.ok(sitemap.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'));
  assert.deepEqual([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]), pages.map(([route]) => origin + route));
});

test('default and Instagram attribution preserve the exact App Store destination and campaign', () => {
  for (const [source, campaign] of [[null, 'website'], ['', 'website'], ['other', 'website'], ['ig', 'instagram_bio'], ['instagram', 'instagram_bio'], [' IG ', 'instagram_bio']]) {
    const url = new URL(appStoreUrlForSource(source));
    assert.equal(url.origin + url.pathname, 'https://apps.apple.com/app/apple-store/id6808816509');
    assert.equal(url.searchParams.get('pt'), '128785261');
    assert.equal(url.searchParams.get('ct'), campaign);
    assert.equal(url.searchParams.get('mt'), '8');
  }
});

test('first render stays deterministic independently of the campaign query', () => {
  const baseline = render('/');
  assert.ok(baseline.includes(appStoreUrlForSource(null).replaceAll('&', '&amp;')));
  // Reading the campaign waits for the effect, so initial hydration can match the static document.
  for (const search of ['', '?utm_source=ig', '?utm_source=instagram']) {
    globalThis.window = { location: { search } };
    try { assert.equal(render('/'), baseline); }
    finally { delete globalThis.window; }
  }
  const ids = [...baseline.matchAll(/id="(curve-[^"]+)"/g)].map(match => match[1]);
  assert.equal(ids.length, 1);
  assert.equal(new Set(ids).size, ids.length);
  assert.ok(ids[0].includes('airlock-'));
});
