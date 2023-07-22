import Link from "next/link"

export default function NotFound() {
	return (
		<div className="prose mx-auto">
			<h1 className=""> Not Found </h1>
			<Link href="/">Back to Home</Link>
		</div>
	)
}
