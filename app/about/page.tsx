import Link from "next/link";

export default function page() {
	return (
		<div className="prose mx-auto my-4 rounded max-w-none sm:w-full md:w-1/2 p-4">
			<blockquote>
				Coming ...
			</blockquote>
			<div className="flex justify-end items-center">
				<Link href="/"> ← Back to Home</Link>
			</div>
		</div>
	)
}
