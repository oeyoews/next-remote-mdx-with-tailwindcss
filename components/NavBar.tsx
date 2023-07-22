import Link from "next/link"

export default function NavBar() {
	return (
		// sticky
		<nav className='prose max-w-none rounded-full my-4 w-2/3 mx-auto px-4 py-1 bg-neutral-200 justify-end flex items-center print:hidden'>
			<Link href="/">Home</Link>
		</nav>
	)
}
