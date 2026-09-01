import type { ImgHTMLAttributes } from 'react';

interface PhoneFrameProps extends Pick<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  className?: string;
}

export function PhoneFrame({ src, alt, className = '' }: PhoneFrameProps) {
  return (
    <div className={`phone-frame ${className}`.trim()}>
      <div className="phone-speaker" aria-hidden="true" />
      <img src={src} alt={alt} />
    </div>
  );
}
