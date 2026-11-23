import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import assert from 'node:assert/strict';
import { after, test } from 'node:test';
import { readFile, stat } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createServer } from 'vite';

const origin = 'https://airlockapp.org';
const pages = [
  ['/', 'index.html', [
    'Breathe before', 'App Blocking is optional:', 'The flower can change as the day goes.',
    'By default, 15 seconds of guided breathing in Airlock earns 5 minutes of Airtime.',
    'Unlock for a few minutes.', 'Your breathing and blocking records stay on your iPhone.'
  ]],
  ['/privacy/', 'privacy/index.html', ['Data stored on your device', 'Optional developer tips', 'Optional Apple analytics and diagnostics', 'Retention and deletion', 'contact@airlockapp.org']],
  ['/support/', 'support/index.html', ['Tell us what happened.', 'Why does Airlock need Screen Time permission?', 'Where is my data?', 'How do I report a bug?', 'Use Airtime opens Airlock directly', 'You can also open Airlock yourself.', 'Unlock for 5 min', 'contact@airlockapp.org']],
  ['/study/', 'study/index.html', ['Name one concrete task.', 'Your next block', 'Return at', 'Next action', 'iOS 26 or later', 'no subscription', 'not endorsements of Airlock']]
];
const server = await createServer({ configLoader: 'runner', server: { middlewareMode: true, ws: false }, appType: 'custom' });
after(() => server.close());
const { render } = await server.ssrLoadModule('/src/entry-server.tsx');
const { CampaignLinks, campaignLinksForSource } = await server.ssrLoadModule('/src/attribution.ts');
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

test('robots permits crawling and sitemap contains exactly the canonical pages', async () => {
  const robots = await readFile('dist/robots.txt', 'utf8');
  assert.match(robots, /User-agent: \*\s+Allow: \/\s+Sitemap: https:\/\/airlockapp\.org\/sitemap\.xml/);
  assert.ok(!robots.includes('Disallow:'));
  const sitemap = await readFile('dist/sitemap.xml', 'utf8');
  assert.ok(sitemap.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'));
  assert.deepEqual([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]), pages.map(([route]) => origin + route));
});

test('only the homepage offers the native Safari banner for Airlock', async () => {
  for (const [route, file] of pages) {
    const html = await readFile(`dist/${file}`, 'utf8');
    const tags = html.match(/<meta\b[^>]*name="apple-itunes-app"[^>]*>/gi) ?? [];
    assert.equal(tags.length, route === '/' ? 1 : 0, route);
    if (route === '/') {
      assert.ok(html.slice(0, html.indexOf('</head>')).includes(tags[0]));
      const content = tags[0].match(/\bcontent="([^"]+)"/)[1];
      assert.equal(decode(content), 'app-id=6808816509, affiliate-data=pt=128785261&ct=website_safari');
    }
  }
});

test('the breathing demo offers a static first frame before motion preferences are known', async () => {
  const html = await readFile('dist/index.html', 'utf8');
  const video = html.match(/<video\b[^>]*>/)?.[0];
  assert.ok(video, 'Missing homepage breathing demo');
  assert.match(video, /poster="[^"]+"/);
  assert.match(video, /preload="none"/);
  assert.doesNotMatch(video, /\bautoplay\b/i);
});

test('the study guide offers both paper sizes as direct downloads before JavaScript', async () => {
  const html = await readFile('dist/study/index.html', 'utf8');
  for (const [size, label] of [['letter', 'US Letter'], ['a4', 'A4']]) {
    const href = `/study/airlock-study-guide-${size}.pdf`;
    assert.ok(html.includes(`<a href="${href}" download="">Download ${label} PDF</a>`));
    const file = await readFile(resolve('dist', `.${href}`));
    assert.equal(file.toString('ascii', 0, 5), '%PDF-');
  }
});

