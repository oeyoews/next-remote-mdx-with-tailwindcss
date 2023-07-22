'use client'
import Link from "next/link"
import { FcHome } from 'react-icons/fc'
import { usePathname } from "next/navigation"

export default function NavBar() {
	const pathname = usePathname()
	const isHomePage = pathname === "/" ? true : false
	const Home = <Link href="/" className="no-underline hover:underline"><FcHome className="inline mr-1 align-baseline" /> </Link>
	return (
		// sticky
		<nav className='prose max-w-none rounded-full my-4 w-2/3 mx-auto px-4 py-1 justify-end flex items-center print:hidden'>
			{isHomePage ? null : Home}
		</nav>
	)
}
