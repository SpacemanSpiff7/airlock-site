import { SiteChrome } from '../components/SiteChrome';

export function PrivacyPage() {
  return (
    <SiteChrome current="privacy" tone="paper">
      <main id="main" className="document-main">
        <header className="document-heading">
          <p className="eyebrow">Airlock privacy</p>
          <h1>Privacy</h1>
          <p className="document-lede">
            Airlock keeps its breathing and blocking records on your iPhone. We cannot see your breathing history,
            Airtime, or Screen Time choices.
          </p>
          <p className="updated">Last updated: 2026-09-17</p>
        </header>

        <article className="document-body">
          <section>
            <h2>The short version</h2>
            <p>
              Airlock has no account, ads, or third-party analytics. Apple may share optional usage statistics and crash
              information with us through its developer tools, as described below.
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
              <li>Airtime earned and used, breathing history, daily flowers, and Morning Lock.</li>
              <li>Unlock sessions and your one-minute wrap-up allowance.</li>
              <li>Your Airlock settings.</li>
              <li>
                If you turn on PIN Protection, Airlock stores a secure PIN record used to verify it in the iOS
                Keychain—not the PIN itself.
              </li>
            </ul>
          </section>

          <section>
            <h2>Optional developer tips</h2>
            <p>
              Apple processes optional tips through the App Store. Airlock does not receive your payment card
              details. Airlock checks Apple’s purchase confirmation and remembers on your device that you tipped
              so it can show a thank-you. It may recover that acknowledgement from your App Store purchase history
              after a reinstall. Tips do not change access to any app feature or grant Airtime.
            </p>
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
            <h2>Optional Apple analytics and diagnostics</h2>
            <p>
              If you choose to share app analytics with developers in iOS, Apple may provide us with usage statistics
              and crash information that are aggregated or do not personally identify you. We use Apple's reports
              to understand overall app use and improve reliability. Examples include app sessions, active devices,
              retention, and crashes.
            </p>
            <p>
              Airlock does not send custom feature-use events or upload your breathing history, Airtime, or Screen
              Time selections for these reports. There is no third-party analytics service or advertising tracking
              in Airlock.
            </p>
            <p>
              You control Apple's sharing in <strong>Settings → Privacy &amp; Security → Analytics &amp; Improvements
              → Share With App Developers</strong>. Airlock cannot change that choice. All Airlock features remain
              available whether you share or not. Apple handles this information under its{' '}
              <a href="https://www.apple.com/legal/privacy/data/en/app-analytics/">App Analytics &amp; Privacy notice</a>.
            </p>
          </section>

          <section>
            <h2>Sharing</h2>
            <p>
              Airlock does not upload your breathing and blocking records to us or third parties. Apple's optional
              reporting is separate from those local records. Airlock contains no ads or tools that track you
              across other companies' apps and websites.
            </p>
          </section>

          <section>
            <h2>Retention and deletion</h2>
            <p>
              Your Airlock data stays on your iPhone while the app is installed. Deleting Airlock removes the data
              stored with the app. If you turn on PIN Protection, its secure verification record may remain in the iOS
              Keychain after a reinstall. You can remove it using Airlock’s PIN reset before deleting the app.
              Deleting Airlock does not delete purchase records held by Apple.
            </p>
            <p>
              We do not keep a copy of your local Airlock records, so we cannot view or delete them for you. Apple
              manages information collected through its services under its own privacy policies.
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
              For privacy questions, contact <a href="mailto:contact@airlockapp.org">contact@airlockapp.org</a>.
            </p>
          </section>
        </article>
      </main>
    </SiteChrome>
  );
}
