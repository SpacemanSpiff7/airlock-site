import { useContext, type ReactNode } from 'react';
import { CampaignLinks } from '../attribution';
import appIcon from '../assets/app-icon.png';

type PageName = 'home' | 'privacy' | 'support' | 'study';

interface SiteChromeProps {
  current: PageName;
  children: ReactNode;
  tone?: 'night' | 'paper' | 'sky';
}

const routes = {
  home: { fromHome: './', fromInside: '../' },
  privacy: { fromHome: './privacy/', fromInside: '../privacy/' },
  support: { fromHome: './support/', fromInside: '../support/' },
  study: { fromHome: './study/', fromInside: '../study/' }
};

export function SiteChrome({ current, children, tone = 'night' }: SiteChromeProps) {
  const inside = current !== 'home';
  const { siteSearch } = useContext(CampaignLinks);
  const link = (page: PageName) => (inside ? routes[page].fromInside : routes[page].fromHome) + siteSearch;

  return (
    <div className={`site-shell tone-${tone}`}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <a className="wordmark" href={link('home')} aria-label="Airlock home">
          <img src={appIcon} alt="" width="38" height="38" />
          <span>Airlock</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href={link('privacy')} aria-current={current === 'privacy' ? 'page' : undefined}>
            Privacy
          </a>
          <a href={link('support')} aria-current={current === 'support' ? 'page' : undefined}>
            Support
          </a>
        </nav>
      </header>
      {children}
      <footer className="site-footer">
        <p className="copyright">© 2026 Airlock.</p>
        <div className="footer-links">
          <a href={link('study')} aria-current={current === 'study' ? 'page' : undefined}>Study guide</a>
          <a href={link('privacy')}>Privacy</a>
          <a href={link('support')}>Support</a>
          {current === 'home' && (
            <a href="https://www.instagram.com/airlockapp/" rel="noreferrer">Instagram</a>
          )}
        </div>
      </footer>
    </div>
  );
}
