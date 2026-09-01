import { SiteChrome } from '../components/SiteChrome';

export function SupportPage() {
  return (
    <SiteChrome current="support" tone="sky">
      <main id="main" className="support-main">
        <header className="support-heading">
          <p className="eyebrow">Support</p>
          <h1>Tell us what happened.</h1>
          <p>Include your iOS version, Airlock version, and the steps that led to the problem.</p>
          <a className="email-link" href="mailto:contact@curlbro.com?subject=Airlock%20support">
            contact@curlbro.com <span aria-hidden="true">↗</span>
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
              microphone, motion sensors, or HealthKit.
            </p>
          </details>

          <details>
            <summary>Where is my data?</summary>
            <p>
              On your iPhone. Airlock does not send us a copy of your app activity.
            </p>
          </details>

          <details>
            <summary>An app did not block or unlock correctly.</summary>
            <p>
              Check that Screen Time and Notifications are allowed for Airlock, then restart the app. If the problem
              continues, email us with your iPhone model and iOS version.
            </p>
          </details>

          <details>
            <summary>How do I report a bug?</summary>
            <p>
              Tell us what you did, what you expected, and what happened. Add a screenshot only if it helps, and
              leave out private information.
            </p>
          </details>
        </section>
      </main>
    </SiteChrome>
  );
}
