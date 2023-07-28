'use client';

import { useRef } from 'react';

import Image, { ImageProps } from 'next/image';

import mediumZoom, { Zoom } from 'medium-zoom';

export function ImageZoom({ ...props }: ImageProps) {
  const zoomRef = useRef<Zoom | null>(null);

  function getZoom() {
    if (zoomRef.current === null) {
      zoomRef.current = mediumZoom();
    }

    return zoomRef.current;
  }

  function attachZoom(image: HTMLImageElement | null) {
    const zoom = getZoom();

    if (image) {
      zoom.attach(image);
      zoom.update({
        background: 'rgba(0, 0, 0, 0.5)',
      });
    } else {
      zoom.detach();
    }
  }

  return <Image {...props} ref={attachZoom} className="rounded" />;
}
