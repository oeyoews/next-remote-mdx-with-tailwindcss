import getFormattedDate from "@/lib/getFormatedDate";
import { getAllPostsMeta, getPostsBySlug } from "@/lib/mdx";
import Link from "next/link";
import { notFound } from 'next/navigation'


// https://nextjs.org/docs/app/building-your-application/routing/colocation
// https://nextjs.org/docs/app/api-reference/functions/generate-image-metadata
// https://nextjs.org/docs/app/api-reference/functions/generate-static-params
export async function generateStaticParams() {
	const posts = await getAllPostsMeta();
	return posts.map((post) => ({
		// local md(x) filename without extension
		slug: post.meta.slug
	}))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
	const { slug } = params
	const originalSlug = decodeURIComponent(slug)
	const posts = await getAllPostsMeta();
	const post = posts.find((post) => post.meta.slug === originalSlug);


	if (!post) {
		return {
			title: `${originalSlug} Post Not Found`
		}
	}

	return {
		title: post.meta.title
	}
}


export default async function Posts({ params }: { params: { slug: string } }) {
	const { slug } = params;
	const originalSlug = decodeURIComponent(slug)
	const posts = await getAllPostsMeta();
	const post = posts.find((post) => post.meta.slug === originalSlug);
	if (!post) { notFound(); }
	const { meta, content } = post
	const pubDate = getFormattedDate(meta.date)
	return (
		<main className="prose mx-auto my-4 rounded max-w-none sm:w-full md:w-1/2 p-4">
			<article>
				<h1 className="capitalize">{meta.title}</h1>
				<small className="font-serif">{pubDate}</small>
				<p className="text-center">{meta.description}</p>
				{content}
				<p className="flex justify-end items-end">
					<Link href="/" className="no-underline hover:underline">← Back to Home</Link>
				</p>
			</article>
		</main>
	);
}
