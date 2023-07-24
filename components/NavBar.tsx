'use client'
import Link from "next/link"
import { FiGithub, FiHome, } from 'react-icons/fi'
import { FcInfo } from 'react-icons/fc'
// usepathname is a client component
import { usePathname } from "next/navigation"
import Image from 'next/image'

// scale not work
export default function NavBar() {
	const pathname = usePathname()
	const isHomePage = pathname === "/" ? true : false
	const iconClasses = "inline mr-1 align-baseline stroke-blue-300 hover:scale-125 transition duration-300 hover:stroke-indigo-300 no-underline hover:underline"

	const Home = <Link href="/" ><FiHome className={iconClasses} /></Link>
	const GithubLink = <Link href={"https://github.com/oeyoews/next-remote-mdx-with-tailwindcss"}><FiGithub className={iconClasses} /> </Link>
	const AboutPage = <Link href="/about" className="scale-110"><FcInfo className={iconClasses} /></Link>

	return (
		// TODO: add menubar on mobile
		<nav className="sticky top-0 flex flex-between items-center p-2 w-1/2 mx-auto print:hidden text-xl">
			<div className="flex items-center">
				<Link href='/'>
					<Image src="/next.svg" alt='Next.js Logo' width={100} height={37} />
				</Link>
			</div>
			<div className='flex'>
				{isHomePage ? null : Home}
				{GithubLink}
				{AboutPage}
			</div>
		</nav>
	)
}
