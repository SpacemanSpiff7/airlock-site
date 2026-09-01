import { SiteChrome } from '../components/SiteChrome';

export function SupportPage() {
  return (
    <SiteChrome current="support" tone="sky">
      <main id="main" className="support-main">
        <header className="support-heading">
          <p className="eyebrow">Airlock support</p>
          <h1>Let’s get you unstuck.</h1>
          <p>Send a note and include your iOS version, Airlock version, and what happened just before the problem.</p>
          <a className="email-link" href="mailto:contact@curlbro.com?subject=Airlock%20support">
            contact@curlbro.com <span aria-hidden="true">↗</span>
          </a>
        </header>

        <section className="faq" aria-labelledby="faq-title">
          <p className="section-number">Common questions</p>
          <h2 id="faq-title">A few useful answers.</h2>

          <details>
            <summary>Why does Airlock need Screen Time permission?</summary>
            <p>
              Airlock uses Apple’s Screen Time frameworks to shield only the apps and web domains you select. You
              can change or revoke that authorization in iOS Settings.
            </p>
          </details>

          <details>
            <summary>Does Airlock watch or record me breathing?</summary>
            <p>
              No. Breathing is honor-system only. Airlock does not use your camera, microphone, motion sensors, or
              HealthKit.
            </p>
          </details>

          <details>
            <summary>Where is my data?</summary>
            <p>
              On your iPhone. Airlock has no account, cloud sync, analytics, advertising SDKs, or server copy of
              your app activity.
            </p>
          </details>

          <details>
            <summary>A shield or notification did not behave as expected.</summary>
            <p>
              Confirm that Screen Time and notification permissions are enabled for Airlock, then restart the app.
              If it continues, email us with your iPhone model and iOS version.
            </p>
          </details>

          <details>
            <summary>How do I report a bug?</summary>
            <p>
              Email the address above with the steps you took, what you expected, what happened instead, and a
              screenshot if it is helpful. Please do not include sensitive information.
            </p>
          </details>
        </section>
      </main>
    </SiteChrome>
  );
}
