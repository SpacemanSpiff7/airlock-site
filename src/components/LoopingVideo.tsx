import { useEffect, useRef, type ReactNode } from 'react';

interface LoopingVideoProps {
  src: string;
  poster: string;
  label: string;
  children: ReactNode;
}

export function LoopingVideo({ src, poster, label, children }: LoopingVideoProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let isVisible = true;
    let isPageVisible = !document.hidden;

    const syncPlayback = () => {
      const shouldPlay = isVisible && isPageVisible && !reducedMotion.matches;
      section.classList.toggle('is-playing', shouldPlay);

      if (shouldPlay) {
        void video.play().catch(() => section.classList.remove('is-playing'));
      } else {
        video.pause();
      }
    };

    const handleMetadata = () => {
      if (Number.isFinite(video.duration)) {
        section.style.setProperty('--video-loop-duration', `${video.duration}s`);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        syncPlayback();
      },
      { rootMargin: '20% 0px', threshold: 0 }
    );

    const handleVisibility = () => {
      isPageVisible = !document.hidden;
      syncPlayback();
    };

    video.addEventListener('loadedmetadata', handleMetadata);
    document.addEventListener('visibilitychange', handleVisibility);
    reducedMotion.addEventListener('change', syncPlayback);
    observer.observe(section);
    handleMetadata();
    syncPlayback();

    return () => {
      video.removeEventListener('loadedmetadata', handleMetadata);
      document.removeEventListener('visibilitychange', handleVisibility);
      reducedMotion.removeEventListener('change', syncPlayback);
      observer.disconnect();
      video.pause();
    };
  }, []);

  return (
    <article ref={sectionRef} className="story-row loop-story">
      <div className="loop-story-copy">{children}</div>
      <div className="loop-story-media">
        <div className="phone-frame looping-phone-frame">
          <img className="looping-video-poster" src={poster} alt="" aria-hidden="true" />
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            aria-label={label}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          />
        </div>
      </div>
    </article>
  );
}
