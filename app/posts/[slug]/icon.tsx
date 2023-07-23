import { ImageResponse } from 'next/server'

export function generateImageMetadata() {
	return [
		{
			contentType: 'image/png',
			size: { width: 172, height: 172 },
			id: 'posts'
		},
	]
}

export default function Icon({ params }: { params: { slug: string } }) {

	const title = decodeURIComponent(params.slug)
	return new ImageResponse(
		(
			<div
				style={{
					width: '100%',
					height: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					fontSize: 88,
					background: 'transparent',
					color: '#000',
				}}
			>
				{title}
			</div>
		)
	)
}