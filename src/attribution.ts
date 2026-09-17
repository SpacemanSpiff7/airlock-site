const websiteUrl = 'https://apps.apple.com/app/apple-store/id6808816509?pt=128785261&ct=website&mt=8';
const instagramUrl = 'https://apps.apple.com/app/apple-store/id6808816509?pt=128785261&ct=instagram_bio&mt=8';

export function appStoreUrlForSource(source: string | null) {
  const normalizedSource = source?.trim().toLowerCase();
  return normalizedSource === 'ig' || normalizedSource === 'instagram' ? instagramUrl : websiteUrl;
}
