import { createContext } from 'react';

const websiteLinks = {
  appStoreUrl: 'https://apps.apple.com/app/apple-store/id6808816509?pt=128785261&ct=website&mt=8',
  siteSearch: ''
};

const instagramLinks = {
  appStoreUrl: 'https://apps.apple.com/app/apple-store/id6808816509?pt=128785261&ct=instagram_bio&mt=8',
  siteSearch: '?utm_source=ig'
};

export const CampaignLinks = createContext(websiteLinks);

export function campaignLinksForSource(source: string | null) {
  const normalizedSource = source?.trim().toLowerCase();
  return normalizedSource === 'ig' || normalizedSource === 'instagram' ? instagramLinks : websiteLinks;
}
