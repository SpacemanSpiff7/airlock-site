import appIcon from '../assets/app-icon.png';
import breatheScreen from '../assets/screens/breathe.png';
import dayScreen from '../assets/screens/day.png';
import greenhouseScreen from '../assets/screens/greenhouse.png';
import CurvedLoop from '../components/CurvedLoop';
import GhostFibers from '../components/GhostFibers';
import { PhoneFrame } from '../components/PhoneFrame';
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
              Guided breathing turns intentional time into temporary Airtime for the apps and sites you choose.
            </p>
            <a className="text-link" href="#how-it-works">
              See how it works <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="hero-emblem" aria-label="Airlock app icon">
            <div className="emblem-shadow" aria-hidden="true" />
            <img src={appIcon} alt="Airlock’s flower app icon" />
          </div>
          <p className="hero-note" aria-hidden="true">
            a small ritual<br />before the feed
          </p>
        </section>

        <div className="flow-bridge">
          <CurvedLoop
            marqueeText="inhale  ·  make space  ·  exhale  ·  choose  ·  "
            speed={0.22}
            curveAmount={74}
            direction="right"
            className="flow-bridge-text"
          />
        </div>

        <section className="ritual" id="how-it-works" aria-labelledby="ritual-title">
          <div className="ritual-intro">
            <p className="section-number">01 — 03</p>
            <h2 id="ritual-title">Three quiet steps.</h2>
          </div>

          <article className="ritual-step step-breathe">
            <div className="step-copy">
              <p className="step-number">01</p>
              <h3>Breathe</h3>
              <p>Take one guided minute. No camera, microphone, or wearable required.</p>
            </div>
            <PhoneFrame src={breatheScreen} alt="Airlock’s guided breathing screen" />
            <span className="poster-word" aria-hidden="true">in</span>
          </article>

          <article className="ritual-step step-airtime">
            <PhoneFrame src={dayScreen} alt="Airlock’s daily Airtime garden screen" />
            <div className="step-copy">
              <p className="step-number">02</p>
              <h3>Use Airtime</h3>
              <p>Spend what you earned on a short, deliberate unlock.</p>
            </div>
            <span className="poster-word" aria-hidden="true">out</span>
          </article>

          <article className="ritual-step step-return">
            <div className="step-copy">
              <p className="step-number">03</p>
              <h3>Protection returns</h3>
              <p>When Airtime ends, your chosen blocks settle back into place.</p>
            </div>
            <PhoneFrame src={greenhouseScreen} alt="Airlock’s protection and Airtime screen" />
            <span className="poster-word" aria-hidden="true">again</span>
          </article>
        </section>

        <section className="principles" aria-labelledby="principles-title">
          <div className="principles-flower" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <p className="section-number">Built this way on purpose</p>
          <h2 id="principles-title">Local. Private. A little playful.</h2>
          <div className="principle-list">
            <p>No account</p>
            <p>No analytics</p>
            <p>No ads</p>
            <p>Stays on your iPhone</p>
          </div>
          <a className="round-link" href="./privacy/">
            Read the privacy policy <span aria-hidden="true">↗</span>
          </a>
        </section>
      </main>
    </SiteChrome>
  );
}
