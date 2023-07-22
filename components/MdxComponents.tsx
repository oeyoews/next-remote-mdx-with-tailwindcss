import { FaGithub } from 'react-icons/fa'
import Image from 'next/image'
function Star() {
	return (
		<div className='bg-neutral-200 p-2 rounded'>
			<FaGithub className='w-5 h-5 text-cyan-300' />
		</div>
	)
}

const mdxCustomComponents = {
	Star,
	Image
}

export default mdxCustomComponents