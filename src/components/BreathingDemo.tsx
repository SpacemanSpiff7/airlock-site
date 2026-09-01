import { useEffect, useRef } from 'react';

export function BreathingDemo() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let isVisible = true;
    let isPageVisible = !document.hidden;

    const syncPlayback = () => {
      section.classList.toggle('is-paused', !isVisible || !isPageVisible);
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

    observer.observe(section);
    document.addEventListener('visibilitychange', handleVisibility);
    syncPlayback();

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <section ref={sectionRef} className="breathing-demo" aria-labelledby="breathing-demo-title">
      <div className="breathing-copy">
        <p className="section-number">Follow the guide</p>
        <h2 id="breathing-demo-title">Breathe with it.</h2>
        <p>The guide expands for inhale, rests for each hold, and contracts for exhale.</p>
      </div>

      <div
        className="breathing-visual"
        role="img"
        aria-label="An animated guide that expands for inhale, pauses, contracts for exhale, and pauses again"
      >
        <span className="breath-ring breath-ring-one" aria-hidden="true" />
        <span className="breath-ring breath-ring-two" aria-hidden="true" />
        <div className="breath-orb" aria-hidden="true">
          <span className="breath-cue cue-inhale">Inhale</span>
          <span className="breath-cue cue-hold-in">Hold</span>
          <span className="breath-cue cue-exhale">Exhale</span>
          <span className="breath-cue cue-hold-out">Hold</span>
          <span className="breath-cue cue-static">Inhale · hold · exhale · hold</span>
        </div>
        <span className="breath-duration" aria-hidden="true">4 seconds each</span>
      </div>
    </section>
  );
}
