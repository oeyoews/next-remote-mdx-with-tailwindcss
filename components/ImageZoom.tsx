import { ComponentProps, useRef } from 'react'
import mediumZoom, { Zoom, ZoomOptions } from 'medium-zoom'
// TODO
// import Image from 'next/image'

type ImageZoomProps = ComponentProps<'img'> & {
	options?: ZoomOptions
}

export function ImageZoom({ options, ...props }: ImageZoomProps) {
	const zoomRef = useRef<Zoom | null>(null)

	function getZoom() {
		if (zoomRef.current === null) {
			zoomRef.current = mediumZoom(options)
		}

		return zoomRef.current
	}

	function attachZoom(image: HTMLImageElement | null) {
		const zoom = getZoom()

		if (image) {
			zoom.attach(image)
		} else {
			zoom.detach()
		}
	}

	// how use next/Image
	return <img {...props} ref={attachZoom} />
}