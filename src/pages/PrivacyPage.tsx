import { SiteChrome } from '../components/SiteChrome';

export function PrivacyPage() {
  return (
    <SiteChrome current="privacy" tone="paper">
      <main id="main" className="document-main">
        <header className="document-heading">
          <p className="eyebrow">The plain-language version</p>
          <h1>Privacy</h1>
          <p className="document-lede">
            Airlock is local-first. Your breathing activity, Airtime, and Screen Time choices stay on your iPhone.
          </p>
          <p className="updated">Last updated August 31, 2026</p>
        </header>

        <article className="document-body">
          <section>
            <h2>The short version</h2>
            <p>
              Airlock does not collect personal data. The app has no accounts, analytics, advertising SDKs,
              third-party trackers, cloud sync, subscriptions, or in-app purchases.
            </p>
          </section>

          <section>
            <h2>Data stored on your device</h2>
            <p>Airlock stores the information it needs to work locally, including:</p>
            <ul>
              <li>Opaque Screen Time tokens for the apps and web domains you choose to block.</li>
              <li>Your Airtime ledger, daily breathing activity, flowers, and morning gate state.</li>
              <li>Settings shared between Airlock and its Screen Time extensions.</li>
              <li>
                If you set a commitment PIN, a salted verifier is stored in the iOS Keychain. Airlock does not
                store the PIN itself.
              </li>
            </ul>
            <p>
              Most of this information lives in Airlock’s app container or App Group container so the app and its
              extensions can coordinate protection.
            </p>
          </section>

          <section>
            <h2>Apple permissions</h2>
            <p>
              Airlock asks for Apple Screen Time authorization to shield the apps and web domains you select. Apple
              provides Airlock with opaque selection tokens rather than your browsing history or the contents of
              other apps.
            </p>
            <p>
              Airlock may also request notification permission for local, on-device reminders and for returning you
              from a Screen Time shield to the main app. You can change these permissions in iOS Settings.
            </p>
          </section>

          <section>
            <h2>Sensors, biometrics, and health data</h2>
            <p>
              Airlock does not use the camera, microphone, motion sensors, or HealthKit. Guided breathing is
              honor-system only. If you choose Face ID or Touch ID for a protected action, iOS performs the check;
              Airlock receives only whether it succeeded.
            </p>
            <p>Airlock is not a medical device, diagnosis tool, or treatment.</p>
          </section>

          <section>
            <h2>Sharing and transmission</h2>
            <p>
              Airlock does not sell, share, or transmit your app data to us, advertisers, data brokers, or analytics
              providers. There is no Airlock server that receives this data.
            </p>
          </section>

          <section>
            <h2>Retention and deletion</h2>
            <p>
              Your Airlock data remains on your device while you use the app. Deleting the app removes its app and
              App Group data under Apple’s platform behavior. A commitment PIN verifier stored in Keychain may
              persist across a reinstall; you can remove it through Airlock’s PIN reset controls before deleting the
              app.
            </p>
            <p>
              Because Airlock has no account or server copy, we cannot view or remotely delete your local data.
            </p>
          </section>

          <section>
            <h2>Changes</h2>
            <p>
              If Airlock’s data practices change, this policy will be updated before the change is released. The
              “last updated” date above shows the current version.
            </p>
          </section>

          <section>
            <h2>Contact</h2>
            <p>
              Questions about privacy? Email <a href="mailto:contact@curlbro.com">contact@curlbro.com</a>.
            </p>
          </section>
        </article>
      </main>
    </SiteChrome>
  );
}
