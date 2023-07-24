import Link from "next/link"
import { FiGithub, } from 'react-icons/fi'
import { FcInfo } from 'react-icons/fc'
import Image from 'next/image'

// scale not work
export default function NavBar() {
	const iconClasses = "inline mr-1 align-baseline stroke-blue-300 hover:scale-125 transition duration-300 hover:stroke-indigo-300"

	const GithubLink = <a target="_blank" href={"https://github.com/oeyoews/next-remote-mdx-with-tailwindcss"}><FiGithub className={iconClasses} /> </a>
	const AboutPage = <Link href="/about" className="scale-110"><FcInfo className={iconClasses} /></Link>

	return (
		<nav className="sticky top-0 flex justify-between items-center p-2 mx-auto sm:w-full lg:w-1/2 print:hidden text-xl bg-white">
			<div className="flex items-center">
				<Link href='/'>
					<Image src="/next.svg" alt='Next.js Logo' width={100} height={37} />
				</Link>
			</div>
			<div className="flex space-x-2">
				{GithubLink}
				{AboutPage}
			</div>
		</nav>
	)
}
