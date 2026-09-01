import type { ReactNode } from 'react';
import appIcon from '../assets/app-icon.png';

type PageName = 'home' | 'privacy' | 'support';

interface SiteChromeProps {
  current: PageName;
  children: ReactNode;
  tone?: 'night' | 'paper' | 'sky';
}

const routes = {
  home: { fromHome: './', fromInside: '../' },
  privacy: { fromHome: './privacy/', fromInside: '../privacy/' },
  support: { fromHome: './support/', fromInside: '../support/' }
};

export function SiteChrome({ current, children, tone = 'night' }: SiteChromeProps) {
  const inside = current !== 'home';
  const link = (page: PageName) => (inside ? routes[page].fromInside : routes[page].fromHome);

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
        <div className="footer-mark" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <p>Made for a more intentional minute.</p>
        <div className="footer-links">
          <a href={link('privacy')}>Privacy</a>
          <a href={link('support')}>Support</a>
        </div>
        <p className="copyright">© {new Date().getFullYear()} Airlock</p>
      </footer>
    </div>
  );
}
