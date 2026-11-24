import type { ImgHTMLAttributes } from 'react';

interface PhoneFrameProps extends Pick<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt' | 'loading' | 'width' | 'height'> {
  className?: string;
}

export function PhoneFrame({ className = '', ...imageProps }: PhoneFrameProps) {
  return (
    <div className={`phone-frame ${className}`.trim()}>
      <img {...imageProps} />
    </div>
  );
}
