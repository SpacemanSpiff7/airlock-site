import appIcon from '../assets/app-icon.png';
import breathePoster from '../assets/screens/breathe-active.png';
import greenhouseScreen from '../assets/screens/greenhouse.png';
import breatheVideo from '../assets/video/breathe.mp4';
import CurvedLoop from '../components/CurvedLoop';
import { FlowerLifecycle } from '../components/FlowerLifecycle';
import GhostFibers from '../components/GhostFibers';
import { PhoneFrame } from '../components/PhoneFrame';
import { ScrollScrubVideo } from '../components/ScrollScrubVideo';
import { SiteChrome } from '../components/SiteChrome';

export function HomePage() {
  return (
    <SiteChrome current="home">
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <GhostFibers
            className="hero-fibers"
            lineColor="#5453c8"
            glowColor="#f08b83"
            speed={0.09}
            scale={1.65}
            rotation={-9}
            rotationSpeed={0.025}
            layers={5}
            waveAmplitude={0.012}
            waveFrequency={2.5}
            waveSpeed={0.09}
            twist={0.08}
            twistSpeed={0.3}
            lineFrequency={4.4}
            lineSpacing={1.4}
            lineSharpness={18}
            glowIntensity={0.72}
            brightness={1.42}
            blueBoost={1.05}
            vignette={0.62}
            grain={0}
            dpr={1}
            fps={30}
          />
          <div className="hero-orbit orbit-one" aria-hidden="true" />
          <div className="hero-orbit orbit-two" aria-hidden="true" />
          <div className="hero-copy">
            <p className="eyebrow">iPhone · Coming soon</p>
            <h1 id="hero-title">Airlock</h1>
            <p className="hero-line">Breathe before you scroll.</p>
            <p className="hero-explainer">
              Airlock blocks the apps and websites you choose. Finish a guided breathing session to earn Airtime,
              then use it to unlock them for a few minutes.
            </p>
            <a className="text-link" href="#how-it-works">
              See the basic loop <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="hero-emblem" aria-label="Airlock app icon">
            <div className="emblem-shadow" aria-hidden="true" />
            <img src={appIcon} alt="Airlock’s flower app icon" />
          </div>
        </section>

        <div className="flow-bridge">
          <CurvedLoop
            marqueeText="choose what gets blocked  ·  breathe  ·  earn Airtime  ·  unlock for a few minutes  ·  blocked again when the timer ends  ·  "
            speed={0.22}
            curveAmount={74}
            direction="right"
            className="flow-bridge-text"
          />
        </div>

        <FlowerLifecycle />

        <section className="product-story" id="how-it-works" aria-labelledby="product-story-title">
          <GhostFibers
            className="story-fibers"
            lineColor="#2f7881"
            glowColor="#c675ae"
            speed={0.06}
            scale={1.9}
            rotation={13}
            rotationSpeed={0.018}
            layers={4}
            waveAmplitude={0.016}
            waveFrequency={2.1}
            waveSpeed={0.07}
            twist={0.06}
            twistSpeed={0.22}
            lineFrequency={4.8}
            lineSpacing={1.55}
            lineSharpness={20}
            glowIntensity={0.46}
            brightness={1.18}
            blueBoost={1.04}
            vignette={0.68}
            grain={0}
            dpr={1}
            fps={24}
          />
          <div className="product-story-intro">
            <p className="section-number">The basic loop · 01 — 03</p>
            <h2 id="product-story-title">Here’s what happens in Airlock.</h2>
            <p>Choose what gets blocked. Breathe when you want Airtime. Use that Airtime for a short unlock.</p>
          </div>

          <article className="story-row story-protection">
            <div className="step-copy">
              <p className="step-number">01</p>
              <h3>Choose what gets blocked.</h3>
              <p>
                Pick apps, websites, or whole categories. Airlock uses Apple’s Screen Time permission to protect that
                selection.
              </p>
            </div>
            <PhoneFrame
              src={greenhouseScreen}
              alt="Airlock’s Greenhouse screen showing protection and available Airtime"
            />
          </article>

          <ScrollScrubVideo
            src={breatheVideo}
            poster={breathePoster}
            label="A real Airlock Morning Riser breathing session controlled by scrolling"
          >
            <div className="step-copy">
              <p className="step-number">02</p>
              <h3>Breathe and earn Airtime.</h3>
              <p>
                Finish a guided session to add Airtime. You can change the session length, breathing exercise, pace,
                and haptics.
              </p>
              <p className="real-app-note">This is a real Morning Riser session from the app.</p>
            </div>
          </ScrollScrubVideo>

          <article className="story-row story-unlock">
            <div className="step-copy">
              <p className="step-number">03</p>
              <h3>Unlock for a few minutes.</h3>
              <p>
                Choose an unlock time from 5 to 30 minutes. When the unlock time ends, your selected apps and websites
                are blocked again automatically.
              </p>
            </div>
            <div
              className="unlock-clock"
              role="img"
              aria-label="Unlock times range from 5 to 30 minutes, then the selected apps and websites are blocked again"
            >
              <span className="unlock-orbit unlock-orbit-one" aria-hidden="true" />
              <span className="unlock-orbit unlock-orbit-two" aria-hidden="true" />
              <strong>5–30</strong>
              <small>minutes</small>
              <p>then blocked again automatically</p>
            </div>
          </article>
        </section>

        <section className="principles" aria-labelledby="principles-title">
          <p className="section-number">Private by design</p>
          <h2 id="principles-title">Your Airlock activity stays on your iPhone.</h2>
          <p className="principles-lede">
            There’s no Airlock account, and we don’t collect or track how you use the app.
          </p>
          <div className="principle-list">
            <p>No account</p>
            <p>No tracking</p>
            <p>No ads</p>
          </div>
          <a className="round-link" href="./privacy/">
            Read the privacy policy <span aria-hidden="true">↗</span>
          </a>
        </section>
      </main>
    </SiteChrome>
  );
}