test('default and Instagram attribution preserve the exact App Store destination and campaign', () => {
  for (const [source, campaign] of [[null, 'website'], ['', 'website'], ['other', 'website'], ['ig', 'instagram_bio'], ['instagram', 'instagram_bio'], [' IG ', 'instagram_bio']]) {
    const links = campaignLinksForSource(source);
    const url = new URL(links.appStoreUrl);
    assert.equal(links.siteSearch, campaign === 'instagram_bio' ? '?utm_source=ig' : '');
    assert.equal(url.origin + url.pathname, 'https://apps.apple.com/app/apple-store/id6808816509');
    assert.equal(url.searchParams.get('pt'), '128785261');
    assert.equal(url.searchParams.get('ct'), campaign);
    assert.equal(url.searchParams.get('mt'), '8');
  }
});

test('the Instagram homepage offers the published flower exercise after the download link', async () => {
  const { HomePage } = await server.ssrLoadModule('/src/pages/HomePage.tsx');
  const exercise = 'https://www.instagram.com/airlockapp/reel/DfNU9EsAreW/';
  for (const [source, expectedHref, label] of [
    [null, '#how-it-works', 'Meet Airlock'],
    ['newsletter', '#how-it-works', 'Meet Airlock'],
    ['ig', exercise, 'Take three breaths on Instagram'],
    ['Instagram', exercise, 'Take three breaths on Instagram']
  ]) {
    const value = campaignLinksForSource(source);
    const page = renderToStaticMarkup(createElement(CampaignLinks.Provider, { value }, createElement(HomePage)));
    const hero = decode(page.match(/<div class="hero-actions">(.*?)<\/div>/s)[1]);
    const links = [...hero.matchAll(/<a [^>]*href="([^"]+)"[^>]*>(.*?)<\/a>/gs)];
    assert.deepEqual(links.map(link => link[1]), [value.appStoreUrl, expectedHref]);
    assert.ok(links[0][2].startsWith('Download Airlock free'));
    assert.ok(links[1][2].startsWith(label));
  }
});

test('an Instagram visitor can open the study guide and keep the same download campaign', async () => {
  const { HomePage } = await server.ssrLoadModule('/src/pages/HomePage.tsx');
  const { StudyPage } = await server.ssrLoadModule('/src/pages/StudyPage.tsx');
  const renderLinks = (Page, source) => {
    const value = campaignLinksForSource(source);
    const html = renderToStaticMarkup(createElement(CampaignLinks.Provider, { value }, createElement(Page)));
    return [...html.matchAll(/href="([^"]+)"/g)].map(match => match[1].replaceAll('&amp;', '&'));
  };
  const home = renderLinks(HomePage, 'Instagram');
  const guide = home.find(href => href.startsWith('./study/'));
  assert.equal(guide, './study/?utm_source=ig');
  const study = renderLinks(StudyPage, new URL(guide, origin).searchParams.get('utm_source'));
  assert.ok(study.includes(campaignLinksForSource('ig').appStoreUrl));
  assert.ok(study.includes('../?utm_source=ig'));
  assert.ok(study.filter(href => href.includes('cornell.edu') || href.includes('unc.edu')).every(href => !href.includes('utm_source')));
  assert.ok(renderLinks(StudyPage, 'other').includes(campaignLinksForSource(null).appStoreUrl));
});

test('first render stays deterministic independently of the campaign query', () => {
  const baseline = render('/');
  assert.ok(baseline.includes(campaignLinksForSource(null).appStoreUrl.replaceAll('&', '&amp;')));
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

test('shared study guide uses a public worksheet image at its declared dimensions', async () => {
  const html = await readFile('dist/study/index.html', 'utf8');
  const imageUrl = origin + '/study/worksheet-preview.png';
  assert.ok(html.includes(`property="og:image" content="${imageUrl}"`));
  assert.ok(html.includes(`name="twitter:image" content="${imageUrl}"`));
  assert.ok(html.includes('name="twitter:card" content="summary_large_image"'));
  const png = await readFile('dist/study/worksheet-preview.png');
  assert.equal(png.toString('hex', 0, 8), '89504e470d0a1a0a');
  assert.ok(html.includes(`property="og:image:width" content="${png.readUInt32BE(16)}"`));
  assert.ok(html.includes(`property="og:image:height" content="${png.readUInt32BE(20)}"`));
  assert.match(html, /property="og:image:alt" content="[^"]*worksheet[^"]+"/i);
});
