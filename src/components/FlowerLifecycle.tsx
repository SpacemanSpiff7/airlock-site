import { useEffect, useRef, useState } from 'react';

type FlowerStage = 'healthy' | 'wilted' | 'thriving';

const stages: Array<{ name: FlowerStage; label: string; detail: string }> = [
  { name: 'healthy', label: 'Healthy', detail: 'Colorful and upright.' },
  { name: 'wilted', label: 'Wilted', detail: 'Sustained heavy Airtime use can soften its color and posture.' },
  { name: 'thriving', label: 'Thriving', detail: 'Fully grown, glowing, and a little playful.' }
];

const flowerFrames = Object.entries(
  import.meta.glob('../assets/flower-promo/flower-*.webp', {
    eager: true,
    import: 'default',
    query: '?url'
  }) as Record<string, string>
)
  .sort(([firstPath], [secondPath]) => firstPath.localeCompare(secondPath))
  .map(([, source]) => source);

const clamp = (value: number) => Math.min(1, Math.max(0, value));

export function FlowerLifecycle() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const flowerFrameRef = useRef<HTMLImageElement | null>(null);
  const [stage, setStage] = useState<FlowerStage>('healthy');

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let animationFrame = 0;
    let currentFrameIndex = -1;

    flowerFrames.forEach(source => {
      const image = new Image();
      image.decoding = 'async';
      image.src = source;
    });

    const setFlowerProgress = (progress: number) => {
      const frameIndex = Math.min(
        flowerFrames.length - 1,
        Math.round(progress * (flowerFrames.length - 1))
      );

      section.style.setProperty('--flower-progress', progress.toFixed(3));

      if (frameIndex !== currentFrameIndex && flowerFrameRef.current) {
        currentFrameIndex = frameIndex;
        flowerFrameRef.current.src = flowerFrames[frameIndex];
        flowerFrameRef.current.dataset.frame = String(frameIndex);
      }

      const nextStage: FlowerStage = progress < 0.2
        ? 'healthy'
        : progress < 0.66
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

    const handleMotion = () => {
      requestUpdate();
    };

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    reducedMotion.addEventListener('change', handleMotion);
    requestUpdate();

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      reducedMotion.removeEventListener('change', handleMotion);
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
        </div>

        <div className="flower-visual-column">
          <div
            className="flower-artwork"
            role="img"
            aria-label="One possible set of flower states: healthy, wilted, and thriving"
          >
            <img
              ref={flowerFrameRef}
              className="flower-promo-frame"
              src={flowerFrames[0]}
              alt=""
              aria-hidden="true"
              decoding="async"
              draggable="false"
            />
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
