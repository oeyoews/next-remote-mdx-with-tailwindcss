import { FaGithub } from 'react-icons/fa'
import { ImageZoom } from './ImageZoom'
import Pre from './CopyCode'

function Star() {
	return (
		<div className='bg-neutral-200 p-2 rounded'>
			<FaGithub className='w-5 h-5 text-cyan-300' />
		</div>
	)
}

const mdxCustomComponents = {
	pre: Pre,
	Star: (props: {}) => (
		<Star />
	),
	Image: (props: { src: string, alt: string, height: number, width: number }) =>
		<ImageZoom width={props.width} height={props.height} src={props.src} alt={props.alt} />
}

export default mdxCustomComponents