'use client'
import Link from "next/link"
import { FiGithub, FiHome } from 'react-icons/fi'
// usepathname is a client component
import { usePathname } from "next/navigation"

// scale not work
export default function NavBar() {
	const pathname = usePathname()
	const isHomePage = pathname === "/" ? true : false
	const iconClasses = "inline mr-1 align-baseline stroke-blue-300 hover:scale-125 transition duration-300 hover:stroke-indigo-300"
	const Home = <Link href="/" className="no-underline hover:underline"><FiHome className={iconClasses} /></Link>
	const GithubLink = <Link href={"https://github.com/oeyoews/next-remote-mdx-with-tailwindcss"} className="no-underline hover:underline"><FiGithub className={iconClasses} /> </Link>
	return (
		// sticky
		<header className="sticky top-0 z-50 hidden md:block">
			<nav className='prose max-w-none rounded-full my-4 w-2/3 mx-auto px-4 py-1 justify-end flex items-center print:hidden space-x-2'>
				{isHomePage ? null : Home}
				{GithubLink}
			</nav>
		</header>
	)
}
