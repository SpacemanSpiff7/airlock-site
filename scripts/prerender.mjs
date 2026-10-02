import { readFile, writeFile } from 'node:fs/promises';
import { createServer } from 'vite';

const pages = [['/', 'index.html'], ['/privacy/', 'privacy/index.html'], ['/support/', 'support/index.html']];
const manifest = JSON.parse(await readFile('dist/.vite/manifest.json', 'utf8'));
const assets = new Map(Object.entries(manifest).map(([source, entry]) => [`/${source}`, `/${entry.file}`]));
const server = await createServer({ configLoader: 'runner', server: { middlewareMode: true, ws: false }, appType: 'custom' });

try {
  const { render } = await server.ssrLoadModule('/src/entry-server.tsx');
  for (const [route, file] of pages) {
    const template = await readFile(`dist/${file}`, 'utf8');
    // SSR module imports point at source assets; use the client build's hashed URLs.
    const content = render(route).replace(/\b(src|poster|href)="(\/src\/assets\/[^"?]+)"/g, (_, attribute, source) => {
      const asset = assets.get(source);
      if (!asset) throw new Error(`Missing built asset: ${source}`);
      return `${attribute}="${asset}"`;
    });
    const placeholder = '<div id="root"></div>';
    if (!template.includes(placeholder)) throw new Error(`Missing root placeholder: ${file}`);
    await writeFile(`dist/${file}`, template.replace(placeholder, `<div id="root">${content}</div>`));
    console.log(`Prerendered ${route}`);
  }
} finally {
  await server.close();
}
