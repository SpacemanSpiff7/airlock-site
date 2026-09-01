import { SiteChrome } from '../components/SiteChrome';

export function PrivacyPage() {
  return (
    <SiteChrome current="privacy" tone="paper">
      <main id="main" className="document-main">
        <header className="document-heading">
          <p className="eyebrow">Airlock privacy</p>
          <h1>Privacy</h1>
          <p className="document-lede">
            Airlock keeps its app data on your iPhone. We cannot see your breathing activity, Airtime, or Screen
            Time choices.
          </p>
          <p className="updated">Last updated August 31, 2026</p>
        </header>

        <article className="document-body">
          <section>
            <h2>The short version</h2>
            <p>
              Airlock does not collect personal data, track how you use the app, or show ads. There is no Airlock
              account.
            </p>
          </section>

          <section>
            <h2>Data stored on your device</h2>
            <p>Airlock saves the information it needs on your iPhone:</p>
            <ul>
              <li>
                The apps and websites you choose to block. Airlock uses Apple’s Screen Time selections but does not
                receive your browsing history or the contents of other apps.
              </li>
              <li>Airtime earned and used, breathing history, daily flowers, and morning protection.</li>
              <li>Your Airlock settings.</li>
              <li>
                If you set a commitment PIN, Airlock stores a secure record used to verify it in the iOS Keychain—not
                the PIN itself.
              </li>
            </ul>
          </section>

          <section>
            <h2>Apple permissions</h2>
            <p>
              Airlock asks for Screen Time permission so it can block the apps and websites you select. Apple lets
              Airlock use those selections without providing your browsing history or data from inside other apps.
            </p>
            <p>
              Airlock may ask for notification permission to send reminders and bring you back to Airlock when you
              request access from a blocked app. These notifications are created on your iPhone. You can change
              permissions in iOS Settings.
            </p>
          </section>

          <section>
            <h2>Sensors, biometrics, and health data</h2>
            <p>
              Airlock guides breathing timing but does not watch or record you. It does not use the camera,
              microphone, motion sensors, or HealthKit. If Airlock asks for Face ID or Touch ID to confirm a change,
              iOS performs the check and tells Airlock only whether it succeeded.
            </p>
            <p>Airlock is not a medical device, diagnosis tool, or treatment.</p>
          </section>

          <section>
            <h2>Sharing</h2>
            <p>
              Airlock does not send your app activity to us or third parties. It contains no ads or tracking tools.
            </p>
          </section>

          <section>
            <h2>Retention and deletion</h2>
            <p>
              Your Airlock data stays on your iPhone while the app is installed. Deleting Airlock removes the data
              stored with the app. If you set a commitment PIN, its secure verification record may remain in the iOS
              Keychain after a reinstall. You can remove it using Airlock’s PIN reset before deleting the app.
            </p>
            <p>
              Airlock does not keep a copy of your data, so we cannot view or delete it for you.
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
