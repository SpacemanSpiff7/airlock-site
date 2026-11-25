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
    let isVisible = false;
    let resumeWhenVisible = !reducedMotion.matches;

    const syncPlayback = () => {
      if (!isVisible || document.hidden) {
        if (!video.paused) {
          resumeWhenVisible = !reducedMotion.matches;
          video.pause();
        }
        return;
      }

      if (resumeWhenVisible) {
        resumeWhenVisible = false;
        void video.play().catch(() => {
          // The browser may require the visitor to press Play.
        });
      }
    };

    const handleMotionChange = () => {
      if (reducedMotion.matches) {
        resumeWhenVisible = false;
        video.pause();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        syncPlayback();
      },
      { rootMargin: '20% 0px', threshold: 0 }
    );

    document.addEventListener('visibilitychange', syncPlayback);
    reducedMotion.addEventListener('change', handleMotionChange);
    observer.observe(section);

    return () => {
      document.removeEventListener('visibilitychange', syncPlayback);
      reducedMotion.removeEventListener('change', handleMotionChange);
      observer.disconnect();
      video.pause();
    };
  }, []);

  return (
    <article ref={sectionRef} className="story-row loop-story">
      <div className="loop-story-copy">{children}</div>
      <div className="loop-story-media">
        <div className="phone-frame looping-phone-frame">
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            aria-label={label}
            controls
            loop
            muted
            playsInline
            preload="none"
          />
        </div>
      </div>
    </article>
  );
}
