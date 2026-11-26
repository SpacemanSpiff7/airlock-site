import { createContext } from 'react';

export const flowerReelLink = {
  href: 'https://www.instagram.com/airlockapp/reel/DfNU9EsAreW/',
  label: 'Take three breaths on Instagram',
  arrow: '↗'
};

const websiteLinks = {
  secondaryHeroLink: { href: '#how-it-works', label: 'Meet Airlock', arrow: '↓' },
  appStoreUrl: 'https://apps.apple.com/app/apple-store/id6808816509?pt=128785261&ct=website&mt=8',
  siteSearch: ''
};

const instagramLinks = {
  secondaryHeroLink: flowerReelLink,
  appStoreUrl: 'https://apps.apple.com/app/apple-store/id6808816509?pt=128785261&ct=instagram_bio&mt=8',
  siteSearch: '?utm_source=ig'
};

export const CampaignLinks = createContext(websiteLinks);

export function campaignLinksForSource(source: string | null, referrer = '') {
  const normalizedSource = source?.trim().toLowerCase();
  const untaggedInstagramVisit = source === null && referrer.startsWith('https://l.instagram.com/');
  return normalizedSource === 'ig' || normalizedSource === 'instagram' || untaggedInstagramVisit
    ? instagramLinks
    : websiteLinks;
}
