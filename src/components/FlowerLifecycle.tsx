import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { FlowerSparks } from './FlowerSparks';

type FlowerStage = 'healthy' | 'wilted' | 'restored' | 'thriving';

const stages: Array<{ name: FlowerStage; label: string; detail: string }> = [
  { name: 'healthy', label: 'Healthy', detail: 'Open and steady.' },
  { name: 'wilted', label: 'Wilted', detail: 'Color softens. The stem folds.' },
  { name: 'restored', label: 'Restored', detail: 'Color and lift return.' },
  { name: 'thriving', label: 'Thriving', detail: 'Full health, glow, and a little celebration.' }
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
            ? 'restored'
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
          <p className="section-number">Scroll to grow</p>
          <h2 id="flower-lifecycle-title">Watch the flower come back.</h2>
          <p className="flower-lifecycle-lede">
            The daily flower changes with breathing practice and Airtime use.
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
          aria-label="A flower changes from healthy to wilted, then returns to full health as the page scrolls"
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
          <p className="flower-scroll-note" aria-hidden="true">Keep scrolling</p>
        </div>
      </div>
    </section>
  );
}
