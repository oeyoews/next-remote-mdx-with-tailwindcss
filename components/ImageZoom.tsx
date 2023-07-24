'use client';

import { useRef } from 'react';

import Image, { ImageProps } from 'next/image';

import mediumZoom, { Zoom, ZoomOptions } from 'medium-zoom';

interface ImageZoomProps extends ImageProps {
  options?: ZoomOptions;
}

export function ImageZoom({ options, ...props }: ImageZoomProps) {
  const zoomRef = useRef<Zoom | null>(null);

  function getZoom() {
    if (zoomRef.current === null) {
      zoomRef.current = mediumZoom(options);
    }

    return zoomRef.current;
  }

  function attachZoom(image: HTMLImageElement | null) {
    const zoom = getZoom();

    if (image) {
      zoom.attach(image);
    } else {
      zoom.detach();
    }
  }

  return (
    <figure>
      <Image {...props} ref={attachZoom} />
      <figcaption className="text-slate-400 text-sm mt-1 font-serif">
        {props.alt}
      </figcaption>
    </figure>
  );
}
