import { StrictMode, useEffect, useState, type ReactNode } from 'react';
import { CampaignLinks, campaignLinksForSource } from './attribution';
import { createRoot, hydrateRoot } from 'react-dom/client';

function CampaignPage({ children }: { children: ReactNode }) {
  const [links, setLinks] = useState(() => campaignLinksForSource(null));
  useEffect(() => {
    const source = new URLSearchParams(window.location.search).get('utm_source');
    setLinks(campaignLinksForSource(source, document.referrer));
  }, []);
  return <CampaignLinks.Provider value={links}>{children}</CampaignLinks.Provider>;
}

export function mountPage(page: ReactNode) {
  const root = document.getElementById('root')!;
  const content = <StrictMode><CampaignPage>{page}</CampaignPage></StrictMode>;
  const options = { identifierPrefix: 'airlock-' };

  if (root.hasChildNodes()) hydrateRoot(root, content, options);
  else createRoot(root, options).render(content);
}
