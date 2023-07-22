import Link from "next/link"
import Image from "next/image"

export default function NotFound() {
	return (
		<div className="prose mx-auto h-screen flex justify-center  items-center">
			<Image src="/404.svg" alt="404" width={256} height={256} className="animate-bounce" />
			<Link href="/" className="no-underline hover:underline">← Back to Home</Link>
		</div>
	)
}
