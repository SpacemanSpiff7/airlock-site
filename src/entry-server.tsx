import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { HomePage } from './pages/HomePage';
import { PrivacyPage } from './pages/PrivacyPage';
import { SupportPage } from './pages/SupportPage';

const pages = { '/': HomePage, '/privacy/': PrivacyPage, '/support/': SupportPage };

export function render(path: keyof typeof pages) {
  const Page = pages[path];
  return renderToString(<StrictMode><Page /></StrictMode>, { identifierPrefix: 'airlock-' });
}
