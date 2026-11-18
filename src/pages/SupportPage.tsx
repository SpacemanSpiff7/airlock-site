import { SiteChrome } from '../components/SiteChrome';

export function SupportPage() {
  return (
    <SiteChrome current="support" tone="sky">
      <main id="main" className="support-main">
        <header className="support-heading">
          <p className="eyebrow">Support</p>
          <h1>Tell us what happened.</h1>
          <p>Email us for help, or share what you tried first in Airlock and how it went.</p>
          <a className="email-link" href="mailto:contact@airlockapp.org?subject=Airlock%20support">
            contact@<wbr />airlockapp.org <span aria-hidden="true">↗</span>
          </a>
        </header>

        <section className="faq" aria-labelledby="faq-title">
          <p className="section-number">Common questions</p>
          <h2 id="faq-title">Common questions.</h2>

          <details>
            <summary>Why does Airlock need Screen Time permission?</summary>
            <p>
              Airlock uses Apple’s Screen Time permission to block only the apps and websites you select. You can
              change that permission in iOS Settings.
            </p>
          </details>

          <details>
            <summary>Does Airlock watch or record me breathing?</summary>
            <p>
              No. Airlock guides the timing but does not watch or record you. It does not use your camera,
              microphone, or HealthKit. It reads device tilt only to animate the flower on your iPhone; tilt is
              never used to verify breathing, stored, or sent anywhere.
            </p>
          </details>

          <details>
            <summary>Where is my data?</summary>
            <p>
              On your iPhone. Airlock does not send us a copy of your app activity.
            </p>
          </details>

          <details>
            <summary>Why can I still open an app I chose to block?</summary>
            <p>
              Open Greenhouse in Airlock to check whether an unlock is active. If no unlock is active,
              open Airlock’s Settings. Under Permissions, check that Screen Time is allowed. Under Unlock Settings,
              check your selection in Apps &amp; websites and save any changes.
            </p>
          </details>

          <details>
            <summary>I tapped Use Airtime. How do I finish unlocking?</summary>
            <p>
              On iOS 26.5 or later, Use Airtime opens Airlock directly. On iOS 26.0 through 26.4, tap the Airlock
              notification if it appears. You can also open Airlock yourself.
            </p>
            <p>
              In Greenhouse, choose how long you need, then tap the matching button, such as <strong>Unlock for 5 min</strong>. If you need more Airtime, earn it in Breathe. If Morning Lock is
              active, complete its breathing exercise or wait timer first.
            </p>
          </details>

          <details>
            <summary>How do I report a bug?</summary>
            <p>
              Include your iPhone model, iOS version, and Airlock version. Tell us the steps you took, what you
              expected, and what happened. Add a screenshot only if it helps, and leave out private information.
            </p>
          </details>
        </section>
      </main>
    </SiteChrome>
  );
}
