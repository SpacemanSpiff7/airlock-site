import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { FlowerSparks } from './FlowerSparks';

type FlowerStage = 'healthy' | 'wilted' | 'tender' | 'thriving';

const stages: Array<{ name: FlowerStage; label: string; detail: string }> = [
  { name: 'healthy', label: 'Healthy', detail: 'Colorful and upright.' },
  { name: 'wilted', label: 'Wilted', detail: 'Sustained heavy Airtime use can soften its color and posture.' },
  { name: 'tender', label: 'Tender', detail: 'Unused Airtime that expires can help it recover.' },
  { name: 'thriving', label: 'Thriving', detail: 'Fully grown, glowing, and a little playful.' }
];

const petalColors = ['#f08b83', '#c675ae', '#735ac7', '#a6d6ff', '#f4b860', '#f08b83'];

const clamp = (value: number) => Math.min(1, Math.max(0, value));

export function FlowerLifecycle() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [stage, setStage] = useState<FlowerStage>('healthy');

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let animationFrame = 0;
    let isVisible = true;
    let isPageVisible = !document.hidden;

    const syncAnimation = () => {
      section.classList.toggle('is-animated', isVisible && isPageVisible && !reducedMotion.matches);
    };

    const setFlowerProgress = (progress: number) => {
      const health = progress < 0.4
        ? 1 - clamp((progress - 0.12) / 0.26)
        : clamp((progress - 0.4) / 0.28);
      const wilt = 1 - health;
      const glow = clamp((progress - 0.54) / 0.2);

      section.style.setProperty('--flower-progress', progress.toFixed(3));
      section.style.setProperty('--flower-health', health.toFixed(3));
      section.style.setProperty('--flower-wilt', wilt.toFixed(3));
      section.style.setProperty('--flower-glow', glow.toFixed(3));

      const nextStage: FlowerStage = progress < 0.2
        ? 'healthy'
        : progress < 0.45
          ? 'wilted'
          : progress < 0.72
            ? 'tender'
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

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        syncAnimation();
      },
      { threshold: 0 }
    );

    const handleVisibility = () => {
      isPageVisible = !document.hidden;
      syncAnimation();
    };

    const handleMotion = () => {
      syncAnimation();
      requestUpdate();
    };

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    document.addEventListener('visibilitychange', handleVisibility);
    reducedMotion.addEventListener('change', handleMotion);
    observer.observe(section);
    syncAnimation();
    requestUpdate();

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      document.removeEventListener('visibilitychange', handleVisibility);
      reducedMotion.removeEventListener('change', handleMotion);
      observer.disconnect();
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
          <p className="section-number">The daily flower · scroll through an example</p>
          <h2 id="flower-lifecycle-title">The flower can change as the day goes.</h2>
          <p className="flower-lifecycle-lede">
            Breathing helps today’s flower grow. Its health reflects the Airtime you use and the Airtime that expires
            unused. At the end of the day, that flower joins your history.
          </p>
          <ol className="flower-stages" aria-label="Flower lifecycle">
            {stages.map(item => (
              <li key={item.name} className={stage === item.name ? 'is-active' : ''}>
                <span>{item.label}</span>
                <small>{item.detail}</small>
              </li>
            ))}
          </ol>
        </div>

        <div
          className="flower-artwork"
          role="img"
          aria-label="One possible set of flower states: healthy, wilted, tender, and thriving"
        >
          <FlowerSparks active={stage === 'thriving'} />
          <div className="flower-aura" aria-hidden="true" />
          <div className="flower-ground" aria-hidden="true" />
          <div className="flower-plant" aria-hidden="true">
            <span className="flower-stem" />
            <span className="flower-leaf flower-leaf-left" />
            <span className="flower-leaf flower-leaf-right" />
            <div className="flower-head">
              {petalColors.map((color, index) => (
                <span
                  key={`${color}-${index}`}
                  className="flower-petal"
                  style={{
                    '--petal-angle': `${index * 60}deg`,
                    '--petal-color': color
                  } as CSSProperties}
                />
              ))}
              <span className="flower-center" />
              <span className="flower-center-dot" />
            </div>
          </div>
          <p className="flower-scroll-note" aria-hidden="true">Next state</p>
        </div>
      </div>
    </section>
  );
}
