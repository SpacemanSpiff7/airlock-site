import { useEffect, useRef, type ReactNode } from 'react';

interface ScrollScrubVideoProps {
  src: string;
  poster: string;
  label: string;
  children: ReactNode;
}

const clamp = (value: number) => Math.min(1, Math.max(0, value));

export function ScrollScrubVideo({ src, poster, label, children }: ScrollScrubVideoProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let animationFrame = 0;
    let isVisible = false;
    let isPageVisible = !document.hidden;
    let hasPrimedVideo = false;

    const update = () => {
      animationFrame = 0;
      if (reducedMotion.matches || !isVisible || !isPageVisible || !video.duration) return;

      const bounds = section.getBoundingClientRect();
      const scrollableDistance = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = clamp(-bounds.top / scrollableDistance);
      const safeDuration = Math.max(video.duration - 0.35, 0);
      const targetTime = progress * safeDuration;

      section.style.setProperty('--scrub-progress', progress.toFixed(3));
      if (Math.abs(video.currentTime - targetTime) > 0.035) video.currentTime = targetTime;
    };

    const requestUpdate = () => {
      if (!animationFrame) animationFrame = requestAnimationFrame(update);
    };

    const primeVideo = () => {
      if (hasPrimedVideo || reducedMotion.matches) return;
      hasPrimedVideo = true;

      const playAttempt = video.play();
      if (playAttempt) {
        void playAttempt
          .then(() => {
            video.pause();
            requestUpdate();
          })
          .catch(() => {
            hasPrimedVideo = false;
          });
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        section.classList.toggle('is-visible', isVisible);
        if (!isVisible) video.pause();
        requestUpdate();
      },
      { rootMargin: '35% 0px', threshold: 0 }
    );

    const handleVisibility = () => {
      isPageVisible = !document.hidden;
      if (!isPageVisible) video.pause();
      requestUpdate();
    };

    const handleMotion = () => {
      section.classList.toggle('is-reduced-motion', reducedMotion.matches);
      if (reducedMotion.matches) video.pause();
      requestUpdate();
    };

    video.addEventListener('loadedmetadata', requestUpdate);
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('scroll', primeVideo, { passive: true, once: true });
    window.addEventListener('touchstart', primeVideo, { passive: true, once: true });
    window.addEventListener('resize', requestUpdate);
    document.addEventListener('visibilitychange', handleVisibility);
    reducedMotion.addEventListener('change', handleMotion);
    observer.observe(section);
    handleMotion();

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      video.removeEventListener('loadedmetadata', requestUpdate);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('scroll', primeVideo);
      window.removeEventListener('touchstart', primeVideo);
      window.removeEventListener('resize', requestUpdate);
      document.removeEventListener('visibilitychange', handleVisibility);
      reducedMotion.removeEventListener('change', handleMotion);
      observer.disconnect();
    };
  }, []);

  return (
    <article ref={sectionRef} className="scroll-story">
      <div className="scroll-story-sticky">
        <div className="scroll-story-copy">{children}</div>
        <div className="scroll-story-media">
          <div className="phone-frame scroll-phone-frame">
            <video
              ref={videoRef}
              src={src}
              poster={poster}
              aria-label={label}
              muted
              playsInline
              preload="metadata"
            />
          </div>
          <div className="scrub-meter" aria-hidden="true">
            <span />
          </div>
          <p className="scrub-note">Scroll to move through the real app</p>
        </div>
      </div>
    </article>
  );
}
