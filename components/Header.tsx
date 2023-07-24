import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

// TODO
function Header() {
	// const pathname = usePathname()
	// const isHomePage = pathname === "/" ? true : false
	const homePage: React.ReactNode = <div className='mx-auto sm:w-full md:w-1/2 mt-2' >
		<div className="rounded p-2 mb-4 text-white">
			<Image src="/next.svg" alt='Next.js Logo' width={100} height={37} />
		</div>
	</div>

	return (
		<Link href="/">
			{homePage}
		</Link>
	)
}

export default Header