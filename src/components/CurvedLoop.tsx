/*
 * Adapted from React Bits: Curved Loop by David Haz.
 * Original: https://reactbits.dev/text-animations/curved-loop
 * License notice: THIRD_PARTY_NOTICES.md
 */
import { useEffect, useId, useMemo, useRef, useState, type FC, type PointerEvent } from 'react';

interface CurvedLoopProps {
  marqueeText: string;
  speed?: number;
  className?: string;
  curveAmount?: number;
  direction?: 'left' | 'right';
  interactive?: boolean;
}

const CurvedLoop: FC<CurvedLoopProps> = ({
  marqueeText,
  speed = 0.35,
  className = '',
  curveAmount = 82,
  direction = 'right',
  interactive = false
}) => {
  const text = useMemo(() => `${marqueeText.replace(/\s+$/, '')}\u00a0`, [marqueeText]);
  const measureRef = useRef<SVGTextElement | null>(null);
  const textPathRef = useRef<SVGTextPathElement | null>(null);
  const jacketRef = useRef<HTMLDivElement | null>(null);
  const [spacing, setSpacing] = useState(0);
  const pathId = `curve-${useId().replace(/:/g, '')}`;
  const pathD = `M-120,112 Q500,${112 + curveAmount} 1560,112`;
  const dragRef = useRef(false);
  const lastXRef = useRef(0);
  const directionRef = useRef(direction);
  const velocityRef = useRef(0);

  const totalText = spacing
    ? Array(Math.ceil(1900 / spacing) + 2)
        .fill(text)
        .join('')
    : text;

  useEffect(() => {
    const measure = () => {
      if (measureRef.current) setSpacing(measureRef.current.getComputedTextLength());
    };

    measure();
    document.fonts?.ready.then(measure).catch(() => undefined);
  }, [text, className]);

  useEffect(() => {
    const jacket = jacketRef.current;
    const textPath = textPathRef.current;
    if (!jacket || !textPath || !spacing) return;

    let frameId = 0;
    let previousTime = performance.now();
    let offset = -spacing;
    let isVisible = true;
    let isPageVisible = !document.hidden;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    textPath.setAttribute('startOffset', `${offset}px`);

    const stop = () => {
      if (frameId) cancelAnimationFrame(frameId);
      frameId = 0;
    };

    const canAnimate = () => isVisible && isPageVisible && !reducedMotion.matches;

    const step = (now: number) => {
      frameId = 0;
      if (!canAnimate()) return;

      if (!dragRef.current) {
        const elapsedFrames = Math.min((now - previousTime) / 16.67, 3);
        offset += (directionRef.current === 'right' ? speed : -speed) * elapsedFrames;
        if (offset <= -spacing) offset += spacing;
        if (offset > 0) offset -= spacing;
        textPath.setAttribute('startOffset', `${offset}px`);
      }

      previousTime = now;
      frameId = requestAnimationFrame(step);
    };

    const start = () => {
      if (!canAnimate() || frameId) return;
      previousTime = performance.now();
      frameId = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (canAnimate()) start();
        else stop();
      },
      { threshold: 0 }
    );

    const handleVisibility = () => {
      isPageVisible = !document.hidden;
      if (canAnimate()) start();
      else stop();
    };

    const handleMotion = () => {
      if (canAnimate()) start();
      else stop();
    };

    observer.observe(jacket);
    document.addEventListener('visibilitychange', handleVisibility);
    reducedMotion.addEventListener('change', handleMotion);
    start();

    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
      reducedMotion.removeEventListener('change', handleMotion);
    };
  }, [spacing, speed]);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!interactive) return;
    dragRef.current = true;
    lastXRef.current = event.clientX;
    velocityRef.current = 0;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const textPath = textPathRef.current;
    if (!interactive || !dragRef.current || !textPath || !spacing) return;

    const deltaX = event.clientX - lastXRef.current;
    lastXRef.current = event.clientX;
    velocityRef.current = deltaX;
    let offset = parseFloat(textPath.getAttribute('startOffset') || '0') + deltaX;
    if (offset <= -spacing) offset += spacing;
    if (offset > 0) offset -= spacing;
    textPath.setAttribute('startOffset', `${offset}px`);
  };

  const handlePointerEnd = () => {
    if (!interactive) return;
    dragRef.current = false;
    directionRef.current = velocityRef.current > 0 ? 'right' : 'left';
  };

  return (
    <div
      ref={jacketRef}
      className="curved-loop-jacket"
      style={{ visibility: spacing ? 'visible' : 'hidden', cursor: interactive ? 'grab' : 'auto' }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerLeave={handlePointerEnd}
      aria-hidden="true"
    >
      <svg className="curved-loop-svg" viewBox="0 0 1440 280" focusable="false">
        <text ref={measureRef} xmlSpace="preserve" className={className} visibility="hidden">
          {text}
        </text>
        <defs>
          <path id={pathId} d={pathD} fill="none" />
        </defs>
        {spacing > 0 && (
          <text xmlSpace="preserve" className={className}>
            <textPath ref={textPathRef} href={`#${pathId}`} startOffset={`${-spacing}px`} xmlSpace="preserve">
              {totalText}
            </textPath>
          </text>
        )}
      </svg>
    </div>
  );
};

export default CurvedLoop;
