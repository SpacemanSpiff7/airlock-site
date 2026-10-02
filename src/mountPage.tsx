import { StrictMode, type ReactNode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';

export function mountPage(page: ReactNode) {
  const root = document.getElementById('root')!;
  const content = <StrictMode>{page}</StrictMode>;
  const options = { identifierPrefix: 'airlock-' };

  if (root.hasChildNodes()) hydrateRoot(root, content, options);
  else createRoot(root, options).render(content);
}
