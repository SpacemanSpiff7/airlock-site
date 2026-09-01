import { useEffect, useRef, useState } from 'react';

import healthyScreen from '../assets/flower-screen-healthy.webp';
import thrivingScreen from '../assets/flower-screen-thriving.webp';
import wiltedScreen from '../assets/flower-screen-wilted.webp';

type FlowerStage = 'healthy' | 'wilted' | 'thriving';

const stages: Array<{ name: FlowerStage; label: string; detail: string }> = [
  { name: 'healthy', label: 'Healthy', detail: 'Colorful and upright.' },
  { name: 'wilted', label: 'Wilted', detail: 'Heavy Airtime use can soften its color and posture.' },
  { name: 'thriving', label: 'Thriving', detail: 'Breathing can help it grow fuller and glow.' }
];

const clamp = (value: number) => Math.min(1, Math.max(0, value));

const smoothstep = (start: number, end: number, value: number) => {
  const progress = clamp((value - start) / (end - start));
  return progress * progress * (3 - 2 * progress);
};

export function FlowerLifecycle() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [stage, setStage] = useState<FlowerStage>('healthy');

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let animationFrame = 0;

    const setFlowerProgress = (progress: number) => {
      const wiltedIn = smoothstep(0.12, 0.2, progress);
      const recovery = smoothstep(0.52, 0.62, progress);

      section.style.setProperty('--healthy-screen-opacity', (1 - wiltedIn).toFixed(3));
      section.style.setProperty('--wilted-screen-opacity', (wiltedIn * (1 - recovery)).toFixed(3));
      section.style.setProperty('--thriving-screen-opacity', recovery.toFixed(3));

      const nextStage: FlowerStage = progress < 0.18
        ? 'healthy'
        : progress < 0.58
          ? 'wilted'
          : 'thriving';

      setStage(currentStage => (currentStage === nextStage ? currentStage : nextStage));
    };

    const update = () => {
      animationFrame = 0;
      if (reducedMotion.matches) {
        setFlowerProgress(1);
        return;
      }

      const bounds = section.getBoundingClientRect();
      const scrollableDistance = Math.max(section.offsetHeight - window.innerHeight, 1);
      setFlowerProgress(clamp(-bounds.top / scrollableDistance));
    };

    const requestUpdate = () => {
      if (!animationFrame) animationFrame = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    reducedMotion.addEventListener('change', requestUpdate);
    requestUpdate();

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      reducedMotion.removeEventListener('change', requestUpdate);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="flower-lifecycle"
      data-stage={stage}
      aria-labelledby="flower-lifecycle-title"
    >
      <div className="flower-lifecycle-sticky">
        <div className="flower-lifecycle-copy">
          <p className="section-number">The daily flower · shown faster than real time</p>
          <h2 id="flower-lifecycle-title">The flower can change as the day goes.</h2>
          <p className="flower-lifecycle-lede">
            Breathing helps today’s flower grow. Its health reflects the Airtime you use and the Airtime that expires
            unused. At the end of the day, that flower joins your history.
          </p>
        </div>

        <div className="flower-visual-column">
          <div
            className="phone-frame flower-phone-frame"
            role="img"
            aria-label="The Airlock Day screen moving from a healthy flower to wilted, then thriving"
          >
            <div className="flower-screen-stack" aria-hidden="true">
              <img
                className="flower-screen flower-screen-healthy"
                src={healthyScreen}
                alt=""
                decoding="async"
                fetchPriority="high"
                draggable="false"
              />
              <img
                className="flower-screen flower-screen-wilted"
                src={wiltedScreen}
                alt=""
                decoding="async"
                loading="eager"
                draggable="false"
              />
              <img
                className="flower-screen flower-screen-thriving"
                src={thrivingScreen}
                alt=""
                decoding="async"
                loading="eager"
                draggable="false"
              />
            </div>
          </div>

          <ol className="flower-stages" aria-label="Flower lifecycle">
            {stages.map(item => (
              <li key={item.name} className={stage === item.name ? 'is-active' : ''}>
                <span>{item.label}</span>
                <small>{item.detail}</small>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
