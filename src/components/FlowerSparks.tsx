/*
 * Adapted from React Bits: Click Spark by David Haz.
 * Original: https://reactbits.dev/animations/click-spark
 * License notice: THIRD_PARTY_NOTICES.md
 */
import { useEffect, useRef, useState, type CSSProperties } from 'react';

interface FlowerSparksProps {
  active: boolean;
}

const sparkColors = ['#f4b860', '#f5dcc8', '#a6d6ff', '#f08b83'];

export function FlowerSparks({ active }: FlowerSparksProps) {
  const sparksRef = useRef<HTMLDivElement | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const sparks = sparksRef.current;
    if (!sparks) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let isVisible = true;
    let isPageVisible = !document.hidden;

    const syncPlayback = () => {
      setIsRunning(active && isVisible && isPageVisible && !reducedMotion.matches);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        syncPlayback();
      },
      { threshold: 0 }
    );

    const handleVisibility = () => {
      isPageVisible = !document.hidden;
      syncPlayback();
    };

    observer.observe(sparks);
    document.addEventListener('visibilitychange', handleVisibility);
    reducedMotion.addEventListener('change', syncPlayback);
    syncPlayback();

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
      reducedMotion.removeEventListener('change', syncPlayback);
    };
  }, [active]);

  return (
    <div
      ref={sparksRef}
      className={`flower-sparks${isRunning ? ' is-running' : ''}`}
      aria-hidden="true"
    >
      {Array.from({ length: 12 }, (_, index) => (
        <span
          key={index}
          style={{
            '--spark-angle': `${index * 30}deg`,
            '--spark-color': sparkColors[index % sparkColors.length],
            '--spark-delay': `${(index % 3) * 38}ms`,
            '--spark-distance': `${8.1 + (index % 4) * 0.55}rem`
          } as CSSProperties}
        />
      ))}
    </div>
  );
}
