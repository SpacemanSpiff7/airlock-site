import type { ImgHTMLAttributes } from 'react';

interface PhoneFrameProps extends Pick<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  className?: string;
}

export function PhoneFrame({ src, alt, className = '' }: PhoneFrameProps) {
  return (
    <div className={`phone-frame ${className}`.trim()}>
      <img src={src} alt={alt} />
    </div>
  );
}
